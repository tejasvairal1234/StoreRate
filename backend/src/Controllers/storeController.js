import Store from "../models/Store.js";
import Rating from '../models/Rating.js'

export const getStores = async (req, res) => {
  try {
    const { name, address, sortBy = "name", order = "asc" } = req.query;

    const filter = {};

    if (name) {
      filter.name = {
        $regex: name,
        $options: "i",
      };
    }

    if (address) {
      filter.address = {
        $regex: address,
        $options: "i",
      };
    }

    const sort = {};

    sort[sortBy] = order === "desc" ? -1 : 1;

    const stores = await Store.find(filter)
      .populate("owner", "name email")
      .sort(sort);

    const result = [];

    for (const store of stores) {
      const ratings = await Rating.find({
        store: store._id,
      });

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
        name: store.name,
        email: store.email,
        address: store.address,
        owner: store.owner,
        averageRating: Number(averageRating.toFixed(2)),
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
