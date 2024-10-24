const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    completed:{
        type:Boolean,
        default:false,
    },
    dueDate:{
        type:Date,
    },
    priority:{
        type:String,
        enum:['Low','Medium','High'],
        default:'Low',
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
});

module.exports=mongoose.model("Todo",todoSchema);