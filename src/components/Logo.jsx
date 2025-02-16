import React from 'react'
import logol from "../assets/logol.png"
import logo from "../assets/logo.png"
import { useSelector } from 'react-redux'

function Logo({width ="500px"}) {
  const darkMode=useSelector(state=>state.theme.darkMode)
  return (
    <img width={width} src={darkMode ? logol : logo} alt="Logo" />
  )
}

export default Logo