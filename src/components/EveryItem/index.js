import React, { useEffect, useState } from 'react';

import Cookies from "js-cookie"
import { jwtDecode } from 'jwt-decode';

import FruitImage from '../FruitImage';

import './index.css';

const EveryItem = (props) => {
  const { id, name, price } = props;
  const [showError, setShowError] = useState(false);

  const [quantity, setQuantity] = useState(1);

    const [isAdmin, setAdmin] = useState(false)

    useEffect(() => {
        const token =  Cookies.get("admin_token");
        token === undefined ? setAdmin(false) : setAdmin(true)
    }, [])

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer); // cleanup (optional but good practice)
    }
  }, [showError]); // should depend on showError

  
  const onChangeQuantity = (e) => {
    setQuantity(e.target.value)
  }
  

  const showErrorMessage = () => {
    return (
        <div className={`need-login-message ${!showError ? 'hide' : ''}`}>
          <p className="need-login-message-para">Please login to continue</p>
        </div>

         )
  }


  const onClickAddToCart = () => {
    
    if(Cookies.get("jwt_token") == undefined){
      setShowError(true)
    }else{
      const token = Cookies.get("jwt_token")
      const values = jwtDecode(token)
      const {userId} = values;
      const url = "https://forfoodie.onrender.com/cart/";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          price,
          quantity,
          userId
        })
      };
      

      const functionOne = async () => {
        const response = await fetch(url, options)
        const jsonone = await response.json()
        console.log(jsonone)
      }

      functionOne();


    }
  }


  const onClickRemoveItem = async () => {
    const url = `https://forfoodie.onrender.com/products/${id}`
    const options = {
      method: "DELETE"
    }

    const response = await fetch(url, options)
    const jsonone = await response.json()
    if(response.ok){
      console.log(jsonone)
      window.location.reload();

    }

  }



  return (
    <li className="every-item-cont">
        <FruitImage fruitName={name} />
        <div className='every-item-name-cont'>
        <h1 className="every-item-name">{name}</h1>
        <div className='every-item-price-cont'>

            <p className="every-item-price">Price: {price}</p>
            <select value={quantity} className="every-item-quantity" onChange={onChangeQuantity}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
        {isAdmin ? <button className="every-item-btn" onClick={onClickRemoveItem}>Remove Item</button> : 
        <button className="every-item-btn" onClick={onClickAddToCart}>Add to Cart</button>
}
              </div>
      {showError && showErrorMessage()}
    </li>
  );
};

export default EveryItem;
