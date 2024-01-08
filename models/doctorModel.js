const mongoose =require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        firstName:{
           type: String,
           required:true,

        },
        lastName:{
            type:String,
            required:true,
        },
        // email:{
        //     type:String,
        //     required:true
        // },
        phoneNumber:{
            type:String,
            required:true
        },
        website:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        specialization:{
            type:String,
            required:true
        },
        experience:{
            type:Number,
            required:true
        },
        feePerConsultation:{
            type:Number,
            required:true
        },
        timings:{
            type:Array,
            required:true
        },
        status:{
            type:String,
            default:"Pending"
        }
    },{
        timestamps:true
    }
)

module.exports = mongoose.model("Doctor",doctorSchema);