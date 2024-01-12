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
import React, { useState } from "react";
import SignUp from './pages/SignUP/SignUp';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';


function App() {
  const AuthData = useSelector(state => state.AuthReducer.userData);
  const [isLoggedIn, setLoggedIn] = useState(!!AuthData.id)
  const loginStatusUpdate = () =>{
    console.log("call")
  }

  return (
    <div className='pagebox'>
      <Router>
        <Routes>
          <Route path="/" element={<WithNavbar component={HomeScreen} />} />
          <Route path="/products-details/:id" element={<WithNavbar component={ProductDetails} />} />
          <Route path="/login" element={<LoginScreen onLogin={() => setLoggedIn(true)} />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/cart" element={<CartPage element={<WithNavbar component={CartPage} />} />} />
          <Route
            path="/checkout"
            element={<PrivateRoute element={<CheckoutPage />} isAuthenticated={isLoggedIn} fallbackPath="/login" />}
          />
          <Route
            path="/thankyou"
            element={<PrivateRoute element={<ThankYouScreen />} isAuthenticated={isLoggedIn} fallbackPath="/login" />}
          />
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
      <TopNavBar></TopNavBar>
      <Header></Header>
      <Component {...rest} />
    </>
  );
}

export default App;

