import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputComponent from '../../components/InputComponents/InputComponents';
import AuthServices from '../../services/AuthServices';
import { useDispatch } from 'react-redux';
import { setGuestUser, setUserData } from '../../redux/action/auth-action';
import { Toast, notifySuccess, notifyError } from '../../components/ToastComponents/ToastComponents';

const LoginScreen = ({ onLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginFormShowHide, setLoginFormShowHide] = useState(true)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formDataErrors, setFormDataErrors] = useState({
    email: '',
    password: '',
  });
  const [registerFormData, setRegisterFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone: '',
    email: '',
    password: '',
    id: null
  });
  const [registerFormDataErrors, setRegisterFormDataErrors] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone: '',
    email: '',
    password: '',

  });

  const handleChange = (fieldName, value, type) => {
    if (type === "signupForm") {
      let formattedValue = value;
      // if (fieldName === 'date_of_birth') {
      //   formattedValue = new Date(value).toISOString();
        
      // }
      setRegisterFormData({ ...registerFormData, [fieldName]: formattedValue });
    } else {
      setFormData({ ...formData, [fieldName]: value });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    setFormDataErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("handle Submit")
    if (validateForm()) {
      try {
        AuthServices.customerLogin(formData).then((resp) => {
          if (resp?.status_code === 200) {
            console.log(resp)
            dispatch(setUserData({
              ...resp?.data
            }))
            onLogin();
            navigate('/checkout');

          }
        }).catch((error) => {
          // setLoading(false)
          console.log(error)
          notifyError(`${error?.response?.data?.message}`);

        })
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      console.log('Validation errors:', formDataErrors);
    }
  };
  const validateSignUpForm = () => {
    const errors = {};

    if (!registerFormData.first_name.trim()) {
      errors.first_name = 'First Name is required';
    }
    if (!registerFormData.last_name.trim()) {
      errors.last_name = 'Last Name is required';
    }
    if (!registerFormData.date_of_birth.trim()) {
      errors.date_of_birth = 'Date of Birth is required';
    }
    if (!registerFormData.phone.trim()) {
      errors.phone = 'Phone Number is required';
    }
    if (!registerFormData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!registerFormData.password.trim()) {
      errors.password = 'Password is required';
    }

    setRegisterFormDataErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (validateSignUpForm()) {
      try {
        console.log("FINAL", registerFormData)
        registerFormData.date_of_birth = new Date(registerFormData.date_of_birth).toISOString()
        console.log("After ISO", registerFormData)

        AuthServices.customerSignUp(registerFormData).then((resp) => {
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
          notifyError(`${error?.response?.data?.message}`);

        })
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      console.log('Validation errors:', registerFormDataErrors);
    }
  };

  const LoginSignupFormShowHide = () => {
    console.log("Call")
    setLoginFormShowHide(!loginFormShowHide)
  };
  const guestUserCheckout = () => {
    console.log("GUEST USER CALL :::")
    let guestUserId = localStorage.getItem('guestUserId');
    if (!guestUserId) {
      guestUserId = generateGuestUserId();
      localStorage.setItem('guestUserId', guestUserId);
    }
    let guesData = {
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
      <div className='m-3 mt-5'>
        <Toast />

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
          <div className='col-md-6 '>

            <div className='ml-5 mr-5'>
              {loginFormShowHide ? (
                <>
                  <h2>Login</h2>
                  <form onSubmit={handleLoginSubmit}>
                    <div className="form-row mt-3 ">
                      <div className="form-group col-md-12">
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="registerName">Email</label>
                          <InputComponent
                            type="text"
                            id="email"
                            // label="User Name *"
                            customClass={`form-control gray-bg ${formDataErrors?.email ? 'validation-error-border' : ''} `}//
                            value={formData?.email}
                            onChange={(e) => handleChange('email', e.target.value, 'loginForm')}
                            placeholder=""
                            required={true}
                          />
                          {formDataErrors?.email && <div className="validation-error">{formDataErrors?.email}</div>}
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="registerName">Password</label>
                          <InputComponent
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            customClass={`form-control gray-bg ${formDataErrors?.password ? 'validation-error-border' : ''}`}
                            value={formData?.password}
                            onChange={(e) => handleChange('password', e.target.value, 'loginForm')}
                            placeholder=""
                            required={true}
                          />

                          {formDataErrors?.password && <div className="validation-error">{formDataErrors?.password}</div>}
                        </div>

                        <div className="form-group">
                          <button className="btn btn-primary btn-block" type="submit">
                            <span>Login</span>
                          </button>
                        </div>
                        <div className='mt-4 mb-4'>
                          <hr />
                        </div>
                        <div className="form-outline mb-2">
                          <p>Forgot Password</p>
                        </div>
                        <div className="form-outline mb-4">
                          <p onClick={LoginSignupFormShowHide}>Create account</p>
                        </div>
                      </div>
                    </div>

                  </form>
                </>
              ) : (
                <>
                  <h2>Create account</h2>

                  <form onSubmit={handleSignUpSubmit}>
                    <div className="form-row mt-3">
                      <div className="form-group col-md-12">
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="registerFirstName"> First Name</label>
                          <InputComponent
                            type="text"
                            id="first_name"
                            customClass={`form-control gray-bg `}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                            value={registerFormData?.first_name}
                            onChange={(e) => handleChange('first_name', e.target.value, 'signupForm')}
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
                            value={registerFormData?.last_name}
                            onChange={(e) => handleChange('last_name', e.target.value, 'signupForm')}
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
                            value={registerFormData?.date_of_birth}
                            onChange={(e) => handleChange('date_of_birth', e.target.value, 'signupForm')}
                            placeholder=""
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="registerLastName">Phone Number</label>
                          <InputComponent
                            type="number"
                            id="phone"
                            customClass={`form-control gray-bg `}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                            value={registerFormData?.phone}
                            onChange={(e) => handleChange('phone', e.target.value, 'signupForm')}
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
                            value={registerFormData?.email}
                            onChange={(e) => handleChange('email', e.target.value, 'signupForm')}
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
                            value={registerFormData?.password}
                            onChange={(e) => handleChange('password', e.target.value, 'signupForm')}
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
                        <div className="form-outline mb-2" onClick={LoginSignupFormShowHide}>
                          Already have an account? Login
                        </div>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;


