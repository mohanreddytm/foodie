import { IoPersonCircle } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { TiHome } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

import './index.css';

const Header = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
    useEffect(() => {
      Cookies.get('jwt_token') === undefined ? setIsLoggedIn(false) : setIsLoggedIn(true)
    }, [])
    

    const navigate = useNavigate();

    const onClickLoginButton = () => {
        navigate('/login')
    }

  return (
    <div className="header">
      <div className='main-header'>
        <h1 className="header-heading" onClick={() => navigate('/')}><span className='header-specieal-head'>Foo</span>die</h1>
        <div className="header-right-container">
          
            <div className="header-right-items-cont" onClick={() => navigate('/')}>
              <TiHome className="header-icon" />
            <h1 className="header-right-items">Home</h1>
          </div>
            <div className="header-right-items-cont" onClick={() => navigate('/cart')}>
                <FaShoppingCart className="header-icon" />
                <h1 className="header-right-items">Cart</h1>
            </div>
            {isLoggedIn ? <div className="header-right-items-cont">
                <IoPersonCircle className="header-icon" />
                <h1 className="header-right-items">Profile</h1>
            </div> : <button onClick={onClickLoginButton} className='header-login-one'>Login/Register</button>
 }
 </div>
      </div>
    </div>
  );
}

export default Header;