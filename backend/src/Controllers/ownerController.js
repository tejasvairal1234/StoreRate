import Store from "../models/Store.js";
import Rating from "../models/Rating.js";
import User from "../models/User.js";

// GET /api/owner/dashboard - Fetch store owner's dashboard stats and store information
export const getOwnerDashboard = async (req, res) => {
  try {
    const store = await Store.findOne({ owner: req.user.id });

    if (!store) {
      return res.status(404).json({
        message: "No store found assigned to your account",
      });
    }

    const ratings = await Rating.find({ store: store._id });
    let averageRating = 0;

    if (ratings.length > 0) {
      const total = ratings.reduce(
        (sum, item) => sum + item.rating,
        0
      );
      averageRating = total / ratings.length;
    }

    res.json({
      store: {
        id: store._id,
        _id: store._id,
        name: store.name,
        email: store.email,
        address: store.address,
      },
      averageRating: Number(averageRating.toFixed(2)),
      totalRatings: ratings.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/owner/ratings - Fetch all users who rated the store owner's store
export const getOwnerRatings = async (req, res) => {
  try {
    const store = await Store.findOne({ owner: req.user.id });

    if (!store) {
      return res.status(404).json({
        message: "No store found assigned to your account",
      });
    }

    const { sortBy = "date", order = "desc" } = req.query;

    const ratings = await Rating.find({ store: store._id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    let result = ratings.map((r) => ({
      id: r._id,
      _id: r._id,
      rating: r.rating,
      date: r.createdAt,
      createdAt: r.createdAt,
      userName: r.user?.name || "Customer",
      userEmail: r.user?.email || "N/A",
    }));

    // Sorting by column
    if (sortBy === "userName") {
      result.sort((a, b) =>
        order === "desc"
          ? b.userName.localeCompare(a.userName)
          : a.userName.localeCompare(b.userName)
      );
    } else if (sortBy === "email") {
      result.sort((a, b) =>
        order === "desc"
          ? b.userEmail.localeCompare(a.userEmail)
          : a.userEmail.localeCompare(b.userEmail)
      );
    } else if (sortBy === "rating") {
      result.sort((a, b) =>
        order === "desc" ? b.rating - a.rating : a.rating - b.rating
      );
    } else if (sortBy === "date" || sortBy === "createdAt") {
      result.sort((a, b) =>
        order === "desc"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      );
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
