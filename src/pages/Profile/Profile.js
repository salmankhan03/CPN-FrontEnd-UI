import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import InputComponent from "../../components/InputComponents/InputComponents";
import AuthServices from "../../services/AuthServices";
import {notifyError, notifySuccess} from "../../components/ToastComponents/ToastComponents";
import {setUserData} from "../../redux/action/auth-action";

const formatDate = (dateString) => {
    if (!dateString) return ''; // Handle the case if dateString is empty
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    month = month.length === 1 ? '0' + month : month;
    day = day.length === 1 ? '0' + day : day;
    return `${year}-${month}-${day}`;
};

const Profile = () => {
    const AuthData = useSelector(state => state?.AuthReducer?.userData);
    const guestData = useSelector(state => state?.AuthReducer?.guestUserData);
    const [profileFormErrors, setProfileFormErrors] = useState({});

    const [profileFormData, setProfileFormData] = useState({
        first_name: AuthData ? AuthData.first_name : '',
        last_name: AuthData ? AuthData?.last_name : '',
        contact_no: AuthData ? AuthData?.contact_no : '',
        email: AuthData ? AuthData?.email : '',
        date_of_birth: AuthData ? formatDate(AuthData?.date_of_birth) : '',
    });

    const dispatch = useDispatch();




    const profileOnChange = (value, name) => {
        console.log(value ,name)
        let formattedValue = value;
        if (name === 'contact_no') {
            formattedValue = value.slice(0, 10);
        }
        setProfileFormData({
            ...profileFormData,
        [name]:formattedValue
        })

        setProfileFormErrors({
            ...profileFormErrors,
            [name]: '',
        })
     }

     const validation = (valid) => {
         let errors = {};
         const firstName = valid?.first_name;
         const lastName = valid?.last_name;
         const contact_no= valid?.contact_no;
         const email= valid?.email;

         if (!firstName) {
             errors.first_name = 'First name is required';
         }

         if (!lastName) {
             errors.last_name = 'Last name is required';
         }

         if (!contact_no) {
             errors.contact_no = 'contact is required';
         }

         if (!email) {
             errors.email = 'Email address is required';
         } else if (!isValidEmail(valid.email)) {
             errors.email = 'Invalid email address';
         }

         if (!valid.date_of_birth.trim()) {
             errors.date_of_birth = 'Date of Birth is required';
         }

         setProfileFormErrors(errors)

         return Object.keys(errors).length === 0;





     }

    const isValidEmail = (email) => {
        // You can implement a more sophisticated email validation here
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const setSubmit =(event) => {
        console.log("submit")
        event.preventDefault();
        const isProfileFormValid = validation(profileFormData);

        if(isProfileFormValid) {
            const editedPayload = {
                ...AuthData,
                ...profileFormData
            }

            AuthServices.customerProfileUpdate(editedPayload).then((resp) => {
                if (resp?.status_code === 200) {
                    notifySuccess(`Your Profile is updated Successfully`);
                    console.log(resp)
                    dispatch(setUserData({
                        ...resp?.data
                    }))
                }
            }).catch((error) => {
                notifyError(`Something went wrong`);
            })
        }

    }

    return (
        <div className="container mt-5">
            <div className="profile" >
                <div className="form mt-3">
                        <div className="form-outline mb-4">
                            <label className="form-label"> First Name</label>
                            <InputComponent
                                type="text"
                                id="first_name"
                                // label="First Name *"
                                customClass={`form-control gray-bg ${profileFormErrors.first_name ? 'validation-error-border' : ''}`}
                                value={profileFormData?.first_name}
                                onChange={(e) => profileOnChange(e.target.value,"first_name")}
                                placeholder=""
                                required={true}
                            />
                            {profileFormErrors.first_name && <div className="validation-error">{profileFormErrors.first_name}</div>}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label">Last Name</label>
                            <InputComponent
                                type="text"
                                id="last_name"
                                // label="Last Name *"
                                customClass={`form-control gray-bg ${profileFormErrors.last_name ? 'validation-error-border' : ''}`}
                                value={profileFormData?.last_name}
                                onChange={(e) => profileOnChange(e.target.value,"last_name")}
                                required

                            />
                            {profileFormErrors.last_name && <div className="validation-error">{profileFormErrors.last_name}</div>}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label">Email</label>
                            <InputComponent
                                type="email"
                                id="email"
                                // label="Email Address *"
                                customClass={`form-control gray-bg ${profileFormErrors.email ? 'validation-error-border' : ''}`}
                                value={profileFormData?.email}
                                onChange={(e) => profileOnChange(e.target.value,"email")}
                            />
                            {profileFormErrors.email && <div className="validation-error">{profileFormErrors.email}</div>}
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label">Phone Number</label>
                            <InputComponent
                                type="number"
                                id="contact_no"
                                // label="Phone *"
                                customClass={`form-control gray-bg ${profileFormErrors.contact_no ? 'validation-error-border' : ''}`}
                                value={profileFormData?.contact_no}
                                onChange={(e) => profileOnChange(e.target.value,"contact_no")}

                            />
                            {profileFormErrors.contact_no && <div className="validation-error">{profileFormErrors.contact_no}</div>}
                          </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" >Date of Birth</label>
                            <InputComponent
                                type="date"
                                id="date_of_birth"
                                customClass={`form-control gray-bg ${profileFormErrors.date_of_birth ? 'validation-error-border' : ''}`}
                                value={profileFormData?.date_of_birth}
                                onChange={(e) => profileOnChange(e.target.value, 'date_of_birth')}
                                placeholder=""
                            />
                            {profileFormErrors.date_of_birth && <div className="validation-error">{profileFormErrors.date_of_birth}</div>}
                        </div>
                    <button type="submit" onClick={setSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
