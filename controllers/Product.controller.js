import Product from "../models/ProductModel.js";

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find().populate("createdBy", "username");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function getProductById(req, res) {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId).populate(
      "createdBy",
      "username"
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product by id:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function addProduct(req, res) {
  try {
    const product = req.body;
    if (!product.name || !product.price || !product.descr || !product.img) {
      return res.status(400).send("All fields are required");
    }

    const newProduct = new Product({
      name: product.name,
      price: product.price,
      descr: product.descr,
      img: product.img,
      createdBy: req.user._id, // Assuming req.user is set by authentication middleware
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const product = req.body;

    const productUser = await Product.findById(productId);

    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });

    if (productUser.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "You are not authorized to update this product",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findById(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    if (deletedProduct.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: "You are not authorized to delete this product",
      });
    }

    await Product.findByIdAndDelete(productId);

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}
