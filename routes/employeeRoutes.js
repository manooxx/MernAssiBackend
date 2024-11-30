const express = require('express');
const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

const { verifyToken } = require('../middleware/authMiddleware.js')
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

const upload = multer({storage});

const router = express.Router();

router.get('/', verifyToken, getEmployees);
router.post('/', verifyToken, upload.single('image'), createEmployee);

router.put('/:id', verifyToken, upload.single('image'), updateEmployee);
router.delete('/:id', verifyToken, upload.single('image'), deleteEmployee);

module.exports = router;