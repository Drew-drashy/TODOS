const express=require('express');
const {createTodo,deleteTodo,getTodos,updateTodo}=require('../controllers/todoController.js');
const auth=require('../middleware/auth.js');
const router=express.Router();

router.post('/add', auth, createTodo);
router.get('/get', auth, getTodos);
router.put('/update/:id', auth, updateTodo);
router.delete('/delete/:id', auth, deleteTodo);

module.exports = router;