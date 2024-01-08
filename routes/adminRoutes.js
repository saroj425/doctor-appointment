const express = require("express");
const router = express();
const User = require("../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Doctor = require("../models/doctorModel");



router.get("/get-all-users",authMiddleware,async(req,res)=>{
    try {
            const user = await User.find({});
            res.status(200).send({
                message:"User Fatched successfully",
                success:true,
                data:user
            })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message:"Error in loading data",
            success:false,
            error
        })
    }
        
})

router.get("/get-all-doctors",authMiddleware,async(req,res)=>{
    try {
            const doctor = await Doctor.find({});
            res.status(200).send({
                message:"Doctor Fatched successfully",
                success:true,
                data:doctor
            })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message:"Error in loading data",
            success:false,
            error
        })
    }        
})

router.post("/change-doctor-status",authMiddleware,async(req,res)=>{
    try {
        const {doctorId,status} = req.body;
        //console.log("doctorIddoctorIddoctorId",doctorId,status);
        const doctor = await Doctor.findByIdAndUpdate(doctorId,{
            status,
        });
        //console.log("doctordoctordoctor",doctor)
        // const user = await User.findOne({_id:userId})
        const user = await User.findOne({_id:doctor.userId})
        //console.log("useruser",user)
        const unseenNotifications = user.unseenNotifications;
        unseenNotifications.push({
            type:"New Doctor request change",
            message:`${doctor.firstName} ${doctor.lastName} has changed his status to ${status}`,
            onCLickPath:"/notifications"
        });
        //await User.findByIdAndUpdate(user._id,{unseenNotifications})
        user.isDoctor = status === "Approved" ? true :false;
        console.log("user.isDoctoruser.isDoctor",user.isDoctor)
        await user.save();
        res.status(200).send({
            message:"Doctor status updated successfully",
            success:true,
            data:doctor
        })
    } catch (error) {
        res.status(401).send({
            message:"Error in status updated",
            success:false,
            error
        })
    }
})



module.exports = router;