import React, { useEffect, useState } from 'react';
import SpinnerLoading from '../../components/SpinnerComponents/SpinnerLoader';
import FooterComponents from '../../components/FooterComponents/FooterComponents';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../../components/MyAccountComponents/DashboardComponents';
import Order from '../../components/MyAccountComponents/OrderComponents';
import Download from '../../components/MyAccountComponents/DownloadComponets';
import Address from '../../components/MyAccountComponents/AddressComponents';
import AccountDetails from '../../components/MyAccountComponents/AccountDetailsComponents';
import Cookies from 'js-cookie';
import AuthServices from '../../services/AuthServices';
import { setGuestUser, setUserData, setUserLogInOrNot } from '../../redux/action/auth-action';
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../../components/ToastComponents/ToastComponents';
import Header from '../../components/HeaderComponents/HeaderComponents';


const Compare = () => <div><h3>Compare Content</h3><p>Compare items here.</p></div>;
const Wishlist = () => <div><h3>Wishlist Content</h3><p>Your wishlist items are displayed here.</p></div>;
const Logout = () => <div><h3>Log Out Content</h3><p>Click here to log out.</p></div>;

const MyAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AuthData = useSelector(state => state.AuthReducer.userData);
    const [user, setUser] = useState(AuthData)

    const [loading, setLoading] = useState(true);

    const myAccountSidebar = [
        { Label: "Dashboard", link: "dashboard" },
        { Label: "Orders", link: "orders" },
        { Label: "Downloads", link: "downloads" },
        { Label: "Addresses", link: "addresses" },
        { Label: "Account details", link: "account-details" },
        // { Label: "Compare", link: "compare" },
        // { Label: "Wishlist", link: "wishlist" },
        { Label: "Log out", link: "logout" }
    ];
    const ordersData = [
        { orderid: '1', date: '2024-01-01', status: 'Pending', total: '$100' },
        { orderid: '2', date: '2024-02-01', status: 'Shipped', total: '$200' },
        { orderid: '3', date: '2024-03-01', status: 'Delivered', total: '$300' },
    ];
    
    const [activeTab, setActiveTab] = useState(myAccountSidebar[0].Label);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleTabClick = (label) => {
        setActiveTab(label);
    };

    const handleUpdateUser = (updatedUserData) => {
        console.log("updatedUserData",updatedUserData)
        setUser({
            ...user,
            ...updatedUserData,
        });
        customerDataUpdate(updatedUserData)
    };
    const customerDataUpdate = (data) =>{
        data.id = AuthData.id;

        AuthServices.customerProfileUpdate(data).then((resp) => {
            if (resp?.status_code === 200) {
                notifySuccess(`Your Profile is updated Successfully`);
                console.log(resp)
                dispatch(setUserData({
                    ...resp?.data
                }))
            }
        }).catch((error) => {
            notifyError(`Something went wrong`);
        })

    }
    const logout = () => {
        console.log("call")
        let token;
        if (Cookies.get('userToken')) {
            token = JSON.parse(Cookies.get('userToken'));
        }
        if (token) {
            const cookieTimeOut = 1000;

            AuthServices.customerLogout().then((resp) => {
                console.log("resp customerLogout", resp)
                if (resp?.status_code === 200) {
                    Cookies.set('userToken', JSON.stringify(""), {
                        expires: cookieTimeOut,
                    });
                    dispatch(setUserData({}))
                    dispatch(setGuestUser({}))
                    dispatch(setUserLogInOrNot(false))
                    notifySuccess(`Logout Suceefully`);
                    navigate(`/login`)
                }
            }).catch((error) => {
                console.log(error)
            })
        } else {
            dispatch(setUserData({}))
            dispatch(setGuestUser({}))
            notifySuccess(`Guest User logOut Suceefully`);
            navigate(`/login`)
        }
    };


    const renderContent = () => {
        switch (activeTab) {
            case "Dashboard":
                return <Dashboard data={AuthData} logout={logout} />;
            case "Orders":
                return <Order orderData={ordersData}/>;
            case "Downloads":
                return <Download />;
            case "Addresses":
                return <Address />;
            case "Account details":
                return <AccountDetails user={AuthData} onUpdateUser={handleUpdateUser} />;
            case "Compare":
                return <Compare />;
            case "Wishlist":
                return <Wishlist />;
            case "Log out":
                logout(); 
                return <Logout />;
            default:
                return null;
        }
    };

    if (loading) {
        return <SpinnerLoading loading={loading} />;
    }

    return (
        <React.Fragment>
        <Header />
        <div className="container mt-5">
            <div>
                <div className="row mt-5">
                    <div className='text-center'>
                        <h2 className='title'>My Account</h2>
                    </div>
                </div>
                <div className="row mt-5 mb-5">
                    <div className="col-md-4">
                        <div className='m-1'>
                            <ul style={{ border: '1px solid #ccc' }} className='pl-0'>
                                {myAccountSidebar.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <li
                                            className={`p-4 mb-0 text-left ${activeTab === item.Label ? 'secondaryBG' : ''}`}
                                            onClick={() => handleTabClick(item.Label)}
                                        >
                                            <a
                                                href={'#'}
                                                className={activeTab === item.Label ? 'text-white' : 'titleColor'}
                                                style={{ textDecoration: 'none' }}
                                            >
                                                {item.Label}
                                            </a>
                                        </li>
                                        {index < myAccountSidebar.length - 1 && <hr className='mt-0 mb-0' />}
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {renderContent()}
                    </div>
                </div>
            </div>
            <div className='pb-2'>
                <FooterComponents />
            </div>
        </div>
        </React.Fragment>
    );
};

export default MyAccount;
