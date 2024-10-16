import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ImageComponent from '../ImageComponents/ImageComponents';
import cartsIcon from "../../assets/images/cart.svg"
import account from "../../assets/images/account.svg"
import phone from "../../assets/images/phone.svg"
import logo from "../../assets/images/logo/logo_top.png";
// import { ReactComponent as Logo } from "../../assets/images/logo/iHealthCare_logo_white.svg"
// import { ReactComponent as  Logos } from "../../assets/images/logo/iHealthCare_logo.svg";
import { useDispatch, useSelector } from 'react-redux';
import './HeaderComponents.css';
import styled from "styled-components";
import Cookies from 'js-cookie';
import AuthServices from '../../services/AuthServices';
import { setGuestUser, setUserData, setUserLogInOrNot, setUserShowGuestOrNot } from '../../redux/action/auth-action';
import { Toast, notifyError, notifySuccess } from '../ToastComponents/ToastComponents';
import BannersServices from '../../services/BannersServices';
import Carousel from 'react-bootstrap/Carousel';
import { Offcanvas, Button } from 'react-bootstrap';
import ProductServices from '../../services/ProductServices';
import { debounce } from 'lodash';
import HeaderLogo from "../../assets/images/logo/iHealthCare_logo_white.svg";
import stickyLogo from "../../assets/images/logo/iHealthCare_logo.svg";
import WhiteLogo from "../../assets/images/logo/iHealthCare_logo_white.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import MegaMenu from '../MegaMenuComponents/MegaMenuComponents';


