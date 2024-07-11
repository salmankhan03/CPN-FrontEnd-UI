import React, { useState } from 'react';
import InputComponent from '../InputComponents/InputComponents';
import ButtonComponent from "../ButtonComponents/ButtonComponents";
import { Modal, Button, Form } from 'react-bootstrap';
import AuthServices from "../../services/AuthServices";
import { notifySuccess } from '../ToastComponents/ToastComponents';

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
    const [show, setShow] = useState(false);
    const [passwordFormData, setPasswordFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [passwordFormDataErrors, setPasswordFormDataErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChangePassword = (field, value) => {
        setPasswordFormData({
            ...passwordFormData,
            [field]: value
        });
    };

    const validatePasswordForm = () => {
        let errors = {};
        if (!passwordFormData.oldPassword) {
            errors.oldPassword = 'Old password is required';
        }
        if (!passwordFormData.newPassword) {
            errors.newPassword = 'New password is required';
        }
        if (passwordFormData.newPassword && passwordFormData.newPassword.length < 8) {
            errors.newPassword = 'New password must be at least 8 characters';
        }
        if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        setPasswordFormDataErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveChanges = () => {
        if (validatePasswordForm()) {

            const payload = {
                oldPasswrd: passwordFormData.oldPassword,
                newPassword: passwordFormData.newPassword,
                confirmPassword: passwordFormData.confirmPassword
            }
            AuthServices.changePassword(payload).then((resp) => {
                if (resp?.status_code === 200 || resp?.status_code === 500) {
                    // console.log('resp==========================', resp)
                    notifySuccess(`Password Upadet Successfully !`);
                }
            }).catch((error) => {
                // setLoading(false)
                console.log(error)
            })
            const timers = setTimeout(() => {
                handleClose();
            }, 1000)
            return () => clearTimeout(timers);
        }
    };

    const handleClose = () => {
        setShow(false)
        setPasswordFormData({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
        setPasswordFormDataErrors({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        })
    };
    const handleShow = () => setShow(true);

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
        // if (!formData.password) errors.password = 'Password is required';
        return errors;
    };

    const handleSubmit = (e) => {
        setIsButtonLoading(true)
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
        const timers = setTimeout(() => {
            setIsButtonLoading(false)
        }, 1000);
        return () => clearTimeout(timers);
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
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className={"container"}>
                        <Form.Group controlId="formOldPassword" style={{ textAlign: 'start', marginBottom: 10 }}>
                            <Form.Label>Old Password</Form.Label>
                            <InputComponent
                                type="password"
                                id="oldPassword"
                                customClass={`form-control gray-bg ${passwordFormDataErrors.oldPassword ? 'validation-error-border' : ''}`}
                                value={passwordFormData.oldPassword}
                                onChange={(e) => handleChangePassword('oldPassword', e.target.value)}
                                placeholder="Enter old password"
                            />
                            {passwordFormDataErrors.oldPassword && <div className="validation-error">{passwordFormDataErrors.oldPassword}</div>}
                        </Form.Group>

                        <Form.Group controlId="formNewPassword" style={{ textAlign: 'start', marginBottom: 10 }}>
                            <Form.Label>New Password</Form.Label>
                            <InputComponent
                                type="password"
                                id="newPassword"
                                customClass={`form-control gray-bg ${passwordFormDataErrors.newPassword ? 'validation-error-border' : ''}`}
                                value={passwordFormData.newPassword}
                                onChange={(e) => handleChangePassword('newPassword', e.target.value)}
                                placeholder="Enter new password"
                            />
                            {passwordFormDataErrors.newPassword && <div className="validation-error">{passwordFormDataErrors.newPassword}</div>}
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword" style={{ textAlign: 'start', marginBottom: 10 }}>
                            <Form.Label>Confirm Password</Form.Label>
                            <InputComponent
                                type="password"
                                id="confirmPassword"
                                customClass={`form-control gray-bg ${passwordFormDataErrors.confirmPassword ? 'validation-error-border' : ''}`}
                                value={passwordFormData.confirmPassword}
                                onChange={(e) => handleChangePassword('confirmPassword', e.target.value)}
                                placeholder="Confirm new password"
                            />
                            {passwordFormDataErrors.confirmPassword && <div className="validation-error">{passwordFormDataErrors.confirmPassword}</div>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges} style={{ backgroundColor: '#415da1', borderColor: '#415da1' }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="form-row mt-3">
                        {['first_name', 'last_name', 'date_of_birth', 'contact_no', 'email'].map((field) => (
                            <div className="form-group col-md-12" key={field}>
                                <label className="form-label" htmlFor={field}>
                                    {field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </label>
                                <InputComponent
                                    type={field === 'date_of_birth' ? 'date' : 'text'}
                                    id={field}
                                    customClass={`form-control gray-bg ${formDataErrors[field] ? 'validation-error-border' : ''}`}
                                    value={formData[field]}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                    placeholder=""
                                />
                                {formDataErrors[field] && <div className="validation-error" style={{ color: 'red', fontSize: '0.875em' }}>{formDataErrors[field]}</div>}
                            </div>
                        ))}
                        <ButtonComponent cssClass="empty-carts" onClick={handleShow} label="Change Password" />
                    </div>
                    {/* <div className="form-group">
                        {isButtonLoading ? (
                            <div className="red_button product-add_to_cart_button mt-3">
                                Loading...
                            </div>
                        ) : (
                            <button type="submit" className="red_button product-add_to_cart_button pointer-on-hover mt-3">
                                Save
                            </button>
                        )}
                    </div> */}
                    <div className="form-group">
                        {isButtonLoading ? (
                            <ButtonComponent cssClass="shopping-btn btn-border-radius mt-5" onClick={''} label="Loading ...." disabled={true} />
                        ) : (
                            <ButtonComponent cssClass="shopping-btn btn-border-radius mt-5" onClick={handleSubmit} label="Save" />
                        )}
                    </div>
                </form>
            </div>

        </div>
    );
};

export default AccountDetails;
