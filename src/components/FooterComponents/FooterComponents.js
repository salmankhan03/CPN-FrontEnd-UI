import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/logo_top.png"
import ImageComponent from '../ImageComponents/ImageComponents';

function FooterComponents() {
    return (
        // <div className="custom-header PrimaryBGColor">

        // <div className='row p-2 footers' >
        //     <div className='col-12 col-md-8 col-lg-9'>
        //         <div className='mt-2'>
        //             Copyright © 2024 Canadian Pinnacle Nutritech . All rights reserved.
        //         </div>
        //         <div className='mt-2 mr-5 '>
        //             Claims made about specific products on or through this website have not been evaluated by Health Canada. 
        //             Products are not approved to diagnose, treat, cure or prevent disease. The information provided on 
        //             this site is for informational purposes only and is not intended as a substitute for individual medical 
        //             advice from your physician or other health care professional.
        //         </div>
        //     </div>
        //     <div className='col-12 col-md-4 col-lg-3'>
        //         <div className='d-flex'>
        //             <div className='m-1 mt-2'>
        //             <Link to="/privacy-policy" style={{color:'#bbb'}}> 
        //                 Privacy Policy
        //             </Link>
        //             </div>
        //             <div className='m-1 mt-2'>
        //             <Link to="/terms-conditions" style={{color:'#bbb'}}>
        //                  Terms & Conditions
        //             </Link> </div>
        //             <div className='m-1 mt-2' >
        //             <Link to="/disclaimer" style={{color:'#bbb'}}>
        //              Disclaimer
        //             </Link></div>
        //         </div>
        //     </div>
        // </div>
        // </div>
        <footer class="custom-header PrimaryBGColor">
            <div class="container-fluid">
                <div class="row no-gutters m-4">
                    <div class="col-lg-3 col-md-6 text-center">
                        <div className=''>
                            <div class="">
                                <Link to="/">
                                    <ImageComponent src={logo} alt={"logo"} width={80} />
                                </Link>
                            </div>
                            <div className='mt-4'>
                                <div className='text-white'>Copyright © 2024 Canadian Pinnacle Nutritech . All rights reserved.</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <h5 className='text-white'>Customer Service</h5>
                        <ul class="list-unstyled ">
                            <li className='mt-2'><Link to="#" style={{ color: '#bbb' }}>Shipping Options</Link></li>
                            <li className='mt-2'><Link to="#" style={{ color: '#bbb' }}>My Wishlist</Link></li>
                            <li className='mt-2'><Link to="#" style={{ color: '#bbb' }}>My Account</Link></li>
                            <li className='mt-2'><Link to="#" style={{ color: '#bbb' }}>Return Policy</Link></li>
                            <li className='mt-2'><Link to="#" style={{ color: '#bbb' }}>Shopping FAQs</Link></li>
                        </ul>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <h5 className='text-white'>Our Company</h5>
                        <ul class="list-unstyled">
                            <li className='mt-2'><Link to="#" style={{ color: '#bbb' }}>About Us</Link></li>
                            <li className='mt-2'><Link to="/privacy-policy" style={{ color: '#bbb' }}>Privacy Policy</Link></li>
                            <li className='mt-2'><Link to="/terms-conditions" style={{ color: '#bbb' }}>Terms & Conditions</Link></li>
                            <li className='mt-2'><Link to="/disclaimer" style={{ color: '#bbb' }}>Disclaimer</Link></li>
                            <li className='mt-2'><Link to="/disclaimer" style={{ color: '#bbb' }}>Link 9</Link></li>
                        </ul>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <h5 className='text-white'>Column 4</h5>
                        <ul class="list-unstyled">
                            <li className='mt-2'><Link to="/disclaimer" style={{ color: '#bbb' }}>Link 10</Link></li>
                            <li className='mt-2'><Link to="/disclaimer" style={{ color: '#bbb' }}>Link 11</Link></li>
                            <li className='mt-2'><Link to="/disclaimer" style={{ color: '#bbb' }}>Link 12</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>


    )
}
export default FooterComponents