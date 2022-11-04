import React, { useState } from 'react'
import { motion } from "framer-motion";

import logo from "../assets/bookingLogo.svg";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Login from './Login';

function Navbar() {

  const { user } = useContext(AuthContext)

  const [openLogin, setOpenLogin] = useState(false);
  const handleClick = () => {
    setOpenLogin(true)
  }
  const handleClose = () => {
    setOpenLogin(false)
  }

  return (
    
    <div className="w-full h-fit -bg-[#2F2FA2] bg-[#000080] text-white">
      <div className="md:w-[70vw] w-[90vw] m-auto h-[20vh] min-h-[60px] flex md:flex-row flex-col justify-between">

        <div className="flex-1 md:m-auto mx-auto mt-[5vh]">
          <div className="w-fit">
              <a href="/">
                <motion.h1 className="text-4xl font-serif cursor-pointer text-sky-200"
                  whileHover={{opacity: 0.8}}
                  whileTap={{scale: 0.9}}
                >
                  GS Booking
                </motion.h1>
              </a>
          </div>
        </div>

        <div className="h-full m-auto hidden md:flex  ">
        <a  href="/">
          <div className='h-full flex items-center'>

            <motion.img
              className="h-2/3 m-auto"
              src={logo} alt="personal logo"
              whileHover={{opacity: 0.8}}
              whileTap={{scale: 0.9}}
            />
  
          </div>
          </a>
        </div>

        <div className="flex-1 flex-row my-auto m-auto">
          {user ? (
            <div className="flex flex-col ml-auto w-fit">
              <h1 className="font-serif text-xl">Welcome, <b className="text-sky-200">{user.username}</b></h1>
              <motion.button className="md:ml-auto md:mr-0 m-auto mt-[1vh] bg-gradient-to-b from-sky-700 to-sky-400 w-[6vw] min-w-[82px] h-[30px] shadow-lg shadow-gray-600 cursor-pointer rounded"
                whileHover={{scale: 1.05, transition: {type: "spring", stiffness: 300, damping: 10}}}
                whileTap={{scale: 0.9}}
              >
                Log out
              </motion.button>
            </div>
            ) : (
            <div className="w-fit h-fit ml-auto">
              <motion.button className="mr-4 bg-gradient-to-b from-sky-700 to-sky-400 w-[6vw] min-w-[82px] h-[30px] shadow-lg shadow-gray-600 cursor-pointer rounded"
                whileHover={{scale: 1.05, transition: {type: "spring", stiffness: 300, damping: 10}}}
                whileTap={{scale: 0.9}}
              >
                Register
              </motion.button>
              <motion.button className="bg-gradient-to-b from-sky-700 to-sky-400 w-[6vw] min-w-[82px] h-[30px] shadow-lg shadow-gray-600 cursor-pointer rounded"
                whileHover={{scale: 1.05, transition: {type: "spring", stiffness: 300, damping: 10}}}
                whileTap={{scale: 0.9}}
                onClick={handleClick}
              >
                Login
              </motion.button>
            </div>
          )}     
        </div>
      </div>
      {openLogin && (
        <div className="">
          <button className="text-center fixed top-[38vh] right-[46.5vw] z-20 w-[5vw] rounded bg-red-600 cursor-pointer"
            onClick={handleClose}
          >Exit</button>
          <Login />
        </div>
      )}
    </div>
  )
}

export default Navbar