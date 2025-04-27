import './index.css';

import { useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import { MdDelete } from "react-icons/md";
import Cookies from 'js-cookie'
import { Hourglass } from 'react-loader-spinner'
import React from 'react'

import Header from '../Header';
import { IoEllipseSharp } from 'react-icons/io5';
const statusOne = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure",
}

const Cart = () => {

    const [address, setAddress] = useState("")
    const [errorone, seterror] = useState(false)
    const [onSuccess, setOneSuccess] = useState()

    useEffect(() => {
        if (errorone) {
          const timeoutId = setTimeout(() => seterror(false), 2000);
          return () => clearTimeout(timeoutId);
        }
      }, [errorone]);

      useEffect(() => {
        if (onSuccess) {
          const timeoutId = setTimeout(() => setOneSuccess(false), 2000);
          return () => clearTimeout(timeoutId);
        }
      }, [onSuccess]);

        const loadingView = () => {
            return <div className='loading-main-cont'>
                <Hourglass
                visible={true}
                height="40"
                width="40"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
                />
            </div>
              
        }
    
    const [cartItems, setCartItems] = useState([]);

    const [status, setStatus] = useState(statusOne.SUCCESS);

    const [notloggedIn, setNotloggedin] = useState(false);


    useEffect(() => {
        if(Cookies.get("jwt_token") == undefined){
            setNotloggedin(true);
        }else{
            setNotloggedin(false);
            setStatus(statusOne.LOADING)
        
            const token = Cookies.get("jwt_token")
            const values = jwtDecode(token)
            const {userId} = values

            console.log(values)
            const functionOne =  async () => {
                const url = `https://forfoodie.onrender.com/cart/${userId}`
                const response = await fetch(url)
                const jsonOne = await response.json()

                if(response.ok){
                    setCartItems(jsonOne)
                    setStatus(statusOne.SUCCESS)
                }else{
                    setStatus(statusOne.FAILURE)
                }
            }

            functionOne()
    }
    },[])

    const onClickPlaceOrder = () => {
        if(address.trim() === ""){
            seterror(true)
        }else{
            seterror(false)
            setOneSuccess(true)      
            const token = Cookies.get("jwt_token")
            const values = jwtDecode(token)
            const {userId,name,contact} = values;

            const totalPrice = cartItems.reduce((acc, each) => acc + (each.price * each.quantity), 0);



            const url = "https://forfoodie.onrender.com/orders/"
            const options = {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    userId,
                    amount: totalPrice,
                    deliveryAddress:address,
                    status:"Pending",
                    buyerName:name,
                    buyerContact:contact

                })
            }

            const fetchingData = async () => {
                const response = await fetch(url, options)
                const jsonone = await response.json()
                console.log(jsonone)
            }
            fetchingData()

            const deletecart = async () => {
                const url = `https://forfoodie.onrender.com/cart/${userId}`
                const options = {
                    method :"DELETE"
                }
                const response = await fetch(url,options)
                if(response.ok){
                    window.location.href = '/cart/'
                }
            } 

            deletecart()


        }
    }



    const emptyCartView = () => {
        return (
            <div className='empty-cart'> 
                <img src="https://img.freepik.com/free-photo/minimal-shopping-cart-shopping-concept-orange-background-3d-rendering_56104-1396.jpg?t=st=1745058775~exp=1745062375~hmac=0b578817d4a2edc123854caf8a24ca8d0ac391f49ac0076fcdff0346d6594e65&w=1800" alt="empty cart" className='empty-cart-image' />
                <h1 className='empty-cart-para'>{notloggedIn ? "Please log in to continue" : "Cart is Empty"}</h1>
            </div>
        )
    }

    const onClickDeleteItem = async (id, userId) => {

        console.log(id, userId)
        const url = "https://forfoodie.onrender.com/cart/"
        const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id,
              userId
            })
          };

          setStatus(statusOne.LOADING)

        const response = await fetch(url, options)
        const result = await response.text();

        if(response.ok){

            window.location.href = '/cart/'

        }


    }

    const cartItemsFetch = () => {


        const totalPrice = cartItems.reduce((acc, each) => acc + (each.price * each.quantity), 0);



        return (
            <div className='cart-item-fetch-cont'>
                <ul className='cart-item-fetch-cart-items'>
                    {cartItems.map(each => 
                    <li className='cart-item-fetch-everu-item' key={each.id}>
                        <h1>{each.name}</h1>
                        <div>
                        <p>Price: {each.price}</p>
                        <p>Quantity: {each.quantity}</p>
                        <p className='total-price-one'>{each.quantity * each.price}</p>
                        <button onClick={() => onClickDeleteItem(each.id, each.user_id)}><MdDelete className='delete-icon' /></button>

                        </div>
                    </li>)}
                </ul>
                <div className='cart-item-fetch-right-cont'>
                    <h1>Checkout</h1>
                    <p>Total Amount - <span className='overall-amount-para'>{totalPrice}</span> Rupees</p>
                    <div className='cart-items-type-selections'>

                        <select>
                            <option className='select-default-one'>
                                Select Payment Type
                            </option>
                            <option>
                                Cash on Delivery
                            </option>
                            <option>
                                UPI
                            </option>
                            <option>
                                Net Banking
                            </option>
                            <option>
                                Credit and Debit Cart
                            </option>
                        </select>
                        
                        <select>
                            <option>
                                Select Delivery Type
                            </option>
                            <option>
                                Normal Delivery
                            </option>
                            <option>
                                Over Night Delivery
                            </option>
                            <option>
                                Express Delivery
                            </option>
                        </select>
                    </div>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={10}
                        className='address-checkout'
                        placeholder={
                            "Please enter valid address - \nHouse/Flat Number, Apartment Name\nStreet Name or Area\nCity - Pincode\nState\nCountry"
                        }>
                        </textarea>


                    <button onClick={onClickPlaceOrder}>
                        <span className='place-order-one'>Place Order
                            </span></button>
                </div>
                {errorone && 
                <div className='checkout-error-cont'>
                    <h1 className='checkout-error-msg'>Please fill the Address Input</h1>
                </div>
                    }
                {onSuccess && <div className='success-popup-cont'>
                    <div className='success-inner'>
                        <img src="https://img.freepik.com/free-photo/standard-quality-control-collage_23-2149631009.jpg?t=st=1745134724~exp=1745138324~hmac=fe2980b03d607a342d5f482a7a10bcbbc97de925b69a6391c27f43d1ac298699&w=1480" alt="success one" className='success-image' />
                        <h1>Your Order has been Placed</h1>
                    </div>
                </div>} 
                
            </div>
        )
    }



    const theMainOne = () => {
        if(status === statusOne.LOADING) {
            return loadingView();
        }else if(status === statusOne.SUCCESS){
            if(cartItems.length === 0){
                return emptyCartView()
            }
            return cartItemsFetch()
        }
    }

    return (
        <div className='cart-container'>
            <Header />
            <h1 className='cart-heading'>Cart</h1>
            {theMainOne()}
        </div>
    )
}

export default Cart
