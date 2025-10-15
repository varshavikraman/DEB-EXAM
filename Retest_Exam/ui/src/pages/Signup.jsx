import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'


const Signup = () => {
    const [name, setName]   = useState('');
    const [userName, setUsername]   = useState('');
    const [password, setPassword]   = useState('');
    const [userRole, setUserRole]   = useState('user');

    const navigate = useNavigate();

    const handleSignup = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('/api/signup',{
                method:'POST',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    Name:name,
                    UserName: userName,
                    Password: password,
                    UserRole: userRole,
                }),
            });
            
            if(!response.ok) {
                const errData = await response.json();
                throw new Error(errData.msg || 'Signup failed');
            }

            navigate('/login');
        } catch(err) {
            setError(err.message || 'Signup failed: Please try again!')
        }
    };
  return (
    <div>
        <div className='max-w-lg mx-auto mt-48 p-4 rounded-lg bg-white shadow-lg shadow-cyan-300'>
            <h1 className='text-2xl text-center text-cyan-500 font-bold mb-4'>Signup</h1>
            <form className='space-y-4' onSubmit={handleSignup}>
                <div className='mb-4'>
                    <label htmlFor="" className='font-medium'>Name:</label>
                    <input type="text" className='w-full border p-2 rounded-lg'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='font-medium'>UserName:</label>
                    <input type="text" className='w-full border p-2 rounded-lg'
                    value={userName}
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
                <div className='mb-4'>
                    <label htmlFor="" className='font-medium'>UserRole:</label>
                    <select
                        className="w-full p-2 border rounded mt-1"
                        value={userRole}
                        onChange={(e)=>setUserRole(e.target.value)}
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button className="bg-cyan-700 text-white ml-44 px-4 py-2 rounded" type="submit">
                    Signup
                </button>
                <p> Already have an account?
                    <Link to='/login' className='text-cyan-700'>Login</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Signup