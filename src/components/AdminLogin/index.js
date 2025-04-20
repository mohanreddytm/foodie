import React from 'react'
import { useNavigate } from "react-router-dom";
import { Hourglass } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'

const AdminLogin = () => {

    
      const [isloginingin, setlisloginingin] = useState(false)

    const navigate = useNavigate();

    const [isErrorLogin, setIsErrorLogin] = useState(false);
    const imageUrl = "https://img.freepik.com/free-photo/sign-user-password-privacy-concept_53876-120316.jpg?t=st=1744974984~exp=1744978584~hmac=2db7622da849194c8c21472523eafddc4f1a2978a9e026960aae95d5d90daf68&w=1380";

  const [isLogin, setIsLogin] = useState(true);
const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");


const onClickLoginOne = () => {
    setIsLogin(true); 
  }
  const onclickLoginButtonone = (event) => {



    event.preventDefault();

    if (loginEmail === "" || loginPassword === "") {
      setIsErrorLogin(true);  
      setlisloginingin(false);
    } else {
      setlisloginingin(true);
      setIsErrorLogin(false);
      const url = "https://forfoodie.onrender.com/admin/login/";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      }

      const fetchData = async () => {
        console.log("Seee");
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("noenonoasndg")
        console.log(data)
        if (response.ok) {
          Cookies.set("admin_token", data.jwtToken, { expires: 30 });  
          Cookies.remove("jwt_token")
          navigate("/");
        } else {
          alert("Login Failed")
        }
        console.log(data);
      }

      fetchData();
    }

  }
    const login = () => {
        return (
            <div className='login-sub-container'>
              <img src={imageUrl} alt="login image" className={`login-image ${isLogin ? "" : "image-login-change"}`} />
    
              <div className={`login-form-container ${isLogin ? "" : "login-form-container-change"}`}> 
                <div className='login-header-cont'>            
                  <h1 className="login-header"><span className='login-special-head'>Foo</span>die</h1>
                  <h1 className='login-head'> - Admin Login</h1>
                </div>
    
              <form className='login-form'>
                <label htmlFor="usernamelogin" className='login-label'>Email</label><br />
                <input onChange={(e) => setLoginEmail(e.target.value)} value={loginEmail} placeholder='Ex:email@domain.com' type="text" id='usernamelogin' className='login-input' /><br />
                <label htmlFor="passwordlogin" className='login-label'>Password</label><br />
                <input onChange={(e) => setLoginPassword(e.target.value)}  value={loginPassword} placeholder='Enter Password Here' type="password" id='passwordlogin' className='login-input login-input-2' /><br />
                <div className='login-button-container'>
                  <button type='submit' className='login-button' onClick={onclickLoginButtonone}>Login</button>
                </div>
                {isErrorLogin && <p className='error-register'>* Please fill all the Required Feilds *</p>}
    
              </form>
              </div>
              {isloginingin && 
              <div className='loading-login-cont-main'>
                          <Hourglass
                          visible={true}
                          height="40"
                          width="40"
                          ariaLabel="hourglass-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          colors={['#306cce', '#72a1ed']}
                          />
                      </div>}
            </div>
        )
      }
    

  return (
    <div className='admin-login'>
      {login()}
    </div>
  )
}

export default AdminLogin
