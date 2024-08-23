import React, { useState, useEffect } from 'react';
import Header from "../../components/HeaderComponents/HeaderComponents";
import InputComponent from "../../components/InputComponents/InputComponents";
import ButtonComponent from "../../components/ButtonComponents/ButtonComponents";
import { Container, Row, Col } from 'react-bootstrap';
import FooterComponents from "../../components/FooterComponents/FooterComponents";

const CreateNewPassword = () => {
    const [confirmNewPassword, setConfirmNewPassword] = useState({
        password: '',
        confirm_password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleChange = (fieldName, value) => {
        setConfirmNewPassword({ ...confirmNewPassword, [fieldName]: value });
    };

    useEffect(() => {
        if (confirmNewPassword.password === confirmNewPassword.confirm_password) {
            setErrorMessage('');
            setIsButtonDisabled(false);
        } else {
            setErrorMessage('Confirm New Password is not match with New Password');
            setIsButtonDisabled(true);
        }
    }, [confirmNewPassword]);

    const handleNewPassword = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Header />
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6} lg={5}>
                        <h5 className="bold pointer-on-hover title d-inline">Create New Password</h5>
                        <form onSubmit={handleNewPassword}>
                            <div className="form-row mt-3">
                                <div className="form-group col-12">
                                    <div className="form-outline mb-4 text-top">
                                        <label className="form-label" htmlFor="registerFirstName">New Password</label>
                                        <InputComponent
                                            type="password"
                                            id="first_name"
                                            customClass={`form-control r-style gray-bg`}
                                            value={confirmNewPassword.password}
                                            onChange={(e) => handleChange('password', e.target.value)}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="form-outline mb-4 text-top">
                                        <label className="form-label" htmlFor="registerLastName">Confirm New Password</label>
                                        <InputComponent
                                            type="password"
                                            id="last_name"
                                            customClass={`form-control r-style gray-bg ${errorMessage ? 'validation-error-border' : ''}`}
                                            value={confirmNewPassword.confirm_password}
                                            onChange={(e) => handleChange('confirm_password', e.target.value)}
                                            placeholder=""
                                        />
                                        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                                    </div>
                                    <div className="form-group">
                                        <ButtonComponent
                                            cssClass="shopping-btn w-100 mt-3"
                                            onClick={handleNewPassword}
                                            label="Update Password"
                                            disabled={isButtonDisabled}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Col>
                </Row>
                <div className='pb-2'>
                    <FooterComponents />
                </div>
            </Container>
        </>
    );
};

export default CreateNewPassword;
