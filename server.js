require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const {connectDB} = require('./db/mongoclient.js');
const adminRoutes = require('./routes/adminRoutes.js')
const employeeRoutes = require('./routes/employeeRoutes.js')



const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({origin:'*'}));
// app.use(cors({origin:'https://mern-assi-frontend.vercel.app/'}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));//for serve uploaded images
app.use('/api/admin', adminRoutes);
app.use('/api/employees', employeeRoutes);


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on http://localhost:${PORT}`);

    })
})
