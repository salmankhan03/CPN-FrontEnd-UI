import React, { useEffect, useState } from 'react';
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
import { notifyError, notifySuccess , Toast} from '../../components/ToastComponents/ToastComponents';


const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [islogin, setIsLogin] = useState(true)
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const subtotal = useSelector(state => state.CartReducer.cartSubTotal);
    const cartTotalTax = useSelector(state => state.CartReducer.cartTotalTax);
    const isApplayCoupon = useSelector(state => state.CartReducer.coupon)
    const isProvinceSelected = useSelector(state => state.CartReducer.province)

    const CouponDetails = useSelector(state => state.CartReducer.coupon)
    const AuthData = useSelector(state => state.AuthReducer.userData);
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
    const [couponDiscount, setCouponDiscount] = useState(isApplayCoupon ? isApplayCoupon?.couponDiscount : 0)
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
        first_name: AuthData ? AuthData.first_name :'',
        last_name: AuthData ? AuthData?.last_name:'',
        country: 'CA',
        street_address: AuthData ? AuthData?.street_address:'',
        city: AuthData ? AuthData?.city:'',
        state: AuthData ? AuthData?.state:'',
        zipcode:  AuthData ? AuthData?.zipcode:'',
        contact_no: AuthData ? AuthData?.contact_no: '',
        email: AuthData ? AuthData?.email:'',
    });

    const userProperties = {
        username: 'f89d8930468d9b94',
        password: '2100e015132b09d589da39',
        customerNumber: '1234567890',
        contractNumber: '1234567890',
    };

    useEffect(() => {
       if(shippingFormData.zipcode && shippingFormData.zipcode.length > 5) {
           const originPostalCode = 'V6X2T4';
           const destinationPostalCode = shippingFormData.zipcode || 'M5A1A1';
           const weight = 1;

           const xmlRequest = `<?xml version="1.0" encoding="UTF-8"?>
          <mailing-scenario xmlns="http://www.canadapost.ca/ws/ship/rate-v4">
            <parcel-characteristics>
              <weight>${weight}</weight>
            </parcel-characteristics>
            <origin-postal-code>${originPostalCode}</origin-postal-code>
            <destination>
              <domestic>
                <postal-code>${destinationPostalCode}</postal-code>
              </domestic>
            </destination>
            <quote-type>counter</quote-type>
          </mailing-scenario>`;



           const requestOptions = {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/vnd.cpc.ship.rate-v4+xml',
                   'Accept': 'application/vnd.cpc.ship.rate-v4+xml',
                   'Authorization': 'Basic ' + btoa(`${userProperties.username}:${userProperties.password}`)
               },
               body: xmlRequest
           };

           fetch('https://ct.soa-gw.canadapost.ca/rs/ship/price', requestOptions)
               .then(response => response.text())
               .then(responseText => {
                   const parser = new DOMParser();
                   const xmlDoc = parser.parseFromString(responseText, 'text/xml');

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

               })
               .catch(error => {
                   console.error('Fetch error:', error.message);
               });
       }
    }, [shippingFormData?.zipcode]);

    useEffect(() => {
        // console.log("AuthData",AuthData)
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
        }
        if(isProvinceSelected?.provinceName){
            setShippingFormData({
                ...shippingFormData,
                ['state']: isProvinceSelected?.provinceName,
            })
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
            if(field === "state"){
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
        console.log(formData)
        if (formData?.first_name?.trim() === '' || formData?.first_name === null) {
            errors.first_name = 'First name is required';
        }

        if (formData.last_name?.trim() === '' || formData?.last_name === null) {
            errors.last_name = 'Last name is required';
        }

        if (formData.country?.trim() === '' || formData?.country === null) {
            errors.country = 'Country is required';
        }

        if (formData.street_address?.trim() === '' || formData?.street_address === null) {
            errors.street_address = 'Street address is required';
        }

        if (formData.city?.trim() === '' || formData?.city === null) {
            errors.city = 'City is required';
        }

        if (formData.state?.trim() === '') {
            errors.state = 'State is required';
        }

        if (formData.zipcode?.trim() === '' || formData?.zipcode === null) {
            errors.zipcode = 'ZIP Code is required';
        }

        if (formData.contact_no?.trim() === '' || formData?.contact_no === null) {
            errors.contact_no = 'Phone number is required';
        }

        if (formData.email?.trim() === '' || formData?.email === null) {
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

    function orderGenrate(orderData) {
        console.log(orderData)
        OrderServices.generateOrders(orderData).then((resp) => {
            if (resp?.status_code === 200) {

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


    const handleSubmit = (e) => {
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
                total_amount: subtotal,
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
                submitobj.product_data.push(products);
            }

            dispatch(removeAllCartItems([]));
            dispatch(addCoupon({ }));
            dispatch(removeAllCartItems([]));

            orderGenrate(submitobj)


        } else {
            console.log('Form validation failed');
        }
    };

    const getToFixed = (a) => {
        return a.toFixed(2);
    }

    useEffect(() => {

        // Manage condition wise Tax
        const selectedProvince = ProvinceTax.find(p => p.provinceName === shippingFormData.state);
        console.log("selectedProvince", selectedProvince)
        console.log("selectedProvince", shippingFormData.state)

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
       console.log("totalPrice",totalPrice)
        console.log("updatedCartItems", updatedCartItems)
        const totalTaxes = calculateTotalTaxes(updatedCartItems);
        console.log("totalTaxes", totalTaxes)
        dispatch(updateCartTotalTax(totalTaxes))
        // dispatch(updateCartSubTotal(totalPrice))
        dispatch(updateCartItems(updatedCartItems));
        setProvince(selectedProvince)
        
        dispatch(setSelectedProvince(selectedProvince))
        // setSubTotalWithCoupon(isApplayCoupon  ? totalPrice - isApplayCoupon?.couponDiscount : totalPrice);
        if(isApplayCoupon?.couponDiscount){
            setSubTotalWithCoupon(isApplayCoupon  ? totalPrice - isApplayCoupon?.couponDiscount : totalPrice);
            dispatch(cartOrderTotal(isApplayCoupon  ? totalPrice - isApplayCoupon?.couponDiscount : totalPrice))
        }else{
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
    //     // setSubTotalWithCoupon(isApplayCoupon  ? totalPrice - isApplayCoupon?.couponDiscount : totalPrice);
    //     if(isApplayCoupon?.couponDiscount){
    //         setSubTotalWithCoupon(isApplayCoupon  ? totalPrice - isApplayCoupon?.couponDiscount : totalPrice);
    //         dispatch(cartOrderTotal(isApplayCoupon  ? totalPrice - isApplayCoupon?.couponDiscount : totalPrice))
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

    function manageCoupon(data){

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
        console.log("data",data)
        setCouponDiscount(discount)
        dispatch(addCoupon({ couponCode: couponCode, couponDiscount: discount }));
        
    }


    const handleApplyCoupon = async () => {
        console.log("call")
        setCouponCode(couponCode)

        const payload = {
            coupon_code: couponCode,
            cart_amount: subTotalWithCoupon
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
            if (data?.is_coupon_code_valid === true) {

                setCheckCouponCode(data)
                console.log('Success:', data);
                setShowCouponInput(false)
                manageCoupon(data)
                notifySuccess(`Your Coupon "${couponCode}" applay successfull`);
            }else{
                notifyError(`Your Coupon "${couponCode}" is not applay`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        console.log('Coupon code applied:', couponCode);
    };
    const handleRemoveCoupon = () => {
        console.log("Remove Coupen")

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
        setSubTotalWithCoupon(updatedCartSubTotals - JSON.parse(updatedItem.price));

    };

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

    return (
        <div className="container mt-5">
            <div>
            <Toast />
            <div className="row ">

                <div className="col-md-8">
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
                                    <div style={{ color: 'black', padding: 15 }}>Shipping Details</div>
                                    <div style={{ padding: 15 }}>{showShippingAddress ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}</div>

                                </div>
                            </div>
                        </div>
                        <Collapse in={showShippingAddress} >
                            <div className='' id="example-collapse-text" >
                                <div className="container p-3">
                                    <div>
                                        <h2>Shipping Details</h2>
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
                                    <div>
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

                    <div className="mt-3 mb-3" style={{ border: '1px solid #ccc', }}>
                        <div style={{ backgroundColor: 'lightgray' }}>
                            <div
                                className=''
                                // onClick={() => setOpen(!open)}
                                onClick={handleShippingChargeClick}
                                aria-controls="example-collapse-text"
                                aria-expanded={showShippingCharge}
                            >
                                <div className="d-flex justify-content-between">
                                    <div style={{ color: 'black', padding: 15 }}>Shipping Charges</div>
                                    <div style={{ padding: 15 }}>{showShippingCharge ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}</div>

                                </div>

                            </div>
                        </div>
                        <Collapse in={showShippingCharge} >
                            <div className='' id="example-collapse-text" >
                                {shippingRate && shippingRate.length !== 0 && <div className="container p-3">
                                    <div className="coupon-section">
                                        {shippingRate && shippingRate.map((service, index) => (
                                            <React.Fragment key={index} style={{ display: 'flex' }}>
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
                                    <div style={{ color: 'black', padding: 15 }}>Card Details</div>
                                    <div style={{ padding: 15 }}>{stripeShow ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}</div>

                                </div>

                            </div>
                        </div>
                        <Collapse in={stripeShow} >
                            <div className='' id="example-collapse-text" >
                                <div className="container p-3">
                                    <div className="coupon-section">
                                        <div className=''>
                                            <InputComponent
                                                type="number"
                                                id="cardNumber"
                                                label="Card Number"
                                                customClass={`form-control gray-bg  ml-auto `} //cart-checkout-btn
                                                value={cardDetail.cardNumber}
                                                onChange={(e) => handleInput(e, 'cardNumber')}
                                                placeholder="Enter your coupon code"
                                                required
                                            />
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <InputComponent
                                                    type="text"
                                                    id="expiry"
                                                    label="Card Number"
                                                    customClass={`form-control gray-bg  ml-auto `} //cart-checkout-btn
                                                    value={cardDetail.expiry}
                                                    onChange={(e) => handleInput(e, 'expiry')}
                                                    placeholder="Enter your coupon code"
                                                    maxLength={5}
                                                    pattern="\d{2}/\d{2}"
                                                    required
                                                />
                                            </div>

                                            <div className='col-md-6'>
                                                <InputComponent
                                                    type="number"
                                                    id="cvc"
                                                    label="Card Number"
                                                    customClass={`form-control gray-bg  ml-auto `} //cart-checkout-btn
                                                    value={cardDetail.cvc}
                                                    onChange={(e) => handleInput(e, 'cvc')}
                                                    placeholder="Enter your coupon code"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>

                </div>

                <div className="col-md-4">

                    <div className="text-center">
                        <h3 className='tex'>Order Summary</h3>
                    </div>
                    <div className="mt-5">
                        <div className="d-flex justify-content-between mt-2">
                            <div className="mr-auto">Subtotal</div>
                            <div>
                                <span >${subtotal?.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <div className="mr-auto">Shipping</div>
                            <div>
                                <span className="ml-5">{shipping ? shipping : "----"}</span>
                            </div>
                        </div>

                        <>
                            {parseFloat(cartTotalTax?.gst) !== 0 &&
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="mr-auto">GST {`(${province?.gst}%)`}</div>
                                    <div className='ml-5'>${cartTotalTax?.gst}</div>
                                </div>
                            }
                            {parseFloat(cartTotalTax?.pst) !== 0 &&
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="mr-auto">PST {`(${province?.pst}%)`}</div>
                                    <div className='ml-5'>${cartTotalTax?.pst}</div>
                                </div>
                            }
                            {parseFloat(cartTotalTax?.hst) !== 0 &&
                                <div className="d-flex justify-content-between mt-2s">
                                    <div className="mr-auto">HST {`(${province?.hst}%)`}</div>
                                    <div className='ml-5'>${cartTotalTax?.hst}</div>
                                </div>
                            }
                        </>
                        {couponDiscount > 0 &&
                            <div className="d-flex justify-content-between mt-2">
                                <div>{`Coupon Discount ${checkCouponCode?.coupon_code.calculation_type === 'percentage' ? `(${checkCouponCode?.coupon_code.amount}%)` : `(${checkCouponCode?.coupon_code.amount} CAD)`} :`}</div>
                                <div>- ${couponDiscount}</div>
                                {/* <p className='mt-1'>{`Coupon Discount ${checkCouponCode?.coupon_code.calculation_type === 'percentage' ? `(${checkCouponCode?.coupon_code.amount}%)` : `(${checkCouponCode?.coupon_code.amount} CAD)`} :`} <span className='ml-5'>{couponDiscount}</span></p> */}
                            </div>
                        }
                        <hr></hr>
                        <div className="d-flex justify-content-between m2 mb-2">
                            <div className='h4'>Order Total</div>
                            <div className='h4'>${subTotalWithCoupon?.toFixed(2)}</div>
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
                                    <div style={{ color: 'black', padding: 15 }}>Applay Coupen</div>
                                    <div style={{ padding: 15 }}>{showCouponInput ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}</div>

                                </div>

                            </div>
                        </div>
                        <Collapse in={showCouponInput} >
                            <div className='' id="example-collapse-text" >
                                <div className="container p-3">
                                    <div className="coupon-section">
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
                                                <button
                                                    style={{ padding: 5, width: 80, backgroundColor: 'black', borderRadius: 10, color: 'white' }}
                                                    className={`${couponDiscount > 0 ? 'disabled' : ''}`}
                                                    disabled={couponDiscount > 0}
                                                    onClick={handleApplyCoupon}
                                                >
                                                    {"Apply"}
                                                </button>
                                            </div>
                                        </div>

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
                                    <div style={{ color: 'black', padding: 15 }}>Items in order ({cartItems?.length})</div>
                                    <div style={{ padding: 15 }}>{open ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}</div>

                                </div>

                            </div>
                        </div>
                        <Collapse in={open} >
                            <div className='' id="example-collapse-text" >
                                <div className="container">
                                    {cartItems.map((item, index) => (
                                        <div className="row p-2 mt-3">
                                            <div className="col-md-3">
                                                <div className="">
                                                    <ImageComponent src={item?.image[0]?.name}  width={true} alt="Product Image" classAtribute="cart-products" />
                                                </div>
                                            </div>
                                            <div className="col-md-7">
                                                <div className="">{truncateString(item?.name, 30)}</div>
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
                                            </div>
                                            <div className="col-md-2">
                                                <div className=""> ${item?.totalPrice}</div>
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
                            <button class="checkout-button mt-4" onClick={handleSubmit}>Place Order</button>
                        </div>
                    </div>


                </div>
            </div>
            </div>
           

        </div>
    );
};

export default CheckoutPage;
