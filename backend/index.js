const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./src/routes/productRoute')
const { connectToDatabase, disconnectFromDatase } = require('./config/db')
require('dotenv').config()

const app = express()

// Middlwares
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas

app.use(productRoutes)


// Conectar a la base de datos al iniciar el servidor
connectToDatabase().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
})

// Manejar la desconexión de la base de datos al cerrar el servidor
process.on('SIGINT', () => {
    disconnectFromDatase().then(() => {
      console.log('Aplicación terminada. Desconectado de la base de datos.');
      process.exit();
    });
  });
