/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './Orders.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { assets } from '../../assets/assets';

const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    } else{
      toast.error("Error");
    }
  }

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url + "/api/order/status",{
      orderId,
      status: e.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
    
  }

  useEffect(()=>{
    fetchAllOrders();
  },[]);
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div className='order-item' key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item,index)=>{
                  if (index === order.items.length - 1) {
                    return item.name + " X " + item.quantity
                  } else{
                    return item.name + " X " + item.quantity + " , "
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order item address">
                <p>{order.address.street + ", "}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", "+ order.address.zipcode + ", "}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹ {order.amount}</p>
            
            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            
            <div>
              <p>
                {new Date(order.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  timeZone: "Asia/Kolkata"
                })}
              </p>
              <p>
                {new Date(order.date).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "Asia/Kolkata"
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders