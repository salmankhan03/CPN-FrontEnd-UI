import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and wrap your Routes in it₹
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
function App() {
  return (
    <div className='pagebox'>

      <Router>
        <Routes>
          <Route path="/" element={<WithNavbar component={HomeScreen} />} />
          <Route path="/products-details/:id" element={<WithNavbar component={ProductDetails} />} />
          <Route path="/cart" element={<WithNavbar component={CartPage} />} />
          <Route path="/checkout" element={<WithNavbar component={CheckoutPage} />} />
          <Route path="/thankyou" element={<WithNavbar component={ThankYouScreen} />} />
          <Route path="/login" element={<WithNavbar component={LoginScreen} />} />

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

