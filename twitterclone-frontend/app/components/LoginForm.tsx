// components/LoginForm.js
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from "../api/auth";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Handle successful login, maybe redirect or show a message
      console.log('Login successful:', data);
    },
    onError: (error) => {
      // Handle error during login
      console.error('Login error:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(username);
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your username"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;