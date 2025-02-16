import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='w-28 px-6 py-2 duration-200 bg-[#3a4b74] font-thin  hover:bg-blue-300 rounded-full text-lg dark:bg-gray-800 text-white'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn