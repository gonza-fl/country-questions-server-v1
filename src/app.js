const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;

const userRoutes = require('./routes/user.routes');
const statsRoutes = require('./routes/stats.routes');

const sequelize = require('./database');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/stats', statsRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Conexión a la base de datos establecida.');
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
