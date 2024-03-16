const express = require("express");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ msg: "Api funcionando" });
});

// Ruta para obtener un producto por su ID
router.get("/producto/:id", getProductById);

// Ruta para actualizar un producto por su ID
router.put("/producto/:id", updateProduct);

// Ruta para eliminar un producto por su ID
router.delete("/producto/:id", deleteProduct);

// Ruta para crear un nuevo producto
router.post("/producto", createProduct);

// Ruta para obtener todos los productos
router.get("/productos", getAllProducts);

module.exports = router;
