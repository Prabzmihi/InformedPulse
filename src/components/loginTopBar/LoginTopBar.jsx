import React from 'react'
import './loginTopBar.css'
import logo from '../../assets/logo/logo.png'

const LoginTopBar = () => {
  return (
    <div className='topBarContainer'>
      <img src={logo} className='companyLogo' />
    </div>
  )
}

export default LoginTopBar
