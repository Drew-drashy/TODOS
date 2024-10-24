import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import Api from '../services/Api';

const TodoList = () => {
  const [todos, setTodos] = useState([]); // Initialize as an empty array
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
    
  }, []);
  
  

  const fetchTodos = async () => {
    try {
      const { data } = await Api.get('/auth/get');
      console.log('Fetched todos:', data);
      setTodos(Array.isArray(data) ? data : []); // Replace todos with the fetched data
    } catch (err) {
      console.error('Error in fetchTodos:', err);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Api.post('/auth/add', { title: newTodo });
      const newTodoItem = data.todo;

      if (typeof newTodoItem === 'object' && newTodoItem !== null && 'title' in newTodoItem) {
        setTodos((prevTodos) => [...prevTodos, newTodoItem]); // Append to existing todos
      } else {
        console.error('Unexpected data format:', data);
      }

      setNewTodo('');
    } catch (err) {
      console.error('Error in handleAddTodo:', err);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleAddTodo} className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task"
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Add
        </button>
      </form>
      <ul className="space-y-2">
  {todos.length > 0 ? (
    todos.map((todo) => (
      <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
    ))
  ) : (
    <p className="text-center text-gray-500">No tasks to show</p>
  )}
</ul>

    </div>
  );
};

export default TodoList;
