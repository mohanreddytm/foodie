import { IoPersonCircle } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { TiHome } from "react-icons/ti";

import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

import './index.css';

const Header = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfile, setShowProile] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
  
  
    useEffect(() => {
      Cookies.get('admin_token') === undefined ? setIsAdmin(false) : setIsAdmin(true)

      Cookies.get('jwt_token') === undefined ? setIsLoggedIn(false) : setIsLoggedIn(true)
    }, [])
    

    const navigate = useNavigate();

    const onClickLoginButton = () => {
        navigate('/login')
    }

    const onClickLagoutButton = () => {
      Cookies.remove("jwt_token");
      window.location.href = '/'

    }


    const onClickLagoutAdmin = () => {
            Cookies.remove("admin_token");
      window.location.href = '/'
    }

  return (
    <div className="header">
      <div className='main-header'>
        <h1 className="header-heading" onClick={() => navigate('/')}><span className='header-specieal-head'>Foo</span>die</h1>
        
        {isAdmin ? <div className="header-right-container">
          <h1 className="header-right-items">Mohan Admin</h1>
          <div className="header-right-items-cont" onClick={() => navigate('/')}>
            <TiHome className="header-icon" />
          <h1 className="header-right-items">Home</h1>
          </div>
          <div className="header-right-items-cont" onClick={() => navigate('/orders')}>
              <FaShoppingCart className="header-icon" />
              <h1 className="header-right-items">Order</h1>
          </div>
          <div className="header-right-items-cont" onClick={onClickLagoutAdmin}>
              <RiAdminFill className="header-icon" />
              <h1 className="header-right-items lagout-admin">Lagout</h1>
          </div>
          </div>:         <div className="header-right-container">

                    
          <div className="header-right-items-cont" onClick={() => navigate('/')}>
            <TiHome className="header-icon" />
          <h1 className="header-right-items">Home</h1>
          </div>
          <div className="header-right-items-cont" onClick={() => navigate('/cart')}>
              <FaShoppingCart className="header-icon" />
              <h1 className="header-right-items">Cart</h1>
          </div>
          <div className="header-right-items-cont" onClick={() => navigate('/adminlogin')}>
              <RiAdminFill className="header-icon" />
              <h1 className="header-right-items">Admin Login</h1>
          </div>
          {isLoggedIn ? 
          <div onMouseMove={() => setShowProile(true)} onClick={() => setShowProile(!showProfile)}  className="header-right-items-cont">
              <IoPersonCircle className="header-icon" />
              <h1 className="header-right-items">Profile</h1>
          </div> : <button onClick={onClickLoginButton} className='header-login-one'>Login/Register</button>
          }
          </div> }

      </div>
      {showProfile && (
        <div onMouseLeave={() => setShowProile(false)} className="show-profile-cont">
          <p onClick={() => navigate('/orders')}>Orders</p>
          <p onClick={onClickLagoutButton}>Lagout</p>
        </div>
      )
        
      }
    </div>
  );
}

export default Header;