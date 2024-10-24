require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cors());

const authRoutes=require('./routes/authRoutes.js');
const todoRoutes=require('./routes/todoRoutes.js');


app.use('/api/auth',authRoutes);
app.use('/api/auth',todoRoutes);
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
    console.log('connected to MongodDB');
    const port=process.env.PORT|| 5000;
    app.listen(port,()=>{
        console.log(`server is runnning on the ${port}`);
    })
})
.catch((err)=>{
    console.log(err);
})