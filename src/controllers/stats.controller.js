const UserStats = require('../models/UserStats');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.saveUserStats = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Acceso no autorizado. Token no proporcionado.' });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, jwtSecret);
    const { score, fails, time } = req.body;
    const userStats = await UserStats.create({
      userId: decodedToken.userId,
      score,
      fails,
      time,
    });

    return res.status(201).json({
      message: 'Estadísticas de usuario guardadas con éxito',
      userStats,
    });
  } catch (error) {
    console.error('Error al guardar las estadísticas:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Acceso no autorizado. Token no proporcionado.' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, jwtSecret);

    const { count, rows } = await UserStats.findAndCountAll({
      where: { userId: decodedToken.userId },
    });

    if (!rows) {
      return res
        .status(404)
        .json({ error: 'No se encontraron estadísticas para este usuario.' });
    }

    res.json({
      count,
      userStats: rows,
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido.' });
    }
    console.error(error);
    res.status(500).json({
      error: 'Hubo un error al obtener las estadísticas del usuario.',
    });
  }
};
