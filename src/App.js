import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and wrap your Routes in it₹
import HomeScreen from './pages/Home/Home';
import Header from './components/HeaderComponents/HeaderComponents';
import TopNavBar from './components/TopNavBarComponents/TopNavBarComponents';
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import ProductDetails from './pages/ProductsDetails/ProductDetails';
function App() {
  return (
    <div className='pagebox'>

      <Router>
        <Routes>
          <Route path="/" element={<WithNavbar component={HomeScreen} />} />
          <Route path="/products-details/:id" element={<WithNavbar component={ProductDetails} />} />

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

