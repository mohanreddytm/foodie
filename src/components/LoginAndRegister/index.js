import React from 'react'
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'

import './index.css'

const LoginAndRegister = () => {

const navigate = useNavigate();

useEffect(() => {
  console.log("Checking for token..."); // ✅ debug log
  if (Cookies.get("jwt_token")) {
    console.log("Token found. Redirecting...");
    navigate("/");
  }
}, []);




  const [isLogin, setIsLogin] = useState(true);
const [isError, setIsError] = useState(false);

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [errormsg, setErrorMsg] = useState("");
const [email, setEmail] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [address, setAddress] = useState("");
const [isErrorLogin, setIsErrorLogin] = useState(false);
const [terms, setTerms] = useState(false);

const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");


  const onClickRegisterOne = () => {
    setIsLogin(false);
  }

  const onClickLoginOne = () => {
    setIsLogin(true); 
  }



  const login = () => {
    return (
        <div className='login-sub-container'>
          <img src={imageUrl} alt="login image" className={`login-image ${isLogin ? "" : "image-login-change"}`} />

          <div className={`login-form-container ${isLogin ? "" : "login-form-container-change"}`}> 
            <div className='login-header-cont'>            
              <h1 className="login-header"><span className='login-special-head'>Foo</span>die</h1>
              <h1 className='login-head'> - {isLogin ? "Login" : "Register"}</h1>
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

            <p className='login-para'>Don't have an account? <span className='login-span'  onClick={onClickRegisterOne}>Register</span></p>
          </form>
          </div>
        </div>
    )
  }

  const onClickRegisterButtonOne = () => {
    if (firstName === "" || lastName === "" || email === "" || phoneNumber === "" || password === "" || confirmPassword === "" || address === "") {
      setIsError(true);
      setErrorMsg("All feilds are required")
    } else {
      if(
        !(email.includes("@") ||
        email.includes(".com"))
      ) {
        setIsError(true);
        setErrorMsg("The Email should in @domain.com format")
      }
      else if (password !== confirmPassword) {
        setIsError(true);
        setErrorMsg("Password and Confirm Password should be same")
      }
     else if(phoneNumber.length !== 10) {
        setIsError(true);
        setErrorMsg("Please enter a valid Phone Number")
      }
      else if (password.length < 8) {
        setIsError(true);
        setErrorMsg("Password should be minimum of 8 characters")
      } else if (password.length > 15) {
        setIsError(true);
        setErrorMsg("Password should be maximum of 15 characters")
      } else if (firstName.length < 3 || lastName.length < 3) {
        setIsError(true);
        setErrorMsg("First Name and Last Name should be minimum of 3 characters")
      } else if (firstName.length > 20 || lastName.length > 20) {
        setIsError(true);
        setErrorMsg("First Name and Last Name should be maximum of 20 characters")
      }
      
      else {
        console.log("All fields are valid")
        setIsError(false);
        const url = "https://forfoodie.onrender.com/users/";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            email: email,
            contact: phoneNumber,
            password: password,
          }),
        }

        const fetchData = async () => {
          const response = await fetch(url, options);
          const data = await response.json();
          console.log(data)
          if (response.ok) {
            Cookies.set("jwt_token", data.jwtToken, { expires: 30 });  
            navigate("/");
          } else {
            alert("Registration Failed")
          }
          console.log(data);
        }

        fetchData();
      }



    }
  }

  const onclickLoginButtonone = (event) => {
    event.preventDefault();

    if (loginEmail === "" || loginPassword === "") {
      setIsErrorLogin(true);  
    } else {
      setIsErrorLogin(false);
      const url = "https://forfoodie.onrender.com/login/";
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
          Cookies.set("jwt_token", data.jwtToken, { expires: 30 });  
          navigate("/");
        } else {
          alert("Login Failed")
        }
        console.log(data);
      }

      fetchData();
    }

  }


  const registerOne = () => {
    return (

      <div className='login-sub-container register-main-container'>
      
        <div className='login-reigeter-image-container'>
          <label htmlFor='password' className='login-label'>Password</label><br />
          <input  value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='Enter Password Here' type="password" id='password' className='login-input login-input-2 register-input-max' /><br />
          <label htmlFor='confirmpassword' className='login-label'>Confirm Password</label><br />
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  placeholder='Re-Enter Password Here' type="password" id='confirmpassword' className='login-input login-input-2 register-input-max' /><br />
          <div>
            <label htmlFor='address' className='login-label'>Address</label><br />
            <input value={address} onChange={(e) => setAddress(e.target.value)}  placeholder='Ex:1234 Main St, City, State' type="text" id='address' className='login-input login-input-2 register-input-max' /><br />
          </div>

          <div className='register-terms-container'>
            <input type='checkbox' value={terms} id='terms' className='login-checkbox' />
            <label htmlFor='terms' onChange={(e) => setTerms(e.target.value)}  className='terms-contditions-para'>I agree to the terms and conditions</label><br />
          </div>
          <div className='login-button-container'>
            <button type='submit' className='login-button register-button' onClick={onClickRegisterButtonOne}>Register</button>
          </div>
          {isError && <p className='error-register'>{errormsg}</p>}
           </div>


        <div className='login-line-cont'>
          <hr className='login-hr' />
        </div>
       
      <div className="login-form-container login-form-container-change"> 
        <div className='login-header-cont'>            
          <h1 className="login-header"><span className='login-special-head'>Foo</span>die</h1>
          <h1 className='login-head'> - {isLogin ? "Login" : "Register"}</h1>
        </div>

        <form className='login-form'>
        <div className='login-names-container'>
          <div>
            <label htmlFor="firstname" className='login-label login-lable-register'>First Name</label><br />
            <input placeholder='Ex:John' value={firstName} onChange={(e) => setFirstName(e.target.value)}  type="text" id='firstname' className='login-input input-register'  /><br />
          </div>
          <div>
            <label htmlFor="lastname" className='login-label login-lable-register'>Last Name</label><br />
            <input placeholder='Ex:Doe' value={lastName}  onChange={(e) => setLastName(e.target.value)} type="text" id='lastname' className='login-input input-register' /><br />
          </div>
        </div>
      <label htmlFor="registeremail" className='login-label login-lable-register'>Email</label><br />
      <input placeholder='Ex:email@domain.com' value={email} onChange={(e) => setEmail(e.target.value)}  type="text" id='registeremail' className='login-input input-register register-input-max' /><br />
      <div>
        <label htmlFor="phonennumber" className='login-label login-lable-register'>Phone Number</label><br />
        <input placeholder='Ex:1234567890' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  type="text" id='phonennumber' className='login-input input-register register-input-max' /><br />
      </div>
      <p className='login-para'>Already a User - <span className='login-span' onClick={onClickLoginOne}>Login</span></p>
    </form>
      </div>
    </div>
      
    )
  }

  const imageUrl = "https://img.freepik.com/free-photo/sign-user-password-privacy-concept_53876-120316.jpg?t=st=1744974984~exp=1744978584~hmac=2db7622da849194c8c21472523eafddc4f1a2978a9e026960aae95d5d90daf68&w=1380";


  return (
    <div className='login-container'>


            {isLogin ? login() : registerOne()}

    </div>
  )
}

export default LoginAndRegister
