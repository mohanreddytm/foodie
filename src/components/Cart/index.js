import './index.css';

import { useState } from 'react';
import { useEffect } from 'react';

import React from 'react'

import Header from '../Header';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);



    const emptyCartView = () => {
        return (
            <div className='empty-cart'> 
                <img src="https://img.freepik.com/free-photo/minimal-shopping-cart-shopping-concept-orange-background-3d-rendering_56104-1396.jpg?t=st=1745058775~exp=1745062375~hmac=0b578817d4a2edc123854caf8a24ca8d0ac391f49ac0076fcdff0346d6594e65&w=1800" alt="empty cart" className='empty-cart-image' />
                <h1 className='empty-cart-para'>Cart is Empty</h1>
            </div>
        )
    }




    const theMainOne = () => {
        if(cartItems.length === 0) {
            return emptyCartView();
        }}

    return (
        <div className='cart-container'>
            <Header />
            {theMainOne()}
        </div>
    )
}

export default Cart
