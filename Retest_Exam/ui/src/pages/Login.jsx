import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   
    const navigate = useNavigate();
    
    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('/api/login',{
                method:'POST',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    UserName: username,
                    Password: password,
                }),
            });
            
            if(!response.ok) {
                const errData = await response.json();
                throw new Error(errData.msg || 'Signup failed');
            }

            navigate('/'); 
        } catch(err) {
            setError(err.message || 'Invalid credentials: Please try again!')
        }
    };
  return (
    <div>
        <div className='max-w-lg mx-auto mt-72 p-4 rounded-lg bg-white shadow-lg shadow-cyan-300'>
            <h1 className='text-2xl text-center text-cyan-500 font-bold mb-4'>Login</h1>
            <form className='space-y-4' onSubmit={handleLogin}>
                <div className='mb-4'>
                    <label htmlFor="" className='font-medium'>UserName:</label>
                    <input type="text" className='w-full border p-2 rounded-lg'
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='font-medium'>Password:</label>
                    <input type="password" className='w-full border p-2 rounded-lg'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <button className="bg-cyan-700 text-white ml-44 px-4 py-2 rounded" type="submit">
                    Login
                </button>
                <p> Don't have an account?
                    <Link to='/signup' className='text-cyan-700'>Signup</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Login