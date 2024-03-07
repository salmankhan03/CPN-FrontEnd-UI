import React, {useEffect, useState} from 'react';
import ButtonComponent from '../../components/ButtonComponents/ButtonComponents';
import { useNavigate } from 'react-router-dom';
import ImageComponent from '../../components/ImageComponents/ImageComponents';
import { useDispatch, useSelector } from 'react-redux';
import {updateCartItems, updateCartSubTotal} from '../../redux/action/cart-action';
import InputComponent from '../../components/InputComponents/InputComponents';
import { Toast, notifySuccess, notifyError } from '../../components/ToastComponents/ToastComponents';

const CartPage = () => {
    const navigate = useNavigate();
    const AuthData = useSelector(state => state.AuthReducer.userData);
    const GuestData = useSelector(state => state.AuthReducer.guestUserData?.guestUserId )
    const [isLoggedIn, setLoggedIn] = useState(!!AuthData.id || !!GuestData)
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const dispatch = useDispatch();
    const totalItems = cartItems?.length;
    const subtotal = cartItems.reduce((total, item) => total + JSON.parse(item.totalPrice), 0);

    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [checkCouponCode, setCheckCouponCode] = useState(null)
    const [subTotalWithCoupon, setSubTotalWithCoupon] = useState(0)
    const [couponDiscount, setCouponDiscount] = useState(0)
    const handleNavigation = () => {
        navigate(`/`)
    };

    const handleCouponClick = () => {
        setShowCouponInput(!showCouponInput);
    };
    const truncateString = (str, maxLength) => {
        if (str?.length <= maxLength) return str;
        return str.substr(0, maxLength) + "...";
    };

    const removeProduct = (index) => {
        const updatedCartItemsList = [...cartItems];
        let message = truncateString(updatedCartItemsList[index]?.name, 60)
        notifySuccess(`${message} successfully remove to the cart!`);
        updatedCartItemsList.splice(index, 1)
        dispatch(updateCartItems(updatedCartItemsList));
    }

    const handleApplyCoupon = async() => {
        setCouponCode(couponCode)

        const payload= {
            coupon_code: couponCode,
            cart_amount: subtotal
        }

        try {
            const response = await fetch('https://backend.kingsmankids.com/api/coupon-code/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json()
            setCheckCouponCode(data)

            console.log('Success:', data);
            setShowCouponInput(false)
        } catch (error) {
            console.error('Error:', error);
        }
        console.log('Coupon code applied:', couponCode);
    };
    const handleIncrement = (index) => {
        const updatedCartItems = [...cartItems];
        const updatedItem = { ...updatedCartItems[index] };
        updatedItem.purchaseQty = JSON.parse(updatedItem.purchaseQty) + 1;
        updatedItem.totalPrice = JSON.parse(updatedItem.price) * updatedItem.purchaseQty;
        updatedCartItems[index] = updatedItem;
        dispatch(updateCartItems(updatedCartItems));
    };

    const handleDecrement = (index) => {
        const updatedCartItems = [...cartItems];
        const updatedItem = { ...updatedCartItems[index] };
        updatedItem.purchaseQty = Math.max(1, JSON.parse(updatedItem.purchaseQty) - 1);
        updatedItem.totalPrice = JSON.parse(updatedItem.price) * updatedItem.purchaseQty;
        updatedCartItems[index] = updatedItem;
        dispatch(updateCartItems(updatedCartItems));
    };
    const gotoCheckout = () => {
        console.log(  isLoggedIn)
        if(isLoggedIn){
            navigate('/checkout')
        }else{
            navigate('/login')
        }
    }

    useEffect(() => {
        const isMinimumAmountReached = (subtotal > checkCouponCode?.coupon_code?.minimum_amount);

        const discount = isMinimumAmountReached
            ? checkCouponCode?.coupon_code?.calculation_type === "percentage" ? (parseFloat(checkCouponCode?.coupon_code?.amount) / 100) * subtotal : checkCouponCode?.coupon_code?.calculation_type === "fixed" ? parseFloat(checkCouponCode?.coupon_code?.amount) : 0
            : 0;

        setCouponDiscount(discount)

        const discountedTotal = parseFloat(subtotal) - discount;
        dispatch(updateCartSubTotal(discountedTotal));

        setSubTotalWithCoupon(discountedTotal)

    }, [checkCouponCode, subtotal])

    return (
        <div className="container mt-5">
            <Toast />
            {totalItems === 0 ? (
                <div className="empty-cart">
                    <p className='emptyCart'>Your cart is currently empty.</p>
                    <ButtonComponent onClick={handleNavigation} label="Return to Shop" />

                </div>
            ) : (
                <div className='row'>
                    <div className='col-md-8 col-xs-12'>
                        <div className="text-center">
                        <h5 className="bold pointer-on-hover title d-inline">Your Cart  ({cartItems.length} items)</h5>
                        </div>
                        <table className="table mt-5 cart_table_hide">
                            <thead>
                                <tr className=''>
                                {/* className={`tab tab-title  ${selectedTab === tabName ? 'active sidebar-filter-section-list' : ''}`} */}
                                    <th scope="col" className="col-sm-6 custom-no-border tab-title secondaryColor">Item</th>
                                    <th scope="col" className="col-sm-2 custom-no-border tab-title secondaryColor">Price</th>
                                    <th scope="col" className="col-sm-2 custom-no-border tab-title secondaryColor">Quantity</th>
                                    <th scope="col" className="col-sm-2 text-right custom-no-border tab-title secondaryColor">Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cartItems.map((item, index) => {
                                    console.log(item)
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <div className='row align-items-center'>
                                                    <div className='col-12 col-sm-1'>
                                                        <i className="fa fa-trash trashIconColor" onClick={() => removeProduct(index)}></i>
                                                    </div>
                                                    <div className='col-12 col-sm-3'>
                                                        <ImageComponent src={item?.image[0]?.name} alt="Product Image" width={true} classAtribute="cart-products" />
                                                    </div>
                                                    <div className='col-12 col-sm-8'>
                                                        <h4 className='product-name mr-3 titleColor'>{item.name}</h4>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle priceLabelColor'>${item.price}</td>
                                            <td>
                                                <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                                                    <div className="quantity_selector">
                                                        <span
                                                            className={
                                                                item?.purchaseQty > 1 ? "minus" : "minus disabled"
                                                            }
                                                            onClick={() => handleDecrement(index)}
                                                        >
                                                            <i className="fa fa-minus" aria-hidden="true"></i>
                                                        </span>
                                                        <span id="quantity_value">{item?.purchaseQty}</span>
                                                        <span
                                                            className="plus"
                                                            onClick={() => handleIncrement(index)}
                                                        >
                                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='align-middle text-right priceLabelColor'>${item?.totalPrice}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <div className='m-1 mt-2 small-card'>
                            {cartItems.map((item, index) => (
                                <div key={index} className='row align-items-center mt-3 cards'>
                                    <div className='col-3 ' style={{ backgroundColor: '' }}>
                                        <ImageComponent src={item?.image[0]?.name} alt="Product Image" classAtribute="cart-products" />
                                    </div>
                                    <div className='col-9' style={{ backgroundColor: '' }}>
                                        <div className='row'>
                                            <div className='col-4 cartItems-text    '>
                                                {item.name}
                                            </div>
                                            <div className='col-2 text-end'>
                                                {item.price}
                                            </div>
                                            <div className='col-6 text-end'>
                                                {item.totalPrice}
                                            </div>
                                        </div>
                                        <div className='row align-items-center mt-2'>
                                            <div className='col-9'>
                                                <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center mt-0">
                                                    <div className="quantity_selector">
                                                        <span
                                                            className={
                                                                item?.purchaseQty > 1 ? "minus" : "minus disabled"
                                                            }
                                                            onClick={() => handleDecrement(index)}
                                                        >
                                                            <i className="fa fa-minus" aria-hidden="true"></i>
                                                        </span>
                                                        <span id="quantity_value">{item?.purchaseQty}</span>
                                                        <span
                                                            className="plus"
                                                            onClick={() => handleIncrement(index)}
                                                        >
                                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-3 text-end'>
                                                <i className="fa fa-trash" onClick={() => removeProduct(index)}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='col-md-4 col-xs-12 mt-md-0 mt-5'>
                        <div className="text-center">
                        <h5 className="bold pointer-on-hover title d-inline">Order Summary</h5>
                        </div>
                        <div className="text-right mt-5">
                            <div className="mr-auto tab-title font-weight-normal">Subtotal: <span className='ml-5'>${subtotal}</span></div>
                            {/* {couponDiscount > 0 && <p className='mt-1'>{`Coupon Discount ${checkCouponCode?.coupon_code.calculation_type === 'percentage' ? `(${checkCouponCode?.coupon_code.amount}%)` : `(${checkCouponCode?.coupon_code.amount} CAD)`} :`} <span className='ml-5'>{couponDiscount}</span></p>}
                            <p className='mt-1'>
                                Coupon code:{' '}
                                <span className='ml-5' onClick={handleCouponClick}>
                                    {couponCode ? couponCode : 'add Coupon'}
                                </span>
                            </p>

                            {showCouponInput && (
                                <div className="coupon-section">
                                    <InputComponent
                                        type="text"
                                        id="coupon"
                                        label=""
                                        customClass={`form-control gray-bg cart-checkout-btn ml-auto `}
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter your coupon code"
                                        required
                                    />
                                    <button class="checkout-button cart-checkout-btn" onClick={handleApplyCoupon} >Apply Coupon</button>

                                </div>
                            )} */}

                            <div className="mr-auto tab-title font-weight-normal mt-2">Grandtotal:  <span className='ml-5'>${subTotalWithCoupon}</span></div>

                        </div>
                        <div className='row'>
                            <div className='text-right'>
                                {checkCouponCode?.is_coupon_code_valid === false && <h6 style={{color: 'red'}}>{checkCouponCode.message}</h6>}
                                {/*<h6>Congrats, you'r eligible for Free <i className="fas fa-truck"></i> <br />Shipping</h6>*/}
                                <button class="checkout-button cart-checkout-btn mt-4" onClick={() => gotoCheckout()} >Proceed to Checkout</button>
                                </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
