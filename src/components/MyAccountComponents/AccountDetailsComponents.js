import React, { useState } from 'react';
import InputComponent from '../InputComponents/InputComponents';

const AccountDetails = ({ user, onUpdateUser }) => {
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name || '',
        date_of_birth: user.date_of_birth,
        contact_no: user.contact_no,
        secondary_contact_number: user.secondary_contact_number || '',
        city: user.city,
        state: user.state,
        country: user.country || '',
        zipcode: user.zipcode,
        street_address: user.street_address,
        email: user.email,
        password: '',
    });
    const [formDataErrors, setFormDataErrors] = useState({});
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleChange = (fieldName, value) => {
        let formattedValue = value;
        if (fieldName === 'contact_no') {
            formattedValue = value.slice(0, 10);
        }

        setFormData({ ...formData, [fieldName]: formattedValue });
        setFormDataErrors({ ...formDataErrors, [fieldName]: '' });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.first_name) errors.first_name = 'First name is required';
        if (!formData.last_name) errors.last_name = 'Last name is required';
        if (!formData.date_of_birth) errors.date_of_birth = 'Date of birth is required';
        if (!formData.contact_no) errors.contact_no = 'Contact number is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormDataErrors(errors);
        } else {
            setIsButtonLoading(true);
            onUpdateUser(formData);
            setIsButtonLoading(false);
            toggleEditMode();
        }
    };

    const handleCancel = () => {
        setFormData({
            first_name: user.first_name,
            last_name: user.last_name,
            middle_name: user.middle_name || '',
            date_of_birth: user.date_of_birth,
            contact_no: user.contact_no,
            secondary_contact_number: user.secondary_contact_number || '',
            city: user.city,
            state: user.state,
            country: user.country || '',
            zipcode: user.zipcode,
            street_address: user.street_address,
            email: user.email,
            password: '',
        });
        setFormDataErrors({});
        setEditMode(false);
    };

    return (
        <div className="container mt-2">
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="form-row mt-3">
                        {['first_name', 'last_name', 'date_of_birth', 'contact_no', 'email', 'password'].map((field) => (
                            <div className="form-group col-md-12" key={field}>
                                <label className="form-label" htmlFor={field}>
                                    {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </label>
                                <InputComponent
                                    type={field === 'date_of_birth' ? 'date' : field === 'password' ? 'password' : 'text'}
                                    id={field}
                                    customClass={`form-control gray-bg ${formDataErrors[field] ? 'validation-error-border' : ''}`}
                                    value={formData[field]}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                    placeholder=""
                                />
                                {formDataErrors[field] && <div className="validation-error" style={{color: 'red', fontSize: '0.875em'}}>{formDataErrors[field]}</div>}
                            </div>
                        ))}
                    </div>
                    <div className="form-group">
                        {isButtonLoading ? (
                            <div className="red_button product-add_to_cart_button mt-3">
                                Loading...
                            </div>
                        ) : (
                            <button type="submit" className="red_button product-add_to_cart_button pointer-on-hover mt-3">
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </div>
           
        </div>
    );
};

export default AccountDetails;
