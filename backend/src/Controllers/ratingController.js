import Rating from "../models/Rating.js";
import Store from '../models/Store.js'


export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    if (!storeId || !rating) {
      return res.status(400).json({
        message: "Store and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const store = await Store.findById(storeId);

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const existingRating = await Rating.findOne({
      user: req.user.id,
      store: storeId,
    });

    if (existingRating) {
      existingRating.rating = rating;

      await existingRating.save();

      return res.json({
        message: "Rating updated successfully",
        rating: existingRating,
      });
    }

    const newRating = await Rating.create({
      user: req.user.id,
      store: storeId,
      rating,
    });

    res.status(201).json({
      message: "Rating submitted successfully",
      rating: newRating,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};