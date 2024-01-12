import React, { useEffect, useState } from 'react';
import InputComponent from '../../components/InputComponents/InputComponents';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
// import { getAllCountries, getStatesOfCountry } from 'country-state-city';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OrderServices from '../../services/orderService';
import { ProvinceTax } from '../../helpers/TaxTable'
import LoginScreen from '../Login/Login';


const CheckoutPage = () => {
    const navigate = useNavigate();
    const [islogin, setIsLogin] = useState(true)
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const subtotal = useSelector(state => state.CartReducer.cartSubTotal);
    const [userID, setUserID] = useState('');
    // "first_name": "1",
    // "last_name": "2",
    // "country": "3",
    // "company_name": "4",
    // "street_address": "5",
    // "city": "6",
    // "state": "7",
    // "zip": "8",
    // "phone": "9",
    // "email": "10"
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
    const [isChecked, setIsChecked] = useState(true);
    const [billingFormErrors, setBillingFormErrors] = useState({});
    const [shippingFormErrors, setShippingFormErrors] = useState({});
    const [pst, setPst] = useState();
    const [hst, setHst] = useState();
    const [gst, setGst] = useState();
    const [total, setTotal] = useState();
    const [province, setProvince] = useState();

    useEffect(()=>{
        console.log(cartItems)
        if(cartItems.length === 0){
            navigate('/');
        }
    },[])


    function generateGuestUserId() {
        const uniqueId = 'guest_' + Math.random().toString(36).substr(2, 9);
        return uniqueId;
    }

    // Check if guest user ID exists in local storage, otherwise generate one
    let guestUserId = localStorage.getItem('guestUserId');
    if (!guestUserId) {
        guestUserId = generateGuestUserId();
        localStorage.setItem('guestUserId', guestUserId);
    }

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

        if (formData.first_name.trim() === '') {
            errors.first_name = 'First name is required';
        }

        if (formData.last_name.trim() === '') {
            errors.last_name = 'Last name is required';
        }

        if (formData.country.trim() === '') {
            errors.country = 'Country is required';
        }

        if (formData.street_address.trim() === '') {
            errors.street_address = 'Street address is required';
        }

        if (formData.city.trim() === '') {
            errors.city = 'City is required';
        }

        // if (formData.state.trim() === '') {
        //     errors.state = 'State is required';
        // }

        if (formData.zip.trim() === '') {
            errors.zip = 'ZIP Code is required';
        }

        if (formData.phone.trim() === '') {
            errors.phone = 'Phone number is required';
        }

        if (formData.email.trim() === '') {
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
            setBillingFormData({...shippingFormData})
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
        let updatedBillingFormData = {} ;
        if(isChecked){
            updatedBillingFormData = { ...shippingFormData };
        }
        const isBillingFormValid = validateForm(isChecked ? updatedBillingFormData :billingFormData, "billingform Error");
        const isShippingFormValid = validateForm(shippingFormData, "shippingform Error");

        // If both forms are valid, proceed with submission
        if (isBillingFormValid && isShippingFormValid) {
            console.log('Billing Form Data:', billingFormData);
            console.log('Shipping Form Data:', shippingFormData);
            let submitobj = {
                total_amount: subtotal,
                user_id: userID ? userID : null,
                is_guest: !userID ? 1 : 0,
                guest_user_id: guestUserId,
                promo_code: "Promo Code",
                percent_discount_applied: "20",
                shipping_address: shippingFormData,
                billing_address: isChecked ? updatedBillingFormData :billingFormData,
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
        const selectedProvince = ProvinceTax.find(p => p.provinceName === shippingFormData.state);
        const subTotalPlusGst = selectedProvince?.gst ? getToFixed((selectedProvince?.gst / 100) * subtotal): 0;
        const subTotalPlusHst = selectedProvince?.hst ? getToFixed((selectedProvince?.hst / 100) * subtotal) : 0;
        const subTotalPlusPst = selectedProvince?.pst ? getToFixed((selectedProvince?.pst / 100) * subtotal) : 0;
        const total = subtotal + +subTotalPlusGst + +subTotalPlusHst + +subTotalPlusPst;

        setTotal(total)
        setGst(subTotalPlusGst)
        setHst(subTotalPlusHst)
        setPst(subTotalPlusPst)
        setProvince(selectedProvince)
    }, [shippingFormData.state])

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
                    ):null} 
                </div>

                <div className="col-md-4">

                <div className="text-center">
                            <h3 className='tex'>Order Summary</h3>
                        </div>
                        <div className="text-right mt-5">
                            <p className='mt-1'>Subtotal: <span className='ml-5'>{subtotal}</span></p>
                            {gst !== 0 && <p className='mt-1'>GST {`(${province?.gst}%)`}: <span className='ml-5'>{gst}</span></p>}
                            {pst !== 0 && <p className='mt-1'>PST {`(${province?.pst}%)`}: <span className='ml-5'>{pst}</span></p>}
                            {hst !== 0 && <p className='mt-1'>HST {`(${province?.hst}%)`}: <span className='ml-5'>{hst}</span></p>}
                            {/*<p className='mt-1'>Sales Tax: <span className='ml-5'>00</span></p>*/}

                            <p>Grandtotal: <span className='ml-5'>{total}</span></p>

                        </div>
                        <div className='row'>
                            <div className='text-right'>
                                <h6>Congrats, you'r eligible for Free <i className="fas fa-truck"></i> <br />Shipping</h6>
                                <p className='mt-3'>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a className="ml-1" href='#'>privacy policy</a></p>
                                <button class="checkout-button cart-checkout-btn mt-4" onClick={handleSubmit}>Place Order</button>
                            </div>
                        </div>


                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
