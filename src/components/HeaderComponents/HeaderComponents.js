import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import BannersServices from '../../services/BannersServices';
import Carousel from 'react-bootstrap/Carousel';
import { Offcanvas, Button } from 'react-bootstrap';
import ProductServices from '../../services/ProductServices';
import { debounce } from 'lodash';

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
    .fixed-heder-list {
      text-decoration: none;
      color: #415da1;
      display: block;
      padding: 10px 10px;
      font-size: 18px;
    }
    .fixed-heder-list{
      &:hover {
        color: #b8c3dc;
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
  const [slogans, setSlogans] = useState([])
  const [isEllipsisToggleOpen, setIsEllipsisToggleOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cartItems = useSelector(state => state.CartReducer.cartItems);
  const [isOpen, setIsOpen] = useState(false);
  const [browseCategoryIsOpen, setBrowseCategoryIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navMenuRef = useRef(null);
  const ellipsisRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [searchInputText, setSearchInputText] = useState('')
  const [searchResults, setSearchResults] = useState();

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && dropdownRef.current) {
      const inputWidth = inputRef.current.offsetWidth;
      dropdownRef.current.style.width = `${inputWidth}px`;
    }
  }, [searchInputText]);

  const handleClose = () => {
    setShow(false);
    setSearchResults([]);
    // navigate(`/Shop?name=search=${searchInputText}`)
  }
  const handleShow = () => {
    setIsEllipsisToggleOpen(false);
    setShow(true);
  }
    const debouncedSearch = useCallback(
    debounce((query) => {
      searchProducts(query);
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchInputText(query);
    debouncedSearch(query);
  };

  const handleResultClick = (selectedResult) => {
    
    if(searchResults[selectedResult] === 1){
      getSearchResult(selectedResult,1)

    }else{
      navigate(`/search?q=${selectedResult}&searchType=autosuggest&searchIdentifier=text_search`, { state: { searchingText: selectedResult } })
    }
    setSearchResults([]);

  };
  const clearSearchText = () => {
    setSearchInputText('');
    setSearchResults([]);
  };

  async function searchProducts(query) {
    console.log("query",query)
    await ProductServices.getSearchSuggestion({ searchParam: query }).then((resp) => {
      if (resp?.status_code === 200) {
        console.log("here", resp?.list)
        setSearchResults(resp?.list)
        const timers = setTimeout(() => {
          // setLoading(false)
        }, 1000);
        return () => clearTimeout(timers);
      }
    }).catch((error) => {
      // setLoading(false)
      console.log(error)
    })
  }
  async function getSearchResult(query,screen) {
    await ProductServices.getSearchResults({ searchParam: query }).then((resp) => {
      if (resp?.status_code === 200) {
        console.log("here", resp?.list)
        // setSearchResults(resp?.list)
        if(screen === 1){
          navigate(`/products-details/${resp?.list[0].id}`, {
            state: {
                id: resp?.list[0].id
            }
        })
        }else{

        }
        const timers = setTimeout(() => {
          // setLoading(false)
        }, 1000);
        return () => clearTimeout(timers);
      }
    }).catch((error) => {
      // setLoading(false)
      console.log(error)
    })
  }
  // };
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleSearchInputClick = () => {
    // Show search results when the search input is clicked
    // fetchSearchResults(searchQuery);
  };
  useEffect(() => {
    console.log("user Login or not", AuthData, GuestData);
    console.log("width", width);
    getSlogan()

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

  const getSlogan = async () => {
    try {
      const resp = await BannersServices.getSlogan();

      if (resp?.status_code === 200) {
        if (resp?.list?.data?.length > 0) {
          setSlogans(resp?.list?.data);
        } else {
          const staticSlogan = [{
            id: 0,
            text: "We are open with limited hours and staff.",
            url: "#"
          }];
          setSlogans(staticSlogan);
          // console.log('No slogans available.');
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
    }
  };


  const handleNavigation = (url) => {
    console.log("url", url)
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
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              controls={false}
              indicators={false}
            >
              {slogans?.map((slogan, idx) => (
                <Carousel.Item key={idx} interval={10000}>
                  <a href={slogan?.url} target="_blank" rel="noopener noreferrer">
                    <strong className="topBarCenterText">{slogan?.text}</strong>
                  </a>
                </Carousel.Item>
              ))}
            </Carousel>

          </div>
          <div className="right-content"></div>
        </div>
        <header className={`${scrollPosition > 0 ? 'header-fixed' : ''}`}>
          <div className="PrimaryBGColor">
            <nav className={`header-content-top ${scrollPosition > 0 ? 'headerWhite' : 'bottomHeaderBG'} `}>
              <div className="left-content">
                <Link to="/">
                  {scrollPosition > 0 ? (
                    <ImageComponent src={logo} alt={"logo"} classAtribute="logo" />
                  ) : (
                    <ImageComponent src={logo} alt={"logo"} classAtribute="logo" />
                  )}
                </Link>
              </div>
              <div className="middle-content" >
                <NavManu isToggleOpen={isToggleOpen} ref={navMenuRef}>
                  <li style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Link to={"/"} className={`${scrollPosition > 0 ? 'fixed-heder-list' : 'nav-menu-list'} `} onClick={handleToggleOpen}>
                      Home
                    </Link>
                  </li>
                  <li style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Link to={"#"} className={`${scrollPosition > 0 ? 'fixed-heder-list' : 'nav-menu-list'} `} onClick={handleToggleOpen}>
                      About Us
                    </Link>
                  </li>
                  <li style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Link to={"/Shop"} className={`${scrollPosition > 0 ? 'fixed-heder-list' : 'nav-menu-list'} `} onClick={handleToggleOpen}>
                      Shop
                    </Link>
                  </li>
                  <li style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Link to={"/faq"} className={`${scrollPosition > 0 ? 'fixed-heder-list' : 'nav-menu-list'} `} onClick={handleToggleOpen}>
                      Faq
                    </Link>
                  </li>
                  <li style={{ paddingLeft: 15, paddingRight: 35 }}>
                    <Link to={'#'} className={`${scrollPosition > 0 ? 'fixed-heder-list' : 'nav-menu-list'} `} onClick={handleToggleOpen}>
                      Contact
                    </Link>
                  </li>
                </NavManu>

              </div>
              <div className="right-content">
                <div className="icons-container">
                  <div className="hide-div displyHide">
                    <div className="search-container position-relative" style={{ backgroundColor: '#f5f5f5', borderRadius: 25 }}>
                      <input
                        type="text"
                        placeholder="Search for items..."
                        className="search-input"
                        style={{ width: 'auto', marginLeft: 10 }}
                        value={searchInputText}
                        onChange={handleInputChange}
                        onClick={handleSearchInputClick}
                      />
                      {searchInputText && (
                        <div className="clear-search-icon search-icon" onClick={clearSearchText}>
                          <i className="fas fa-times-circle"></i>
                        </div>
                      )}
                      <div className="search-icon">
                        <i className="fas fa-search"></i>
                      </div>

                      {searchResults && (
                        <div className="search-results mt-1 position-absolute" style={{ top: '100%', left: 0, zIndex: 999, backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', maxHeight: '300px', overflowY: 'auto', width: '100%' }}>                
                          <ul className="list-group">
                            {Object.keys(searchResults).map((result, index) => {
                              console.log(result, "res");
                              return (
                                <li key={index} className="text-left text-black p-2" style={{}} onClick={() => handleResultClick(result)}>
                                  <span className='ml-1'><i className="fas fa-search"></i></span>
                                 
                                  <span className='ml-2'>{result}   {searchResults[result]}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
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
                  <div className="icon hide-div displyHide" onClick={() => setIsOpen(!isOpen)} ref={dropdownRef}>
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
                      <div className="row mt-2">
                        <div className="col text-right">
                          <div className="d-inline-flex align-items-center">

                            <React.Fragment>
                              <div className="search-icon" onClick={handleShow}>
                                <i className="fas fa-search"></i>
                              </div>
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
                  ) : null}

                </div>
              </div>
            </nav>
            {/* </header> */}

          </div>

        </header>
        {/* <Offcanvas show={show} onHide={handleClose} className="d-lg-none">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Searching Products</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='d-flex flex-column justify-content-top'>
            <div className='w-100'>
             
              <input 
               type="text"
               className="form-control custom-searc-input" 
               placeholder="Search products"
               value={searchInputText}
               onChange={handleInputChange}
                />
            </div>
          </Offcanvas.Body>
        </Offcanvas> */}
        <Offcanvas show={show} onHide={handleClose} className="d-lg-none">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Searching Products</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='d-flex flex-column justify-content-top'>
            <div className='w-100 position-relative'>
              <input
                ref={inputRef}
                type="text"
                className="form-control custom-search-input"
                placeholder="Search products"
                value={searchInputText}
                onChange={handleInputChange}
              />
              {searchResults && (
                        <div className="search-results mt-1 position-absolute" style={{ top: '100%', left: 0, zIndex: 999, backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', maxHeight: '300px', overflowY: 'auto', width: '100%' }}>                
                          <ul className="list-group">
                            {Object.keys(searchResults).map((result, index) => {
                              console.log(result, "res");
                              return (
                                <li key={index} className="text-left text-black p-2" style={{}} onClick={() => handleResultClick(result)}>
                                  <span className='ml-1'><i className="fas fa-search"></i></span>
                                  {/* : {searchResults[result]} */}
                                  <span className='ml-2'>{result}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
            </div>
          </Offcanvas.Body>
        </Offcanvas>



      </div>
      <Toast />
    </>
  );
}

export default Header;
