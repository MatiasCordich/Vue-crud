const { prisma } = require("../../config/db.js");

const getAll = async () => {
  try {
    const response = await prisma.producto.findMany();

    return response;
  } catch (error) {
    throw new Error("ERROR_GET_PRODUCT");
  }
};

const getById = async (id) => {
  try {
    const response = await prisma.producto.findUnique({
      where: {
        id_producto: Number(id),
      },
    });

    return response;
  } catch (error) {
    throw new Error("ERROR_GET_PRODUCT");
  }
};

const create = async (data) => {
  try {
    const response = await prisma.producto.create({ data });

    return response;
  } catch (error) {
    throw new Error("ERROR_CREATE_PRODUCT");
  }
};

const update = async (id, data) => {
  try {

    const response = await prisma.producto.update({
        where: {id_producto: Number(id)},
        data
    })

    return response;
  } catch (error) {
    throw new Error("ERROR_UPDATE_PRODUCT");
  }
};

const erase = async (id) => {
  try {

    const response = await prisma.producto.delete({
      where: {id_producto: Number(id)}
    })

    return response;
  } catch (error) {
    throw new Error("ERROR_DELETE_PRODUCT");
  }
};

module.exports = { getAll, getById, create, update, erase };
