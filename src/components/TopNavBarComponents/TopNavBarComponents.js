import React, { useState } from 'react';


function TopNavBar() {

    return (
        <div className={`top_nav`}>
            <div className="ml-2 mr-2">
                <div className="row">
                    <div className="col-md-7">
                        <div className="top_nav_left">
                            <div>
                                <span>Customer Support: <span className="font-weight-bold">+1 800 559 6580</span></span>
                                <span className='ml-2'>Email Us: <span className="font-weight-bold">info@companyname.com</span></span>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-5 ">
                        <div className="row">
                            <div className="col-md-7">
                                <ul className="top_nav_menu">
                                    <li className="currency">
                                        <a href="#">About</a>
                                    </li>
                                    <li className="currency">
                                        <a href="#">FAQ</a>
                                    </li>
                                    <li className="currency">
                                        <a href="#">Contact</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-5">
                                <div className="top_nav_right">
                                    <ul className="top_nav_menu">
                                        <li className="currency">
                                            <a href="#">
                                                usd
                                                <i className="fa fa-angle-down"></i>
                                            </a>
                                            <ul className="currency_selection">
                                                <li>
                                                    <a href="#">cad</a>
                                                </li>
                                                <li>
                                                    <a href="#">aud</a>
                                                </li>
                                                <li>
                                                    <a href="#">eur</a>
                                                </li>
                                                <li>
                                                    <a href="#">gbp</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="language">
                                            <a href="#">
                                                English
                                                <i className="fa fa-angle-down"></i>
                                            </a>
                                            <ul className="language_selection">
                                                <li>
                                                    <a href="#">French</a>
                                                </li>
                                                <li>
                                                    <a href="#">Spanish</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopNavBar;
