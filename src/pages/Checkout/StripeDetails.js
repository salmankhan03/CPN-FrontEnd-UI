import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';


const StripeDetails = React.forwardRef(({ handleStripeData, orderData }, ref) => {
    const stripe = useStripe();
    const elements = useElements();

    console.log('orderData', orderData)

    const handleButtonClick = async (handleStripeData) => {
        // Use elements.getElement to get the CardElement components
        const cardNumberElement = elements.getElement(CardNumberElement);

        // Create a token using the card elements
        const { token, error } = await stripe.createToken(cardNumberElement, {
            name: orderData.name,
            address_line1: orderData.address,
            address_city: orderData.city,
            address_state: orderData.state,
            address_zip: orderData.zipcode,
            address_country: orderData.country,
        });

        // Handle the token and error
        if (error) {
            console.error('Error creating token:', error);
        } else {
            console.log('Token:', token);

            // Pass the token to the parent component
            handleStripeData(token);
        }
    };

    React.useImperativeHandle(ref, () => ({
        handleButtonClick,
    }));


    return (
        <>
            <div className="coupon-section">
                <div className='mb-3'>
                    <label style={labelStyle}>Card Number</label>
                    <CardNumberElement style={inputStyle} />
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label style={labelStyle}>Expiration Date</label>
                        <CardExpiryElement style={inputStyle} />
                    </div>

                    <div className='col-md-6'>
                        <label style={labelStyle}>CVC</label>
                        <CardCvcElement style={inputStyle} />
                    </div>
                </div>
            </div>
            </>
    );
});

const formStyle = {
    // maxWidth: '400px',
    // margin: 'auto',
    // padding: '20px',
};

const rowStyle = {
    marginBottom: '20px',
};

const labelStyle = {
    display: 'block',
    marginBottom: '8px',
};

const inputStyle = {
    fontSize: '16px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
    transition: 'box-shadow 150ms ease',
    outline: 'none',

    ':focus': {
        boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.6)',
    },
};

const submitButtonStyle = {
    backgroundColor: '#6772e5',
    color: '#fff',
    borderRadius: '4px',
    padding: '10px 16px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '0',
    display: 'block',
    margin: 'auto',
};

export default StripeDetails;