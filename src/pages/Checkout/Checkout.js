import React, { useEffect, useRef, useState } from 'react';
import InputComponent from '../../components/InputComponents/InputComponents';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
// import { getAllCountries, getStatesOfCountry } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderServices from '../../services/orderService';
import { ProvinceTax } from '../../helpers/TaxTable'
import LoginScreen from '../Login/Login';
import {
    addCoupon,
    cartOrderTotal, removeAllCartItems,
    setSelectedProvince,
    updateCartItems,
    updateCartSubTotal,
    updateCartTotalTax
} from '../../redux/action/cart-action';
import { Collapse, Button } from 'react-bootstrap';
import ImageComponent from '../../components/ImageComponents/ImageComponents';
import { notifyError, notifySuccess, Toast } from '../../components/ToastComponents/ToastComponents';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeDetails from "./StripeDetails";
import axios from 'axios';
import SpinnerLoading from '../../components/SpinnerComponents/SpinnerLoader';
import FooterComponents from "../../components/FooterComponents/FooterComponents";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCheck, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons';
import Header from "../../components/HeaderComponents/HeaderComponents";
import ButtonComponent from '../../components/ButtonComponents/ButtonComponents';

const stripePromise = loadStripe('pk_test_51NBOXVFb9Yh8bF654LWXyn1QaH9yuqdnPar9n5Kc22JPhuYUIBQMu73o63kb2RuCqS4OkmWtGqgNm2S4VQAs8QJf009k0x2ufb');


