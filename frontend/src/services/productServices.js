import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${backendUrl}/productos`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${backendUrl}/producto/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
  }
};

export const addProduct = async (formData) => {
  try {
    const response = await axios.post(`${backendUrl}/producto`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (id, formData) => {
  try {
    const response = await axios.put(`${backendUrl}/producto/${id}`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${backendUrl}/producto/${id}`);

    return response.data
  } catch (error) {
    console.log(error);
  }
};
