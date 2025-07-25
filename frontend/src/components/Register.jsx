
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast'
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const navigate = useNavigate();

    function handleOnChange(e) {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        }
        else if (name === 'password') {
            setPassword(value);
        }
        else if (name === 'email') {
            setEmail(value);
        }
    }


    function handleSubmit(e) {
        e.preventDefault();
        if(!username || !password || !email){
            alert("Enter the details properly")
            return ;
        }
        axios.post('http://localhost:3002/auth/signup',{
            username,
            password,
            email
        })
        .then(res=>{
            console.log(res.data)
            if(res.data.success){
                toast.success("Register Successfully");
                navigate('/');
            }
            
        })
        .catch(err=>{
            console.log(err.response.data)
            toast.error(err.response.data.message || "Register Faiked");
    });

    }
    return (
        <div className="flex items-center justify-center  px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
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
                    <div className="mb-5">
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            placeholder="Enter your email"
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
                        //   onClick={()=>navigate('/')}
                        >
                            Register
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="w-full ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register