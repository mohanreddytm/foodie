import { IoPersonCircle } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';

import './index.css';

const Header = (props) => {

    const navigate = useNavigate();

    const onClickLoginButton = () => {
        navigate('/login')
    }

  return (
    <div className="header">
      <div className='main-header'>
        <h1 className="header-heading"><span className='header-specieal-head'>Foo</span>die</h1>
        <div className="header-right-container">
            {/* <div className="header-right-items-cont">
                <IoPersonCircle className="header-icon" />
                <h1 className="header-right-items">Profile</h1>
            </div> */}

            <div className="header-right-items-cont">
                <FaShoppingCart className="header-icon" />
                <h1 className="header-right-items">Cart</h1>
            </div>
            <button onClick={onClickLoginButton} className='header-login-one'>Login/Register</button>
        </div>
      </div>
    </div>
  );
}

export default Header;