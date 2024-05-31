import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ImageComponent from '../ImageComponents/ImageComponents';
// import logo from "../../assets/images/logo.png"
import logo from "../../assets/images/logo/logo_top.png"
import { useDispatch, useSelector } from 'react-redux';
import './HeaderComponents.css';
import styled from "styled-components";
import Cookies from 'js-cookie';
import AuthServices from '../../services/AuthServices';
import { setGuestUser, setUserData, setUserLogInOrNot } from '../../redux/action/auth-action';
import { Toast, notifyError, notifySuccess } from '../ToastComponents/ToastComponents';

const StyledHeader = styled.header`
    background-color: #fff  ;
    width: 100%;
    padding: 10px 12px 8px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative; /* Ensure the position context for absolute positioning */
    .nav_logo {
      padding: 0 12px;
      .nav-logo-link {
        text-decoration: none;
        font-size: 24px;
        color: #fab005;
        font-weight: bold;
      }
    }
    .menuToggleBtn {
      display: none;
      color: #000000;
      font-size: 24px;
      position: absolute;
      right: 20px;
      top: 25px;
      cursor: pointer;
      z-index: 999; /* Ensure the toggle button is above other elements */
    }

    @media screen and (max-width: 1200px) {
      flex-direction: column;
      align-items: flex-start;
      .menuToggleBtn {
        display: block;
      }
      ul{
        padding-left:0px !important;
        
      }
    }
  `;
