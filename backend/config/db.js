const { PrismaClient } = require("@prisma/client");

// Instanciamos el PrismaClient
const prisma = new PrismaClient();

// Funcion que verifica si estamos conectados a la DB
const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("Conexión a la base de datos establecida");
  } catch (error) {
    console.log("Conexión a la base de datos establecida");
  }
};

// Funcion para desconectarse de la DB
const disconnectFromDatase = async () => {
  await prisma.$disconnect();
  console.log('Desconectado de la base de datos');
};

module.exports = {connectToDatabase, disconnectFromDatase, prisma}
