import React from 'react'
import logo from '../assets/logo.png'

function Logo({width = '100px'}) {
  return (
    <img src={logo} alt="" className={`${width} h-[50px]`}/>
  )
}

export default Logo