const StyledHeader = styled.header`
    background-color: #fff;
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

const NavMenu = styled.ul`
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
      top: 100px;
      left:0px;
      background-color: #fff;
      z-index: 998;
      overflow-y: auto;
      height: auto;
      width:100%;
      padding-right: 2rem;
      min-height: calc(100vh - 10px);
    }
  `;
// right: 0;

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
  const AuthDataFname = useSelector(state => state.AuthReducer.userData);

  const AuthData = useSelector(state => state.AuthReducer.userData?.uuid);
  const GuestData = useSelector(state => state.AuthReducer.guestUserData?.guestUserId)
  const BrandListData = useSelector(state => state.BrandReducer.brandsListData)
  const CategoriesListData = useSelector(state => state.CategoryReducer.categoryListData)
  const width = useWindowWidth();

  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [slogans, setSlogans] = useState([])
  const [isEllipsisToggleOpen, setIsEllipsisToggleOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const cartItems = useSelector(state => state.CartReducer.cartItems);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);

  const [browseCategoryIsOpen, setBrowseCategoryIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navDropdownRef = useRef(null);
  const headerNavDropdownRef = useRef(null);
  const searchResultRef = useRef(null)
  const navMenuRef = useRef(null);
  const ellipsisRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [searchInputText, setSearchInputText] = useState('')
  const [searchResults, setSearchResults] = useState();
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const headerRef = useRef(null);
  const [searchResultsShow, setSearchResultsShow] = useState(false)
  const [openCategories, setOpenCategories] = useState({});
  const [isAtoZOpen, setIsAtoZOpen] = useState(false);

  const inputRef = useRef(null);

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState({});

  const handleMouseEnter = (menuType) => {
    setIsMegaMenuOpen((prevState) => ({ ...prevState, [menuType]: true }));
  };

  const handleMouseLeave = (menuType) => {
    setIsMegaMenuOpen((prevState) => ({ ...prevState, [menuType]: false }));
  };

  const handleMegamuToggleOpen = (menuType) => {
    setIsMegaMenuOpen((prevState) => ({ ...prevState, [menuType]: !prevState[menuType] }));
  };

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
    console.log("isEllipsisToggleOpen Value false set")
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
    setSearchResultsShow(true)
  };

  const handleResultClick = (selectedResult) => {
    if (show) {
      setShow(false)
    }
    if (searchResults[selectedResult] === 1) {
      getSearchResult(selectedResult, 1)

    } else {
      navigate(`/search?q=${selectedResult}`, { state: { searchingText: selectedResult } })
    }
    setSearchResults([]);

  };

  const clearSearchText = () => {
    setSearchInputText('');
    setSearchResults([]);
  };

  async function searchProducts(query) {
    console.log("query", query)
    await ProductServices.getSearchSuggestion({ searchParam: query }).then((resp) => {
      if (resp?.status_code === 200) {
        console.log("here", resp?.list)
        if (resp?.list?.length > 0) {
          setSearchResultsShow(true)
        }
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

  async function getSearchResult(query, screen) {
    await ProductServices.getSearchResults({ searchParam: query }).then((resp) => {
      if (resp?.status_code === 200) {
        console.log("here", resp?.list)
        // setSearchResults(resp?.list)
        if (screen === 1) {
          navigate(`/products-details/${resp?.list[0].id}`, {
            state: {
              id: resp?.list[0].id
            }
          })
        } else {

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

  const handleClickOutside = (event) => {
    if (navDropdownRef.current && !navDropdownRef.current.contains(event.target)) {
      setCategoryIsOpen(false);
    }
  };

  const handleBrowseClickOutside = (event) => {
    if (headerNavDropdownRef.current && !headerNavDropdownRef.current.contains(event.target)) {
      setBrowseCategoryIsOpen(false);
    }
  };

  const handleSearchOutsideClick = (event) => {
    if (searchResultRef.current && !searchResultRef.current.contains(event.target)) {
      // setSearchResults([])
      setSearchResultsShow(false)
    }
  };

  useEffect(() => {
    // console.log("user Login or not", AuthData, GuestData);
    // console.log("width", width);
    // Top Header Commented 
    // getSlogan()

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setIsScrollingDown(currentScrollPosition > lastScrollPosition);
      setLastScrollPosition(currentScrollPosition);
      setScrollPosition(currentScrollPosition);
    };

    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleNavMenuOutsideClick = (event) => {
      // console.log("isEllipsisToggleOpen Value false set")

      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setIsToggleOpen(false);
      }
    };

    const handleEllipsisOutsideClick = (event) => {
      // console.log("isEllipsisToggleOpen Value false set")
      if (ellipsisRef.current && !ellipsisRef.current.contains(event.target)) {
        setIsEllipsisToggleOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('mousedown', handleNavMenuOutsideClick);
    document.addEventListener('mousedown', handleEllipsisOutsideClick);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleBrowseClickOutside);
    document.addEventListener('mousedown', handleSearchOutsideClick);


    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('mousedown', handleNavMenuOutsideClick);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleBrowseClickOutside);
      document.removeEventListener('mousedown', handleSearchOutsideClick);

    };
  }, []);
  // Temperrory Top header Slogn Comments because top header not used 
  // const getSlogan = async () => {
  //   try {
  //     const resp = await BannersServices.getSlogan();

  //     if (resp?.status_code === 200) {
  //       if (resp?.list?.data?.length > 0) {
  //         setSlogans(resp?.list?.data);
  //       } else {
  //         const staticSlogan = [{
  //           id: 0,
  //           text: "We are open with limited hours and staff.",
  //           url: "#"
  //         }];
  //         setSlogans(staticSlogan);
  //         // console.log('No slogans available.');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //   }
  // };


  const handleNavigation = (url) => {
    console.log("isEllipsisToggleOpen Value false set")
    console.log("url", url)
    setIsToggleOpen(false);
    setIsEllipsisToggleOpen(false);
    navigate(`/${url}`);

  }

  const handleToggleOpen = () => {
    console.log("isEllipsisToggleOpen Value false set")
    setIsToggleOpen(!isToggleOpen);
    setIsEllipsisToggleOpen(false);

  };
  const handleEllipsisToggleOpen = () => {

    setIsEllipsisToggleOpen(!isEllipsisToggleOpen);
    setIsToggleOpen(false);

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
          notifySuccess(`Logout Suceefully`);
          navigate(`/`)

        }
      }).catch((error) => {
        console.log(error)
      })
    } else {
      dispatch(setUserData({}))
      dispatch(setGuestUser({}))
      notifySuccess(`Guest User Logout Suceefully`);
      navigate(`/`)
    }
  };
  const mobileDropdown = () => {
    console.log("isEllipsisToggleOpen Value false set")
    setIsEllipsisToggleOpen(false)
    setIsOpen(true)
  }

  const toggleBrowseCategoryDropdown = () => {
    setBrowseCategoryIsOpen(!browseCategoryIsOpen);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const categoryToggleDropdown = () => {
    setCategoryIsOpen(!categoryIsOpen);
  };
  const navigateToShop = (id, number) => {
    if (number === 1) {
      setCategoryIsOpen(false)
    } else {
      setBrowseCategoryIsOpen(false)
    }
    navigate(`/shop?name=category&id=${id}`)
  }


  // const handleCategoryToggle = (category) => {
  //   setOpenCategories((prevOpenCategories) => ({
  //     ...prevOpenCategories,
  //     [category]: !prevOpenCategories[category],
  //   }));
  // };
  const handleCategoryToggle = (index) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleAtoZToggle = () => {
    setIsAtoZOpen(!isAtoZOpen);
  };

  const renderCategories = (categories, parentKey = '') => {
    return categories.map((category, index) => {
      const currentKey = parentKey ? `${parentKey}-${index}` : `${index}`;
      return (
        <React.Fragment key={currentKey}>
          <div className='d-flex w-100 p-2 mt-2' onClick={() => handleCategoryToggle(currentKey)}>
            <div>
              <span className="pointer-on-hover" onClick={() => navigate(`/shop?name=category&id=${category.id}`)}>{category.name}</span>
            </div>
            {category.children?.length > 0 && (
              <div className='ms-auto'>
                <FontAwesomeIcon
                  icon={openCategories[currentKey] ? faChevronDown : faChevronRight}
                  fontSize={18}
                  className=""
                />
              </div>
            )}
          </div>
          {openCategories[currentKey] && category.children?.length > 0 && (
            <ul className="w-100 pl-0">
              {renderCategories(category.children, currentKey)}
            </ul>
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <div ref={headerRef}>
        <header
          /* Scrolling Header Commentd & header-fixed in animation commented */
          className={`header-visible`}
        >
          {/* Header Start */}
          <div className='secondaryBG' >
            <nav className={`header-content-top bottomHeaderBG container pt-1 pb-1`} >
              <div className="left-content">
                <div className="menuToggleBtn mobileMenu icon" onClick={handleToggleOpen}>
                        <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
                
                <Link to="/">
                  <img className="my-1 ml-2" src={WhiteLogo} alt="no-result" width="200" />
                </Link>

                <NavMenu >
                  <li style={{ paddingLeft: 15, paddingRight: 15 }} className='mt-2'>
                    <Link to={"#"} className={`nav-menu-list text-white `} onClick={''}>
                      Best Seller
                    </Link>
                  </li>
                  <li
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                    onMouseEnter={() => handleMouseEnter('shop')}
                    onMouseLeave={() => handleMouseLeave('shop')}
                    className='mt-2'
                  >
                    <Link
                      to="/Shop"
                      className={`nav-menu-list text-white`}
                      onClick={() => handleMegamuToggleOpen('shop')}
                    >
                      Shop
                    </Link>
                    <MegaMenu isOpen={isMegaMenuOpen.shop} data={CategoriesListData} type="category" />
                  </li>
                  <li
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                    onMouseEnter={() => handleMouseEnter('brand')}
                    onMouseLeave={() => handleMouseLeave('brand')}
                    className='mt-2'
                  >
                    <Link
                      to="#"
                      className={`nav-menu-list text-white`}
                      onClick={() => handleMegamuToggleOpen('brand')}
                    >
                      Brands
                    </Link>
                    {/* <MegaMenu isOpen={isMegaMenuOpen.brand} data={BrandListData} type="brand" /> */}
                  </li>

                </NavMenu>
              </div>

              <div className="right-content">
                <div className='parent-container ml-2 hide-div search-container-width'
                  style={{ border: '1px solid #FFFFFF', borderRadius: 15, width: 'auto' }}>
                  <div className="search-container position-relative">
                    <input
                      type="text"
                      placeholder="Search Products..."
                      className="search-input text-white"
                      style={{ marginLeft: 10 }}
                      value={searchInputText}
                      onChange={handleInputChange}
                      onClick={handleSearchInputClick}
                    />
                    <div
                      className={`clear-search-icon  ${searchInputText ? 'enabled' : 'disabled'}`}
                      onClick={searchInputText ? clearSearchText : null}
                      style={{ color: searchInputText ? '#000' : '#ccc', padding: '8px' }}
                    >
                      {searchInputText ? (
                        <i className={`fas fa-times-circle ${searchInputText ? 'pointer-on-hover text-white' : ''}`}></i>
                      ) : (
                        <span style={{ visibility: 'hidden' }}>
                          <i className="fas fa-times-circle"></i>
                        </span>
                      )}
                    </div>

                    <div className="search-icon">
                      <i
                        className={`fas fa-search ${searchResults && Object.keys(searchResults).length && searchResultsShow ? 'pointer-on-hover  text-white' : ''}`}
                        onClick={searchResults && Object.keys(searchResults).length ? () => handleResultClick(Object.keys(searchResults)[0]) : null}
                      ></i>
                    </div>

                    {searchResults && searchResultsShow && (
                      <div className="search-results mt-1 position-absolute" ref={searchResultRef} style={{ top: '100%', left: 0, zIndex: 999, backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', maxHeight: '300px', overflowY: 'auto', width: '100%' }}>
                        <ul className="list-group">
                          {Object.keys(searchResults).map((result, index) => {
                            // console.log(result, "res");
                            return (
                              <li key={index} className="text-left text-black p-2 pointer-on-hover" style={{}} onClick={() => handleResultClick(result)}>
                                <span className='ml-1'><i className="fas fa-search"></i></span>

                                <span className='ml-2'>{result}  <span className=''>{`(${searchResults[result]})`} </span> </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <Offcanvas show={show} onHide={handleClose} className="d-lg-none">
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search Products</Offcanvas.Title>
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
                              // console.log(result, "res");
                              return (
                                <li key={index} className="text-left text-black p-2" style={{}} onClick={() => handleResultClick(result)}>
                                  <span className='ml-1'><i className="fas fa-search"></i></span>
                                  {/* : {searchResults[result]} */}
                                  <span className='ml-2'>{result} <span className=''>{`(${searchResults[result]})`} </span></span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Offcanvas.Body>
                </Offcanvas>

                <div className="icons-container">

                  {/* Mobile Search Icon */}
                  <div className="d-inline-flex align-items-center">
                    <React.Fragment>
                      <div className="search-icon hideSearch" onClick={handleShow}>
                        <i className="fas fa-search"></i>
                      </div>
                    </React.Fragment>
                  </div>

                  {/* Cart Icon */}
                  <div className="icon" style={{display: 'inline-grid'}} onClick={() => handleNavigation('cart')}>
                    <ImageComponent src={cartsIcon} alt={"Cart"} classAtribute={`fs-6 ${cartItems.length > 0 ? '' : 'cartsHeight'}`} />
                    {cartItems.length !== undefined && cartItems.length > 0 && (
                      <span id="checkout_items" className="checkout_items">
                        {cartItems.reduce((total, item) => total + JSON.parse(item.purchaseQty), 0)}
                        {/* {cartItems.length} */}
                      </span>
                    )}
                  </div>
                  
                  {/* User Icon */}
                  <div className="nav-menu-list icon hide-div displyHide" onClick={() => setIsOpen(!isOpen)} ref={dropdownRef} style={{ position: 'relative' }}>
                    <ImageComponent src={account} alt={"User"} classAtribute={`fs-6`} />
                    {isOpen && (
                      <div className="dropdown-content" style={{ position: 'absolute', right: 0, top: '100%', zIndex: 2, backgroundColor: '#fff', }}>
                        {AuthData === undefined && GuestData === undefined ? (
                          <Link to="/login" onClick={() => dispatch(setUserShowGuestOrNot(true))}>Login/Signup</Link>
                        ) : (
                          <>
                            {AuthData ? (
                              <Link to="/my-account">My Account</Link>
                            ) : (
                              <span className="disabled-link">My Account</span>
                            )}
                            <div onClick={logout} style={{color: '#333', cursor: 'pointer'}}>Logout</div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </div>
          {/* Bottom Header Close */}
        </header>


        <Offcanvas show={isToggleOpen} onHide={() => setIsToggleOpen(false)} className="">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <span className='mx-2'>
                <FontAwesomeIcon
                  icon={faUser}
                  fontSize={18}
                  className='mr-3'
                />
              
                {AuthData === undefined && GuestData === undefined ? (
                  <Link to="/login" onClick={() => dispatch(setUserShowGuestOrNot(true))}>Login/Signup</Link>
                ) : (
                  <>
                    {AuthData ? (
                      <Link to="/my-account" className='mr-3'>My Account</Link>
                    ) : (
                      <span className="disabled-link">My Account</span>
                    )}
                    <span onClick={logout} style={{color: '#333', cursor: 'pointer'}}>Logout</span>
                  </>
                )}
                </span>
              </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='d-flex flex-column justify-content-top'>
            <ul className="d-block w-100 pl-0">
              <div className='d-flex w-100 p-2 mt-2' key={index}>
                <div>
                  <span
                    className="pointer-on-hover"
                    onClick={() => navigate(`/shop`)}
                  >
                    Shop
                  </span>
                </div>
              </div>
              {renderCategories(CategoriesListData)}
              <hr />
              <div className='d-flex w-100 p-2 mt-2' onClick={handleAtoZToggle}>
                <div>
                  <span className="pointer-on-hover">{"A to Z Brands"}</span>
                </div>
                <div className='ms-auto'>
                  <FontAwesomeIcon
                    icon={isAtoZOpen ? faChevronDown : faChevronRight}
                    fontSize={18}
                  />
                </div>
              </div>
              {isAtoZOpen && (
                <ul className="d-block w-100 pl-0 mb-5">
                  {BrandListData.map((brand, index) => (
                    <div className='d-flex w-100 p-2 mt-2' key={index}>
                      <div>
                        <span
                          className="pointer-on-hover"
                          onClick={() => navigate(`/shop?name=brand&id=${brand?.id}`)}
                        >
                          {brand?.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </ul>
              )}
            </ul>
          </Offcanvas.Body>
        </Offcanvas>


      </div>
      <Toast />
    </>
  );
}

export default Header;
