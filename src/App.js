import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import BrowserRouter and wrap your Routes in it₹
import HomeScreen from './pages/Home/Home';
import Header from './components/HeaderComponents/HeaderComponents';
import TopNavBar from './components/TopNavBarComponents/TopNavBarComponents';
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import ProductDetails from './pages/ProductsDetails/ProductDetails';
import CartPage from './pages/Cart/Cart';
import CheckoutPage from './pages/Checkout/Checkout';
import ThankYouScreen from './pages/ThankYou/ThankYou';
import LoginScreen from './pages/Login/Login';
import React, { useEffect, useState } from "react";
import SignUp from './pages/SignUP/SignUp';
import PrivateRoute from './PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import ShopScreen from './pages/Shop/Shop';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsAndCondition from './pages/Terms/Terms';
import Disclaimer from './pages/Disclimer/Disclaimer';
import AuthServices from './services/AuthServices';
import { setDefaultTemplateList } from './redux/action/template-action';
import AboutUs from './pages/AboutUs/AboutUs';
import Faq from './pages/Faq/Faq';
import Profile from './pages/Profile/Profile'
import NotFoundPage from './pages/NotFound/NotFound';
import SearchResults from './pages/Search/SearchResult';
import MyAccount from './pages/MyAccount/MyAccount';
import ForgotPassword from "./pages/ForgotPassword";



function App() {
  const dispatch = useDispatch();
  const AuthData = useSelector(state => state.AuthReducer.userData);
  const GuestData = useSelector(state => state.AuthReducer.guestUserData)
  // console.log(GuestData)
  // console.log(AuthData)

  const [isLoggedIn, setLoggedIn] = useState(false)//GuestData ? GuestData?.guestUserId : AuthData?.id
  const [isAuthUser, setAuthUser] = useState(false)//GuestData ? GuestData?.guestUserId : AuthData?.id
  if (process.env.NODE_ENV === 'production') {
    console.log = () => { };
    console.error = () => { }
    console.debug = () => { }
  }
  useEffect(() => {
    getStaticPageList()
  }, [])

  async function getStaticPageList() {
    await AuthServices.getStaticTemplates({
      page: 1,
      limit: 100,
    }).then((resp) => {
      if (resp?.status_code === 200) {
        dispatch(setDefaultTemplateList([
          ...resp?.list?.data
        ]))


      }
    }).catch((error) => {

      console.log(error)
    })
  }
  function loginStatusUpdate() {
    console.log("call")
  }
  useEffect(() => {
    // console.log(AuthData)
    // console.log(GuestData)
    if (AuthData || GuestData) {
      setLoggedIn(true)
    }
    if (AuthData && Object.keys(AuthData).length > 0) {
      setAuthUser(true)
    }

  }, [GuestData, AuthData])

  return (
    <div className='pagebox'>
      <Router>
        <Routes>
          <Route path="/" element={<WithNavbar component={HomeScreen} />} />
          <Route path="/Shop" element={<WithNavbar component={ShopScreen} />} />
          <Route path="/search" element={<WithNavbar component={SearchResults} />} />
          <Route path="/products-details/:id" element={<WithNavbar component={ProductDetails} />} />
          {/* <Route path="/login" element={<LoginScreen onLogin={() => setLoggedIn(true)} />} /> */}
          <Route path="/login" element={<WithNavbar component={LoginScreen} />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/cart" element={<WithNavbar component={CartPage} />} />
          <Route path="/profile" element={<PrivateRoute element={<WithNavbar component={Profile} />} isAuthenticated={isAuthUser} fallbackPath="/profile" />} />
          <Route
            path="/checkout"
            element={<PrivateRoute element={<WithNavbar component={CheckoutPage} />} isAuthenticated={isLoggedIn} fallbackPath="/login" />}
          />
          <Route
            path='/my-account'
            element={<PrivateRoute element={<WithNavbar component={MyAccount} />} isAuthenticated={isLoggedIn} fallbackPath="/login" />}
          />
          <Route
            path="/thankyou"
            element={<PrivateRoute element={<WithNavbar component={ThankYouScreen} />} isAuthenticated={isLoggedIn} fallbackPath="/login" />}
          />
          <Route path="/about-us" element={<WithNavbar component={AboutUs} />} />
          <Route path="/faq" element={<WithNavbar component={Faq} />} />
          <Route path="/privacy-policy" element={<WithNavbar component={PrivacyPolicy} />} />
          <Route path="/terms-conditions" element={<WithNavbar component={TermsAndCondition} />} />
          <Route path="/disclaimer" element={<WithNavbar component={Disclaimer} />} />
          <Route path="/forgot-password" element={<WithNavbar component={ForgotPassword} />} />
          <Route path="*" element={<WithNavbar component={NotFoundPage} />} />
        </Routes>
      </Router>
    </div>
  );
}

interface WithNavbarProps {
  component: React.ComponentType<any>;
}

function WithNavbar({ component: Component, ...rest }: WithNavbarProps) {
  return (
    <>
      {/* <TopNavBar></TopNavBar> */}
      {/*<Header></Header>*/}
      <Component {...rest} />
    </>
  );
}

export default App;

