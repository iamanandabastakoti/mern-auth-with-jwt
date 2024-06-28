import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(userData)
    try {
      await axios.post('/auth/register', userData);
      toast.success("Account created successfully");
      setUserData({
        username: '',
        email: '',
        password: ''
      });
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error("Unable to create the account!");
    }
  }
  return (
    <div className='w-1/3 flex flex-col items-center gap-3'>
      <h3 className='text-3xl text-center font-Montserrat text-mainColor'>Create an account</h3>
      <form onSubmit={handleRegister} className='flex flex-col gap-3 w-full'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="username">Username</label>
          <input className='p-2 rounded-lg bg-gray-700 outline-none text-primaryText' type="text" name='username' id='username' value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} placeholder='username' />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email">Email</label>
          <input className='p-2 rounded-lg bg-gray-700 outline-none text-primaryText' type="email" name='email' id='email' value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} placeholder='e.g. yourname@email.com' />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password">Password</label>
          <input className='p-2 rounded-lg bg-gray-700 outline-none text-primaryText' type="password" name='password' id='password' value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} placeholder='password' />
        </div>
        <button className='w-full bg-mainColor hover:brightness-90 active:scale-90 duration-500 rounded-lg p-2' type="submit">Register</button>
      </form>
      <div>
        Already have an account? <Link to={'/login'} className='text-mainColor'>Login</Link>
      </div>
    </div>
  )
}

export default Register