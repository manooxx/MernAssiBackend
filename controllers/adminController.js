// controllers/adminController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('../db/mongoclient.js');

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = getDB();
    const admin = await db.collection('admins').findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = getDB();
    console.log(db);
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('admins').insertOne({ email, password: hashedPassword });
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
