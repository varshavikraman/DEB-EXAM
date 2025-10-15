import React, {useState} from 'react'
import { useNavigate} from 'react-router-dom'
import Navbar from '../component/Navbar'

const UpdateStudent = () => {
    const[studentName,setStudentName] = useState('');
    const [department,setdepartment] = useState('');
    const[rollNo,setRollNo] = useState('');
    const [age,setAge] = useState('');
    const [address,setAddress] = useState('');

    const navigate = useNavigate()

    const handleUpdate = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('/api/updateStudent',{
                method:'POST',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    StudentName: studentName,
                    Department: department,
                    RollNo: rollNo,
                    Age: age,
                    Address:address
                }),
            });
            
            if(!response.ok) {
                const errData = await response.json();
                throw new Error(errData.msg );
            }

            navigate('/'); 
        } catch(err) {
            alert(err)
            setError(err.message || 'Invalid credentials: Please try again!')
        }
    };
  return (
    <div>
        <Navbar/>
        <div className='max-w-lg mx-auto mt-20 p-4 rounded-lg bg-white shadow-lg shadow-cyan-300'>
            <h1 className='text-2xl text-center text-cyan-500 font-bold mb-4'>Student Form</h1>
            <form className='space-y-4' onSubmit={handleUpdate}>
                <div className='mb-4'>
                    <label htmlFor="" className='font-medium'>Student Name:</label>
                    <input type="text" className='w-full border p-2 rounded-lg'
                    value={studentName}
                    onChange={(e)=>setStudentName(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='font-medium'>Department:</label>
                    <input type="text" className='w-full border p-2 rounded-lg'
                    value={department}
                    onChange={(e)=>setdepartment(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='font-medium'>Roll No.:</label>
                    <input type="number" className='w-full border p-2 rounded-lg' max={0}
                    value={rollNo}
                    onChange={(e)=>setRollNo(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='font-medium'>Age:</label>
                    <input type="number" className='w-full border p-2 rounded-lg' max={0}
                    value={age}
                    onChange={(e)=>setAge(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='font-medium'>Address:</label>
                    <input type="text" className='w-full border p-2 rounded-lg'
                     value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    />
                </div>
                <button className="bg-cyan-700 text-white ml-44 px-4 py-2 rounded" type="submit">
                    Update Student
                </button>
            </form>
        </div>
    </div>
  )
}

export default UpdateStudent