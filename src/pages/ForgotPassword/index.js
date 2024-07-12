import React, { useState } from 'react';
import Header from "../../components/HeaderComponents/HeaderComponents";
import FooterComponents from "../../components/FooterComponents/FooterComponents";
import InputComponent from "../../components/InputComponents/InputComponents";
import ButtonComponent from "../../components/ButtonComponents/ButtonComponents";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (emailError) {
            validateEmail(e.target.value);
        }
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email is required.');
            return false;
        } else if (!emailPattern.test(email)) {
            setEmailError('Invalid email format.');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleEmailSend = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {

            console.log('Email sent to:', email);
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className={'container'}>
                    <div style={{background: '#f8f8f8', borderRadius: '5px', padding: '29px 50px 48px', textAlign: 'start'}}>
                        <h2 style={{fontSize: '34px', fontWeight: 500, lineHeight: 1.42, margin: '0 0 20px', fontFamily: 'Sf-Pro-Regular'}}>Lost your password?</h2>
                        <p style={{ margin: '0 0 20px'}}>Please enter your email address. You will receive a link to create a new password via email.</p>
                        <form onSubmit={handleEmailSend}>
                            <div className="form-row mt-3">
                                <div className="form-group col-md-12">
                                    <div className="form-outline mb-4 text-left">
                                        <label className="form-label" htmlFor="email">Username or email</label>
                                        <InputComponent
                                            type="email"
                                            id="email"
                                            customClass={`form-control forgot-password-style gray-bg ${emailError ? 'validation-error-border' : ''}`}
                                            value={email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                        />
                                        {emailError && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{emailError}</div>}
                                    </div>
                                </div>
                            </div>
                            <ButtonComponent cssClass="empty-carts"  label="Reset Password" width={'100%'}/>
                        </form>
                    </div>
                </div>
                <div className='pb-2'>
                    <FooterComponents />
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
