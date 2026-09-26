import User from "../models/User.js";
import Store from "../models/Store.js";
import Rating from "../models/Rating.js";
import bcrypt from "bcryptjs";

export const dashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStores = await Store.countDocuments();
    const totalRatings = await Rating.countDocuments();

    res.json({
      totalUsers,
      totalStores,
      totalRatings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (!name || !email || !password || !address) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!["admin", "user", "owner"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8-16 characters with uppercase and special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      role,
      sortBy = "name",
      order = "asc",
    } = req.query;

    const filter = {};

    if (name) {
      filter.name = {
        $regex: name,
        $options: "i",
      };
    }

    if (email) {
      filter.email = {
        $regex: email,
        $options: "i",
      };
    }

    if (address) {
      filter.address = {
        $regex: address,
        $options: "i",
      };
    }

    if (role) {
      filter.role = role;
    }

    const sort = {};
    sort[sortBy] = order === "desc" ? -1 : 1;

    const users = await User.find(filter)
      .select("-password")
      .sort(sort);

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let storeInfo = null;

    // If user is a store owner, fetch their store information & average rating
    if (user.role === "owner") {
      const store = await Store.findOne({ owner: user._id });

      if (store) {
        const ratings = await Rating.find({ store: store._id });
        let averageRating = 0;

        if (ratings.length > 0) {
          const total = ratings.reduce(
            (sum, item) => sum + item.rating,
            0
          );
          averageRating = total / ratings.length;
        }

        storeInfo = {
          id: store._id,
          _id: store._id,
          name: store.name,
          email: store.email,
          address: store.address,
          averageRating: Number(averageRating.toFixed(2)),
          totalRatings: ratings.length,
        };
      }
    }

    res.json({
      user,
      store: storeInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createStore = async (req, res) => {
  try {
    const { name, email, address, owner } = req.body;

    if (!name || !email || !address || !owner) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const ownerUser = await User.findOne({
      _id: owner,
      role: "owner",
    });

    if (!ownerUser) {
      return res.status(400).json({
        message: "Valid store owner not found",
      });
    }

    const store = await Store.create({
      name,
      email,
      address,
      owner,
    });

    res.status(201).json({
      message: "Store created successfully",
      store,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getStores = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      sortBy = "name",
      order = "asc",
    } = req.query;

    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };
    if (address) filter.address = { $regex: address, $options: "i" };

    const sort = {};
    if (sortBy !== "rating" && sortBy !== "averageRating") {
      sort[sortBy] = order === "desc" ? -1 : 1;
    }

    const stores = await Store.find(filter)
      .populate("owner", "name email")
      .sort(sort);

    const result = [];

    for (const store of stores) {
      const ratings = await Rating.find({ store: store._id });
      let averageRating = 0;

      if (ratings.length > 0) {
        const total = ratings.reduce(
          (sum, item) => sum + item.rating,
          0
        );
        averageRating = total / ratings.length;
      }

      result.push({
        id: store._id,
        _id: store._id,
        name: store.name,
        email: store.email,
        address: store.address,
        owner: store.owner,
        averageRating: Number(averageRating.toFixed(2)),
        totalRatings: ratings.length,
      });
    }

    if (sortBy === "rating" || sortBy === "averageRating") {
      result.sort((a, b) =>
        order === "desc"
          ? b.averageRating - a.averageRating
          : a.averageRating - b.averageRating
      );
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
