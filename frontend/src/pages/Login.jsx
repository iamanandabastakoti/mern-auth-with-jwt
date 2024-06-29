import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })
  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(userData)
    try {
      const response = await axios.post('/auth/login', userData);
      console.log(response.data.error);
      if (response.data.error) {
        toast.error(response.data.error)
      } else {
        toast.success('Logged in successfully');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to login!");
    }
  }
  return (
    <div className='w-1/3 flex flex-col items-center gap-3'>
      <h3 className='text-3xl text-center font-Montserrat text-mainColor'>Login into your account</h3>
      <form onSubmit={handleLogin} className='flex flex-col gap-3 w-full'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="username">Username</label>
          <input className='p-2 rounded-lg bg-gray-700 outline-none text-primaryText' type="text" name='username' id='username' value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} placeholder='username' />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password">Password</label>
          <input className='p-2 rounded-lg bg-gray-700 outline-none text-primaryText' type="password" name='password' id='password' value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} placeholder='password' />
        </div>
        <button className='w-full bg-mainColor hover:brightness-90 active:scale-90 duration-500 rounded-lg p-2' type="submit">Login</button>
      </form>
      <div>
        Don't have an account? <Link to={'/register'} className='text-mainColor'>Create One</Link>
      </div>
    </div>
  )
}

export default Login