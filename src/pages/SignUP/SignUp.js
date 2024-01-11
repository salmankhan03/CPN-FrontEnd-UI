import React, { useState } from 'react';
import InputComponent from '../../components/InputComponents/InputComponents';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../../services/AuthServices';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/action/auth-action';



const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        phone: '',
        email: '',
        password: '',
    });
    const [formDataErrors, setFormDataErrors] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        phone: '',
        email: '',
        password: '',
      });

    const handleChange = (fieldName, value) => {
        let formattedValue = value;

        if (fieldName === 'dob') {
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
        if (!formData.dob.trim()) {
            errors.dob = 'Date of Birth is required';
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



    return (
        <div className="container">
            <div className='m-5'>
                <div className='row' style={{ backgroundColor: '' }}>
                    <div className='col-md-6 text-center'>
                        <div className="h-32 md:h-auto md:w-1/2">
                            <img
                                aria-hidden="true"
                                className="object-cover w-full h-full dark:hidden"
                                src="https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg"
                                alt="Office"
                                style={{ height: 350 }}
                            />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div>
                            <h2>Create account</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row mt-3">
                                <div className="form-group col-md-6">
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
                                            id="dob"
                                            customClass={`form-control gray-bg `}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                            value={formData?.dob}
                                            onChange={(e) => handleChange('dob', e.target.value,)}
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
    );
};

export default SignUp;


