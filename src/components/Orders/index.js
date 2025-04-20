import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import { jwtDecode } from 'jwt-decode';


import './index.css'

import { Hourglass } from 'react-loader-spinner'
const Orders = () => {


    const [orders, setOrders] = useState([])
    const [isloading , setisloading] = useState(false)

    const [isAdmin , setAdmin] = useState(false)
    
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

    const onClickCancleorderbutton = async (id, userId) => {

        setisloading(true)
        const url = "https://forfoodie.onrender.com/orders"
        const options = {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id,
                userId
            })
        }

        const response = await fetch(url, options)
        const jsonone = await response.json()
        if(response.ok){
            console.log(jsonone)
            window.location.href = '/orders'
        }
    }


            
    const emptyCartView = () => {
        return (
            <div className='empty-cart'> 
                <img src="https://img.freepik.com/free-photo/minimal-shopping-cart-shopping-concept-orange-background-3d-rendering_56104-1396.jpg?t=st=1745058775~exp=1745062375~hmac=0b578817d4a2edc123854caf8a24ca8d0ac391f49ac0076fcdff0346d6594e65&w=1800" alt="empty cart" className='empty-cart-image' />
                <h1 className='empty-cart-para'>Please place the order to visible here"</h1>
            </div>
        )
    }

    const onChangeStatus = async (status, id) => {
        const url = "https://forfoodie.onrender.com/orders/status/"
        const options = {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                status,
                id
            })
        }

        const response = await fetch(url, options)
        const jsonOne = await response.json()
        if(response.ok){
            window.location.href = '/orders'
        }

    } 

    const renderOrderView = () => {
        return (
        <div className='orders-view-main-cont'>
            <ul className='orders-view-main-list'>
                {orders.map(eachOrder => <li key={eachOrder.id} className='orders-view-main-each-item'>
                    <div className='orders-view-main-each-item-one'>
                        <h1 className='orders-view-main-each-item-one-head'>{eachOrder.buyer_name}</h1>
                        <p className='orders-view-main-each-item-one-para'>{eachOrder.buyer_contact}</p>
                        <p className='orders-view-main-each-item-one-para'>{eachOrder.delivery_address}</p>
                    </div>
                    <div className='orders-view-main-each-item-two'>
                        <p className='orders-view-main-each-item-two-para'>Amount: <span className='special-amount'>{eachOrder.amount}</span></p>
                        <p className='orders-view-main-each-item-two-status'>Status: 
                            {!isAdmin ? eachOrder.status : <select onChange={(e) => onChangeStatus(e.target.value, eachOrder.id)} value={eachOrder.status} className='change-status'>
                                <option id="Penting">Pending</option>
                                <option id="In Progress">In Progress</option>
                                <option id="Delivered">Delivered</option>
                            </select>}
                            </p>
                        <button className='orders-view-main-each-item-two-button' onClick={() => onClickCancleorderbutton(eachOrder.id, eachOrder.user_id)}>Cancle the Order</button>
                    </div>
                </li>)}
            </ul>
        </div>)
    }

    useEffect(() => {
        const fetchdata = async () => {    
            let url = 'https://forfoodie.onrender.com/orders/';
            const token =  Cookies.get("admin_token");
            const normaltoken = Cookies.get("jwt_token")
            if(token){
                setisloading(true)
                setAdmin(true)
                url = 'https://forfoodie.onrender.com/orders/'
            }
            
            if(normaltoken){
                console.log("user")
                setisloading(true)        
                const token = Cookies.get("jwt_token")
                if(token === undefined){
                    window.location.href = '/'
                }
                const values = jwtDecode(token)
                const {userId} = values
                url = `https://forfoodie.onrender.com/orders/${userId}`
            } 

            const response = await fetch(url)
            const jsonData = await response.json()
            if(response.ok){
                console.log("oneoneoneone")
                setisloading(false)
                setOrders(jsonData)
            }else{
                console.log("error one")
            }
            
        }
        fetchdata()
    }, [])

  return (
    <div className='orders-initial-cont'>
        <Header />
      <h1 className='orders-heading'>Orders</h1>
      {isloading ? loadingView() : (orders.length === 0 ? emptyCartView() : renderOrderView() )}
    </div>
  )
}

export default Orders
