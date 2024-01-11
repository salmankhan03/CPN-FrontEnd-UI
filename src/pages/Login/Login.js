import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputComponent from '../../components/InputComponents/InputComponents';
import AuthServices from '../../services/AuthServices';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/action/auth-action';

const LoginScreen = () => {
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
              <h2>Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row mt-3">
                <div className="form-group col-md-6">
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
  );
};

export default LoginScreen;


