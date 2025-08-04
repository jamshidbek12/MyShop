import Product from "../models/ProductModel.js";

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Server error");
  }
}

export async function getProductById(req, res) {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product by id:", error);
    res.status(500).send("Server error");
  }
}

export async function addProduct(req, res) {
  try {
    const product = req.body;
    if (!product.name || !product.price || !product.descr || !product.img) {
      return res.status(400).send("All fields are required");
    }

    const newProduct = new Product(product);

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send("Server error");
  }
}

export async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const product = req.body;

    if (!product.name || !product.price || !product.descr || !product.img) {
      return res.status(400).send("All fields are required");
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Server error");
  }
}

export async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send("Product not found");
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Server error");
  }
}
