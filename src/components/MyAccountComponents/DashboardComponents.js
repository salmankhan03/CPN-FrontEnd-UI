import React from 'react';

const Dashboard = ({ data, logout}) => (
    <div className='mt-1 text-left'>
        <p>Hello <b>{data?.first_name}</b> (not <b>{data?.first_name}</b>? <span className='pointer-on-hover' onClick={logout}>Log out</span>)</p>
        <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
    </div>
);

export default Dashboard;