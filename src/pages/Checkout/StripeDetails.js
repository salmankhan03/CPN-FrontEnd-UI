import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentForm.css';

const StripeDetails = React.forwardRef(({ handleStripeData, orderData }, ref) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleButtonClick = async () => {
        const cardNumberElement = elements.getElement(CardNumberElement);

        const { token, error } = await stripe.createToken(cardNumberElement, {
            name: orderData.name,
            address_line1: orderData.address,
            address_city: orderData.city,
            address_state: orderData.state,
            address_zip: orderData.zipcode,
            address_country: orderData.country,
        });

        if (error) {
            console.error('Error creating token:', error);
        } else {
            console.log('Token:', token);
            handleStripeData(token);
        }
    };

    React.useImperativeHandle(ref, () => ({
        handleButtonClick,
    }));

    return (
        <div className="form-container">
            <div className="coupon-section">
                <div className="row-style">
                    <label className="label-style">Card Number</label>
                    <div className="input-wrapper">
                        <CardNumberElement className="input-style" />
                    </div>
                </div>
                <div className="row-style row">
                    <div className="col-md-6 column-style">
                        <label className="label-style">Expiration Date</label>
                        <div className="input-wrapper">
                            <CardExpiryElement className="input-style" />
                        </div>
                    </div>

                    <div className="col-md-6 column-style">
                        <label className="label-style">CVC</label>
                        <div className="input-wrapper">
                            <CardCvcElement className="input-style" />
                        </div>
                    </div>
                </div>
            
                {/* <button type="button" onClick={handleButtonClick} className="submit-button">
                    Pay Now
                </button> */}
                {/* <ButtonComponent cssClass="shopping-btn p-3 w-100" onClick={handleButtonClick} label="Pay Now" /> */}
            </div>
        </div>
    );
});

export default StripeDetails;
