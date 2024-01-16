import React, { useState } from 'react';
import InputComponent from '../../components/InputComponents/InputComponents';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../../services/AuthServices';
import { useDispatch } from 'react-redux';
import { setGuestUser, setUserData } from '../../redux/action/auth-action';



const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        phone: '',
        email: '',
        password: '',
        id: null
    });
    const [formDataErrors, setFormDataErrors] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        phone: '',
        email: '',
        password: '',

    });

    const handleChange = (fieldName, value) => {
        let formattedValue = value;

        if (fieldName === 'date_of_birth') {
            formattedValue = new Date(value).toISOString();
        }
        setFormData({ ...formData, [fieldName]: formattedValue });
        console.log("formData", formData)
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.first_name.trim()) {
            errors.first_name = 'First Name is required';
        }
        if (!formData.last_name.trim()) {
            errors.last_name = 'Last Name is required';
        }
        if (!formData.date_of_birth.trim()) {
            errors.date_of_birth = 'Date of Birth is required';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone Number is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        }

        setFormDataErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                console.log("FINAL", formData)
                AuthServices.customerSignUp(formData).then((resp) => {
                    if (resp?.status_code === 200) {
                        console.log(resp)
                        dispatch(setUserData({
                            ...resp?.data
                        }))
                        navigate(`/`, {
                            state: {
                                order_id: resp.order_id
                            }
                        })
                    }
                }).catch((error) => {
                    // setLoading(false)
                    console.log(error)
                })
            } catch (error) {
                console.error('Login failed:', error);
            }
        } else {
            console.log('Validation errors:', formDataErrors);
        }
    };
    const gotoLogin = () => {
        navigate(`/signup`)
    }
    const guestUserCheckout = () => {

        // Check if guest user ID exists in local storage, otherwise generate one
        let guestUserId = localStorage.getItem('guestUserId');
        if (!guestUserId) {
          guestUserId = generateGuestUserId();
          localStorage.setItem('guestUserId', guestUserId);
        }
        console.log(guestUserId)
        let guesData ={
          guestUserId: guestUserId
        }
        dispatch(setGuestUser({
          ...guesData
        }))
        console.log("Dispatch Successfully")
        navigate('/checkout');
    
        
      };
      function generateGuestUserId() {
        const uniqueId = 'guest_' + Math.random().toString(36).substr(2, 9);
        return uniqueId;
    }



    return (
        <div className="container">
            <div className='m-5'>
                <div className='row' style={{ backgroundColor: '' }}>
                    <div className='col-md-6'>
                        <div>
                            <h2>Secure Checkout</h2>
                            <div className='mt-5 d-flex align-items-center'>
                                <span className='mr-2'><i className="fa fa-shopping-cart"></i></span>
                                <h5 className='mb-0'>Guest Checkout</h5>
                            </div>
                            <div className='mt-3'>
                                <p>No account? No problem. Create an account later to keep track of your orders.</p>
                                <p className='text-primary' onClick={guestUserCheckout}>Continue <span><i className="fa fa-angle-right"></i></span> </p>
                            </div>
                        </div>

                    </div>
                    <div className='col-md-6'>
                        <div className='ml-5 mr-5'>
                            <h2>Create account</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="form-row mt-3">
                                    <div className="form-group col-md-12">
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="registerFirstName"> First Name</label>
                                            <InputComponent
                                                type="text"
                                                id="first_name"
                                                customClass={`form-control gray-bg `}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                                value={formData?.first_name}
                                                onChange={(e) => handleChange('first_name', e.target.value,)}
                                                placeholder=""
                                                required={true}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="registerLastName">Last Name</label>
                                            <InputComponent
                                                type="text"
                                                id="last_name"
                                                customClass={`form-control gray-bg `}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                                value={formData?.last_name}
                                                onChange={(e) => handleChange('last_name', e.target.value,)}
                                                placeholder=""
                                                required={true}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="registerLastName">Date of Birth</label>
                                            <InputComponent
                                                type="date"
                                                id="date_of_birth"
                                                customClass={`form-control gray-bg `}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                                value={formData?.date_of_birth}
                                                onChange={(e) => handleChange('date_of_birth', e.target.value,)}
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="registerLastName">Phone Number</label>
                                            <InputComponent
                                                type="number"
                                                id="phone"
                                                customClass={`form-control gray-bg `}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                                value={formData?.phone}
                                                onChange={(e) => handleChange('phone', e.target.value,)}
                                                placeholder=""
                                                required={true}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="registerLastName">Email</label>
                                            <InputComponent
                                                type="email"
                                                id="email"
                                                customClass={`form-control gray-bg `}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                                value={formData?.email}
                                                onChange={(e) => handleChange('email', e.target.value,)}
                                                placeholder=""
                                                required={true}
                                            />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="registerName">Password</label>
                                            <InputComponent
                                                type="password"
                                                id="password"
                                                // label="User Name *"
                                                customClass={`form-control gray-bg `}
                                                value={formData?.password}
                                                onChange={(e) => handleChange('password', e.target.value,)}
                                                placeholder=""
                                                required={true}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block" type="submit">
                                                <span>Sign Up</span>
                                            </button>
                                        </div>
                                        <div className='mt-4 mb-4'>
                                            <hr />
                                        </div>
                                        <div className="form-outline mb-2" onClick={() => navigate(`/login`)}>
                                            Already have an account? Login
                                        </div>

                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;


