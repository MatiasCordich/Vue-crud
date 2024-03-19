const { getAll, getById, create, update, erase } = require("../model/productModel");

const getAllProducts = async (req, res) => {
  try {
    const response = await getAll();

    if (response.length === 0)
      return res.json({ message: "No hay productos todavia" });

    const products = response;
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "ERROR AL OBTENER LOS PRODUCTOS" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getById(id);

    if (!response)
      return res.status(404).json({ message: "Producto no encontrado" });

    const product = response;
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "ERROR AL OBTENER EL PRODUCTO" });
  }
};

const createProduct = async (req, res) => {
  const { nombre, descripcion, precio, disponible } = req.body;

  if (!nombre || !descripcion || !precio) {
    return res.status(400).json({ error: 'Por favor, llene los campos vacios' });
  }

  try {
    const newProduct = await create({
      nombre,
      descripcion,
      precio,
      disponible,
    });

    return res.status(201).json({
      message: "Producto creado con exito",
      newProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: "ERROR AL CREAR EL PRODUCTO" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, disponible } = req.body;

  // Verifica si los campos requeridos están presentes y tienen datos válidos
  if (!nombre || !descripcion || !precio) {
    return res.status(400).json({ error: 'Por favor, llene los campos vacios' });
  }

  const dataToUpdate = {
    nombre,
    descripcion,
    precio,
    disponible,
  };

  try {
    const existProduct = await getById(id)

    if (!existProduct) return res.status(404).json({ message: 'Producto no encontrado para modificar'});

    const updatedProduct = await update(id, dataToUpdate)

    return res.status(201).json({
      message: "Producto modificado con exito",
      updatedProduct,
    });
    
  } catch (error) {
    return res.status(500).json({ message: "ERROR AL MODIFICAR EL PRODUCTO" });
  }
  
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  
  try {
    const existProduct = await getById(id)

    if (!existProduct) return res.status(404).json({ message: 'Producto no encontrado para eliminar'});

    await erase(id)

    return res.status(201).json({
      message: "Producto eliminado con exito",
    });
    
  } catch (error) {
    return res.status(500).json({ message: "ERROR AL ELIMINAR EL PRODUCTO" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
