import React, { useEffect, useState } from 'react';
import InputComponent from '../../components/InputComponents/InputComponents';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
// import { getAllCountries, getStatesOfCountry } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderServices from '../../services/orderService';
import { ProvinceTax } from '../../helpers/TaxTable'
import LoginScreen from '../Login/Login';
import { addCoupon, updateCartItems, updateCartSubTotal, updateCartTotalTax } from '../../redux/action/cart-action';
import { Collapse, Button } from 'react-bootstrap';
import ImageComponent from '../../components/ImageComponents/ImageComponents';


const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [islogin, setIsLogin] = useState(true)
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const subtotal = useSelector(state => state.CartReducer.cartSubTotal);
    const cartTotalTax = useSelector(state => state.CartReducer.cartTotalTax);

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
    const [province, setProvince] = useState();
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponCode, setCouponCode] = useState(CouponDetails ? CouponDetails?.couponCode : '');
    const [checkCouponCode, setCheckCouponCode] = useState(null)
    const [couponDiscount, setCouponDiscount] = useState(CouponDetails ? CouponDetails?.couponDiscount : 0)
    const [subTotalWithCoupon, setSubTotalWithCoupon] = useState(0)
    const [shipping, setShipping] = useState()


    const [open, setOpen] = useState(false);

    const [billingFormData, setBillingFormData] = useState({
        first_name: '',
        last_name: '',
        country: 'CA',
        street_address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
    });
    const [shippingFormData, setShippingFormData] = useState({
        first_name: '',
        last_name: '',
        country: 'CA',
        street_address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
    });

    useEffect(() => {
        // console.log(cartItems)
        if (cartItems.length === 0) {
            navigate('/');
        }
        if (AuthData) {
            setShippingFormData((prevData) => ({
                ...prevData,
                first_name: AuthData?.first_name,
                last_name: AuthData?.last_name,
                phone: AuthData?.contact_no,
                email: AuthData?.email,
            }))

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

        // console.log('field-----------------------', field, value)
        setFormData({
            ...formData,
            [field]: value,
        });
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

        if (formData.zip?.trim() === '' || formData?.zip === null) {
            errors.zip = 'ZIP Code is required';
        }

        if (formData.phone?.trim() === '' || formData?.phone === null) {
            errors.phone = 'Phone number is required';
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
        if (isBillingFormValid && isShippingFormValid) {
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
                // console.log("cartTotalTax",cartTotalTax)
                // let newCartTotalTax = {
                //     gst: JSON.parse(cartTotalTax?.gst) + subTotalPlusGst,
                //     hst:0,
                //     pst:0
                // }
                // console.log("new CartTotalTax", newCartTotalTax)
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
                console.log("product", product)
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
        console.log("updatedCartItems", updatedCartItems)
        const totalTaxes = calculateTotalTaxes(updatedCartItems);
        console.log("totalTaxes", totalTaxes)
        dispatch(updateCartTotalTax(totalTaxes))
        dispatch(updateCartSubTotal(totalPrice))
        dispatch(updateCartItems(updatedCartItems));
        setProvince(selectedProvince)
        setSubTotalWithCoupon(totalPrice);
    }, [shippingFormData.state,subtotal])

    const handleCouponClick = () => {
        setShowCouponInput(!showCouponInput);
    };

    useEffect(() => {
        const isMinimumAmountReached = (subtotal > checkCouponCode?.coupon_code?.minimum_amount);

        const discount = isMinimumAmountReached
            ? checkCouponCode?.coupon_code?.calculation_type === "percentage" ? (parseFloat(checkCouponCode?.coupon_code?.amount) / 100) * subtotal : checkCouponCode?.coupon_code?.calculation_type === "fixed" ? parseFloat(checkCouponCode?.coupon_code?.amount) : 0
            : 0;

        const discountedTotal = parseFloat(subtotal) - discount;
        dispatch(updateCartSubTotal(discountedTotal));
        console.log("discountedTotal", discountedTotal)
        setSubTotalWithCoupon(discountedTotal);
        console.log("Codupon Dis|", discount);
        setCouponDiscount(discount)
        dispatch(addCoupon({ couponCode: couponCode, couponDiscount: discount }));



    }, [checkCouponCode])


    const handleApplyCoupon = async () => {
        console.log("call")
        setCouponCode(couponCode)

        const payload = {
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

    return (
        <div className="container mt-5">
            <div className="row ">
                <div className="col-md-8">
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
                                        id="phone"
                                        label="Phone *"
                                        customClass={`form-control gray-bg ${shippingFormErrors.phone ? 'validation-error-border' : ''}`}
                                        value={shippingFormData?.phone}
                                        onChange={(e) => handleInputChange(shippingFormData, setShippingFormData, 'phone', e.target.value, "shippingform Error")}
                                        placeholder=""
                                        required
                                    />
                                    {shippingFormErrors.phone && <div className="validation-error">{shippingFormErrors.phone}</div>}
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
                                        id="zip"
                                        label="Postal Code *"
                                        customClass={`form-control gray-bg ${shippingFormErrors.zip ? 'validation-error-border' : ''}`}
                                        value={shippingFormData?.zip}
                                        onChange={(e) => handleInputChange(shippingFormData, setShippingFormData, 'zip', e.target.value, "shippingform Error")}
                                        placeholder=""
                                        required
                                    />
                                    {shippingFormErrors.zip && <div className="validation-error">{shippingFormErrors.zip}</div>}
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
                                            id="phone"
                                            label="Phone *"
                                            customClass={`form-control gray-bg ${billingFormErrors.phone ? 'validation-error-border' : ''}`}
                                            value={billingFormData?.phone}
                                            onChange={(e) => handleInputChange(billingFormData, setBillingFormData, 'phone', e.target.value, "billingform Error")}
                                            placeholder=""
                                            required
                                            isdisabled={isChecked}
                                        />
                                        {billingFormErrors.phone && <div className="validation-error">{billingFormErrors.phone}</div>}
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
                                            id="zip"
                                            label="Postal Code *"
                                            customClass={`form-control gray-bg ${billingFormErrors.zip ? 'validation-error-border' : ''}`}
                                            value={billingFormData?.zip}
                                            onChange={(e) => handleInputChange(billingFormData, setBillingFormData, 'zip', e.target.value, "billingform Error")}
                                            placeholder=""
                                            required
                                            isdisabled={isChecked}
                                        />
                                        {billingFormErrors.zip && <div className="validation-error">{billingFormErrors.zip}</div>}
                                    </div>

                                </div>

                            </form>
                        </div>
                    ) : null}
                </div>

                <div className="col-md-4">

                    <div className="text-center">
                        <h3 className='tex'>Order Summary</h3>
                    </div>
                    <div className="mt-5">
                        <div className="d-flex justify-content-between mt-2">
                            <div className="mr-auto">Subtotal</div>
                            <div>
                                <span >{subtotal.toFixed(2)}</span>
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
                                    <div className='ml-5'>{cartTotalTax?.gst}</div>
                                </div>
                            }
                            {parseFloat(cartTotalTax?.pst) !== 0 &&
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="mr-auto">PST {`(${province?.pst}%)`}</div>
                                    <div className='ml-5'>{cartTotalTax?.pst}</div>
                                </div>
                            }
                            {parseFloat(cartTotalTax?.hst) !== 0 &&
                                <div className="d-flex justify-content-between mt-2s">
                                    <div className="mr-auto">HST {`(${province?.hst}%)`}</div>
                                    <div className='ml-5'>{cartTotalTax?.hst}</div>
                                </div>
                            }
                        </>
                        <hr></hr>
                        <div className="d-flex justify-content-between m2 mb-2">
                            <div className='h4'>Order Total</div>
                            <div className='h4'>{subTotalWithCoupon.toFixed(2)}</div>
                        </div>
                        {/* {cartItems.map((item, index) => (
                            <>
                                <p className='mt-1'>{item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name}: <span className='ml-5'>{item?.totalPrice}</span></p>
                                {item.taxes && item.taxes.gst !== 0 && <p className='mt-1'>GST {`(${province?.gst}%)`}: <span className='ml-5'>{item.taxes.gst}</span></p>}
                                {item.taxes && item.taxes.pst !== 0 && <p className='mt-1'>PST {`(${province?.pst}%)`}: <span className='ml-5'>{item.taxes.pst}</span></p>}
                                {item.taxes && item.taxes.hst !== 0 && <p className='mt-1'>HST {`(${province?.hst}%)`}: <span className='ml-5'>{item.taxes.hst}</span></p>}

                            </>
                        ))}
                        <p className='mt-1'>Subtotal: <span className='ml-5'>{subtotal}</span></p>
                        {couponDiscount > 0 &&
                            <p className='mt-1'>{`Coupon Discount ${checkCouponCode?.coupon_code.calculation_type === 'percentage' ? `(${checkCouponCode?.coupon_code.amount}%)` : `(${checkCouponCode?.coupon_code.amount} CAD)`} :`} <span className='ml-5'>{couponDiscount}</span></p>}
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
                                <button
                                    className={`checkout-button cart-checkout-btn ${couponDiscount > 0 ? 'disabled' : ''}`}
                                    disabled={couponDiscount > 0}
                                    onClick={handleApplyCoupon}
                                >
                                    {"Apply Coupon"}
                                </button>


                            </div>
                        )}
                        <p>Grandtotal: <span className='ml-5'>{subTotalWithCoupon}</span></p> */}

                    </div>

                    <div>
                        <div style={{ backgroundColor: 'lightgray' }}>
                            <div
                                className=''
                                onClick={() => setOpen(!open)}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                            >
                                <div className="d-flex justify-content-between mb-2">
                                    <div style={{ color: 'black', padding: 15 }}>Items in order ({cartItems?.length})</div>
                                    <div style={{ padding: 15 }}>{open ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}</div>

                                </div>

                            </div>
                        </div>
                        <Collapse in={open}>
                            <div className='' id="example-collapse-text" style={{ borderLeft: '1px solid', borderRight: '1px solid', borderBottom: '1px solid' }}>
                                <div className="container">
                                    {cartItems.map((item, index) => (
                                        <div className="row p-2 mt-3">
                                            <div className="col-md-3">
                                                <div className="">
                                                    <ImageComponent src={item?.image[0]?.name} alt="Product Image" classAtribute="cart-products" />
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
                                                <div className=""> ₹ {item?.totalPrice}</div>
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
                            <button class="checkout-button cart-checkout-btn mt-4" onClick={handleSubmit}>Place Order</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
