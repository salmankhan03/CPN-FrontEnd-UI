import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ImageComponent from '../ImageComponents/ImageComponents';
// import logo from "../../assets/images/logo.png"
import logo from "../../assets/images/logo/logo_top.png"
import { useSelector } from 'react-redux';
import './HeaderComponents.css';
import styled from "styled-components";

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

function Header() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isEllipsisToggleOpen, setIsEllipsisToggleOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cartItems = useSelector(state => state.CartReducer.cartItems);
  const [isOpen, setIsOpen] = useState(false);
  const [browseCategoryIsOpen, setBrowseCategoryIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleBrowseCategoryDropdown = () => {
    setBrowseCategoryIsOpen(!browseCategoryIsOpen);
  };
  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
    setIsEllipsisToggleOpen(false);

  };
  const handleEllipsisToggleOpen = () => {
    setIsToggleOpen(false);
    setIsEllipsisToggleOpen(!isEllipsisToggleOpen);
  };
  return (
    <div>
      <div className={`header-content-top  hide-div `}>

        <div className="left-content">
          {/* <span className='topBarFonts'>
            (00)0000-0000
          </span>
          <span className='topBarFonts ml-2'>|</span>
          <span className='ml-3 ml-md-2 topBarFonts'>
            Store Location
          </span> */}
        </div>
        <div className="middle-content">
          <strong className="topBarCenterText">We are open with limited hours and staff.</strong>
        </div>
        <div className="right-content">
          {/* <div className="language-dropdown ml-3 ml-md-2">
              <select className='cutom-dropdown topBarFonts'>
                <option className="custom-option" value="en">English</option>
                <option className="custom-option" value="es">Spanish</option>
                <option className="custom-option" value="fr">French</option>
              </select>
            </div>
            <span className='ml-3 ml-md-1'> |<span className='ml-2 ml-md-2 topBarFonts'>Login / Sign Up</span></span> */}
        </div>
      </div>
      <header className={`${scrollPosition > 0 ? 'header-fixed' : ''}`}>
        {/* <div className="header-content-top "> */}
        <div className="PrimaryBGColor">
          {/* <header className='PrimaryBGColor'> */}
            {/* <div className="header-content-top pt-4 pb-4">
              <div className="left-content">
                <Link to="/">
                  CANADIAN PINNACLE NUTRITECH
                </Link>
              </div>
              <div className="middle-content hide-div">
                <div className='parent-container ml-5 mr-5' style={{ border: '1px solid #ccc', borderRadius: 20 }}>
                  <div className="d-flex align-items-center">
                    <div className="dropdown dropdown-right-border">
                      <div onClick={toggleDropdown} className="dropdown-toggle text-black">
                        <span className=''>Browse Categories</span>
                      </div>
                      {isOpen && (
                        <div className="dropdown-content">
                          <Link to="/">Link 1</Link>
                          <Link to="/">Link 2</Link>
                          <Link to="/">Link 3</Link>
                        </div>
                      )}
                    </div>
                    <div className="search-container ml-3">
                      <input type="text" placeholder="Search for items..." className="search-input" style={{ width: '300px' }} />
                      <div className="search-icon">
                        <i className="fas fa-search"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="menuToggleBtn mobileMenu" onClick={handleToggleOpen} >
                <i className="fa fa-bars" aria-hidden="true" style={{ color: '#000' }}></i>
              </div>

              <div className="right-content hide-div">
                <div className="icons-container">
                  <div className="icon">
                    <i className="fas fa-cart-arrow-down fa-lg" style={{ color: '' }}></i>
                    {cartItems.length !== undefined && cartItems.length > 0 && (
                      <span id="checkout_items" className="checkout_items">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                  <div className="icon">
                    <i className="fa fa-user fa-lg" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div> */}

            <nav className="header-content-top bottomHeaderBG">
              {/* hide-div displyHide */}
              <div className="left-content ">
                {/* <div className="dropdown">
                  <div onClick={toggleBrowseCategoryDropdown} className="dropdown-toggle text-white">
                    <span><i className="fa fa-bars" aria-hidden="true"></i></span>
                    <span className='ml-2'>Browse Categories</span>
                  </div>
                  {browseCategoryIsOpen && (
                    <div className="dropdown-content">
                      <Link to="/">Link 1</Link>
                      <Link to="/">Link 2</Link>
                      <Link to="/">Link 3</Link>
                    </div>
                  )}
                </div> */}
                <Link to="/">
                  <ImageComponent src={logo} alt={"logo"} classAtribute="logo" />
                </Link>
              </div>

              <div className="middle-content" >
                <NavManu isToggleOpen={isToggleOpen} >
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
              {/* hide-div displyHide */}
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
                  <div className="icon hide-div displyHide">
                    <i className="fas fa-cart-arrow-down fa-lg" style={{ color: '' }}></i>
                    {cartItems.length !== undefined && cartItems.length > 0 && (
                      <span id="checkout_items" className="checkout_items">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                  <div className="icon hide-div displyHide">
                    <i className="fa fa-user fa-lg" aria-hidden="true"></i>
                  </div>
                  <div className="menuToggleBtn mobileMenu icon" onClick={handleToggleOpen} >
                    <i className="fa fa-bars" aria-hidden="true" style={{ color: '#000' }}></i>
                  </div>
                  <div className="mobileMenu icon displyHide displaynone" onClick={handleEllipsisToggleOpen} >
                    <i className="fa fa-ellipsis-h" aria-hidden="true" style={{ color: '#000' }}></i>
                  </div>
                  {isEllipsisToggleOpen &&
                    <div className='p-2 ' style={{ position: 'absolute', zIndex: 998, backgroundColor: "#fff", right: 0, top: 80 }}>
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
                            <div className="position-relative mx-2">
                              <i className="fas fa-cart-arrow-down fa-lg text-black"></i>
                              {cartItems.length !== undefined && cartItems.length > 0 && (
                                <span id="checkout_items" className="badge badge-danger position-absolute" style={{ top: '-10px', right: '-10px' }}>
                                  {cartItems.length}
                                </span>
                              )}
                            </div>
                            <div className="mx-2">
                              <i className="fa fa-user fa-lg text-black" aria-hidden="true"></i>
                            </div>
                          </div>
                        </div>
                      </div>


                    </div>
                  }

                </div>
              </div>
            </nav>
          {/* </header> */}

        </div>

      </header>
    </div>
  );
}

export default Header;
