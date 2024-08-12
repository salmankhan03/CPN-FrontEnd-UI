import React, { useEffect, useState } from 'react';
import ButtonComponent from '../../components/ButtonComponents/ButtonComponents';
import { useNavigate } from 'react-router-dom';
import ImageComponent from '../../components/ImageComponents/ImageComponents';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, updateCartItems, updateCartSubTotal } from '../../redux/action/cart-action';
import InputComponent from '../../components/InputComponents/InputComponents';
import { Toast, notifySuccess, notifyError } from '../../components/ToastComponents/ToastComponents';
import { setUserLogInOrNot, setUserShowGuestOrNot } from "../../redux/action/auth-action";
import SpinnerLoading from '../../components/SpinnerComponents/SpinnerLoader';
import FooterComponents from "../../components/FooterComponents/FooterComponents";
import emptyCarts from "../../assets/images/cart_empty.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../../components/ConfirmationModalComponents/ConfirmationModal';
import Header from "../../components/HeaderComponents/HeaderComponents";

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const AuthData = useSelector(state => state.AuthReducer.userData);
    const GuestData = useSelector(state => state.AuthReducer.guestUserData?.guestUserId)
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const subtotal = cartItems.reduce((total, item) => total + JSON.parse(item.totalPrice), 0);
    const isApplayCoupon = useSelector(state => state.CartReducer.coupon)
    const totalItems = cartItems?.length;

    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(!!AuthData.id || !!GuestData)
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponCode, setCouponCode] = useState(isApplayCoupon ? isApplayCoupon?.couponCode : '');
    const [couponDiscount, setCouponDiscount] = useState(isApplayCoupon ? isApplayCoupon?.couponDiscount : 0)

    const [subTotalWithCoupon, setSubTotalWithCoupon] = useState(isApplayCoupon?.couponDiscount ? subtotal - isApplayCoupon?.couponDiscount : subtotal)
    const [checkCouponCode, setCheckCouponCode] = useState(null)
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const timers = setTimeout(() => {
            setLoading(false)
        }, 1000)
        window.scrollTo(0, 0);
        return () => clearTimeout(timers);
    }, [])

    const handleNavigation = () => {
        navigate(`/Shop`)
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
        const totalPrice = updatedCartItemsList.reduce((sum, item) => sum + item.totalPrice, 0);
        dispatch(updateCartSubTotal(totalPrice)) 

    }

    const handleApplyCoupon = async (toast) => {
        setCouponCode(couponCode)

        const payload = {
            coupon_code: couponCode,
            cart_amount: subtotal
        }

        try {
            const response = await fetch('https://backend.i-healthcare.ca/api/coupon-code/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json()
            setCheckCouponCode(data)

            console.log('Success:', data);
            if (data?.is_coupon_code_valid === true) {
                setShowCouponInput(false)
                setCheckCouponCode(data)
                console.log('Success:', data);
                setShowCouponInput(false)
                manageCoupon(data)
                if(toast){
                notifySuccess(`Your Coupon "${couponCode}" applay successfull`);
                }
            } else {
                setCheckCouponCode(null)
                dispatch(addCoupon({
                    couponCode: null,
                    couponDiscount: null,
                    amount: null,
                    calculation_type: null
                }));
                setSubTotalWithCoupon(subtotal);

                if(toast){
                notifyError(`Your Coupon "${couponCode}" Not Matched`);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
        console.log('Coupon code applied:', couponCode);
    };

    function manageCoupon(data) {

        const isMinimumAmountReached = (subtotal > data?.coupon_code?.minimum_amount);

        const discount = isMinimumAmountReached
            ? data?.coupon_code?.calculation_type === "percentage"
                ? (parseFloat(data?.coupon_code?.amount) / 100) * subtotal
                : data?.coupon_code?.calculation_type === "fixed"
                    ? parseFloat(data?.coupon_code?.amount) : 0
            : 0;
        console.log("discount ==> ",discount)
        const discountedTotal = parseFloat(subtotal) - discount;
        // dispatch(updateCartSubTotal(discountedTotal));
        console.log("discountedTotal", discountedTotal)
        setSubTotalWithCoupon(discountedTotal);
        console.log("Codupon Dis|", discount);
        console.log("data", data)
        setCouponDiscount(discount)

        dispatch(addCoupon({
            couponCode: couponCode,
            couponDiscount: discount,
            amount: data?.coupon_code?.amount,
            calculation_type: data?.coupon_code?.calculation_type
        }));

    }

    const handleIncrement = (index) => {
        const updatedCartSubTotals = subtotal;
        const updatedCartItems = [...cartItems];
        const updatedItem = { ...updatedCartItems[index] };
        updatedItem.purchaseQty = JSON.parse(updatedItem.purchaseQty) + 1;
        updatedItem.totalPrice = JSON.parse(updatedItem.price) * updatedItem.purchaseQty;
        updatedCartItems[index] = updatedItem;
        dispatch(updateCartItems(updatedCartItems));
        dispatch(updateCartSubTotal(updatedCartSubTotals + JSON.parse(updatedItem.price)))
        setSubTotalWithCoupon(updatedCartSubTotals + JSON.parse(updatedItem.price));
    };

    const handleDecrement = (index) => {
        const updatedCartSubTotals = subtotal;
        const updatedCartItems = [...cartItems];
        const updatedItem = { ...updatedCartItems[index] };
        updatedItem.purchaseQty = Math.max(1, JSON.parse(updatedItem.purchaseQty) - 1);
        updatedItem.totalPrice = JSON.parse(updatedItem.price) * updatedItem.purchaseQty;
        updatedCartItems[index] = updatedItem;
        dispatch(updateCartItems(updatedCartItems));
        dispatch(updateCartSubTotal(updatedCartSubTotals - JSON.parse(updatedItem.price)))
        console.log("subtotal", subtotal)
        setSubTotalWithCoupon(updatedCartSubTotals - JSON.parse(updatedItem.price));

    };

    const gotoCheckout = () => {
        console.log(isLoggedIn)
        if (isLoggedIn) {
            const timers = setTimeout(() => {
                // setLoading(false)
                navigate('/checkout')
                dispatch(setUserLogInOrNot(false))
            }, 1000);
            return () => clearTimeout(timers);
        } else {
            dispatch(setUserLogInOrNot(false))
            navigate('/login')
            dispatch(setUserShowGuestOrNot(false))
        }
    }

    const clearCarts = () => {
        dispatch(updateCartItems([]));
        dispatch(updateCartSubTotal(0))
        setSubTotalWithCoupon(0);
        dispatch(addCoupon({}));
    }

    const removeCoupon = () => {
        console.log(isApplayCoupon);
        dispatch(addCoupon({}));
        setSubTotalWithCoupon(subtotal)
    }

    useEffect(() => {
        // const isMinimumAmountReached = (subtotal > checkCouponCode?.coupon_code?.minimum_amount);
        // console.log("isMinimumAmountReached",isMinimumAmountReached)
        // const discount = isMinimumAmountReached
        //     ? checkCouponCode?.coupon_code?.calculation_type === "percentage" ? (parseFloat(checkCouponCode?.coupon_code?.amount) / 100) * subtotal : checkCouponCode?.coupon_code?.calculation_type === "fixed" ? parseFloat(checkCouponCode?.coupon_code?.amount) : 0
        //     : 0;
        // console.log("discount",discount)
        // setCouponDiscount(discount)
        // const discountedTotal = parseFloat(subtotal) - discount;
        // console.log("discountedTotal",discountedTotal)

        // dispatch(updateCartSubTotal(discountedTotal));
        // setSubTotalWithCoupon(discountedTotal)
        // dispatch(addCoupon({ couponCode: couponCode, couponDiscount: discount, discountPercentage: checkCouponCode?.coupon_code?.amount }));
        console.log(subtotal)
        dispatch(updateCartSubTotal(subtotal))
        // const isMinimumAmountReached = (subtotal > checkCouponCode?.coupon_code?.minimum_amount);
        // const discount = isMinimumAmountReached
        //     ? isApplayCoupon?.calculation_type === "percentage" ? (parseFloat(isApplayCoupon?.amount) / 100) * subtotal : 
        //     isApplayCoupon?.calculation_type === "fixed" ? parseFloat(isApplayCoupon?.amount) : 0
        //     : 0;
        //     console.log("discount",discount)
        //     console.log("discount",isApplayCoupon)

        // dispatch(addCoupon({ 
        //     couponCode: isApplayCoupon?.couponCode, 
        //     couponDiscount: discount, 
        //     amount: isApplayCoupon?.amount, 
        //     calculation_type:isApplayCoupon?.calculation_type
        //  }));
        // console.log(isApplayCoupon)
        if(isApplayCoupon?.couponDiscount){
            handleApplyCoupon(false)
        }
        setSubTotalWithCoupon(isApplayCoupon?.couponDiscount ? subtotal - isApplayCoupon?.couponDiscount : subtotal)
    }, [subtotal])

    if (loading) {
        return <SpinnerLoading loading={loading} />
    }
    return (
        <>
            <Header></Header>
            <div className="container mt-5">
                {/* <Toast /> */}
                {totalItems === 0 ? (
                    <div className="empty-cart">
                        <div className='emptyCart text-center d-flex flex-column align-items-center'>
                            <ImageComponent src={emptyCarts} alt="Cart's Empty" classAtribute="empty-carts-image" />
                            <div className='text-center mt-5'>
                                <h2>Your cart is currently empty.</h2>
                                <p className="mt-1">You may check out all the available products and buy some in the shop.</p>
                            </div>
                            <div className='mt-3'>
                                <ButtonComponent cssClass="empty-carts" onClick={handleNavigation} label="Return to Shop" />
                            </div>
                        </div>
                    </div>

                ) : (
                    <React.Fragment>
                        <div className='row'>
                            <div className='col-xs-12'>
                                <div className="text-center">
                                    <h5 className="pointer-on-hover title d-inline">
                                        {/* Your Cart  ({cartItems.length} items) */}
                                        Shopping Cart


                                    </h5>
                                </div>
                                <table className="table mt-5 cart_table_hide">
                                    <thead>
                                        <tr className=''>
                                            <th scope="col" className="col-sm-2 custom-no-border tab-title secondaryColor table-heading p-3" >Item</th>
                                            <th scope="col" className="col-sm-5 custom-no-border text-left secondaryColor table-heading p-3" > </th>
                                            <th scope="col" className="col-sm-1 custom-no-border tab-title secondaryColor table-heading p-3" >Price</th>
                                            <th scope="col" className="col-sm-2 custom-no-border tab-title secondaryColor table-heading p-3" >Quantity</th>
                                            <th scope="col" className="col-sm-1 custom-no-border tab-title secondaryColor table-heading p-3" >Total</th>
                                            <th scope="col" className="col-sm-1 text-right custom-no-border tab-title secondaryColor table-heading p-3" ></th>

                                        </tr>
                                    </thead>

                                    <tbody style={{ border: '1px solid #ccc' }}>
                                        {cartItems.map((item, index) => {
                                            return (
                                                <tr key={index} className='p-3' >
                                                    <td className='align-middle pt-5  pb-5 pointer-on-hover' style={{height:90,objectFit:'contain'}} onClick={() => navigate(`/products-details/${item.id}`, { state: { id: item.id } })}>
                                                        {/* <div className='row align-items-center'> */}
                                                        {/* <div className='col-12 col-sm-3'> */}
                                                        <ImageComponent src={item?.image[0]?.name} alt="Product Image" width={true} classAtribute="carts-img cartsfitImg maxHeight" />
                                                        {/* </div>

                                                </div> */}
                                                    </td>
                                                    <td className='align-middle pt-5 pb-5 '>
                                                        {/* <div className='col-12 col-sm-8 ml-1'> */}
                                                        <p className='product-name mr-3 titleColor text-left pointer-on-hover' onClick={() => navigate(`/products-details/${item.id}`, { state: { id: item.id } })}>{item.name}</p>
                                                        {/* </div> */}
                                                    </td>
                                                    <td className='align-middle pt-5  pb-5'>
                                                        <p className='fw-normal fs-4 secondaryColor mt-3'>
                                                            ${item?.price}
                                                        </p>
                                                    </td>
                                                    <td className='pt-5  pb-5'>
                                                        <div className="quantity d-flex flex-column  align-items-sm-center">
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
                                                    <td className='align-middle pt-5 pb-5'>
                                                        <p className='fw-normal fs-4 secondaryColor mt-3'>
                                                            ${item?.totalPrice}
                                                        </p>
                                                    </td>
                                                    <td className='align-middle pt-5 pb-5'>
                                                        <p className="mb-0 text-underline-custom pointer-on-hover" onClick={() => removeProduct(index)}> <u>Remove</u> </p>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>


                                {/* For mobile Devicea */}
                                <div className='m-1 mt-2 small-card'>
                                    {cartItems.map((item, index) => (
                                        <div key={index} className='row align-items-center mt-3 cards'>
                                            <div className='col-3 ' style={{ backgroundColor: '' }} onClick={() => navigate(`/products-details/${item.id}`, { state: { id: item.id } })}>
                                                <ImageComponent src={item?.image[0]?.name} alt="Product Image" classAtribute="cart-products" />
                                            </div>
                                            <div className='col-9' style={{ backgroundColor: '' }}>
                                                <div className='row'>
                                                    <div className='col-4 cartItems-text' onClick={() => navigate(`/products-details/${item.id}`, { state: { id: item.id } })}>
                                                        {item.name}
                                                    </div>
                                                    <div className='col-2 text-end'>
                                                        ${item.price}
                                                    </div>
                                                    <div className='col-6 text-end'>
                                                        ${item.totalPrice}
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
                                {/* For mobile Devicea */}
                                <div className="container mt-5 mb-5">
                                    <div className="d-flex flex-column flex-md-row align-items-center">
                                        <div className="text-left mb-3 mb-md-0 w-auto">
                                            <ButtonComponent cssClass="shopping-btn w-max-content" onClick={handleNavigation} label="Continue Shopping" />                                    </div>
                                        <div className="ml-md-5 align-items-center">
                                            <p className="mb-0 d-flex align-items-center clearCarts pointer-on-hover" onClick={handleShowModal}>
                                                <FontAwesomeIcon icon={faXmark} fontSize={23} className="mr-2" /> Clear shopping cart
                                            </p>
                                        </div>
                                    </div>
                                    <ConfirmationModal
                                        show={showModal}
                                        handleClose={handleCloseModal}
                                        handleConfirm={clearCarts}
                                        title="Confirm Deletion"
                                        body="Are you sure you want to clear the shopping cart?"
                                    />
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div className='row mt-5 mb-5'>
                            <div className='col-md-5 col-xs-12 mt-md-0'>
                                {isApplayCoupon?.couponCode ? (
                                    <div className="text-left" style={{ padding: 25 }}>
                                        <h6 className="pointer-on-hover title d-inline">Coupon Discount</h6>
                                        <div class="row d-block align-items-center mt-5">
                                            <div class="col-auto">
                                                <p class="fs-4 text-success d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faCheck} fontSize={20} className="mr-2" />
                                                    Coupon applied!
                                                </p>
                                            </div>
                                            <div class="col-auto">
                                                <div class="coupon-container pointer-on-hover">
                                                    {isApplayCoupon?.couponCode}
                                                    <span className='ml-2 d-flex ' onClick={removeCoupon}>
                                                        <FontAwesomeIcon icon={faXmark} fontSize={20} />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-left" style={{ padding: 25 }}>
                                        <h6 className="pointer-on-hover title d-inline">Coupon Discount</h6>
                                        <p className='mt-2'>Enter your coupon code if you have one.</p>
                                        <div className='mt-4'>
                                            <InputComponent
                                                type="text"
                                                id="coupon"
                                                label=""
                                                customClass={`form-control gray-bg carts-coupon-input ml-auto `}
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Coupon code"
                                                required
                                            />
                                            <ButtonComponent cssClass="shopping-btn mt-3" onClick={handleApplyCoupon} label="Apply Coupon" disabled={!couponCode} />

                                            {/* <div className=''>
                                        <button
                                            style={{ padding: 5, width: 80, backgroundColor: 'black', borderRadius: 10, color: 'white' }}
                                            className={`${couponDiscount > 0 ? 'disabled' : ''}`}
                                            disabled={couponDiscount > 0}
                                            onClick={handleApplyCoupon}
                                        >
                                            {"Apply"}
                                        </button>
                                    </div> */}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='col-md-7 col-xs-12 mt-md-0 '>
                                <div className='row'>
                                    <div className='col-md-5 col-xs-12 mt-md-0 mt-5'>
                                    </div>
                                    <div className='col-md-7 col-xs-12 mt-md-0 mt-5'>
                                        <div className='leftSidebarBrand'>
                                            <div className="text-center">
                                                <h5 className="bold pointer-on-hover title d-inline">Order Summary</h5>
                                            </div>
                                            <div
                                                className=" mt-5">

                                                <div className="d-flex justify-content-between tab-title mt-2">
                                                    <div className=''> <p className='tab-title'>Subtotal:</p></div>
                                                    <div>${subtotal?.toFixed(2)}</div>
                                                </div>
                                                {isApplayCoupon?.couponDiscount > 0 &&
                                                    <div className="d-flex justify-content-between tab-title mt-2">
                                                        <div>{<p className='tab-title'>Coupon Discount ${isApplayCoupon?.calculation_type === 'percentage' ? `(${isApplayCoupon?.amount}%)` : `(${isApplayCoupon?.amount} CAD)`} :</p>}</div>
                                                        <div>- ${isApplayCoupon?.couponDiscount?.toFixed(2)}</div>
                                                    </div>
                                                }
                                                <div className="d-flex justify-content-between tab-title  mt-2">
                                                    <div><p className='tab-title' title='Excluding Taxes and Fees'>Grandtotal:</p></div>
                                                    <div>${subTotalWithCoupon?.toFixed(2)}</div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='text-center'>
                                                    <ButtonComponent cssClass="shopping-btn mt-4" onClick={gotoCheckout} label="Proceed to Checkout" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>



                            </div>
                        </div>
                    </React.Fragment>
                )}
                <div className='pb-2'>
                    <FooterComponents />
                </div>
            </div>
        </>
    );
};

export default CartPage;
