import React from 'react'

import './index.css'

const LoginAndRegister = () => {
  return (
    <div className='login-container'>
      <div className='login-sub-container'>
        <img src="https://img.freepik.com/free-photo/sign-user-password-privacy-concept_53876-120316.jpg?t=st=1744974984~exp=1744978584~hmac=2db7622da849194c8c21472523eafddc4f1a2978a9e026960aae95d5d90daf68&w=1380" alt="login image" className='login-image' />
        <div className='login-form-container'>
            <h1 className="login-header"><span className='login-special-head'>Foo</span>die</h1>
            <h1 className='login-head'>Login</h1>
            <form className='login-form'>
                <label htmlFor="username" className='login-label'>Username</label><br />
                <input type="text" id='username' className='login-input' /><br />
                <label htmlFor="password" className='login-label'>Password</label><br />
                <input type="password" id='password' className='login-input' /><br />
                <button type='submit' className='login-button'>Login</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default LoginAndRegister
