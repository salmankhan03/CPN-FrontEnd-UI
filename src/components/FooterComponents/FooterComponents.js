import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function FooterComponents() {
    return (
        <div className="custom-header PrimaryBGColor">
        
        <div className='row p-2 footers' >
            <div className='col-12 col-md-8 col-lg-9'>
                <div className='mt-2'>
                    Copyright © 2024 Canadian Pinnacle Nutritech . All rights reserved.
                </div>
                <div className='mt-2 mr-5 '>
                    Claims made about specific products on or through this website have not been evaluated by Health Canada. 
                    Products are not approved to diagnose, treat, cure or prevent disease. The information provided on 
                    this site is for informational purposes only and is not intended as a substitute for individual medical 
                    advice from your physician or other health care professional.
                </div>
            </div>
            <div className='col-12 col-md-4 col-lg-3'>
                <div className='d-flex'>
                    <div className='m-1 mt-2'>
                    <Link to="/privacy-policy" style={{color:'#bbb'}}> 
                        Privacy Policy
                    </Link>
                    </div>
                    <div className='m-1 mt-2'>
                    <Link to="/terms-conditions" style={{color:'#bbb'}}>
                         Terms & Conditions
                    </Link> </div>
                    <div className='m-1 mt-2' >
                    <Link to="/disclaimer" style={{color:'#bbb'}}>
                     Disclaimer
                    </Link></div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default FooterComponents