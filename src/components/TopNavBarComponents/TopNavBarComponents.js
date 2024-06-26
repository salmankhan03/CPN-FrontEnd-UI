import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setGuestUser, setUserData, setUserLogInOrNot} from '../../redux/action/auth-action';
import { Toast, notifyError, notifySuccess } from '../ToastComponents/ToastComponents';
import AuthServices from '../../services/AuthServices';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';


function TopNavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const authData = useSelector(state => state?.AuthReducer?.userData);
    const guestData = useSelector(state => state?.AuthReducer?.guestUserData);
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        if (Object.keys(authData).length > 0 || Object.keys(guestData).length > 0) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [authData, guestData, location])
    const logout = () => {
        let token;
        if (Cookies.get('userToken')) {
            token = JSON.parse(Cookies.get('userToken'));
        }

        console.log("token ==>", token)
        if (token) {
            const cookieTimeOut = 1000;

            AuthServices.customerLogout().then((resp) => {
                console.log("resp customerLogout", resp)
                if (resp?.status_code === 200) {
                    Cookies.set('userToken', JSON.stringify(""), {
                        expires: cookieTimeOut,
                      });
                    dispatch(setUserData({}))
                    dispatch(setGuestUser({}))
                    dispatch(setUserLogInOrNot(false))
                    notifySuccess(`logOut Suceefully`);
                    navigate(`/`)

                }
            }).catch((error) => {
                console.log(error)
            })
        } else {
            dispatch(setUserData({}))
            dispatch(setGuestUser({}))
            notifySuccess(`Guest User logOut Suceefully`);
            navigate(`/`)
        }



    };

    const handleLogin = () => {
        
        if(authData && Object.keys(authData).length > 0 || guestData && Object.keys(guestData).length > 0){
            dispatch(setUserLogInOrNot(false))
        } else {
            navigate('/login')
            dispatch(setUserLogInOrNot(true))
        }
    }
    const profile =() => {
        navigate("/profile")
    }
    return (
        <div className={`top_nav`} >
            <div className="ml-2 mr-2">
                <Toast />
                <div className="row">
                    <div className="col-md-7">
                        <div className="top_nav_left">
                            <div>
                                <span>Customer Support: <span className="font-weight-bold">+1 800 559 6580</span></span>
                                <span className='ml-2'>Email Us: <span className="font-weight-bold">info@companyname.com</span></span>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-5 ">
                        <div className="row">
                            <div className="col-md-7">
                                <ul className="top_nav_menu">
                                    <li className="currency">
                                        <a href="#">About</a>
                                    </li>
                                    {/* <li className="currency">
                                        <a href="#">FAQ</a>
                                    </li>
                                    <li className="currency">
                                        <a href="#">Contact</a>
                                    </li> */}
                                </ul>
                            </div>
                            <div className="col-md-5">
                                <div className="top_nav_right">
                                    <ul className="top_nav_menu">
                                        {/* <li className="currency">
                                            <a href="#">
                                                usd
                                                <i className="fa fa-angle-down"></i>
                                            </a>
                                            <ul className="currency_selection">
                                                <li>
                                                    <a href="#">cad</a>
                                                </li>
                                                <li>
                                                    <a href="#">aud</a>
                                                </li>
                                                <li>
                                                    <a href="#">eur</a>
                                                </li>
                                                <li>
                                                    <a href="#">gbp</a>
                                                </li>
                                            </ul>
                                        </li> */}
                                        <li className="currency">
                                            <p  onClick={handleLogin}>
                                                {/* {customerName} */}
                                                {authData && Object.keys(authData).length > 0 || guestData && Object.keys(guestData).length > 0 ? (authData && Object.keys(authData).length > 0 ? `Hello, ${authData.first_name} ${authData.last_name}` : `Hello, ${guestData.guestUserId}`) : 'Hello, Sign In'}
                                                <i className="fa fa-user" aria-hidden="true"></i>
                                            </p>
                                            {isLogin ? (
                                                <ul className="currency_selection">
                                                    {authData && Object.keys(authData).length > 0 && <li>
                                                        <div onClick={profile}>profile</div>
                                                    </li>}
                                                    <li>
                                                        <div onClick={logout}>Logout</div>
                                                    </li>

                                                </ul>
                                            ) : null}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopNavBar;
