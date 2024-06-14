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
        <footer className="custom-header" style={{ backgroundColor: '#fff' }}>
            <div className="container-fluid pt-3 pb-3">
                <div className="row no-gutters m-4">
                    <div className="col-lg-3 col-md-6 text-center d-flex flex-column align-items-center">
                        <Link to="/" className='mt-3'>
                            <ImageComponent src={footerLogo} alt={"iHelthCaree"} classAtribute={'footer-logo'} />
                        </Link>
                        <div className="mt-4 text-black text-center">Copyright © 2024 Canadian Pinnacle Nutritech.<br /> All rights reserved.</div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <h5 className="text-black mt-4">Customer Service</h5>
                        <ul className="list-unstyled mt-2">
                            <li className="mt-2"><Link to="#" className='footer-links'>Shipping Options</Link></li>
                            <li className="mt-2"><Link to="#" className='footer-links'>My Wishlist</Link></li>
                            <li className="mt-2"><Link to="#" className='footer-links'>My Account</Link></li>
                            <li className="mt-2"><Link to="#" className='footer-links'>Return Policy</Link></li>
                            <li className="mt-2"><Link to="#" className='footer-links'>Shopping FAQs</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <h5 className="text-black mt-4">Our Company</h5>
                        <ul className="list-unstyled mt-2">
                            <li className="mt-2"><Link to="#" className='footer-links'>About Us</Link></li>
                            <li className="mt-2"><Link to="/privacy-policy" className='footer-links'>Privacy Policy</Link></li>
                            <li className="mt-2"><Link to="/terms-conditions" className='footer-links'>Terms & Conditions</Link></li>
                            <li className="mt-2"><Link to="/disclaimer" className='footer-links'>Disclaimer</Link></li>
                            <li className="mt-2"><Link to="#" className='footer-links'>Link 9</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <h5 className="text-black mt-4">Download Our App</h5>
                        <div className='mt-2 text-black'>Fast & Convenient Access</div>
                        <div className='mt-3 d-flex justify-content-center'>
                            <ImageComponent src={appStore} alt={"App Store"} classAtribute={'download-app m-1 download-access-shadow'} />
                            <ImageComponent src={googlePlayStore} alt={"Google Play Store"} classAtribute={'download-app m-1 download-access-shadow'} />
                        </div>
                        <div className='mt-3 text-black'>Secured Payment Gateways</div>
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