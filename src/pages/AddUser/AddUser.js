
import countrylist from "../../data/countrylist";
import { useState, useRef } from "react";
import {
    PasswordInput, TextInput, Select,
    SelectItem
} from 'carbon-components-react';
import 'react-telephone-input/css/default.css'
import { BaseURL } from "../../sdk/constant";
import PhoneInput from 'react-phone-input-2'
import './AddUser.scss';

export const AddUser = () => {

    const token = localStorage.getItem('token');
    const [country, setCountry] = useState("India");
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(0);
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorNotification, setErrorNotification] = useState({});
    const [emailErrorNotification, setEmailErrorNotification] = useState({});
    const [addressErrorNotification, setAddressErrorNotification] = useState({});
    const [passwordErrorNotification, setPasswordErrorNotification] = useState({});
    const [cityErrorNotification, setCityErrorNotification] = useState({});
    const [stateErrorNotification, setStateErrorNotification] = useState({});
    const [postalCodeErrorNotification, setPostalCodeErrorNotification] = useState({});
    const emailInput = useRef(null);
    const fullNameInput = useRef(null);
    const addressInput = useRef(null);
    const cityNameInput = useRef(null);
    const postalCodeInput = useRef(null);
    const passwordInput = useRef(null);


    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleEmailChange = (e) => {
        setUserName(e.target.value);
        if (!validateEmail(e.target.value)) {
            setEmailErrorNotification({ title: 'Username must be email' });
            emailInput.current.focus();
        }
        else {
            setEmailErrorNotification({});
        }
    }

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        if (e.target.value.length === 0) {
            setErrorNotification({ title: 'Full name should not be blank' });


        }
        else {
            setErrorNotification({});
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value === 0) {
            setPasswordErrorNotification({ title: 'Password should not be blank' })
            passwordInput.current.focus();
        }
        else {
            const uppercaseRegex = /[A-Z]/;
            const lowercaseRegex = /[a-z]/;
            const numberRegex = /[0-9]/;
            const specialcharacterRegex = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/;
            if (e.target.value.trim().length >= 8 && uppercaseRegex.test(e.target.value) && lowercaseRegex.test(e.target.value) && numberRegex.test(e.target.value) && specialcharacterRegex.test(e.target.value)) {
                return true;
            }
            else {
                setPasswordErrorNotification({ title: 'Password should contain at least 8 character,one number,one lowercase,one uppercase' })
                passwordInput.current.focus();
            }
        }
    }

    const handleAddressChange = (e) => {
        setAddressLine1(e.target.value);
        if (e.target.value.length === 0) {
            setAddressErrorNotification({ title: 'Address should not be blank' });


        }
        else {
            setAddressErrorNotification({});
        }
    }

    const handleCityChange = (e) => {
        setCity(e.target.value);
        if (e.target.value.length === 0) {
            setCityErrorNotification({ title: 'City should not be blank' });


        }
        else {
            setCityErrorNotification({});
        }
    }

    const handleState = (e) => {
        setState(e.target.value);
        if (e.target.value.length === 0) {
            setStateErrorNotification({ title: 'Full name should not be blank' });


        }
        else {
            setStateErrorNotification({});
        }
    }

    const handlePostalCode = (e) => {
       setPostalCode(e.target.value);
       if(!/^\d+$/.test(e.target.value)){
        setPostalCodeErrorNotification({ title: 'Postal should be integer' });
       }
       else if (e.target.value.length === 0) {
        setPostalCodeErrorNotification({ title: 'Postal code should not be blank' });
       }
       else if (e.target.value.length !=6) {
        setPostalCodeErrorNotification({ title: 'Postal code should be of 6 digit' });
       }
       else{
        setPostalCodeErrorNotification({ });
       }

       
    }



    const handleUserInfo = () => {

        if (false) {

            const fetchData = async () => {
                try {
                    // setLoadingSuccess(true);
                    const data = {
                        id: 0,
                        username: userName,
                        fullName: fullName,
                        country: country,
                        addressLine: addressLine1,
                        addressLine2: addressLine2,
                        city: city,
                        postalCode: parseInt(postalCode),
                        state: state,
                        phoneNumber: phoneNumber,
                        organizationName: "",
                        VAT: "",
                        organisationCountry: "",
                        isAgreementSigned: false,
                        tmpPassword: password,
                        cognito_user_groups: "",
                    }

                    const data3 = {
                        accountIDs: [51]
                    }

                    const data1 = {
                        username: "s@yopmail.com",
                        fullName: "User",
                        country: "India",
                        addressLine: "noida",
                        addressLine2: "",
                        city: "a",
                        postalCode: 85566,
                        state: "a",
                        phoneNumber: "8299785234",
                        organisationId: 26,
                        organisationAccount: 0
                    }




                    const response = await fetch(`${BaseURL}/user`, {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                    })

                    //  const response = await fetch(`https://lc7p1jn3j0.execute-api.eu-central-1.amazonaws.com/Stage/user`, {
                    //     method:'PUT',
                    //     body: JSON.stringify(data1),
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'Authorization': 'Bearer ' +token
                    //     },
                    // })




                    if (response.ok) {
                        // setMessage("account created ... moving to signin page")
                        // setTimeout(() => {

                        //     setLoadingSuccess(false);
                        //     navigate('/signin');
                        // }, [4000])
                    }
                    else if (response.status === 500) {
                        // setIsError(true)
                        // // setIsVerifyEmailError(true);
                        // // setActiveStep(1);
                        // setErrorNotification({
                        //     title: response.error
                        // })
                    }
                    // setLoadingSuccess(false);

                }
                catch (e) {
                    // setLoadingSuccess(false);
                }

            }
            fetchData();
        }
    }
    return (
        <div className="adduser-box">
            <div className="adduser">
                <div>
                    <p>Add user</p>
                </div>
                <TextInput
                    ref={emailInput}
                    type="text"
                    id="username"
                    className='text-input'
                    labelText="User name"
                    value={userName}
                    onChange={(e) => handleEmailChange(e)}
                    invalid={typeof emailErrorNotification == 'object' && Object.keys(emailErrorNotification).length !== 0}
                    invalidText={(emailErrorNotification && emailErrorNotification.title) ? emailErrorNotification.title : ""}
                />
                <TextInput

                    ref={fullNameInput}
                    type="text"
                    id="fullname"
                    labelText="Full name"
                    className='text-input'
                    value={fullName}
                    onChange={(e) => handleFullNameChange(e)}
                    invalid={typeof errorNotification == 'object' && Object.keys(errorNotification).length !== 0 && fullName.length === 0}
                    invalidText={(errorNotification && errorNotification.title && fullName.length === 0) ? "full name not be blank" : ""}
                />
                <PasswordInput type="text"
                    ref={passwordInput}
                    id="password"
                    labelText="Password"
                    className='text-input'
                    value={password}
                    onChange={(e) => handlePasswordChange(e)}
                    invalid={typeof passwordErrorNotification == 'object' && Object.keys(passwordErrorNotification).length !== 0}
                    invalidText={(passwordErrorNotification && passwordErrorNotification.title) ? passwordErrorNotification.title : ""}
                />
                <Select className='country-select-dropdown'
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
                    id="addressline"
                    className='text-input'
                    labelText="Address line 1"
                    value={addressLine1}
                    onChange={(e) => handleAddressChange(e)}
                    invalid={typeof addressErrorNotification == 'object' && Object.keys(addressErrorNotification).length !== 0}
                    invalidText={(addressErrorNotification && addressErrorNotification.title) ? addressErrorNotification.title : ""}
                />
                <TextInput type="text"
                    id="addressline1"
                    className='text-input'
                    labelText="Address line 1 (optional)"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                />
                <TextInput type="text"
                    id="city"
                    labelText="City"
                    className='text-input'
                    value={city}
                    onChange={(e) => handleCityChange(e)}
                    invalid={typeof cityErrorNotification == 'object' && Object.keys(cityErrorNotification).length !== 0}
                    invalidText={(cityErrorNotification && cityErrorNotification.title) ? cityErrorNotification.title : ""}
                />
                <TextInput type="text"
                    id="state"
                    labelText="State"
                    className='text-input'
                    value={state}
                    onChange={(e) => handleState(e)}
                    invalid={typeof stateErrorNotification == 'object' && Object.keys(stateErrorNotification).length !== 0}
                    invalidText={(stateErrorNotification && stateErrorNotification.title) ? stateErrorNotification.title : ""}
                />
                <TextInput type="text"
                    id="postalcode"
                    labelText="Postal Code"
                    className='text-input'
                    value={postalCode}
                    onChange={(e) => handlePostalCode(e)}
                    invalid={typeof postalCodeErrorNotification == 'object' && Object.keys(postalCodeErrorNotification).length !== 0}
                    invalidText={(postalCodeErrorNotification && postalCodeErrorNotification.title) ? postalCodeErrorNotification.title : ""}
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
                    <button
                        onClick={() => handleUserInfo()}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}