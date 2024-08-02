import React, { useState, useEffect } from 'react';
import ImageComponent from '../../components/ImageComponents/ImageComponents';
import thankyou from "../../assets/images/tutorial-preview-large.png"
import { useNavigate } from 'react-router-dom';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import Header from '../../components/HeaderComponents/HeaderComponents';
import ButtonComponent from '../../components/ButtonComponents/ButtonComponents';
const ThankYouScreen = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('sadsafrewtretfsd21454');

  useEffect(() => {
  }, []);


  const gotoHome = () => {
    navigate(`/`)
  }
  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className='text-center  mt-5 mb-5' >
          <ImageComponent src={thankyou} alt="Success" classAtribute="imageHeight" />
          <h1 className='mt-1'>Order Successful</h1>
          <p>Your Order ID: {orderId}</p>
           <ButtonComponent cssClass="shopping-btn btn-border-radius mt-3" onClick={gotoHome} label="Back to Home" />
        </div>
        <div className='pb-2'>
          <FooterComponents />
        </div>
      </div>
    </>
  );
};

export default ThankYouScreen;
