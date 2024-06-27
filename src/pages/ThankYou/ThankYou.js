import React, { useState, useEffect } from 'react';
import ImageComponent from '../../components/ImageComponents/ImageComponents';
import thankyou from "../../assets/images/tutorial-preview-large.png"
import { useNavigate } from 'react-router-dom';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
const ThankYouScreen = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('sadsafrewtretfsd21454');

  useEffect(() => {
  }, []);


  const gotoHome = () => {
    navigate(`/`)
  }
  return (
    <div className="container mt-5">
      <div className='text-center' >
        <ImageComponent src={thankyou} alt="Success" classAtribute="imageHeight" />
        <h1 className='mt-1'>Order Successful</h1>
        <p>Your Order ID: {orderId}</p>
        <button type="submit" className="place_order" onClick={gotoHome}>Back to Home</button>
      </div>
      <div className='pb-2'>
        <FooterComponents />
      </div>
    </div>
  );
};

export default ThankYouScreen;
