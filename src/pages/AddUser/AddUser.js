
import countrylist from "../../data/countrylist";
import { useState } from "react";
import {

    Heading,
    Link,
    InlineNotification,

} from '@carbon/react';
import {
    PasswordInput, TextInput, Select,
    SelectItem
} from 'carbon-components-react';
import { useJwt } from "react-jwt";
import 'react-telephone-input/css/default.css'
import { BaseURL } from "../../sdk/constant";
import PhoneInput from 'react-phone-input-2'
import './AddUser.scss';
const token = localStorage.getItem('token');
export const AddUser = () => {

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
    const { decodedToken, isExpired } = useJwt(token);
    if (isExpired) {
        console.log("", decodedToken)
    }
    console.log("tt", decodedToken,isExpired);
    const handleUserInfo = () => {

        const fetchData = async () => {
            try {
                // setLoadingSuccess(true);
                

                debugger;
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

                // var isExpired = false;
                // const jwt = require('jsonwebtoken');
                // var decodedToken = jwt.decode(token, { complete: true });
                // var dateNow = new Date();

                // if (decodedToken.exp < dateNow.getTime())
                //     isExpired = true;
                // debugger;
                // const response = await fetch(`${BaseURL}/user`, {
                //     method: 'POST',
                //     body: JSON.stringify(data),
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': 'Bearer ' +token
                //     },
                // })

                const response = await fetch(`${BaseURL}/list-users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                })

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
    return (
        <div className="adduser-box">
            <div className="adduser">
                <div>
                    <p>Add user</p>
                </div>
                <TextInput type="text"
                    className='text-input'
                    labelText="User name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextInput type="text"
                    labelText="Full name"
                    className='text-input'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <PasswordInput type="text"
                    labelText="Password"
                    className='text-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    className='text-input'
                    labelText="Address line 1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                />
                <TextInput type="text"
                    className='text-input'
                    labelText="Address line 1 (optional)"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                />
                <TextInput type="text"
                    labelText="City"
                    className='text-input'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <TextInput type="text"
                    labelText="State"
                    className='text-input'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <TextInput type="text"
                    labelText="Postal Code"
                    className='text-input'
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
                    <button
                        onClick={() => handleUserInfo()}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}