import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import footerLogo from "../../assets/images/logo/iHealthCare_logo.svg";
import appStore from "../../assets/images/footerImages/btn-app-store.jpg"
import googlePlayStore from "../../assets/images/footerImages/btn-google-play.jpg"
import paymentMethod from "../../assets/images/footerImages/payment-methods.png"
import ImageComponent from '../ImageComponents/ImageComponents';

function FooterComponents() {
    return (
        // #415da1
        <footer className="custom-header pt-2 pb-2 " style={{ backgroundColor: '#fff' }}>
            <div className="container-fluid ">
                <div className="row no-gutters m-4">
                 
                    <div className="col-lg-3 col-md-6 text-left d-flex flex-column align-items-start">
                        <Link to="/" className='mt-3'>
                            <ImageComponent src={footerLogo} alt={"iHelthCaree"} classAtribute={'footer-logo'} />
                        </Link>
                        <div className="mt-4 text-light-color sf-Regular text-left w-100">
                            Copyright © 2024 Canadian Pinnacle Nutritech.
                            <br />
                            All rights reserved.
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-left d-flex flex-column align-items-start">
                        <h5 className="text-black interBold mt-4">Customer Service</h5>
                        <ul className="list-unstyled mt-2">
                            <li className="mt-2"><Link to="#" className='footer-links sf-Regular'>Shipping Options</Link></li>
                            <li className="mt-2"><Link to="#" className='footer-links sf-Regular'>My Wishlist</Link></li>
                            <li className="mt-2"><Link to="#" className='footer-links sf-Regular'>My Account</Link></li>
                            <li className="mt-2"><Link to="#" className='footer-links sf-Regular'>Return Policy</Link></li>
                            <li className="mt-2"><Link to="#" className='footer-links sf-Regular'>Shopping FAQs</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 text-left d-flex flex-column align-items-start">
                        <h5 className="text-black interBold mt-4">Our Company</h5>
                        <ul className="list-unstyled mt-2">
                            <li className="mt-2"><Link to="#" className='footer-links sf-Regular'>About Us</Link></li>
                            <li className="mt-2"><Link to="/privacy-policy" className='footer-links sf-Regular'>Privacy Policy</Link></li>
                            <li className="mt-2"><Link to="/terms-conditions" className='footer-links sf-Regular'>Terms & Conditions</Link></li>
                            <li className="mt-2"><Link to="/disclaimer" className='footer-links sf-Regular'>Disclaimer</Link></li>
                            <li className="mt-2"><Link to="#" className='footer-links sf-Regular'>Link 9</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 text-left d-flex flex-column align-items-start">
                        {/* <h5 className="text-black mt-4">Download Our App</h5>
                        <div className='mt-2 text-black'>Fast & Convenient Access</div> */}
                        {/* <div className='mt-3 d-flex justify-content-center'>
                            <ImageComponent src={appStore} alt={"App Store"} classAtribute={'download-app m-1 download-access-shadow'} />
                            <ImageComponent src={googlePlayStore} alt={"Google Play Store"} classAtribute={'download-app m-1 download-access-shadow'} />
                        </div> */}
                        <h5 className="text-black interBold mt-4">Secured Payment Gateways</h5>
                        {/* <div className='mt-3 text-black'>Secured Payment Gateways</div> */}
                        <div className='mt-3 d-flex justify-content-center'>
                            <ImageComponent src={paymentMethod} alt={"Payment Method"} classAtribute={'download-app'} />
                        </div>

                    </div>
                </div>
            </div>
        </footer>




    )
}
export default FooterComponents