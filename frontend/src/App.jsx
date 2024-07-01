import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { UserContextProvider } from '../context/userContext'

axios.defaults.baseURL = `${import.meta.env.VITE_API}`;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <div className='w-full flex justify-center font-Prompt items-center h-screen bg-primaryBg text-primaryText'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          limit={2}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Slide}
        />
      </div>
    </UserContextProvider>
  )
}

export default App