const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const authMiddleware = require("../middlewares/authMiddleware");


router.get("/get-doctor-by-user-id", authMiddleware, async(req,res)=>{
    //console.log("jsdfjsl",req.body);
    try {
        const doctor = await Doctor.findOne({_id:req.body.userId});
        res.status(200).send({
            success:true,
            message:"Doctor info fetched successfully",
            data:doctor
        })
    } catch (error) {
        res.status(400).send({
            message:"Error getting doctor info",
            success:false
        })
    }
})

module.exports = router;