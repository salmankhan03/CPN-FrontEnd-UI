import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import InputComponent from '../InputComponents/InputComponents';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const Address = ({ user, onUpdateUser }) => {
    const [editMode, setEditMode] = useState(false);
    const [formType, setFormType] = useState(""); // New state for form type (billing/shipping)
    const [formData, setFormData] = useState({
        first_name: user?.first_name,
        last_name: user?.last_name,
        middle_name: user?.middle_name || '',
        date_of_birth: user?.date_of_birth,
        contact_no: user?.contact_no,
        secondary_contact_number: user?.secondary_contact_number || '',
        city: user?.city,
        state: user?.state,
        country: user?.country || '',
        zipcode: user?.zipcode,
        street_address: user?.street_address,
    });
    const [validPostal, setValidPostal] = useState(false);

    const [billingFormErrors, setBillingFormErrors] = useState({});
    const [shippingFormErrors, setShippingFormErrors] = useState({});
    const [billingFormData, setBillingFormData] = useState({
        first_name: user?.billing_address_addedy_by_user?.length > 0 ? user?.billing_address_addedy_by_user[0]?.first_name : '',
        last_name: user?.billing_address_addedy_by_user?.length > 0 ? user?.billing_address_addedy_by_user[0]?.last_name : '',
        country: user?.billing_address_addedy_by_user?.length > 0 ? user?.billing_address_addedy_by_user[0]?.country : 'CA',
        street_address: user?.billing_address_addedy_by_user?.length > 0 ? user?.billing_address_addedy_by_user[0]?.street_address : '',
        city: user?.billing_address_addedy_by_user?.length > 0 ? user?.billing_address_addedy_by_user[0]?.city : '',
        state: user?.billing_address_addedy_by_user?.length > 0 ? user?.billing_address_addedy_by_user[0]?.state : '',
        zipcode: user?.billing_address_addedy_by_user?.length > 0 ? user?.billing_address_addedy_by_user[0]?.zipcode : '',
        contact_no: user?.billing_address_addedy_by_user?.length > 0 ? user?.billing_address_addedy_by_user[0]?.contact_no : '',
        email: user?.billing_address_addedy_by_user?.length > 0 ? user?.billing_address_addedy_by_user[0]?.email : '',
        id: user?.billing_address_addedy_by_user?.length > 0 ? user?.billing_address_addedy_by_user[0]?.id : null,
    });
    const [shippingFormData, setShippingFormData] = useState({
        first_name: user?.shipping_address_addedy_by_user?.length > 0 ? user?.shipping_address_addedy_by_user[0]?.first_name : '',
        last_name: user?.shipping_address_addedy_by_user?.length > 0 ? user?.shipping_address_addedy_by_user[0]?.last_name : '',
        country: user?.shipping_address_addedy_by_user?.length > 0 ? user?.shipping_address_addedy_by_user[0]?.country : 'CA',
        street_address: user?.shipping_address_addedy_by_user?.length > 0 ? user?.shipping_address_addedy_by_user[0]?.street_address : '',
        city: user?.shipping_address_addedy_by_user?.length > 0 ? user?.shipping_address_addedy_by_user[0]?.city : '',
        state: user?.shipping_address_addedy_by_user?.length > 0 ? user?.shipping_address_addedy_by_user[0]?.state : '',
        zipcode: user?.shipping_address_addedy_by_user?.length > 0 ? user?.shipping_address_addedy_by_user[0]?.zipcode : '',
        contact_no: user?.shipping_address_addedy_by_user?.length > 0 ? user?.shipping_address_addedy_by_user[0]?.contact_no : '',
        email: user?.shipping_address_addedy_by_user?.length > 0 ? user?.shipping_address_addedy_by_user[0]?.email : '',
        id: user?.shipping_address_addedy_by_user?.length > 0 ? user?.shipping_address_addedy_by_user[0]?.id : null,

    });

    const handleInputChange = (formData, setFormData, field, value, setFormErrors) => {
        let formattedValue = value;
        if (field === 'contact_no') {
            formattedValue = value.slice(0, 10);
        }

        if (field === 'zipcode') {
            formattedValue = value.slice(0, 6);
        }

        setFormData({
            ...formData,
            [field]: formattedValue,
        });

        if (setFormErrors === "billingFormError") {
            setBillingFormErrors({
                ...billingFormErrors,
                [field]: '',
            });
        } else {
            setShippingFormErrors({
                ...shippingFormErrors,
                [field]: '',
            });
        }
    };

    const toggleEditMode = (type) => {
        setFormType(type);
        setEditMode(!editMode);
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { ...user, shipping_address: shippingFormData, billing_address: billingFormData };
        userDataUpdate(updatedUser);
        setEditMode(false);
    };

    const handleBillingSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { ...user, billing_address: billingFormData, shipping_address: shippingFormData };
        userDataUpdate(updatedUser);
        setEditMode(false);
    };
    const userDataUpdate = (userData) => {
        onUpdateUser(userData);
    }
    return (
        <div className='mt-1 text-left'>
            <p>The following addresses will be used on the checkout page by default.</p>
            {editMode ? (
                <React.Fragment>
                    <h3 className='pt-3'>{formType === 'billing' ? 'Billing address' : 'Shipping address'}</h3>
                    <form onSubmit={formType === 'billing' ? handleBillingSubmit : handleShippingSubmit}>
                        <div className="form-row pt-5">
                            <div className="form-group col-md-12">
                                <InputComponent
                                    type="text"
                                    id="first_name"
                                    label="First Name *"
                                    customClass={`form-control gray-bg ${formType === 'billing' ? billingFormErrors.first_name : shippingFormErrors.first_name ? 'validation-error-border' : ''}`}
                                    value={formType === 'billing' ? billingFormData?.first_name : shippingFormData?.first_name}
                                    onChange={(e) => handleInputChange(formType === 'billing' ? billingFormData : shippingFormData, formType === 'billing' ? setBillingFormData : setShippingFormData, 'first_name', e.target.value, formType === 'billing' ? 'billingFormError' : 'shippingFormError')}
                                    placeholder=""
                                    required
                                />
                                {formType === 'billing' ? billingFormErrors.first_name : shippingFormErrors.first_name && <div className="validation-error">{formType === 'billing' ? billingFormErrors.first_name : shippingFormErrors.first_name}</div>}
                            </div>
                            <div className="form-group col-md-12">
                                <InputComponent
                                    type="text"
                                    id="last_name"
                                    label="Last Name *"
                                    customClass={`form-control gray-bg ${formType === 'billing' ? billingFormErrors.last_name : shippingFormErrors.last_name ? 'validation-error-border' : ''}`}
                                    value={formType === 'billing' ? billingFormData?.last_name : shippingFormData?.last_name}
                                    onChange={(e) => handleInputChange(formType === 'billing' ? billingFormData : shippingFormData, formType === 'billing' ? setBillingFormData : setShippingFormData, 'last_name', e.target.value, formType === 'billing' ? 'billingFormError' : 'shippingFormError')}
                                    placeholder=""
                                    required
                                />
                                {formType === 'billing' ? billingFormErrors.last_name : shippingFormErrors.last_name && <div className="validation-error">{formType === 'billing' ? billingFormErrors.last_name : shippingFormErrors.last_name}</div>}
                            </div>
                            <div className="form-group col-md-12">
                                <InputComponent
                                    type="text"
                                    id="contact_no"
                                    label="Phone *"
                                    customClass={`form-control gray-bg ${formType === 'billing' ? billingFormErrors.contact_no : shippingFormErrors.contact_no ? 'validation-error-border' : ''}`}
                                    value={formType === 'billing' ? billingFormData?.contact_no : shippingFormData?.contact_no}
                                    onChange={(e) => handleInputChange(formType === 'billing' ? billingFormData : shippingFormData, formType === 'billing' ? setBillingFormData : setShippingFormData, 'contact_no', e.target.value, formType === 'billing' ? 'billingFormError' : 'shippingFormError')}
                                    placeholder=""
                                    required
                                />
                                {formType === 'billing' ? billingFormErrors.contact_no : shippingFormErrors.contact_no && <div className="validation-error">{formType === 'billing' ? billingFormErrors.contact_no : shippingFormErrors.contact_no}</div>}
                            </div>
                            <div className="form-group col-md-12">
                                <InputComponent
                                    type="text"
                                    id="email"
                                    label="Email Address *"
                                    customClass={`form-control gray-bg ${formType === 'billing' ? billingFormErrors.email : shippingFormErrors.email ? 'validation-error-border' : ''}`}
                                    value={formType === 'billing' ? billingFormData?.email : shippingFormData?.email}
                                    onChange={(e) => handleInputChange(formType === 'billing' ? billingFormData : shippingFormData, formType === 'billing' ? setBillingFormData : setShippingFormData, 'email', e.target.value, formType === 'billing' ? 'billingFormError' : 'shippingFormError')}
                                    placeholder=""
                                    required
                                />
                                {formType === 'billing' ? billingFormErrors.email : shippingFormErrors.email && <div className="validation-error">{formType === 'billing' ? billingFormErrors.email : shippingFormErrors.email}</div>}
                            </div>
                            <div className="form-group col-md-12">
                                <InputComponent
                                    type="text"
                                    id="street_address"
                                    label="Street address *"
                                    customClass={`form-control gray-bg ${formType === 'billing' ? billingFormErrors.street_address : shippingFormErrors.street_address ? 'validation-error-border' : ''}`}
                                    value={formType === 'billing' ? billingFormData?.street_address : shippingFormData?.street_address}
                                    onChange={(e) => handleInputChange(formType === 'billing' ? billingFormData : shippingFormData, formType === 'billing' ? setBillingFormData : setShippingFormData, 'street_address', e.target.value, formType === 'billing' ? 'billingFormError' : 'shippingFormError')}
                                    placeholder=""
                                    required
                                />
                                {formType === 'billing' ? billingFormErrors.street_address : shippingFormErrors.street_address && <div className="validation-error">{formType === 'billing' ? billingFormErrors.street_address : shippingFormErrors.street_address}</div>}
                            </div>
                            <div className="form-group col-md-12">
                                <InputComponent
                                    type="text"
                                    id="city"
                                    label="Town / City *"
                                    customClass={`form-control gray-bg ${formType === 'billing' ? billingFormErrors.city : shippingFormErrors.city ? 'validation-error-border' : ''}`}
                                    value={formType === 'billing' ? billingFormData?.city : shippingFormData?.city}
                                    onChange={(e) => handleInputChange(formType === 'billing' ? billingFormData : shippingFormData, formType === 'billing' ? setBillingFormData : setShippingFormData, 'city', e.target.value, formType === 'billing' ? 'billingFormError' : 'shippingFormError')}
                                    placeholder=""
                                    required
                                />
                                {formType === 'billing' ? billingFormErrors.city : shippingFormErrors.city && <div className="validation-error">{formType === 'billing' ? billingFormErrors.city : shippingFormErrors.city}</div>}
                            </div>
                            <div className="form-group col-md-12">
                                <div className='mb-3'>
                                    <label htmlFor="last_name">Province</label>
                                    <RegionDropdown
                                        defaultOptionLabel={'Select Province'}
                                        className={`country-Dropdown gray-bg ${formType === 'billing' ? billingFormErrors.state : shippingFormErrors.state ? 'validation-error-border' : ''}`}
                                        country={'CA'}
                                        countryValueType={'short'}
                                        value={formType === 'billing' ? billingFormData.state : shippingFormData.state}
                                        onChange={(e) => handleInputChange(formType === 'billing' ? billingFormData : shippingFormData, formType === 'billing' ? setBillingFormData : setShippingFormData, 'state', e, formType === 'billing' ? 'billingFormError' : 'shippingFormError')}
                                    />
                                    {formType === 'billing' ? billingFormErrors.state : shippingFormErrors.state && <div className="validation-error">{formType === 'billing' ? billingFormErrors.state : shippingFormErrors.state}</div>}
                                </div>
                            </div>
                            <div className="form-group col-md-12">
                                <InputComponent
                                    type="text"
                                    id="zipcode"
                                    label="Postal Code *"
                                    customClass={`form-control gray-bg ${formType === 'billing' ? billingFormErrors.zipcode : shippingFormErrors.zipcode ? 'validation-error-border' : ''}`}
                                    value={formType === 'billing' ? billingFormData?.zipcode : shippingFormData?.zipcode}
                                    onChange={(e) => handleInputChange(formType === 'billing' ? billingFormData : shippingFormData, formType === 'billing' ? setBillingFormData : setShippingFormData, 'zipcode', e.target.value, formType === 'billing' ? 'billingFormError' : 'shippingFormError')}
                                    placeholder=""
                                    required
                                />
                                {formType === 'billing' ? billingFormErrors.zipcode : shippingFormErrors.zipcode && <div className="validation-error">{formType === 'billing' ? billingFormErrors.zipcode : shippingFormErrors.zipcode}</div>}
                                {validPostal === true && <div className="validation-error">Please Enter valid Postal Code</div>}
                            </div>
                        </div>
                        <button type="submit" className="red_button product-add_to_cart_button pointer-on-hover mt-3">Save</button>
                    </form>
                </React.Fragment>
            ) : (
                <div className="row mt-5">
                    <div className="col-md-6">
                        <h2 className='ml-0'>Billing address</h2>
                        <div className='mt-3'>
                            <div className='pointer-on-hover brandLabel fs-5 pt-2' onClick={() => toggleEditMode('billing')}>
                                {user?.billing_address_addedy_by_user?.length > 0 ? 'Edit' : 'Add'}
                            </div>
                            <div>
                                {!user?.billing_address_addedy_by_user?.length > 0 ? (
                                    <div className='mt-3'><p>You have not set up this type of address yet.</p></div>
                                ) : (
                                    <address className='mt-3'>
                                        <p className='mb-0 mt-0 pt-1'>{user?.billing_address_addedy_by_user[0]?.first_name}</p>
                                        <p className='mb-0 mt-0 pt-1'>{user?.billing_address_addedy_by_user[0]?.last_name}</p>
                                        <p className='mb-0 mt-0 pt-1'>{user?.billing_address_addedy_by_user[0]?.street_address}</p>
                                        <p className='mb-0 mt-0 pt-1'>{user?.billing_address_addedy_by_user[0]?.city} <span className='ml-2'> {user?.billing_address_addedy_by_user[0]?.zipcode}</span></p>
                                        <p className='mb-0 mt-0 pt-1'>{user?.billing_address_addedy_by_user[0]?.state} <span className='ml-2'> {user?.billing_address_addedy_by_user[0]?.country}</span></p>
                                        <p className='mb-0 mt-0 pt-1'>{user?.billing_address_addedy_by_user[0]?.contact_no}</p>
                                        {/* <p>{user?.billing_address_addedy_by_user[0]?.email} </p> */}
                                    </address>
                                )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className='ml-0'>Shipping address</h2>
                        <div className='mt-3'>
                            <div className='pointer-on-hover brandLabel fs-5 pt-2' onClick={() => toggleEditMode('shipping')}>
                                {user?.shipping_address_addedy_by_user?.length > 0 ? 'Edit' : 'Add'}
                            </div>
                            <div>
                                {!user?.shipping_address_addedy_by_user?.length > 0 ? (
                                    <div className='mt-3'><p>You have not set up this type of address yet.</p></div>
                                ) : (
                                    <address className='mt-3'>
                                        <p className='mb-0 mt-0 pt-1'>{user?.shipping_address_addedy_by_user[0]?.first_name}</p>
                                        <p className='mb-0 mt-0 pt-1'>{user?.shipping_address_addedy_by_user[0]?.last_name}</p>
                                        <p className='mb-0 mt-0 pt-1'>{user?.shipping_address_addedy_by_user[0]?.street_address}</p>
                                        <p className='mb-0 mt-0 pt-1'>{user?.shipping_address_addedy_by_user[0]?.city} <span className='ml-2'> {user?.shipping_address_addedy_by_user[0]?.zipcode}</span></p>
                                        <p className='mb-0 mt-0 pt-1'>{user?.shipping_address_addedy_by_user[0]?.state} <span className='ml-2'> {user?.shipping_address_addedy_by_user[0]?.country}</span></p>
                                        <p className='mb-0 mt-0 pt-1'>{user?.shipping_address_addedy_by_user[0]?.contact_no}</p>
                                        {/* <p>{user?.shipping_address_addedy_by_user[0]?.email} </p> */}
                                    </address>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Address;
