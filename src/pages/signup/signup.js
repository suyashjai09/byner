import React, { useState, useRef, useContext } from 'react';
import {
    Theme,
    Content,
    Form,
    FormGroup,
    Stack,
    TextInput,
    Button,
    Heading,
    InlineLoading,
    Link,
    InlineNotification,
    Grid,
    Column,
    Row,
    ProgressIndicator,
    ProgressStep,
    Select,
    SelectItem,
    RadioButtonGroup,
    RadioButton,
    FlexGrid,
    HeaderName,
} from '@carbon/react';
import {
    Accordion,
    div,
    NotificationActionButton, PasswordInput
} from 'carbon-components-react';

import { ArrowRight, ArrowLeft } from '@carbon/react/icons';
import { useNavigate } from "react-router-dom";
// import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js'
// import UserPool from "../../UserPool";
// import { AccountContext } from '../../components/Accounts';
// import countries from './countries';
import '../signup/signup.scss'
import { PasswordStrength } from '../../Components/PasswordStrength/PasswordStrength';


const Signup = () => {

    const [password, setPassword] = useState('');
    const [email, setEmailAddress] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [passwordArray, setPasswordArray] = useState(Array(6).fill(false))
    const [passwordStrengthWidth, setpaswordStrengthWidth] = useState(0);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [emailIsValid, setEmailValid] = useState(true);
    const [activeStep, setActiveStep] = useState(1);
    const [verificationCode, setVerificationCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    console.log(activeStep, "check");
    const handleFirstNameChange = (value) => {
        setFirstName(value);
    }
    const handleLastNameChange = (value) => {
        setLastName(value);
    }
    const handleVerificationCodeChange = (value) => {
        setVerificationCode(value);
    }
    const handleEmailChange = (value) => {
        setEmailAddress(value);
    };
    const handlePasswordChange = (value) => {

        setPassword(value);
        const lengthRegex = /^.{8,}$/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialcharacterRegex = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;
        const tempArray = [lengthRegex.test(value.trim()), uppercaseRegex.test(value), lowercaseRegex.test(value), numberRegex.test(value), specialcharacterRegex.test(value), value.length == value.trim().length];
        setPasswordArray(tempArray)
        setpaswordStrengthWidth(tempArray.filter(i => i === true).length * 61);
        setPasswordIsValid(lengthRegex.test(value.trim()) && uppercaseRegex.test(value) && lowercaseRegex.test(value) && numberRegex.test(value) && specialcharacterRegex.test(value))
    };

    const handleSignupRequest = () => {
        const fetchData = async () => {
            const data = {
                email: email,
                password: password,
            }

            console.log("aoooo");
            const response = await fetch(`https://w5i6csz6w9.execute-api.eu-central-1.amazonaws.com/Stage/signup`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            setActiveStep(2);
            return response
        }
        setActiveStep(2);
        // fetchData();
    }

    const handleEditClick = (value) => {
        setActiveStep(value)
    }

    const handleVerifyEmail = () => {
        const fetchData = async () => {
            const data = {
                email: email,
                code: verificationCode,
            }
            const response = await fetch(`https://w5i6csz6w9.execute-api.eu-central-1.amazonaws.com/Stage/confirm-email`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            // setActiveStep(3);
            return response
        }
         setActiveStep(3);
        // fetchData();
    }

    return (

        <div>
            <div className="accordian">
                {activeStep == "1" ? (
                    <div className='account'>
                        <div className='account-header'>
                            <h5 className='heading'>Account information</h5>
                        </div>

                        <TextInput type="email" className='email-text-input'
                            labelText="Email"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            invalid={!emailIsValid}
                            invalidText={
                                !emailIsValid
                                    ? 'Enter valid email address' : null
                            }
                        />
                        <PasswordInput type="password" className='password-text-input'
                            id="password-input"
                            labelText="Enter Password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            onFocus={() => { setIsPasswordVisible(true) }}
                            onBlur={() => { setIsPasswordVisible(false) }}

                            invalid={!passwordIsValid}
                            invalidText={
                                !passwordIsValid
                                    ? 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
                                    : null
                            }
                        />
                        {isPasswordVisible && <div style={{ width: `${passwordStrengthWidth}px`, height: '4px', backgroundColor: 'green', marginTop: '2px' }}></div>}
                        {isPasswordVisible && <PasswordStrength passwordArray={passwordArray} />}
                        <div style={{ marginTop: '32px' }}>
                            <button className='submit-button' onClick={() => handleSignupRequest()}>
                                Submit
                            </button>
                        </div>
                    </div>) :
                    (<div className='account-edit'>
                        <div className='account-header-edit'>
                            <div class='box'>
                                <p className='heading'>Account information</p>
                                <button className='edit-button' onClick={() => handleEditClick("1")}>Edit</button>
                            </div>
                            <p className='heading-edit'>{email}</p>
                            <p className='heading-edit'>******</p>
                        </div>
                    </div>)}
                {activeStep == "2" ?
                    (<div id="verify-section" class="email-verification">
                        <h5>Verify Email</h5>
                        <p>We sent a 7-digit verification code to {email}.</p>
                        <p>This code is valid for 30 minutes.</p>
                        <TextInput type="text" className='verification-text-input'
                            labelText="Verification code"
                            value={verificationCode}
                            onChange={(e) => handleVerificationCodeChange(e.target.value)}
                        // invalid={!emailIsValid}
                        // invalidText={
                        //     !emailIsValid
                        //         ? 'Enter valid email address' : null
                        // }
                        />
                        <div >
                            <button className='submit-button' onClick={() => handleVerifyEmail()}>
                                Submit
                            </button>
                        </div>
                    </div>) :
                    (<div id="verify-section" class="email-verification">
                        <h5>Verify Email</h5>
                    </div>)}
                {activeStep == "3" ?
                    (<div id="verify-section" className='personal-info'>
                        <div className='account-header'>
                            <h5 className='heading'>Personal information</h5>
                        </div>
                        <TextInput type="text" 
                            labelText="First name"
                            value={firstName}
                            onChange={(e) => handleFirstNameChange(e.target.value)}
                        />
                        <TextInput type="text" 
                            labelText="Last name"
                            value={lastName}
                            onChange={(e) => handleLastNameChange(e.target.value)}
                        />
                        <div >
                            <button className='submit-button' onClick={() => setActiveStep(4)}>
                                Submit
                            </button>
                        </div>
                    </div>) :
                    (<div id="verify-section" class="email-verification">
                        <div class='box'>
                                <p className='heading'>Personal information</p>
                                <button className='edit-button' onClick={() => handleEditClick("3")}>Edit</button>
                            </div>
                            <p className='heading-edit'>{firstName+" "+lastName}</p>
                    </div>)}

            </div>

        </div>




    )

};


export default Signup;