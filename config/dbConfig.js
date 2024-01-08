const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;

connection.on("connected",()=>{
    console.log("MongoDB Connected");0
});

connection.on("error",(error)=>{
    console.log("Error in Mongodb Connection",error);
});




module.exports = mongoose;