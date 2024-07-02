import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Address = ({ user, onUpdateUser }) => {
    const [editMode, setEditMode] = useState(false);
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
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser(formData);
        toggleEditMode();
    };
    return (
        <div className='mt-1 text-left'>
            <p>The following addresses will be used on the checkout page by default.</p>
            <form onSubmit={handleSubmit}>
                <div className="row mt-5">
                    <div className="col-md-6">
                        <h2 className='ml-0'>Billing address</h2>
                        <div className='mt-3'>
                            <div className='pointer-on-hover brandLabel fs-5 pt-2'>Add</div>
                            <div  className='mt-3'><p>You have not set up this type of address yet.</p></div>
                        </div>
                        {/* <div className="form-group mt-5">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                disabled={!editMode}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                disabled={!editMode}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Middle Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="middle_name"
                                value={formData.middle_name}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                disabled={!editMode}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="contact_no"
                                value={formData.contact_no}
                                onChange={handleChange}
                                disabled={!editMode}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Secondary Contact Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="secondary_contact_number"
                                value={formData.secondary_contact_number}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div> */}
                    </div>
                    <div className="col-md-6">
                        <h2 className='ml-0'>Shipping address</h2>
                        <div className='mt-3'>
                            <div className='pointer-on-hover brandLabel fs-5 pt-2'>Add</div>
                            <div className='mt-3'><p>You have not set up this type of address yet.</p></div>
                        </div>
                        {/* <div className="form-group mt-5">
                            <label>Street Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="street_address"
                                value={formData.street_address}
                                onChange={handleChange}
                                disabled={!editMode}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                className="form-control"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                disabled={!editMode}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input
                                type="text"
                                className="form-control"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                disabled={!editMode}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input
                                type="text"
                                className="form-control"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div>
                        <div className="form-group">
                            <label>Zipcode</label>
                            <input
                                type="text"
                                className="form-control"
                                name="zipcode"
                                value={formData.zipcode}
                                onChange={handleChange}
                                disabled={!editMode}
                                required
                            />
                        </div> */}
                    </div>
                </div>
                {/* <div className="row mt-3">
                    <div className="col-md-12">
                        {!editMode && (
                            <button type="button" className="btn btn-primary" onClick={toggleEditMode}>
                                Edit
                            </button>
                        )}
                        {editMode && (
                            <>
                                <button type="submit" className="btn btn-primary mr-2">
                                    Save
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={toggleEditMode}>
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div> */}
            </form>
        </div>
    );
}

export default Address;
