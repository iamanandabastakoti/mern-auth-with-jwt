import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div className='min-h-screen w-full bg-primaryText text-primaryBg'>
      <div className='sticky top-0 left-0 min-h-16 shadow-xl flex justify-center items-center'>
        <div className='w-3/5 flex items-center justify-between'>
          <h1>MERN Auth With JWT</h1>
          <div className='flex flex-col items-end'>
            <div className='flex gap-1'>
              <span>Username:</span>
              <span>{user?.username}</span>
            </div>
            <div className='flex gap-1 text-sm text-gray-400'>
              <span>Email:</span>
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='p-4'>Welcome {user?.name}. This is the main home page of the MERN Auth with JWT</div>
    </div>
  )
}

export default Home