import React, { useState } from 'react';
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

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
    ul{
      padding-left:0px !important
    }
  }
`;
const NavManu = styled.ul`
  list-style: none;
  display: flex;

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
    color: #fff;
    display: block;
    padding: 10px 10px;
    font-size: 18px;
  }
  .nav-menu-list {
    &:hover {
      color: #000000;
    }
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
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

  const cartItems = useSelector(state => state.CartReducer.cartItems);
  const [isOpen, setIsOpen] = useState(false);
  const [browseCategoryIsOpen, setBrowseCategoryIsOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleBrowseCategoryDropdown = () => {
    setBrowseCategoryIsOpen(!browseCategoryIsOpen);
  };
  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };
  return (

    <header className='PrimaryBGColor'>
      <div className="header-content-top hide-div">
        <div className="left-content">
          <span className='topBarFonts'><i className="fas fa-phone-square-alt"></i> (00)0000-0000</span>
          <span className='ml-3 ml-md-2 topBarFonts'> |<i className="fa fa-map-marker ml-3 ml-md-2" aria-hidden="true"></i>  Store Location</span>
        </div>
        <div className="middle-content">
          <strong className="topBarFonts">we are open with limited hours and staff.</strong>
        </div>
        <div className="right-content">
          <div className="language-dropdown ml-3 ml-md-2">
            <select className='cutom-dropdown topBarFonts'>
              <option className="custom-option" value="en">English</option>
              <option className="custom-option" value="es">Spanish</option>
              <option className="custom-option" value="fr">French</option>
            </select>
          </div>
          <span className='ml-3 ml-md-1'> |<span className='ml-2 ml-md-2 topBarFonts'>Login / Sign Up</span></span>
        </div>
      </div>
      <div className="">
        <header className='PrimaryBGColor'>
          <div className="header-content-top">
            <div className="left-content">
              {/* <strong className="logo"> */}
              <Link to="/">
                <ImageComponent src={logo} alt={"logo"} classAtribute="logo" />
              </Link>
              {/* </strong> */}
            </div>

            <div className="middle-content hide-div">
              <div className='parent-container' style={{ border: '1px solid #ccc', borderRadius: 20, }}>
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
                    <input type="text" placeholder="Search for items..." className="search-input" />
                    <div className="search-icon">
                      <i className="fas fa-search"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="menuToggleBtn mobileMenu" onClick={handleToggleOpen} > <i class="fa fa-bars" aria-hidden="true"></i></div>
            <div className='mobileMenu'><i class="fa fa-ellipsis-h" aria-hidden="true"></i></div>

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
          </div>

          <nav className="header-content-top ">
            <div className="left-content hide-div">
              <div className="dropdown">
                <div onClick={toggleBrowseCategoryDropdown} className="dropdown-toggle text-white">
                  <span><i class="fa fa-bars" aria-hidden="true"></i></span>
                  <span className='ml-2'>Browse Categories</span>
                  {/* <span><i className={`ml-2 fa  ${!browseCategoryIsOpen ? 'fa-angle-down' : ' fa-angle-up'}`} aria-hidden="true"></i></span> */}
                </div>
                {browseCategoryIsOpen && (
                  <div className="dropdown-content">
                    <Link to="/">Link 1</Link>
                    <Link to="/">Link 2</Link>
                    <Link to="/">Link 3</Link>
                  </div>
                )}
              </div>
            </div>

            <div className="middle-content">
              {/* <ul className="horizontal-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/about">About Us</Link></li>
              </ul> */}
              <NavManu isToggleOpen={isToggleOpen}>
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

            <div className="right-content hide-div">
              <span>Contact Number: (00) 0000-0000</span>
            </div>
          </nav>
        </header>
      </div>
    </header>
  );
}

export default Header;
