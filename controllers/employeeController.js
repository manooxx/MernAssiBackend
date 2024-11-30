// controllers/employeeController.js
const { getDB } = require('../db/mongoclient.js');
const { ObjectId } = require('mongodb');

exports.getEmployees = async (req, res) => {
  try {
    const db = getDB();
    const employees = await db.collection('employees').find().toArray();
    employees.forEach(emp => {
        if (emp.image) {
          emp.image = `${req.protocol}://${req.get('host')}${emp.image}`;
        }
      });
      res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  const image = req.file?`/uploads/${req.file.filename}`: null;
  const joiningDate = new Date().toISOString();
  try {
    const db = getDB();
    await db.collection('employees').insertOne({ name, email, mobile, designation, gender, course, joiningDate, image });
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, designation, gender, course } = req.body;
  const image = req.file?`/uploads/${req.file.filename}` : null;
  try {
    const db = getDB();
    const updateFields = { name, email, mobile, designation, gender, course };
    if (image) updateFields.image = image;

    await db.collection('employees').updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, email, mobile, designation, gender, course, image } }
    );
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
      const db = getDB();
      const result = await db.collection('employees').deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        res.json({ message: 'Employee deleted successfully' });
      } else {
        res.status(404).json({ message: 'Employee not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
