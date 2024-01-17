import React, { useState } from 'react';

const GuestLoginComponets = (guestLoginFunction) => {
   


    return (
        <div className="container">
            <div>
                <h2>Secure Checkout</h2>
                <div className='mt-5 d-flex align-items-center'>
                    <span className='mr-2'><i className="fa fa-shopping-cart"></i></span>
                    <h5 className='mb-0'>Guest Checkout</h5>
                </div>
                <div className='mt-3'>
                    <p>No account? No problem. Create an account later to keep track of your orders.</p>
                    <p className='text-primary' onClick={guestLoginFunction}>Continue <span><i className="fa fa-angle-right"></i></span> </p>
                </div>
            </div>
        </div>
    );
};

export default GuestLoginComponets;


