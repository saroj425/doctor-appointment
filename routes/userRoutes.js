const express = require("express");
const router = express();
const User = require("../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const Doctor = require("../models/doctorModel");

router.post("/register",async(req,res)=>{
    try {
        const userExist = await User.findOne({email:req.body.email})
        if(userExist){
            return res.status(200).send({
                message:"User Already Exist",
                success:false
            })
        }
        const password = req.body.password;
        const Salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,Salt);
        req.body.password = hashedPassword;

        const newuser = new User(req.body);
        await newuser.save();
        res.status(200).send({
            message:"User Created Successfully",success : true
        })
    } catch (error) {
        res.status(500).send({
            message:"Error in Creating User",
            success:false,
            error
        })
    }
})

router.post("/login",async(req,res)=>{
    try {
        const user = await User.findOne({ email:req.body.email })
        if(!user){
            return res.status(200).send({
                message:"User doesnot exist",
                success:false
            })
        }
        const isMached = await bcrypt.compare(req.body.password,user.password);
        if(!isMached){
            return res.status(400).send({
                message:"Password doesnot mached",
                success:false
            })
        }else{
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
                expiresIn:"1d"
            })
            res.status(200).send({
                message:"Login Success",
                success:true,
                data:token
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Error in Login",success:false,error
        })
    }
})

router.post("/getuserinfobyid", authMiddleware, async(req,res)=>{
    //console.log("jsdfjsl",req.body);
    try {
        const user = await User.findOne({_id:req.body.userId});
        user.password = undefined;
        if(!user){
            return res.status(200).send({
                message:"User does not exists",
                success:false
            })
        }else{
            return res.status(200).send({
                //message:"User does not exists",
                success:true,
                data:user
            })
        }
    } catch (error) {
        res.status(400).send({
            message:"Error getting userinfo",
            success:false
        })
    }
})

router.post("/applydoctoraccount",authMiddleware,async(req,res)=>{
    //console.log(req.body)
    try {
        const newdoctor = new Doctor({...req.body , status:"Pending"});
        await newdoctor.save();
        const adminuser = await User.findOne({isAdmin:true});
        //console.log("adminuseradminuser",adminuser)
        const unseenNotifications = adminuser.unseenNotifications;
        //console.log("unseenNotifications",unseenNotifications);
        unseenNotifications.push({
            type:"New Doctor Request",
            message:`${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
            data:{
                doctorId: newdoctor._id,
                name:newdoctor.firstName +" " + newdoctor.lastName
            },
            onClickPath:"/admin/doctor"
        })
        await User.findByIdAndUpdate(adminuser._id,{unseenNotifications});
        res.status(200).send({
            success:true,
            message:"Doctor account applied successfully"
        })
    } catch (error) {
        res.status(500).send({
            message:"Error in applying doctor account",
            success:false,
            error
        })
    }
})

router.post("/mark-all-notification-seen",authMiddleware,async(req,res)=>{
    //console.log(req.body)
    try {
        const user = await User.findOne({_id:req.body.userId})
        //console.log("useruser",user)
        const seenNotifications = user.seenNotifications;
        const unseenNotifications = user.unseenNotifications;
        //console.log("unseenNotificationsunseenNotifications",unseenNotifications)
        seenNotifications.push(...unseenNotifications);
        console.log("user.seenNotifications",user.seenNotifications)
        user.unseenNotifications=[];
        user.seenNotifications = seenNotifications;
        // const updateduser = await User.findByIdAndUpdate(user._id,user);
        const updateduser = await user.save();
        console.log("updateduserupdateduser",updateduser)
        updateduser.password = undefined;
        res.status(200).send({
            success:true,
            message:"All notifications mark as seen",
            data:updateduser
        });
    } catch (error) {
        res.status(500).send({
            message:"Error in applying doctor account",
            success:false,
            error
        })
    }
})

router.post("/delete-all-notification ",authMiddleware,async(req,res)=>{
    //console.log(req.body)
    try {
        const user = await User.findOne({_id:req.body.userId})        
        user.seenNotifications = [];
        unseenNotifications=[];
        const updateduser  = await user.save();
        updateduser.password = undefined;
        res.status(200).send({
            success:true,
            message:"All notifications are deleted",
            data:updateduser
        });
    } catch (error) {
        res.status(500).send({
            message:"Error in applying doctor account",
            success:false,
            error
        })
    }
})



module.exports = router;