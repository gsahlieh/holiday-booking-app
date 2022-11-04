import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'

function Login() {
  const [credentials, setCerdentials] = useState({
    username: undefined,
    password: undefined,
  })

  const { error, dispatch } = useContext(AuthContext)

  const handleChange = ((e) => {
    setCerdentials(prev => ({...prev, [e.target.id]: e.target.value}))
  })

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({type: "LOGIN_START"})
    try{
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials)
      dispatch({type: "LOGIN_SUCCESS", payload: res.data})
    }catch(err){
      dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-black/[.6] fixed top-0 left-0 flex z-10">
      <div className="text-black border-2 border-blue-700 rounded flex flex-col m-auto bg-white md:w-[16vw] w-[50vw] h-[15vh] justify-between overflow-auto relative">
        <input type="text" placeholder="username" id="username"
          onChange={handleChange}
          className="text-center border-b-2 border-black pb-1 h-full"
        />
        <input type="password" placeholder="password" id="password"
          onChange={handleChange}
          className="text-center border-b-2 border-black pb-1 h-full"
        />
        <button
          onClick={handleClick}
          className="p-1 text-white bg-gradient-to-b from-blue-600 to-blue-400 h-full"
        >Login</button>
        {error && <span className="text-center bg-red-500">{error.message}</span>}
      </div>

      <div>

      </div>
    </div>
  )
}

export default Login
