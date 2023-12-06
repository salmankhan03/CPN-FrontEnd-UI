import React from 'react';
import { Link } from "react-router-dom";
import ImageComponent from '../ImageComponents/ImageComponents';
import logo from "../../assets/images/logo.png"
import { useSelector } from 'react-redux';



function Header() {
  const cartItems = useSelector(state => state.CartReducer.cartItems);
    return (
        <div className="main_nav_container">
            <div className="ml-2 mr-2">
            <div className="row">
              <div className="col-lg-12 text-right">
                <div className="logo_container">
                  <Link to="/">
                    {/* Fashion<span>Cube</span> */}
                    <ImageComponent src={logo} alt="LOGO" />
                  </Link>
                </div>
                <nav className="navbar">
                  <ul className="navbar_menu">
                    <li>
                      <Link to="#">home</Link>
                    </li>
                    <li className="mega-drop-down">
                      <a href="#">
                        shop <i className="fa fa-angle-down"></i>
                      </a>
  
                      <div className="mega-menu">
                        {/* <div className="mega-menu-wrap">
                          {departments &&
                            departments.map((item, index) => {
                              return (
                                <div className="mega-menu-content" key={index}>
                                  <h5>{item.departmentName}</h5>
                                  <ul className="stander">
                                    {item.categories.split(",").map((i, idx) => {
                                      return (
                                        <li key={idx}>
                                          <a
                                            href={`/fashion-cube/shops/${item.departmentName}/${i}`}
                                          >
                                            {i}
                                          </a>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              );
                            })}
                        </div> */}
                      </div>
                    </li>
  
                    <li>
                      <a href="#">contact</a>
                    </li>
                  </ul>
                  <ul className="navbar_user">
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
