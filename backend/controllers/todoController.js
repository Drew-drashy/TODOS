const Todo=require('../models/Todo.js');

exports.createTodo=async(req,res)=>{
    const {title,dueDate,priority}=req.body;
    try{
        // console.log(title,dueDate,priority);
        const todo=await Todo.create({title,dueDate,priority, user:req.user.id});
        // console.log(todo);
        res.status(201).json({todo});
    }
    catch(err){
        res.status(500).json({error:"cannot create todo"});
    }
}

exports.getTodos=async(req,res)=>{
    
    try{
        const todos=await Todo.find({user:req.user.id});
        res.status(201).json({todos});
    }
    catch(err){
        res.status(500).json({error:"cannot get todo"});
    }
}

exports.updateTodo=async(req,res)=>{
        const {id}=req.params;
        const{title,completed,priority,dueDate}=req.body;
    try{
        const todos=await Todo.findByIdAndUpdate(id,{title,completed,priority,dueDate});
        res.status(201).json({todos});
    }
    catch(err){
        res.status(500).json({error:"cannot update todo"});
    }
}

exports.deleteTodo=async(req,res)=>{
    const {id}=req.params;
        // const{title,completed,priority,dueDate}=req.body;
    try{
        const todos=await Todo.findByIdAndDelete(id);
        res.status(201).json({message:'Todo deleted'});
    }
    catch(err){
        res.status(500).json({error:"cannot create todo"});
}
}
