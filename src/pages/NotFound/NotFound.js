// NotFoundPage.js

import React from 'react';
import "./NotFound.css";
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { Link } from 'react-router-dom';


function NotFoundPage() {
    return (
        <>
            <div className="section">
                <h1 className="error" >404</h1>
                <div className="page">Ooops!!! The page you are looking for is not found</div>
                <div className="back-home" >
                    <Link to="/" className='text-white'>
                        BACK TO HOME
                    </Link>
                </div>

            </div>
            {/* <div>
      <FooterComponents />
  </div> */}
        </>

    );
}

export default NotFoundPage;