const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [islogin, setIsLogin] = useState(true)
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const subtotal = useSelector(state => state.CartReducer.cartSubTotal);
    const cartTotalTax = useSelector(state => state.CartReducer.cartTotalTax);
    const isApplyCoupon = useSelector(state => state.CartReducer.coupon)
    const isProvinceSelected = useSelector(state => state.CartReducer.province)

    const CouponDetails = useSelector(state => state.CartReducer.coupon)
    const AuthData = useSelector(state => state.AuthReducer.userData);
    const [loading, setLoading] = useState(true);
    const [userID, setUserID] = useState(AuthData ? AuthData.id : '');
    const GuestData = useSelector(state => state.AuthReducer.guestUserData)
    const [isChecked, setIsChecked] = useState(true);
    const [billingFormErrors, setBillingFormErrors] = useState({});
    const [shippingFormErrors, setShippingFormErrors] = useState({});
    const [pst, setPst] = useState();
    const [hst, setHst] = useState();
    const [gst, setGst] = useState();
    const [total, setTotal] = useState();
    const [province, setProvince] = useState(isProvinceSelected ? isProvinceSelected?.provinceName : '');
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [showShippingCharge, setShowShippingCharge] = useState(false);
    const [showShippingAddress, setShowShippingAddress] = useState(true);
    const [stripeShow, setStripeShow] = useState(false);
    const [couponCode, setCouponCode] = useState(CouponDetails ? CouponDetails?.couponCode : '');
    const [checkCouponCode, setCheckCouponCode] = useState(null)
    const [couponDiscount, setCouponDiscount] = useState(isApplyCoupon ? isApplyCoupon?.couponDiscount : 0)
    const [subTotalWithCoupon, setSubTotalWithCoupon] = useState(subtotal)
    const [validPostal, setValidPostal] = useState(false)
    const [shipping, setShipping] = useState()
    const [shippingRate, setShippingRate] = useState()
    const [selectedShippingOption, setSelectedShippingOption] = useState(null);
    const [cardDetail, setCardDetail] = useState({
        cardNumber: '',
        expiry: '',
        cvc: ''
    });
    const [open, setOpen] = useState(false);
    const [billingFormData, setBillingFormData] = useState({
        first_name: '',
        last_name: '',
        country: 'CA',
        street_address: '',
        city: '',
        state: '',
        zipcode: '',
        contact_no: '',
        email: '',
    });
    const [shippingFormData, setShippingFormData] = useState({
        first_name: AuthData ? AuthData.first_name : '',
        last_name: AuthData ? AuthData?.last_name : '',
        country: 'CA',
        street_address: AuthData && AuthData?.shipping_address_addedy_by_user?.length > 0 ? AuthData?.shipping_address_addedy_by_user[0]?.street_address : '',
        city: AuthData && AuthData?.shipping_address_addedy_by_user?.length > 0 ? AuthData?.shipping_address_addedy_by_user[0]?.city : '',
        state: AuthData && AuthData?.shipping_address_addedy_by_user?.length > 0 ? AuthData?.shipping_address_addedy_by_user[0]?.state : '',
        zipcode: AuthData && AuthData?.shipping_address_addedy_by_user?.length > 0 ? AuthData?.shipping_address_addedy_by_user[0]?.zipcode : '',
        contact_no: AuthData && AuthData?.shipping_address_addedy_by_user?.length > 0 ? AuthData?.shipping_address_addedy_by_user[0]?.contact_no : '',
        email: AuthData ? AuthData?.email : '',
    });

    const stripeElement = (token, error) => {
        console.log('token, error-----------------------', token, error)
    }

    const stripeDetailsRef = useRef();

    const userProperties = {
        username: 'b22f485be2ccc492',
        password: 'a03eaf866847c837b31e06',
        customerNumber: '1234567890',
        contractNumber: '1234567890',
    };

    useEffect(() => {
        if (shippingFormData.zipcode && shippingFormData.zipcode.length > 5) {
            const originPostalCode = 'V6X2T4';
            const destinationPostalCode = shippingFormData.zipcode || 'M5A1A1';
            const weight = 1;

            const formdata = new FormData();
            formdata.append("originPostalCode", originPostalCode);
            formdata.append("destinationPostalCode", destinationPostalCode);
            formdata.append("weight", weight);

            const requestOptions = {
                method: "POST",
                body: formdata,
            };

            fetch("https://backend.i-healthcare.ca/api/shipping-calculation", requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log("result data", data?.response);
                    if (data?.status_code === 200) {
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(data?.response, 'text/xml');

                        const getTextContent = (element, tagName) => {
                            const childElement = element.getElementsByTagName(tagName)[0];
                            return childElement ? childElement.textContent : '';
                        };

                        const getBooleanContent = (element, tagName) => {
                            const childElement = element.getElementsByTagName(tagName)[0];
                            return childElement ? childElement.textContent === 'true' : false;
                        };


                        const rates = Array.from(xmlDoc.getElementsByTagName('price-quote')).map(priceQuote => {
                            return {
                                serviceCode: getTextContent(priceQuote, 'service-code'),
                                serviceName: getTextContent(priceQuote, 'service-name'),
                                basePrice: parseFloat(getTextContent(priceQuote, 'base')),
                                taxes: {
                                    gst: parseFloat(getTextContent(priceQuote, 'gst')),
                                    pst: parseFloat(getTextContent(priceQuote, 'pst')),
                                    hst: parseFloat(getTextContent(priceQuote, 'hst')),
                                },
                                dueAmount: parseFloat(getTextContent(priceQuote, 'due')),
                                options: {
                                    optionCode: getTextContent(priceQuote, 'option-code'),
                                    optionName: getTextContent(priceQuote, 'option-name'),
                                    optionPrice: parseFloat(getTextContent(priceQuote, 'option-price')),
                                },
                                adjustments: Array.from(priceQuote.getElementsByTagName('adjustment')).map(adjustment => {
                                    return {
                                        adjustmentCode: getTextContent(adjustment, 'adjustment-code'),
                                        adjustmentName: getTextContent(adjustment, 'adjustment-name'),
                                        adjustmentCost: parseFloat(getTextContent(adjustment, 'adjustment-cost')),
                                        qualifier: {
                                            percent: parseFloat(getTextContent(adjustment, 'percent')),
                                        },
                                    };
                                }),
                                serviceStandard: {
                                    amDelivery: getBooleanContent(priceQuote, 'am-delivery'),
                                    guaranteedDelivery: getBooleanContent(priceQuote, 'guaranteed-delivery'),
                                    expectedTransitTime: parseInt(getTextContent(priceQuote, 'expected-transit-time')),
                                    expectedDeliveryDate: getTextContent(priceQuote, 'expected-delivery-date'),
                                },
                            };
                        });
                        setShippingRate(rates)

                        if (rates && rates.length > 0) {
                            const lowestBasePriceOption = rates.reduce((minOption, currentOption) => {
                                return minOption.basePrice < currentOption.basePrice ? minOption : currentOption;
                            });

                            setSelectedShippingOption({
                                serviceName: lowestBasePriceOption.serviceName,
                                basePrice: lowestBasePriceOption.basePrice.toFixed(2),
                            });
                        }

                        if (rates.length === 0) {
                            setValidPostal(true);
                        } else {
                            setValidPostal(false);
                        }

                    } else {
                        console.log("error")
                    }
                }).catch(error => {
                    console.error('Fetch error:', error.message);
                });
        }
    }, [shippingFormData?.zipcode]);

    useEffect(() => {
        // window.scrollTo(0, 0);
        // console.log("AuthData",AuthData)
        window.scrollTo(0, 0);
        setLoading(true)
        if (cartItems.length === 0) {
            navigate('/');
        }
        if (AuthData) {
            setShippingFormData((prevData) => ({
                ...prevData,
                first_name: AuthData?.first_name,
                last_name: AuthData?.last_name,
                contact_no: AuthData?.contact_no,
                email: AuthData?.email,
            }))
            const timers = setTimeout(() => {
                setLoading(false)
            }, 500)
            return () => clearTimeout(timers);

        }
        if (isProvinceSelected?.provinceName) {
            setShippingFormData({
                ...shippingFormData,
                ['state']: isProvinceSelected?.provinceName,
            })
            const timers = setTimeout(() => {
                setLoading(false)
            }, 1000)
            return () => clearTimeout(timers);

        }

    }, [])
    const truncateString = (str, maxLength) => {
        if (str?.length <= maxLength) return str;
        return str.substr(0, maxLength) + "...";
    };

    function generateGuestUserId() {
        const uniqueId = 'guest_' + Math.random().toString(36).substr(2, 9);
        return uniqueId;
    }

    // Check if guest user ID exists in local storage, otherwise generate one
    // let guestUserId = localStorage.getItem('guestUserId');
    // if (!guestUserId) {
    //     guestUserId = generateGuestUserId();
    //     localStorage.setItem('guestUserId', guestUserId);
    // }

    // console.log('Guest User ID:', guestUserId);



    // const subtotal = cartItems.reduce((total, item) => total + JSON.parse(item.totalPrice), 0);
    const handleInputChange = (formData, setFormData, field, value, setFormErrors) => {
        let formattedValue = value;
        if (field === 'contact_no') {
            formattedValue = value.slice(0, 10);
        }

        if (field === 'zipcode') {
            formattedValue = value.slice(0, 6);
        }

        // console.log('field-----------------------', field, value)
        setFormData({
            ...formData,
            [field]: formattedValue,
        });
        // console.log(formData,)
        if (setFormErrors === "billingform Error") {
            setBillingFormErrors({
                ...billingFormErrors,
                [field]: '',
            })
        } else {
            setShippingFormErrors({
                ...shippingFormErrors,
                [field]: '',
            })
            if (field === "state") {
                console.log("call")
                // manageConditionWiseTax()
            }
        }


    };
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'lightgray', // Set your desired background color here
        }),
    };
    const validateForm = (formData, setFormErrors) => {

        let errors = {};
        // console.log(formData)
        const firstName = formData?.first_name?.trim();
        const lastName = formData?.last_name?.trim();
        const country = formData?.country?.trim();
        const street_address = formData?.street_address?.trim();
        const city = formData?.city?.trim();
        const state = formData?.state?.trim();
        const zipcode = formData?.zipcode?.trim();
        const contact_no = formData?.contact_no?.trim();
        const email = formData?.email?.trim();


        if (!firstName) {
            errors.first_name = 'First name is required';
        }

        if (!lastName) {
            errors.last_name = 'Last name is required';
        }

        if (!country) {
            errors.country = 'Country is required';
        }

        if (!street_address) {
            errors.street_address = 'Street address is required';
        }

        if (!city) {
            errors.city = 'City is required';
        }

        if (!state) {
            errors.state = 'State is required';
        }

        if (!zipcode) {
            errors.zipcode = 'ZIP Code is required';
        }

        if (!contact_no) {
            errors.contact_no = 'Phone number is required';
        }

        if (!email) {
            errors.email = 'Email address is required';
        } else if (!isValidEmail(formData.email)) {
            errors.email = 'Invalid email address';
        }
        if (setFormErrors === "billingform Error") {
            setBillingFormErrors(errors)
            console.log("Billing", errors)

        } else {
            console.log("Shipping", errors)
            setShippingFormErrors(errors)
        }
        // setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValidEmail = (email) => {
        // You can implement a more sophisticated email validation here
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // const handleCountryChange = (country) => {
    //     console.log(country)
    //     setSelectedCountry(country);
    // };


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);

        if (!isChecked) {
            setBillingFormData({ ...shippingFormData })
            // setShippingFormData({ ...billingFormData });
        } else {
            // setShippingFormData({
            //     first_name: '',
            //     last_name: '',
            //     country: '',
            //     street_address: '',
            //     city: '',
            //     state: '',
            //     zip: '',
            //     phone: '',
            //     email: '',
            // });
        }
    };

    let orderId;

    function orderGenrate(orderData) {
        console.log(orderData)
        OrderServices.generateOrders(orderData).then((resp) => {
            if (resp?.status_code === 200) {
                orderId = resp.order_id
                dispatch(removeAllCartItems([]));
                dispatch(addCoupon({}));
                dispatch(removeAllCartItems([]));
                navigate(`/thankyou`, {
                    state: {
                        order_id: resp.order_id
                    }
                })
            }
        }).catch((error) => {
            // setLoading(false)
            console.log(error)
        })
    }

    const orderData = {
        address: shippingFormData.street_address ? shippingFormData.street_address : '',
        zipcode: shippingFormData.zipcode ? shippingFormData.zipcode : '',
        state: shippingFormData.state ? shippingFormData.state : '',
        city: shippingFormData.city ? shippingFormData.city : '',
        country: shippingFormData.country ? 'Canada' : '',
        name: shippingFormData.first_name ? `${shippingFormData.first_name} ${shippingFormData.last_name}` : '',
    }

    const getToFixed = (a) => {
        return a.toFixed(2);
    }

    useEffect(() => {

        // Manage condition wise Tax
        const selectedProvince = ProvinceTax.find(p => p.provinceName === shippingFormData.state);
        // console.log("selectedProvince", selectedProvince)
        // console.log("selectedProvince", shippingFormData.state)

        const updatedCartItems = cartItems.map((item) => {
            if (item.is_tax_apply === 0) {
                const calculateTax = (taxRate) => {
                    if (selectedProvince && taxRate && !isNaN(taxRate) && taxRate !== 0) {
                        return getToFixed((taxRate / 100) * item.totalPrice);
                    } else {
                        return 0;
                    }
                };


                const subTotalPlusGst = calculateTax(selectedProvince?.gst);
                const subTotalPlusHst = calculateTax(selectedProvince?.hst);
                const subTotalPlusPst = calculateTax(selectedProvince?.pst);

                const withTaxPrice = parseFloat(item.totalPrice) +
                    parseFloat(subTotalPlusGst) +
                    parseFloat(subTotalPlusHst) +
                    parseFloat(subTotalPlusPst);

                return {
                    ...item,
                    taxes: {
                        gst: subTotalPlusGst,
                        hst: subTotalPlusHst,
                        pst: subTotalPlusPst
                    },
                    withTaxPrice: withTaxPrice
                };
            }
            return item;
        });
        function calculateTotalTaxes(products) {
            let totalTaxes = {
                gst: 0,
                hst: 0,
                pst: 0
            };

            products.map(product => {
                // console.log("product", product)
                if (product.is_tax_apply === 0) {
                    if (!isNaN(parseFloat(product?.taxes?.gst))) {
                        totalTaxes.gst += parseFloat(product?.taxes?.gst);
                    }
                    if (!isNaN(parseFloat(product?.taxes?.hst))) {
                        totalTaxes.hst += parseFloat(product?.taxes?.hst);
                    }
                    if (!isNaN(parseFloat(product?.taxes?.pst))) {
                        totalTaxes.pst += parseFloat(product?.taxes?.pst);
                    }
                    console.log("total tax", totalTaxes)

                }
            });

            totalTaxes.gst = totalTaxes.gst.toFixed(2);
            totalTaxes.hst = totalTaxes.hst.toFixed(2);
            totalTaxes.pst = totalTaxes.pst.toFixed(2);
            return totalTaxes;
        }


        const totalPrice = updatedCartItems.reduce((acc, item) => acc + (item.withTaxPrice !== undefined ? item.withTaxPrice : item.totalPrice), 0);
        console.log("totalPrice", totalPrice)
        console.log("updatedCartItems", updatedCartItems)
        const totalTaxes = calculateTotalTaxes(updatedCartItems);
        console.log("totalTaxes", totalTaxes)
        dispatch(updateCartTotalTax(totalTaxes))
        // dispatch(updateCartSubTotal(totalPrice))
        dispatch(updateCartItems(updatedCartItems));
        setProvince(selectedProvince)

        dispatch(setSelectedProvince(selectedProvince))
        // setSubTotalWithCoupon(isApplyCoupon  ? totalPrice - isApplyCoupon?.couponDiscount : totalPrice);
        if (isApplyCoupon?.couponDiscount) {
            setSubTotalWithCoupon(isApplyCoupon ? totalPrice - isApplyCoupon?.couponDiscount : totalPrice);
            dispatch(cartOrderTotal(isApplyCoupon ? totalPrice - isApplyCoupon?.couponDiscount : totalPrice))
        } else {
            setSubTotalWithCoupon(totalPrice)
            dispatch(cartOrderTotal(totalPrice))

        }
    }, [shippingFormData?.state, subtotal])

    // function manageConditionWiseTax(){
    //     const selectedProvince = ProvinceTax.find(p => p.provinceName === shippingFormData?.state ? shippingFormData?.state : isProvinceSelected?.provinceName );
    //     const updatedCartItems = cartItems.map((item) => {
    //         if (item.is_tax_apply === 0) {
    //             const calculateTax = (taxRate) => {
    //                 if (selectedProvince && taxRate && !isNaN(taxRate) && taxRate !== 0) {
    //                     return getToFixed((taxRate / 100) * item.totalPrice);
    //                 } else {
    //                     return 0;
    //                 }
    //             };


    //             const subTotalPlusGst = calculateTax(selectedProvince?.gst);
    //             const subTotalPlusHst = calculateTax(selectedProvince?.hst);
    //             const subTotalPlusPst = calculateTax(selectedProvince?.pst);

    //             const withTaxPrice = parseFloat(item.totalPrice) +
    //                 parseFloat(subTotalPlusGst) +
    //                 parseFloat(subTotalPlusHst) +
    //                 parseFloat(subTotalPlusPst);

    //             return {
    //                 ...item,
    //                 taxes: {
    //                     gst: subTotalPlusGst,
    //                     hst: subTotalPlusHst,
    //                     pst: subTotalPlusPst
    //                 },
    //                 withTaxPrice: withTaxPrice
    //             };
    //         }
    //         return item;
    //     });
    //     function calculateTotalTaxes(products) {
    //         let totalTaxes = {
    //             gst: 0,
    //             hst: 0,
    //             pst: 0
    //         };

    //         products.map(product => {
    //             console.log("product", product)
    //             if (product.is_tax_apply === 0) {
    //                 if (!isNaN(parseFloat(product?.taxes?.gst))) {
    //                     totalTaxes.gst += parseFloat(product?.taxes?.gst);
    //                 }
    //                 if (!isNaN(parseFloat(product?.taxes?.hst))) {
    //                     totalTaxes.hst += parseFloat(product?.taxes?.hst);
    //                 }
    //                 if (!isNaN(parseFloat(product?.taxes?.pst))) {
    //                     totalTaxes.pst += parseFloat(product?.taxes?.pst);
    //                 }
    //                 console.log("total tax", totalTaxes)

    //             }
    //         });

    //         totalTaxes.gst = totalTaxes.gst.toFixed(2);
    //         totalTaxes.hst = totalTaxes.hst.toFixed(2);
    //         totalTaxes.pst = totalTaxes.pst.toFixed(2);
    //         return totalTaxes;
    //     }


    //     const totalPrice = updatedCartItems.reduce((acc, item) => acc + (item.withTaxPrice !== undefined ? item.withTaxPrice : item.totalPrice), 0);
    //    console.log("totalPrice",totalPrice)
    //     console.log("updatedCartItems", updatedCartItems)
    //     const totalTaxes = calculateTotalTaxes(updatedCartItems);
    //     console.log("totalTaxes", totalTaxes)
    //     dispatch(updateCartTotalTax(totalTaxes))
    //     // dispatch(updateCartSubTotal(totalPrice))
    //     dispatch(updateCartItems(updatedCartItems));
    //     setProvince(selectedProvince)

    //     dispatch(setSelectedProvince(selectedProvince))
    //     // setSubTotalWithCoupon(isApplyCoupon  ? totalPrice - isApplyCoupon?.couponDiscount : totalPrice);
    //     if(isApplyCoupon?.couponDiscount){
    //         setSubTotalWithCoupon(isApplyCoupon  ? totalPrice - isApplyCoupon?.couponDiscount : totalPrice);
    //         dispatch(cartOrderTotal(isApplyCoupon  ? totalPrice - isApplyCoupon?.couponDiscount : totalPrice))
    //     }else{
    //         setSubTotalWithCoupon(totalPrice)
    //         dispatch(cartOrderTotal(totalPrice))

    //     }
    // }
    const handleCouponClick = () => {
        setShowCouponInput(!showCouponInput);
    };

    const handleShippingChargeClick = () => {
        setShowShippingCharge(!showShippingCharge);
    };

    const handleShippingAddressClick = () => {
        setShowShippingAddress(!showShippingAddress);
    };

    const handleStripe = () => {
        setStripeShow(!stripeShow);
    };

    useEffect(() => {
        // const isMinimumAmountReached = (subTotalWithCoupon > checkCouponCode?.coupon_code?.minimum_amount);

        // const discount = isMinimumAmountReached
        //     ? checkCouponCode?.coupon_code?.calculation_type === "percentage" 
        //     ? (parseFloat(checkCouponCode?.coupon_code?.amount) / 100) * subTotalWithCoupon 
        //     : checkCouponCode?.coupon_code?.calculation_type === "fixed" 
        //     ? parseFloat(checkCouponCode?.coupon_code?.amount) : 0
        //     : 0;

        // const discountedTotal = parseFloat(subTotalWithCoupon) - discount;
        // // dispatch(updateCartSubTotal(discountedTotal));
        // console.log("discountedTotal", discountedTotal)
        // setSubTotalWithCoupon(discountedTotal);
        // console.log("Codupon Dis|", discount);
        // console.log("CheckCouponCode",checkCouponCode)
        // setCouponDiscount(discount)
        // dispatch(addCoupon({ couponCode: couponCode, couponDiscount: discount }));



    }, [checkCouponCode])

    function manageCoupon(data) {

        const isMinimumAmountReached = (subTotalWithCoupon > data?.coupon_code?.minimum_amount);

        const discount = isMinimumAmountReached
            ? data?.coupon_code?.calculation_type === "percentage"
                ? (parseFloat(data?.coupon_code?.amount) / 100) * subTotalWithCoupon
                : data?.coupon_code?.calculation_type === "fixed"
                    ? parseFloat(data?.coupon_code?.amount) : 0
            : 0;

        const discountedTotal = parseFloat(subTotalWithCoupon) - discount;
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


    const handleApplyCoupon = async () => {
        console.log("call")
        setCouponCode(couponCode)

        const payload = {
            coupon_code: couponCode,
            cart_amount: subTotalWithCoupon
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
            if (data?.is_coupon_code_valid === true) {

                setCheckCouponCode(data)
                console.log('Success:', data);
                setShowCouponInput(false)
                manageCoupon(data)
                notifySuccess(`Your Coupon "${couponCode}" apply successfull`);
            } else {
                notifyError(`Your Coupon "${couponCode}" is not apply`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        console.log('Coupon code applied:', couponCode);
    };
    const handleRemoveCoupon = () => {
        console.log("Remove Coupon")

    }

    const removeCoupon = () => {
        console.log(isApplyCoupon);
        setCouponCode('')
        dispatch(addCoupon({}));
        setSubTotalWithCoupon(subtotal)
    }

    const handleShippingOptionChange = (serviceName, basePrice) => {
        setSelectedShippingOption({ serviceName, basePrice });
    };

    const handleInput = (e, field) => {
        let value = e.target.value;

        if (field === 'cardNumber') {
            value = value.slice(0, 16);
        }

        if (field === 'cvc') {
            value = value.slice(0, 3);
        }

        if (field === 'expiry') {
            value = value.replace(/\D/g, '');

            if (value.length > 2) {
                const month = value.slice(0, 2);
                const year = value.slice(2);

                const validMonth = Math.min(Math.max(parseInt(month, 10), 1), 12);

                value = validMonth.toString().padStart(2, '0') + '/' + year;
            }
            value = value.slice(0, 5);
        }


        setCardDetail({
            ...cardDetail,
            [field]: value,
        });
    };

    const orderTotal = selectedShippingOption
        ? (parseFloat(subTotalWithCoupon?.toFixed(2)) + parseFloat(selectedShippingOption.basePrice))?.toFixed(2)
        : subTotalWithCoupon?.toFixed(2);



    const handleStripeData = async (token) => {
        if (token) {
            console.log('orderId---------------------------', orderId)
            try {
                const payload = {
                    token: token.id,
                    orderPrice: orderTotal,
                    stripe_data: token,
                    orderId: orderId
                }
                const response = await axios.post('https://backend.i-healthcare.ca/api/stripe-charge', payload);
                console.log('Response:', response.data);
                if (response?.data?.message === "Payment processed successfully") {
                    let submitobj = {
                        total_amount: orderTotal,
                        discount_price: couponDiscount?.toFixed(2),
                        shipping_price: selectedShippingOption.basePrice,
                        user_id: userID ? userID : null,
                        is_guest: !userID ? 1 : 0,
                        guest_user_id: userID ? "" : GuestData.guestUserId,
                        promo_code: "Promo Code",
                        percent_discount_applied: "20",
                        shipping_address: shippingFormData,
                        billing_address: isChecked ? shippingFormData : billingFormData,
                        product_data: [],
                        payment_data: {
                            "external_payment_id": "Stripe Payment Id",
                            "type": "Payment Method Type",
                            "payment_gateway_name": "Stripe",
                            "is_order_cod": "1",
                            "is_cod_paymend_received": "0",
                            "amount": subtotal,
                            "status": "SUCCESS"
                        },
                    };

                    for (let index = 0; index < cartItems.length; index++) {
                        let products = {
                            product_id: cartItems[index]?.id,
                            price: cartItems[index]?.price,
                            quantity: cartItems[index]?.purchaseQty,
                            use_product_original_data: 0
                        };
                        submitobj.product_data.push(products);
                    }
                    orderGenrate(submitobj)

                }
            } catch (error) {
                // Handle errors
                console.error('Error:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        console.log("Call")

        e.preventDefault();
        let updatedBillingFormData = {};
        if (isChecked) {
            updatedBillingFormData = { ...shippingFormData };
        }
        const isBillingFormValid = validateForm(isChecked ? updatedBillingFormData : billingFormData, "billingform Error");
        const isShippingFormValid = validateForm(shippingFormData, "shippingform Error");

        // If both forms are valid, proceed with submission
        if (isBillingFormValid && isShippingFormValid && validPostal === false) {
            console.log('Billing Form Data:', billingFormData);
            console.log('Shipping Form Data:', shippingFormData);
            let submitobj = {
                total_amount: orderTotal,
                discount_price: couponDiscount?.toFixed(2),
                shipping_price: selectedShippingOption?.basePrice,
                user_id: userID ? userID : null,
                is_guest: !userID ? 1 : 0,
                guest_user_id: userID ? "" : GuestData.guestUserId,
                promo_code: "Promo Code",
                percent_discount_applied: "20",
                shipping_address: shippingFormData,
                billing_address: isChecked ? updatedBillingFormData : billingFormData,
                product_data: [],
                payment_data: {
                    "external_payment_id": "Stripe Payment Id",
                    "type": "Payment Method Type",
                    "payment_gateway_name": "Stripe",
                    "is_order_cod": "1",
                    "is_cod_paymend_received": "0",
                    "amount": subtotal,
                    "status": "SUCCESS"
                },
            };

            for (let index = 0; index < cartItems.length; index++) {
                let products = {
                    product_id: cartItems[index]?.id,
                    price: cartItems[index]?.price,
                    quantity: cartItems[index]?.purchaseQty,
                    use_product_original_data: 0
                };
                if (cartItems[index]?.variants) {
                    products['variants'] = cartItems[index]?.variants
                }
                submitobj.product_data.push(products);
            }
            console.log("Submit Obj", submitobj)
            if (stripeDetailsRef.current) {
                await stripeDetailsRef.current.handleButtonClick(handleStripeData);
                orderGenrate(submitobj)

            } else {
                console.error('StripeDetails component not properly initialized');
            }


        } else {
            console.log('Form validation failed');
        }
    };
    console.log(isApplyCoupon)
    if (loading) {
        return <SpinnerLoading loading={loading} />
    }
    return (
        <>
            <Header />
            <div className="container mt-5">
                <div>
                    {/* <Toast /> */}
                    <div className="row">

                        <div className="col-md-12 col-lg-8">
                            <div className="mt-3" style={{ border: '1px solid #ccc', }}>
                                <div style={{ backgroundColor: 'lightgray' }}>
                                    <div
                                        className=''
                                        // onClick={() => setOpen(!open)}
                                        onClick={handleShippingAddressClick}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={showShippingAddress}
                                    >
                                        <div className="d-flex justify-content-between">
                                            <div style={{ padding: 15 }}>
                                                <h4 className="tab-title pointer-on-hover font-weight-normal">Shipping Details</h4>
                                            </div>
                                            <div style={{ padding: 15 }}>{showShippingAddress ? <i className="fas fa-angle-up pointer-on-hover"></i> : <i className="fas fa-angle-down pointer-on-hover"></i>}</div>

                                        </div>
                                    </div>
                                </div>
                                <Collapse in={showShippingAddress} >
                                    <div className='' id="example-collapse-text" >
                                        <div className="container p-3">
                                            <div>
                                                <h4 className="tab-title pointer-on-hover font-weight-normal">Shipping Details</h4>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-row mt-3">
                                                        <div className="form-group col-md-6">
                                                            <InputComponent
                                                                type="text"
                                                                id="first_name"
                                                                label="First Name *"
                                                                customClass={`form-control gray-bg ${shippingFormErrors.first_name ? 'validation-error-border' : ''}`}
                                                                value={shippingFormData?.first_name}
                                                                onChange={(e) => handleInputChange(shippingFormData, setShippingFormData, 'first_name', e.target.value, "shippingform Error")}
                                                                placeholder=""
                                                                required={true}


                                                            />
                                                            {shippingFormErrors.first_name && <div className="validation-error">{shippingFormErrors.first_name}</div>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <InputComponent
                                                                type="text"
                                                                id="last_name"
                                                                label="Last Name *"
                                                                customClass={`form-control gray-bg ${shippingFormErrors.last_name ? 'validation-error-border' : ''}`}
                                                                value={shippingFormData?.last_name}
                                                                onChange={(e) => handleInputChange(shippingFormData, setShippingFormData, 'last_name', e.target.value, "shippingform Error")}
                                                                placeholder=""
                                                                required
                                                            />
                                                            {shippingFormErrors.last_name && <div className="validation-error">{shippingFormErrors.last_name}</div>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <InputComponent
                                                                type="text"
                                                                id="contact_no"
                                                                label="Phone *"
                                                                customClass={`form-control gray-bg ${shippingFormErrors.contact_no ? 'validation-error-border' : ''}`}
                                                                value={shippingFormData?.contact_no}
                                                                onChange={(e) => handleInputChange(shippingFormData, setShippingFormData, 'contact_no', e.target.value, "shippingform Error")}
                                                                placeholder=""
                                                                required
                                                            />
                                                            {shippingFormErrors.contact_no && <div className="validation-error">{shippingFormErrors.contact_no}</div>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <InputComponent
                                                                type="text"
                                                                id="email"
                                                                label="Email Address *"
                                                                customClass={`form-control gray-bg ${shippingFormErrors.email ? 'validation-error-border' : ''}`}
                                                                value={shippingFormData?.email}
                                                                onChange={(e) => handleInputChange(shippingFormData, setShippingFormData, 'email', e.target.value, "shippingform Error")}
                                                                placeholder=""
                                                                required
                                                            />
                                                            {shippingFormErrors.email && <div className="validation-error">{shippingFormErrors.email}</div>}
                                                        </div>
                                                        <div className="form-group col-md-12">
                                                            <InputComponent
                                                                type="text"
                                                                id="street_address"
                                                                label="Street address *"
                                                                customClass={`form-control gray-bg ${shippingFormErrors.street_address ? 'validation-error-border' : ''}`}
                                                                value={shippingFormData?.street_address}
                                                                onChange={(e) => handleInputChange(shippingFormData, setShippingFormData, 'street_address', e.target.value, "shippingform Error")}
                                                                placeholder=""
                                                                required
                                                            />
                                                            {shippingFormErrors.street_address && <div className="validation-error">{shippingFormErrors.street_address}</div>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <InputComponent
                                                                type="text"
                                                                id="city"
                                                                label="Town / City *"
                                                                customClass={`form-control gray-bg ${shippingFormErrors.city ? 'validation-error-border' : ''}`}
                                                                value={shippingFormData?.city}
                                                                onChange={(e) => handleInputChange(shippingFormData, setShippingFormData, 'city', e.target.value, "shippingform Error")}
                                                                placeholder=""
                                                                required
                                                            />
                                                            {shippingFormErrors.city && <div className="validation-error">{shippingFormErrors.city}</div>}
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <div className='mb-3'>
                                                                <label htmlFor="last_name">Province</label>
                                                                <RegionDropdown
                                                                    defaultOptionLabel={'Select Province'}
                                                                    className={`country-Dropdown gray-bg ${shippingFormErrors.state ? 'validation-error-border' : ''}`}
                                                                    country={'CA'}
                                                                    countryValueType={'short'}
                                                                    value={shippingFormData.state}
                                                                    onChange={(e) => handleInputChange(shippingFormData, setShippingFormData, 'state', e, "shippingform Error")}
                                                                />
                                                                {shippingFormErrors.state && <div className="validation-error">{shippingFormErrors.state}</div>}
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <InputComponent
                                                                type="text"
                                                                id="zipcode"
                                                                label="Postal Code *"
                                                                customClass={`form-control gray-bg ${shippingFormErrors.zipcode ? 'validation-error-border' : ''}`}
                                                                value={shippingFormData?.zipcode}
                                                                onChange={(e) => handleInputChange(shippingFormData, setShippingFormData, 'zipcode', e.target.value, "shippingform Error")}
                                                                placeholder=""
                                                                required
                                                            />
                                                            {shippingFormErrors.zipcode && <div className="validation-error">{shippingFormErrors.zipcode}</div>}
                                                            {validPostal === true && <div className="validation-error">Please Enter valid Postal Code</div>}
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                            <div className="form-group">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <span className="ml-2">Billing address is the same as Shipping address.</span>
                                                </label>
                                            </div>
                                            {!isChecked ? (
                                                <div>
                                                    <h2>Billing Details</h2>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="form-row mt-3">
                                                            <div className="form-group col-md-6">
                                                                <InputComponent
                                                                    type="text"
                                                                    id="first_name"
                                                                    label="First Name *"
                                                                    customClass={`form-control gray-bg ${billingFormErrors.first_name ? 'validation-error-border' : ''}`}
                                                                    value={billingFormData?.first_name}
                                                                    onChange={(e) => handleInputChange(billingFormData, setBillingFormData, 'first_name', e.target.value, "billingform Error")}
                                                                    placeholder=""
                                                                    required
                                                                    isdisabled={isChecked}
                                                                />
                                                                {billingFormErrors.first_name && <div className="validation-error">{billingFormErrors.first_name}</div>}
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <InputComponent
                                                                    type="text"
                                                                    id="last_name"
                                                                    label="Last Name *"
                                                                    customClass={`form-control gray-bg ${billingFormErrors.last_name ? 'validation-error-border' : ''}`}
                                                                    value={billingFormData?.last_name}
                                                                    onChange={(e) => handleInputChange(billingFormData, setBillingFormData, 'last_name', e.target.value, "billingform Error")}
                                                                    placeholder=""
                                                                    required
                                                                    isdisabled={isChecked}
                                                                />
                                                                {billingFormErrors.last_name && <div className="validation-error">{billingFormErrors.last_name}</div>}
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <InputComponent
                                                                    type="text"
                                                                    id="contact_no"
                                                                    label="Phone *"
                                                                    customClass={`form-control gray-bg ${billingFormErrors.contact_no ? 'validation-error-border' : ''}`}
                                                                    value={billingFormData?.contact_no}
                                                                    onChange={(e) => handleInputChange(billingFormData, setBillingFormData, 'contact_no', e.target.value, "billingform Error")}
                                                                    placeholder=""
                                                                    required
                                                                    isdisabled={isChecked}
                                                                />
                                                                {billingFormErrors.contact_no && <div className="validation-error">{billingFormErrors.contact_no}</div>}
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <InputComponent
                                                                    type="text"
                                                                    id="email"
                                                                    label="Email Address *"
                                                                    customClass={`form-control gray-bg ${billingFormErrors.email ? 'validation-error-border' : ''}`}
                                                                    value={billingFormData?.email}
                                                                    onChange={(e) => handleInputChange(billingFormData, setBillingFormData, 'email', e.target.value, "billingform Error")}
                                                                    placeholder=""
                                                                    required
                                                                    isdisabled={isChecked}
                                                                />
                                                                {billingFormErrors.email && <div className="validation-error">{billingFormErrors.email}</div>}
                                                            </div>
                                                            <div className="form-group col-md-12">
                                                                <InputComponent
                                                                    type="text"
                                                                    id="street_address"
                                                                    label="Street address *"
                                                                    customClass={`form-control gray-bg ${billingFormErrors.street_address ? 'validation-error-border' : ''}`}
                                                                    value={billingFormData?.street_address}
                                                                    onChange={(e) => handleInputChange(billingFormData, setBillingFormData, 'street_address', e.target.value, "billingform Error")}
                                                                    placeholder=""
                                                                    required
                                                                    isdisabled={isChecked}
                                                                />
                                                                {billingFormErrors.street_address && <div className="validation-error">{billingFormErrors.street_address}</div>}
                                                            </div>
                                                            <div className="form-group col-md-6">
                                                                <InputComponent
                                                                    type="text"
                                                                    id="city"
                                                                    label="Town / City *"
                                                                    customClass={`form-control gray-bg ${billingFormErrors.city ? 'validation-error-border' : ''}`}
                                                                    value={billingFormData?.city}
                                                                    onChange={(e) => handleInputChange(billingFormData, setBillingFormData, 'city', e.target.value, "billingform Error")}
                                                                    placeholder=""
                                                                    required
                                                                    isdisabled={isChecked}
                                                                />
                                                                {billingFormErrors.city && <div className="validation-error">{billingFormErrors.city}</div>}
                                                            </div>
                                                            <div className="form-group col-md-3">
                                                                <div className='mb-3'>
                                                                    <label htmlFor="last_name">Province</label>
                                                                    <RegionDropdown
                                                                        defaultOptionLabel={'Select state'}
                                                                        className={`country-Dropdown gray-bg ${billingFormErrors.state ? 'validation-error-border' : ''}`}
                                                                        country={'CA'}
                                                                        countryValueType={'short'}
                                                                        value={billingFormData.state}
                                                                        onChange={(e) => handleInputChange(billingFormData, setBillingFormData, 'state', e, "billingform Error")}
                                                                        isdisabled={isChecked}
                                                                    />
                                                                    {billingFormErrors.state && <div className="validation-error">{billingFormErrors.state}</div>}
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-md-3">
                                                                <InputComponent
                                                                    type="text"
                                                                    id="zipcode"
                                                                    label="Postal Code *"
                                                                    customClass={`form-control gray-bg ${billingFormErrors.zipcode ? 'validation-error-border' : ''}`}
                                                                    value={billingFormData?.zipcode}
                                                                    onChange={(e) => handleInputChange(billingFormData, setBillingFormData, 'zipcode', e.target.value, "billingform Error")}
                                                                    placeholder=""
                                                                    required
                                                                    isdisabled={isChecked}
                                                                />
                                                                {billingFormErrors.zipcode && <div className="validation-error">{billingFormErrors.zipcode}</div>}
                                                            </div>

                                                        </div>

                                                    </form>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className='mt-3'>{shippingRate  && 
                                <p style={{ textAlign: 'left',color:'black' }}>
                                    You have multiple shipping options
                                </p>}
                            </div>
                            <div className="mt-1 mb-3" style={{ border: '1px solid #ccc', }}>
                                <div style={{ backgroundColor: 'lightgray' }}>
                                    <div
                                        className=''
                                        // onClick={() => setOpen(!open)}
                                        onClick={handleShippingChargeClick}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={showShippingCharge}
                                    >
                                        <div className="d-flex justify-content-between">
                                            <div style={{ padding: 15 }}>
                                                <h4 className="tab-title pointer-on-hover font-weight-normal">Shipping Charges</h4></div>
                                            <div style={{ padding: 15 }}>{showShippingCharge ? <i className="fas fa-angle-up pointer-on-hover"></i> : <i className="fas fa-angle-down pointer-on-hover"></i>}</div>

                                        </div>

                                    </div>
                                </div>
                                <Collapse in={showShippingCharge} >
                                    <div className='' id="example-collapse-text" >
                                        {shippingRate && shippingRate.length !== 0 && <div className="container p-3">
                                            <div className="coupon-section">
                                                {shippingRate && shippingRate.map((service, index) => (
                                                    <React.Fragment key={index} >
                                                        <div className="d-flex justify-content-between mt-2">
                                                            <div className="">
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name="shippingOption"
                                                                        value={service.serviceName}
                                                                        checked={
                                                                            selectedShippingOption &&
                                                                            selectedShippingOption.serviceName === service.serviceName
                                                                        }
                                                                        onChange={() =>
                                                                            handleShippingOptionChange(
                                                                                service.serviceName,
                                                                                service.basePrice.toFixed(2)
                                                                            )
                                                                        }
                                                                    />
                                                                    <span className="ml-2">{service.serviceName}</span>
                                                                </label>
                                                            </div>
                                                            <div className="">
                                                                ${service.basePrice.toFixed(2)}
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>}
                                    </div>
                                </Collapse>
                            </div>
                            <div className="mt-3 mb-5" style={{ border: '1px solid #ccc', }}>
                                <div style={{ backgroundColor: 'lightgray' }}>
                                    <div
                                        className=''
                                        // onClick={() => setOpen(!open)}
                                        onClick={handleStripe}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={stripeShow}
                                    >
                                        <div className="d-flex justify-content-between">
                                            <div style={{ padding: 15 }}>
                                                <h4 className="tab-title pointer-on-hover font-weight-normal">Card Details</h4></div>
                                            <div style={{ padding: 15 }}>{stripeShow ? <i className="fas fa-angle-up pointer-on-hover"></i> : <i className="fas fa-angle-down pointer-on-hover"></i>}</div>

                                        </div>

                                    </div>
                                </div>
                                <Collapse in={stripeShow} >
                                    <div className='' id="example-collapse-text" >
                                        <div className="container p-3">
                                            <Elements stripe={stripePromise}>
                                                <StripeDetails ref={stripeDetailsRef} orderData={orderData} />
                                            </Elements>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>

                        </div>

                        <div className="col-md-12 col-lg-4">

                            <div className="text-center">
                                <h5 className="bold title d-inline">Order Summary</h5>
                            </div>
                            <div className="mt-5">
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="mr-auto tab-title font-weight-normal">Subtotal</div>
                                    <div className='ml-5 tab-title font-weight-normal'>
                                        <span >${subtotal?.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="mr-auto tab-title font-weight-normal">Shipping</div>
                                    <div>
                                        <span className="ml-5">{shipping ? shipping : "-----------"}</span>
                                    </div>
                                </div>

                                <>
                                    {parseFloat(cartTotalTax?.gst) !== 0 &&
                                        <div className="d-flex justify-content-between mt-2">
                                            <div className="mr-auto tab-title font-weight-normal">GST {`(${province?.gst}%)`}</div>
                                            <div className='ml-5 tab-title font-weight-normal'>+ ${cartTotalTax?.gst}</div>
                                        </div>
                                    }
                                    {parseFloat(cartTotalTax?.pst) !== 0 &&
                                        <div className="d-flex justify-content-between mt-2">
                                            <div className="mr-auto tab-title font-weight-normal">PST {`(${province?.pst}%)`}</div>
                                            <div className='ml-5 tab-title font-weight-normal'>+ ${cartTotalTax?.pst}</div>
                                        </div>
                                    }
                                    {parseFloat(cartTotalTax?.hst) !== 0 &&
                                        <div className="d-flex justify-content-between mt-2s">
                                            <div className="mr-auto tab-title font-weight-normal">HST {`(${province?.hst}%)`}</div>
                                            <div className='ml-5 tab-title font-weight-normal'>+ ${cartTotalTax?.hst}</div>
                                        </div>
                                    }
                                </>

                                {selectedShippingOption &&
                                    <div className="d-flex justify-content-between mt-2">
                                        <div className='mr-auto tab-title text-left font-weight-normal mr-2'>Shipping charge <br></br> ({selectedShippingOption.serviceName})</div>
                                        <div className='ml-5  tab-title font-weight-normal'>+ ${selectedShippingOption.basePrice}</div>
                                    </div>
                                }
                                {isApplyCoupon?.couponCode && couponDiscount > 0 &&
                                    <div className="d-flex  mt-2">
                                        <div className='mr-auto tab-title text-left font-weight-normal'>{`Coupon Discount 
                                                    ${isApplyCoupon?.calculation_type === 'percentage' ? `(${isApplyCoupon?.amount}%)` : `(${isApplyCoupon?.amount} CAD)`} `}</div>
                                        <div className=' tab-title font-weight-normal'>- ${isApplyCoupon?.couponDiscount?.toFixed(2)}</div>
                                    </div>
                                }
                                <hr></hr>
                                <div className="d-flex justify-content-between m2 mb-2">
                                    <div className=''>
                                        <h4 className="tab-title pointer-on-hover ">Order Total</h4>
                                    </div>
                                    <div className='h4'>${orderTotal}</div>
                                </div>


                            </div>

                            <div className="mb-3" style={{ border: '1px solid #ccc', }}>
                                <div style={{ backgroundColor: 'lightgray' }}>
                                    <div
                                        className=''
                                        // onClick={() => setOpen(!open)}
                                        onClick={handleCouponClick}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={showCouponInput}
                                    >
                                        <div className="d-flex justify-content-between">
                                            <div style={{ color: 'black', padding: 15 }}>
                                                <h4 className="tab-title pointer-on-hover font-weight-normal">Apply Coupon</h4></div>
                                            <div style={{ padding: 15 }}>{showCouponInput ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}</div>

                                        </div>

                                    </div>
                                </div>
                                <Collapse in={showCouponInput} >
                                    <div className='' id="example-collapse-text" >
                                        <div className="container p-3">
                                            <div className="coupon-section">
                                                {!isApplyCoupon?.couponCode ? (
                                                    <div className="d-flex justify-content-between ">
                                                        <div className=''>
                                                            <InputComponent
                                                                type="text"
                                                                id="coupon"
                                                                label=""
                                                                customClass={`form-control gray-bg  ml-auto `} //cart-checkout-btn
                                                                value={couponCode}
                                                                onChange={(e) => setCouponCode(e.target.value)}
                                                                placeholder="Enter your coupon code"
                                                                required
                                                            />
                                                        </div>
                                                        <div className=''>
                                                            <ButtonComponent cssClass="shopping-btn p-3 fontSize14" onClick={handleApplyCoupon} label="Apply Coupon" disabled={!couponCode} />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="row justify-content-center align-items-center">
                                                        <div className="col-auto text-center">
                                                            <p className="fs-4 text-success d-flex align-items-center justify-content-center">
                                                                <FontAwesomeIcon icon={faCheck} fontSize={20} className="mr-2" />
                                                                Coupon applied!
                                                            </p>
                                                        </div>
                                                        <div className="col-auto">
                                                            <div className="d-inline-flex align-items-center coupon-container pointer-on-hover">
                                                                {isApplyCoupon?.couponCode}
                                                                <span className='ml-2 d-flex align-items-center' onClick={removeCoupon}>
                                                                    <FontAwesomeIcon icon={faXmark} fontSize={20} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>


                            <div style={{ border: '1px solid #ccc', }}>
                                <div style={{ backgroundColor: 'lightgray' }}>
                                    <div
                                        className=''
                                        onClick={() => setOpen(!open)}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={open}
                                    >
                                        <div className="d-flex justify-content-between ">
                                            <div style={{ color: 'black', padding: 15 }}>
                                                <h4 className="tab-title pointer-on-hover font-weight-normal">Items in order ({cartItems?.length})</h4></div>
                                            <div style={{ padding: 15 }}>{open ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}</div>

                                        </div>

                                    </div>
                                </div>
                                <Collapse in={open} >
                                    <div className='' id="example-collapse-text" >
                                        <div className="container">
                                            {cartItems.map((item, index) => (
                                                <div className="row p-2 mt-3" key={index} >
                                                    <div className="col-md-3">
                                                        <div className="">
                                                            <ImageComponent src={item?.image[0]?.name} width={true} alt="Product Image" classAtribute="cart-products w-auto" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="text-left text-sm-centerd fs-6">
                                                            {truncateString(item?.name, 50)}
                                                            <FontAwesomeIcon icon={faTimes} fontSize={16} className="ml-2 mr-2" />
                                                            <span className='fs-6 font-bold'>{item?.purchaseQty}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className='fs-6 font-bold'> ${item?.totalPrice}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Collapse>

                            </div>

                            <div className='row'>
                                <div className='text-right'>
                                    {/* <h6>Congrats, you'r eligible for Free <i className="fas fa-truck"></i> <br />Shipping</h6>
                            <p className='mt-3'>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a className="ml-1" href='#'>privacy policy</a></p> */}
                                    {/* <button class="checkout-button mt-4" onClick={handleSubmit}>Place Order</button> */}
                                    <div className="red_button product-add_to_cart_button mt-3 " onClick={handleSubmit}>
                                        Place Order
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className='pb-2'>
                    <FooterComponents />
                </div>
            </div>
        </>

    );
};

export default CheckoutPage;
