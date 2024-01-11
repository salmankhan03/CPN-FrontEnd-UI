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
import React, {useState} from "react";
import SignUp from './pages/SignUP/SignUp';


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const PrivateRoute = ({ element, ...rest }) => {
    return isLoggedIn ? (
        element
    ) : (
        <Navigate to="/login" />
    );
  };

  return (
      <div className='pagebox'>
        <Router>
          <Routes>
            <Route path="/" element={<WithNavbar component={HomeScreen} />} />
            <Route path="/products-details/:id" element={<WithNavbar component={ProductDetails} />} />
            <Route path="/login" element={<LoginScreen setLoggedIn={setLoggedIn} />} />
            <Route path="/signup" element={<SignUp component={SignUp} />} />

            <Route
                path="/cart"
                element={<WithNavbar component={CartPage} />}
            />
            <Route
                path="/checkout"
                element={<PrivateRoute element={<WithNavbar component={CheckoutPage} />} />}
            />
            <Route
                path="/thankyou"
                element={<PrivateRoute element={<WithNavbar component={ThankYouScreen} />} />}
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

