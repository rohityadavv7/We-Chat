import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

function Navbar() {
  return (
    <div className='w-11/12 mx-auto flex justify-between'>
        <h1 className='bg flex gap-4 ml-16 items-center justify-start font-semibold text-3xl mx-auto'>
            <p className='bg text-white mt-4 font-inter'>V-Chat</p>
            <IoIosArrowForward className='text-white mt-4'/>
        </h1>

        <div>
            <h2 className=' text-xl text-white font-semibold bg-blue-1 shadow-blue-1 px-10 py-4 rounded-full mt-4'>
              No sign up, No log in required
            </h2>
        </div>
    </div>
  )
}

export default Navbar
