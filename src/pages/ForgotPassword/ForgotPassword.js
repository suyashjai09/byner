import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import {
    Form,
    Button,
    Heading,
    FormLabel,
    Link,
    InlineNotification,
} from '@carbon/react';
import {
 PasswordInput, TextInput
} from 'carbon-components-react';
import './ForgotPassword.scss'
import { Loader } from '../../Components/Loader/Loader';

const ForgotPassword = () => {

    let navigate = useNavigate();
    // const { authenticate } = useContext(AccountContext);

    const [askForPassword, setAskForPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingSuccess, setLoadingSuccess] = useState(false);
    const [errorNotification, setErrorNotification] = useState({});
    const [submitText, setSubmitText] = useState("Continue");
    const [serverErrorNotification, setServerErrorNotification] = useState({});

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [verificationCode,setVerificationCode] = useState("");

    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const handleEmailFormSubmit = (e) => {
        e.preventDefault(); 
        if (email.length == 0) {
            setErrorNotification({
                title: "Email should not be blank"
            });
        }
        else {
            setErrorNotification({
            })
            setAskForPassword(false);
        }
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        if (verificationCode.length == 0 || password.length ==0) {
            if(verificationCode.length == 0)
            setErrorNotification({
                title: "verification code should  not be blank"
            });
            else if(password.length == 0){
                setErrorNotification({
                    title: "password should  not be blank"
                });   
            } 
            setLoading(false);
        }
        else {
            setErrorNotification({
            })
            const fetchData = async () => {
                const data = {
                    email: email,
                    password:password,
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
                    
                    setAskForPassword(true);
                    setServerErrorNotification({
                        title: "Wrong email or password"
                    })

                }, 2000);
            }
            fetchData();
        }

    }


    return (
        <>
            {askForPassword ?
                (<div className='forgotpasword-container' >
                    <div className='box-container'>
                        <Form onSubmit={handleEmailFormSubmit}>
                            <div style={{ paddingRight: '20px' }}>
                                <Heading>Forgot Password</Heading>
                                {typeof serverErrorNotification == 'object' && Object.keys(serverErrorNotification).length !== 0 ?
                                            (
                                                <InlineNotification
                                                    className="error-notification-box"
                                                    onClose={function noRefCheck() { }}
                                                    onCloseButtonClick={() => { setServerErrorNotification({}) }}
                                                    statusIconDescription="notification"
                                                    title={serverErrorNotification.title ? serverErrorNotification.title : ''}
                                                />) : (
                                                <div className="error-notification-box-inactive"></div>
                                            )
                                        }
                                {/* <p className="register-text body-01">Don't have an account? <Link className="underlined-link" href="/signup">Create an IBMid</Link></p> */}
                                <div className='login-input-wrapper' >
                                    <FormLabel className='input-label' >Enter your E-Mail to reset your password.</FormLabel>
                                    <TextInput
                                        ref={emailInput}
                                        id="email"
                                        className="login-form-input"
                                        hideLabel={true}
                                        invalid={typeof errorNotification == 'object' && Object.keys(errorNotification).length !== 0}
                                        labelText=""
                                        invalidText={(errorNotification && errorNotification.title) ? errorNotification.title : ""}
                                        placeholder="username@ibm.com"
                                        disabled={loading ? true : false}
                                        value={email}
                                        onChange={e => { setEmail(e.target.value); if (typeof errorNotification == 'object' && Object.keys(errorNotification).length !== 0) setErrorNotification({}); }}
                                    />
                                </div>
                            </div>
                            <div className='fields-container'>
                                <Button
                                    type="submit"
                                    iconDescription={submitText}
                                    size="xl"
                                    className="submit-button"
                                >{"Continue"}</Button>
                            </div>

                        </Form>
                    </div>
                </div >) : (
                    <>
                        <div className='forgotpasword-container' >
                            <div className='box-container'>
                                <Form onSubmit={handleFormSubmit}>
                                    <div style={{ paddingRight: '20px' }}>
                                        <Heading>Forgot Password</Heading>
                                        <p className="register-text body-01">If there is an account associated with {email}, you will receive an email with a 6-digit temporary code</p>
                                        <div className='login-input-wrapper' >
                                            {/* <FormLabel className='input-label' >Password <Link className="forgot-link" href="/forgotpassword">Forgot Password?</Link></FormLabel> */}
                                            <TextInput
                                                id="email"
                                                className="login-form-input"
                                                hideLabel={false}
                                                invalid={typeof errorNotification == 'object' && Object.keys(errorNotification).length !== 0}
                                                labelText="Enter Verification Code"
                                                invalidText={(errorNotification && errorNotification.title) ? errorNotification.title : ""}
                                                placeholder=""
                                                disabled={loading ? true : false}
                                                value={verificationCode}
                                                onChange={e => { setVerificationCode(e.target.value); if (typeof errorNotification == 'object' && Object.keys(errorNotification).length !== 0) setErrorNotification({}); }}
                                            />
                                            <PasswordInput
                                                type="password"
                                                className="login-form-input"
                                                id="password"
                                                labelText="Enter Password"
                                                invalid={typeof errorNotification == 'object' && Object.keys(errorNotification).length !== 0}
                                                invalidText={(errorNotification && errorNotification.title) ? errorNotification.title : ""}
                                                placeholder=""
                                                disabled={loading ? true : false}
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='fields-container'>
                                        {loading ?
                                            (<div className='forgot-password-loader-signin'>
                                                <Loader />
                                            </div>) :
                                            (<Button
                                                type="submit"
                                                iconDescription={submitText}
                                                size="xl"
                                                className="submit-button"
                                            >Reset Password</Button>)}

                                    </div>

                                </Form>
                            </div>
                        </div>
                    </>

                )}
        </>
    );
};

export default ForgotPassword;







