import React from 'react';
import { Link } from "react-router-dom";
import ImageComponent from '../ImageComponents/ImageComponents';
import logo from "../../assets/images/logo.png"



function Header() {

    return (
        <div className="main_nav_container">
            <div className="ml-2 mr-2">
            <div className="row" style={{backgroundColor:'pink'}} >
              <div className='col-xl-3 col-lg-2 col-sm-12'>
                <div className="logo_container">
                  <Link to="/">              
                    <ImageComponent src={logo} alt="LOGO" />
                  </Link>
                </div>
              </div>
              <div className='col-xl-6 col-lg-6'>
                {/* <div className="custom_container">
                  <div className="search-input">
                      <input type="text" placeholder="Search..." />
                  </div>
                  <div className="category-dropdown">
                      <label for="category">Category:</label>
                      <select id="category">
                          <option value="category1">Category 1</option>
                          <option value="category2">Category 2</option>
                          <option value="category3">Category 3</option>
                      </select>
                  </div>
                </div> */}
              </div>
              <div className='col-xl-3 col-lg-4 col-sm-12' style={{backgroundColor:'orange'}}>
              <nav className="navbar">
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
                        {/* {cart.totalQty !== undefined && (
                          <span id="checkout_items" className="checkout_items">
                            {cart.totalQty}
                          </span>
                        )} */}
                         <span id="checkout_items" className="checkout_items">
                          3
                          </span>
                      </Link>
                    </li>
                  </ul>
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
