import React from 'react';
import { Link } from "react-router-dom";
import ImageComponent from '../ImageComponents/ImageComponents';
// import logo from "../../assets/images/logo.png"
import logo from "../../assets/images/logo/logo_top.png"
import { useSelector } from 'react-redux';
import './HeaderComponents.css';


function Header() {
  const cartItems = useSelector(state => state.CartReducer.cartItems);
  return (
    <div className="custom-header PrimaryBGColor">
      <div className="ml-2 mr-2" style={{}}>
        <div className="row">
          <div className="col-lg-12 ">
            <div className="logo_container">
              <Link to="/">
                <ImageComponent src={logo} alt={"logo"} width={100} />
              </Link>
            </div>
            <nav className="navbar d-flex justify-content-between align-items-end">
              <ul className="navbar_menu" style={{marginTop:20}}>
                <li>
                  <Link to="/">home</Link>
                </li>
                <li className="">
                  <Link to="/Shop">shop</Link>
                </li>
                <li className="">
                  <Link to="/about-us">ABOUT US</Link>
                </li>
                <li className="">
                  <Link to="/faq">FAQ</Link>
                </li>

                <li>
                  <a href="#">contact</a>
                </li>
              </ul>
              <ul className="navbar_user" style={{marginBottom:25}}>
                <li>
                  <a href="#">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </a>
                </li>
                <li className="checkout">
                  <Link to="/cart">
                    <i className="fas fa-shopping-bag"></i>
                    {cartItems.length !== undefined && cartItems.length > 0 && (
                      <span id="checkout_items" className="checkout_items">
                        {cartItems.length}
                      </span>
                    )}

                  </Link>
                </li>
              </ul>
              <div
                className="hamburger_container"
              // onClick={() => this.handleMenuClicked()}
              >
                <i className="fa fa-bars" aria-hidden="true"></i>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* <MediaQuery query={device.max.tabletL}>
            <MobileMenu
              activeClass={this.state.activeclass}
              onClose={() => this.handleMenuClicked()}
            />
          </MediaQuery>
          {this.state.modalShow ? (
            <HomeCartView
              cart={cart}
              show={this.state.modalShow}
              onHide={() => this.showHideModal()}
            />
          ) : null} */}
    </div>
  );
}

export default Header;