const NavManu = styled.ul`
    list-style: none;
    display: flex;
    margin-bottom:0px;

    li {
      &:hover {
        cursor: pointer;
        // background: #d94945;
        // border-radius: 4px;
      }
      @media screen and (max-width: 768px) {
        border-bottom: 1px solid #ccc; /* Add bottom border */
        width: 90%;
        margin-left:20px !important;
        padding-right:0px !important;
        padding:10px
      }
    }
    .nav-menu-list {
      text-decoration: none;
      color: #b8c3dc;
      display: block;
      padding: 10px 10px;
      font-size: 18px;
    }
    .nav-menu-list {
      &:hover {
        color: #fff;
      }
    }
    @media screen and (max-width: 1199px) {
      display: ${(props) => (props.isToggleOpen ? "flex" : "none")};
      flex-direction: column;
      align-items: flex-start;
      position: absolute;
      top: 95px;
      right: 0;
      background-color: #4e97fd;
      z-index: 998;
      overflow-y: auto;
      height: calc(100vh - 10px);
      padding-right: 2rem;
    }
  `;

  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
  
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return width;
  };
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AuthData = useSelector(state => state.AuthReducer.userData?.uuid);
  const GuestData = useSelector(state => state.AuthReducer.guestUserData?.guestUserId)
  const width = useWindowWidth();

  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isEllipsisToggleOpen, setIsEllipsisToggleOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cartItems = useSelector(state => state.CartReducer.cartItems);
  const [isOpen, setIsOpen] = useState(false);
  const [browseCategoryIsOpen, setBrowseCategoryIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navMenuRef = useRef(null);
  const ellipsisRef = useRef(null)

  useEffect(() => {
    console.log("user Login or not", AuthData, GuestData);
    console.log("width", width);
  
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
  
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    const handleNavManuOutsideClick = (event) => {
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setIsToggleOpen(false);
      }
    };
    
    const handleEllipsisOutsideClick = (event) => {
      if (ellipsisRef.current && !ellipsisRef.current.contains(event.target)) {
        setIsEllipsisToggleOpen(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('mousedown', handleNavManuOutsideClick);
    document.addEventListener('mousedown', handleEllipsisOutsideClick);

  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('mousedown', handleNavManuOutsideClick);
    };
  }, []);
  
 
  const handleNavigation = (url) => {
    console.log("url",url)
    setIsToggleOpen(false);
    setIsEllipsisToggleOpen(false);
    navigate(`/${url}`);

  }

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
    setIsEllipsisToggleOpen(false);

  };
  const handleEllipsisToggleOpen = () => {
    setIsToggleOpen(false);
    setIsEllipsisToggleOpen(!isEllipsisToggleOpen);
  };
  const logout = () => {
    setIsOpen(false)
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
  const mobileDropdown = () => {
    setIsEllipsisToggleOpen(false)
    setIsOpen(true)
  }

  return (
    <>
      <div>
        <div className={`header-content-top  hide-div `}>
          <div className="left-content"></div>
          <div className="middle-content">
            <strong className="topBarCenterText">We are open with limited hours and staff.</strong>
          </div>
          <div className="right-content"></div>
        </div>
        <header className={`${scrollPosition > 0 ? 'header-fixed' : ''}`}>
          <div className="PrimaryBGColor">
            <nav className="header-content-top bottomHeaderBG">
              <div className="left-content">
                <Link to="/">
                  <ImageComponent src={logo} alt={"logo"} classAtribute="logo" />
                </Link>
              </div>
              <div className="middle-content" >
                <NavManu isToggleOpen={isToggleOpen} ref={navMenuRef}>
                  <li style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Link to={"/"} className="nav-menu-list" onClick={handleToggleOpen}>
                      Home
                    </Link>
                  </li>
                  <li style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Link to={"#"} className="nav-menu-list" onClick={handleToggleOpen}>
                      About Us
                    </Link>
                  </li>
                  <li style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Link to={"/Shop"} className="nav-menu-list" onClick={handleToggleOpen}>
                      Shop
                    </Link>
                  </li>
                  <li style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Link to={"/faq"} className="nav-menu-list" onClick={handleToggleOpen}>
                      Faq
                    </Link>
                  </li>
                  <li style={{ paddingLeft: 15, paddingRight: 35 }}>
                    <Link to={'#'} className="nav-menu-list" onClick={handleToggleOpen}>
                      Contact
                    </Link>
                  </li>
                </NavManu>

              </div>
              <div className="right-content ">
                <div className="icons-container">
                  <div className="hide-div displyHide">
                    <div className="search-container" style={{ backgroundColor: '#f5f5f5', borderRadius: 25 }}>
                      <input type="text" placeholder="Search for items..." className="search-input" style={{ width: 'auto', marginLeft: 10 }} />
                      <div className="search-icon">
                        <i className="fas fa-search"></i>
                      </div>
                    </div>
                  </div>
                  <div className="icon hide-div displyHide" onClick={() => handleNavigation('cart')}>
                    <i className="fas fa-cart-arrow-down fa-lg" style={{ color: '' }}></i>
                    {cartItems.length !== undefined && cartItems.length > 0 && (
                      <span id="checkout_items" className="checkout_items">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                  {/* onMouseLeave={() => setIsOpen(false)} */}
                  <div className="icon hide-div displyHide" onMouseEnter={() => setIsOpen(true)} ref={dropdownRef}>
                    <i className="fa fa-user fa-lg" aria-hidden="true"></i>
                    {isOpen && (
                      <div className="dropdown-content">
                        {AuthData === undefined && GuestData === undefined ? (
                          <Link to="/login">Login/Signup</Link>
                        ) : (
                          <div onClick={logout}>logout</div>
                        )}
                        <Link to="/my-account">My Account</Link>
                      </div>
                    )}
                  </div>
                  <div className="menuToggleBtn mobileMenu icon" onClick={handleToggleOpen} >
                    <i className="fa fa-bars" aria-hidden="true" style={{ color: '#000' }}></i>
                  </div>
                  <div className="mobileMenu icon displyHide displaynone" onClick={handleEllipsisToggleOpen} >
                    <i className="fa fa-ellipsis-h" aria-hidden="true" style={{ color: '#000' }}></i>
                  </div>
                  {isEllipsisToggleOpen &&
                    <div className='p-2 ' style={{ position: 'absolute', zIndex: 998, backgroundColor: "#fff", right: 0, top: 80 }} ref={ellipsisRef}>
                      <div className='row p-2'>
                        <div className='text-center'>
                          <div className="search-container" style={{ backgroundColor: '#f5f5f5', borderRadius: 25 }}>
                            <input type="text" placeholder="Search for items..." className="search-input" style={{ width: 'auto', marginLeft: 10 }} />
                            <div className="search-icon">
                              <i className="fas fa-search"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col text-right">
                          <div className="d-inline-flex align-items-center">
                       
                            <React.Fragment>
                            <div className="position-relative mx-2" onClick={() => handleNavigation('cart')}>
                              <i className="fas fa-cart-arrow-down fa-lg text-black"></i>
                              {cartItems.length !== undefined && cartItems.length > 0 && (
                                <span id="checkout_items" className="badge badge-danger position-absolute" style={{ top: '-10px', right: '-10px' }}>
                                  {cartItems.length}
                                </span>
                              )}
                            </div>
                            <div className="mx-2" onClick={mobileDropdown} ref={dropdownRef}>
                              <i className="fa fa-user fa-lg text-black" aria-hidden="true"></i>
                            </div>
                            </React.Fragment>
                           
                          </div>
                        </div>
                      </div>
                


                    </div>
                    
                  }
                 {isOpen && width <= 768 ? (
                      <div className="dropdown-content" ref={dropdownRef}>
                        {AuthData === undefined && GuestData === undefined ? (
                          <div className='text-black pt-2' onClick={() => handleNavigation('login')}>Login/Signup</div>
                        ) : (
                          <div className='text-black pt-2' onClick={logout}>logout</div>
                        )}
                        <div className='text-black pt-2' onClick={() => handleNavigation('#')}>My Account</div>
                      </div>
                    ):null}

                </div>
              </div>
            </nav>
            {/* </header> */}

          </div>

        </header>


      </div>
      <Toast />
    </>
  );
}

export default Header;
