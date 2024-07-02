import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Order = () => (
    <div className='d-flex mt-1 p-4 align-items-center secondaryBG' style={{borderRadius:10}}>
        <FontAwesomeIcon icon={faExclamationCircle} size="lg" className="text-white"  />
        <p className="mb-0 text-white ml-3"> No order has been made yet.</p>
        <b className='ml-auto'><Link className='text-white' to="#">Browse products</Link></b>
    </div>
);

export default Order;
