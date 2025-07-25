import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleOnChange(e) {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    if(!username){
        alert('Enter the userName')
        return ;
    }
    if(!password){
        alert("Enter the Password");
        return ;
    }

    axios.post('http://localhost:3002/auth/login',{
        username,
        password,
    }).then(res=>{
        console.log(res.data)
        if(res.data.success){
            toast.success('Login Successful');
            navigate('/home');
        }
        
    }
    ).catch(err=>{
      console.log(err.response.data)
      toast.error(err.response.data.message || "Login Failed")
    });

  }

  return (
    <div className="flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleOnChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full mr-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            //   onClick={()=>navigate('/home')}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="w-full ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition-colors"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
