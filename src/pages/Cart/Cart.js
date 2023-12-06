import React, { useState } from 'react';
import ButtonComponent from '../../components/ButtonComponents/ButtonComponents';
import { useNavigate } from 'react-router-dom';
import ImageComponent from '../../components/ImageComponents/ImageComponents';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItems } from '../../redux/action/cart-action';
import InputComponent from '../../components/InputComponents/InputComponents';

const CartPage = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const dispatch = useDispatch();
    const totalItems = cartItems?.length;
    const subtotal = cartItems.reduce((total, item) => total + JSON.parse(item.totalPrice), 0);

    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const handleNavigation = () => {
        navigate(`/`)
    };

    const handleCouponClick = () => {
        setShowCouponInput(!showCouponInput);
    };

    const handleApplyCoupon = () => {
        setCouponCode(couponCode)
        setShowCouponInput(false)
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
        navigate('/checkout')
    }
    return (
        <div className="container mt-5">
            {totalItems === 0 ? (
                <div className="empty-cart">
                    <p className='emptyCart'>Your cart is currently empty.</p>
                    <ButtonComponent onClick={handleNavigation} label="Return to Shop" />

                </div>
            ) : (
                <div className="">
                    <div className="text-center">
                        <h1 className='tex'>Your Cart  ({cartItems.length} items)</h1>
                    </div>
                    <table className="table mt-3">
                        <thead>
                            <tr className=''>
                                <th scope="col" className="col-sm-6 custom-no-border">Item</th>
                                <th scope="col" className="col-sm-2 custom-no-border">Price</th>
                                <th scope="col" className="col-sm-2 custom-no-border">Quantity</th>
                                <th scope="col" className="col-sm-2 text-right custom-no-border">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className='row'>
                                            <div className='col-12 col-sm-3'>
                                                <ImageComponent src={item.imagePath} alt="Product Image" classAtribute="cart-products" />
                                            </div>
                                            <div className='col-12 col-sm-9'>
                                                <h4 className='product-name mr-3'>{item.productName}</h4>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='align-middle'>{item.price}</td>
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
                                    <td className='align-middle text-right'>{item?.totalPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    <div class=" text-right">
                        <p>Subtotal: <span className='ml-5'>{subtotal}</span></p>
                        <p>Sales Tax: <span className='ml-5'>00</span></p>
                        <p>
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
                        )}

                        <p>Grandtotal: <span className='ml-5'>{subtotal}</span></p>

                    </div>
                    <div className='row'>
                        <div className='text-right'>
                            <h6>Congrats, you'r eligible for Free <i className="fas fa-truck"></i> <br />Shipping</h6>
                            <button class="checkout-button cart-checkout-btn" onClick={() => gotoCheckout()} >Proceed to Checkout</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
