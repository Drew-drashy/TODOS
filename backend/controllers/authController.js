
const User=require('../models/User.js');
const jwt=require('jsonwebtoken');

exports.register=async (req,res) => {
    const {email,password}=req.body;
    try{
        // console.log(email,password);
        const present=await User.findOne({email});
        if(present) return res.status(401).json({error:"already present"});
        const user =await User.create({email,password});
        const token=jwt.sign({ id:user._id},process.env.JWT_SECRET,{expiresIn:'2h'});
        return res.status(201).json({token});
        
    }
    catch(err){
        console.log(err,'error in registering the user');
        throw new Error(err);


    }

}

exports.login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user || await user.compare) return res.status(500).json({error:"Worng credentials or user cannot be found"});
        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:"2h"});
        return res.status(200).json({token});
    }
    catch(err){
        return res.status(500).json({error:'cannot login'})
    }

}