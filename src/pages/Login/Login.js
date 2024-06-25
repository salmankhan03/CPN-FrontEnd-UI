import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputComponent from '../../components/InputComponents/InputComponents';
import AuthServices from '../../services/AuthServices';
import { useDispatch, useSelector } from 'react-redux';
import { setGuestUser, setUserData, setUserToken } from '../../redux/action/auth-action';
import { Toast, notifySuccess, notifyError } from '../../components/ToastComponents/ToastComponents';
import Cookies from 'js-cookie';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import SpinnerLoading from '../../components/SpinnerComponents/SpinnerLoader';
import Loading from '../../components/LoadingComponents/LoadingComponents';

const LoginScreen = ({ onLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loaders, setLoaders] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [loginFormShowHide, setLoginFormShowHide] = useState(true);
  const AuthData = useSelector(state => state.AuthReducer.userData?.uuid);
  const GuestData = useSelector(state => state.AuthReducer.guestUserData?.guestUserId)
  const userLogInOrNot = useSelector(state => state.AuthReducer.userLogInOrNot)

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
    contact_no: '',
    email: '',
    password: '',
    id: null
  });
  const [registerFormDataErrors, setRegisterFormDataErrors] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    contact_no: '',
    email: '',
    password: '',

  });
  useEffect(() => {
    if (AuthData || GuestData) {
      window.history.back();
    }
    const timers = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timers);
  }, [])

  const handleChange = (fieldName, value, type) => {
    if (type === "signupForm") {
      let formattedValue = value;
      if (fieldName === 'contact_no') {
        formattedValue = value.slice(0, 10);
      }
      // if (fieldName === 'date_of_birth') {
      //   formattedValue = new Date(value).toISOString();

      // }
      setRegisterFormData({ ...registerFormData, [fieldName]: formattedValue });
    } else {
      setFormData({ ...formData, [fieldName]: value });
    }
  };

  const validateForm = () => {
    console.log("formData", formData)
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email matches the pattern
    if (!emailPattern.test(formData.email)) {
      errors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    setFormDataErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleLoginSubmit = async (e) => {
    setIsButtonLoading(true)
    e.preventDefault();

    if (validateForm()) {
      try {
        AuthServices.customerLogin(formData).then((resp) => {
          if (resp?.status_code === 200) {
            notifySuccess(`You have Success fully Login`);
            const cookieTimeOut = 1000;
            console.log(resp)
            dispatch(setUserData({
              ...resp?.data
            }))
            dispatch(setUserToken(
              resp?.token
            ))
            Cookies.set('userToken', JSON.stringify(resp?.token), {
              expires: cookieTimeOut,
            });
            setTimeout(() => {
              //  onLogin();
              if (userLogInOrNot === true) {
                navigate('/', { replace: true });
              } else {
                navigate('/checkout', { replace: true });
              }
              setIsButtonLoading(false)
            }, 1000)
          }
        }).catch((error) => {
          // setLoading(false)
          setIsButtonLoading(false)
          console.log(error)
          notifyError(`${error?.response?.data?.message}`);

        })
      } catch (error) {
        setIsButtonLoading(false)
        console.error('Login failed:', error);
      }
    } else {
      setIsButtonLoading(false)
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
    if (!registerFormData.contact_no.trim()) {
      errors.contact_no = 'Phone Number is required';
    }
    if (!registerFormData.email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerFormData.email) === false) {
      errors.email = 'Email is required';
    }
    if (!registerFormData.password.trim()) {
      errors.password = 'Password is required';
    }

    setRegisterFormDataErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSignUpSubmit = async (e) => {
    setIsButtonLoading(true)
    e.preventDefault();
    if (validateSignUpForm()) {
      try {
        console.log("FINAL", registerFormData)
        // registerFormData.date_of_birth = new Date(registerFormData.date_of_birth).toISOString()
        // registerFormData.date_of_birth = "1998-02-25"
        // console.log("After ISO", registerFormData)

        AuthServices.customerSignUp(registerFormData).then((resp) => {
          if (resp?.status_code === 200) {
            notifySuccess(`You have Success fully sign Up`);
            console.log(resp)
            dispatch(setUserData({
              ...resp?.data
            }))
            setTimeout(() => {
              navigate(`/`, {
                state: {
                  order_id: resp.order_id
                }
              })
              setIsButtonLoading(false)
            }, 1000)
          }
        }).catch((error) => {
          // setLoading(false)
          setIsButtonLoading(false)
          console.log(error)
          notifyError(`${error?.response?.data?.message}`);

        })
      } catch (error) {
        setIsButtonLoading(false)
        console.error('Login failed:', error);
      }
    } else {
      setIsButtonLoading(false)
      console.log('Validation errors:', registerFormDataErrors);
    }
  };
  const LoginSignupFormShowHide = () => {
    console.log("Call")
    setLoaders(true)
    const timers = setTimeout(() => {
      setLoginFormShowHide(!loginFormShowHide)
      setLoaders(false)
    }, 500)
    return () => clearTimeout(timers);
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
    notifySuccess(`Guset User Login Suceefully`);
    console.log("Dispatch Successfully")
    const timers = setTimeout(() => {
      navigate('/checkout');
    }, 1000)
    return () => clearTimeout(timers);
  };
  function generateGuestUserId() {
    const uniqueId = 'guest_' + Math.random().toString(36).substr(2, 9);
    return uniqueId;
  }
  if (loading) {
    return <SpinnerLoading loading={loading} />
  }
  return (
    <>
      <Toast />
      {userLogInOrNot === false ?
        <div className="container">
          <div className='m-3 mt-5'>
            <div className='row' style={{ backgroundColor: '' }}>

              <div className='col-md-6'>
                <div>
                  <h5 className="bold pointer-on-hover title d-inline">Secure Checkout</h5>
                  <div className='mt-5 d-flex align-items-center'>
                    <span className='mr-2'><i className="fa fa-shopping-cart"></i></span>
                    <h5 className='mb-0 bold pointer-on-hover title d-inline'>Guest Checkout</h5>
                  </div>
                  <div className='mt-3 text-left'>
                    <p>No account? No problem. Create an account later to keep track of your orders.</p>
                    <p className='read-more pointer-on-hover' onClick={guestUserCheckout}>Continue <span><i className="fa fa-angle-right"></i></span> </p>
                  </div>
                </div>
              </div>
              <div className='col-md-6 '>

                <div className='ml-5 mr-5'>
                  {loginFormShowHide ? (
                    loaders ? (
                      <div className='d-flex justify-content-center'>
                        <Loading loading={loaders} />
                      </div>
                    ) : (
                      <>
                        <h5 className="bold pointer-on-hover title d-inline">Login</h5>
                        <form onSubmit={handleLoginSubmit}>
                          <div className="form-row mt-3 ">
                            <div className="form-group col-md-12">
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerName">Email</label>
                                <InputComponent
                                  type="text"
                                  id="email"
                                  // label="User Name *"
                                  customClass={`form-control gray-bg ${formDataErrors?.email ? 'validation-error-border' : ''} `}//
                                  value={formData?.email}
                                  onChange={(e) => handleChange('email', e.target.value, 'loginForm')}
                                  placeholder=""
                                // required={true}
                                />
                                {formDataErrors?.email && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{formDataErrors?.email}</div>}
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerName">Password</label>
                                <InputComponent
                                  type="password"
                                  id="password"
                                  autoComplete="current-password"
                                  customClass={`form-control gray-bg ${formDataErrors?.password ? 'validation-error-border' : ''}`}
                                  value={formData?.password}
                                  onChange={(e) => handleChange('password', e.target.value, 'loginForm')}
                                  placeholder=""
                                // required={true}
                                />

                                {formDataErrors?.password && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{formDataErrors?.password}</div>}
                              </div>

                              <div className="form-group">
                                {/* <button className="btn btn-primary btn-block" type="submit">
                            <span>Login</span>
                          </button> */}
                                {/* <div className="red_button product-add_to_cart_button pointer-on-hover mt-3" onClick={handleLoginSubmit}>
                                  {isButtonLoading ? "Loading...." : "Login"}
                                </div> */}
                                {isButtonLoading ? (
                                  <div
                                    className="red_button product-add_to_cart_button  mt-3"
                                  >
                                    Loading ....
                                  </div>
                                ) : (
                                  <div
                                    className="red_button product-add_to_cart_button pointer-on-hover mt-3"
                                    onClick={handleLoginSubmit}
                                  >
                                    Login
                                  </div>
                                )}
                              </div>
                              <div className='mt-4 mb-4'>
                                <hr />
                              </div>
                              <div className="form-outline mb-2 ">
                                <p className='read-more pointer-on-hover'>Forgot Password</p>
                              </div>
                              <div className="form-outline mb-4">
                                <p className='read-more pointer-on-hover' onClick={LoginSignupFormShowHide}>Create account</p>
                              </div>
                            </div>
                          </div>

                        </form>
                      </>
                    )
                  ) : (
                    loaders ? (
                      <div className='d-flex justify-content-center'>
                        <Loading loading={loaders} />
                      </div>
                    ) : (
                      <>
                        <h2>Create account</h2>

                        <form onSubmit={handleSignUpSubmit}>
                          <div className="form-row mt-3">
                            <div className="form-group col-md-12">
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerFirstName"> First Name</label>
                                <InputComponent
                                  type="text"
                                  id="first_name"
                                  customClass={`form-control gray-bg ${registerFormDataErrors.first_name ? 'validation-error-border' : ''}`}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                  value={registerFormData?.first_name}
                                  onChange={(e) => handleChange('first_name', e.target.value, 'signupForm')}
                                  placeholder=""
                                // required
                                />
                                {registerFormDataErrors.first_name && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{registerFormDataErrors.first_name}</div>}
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerLastName">Last Name</label>
                                <InputComponent
                                  type="text"
                                  id="last_name"
                                  customClass={`form-control gray-bg ${registerFormDataErrors.last_name ? 'validation-error-border' : ''}`}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                  value={registerFormData?.last_name}
                                  onChange={(e) => handleChange('last_name', e.target.value, 'signupForm')}
                                  placeholder=""
                                // required={true}
                                />
                                {registerFormDataErrors.last_name && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{registerFormDataErrors.last_name}</div>}
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerLastName">Date of Birth</label>
                                <InputComponent
                                  type="date"
                                  id="date_of_birth"
                                  customClass={`form-control gray-bg ${registerFormDataErrors.date_of_birth ? 'validation-error-border' : ''}`}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                  value={registerFormData?.date_of_birth}
                                  onChange={(e) => handleChange('date_of_birth', e.target.value, 'signupForm')}
                                  placeholder=""
                                />
                                {registerFormDataErrors.date_of_birth && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{registerFormDataErrors.date_of_birth}</div>}
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerLastName">Phone Number</label>
                                <InputComponent
                                  type="number"
                                  id="contact_no"
                                  customClass={`form-control gray-bg ${registerFormDataErrors.contact_no ? 'validation-error-border' : ''}`}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                  value={registerFormData?.contact_no}
                                  onChange={(e) => handleChange('contact_no', e.target.value, 'signupForm')}
                                  placeholder=""
                                // required={true}
                                />
                                {registerFormDataErrors.contact_no && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{registerFormDataErrors.contact_no}</div>}
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerLastName">Email</label>
                                <InputComponent
                                  type="email"
                                  id="email"
                                  customClass={`form-control gray-bg ${registerFormDataErrors.email ? 'validation-error-border' : ''}`}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                  value={registerFormData?.email}
                                  onChange={(e) => handleChange('email', e.target.value, 'signupForm')}
                                  placeholder=""
                                // required={true}
                                />
                                {registerFormDataErrors.email && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{registerFormDataErrors.email}</div>}
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerName">Password</label>
                                <InputComponent
                                  type="password"
                                  id="password"
                                  // label="User Name *"
                                  customClass={`form-control gray-bg ${registerFormDataErrors.password ? 'validation-error-border' : ''}`}
                                  value={registerFormData?.password}
                                  onChange={(e) => handleChange('password', e.target.value, 'signupForm')}
                                  placeholder=""
                                // required={true}
                                />
                                {registerFormDataErrors.password && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{registerFormDataErrors.password}</div>}
                              </div>

                              <div className="form-group">
                                {/* <button className="btn btn-primary btn-block" type="submit">
                            <span>Sign Up</span>
                          </button> */}
                                {isButtonLoading ? (
                                  <div
                                    className="red_button product-add_to_cart_button  mt-3"
                                  >
                                    Loading ....
                                  </div>
                                ) : (
                                  <div className="red_button product-add_to_cart_button pointer-on-hover mt-3" onClick={handleSignUpSubmit}>
                                    Sign Up
                                  </div>
                                )}
                              </div>
                              <div className='mt-4 mb-4'>
                                <hr />
                              </div>
                              <div className="form-outline mb-2 pointer-on-hover read-more" onClick={LoginSignupFormShowHide}>
                                Already have an account? Login
                              </div>
                            </div>
                          </div>
                        </form>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

        </div> :
        <div className="container">
          <div className='m-3 mt-5'>
            <div className='row' style={{ display: 'flex', justifyContent: 'center' }}>
              <Toast />
              <div className='col-md-6'>

                <div className='ml-5 mr-5'>
                  {loginFormShowHide ? (
                    loaders ? (
                      <div className='d-flex justify-content-center'>
                        <Loading loading={loaders} />
                      </div>
                    ) : (
                      <>
                        <h5 className="bold pointer-on-hover title d-inline">Login</h5>
                        <form onSubmit={handleLoginSubmit}>
                          <div className="form-row mt-3 ">
                            <div className="form-group col-md-12">
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerName">Email</label>
                                <InputComponent
                                  type="text"
                                  id="email"
                                  // label="User Name *"
                                  customClass={`form-control gray-bg ${formDataErrors?.email ? 'validation-error-border' : ''} `}//
                                  value={formData?.email}
                                  onChange={(e) => handleChange('email', e.target.value, 'loginForm')}
                                  placeholder=""
                                // required={true}
                                />
                                {formDataErrors?.email && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{formDataErrors?.email}</div>}
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerName">Password</label>
                                <InputComponent
                                  type="password"
                                  id="password"
                                  autoComplete="current-password"
                                  customClass={`form-control gray-bg ${formDataErrors?.password ? 'validation-error-border' : ''}`}
                                  value={formData?.password}
                                  onChange={(e) => handleChange('password', e.target.value, 'loginForm')}
                                  placeholder=""
                                // required={true}
                                />

                                {formDataErrors?.password && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{formDataErrors?.password}</div>}
                              </div>

                              <div className="form-group">
                                {/* <button className="btn btn-primary btn-block" type="submit">
                            <span>Login</span>
                          </button> */}
                                <div className="red_button product-add_to_cart_button mt-3" onClick={handleLoginSubmit}>
                                  Login
                                </div>
                              </div>
                              <div className='mt-4 mb-4'>
                                <hr />
                              </div>
                              <div className="form-outline mb-2 ">
                                <p className='read-more pointer-on-hover'>Forgot Password</p>
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <p className='read-more pointer-on-hover' onClick={LoginSignupFormShowHide}>Create account</p>
                              </div>
                            </div>
                          </div>

                        </form>
                      </>
                    )
                  ) : (
                    loaders ? (
                      <div className='d-flex justify-content-center'>
                        <Loading loading={loaders} />
                      </div>
                    ) : (
                      <>
                        <h2>Create account</h2>

                        <form onSubmit={handleSignUpSubmit}>
                          <div className="form-row mt-3">
                            <div className="form-group col-md-12">
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerFirstName"> First Name</label>
                                <InputComponent
                                  type="text"
                                  id="first_name"
                                  customClass={`form-control gray-bg ${registerFormDataErrors.first_name ? 'validation-error-border' : ''}`}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                  value={registerFormData?.first_name}
                                  onChange={(e) => handleChange('first_name', e.target.value, 'signupForm')}
                                  placeholder=""
                                // required
                                />
                                {registerFormDataErrors.first_name && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{registerFormDataErrors.first_name}</div>}
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerLastName">Last Name</label>
                                <InputComponent
                                  type="text"
                                  id="last_name"
                                  customClass={`form-control gray-bg ${registerFormDataErrors.last_name ? 'validation-error-border' : ''}`}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                  value={registerFormData?.last_name}
                                  onChange={(e) => handleChange('last_name', e.target.value, 'signupForm')}
                                  placeholder=""
                                // required={true}
                                />
                                {registerFormDataErrors.last_name && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{registerFormDataErrors.last_name}</div>}
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerLastName">Date of Birth</label>
                                <InputComponent
                                  type="date"
                                  id="date_of_birth"
                                  customClass={`form-control gray-bg ${registerFormDataErrors.date_of_birth ? 'validation-error-border' : ''}`}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                  value={registerFormData?.date_of_birth}
                                  onChange={(e) => handleChange('date_of_birth', e.target.value, 'signupForm')}
                                  placeholder=""
                                />
                                {registerFormDataErrors.date_of_birth && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{registerFormDataErrors.date_of_birth}</div>}
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerLastName">Phone Number</label>
                                <InputComponent
                                  type="number"
                                  id="contact_no"
                                  customClass={`form-control gray-bg ${registerFormDataErrors.contact_no ? 'validation-error-border' : ''}`}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                  value={registerFormData?.contact_no}
                                  onChange={(e) => handleChange('contact_no', e.target.value, 'signupForm')}
                                  placeholder=""
                                // required={true}
                                />
                                {registerFormDataErrors.contact_no && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{registerFormDataErrors.contact_no}</div>}
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerLastName">Email</label>
                                <InputComponent
                                  type="email"
                                  id="email"
                                  customClass={`form-control gray-bg ${registerFormDataErrors.email ? 'validation-error-border' : ''}`}//${shippingFormErrors.first_name ? 'validation-error-border' : ''}
                                  value={registerFormData?.email}
                                  onChange={(e) => handleChange('email', e.target.value, 'signupForm')}
                                  placeholder=""
                                // required={true}
                                />
                                {registerFormDataErrors.email && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{registerFormDataErrors.email}</div>}
                              </div>
                              <div className="form-outline mb-4 text-left">
                                <label className="form-label" htmlFor="registerName">Password</label>
                                <InputComponent
                                  type="password"
                                  id="password"
                                  // label="User Name *"
                                  customClass={`form-control gray-bg ${registerFormDataErrors.password ? 'validation-error-border' : ''}`}
                                  value={registerFormData?.password}
                                  onChange={(e) => handleChange('password', e.target.value, 'signupForm')}
                                  placeholder=""
                                // required={true}
                                />
                                {registerFormDataErrors.password && <div style={{ width: '100%', fontSize: '.875em', color: 'red' }}>{registerFormDataErrors.password}</div>}
                              </div>

                              <div className="form-group">
                                {/* <button className="btn btn-primary btn-block" type="submit">
                            <span>Sign Up</span>
                          </button> */}
                                <div className="red_button product-add_to_cart_button mt-3" onClick={handleSignUpSubmit}>
                                  Sign Up
                                </div>
                              </div>
                              <div className='mt-4 mb-4'>
                                <hr />
                              </div>
                              <div className="form-outline mb-2 pointer-on-hover read-more" onClick={LoginSignupFormShowHide}>
                                Already have an account? Login
                              </div>
                            </div>
                          </div>
                        </form>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      }
      <div>

        <FooterComponents />
      </div>

    </>
  );
};

export default LoginScreen;


