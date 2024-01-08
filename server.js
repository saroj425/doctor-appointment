const express = require("express");
const app = express();
require('dotenv').config();
//const mongoose = require("mongoose");
const MongoClient = require("./config/dbConfig")
const cors = require("cors")

app.use(cors());


const userRoutes = require("./routes/userRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/doctor',doctorRoutes);
app.use('/api/admin',adminRoutes);



const port = process.env.PORT || 5000;

app.listen(port,() =>console.log(`Node Server is started at Port ${port}`))