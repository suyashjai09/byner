import React, { useState, useRef, useContext, useEffect } from 'react';
import 'react-telephone-input/css/default.css'
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
} from "../../../src/utils/util.js";
// import "react-credit-cards/es/styles-compiled.css";
import {
    TextInput,
    Heading,
    Link,
    InlineNotification,
    Select,
    SelectItem,
} from '@carbon/react';
import { PasswordInput
} from 'carbon-components-react';

import { ArrowRight, ArrowLeft } from '@carbon/react/icons';
import { useNavigate } from "react-router-dom";
// import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js'
// import UserPool from "../../UserPool";
// import { AccountContext } from '../../components/Accounts';
// import countries from './countries';
import '../signup/signup.scss'
import { PasswordStrength } from '../../Components/PasswordStrength/PasswordStrength';
import countrylist from '../../data/countrylist';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Loader } from '../../Components/Loader/Loader.js';


const Signup = () => {

    // var ReactTelInput = require('react-telephone-input');
    const [errorNotification, setErrorNotification] = useState({title: "Enter Valid Verification code.Try again"});
   
    const [loading, setLoading] = useState(false);
    const [loadingSuccess, setLoadingSuccess] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmailAddress] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [passwordArray, setPasswordArray] = useState(Array(6).fill(false))
    const [passwordStrengthWidth, setpaswordStrengthWidth] = useState(0);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [emailIsValid, setEmailValid] = useState(true);
    const [activeStep, setActiveStep] = useState(2);
    const [verificationCode, setVerificationCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isProfileInfoUpdated, setIsProfileInfoUpdated] = useState(false)
    const [isAccountInfoUpdated, setIsAccountInfoUpdated] = useState(false)
    const [country, setCountry] = useState("India");
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [isTaxInfoUpdated, setIsTaxInfoUpdated] = useState(false);
    const [vatNumber, setVatNumber] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [organizationCountry, setCountryName] = useState("India");
    const [isGstValid, setGstValid] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiryDate, setCardExpiryDate] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isCardInfoUpdated, setCardInfoUpdated] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isAccountInfoError, setIsAccountInfoError] = useState(false);
    const [isVerifyEmailInfoError, setIsVerifyEmailError] = useState(false);
    const [isCreateAccountError, setIsCreateAccountError] = useState(false);
    const [userId, setUserId] = useState('');
    console.log(isError, "check")
    const personalInfoButtonDisabled = firstName.length == 0 || lastName.length == 0 || city.length == 0 || state.length == 0 || postalCode.length == 0 || phoneNumber.length == 0 || addressLine1.length == 0;
    const handleFirstNameChange = (value) => {
        setFirstName(value);
    }
    const handleLastNameChange = (value) => {
        setLastName(value);
    }
    const handleVerificationCodeChange = (value) => {
        setErrorNotification({});
        setVerificationCode(value);
        setIsError(false)
        setIsVerifyEmailError(false);
    }

    const checkEmailValid = (value) => {
        var isEmailValid =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (value || value.length !== 0) {
            if (isEmailValid.test(value)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const handleEmailChange = (value) => {

        setErrorNotification({});
        setIsError(false);
        setIsAccountInfoError(false);

        setEmailAddress(value);
        setEmailValid(checkEmailValid(value));
    };
    const handlePasswordChange = (value) => {

        setErrorNotification({});
        setIsError(false)
        setIsAccountInfoError(false);

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
            setLoading(true);
            setLoadingSuccess(true);
            const data = {
                email: email,
                password: password,
            }

            // const response = await fetch(`https://w5i6csz6w9.execute-api.eu-central-1.amazonaws.com/Stage/signup`, {
            //     method: 'POST',
            //     body: JSON.stringify(data),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // })

            // setTimeout(() => {
            //     // setLoadingSuccess(false);
            //     //  setLoading(false);
            //     // setActiveStep(2);
            //   }, 8000);
            // //   setTimeout(() => {
            // //        setSuccess(false);
            // //           setDescription('Submitting...');
            // //               setAriaLive('off');
            // // }, 1500);
            // if(true){
            //     setErrorNotification({
            //         title: "Email or password error.Try again"
            //     });
            //     setIsError(true)
            //     setIsAccountInfoError(true);
            //     setActiveStep(1);

            // }
            // else {
            //     setActiveStep(1);
            //     setIsAccountInfoUpdated(true);
            // }
            setTimeout(() => {
                setLoading(false);
                setActiveStep(2)
            }, 2000);


        }
        fetchData();
    }

    const handleEditClick = (value) => {
        setActiveStep(value)
    }

    const handleVerifyEmail = () => {
        setLoading(true);
        const fetchData = async () => {
            const data = {
                email: email,
                code: verificationCode,
            }
            // const response = await fetch(`https://w5i6csz6w9.execute-api.eu-central-1.amazonaws.com/Stage/confirm-email`, {
            //     method: 'POST',
            //     body: JSON.stringify(data),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // })

            

            if(true){
                setTimeout(() => {
                    setLoading(false);
                    
                    setErrorNotification({
                        title: "Enter Valid Verification code.Try again"
                    });
                    setIsError(true)
                    setIsVerifyEmailError(true);
                    setActiveStep(2);
                }, 2000);
                

            }
            else {
                setActiveStep(1);
                setIsAccountInfoUpdated(true);
            }
            // setActiveStep(3);
            // return response
        }
        // setActiveStep(3);
        fetchData();
    }

    const handleCreateAccount = () => {

        const fetchData = async () => {
            const data = {
                id: userId,
                username: email,
                fullName: firstName + " " + lastName,
                country: country,
                addressLine: addressLine1,
                addressLine2: addressLine2,
                city: city,
                postalCode: postalCode,
                state: state,
                phoneNumber: phoneNumber,
                organizationName: organizationName,
                VAT: vatNumber,
                organisationCountry: organizationCountry,
                isAgreementSigned: isChecked,
            }
            const response = await fetch(`https://w5i6csz6w9.execute-api.eu-central-1.amazonaws.com/Stage/create-user`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            // if(true){
            //     setErrorNotification({
            //         title: "Enter Valid Verification code.Try again"
            //     });
            //     setIsError(true)
            //     setIsVerifyEmailError(true);
            //     setActiveStep(1);

            // }
            // else {
            //     setActiveStep(1);
            //     setIsAccountInfoUpdated(true);
            // }
            // setActiveStep(3);
            return response
        }
    }
    const handlePersonalInfo = () => {

        setIsProfileInfoUpdated(true);
        setActiveStep(4);
    }

    const handleVatNumberChange = (value) => {
        setVatNumber(value);
        const gstRegex = /[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/;
        setGstValid(gstRegex.test(value))
    }

    const handleTaxInfo = () => {
        setIsTaxInfoUpdated(true);
        setActiveStep(5);
    }
    const handleCardInfo = () => {
        setCardInfoUpdated(true);
        setActiveStep(6);
    }
    const handleInputChange = ({ target }) => {
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
            setCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
            setCardExpiryDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
            setCardCVV(target.value)
        }
    }

    const creditCardButtonDisabled = cardCVV.length == 0 || cardExpiryDate.length == 0 || cardNumber.length == 0;
    const taxInfoButtonDisabled = organizationName.length == 0 || organizationCountry.length == 0 || (!isGstValid && vatNumber.length > 0);

    useEffect(() => {
        // 👇️ scroll to top on page load
        console.log(errorNotification, 'check', isError)
        if (isError) {
            document.getElementById("scroller").scroll(0, 0);
        }
    }, [isError]);
    // console.log(taxInfoButtonDisabled, isAccountInfoUpdated, isProfileInfoUpdated, isTaxInfoUpdated, isChecked)
    return (

        <div id="scroller" style={{ overflow: 'auto', backgroundColor: '#000' }}>
            <div className='header-box'>
                <div className="login-link" style={{ 'marginBottom': '1.5rem' }}>Already have an account? <Link href="/signin">Log in</Link></div>
                <Heading>Sign Up</Heading>
                {typeof errorNotification == 'object' && Object.keys(errorNotification).length !== 0 ?
                    (
                        <InlineNotification
                            className="error-notification"
                            onClose={function noRefCheck() { }}
                            onCloseButtonClick={() => { setErrorNotification({}); setIsError(false) }}
                            statusIconDescription="notification"
                            // subtitle={errorNotification.subtitle ? errorNotification.subtitle : ''}
                            title={errorNotification.title ? errorNotification.title : ''}
                        />) : (
                        <div className="error-notification-inactive"></div>
                    )
                }
            </div>

            <div className="accordian">
                {activeStep == 1 ? (
                    <div className='account'>
                        <div className='account-header'>
                            <p className='text-heading'>Account information</p>
                        </div>

                        <TextInput type="email" className='email-text-input'
                            labelText="Email"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            invalid={!emailIsValid && email.length > 0}
                            invalidText={
                                !emailIsValid && email.length > 0
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

                            invalid={!passwordIsValid && password.length > 0}
                            invalidText={
                                !passwordIsValid && password.length > 0
                                    ? 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
                                    : null
                            }
                        />
                        {isPasswordVisible && <div style={{ width: `${passwordStrengthWidth}px`, height: '4px', backgroundColor: 'green', marginTop: '2px' }}></div>}
                        {isPasswordVisible && <PasswordStrength passwordArray={passwordArray} />}

                        {loading ?
                            (
                                <div style={{ marginTop: '32px' }}>
                                    <Loader />
                                </div>
                            ) :
                            (
                                <div style={{ marginTop: '32px' }}>
                                    <button disabled={!passwordIsValid || !emailIsValid || email.length == 0 || password.length == 0 || isAccountInfoError}
                                        className={!passwordIsValid || !emailIsValid || email.length == 0 || password.length == 0 || isAccountInfoError ? 'submit-button-disabled' : 'submit-button'} onClick={() => handleSignupRequest()}>
                                        {!isAccountInfoUpdated ? "Next" : "Update"}
                                    </button>
                                </div>
                            )
                        }
                    </div>) :
                    (<div className='account-edit'>
                        <div className='account-header-edit'>
                            <div class='box'>
                                <p className='text-heading'>Account information</p>
                                <button className='edit-button' onClick={() => handleEditClick("1")}>Edit</button>
                            </div>
                            <p className='text-heading-edit'>{email}</p>
                            <p className='text-heading-edit'>******</p>
                        </div>
                    </div>)}
                {activeStep == 2 ?
                    (<div id="verify-section" class="email-verification">
                        <p>Verify Email</p>
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
                        {loading ?
                            (
                                <div style={{ marginTop: '8px' }}>
                                    <Loader />
                                </div>
                            ) :
                            (
                                <div className='verify-button-class'>
                                    <button disabled={verificationCode.length == 0 && isVerifyEmailInfoError}
                                        className={verificationCode.length == 0 && isVerifyEmailInfoError ? 'submit-button-disabled' : 'submit-button'} onClick={() => handleVerifyEmail()}>
                                        Submit
                                    </button>
                                    <button
                                        className={'resend-button'} onClick={() => handleSignupRequest()}>
                                        Resend
                                    </button>
                                </div>)}
                    </div>) :
                    (<div id="verify-section" class="email-verification">
                        <p>Verify Email</p>
                    </div>)}
                {activeStep == 3 ?
                    (<div id="verify-section" className='personal-info'>
                        <div className='account-header'>
                            <p className='text-heading'>Personal information</p>
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
                        <Select className='country-select'
                            value={country}
                            id='country-ci'
                            labelText='Country or region of residence*'
                            onChange={e => setCountry(e.target.value)}
                        >
                            {countrylist.map((countryObject, countryIndex) => (<SelectItem
                                text={countryObject.name}
                                value={countryObject.name}
                                key={countryIndex}
                            />))}

                        </Select>
                        <TextInput type="text"
                            labelText="Address line 1"
                            value={addressLine1}
                            onChange={(e) => setAddressLine1(e.target.value)}
                        />
                        <TextInput type="text"
                            labelText="Address line 1 (optional)"
                            value={addressLine2}
                            onChange={(e) => setAddressLine2(e.target.value)}
                        />
                        <TextInput type="text"
                            labelText="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <TextInput type="text"
                            labelText="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <TextInput type="text"
                            labelText="Postal Code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                        <div>
                            <p>Phone number</p>
                        </div>
                        <PhoneInput className='phone-input'
                            country={'us'}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e)}
                        />
                        <div >
                            <button disabled={personalInfoButtonDisabled}
                                className={personalInfoButtonDisabled ? 'submit-button-disabled' : 'submit-button'} onClick={() => handlePersonalInfo()}>
                                Submit
                            </button>
                        </div>
                    </div>) :
                    (isProfileInfoUpdated && activeStep > 3 ? (<div id="verify-section" class="email-verification">
                        <div class='box'>
                            <p className='text-heading'>Personal information</p>
                            <button className='edit-button' onClick={() => handleEditClick("3")}>Edit</button>
                        </div>
                        <p className='text-heading-edit'>{firstName + " " + lastName}</p>
                        <p className='text-heading-edit'>{country}</p>
                        <p className='text-heading-edit'>{city}</p>
                        <p className='text-heading-edit'>{state}</p>
                        <p className='text-heading-edit'>{addressLine1 + " " + addressLine2}</p>
                        <p className='text-heading-edit'>{postalCode}</p>
                        <p className='text-heading-edit'>{phoneNumber}</p>
                    </div>) : (
                        <div id="verify-section" class="email-verification">
                            <div class='box'>
                                <p className='text-heading'>Personal information</p>
                            </div>
                        </div>
                    ))}
                {activeStep == "4" ?
                    (<div id="verify-section" className='vat-info'>
                        <div className='account-header'>
                            <p className='text-heading'>Tax information</p>
                        </div>
                        <TextInput type="text"
                            labelText="Organization name"
                            value={organizationName}
                            onChange={(e) => setOrganizationName(e.target.value)}
                        />
                        <TextInput type="text"
                            labelText="Vat number"
                            value={vatNumber}
                            onChange={(e) => handleVatNumberChange(e.target.value)}
                            invalid={!isGstValid && vatNumber.length > 0}
                            invalidText={
                                !isGstValid && vatNumber.length > 0
                                    ? 'Enter valid vat number' : null
                            }
                        />
                        <Select className='country-select'
                            value={organizationCountry}
                            id='country-ci'
                            labelText='organisation Country'
                            onChange={e => setCountryName(e.target.value)}
                        >
                            {countrylist.map((countryObject, countryIndex) => (<SelectItem
                                text={countryObject.name}
                                value={countryObject.name}
                                key={countryIndex}
                            />))}

                        </Select>
                        <div >
                            <button disabled={taxInfoButtonDisabled}
                                className={taxInfoButtonDisabled ? 'submit-button-disabled' : 'submit-button'} onClick={() => handleTaxInfo()}>
                                Submit
                            </button>
                        </div>
                    </div>) :
                    (isTaxInfoUpdated && activeStep > 4 ? (<div id="verify-section" class="email-verification">
                        <div class='box'>
                            <p className='text-heading'>Tax information</p>
                            <button className='edit-button' onClick={() => handleEditClick("4")}>Edit</button>
                        </div>
                        {/* <p className='text-heading-edit'>{firstName + " " + lastName}</p> */}
                        <p className='text-heading-edit'>{country}</p>
                        <p className='text-heading-edit'>{city}</p>
                    </div>) : (
                        <div id="verify-section" class="email-verification">
                            <div class='box'>
                                <p className='text-heading'>Tax information</p>
                            </div>
                        </div>
                    ))}
                {activeStep == "5" ?
                    (<div id="verify-section" className='vat-info'>
                        <div className='account-header'>
                            <p className='text-heading'>Credit Card information</p>
                        </div>
                        <div className="form-group">
                            <input
                                type="tel"
                                name="number"
                                className="form-control"
                                placeholder="Card Number"
                                pattern="[\d| ]{16,22}"
                                value={cardNumber}
                                required
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className="form-group">

                            <input
                                type="tel"
                                name="expiry"
                                className="form-control"
                                placeholder="Valid Thru"
                                pattern="\d\d/\d\d"
                                value={cardExpiryDate}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="tel"
                                name="cvc"
                                className="form-control"
                                placeholder="CVC"
                                pattern="\d{3,4}"
                                value={cardCVV}
                                required
                                onChange={handleInputChange}
                            />
                        </div>


                        <div >
                            <button disabled={creditCardButtonDisabled}
                                className={creditCardButtonDisabled ? 'submit-button-disabled' : 'submit-button'} onClick={() => handleCardInfo()}>
                                Next
                            </button>
                        </div>
                    </div>) :
                    (isCardInfoUpdated && activeStep > 5 ? (<div id="verify-section" class="email-verification">
                        <div class='box'>
                            <p className='text-heading'>Card info</p>
                            <button className='edit-button' onClick={() => handleEditClick("4")}>Edit</button>
                        </div>
                        <p className='text-heading-edit'>**** **** **** ****</p>
                        <p className='text-heading-edit'>**/**</p>
                    </div>) : (
                        <div id="verify-section" class="email-verification">
                            <div class='box'>
                                <p className='text-heading'>Card info</p>
                            </div>
                        </div>
                    ))}
                {activeStep == "5" ?
                    (<div id="verify-section" className='vat-info'>
                        <div className='account-header'>
                            <p className='text-heading'>Account notice</p>
                        </div>
                        <p>Organisation may use my contact data to keep me informed of products, services and offerings:</p>
                        <p>You can withdraw your marketing consent at any time by submitting an opt-out request. Also you may unsubscribe from receiving marketing emails by clicking the unsubscribe link in each email.</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="checkbox" id="vehicle1" className='checkbox' name="vehicle1" value="Bike" onChange={(e) => { setIsChecked(e.target.checked) }} />
                            <label for="vehicle1"> I accept Product terms and condition</label><br></br>
                        </div>

                    </div>) :
                    (
                        <div id="verify-section" class="email-verification">
                            <div class='box'>
                                <p className='text-heading'>Account  notice</p>
                            </div>
                        </div>
                    )}
                <div >
                    <button disabled={taxInfoButtonDisabled || isAccountInfoUpdated || isProfileInfoUpdated || isTaxInfoUpdated || isChecked}
                        className={taxInfoButtonDisabled || isAccountInfoUpdated || isProfileInfoUpdated || isTaxInfoUpdated || isChecked ? 'submit-button-disabled' : 'submit-button'} onClick={() => handleCreateAccount()}>
                        Create Account
                    </button>
                </div>
            </div>
        </div>




    )

};


export default Signup;