import Comment from "../models/CommnetModel.js";

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const productId = req.params.productId;

    const newComment = new Comment({
      text,
      product: productId,
      user: req.user,
    });

    await newComment.save();

    res.status(201).json({
      success: true,
      data: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getCommentsByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;

    const comments = await Comment.find({ product: productId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    if (comments.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No comments found for this product",
      });
    }

    res.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
