const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'El correo electrónico ya está registrado.' });
    }
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al registrar el usuario.' });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }
    const isValidPassword = await user.isValidPassword(
      String(req.body.password)
    );

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.id }, jwtSecret, {
      expiresIn: '1h',
    });
    res.json({ message: 'Inicio de sesión exitoso.', token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al iniciar sesión.' });
  }
};

const verifyToken = (req, res) => {
  const token = req.body.token;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token no válido' });
    }
    const user = await User.findByPk(decoded.userId);
    res.json({ message: 'Token válido', tokenIsValid: true, user });
  });
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
};
