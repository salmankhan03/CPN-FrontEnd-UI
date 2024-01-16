import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputComponent from '../../components/InputComponents/InputComponents';
import AuthServices from '../../services/AuthServices';
import { useDispatch } from 'react-redux';
import { setGuestUser, setUserData } from '../../redux/action/auth-action';

const LoginScreen = ({ onLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formDataErrors, setFormDataErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const validateForm = () => {
    const errors = {};

    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }

    // Validate password
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
        })
      } catch (error) {
        console.error('Login failed:', error);

        // Handle login failure (e.g., show error message)
      }
    } else {
      // Form has validation errors, log or handle them
      console.log('Validation errors:', formDataErrors);
    }
  };

  const gotoSignUp = () => {
    navigate('/signup');
  };
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
      <div className='m-3 mt-5'>
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
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
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
                        onChange={(e) => handleChange('email', e.target.value,)}
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
                        onChange={(e) => handleChange('password', e.target.value)}
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
                      <p onClick={gotoSignUp}>Create account</p>
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

export default LoginScreen;


