import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import {
    Form,
    Button,
    Heading,
} from '@carbon/react';
import { TextInput
} from 'carbon-components-react';
import './MultiFactorAuthentication.scss'
export const MultiFactorAuthentication = ({ email, errorNotification, loading, setLoading, setErrorNotification }) => {
    const [verificationCode, setVerificationCode] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        if (verificationCode.length == 0) {
            setErrorNotification({
                title: "verification code should  not be blank"
            });
        }
        else {
            setErrorNotification({
            })
            const fetchData = async () => {
                const data = {
                    email: email,
                    verificationCode: verificationCode,
                }
                // const response = await fetch(`https://w5i6csz6w9.execute-api.eu-central-1.amazonaws.com/Stage/login`, {
                //     method: 'POST',
                //     body: JSON.stringify(data),
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // })

                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
            fetchData();
        }

    }
    return (
        <div className='multifactor-container' >
            <div className='box-container'>
                <Form onSubmit={handleFormSubmit}>
                    <div style={{ paddingRight: '20px' }}>
                        <Heading>Multi Factor Authentication</Heading>
                        <p className="register-text body-01">Enter 6-digit temporary code send to  {email} </p>
                        <div className='login-input-wrapper' >
                            <TextInput
                                id="email"
                                className="login-form-input"
                                hideLabel={false}
                                invalid={typeof errorNotification == 'object' && Object.keys(errorNotification).length !== 0}
                                labelText="Enter Verification Code"
                                invalidText={(errorNotification && errorNotification.title) ? errorNotification.title : ""}
                                placeholder=""
                                value={verificationCode}
                                onChange={e => { setVerificationCode(e.target.value); if (typeof errorNotification == 'object' && Object.keys(errorNotification).length !== 0) setErrorNotification({}); }}
                            />
                        </div>
                    </div>
                    <div className='fields-container'>
                        <Button
                            type="submit"
                            // iconDescription={submitText}
                            size="xl"
                            className="submit-button"
                        >Login</Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}