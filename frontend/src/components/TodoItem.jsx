import React from 'react';
import Api from '../services/Api';

const TodoItem = ({ todo, fetchTodos }) => {
  const handleToggleComplete = async (e) => {
    e.preventDefault();  // Fix: invoke the preventDefault function
    try {
      await Api.put(`/auth/update/${todo._id}`, { completed: !todo.completed });
      fetchTodos(); // Fetch updated todos after completion toggle
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();  // Fix: invoke the preventDefault function
    try {
      await Api.delete(`/auth/delete/${todo._id}`);
      fetchTodos(); // Fetch updated todos after deletion
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <li className="flex justify-between items-center p-2 border rounded-md bg-gray-50">
      <span
        className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
        onClick={handleToggleComplete}  // No need for e here; it's passed automatically
      >
        {todo.title}
      </span>
      <button
        onClick={handleDelete}  // No need for e here; it's passed automatically
        className="px-2 py-1 text-red-500 hover:text-red-700 transition duration-300"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
