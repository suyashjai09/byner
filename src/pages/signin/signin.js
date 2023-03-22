import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import {
    Theme,
    Content,
    Form,
    Stack,
    Button,
    Heading,
    Checkbox,
    InlineLoading,
    FormLabel,
    Link,
    InlineNotification,
} from '@carbon/react';
import { ArrowRight, ArrowLeft } from '@carbon/react/icons';
import {
    Accordion,
    div,
    NotificationActionButton, PasswordInput,TextInput
} from 'carbon-components-react';
import './signin.scss'

const Signin = () => {

    let navigate = useNavigate();
    // const { authenticate } = useContext(AccountContext);

    const [askForPassword, setAskForPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingSuccess, setLoadingSuccess] = useState(false);
    const [errorNotification, setErrorNotification] = useState({});
    const [submitText, setSubmitText] = useState("Continue");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleEmailFormSubmit=()=>{
        setAskForPassword(false);
    }

    return (
        <>
            {askForPassword ? 
            (<div className='signin-container' >
                <div className='box-container'>
                    <Form onSubmit={handleEmailFormSubmit}>
                        <div style={{paddingRight:'20px'}}>
                            <Heading>Login In</Heading>
                            <p className="register-text body-01">Don't have an account? <Link className="underlined-link" href="/signup">Create an IBMid</Link></p>
                            <div className='login-input-wrapper' >
                                <FormLabel className='input-label' >IBMid <Link className="forgot-link" href="/forgotpassword">Forgot ID?</Link></FormLabel>
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
                            <Checkbox 
                                className='checkbox-item'
                                labelText={`Remember ID`}
                                id="checkbox-label-1"
                            />
                            </div>
                            <div className='fields-container'>
                                <Button
                                    renderIcon={ArrowRight}
                                    type="submit"
                                    iconDescription={submitText}
                                    size="xl"
                                    className="submit-button"
                                >{submitText}</Button>
                            </div>
                        
                    </Form>
                </div>
            </div >) : (
                <>
                {/* <div className='signin-container' >
                    <div className='box-container'>
                        <Form onSubmit={handleSubmit}>
                            <p className='headingSubtitle' >
                                Logging in as {email}&nbsp;
                                <Link className="underlined-link" onClick={setEmailInputMode} >
                                    Not you?
                                </Link>
                            </p>
                            <div className='login-input-wrapper' >
                                <FormLabel className='input-label' >Password <Link className="forgot-link" href="/forgotpassword">Forgot Password?</Link></FormLabel>
                                <TextInput.PasswordInput
                                    ref={passwordInput}
                                    id="password"
                                    className="login-form-input"
                                    labelText=""
                                    invalid={typeof errorNotification == 'object' && Object.keys(errorNotification).length !== 0}
                                    invalidText={(errorNotification && errorNotification.title) ? errorNotification.title : ""}
                                    placeholder=""
                                    disabled={loading ? true : false}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </Form>
                    </div>
                </div>  */}
                <div className='signin-container' >
                <div className='box-container'>
                    <Form onSubmit={()=>{}}>
                        <div style={{paddingRight:'20px'}}>
                            <Heading>Login In</Heading>
                            <p className="register-text body-01">Logging in as {email}&nbsp; <Link className="underlined-link" style={{cursor:'pointer'}} onClick={()=>{setAskForPassword(true)}}> Not you?</Link></p>
                            <div className='login-input-wrapper' >
                                <FormLabel className='input-label' >Password <Link className="forgot-link" href="/forgotpassword">Forgot Password?</Link></FormLabel>
                                <PasswordInput
                                    type="password"
                                    className="login-form-input"
                                    id="password"
                                   
                                    labelText=""
                                    invalid={typeof errorNotification == 'object' && Object.keys(errorNotification).length !== 0}
                                    invalidText={(errorNotification && errorNotification.title) ? errorNotification.title : ""}
                                    placeholder=""
                                    disabled={loading ? true : false}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            {/* <Checkbox 
                                className='checkbox-item'
                                labelText={`Remember ID`}
                                id="checkbox-label-1"
                            /> */}
                            </div>
                            <div className='fields-container'>
                                <Button
                                    renderIcon={ArrowRight}
                                    type="submit"
                                    iconDescription={submitText}
                                    size="xl"
                                    className="submit-button"
                                >Login</Button>
                            </div>
                        
                    </Form>
                </div>
            </div>
                </>
                
            )}
        </>
    );
};

export default Signin;







