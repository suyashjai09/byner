
import countrylist from "../../data/countrylist";
import { useState } from "react";
import {
    PasswordInput, TextInput, Select,
    SelectItem
} from 'carbon-components-react';
import 'react-telephone-input/css/default.css'
import { BaseURL } from "../../sdk/constant";
import PhoneInput from 'react-phone-input-2'
import './EditUser.scss';

export const EditUser = ({userDetails}) => {


    const token = localStorage.getItem('token');
    const [country, setCountry] = useState(userDetails?.country ?? '');
    const [addressLine1, setAddressLine1] = useState(userDetails?.addressLine1 ?? '');
    const [addressLine2, setAddressLine2] = useState(userDetails?.addressLine2 ?? '');
    const [city, setCity] = useState(userDetails?.city ?? '');
    const [state, setState] = useState(userDetails?.state ?? '');
    const [postalCode, setPostalCode] = useState(userDetails?.postalCode ?? '');
    const [phoneNumber, setPhoneNumber] = useState(userDetails?.phoneNumber ?? 0);
    const [fullName, setFullName] = useState(userDetails?.fullName ?? "");
    const [userName, setUserName] = useState(userDetails?.fullName ?? "");
    
    

    const handleUserInfo = () => {

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
                    organisationId: userDetails?.organisationId,
                    organisationAccount: userDetails?.organisationAccount
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
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' +token
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
        <div className="edituser-box">
            <div className="edituser">
                <div>
                    <p>Edit user</p>
                </div>
                <TextInput type="text"
                    id="username"
                    className='text-input'
                    labelText="User name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextInput type="text"
                    id="fullname"
                    labelText="Full name"
                    className='text-input'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                    onChange={(e) => setAddressLine1(e.target.value)}
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
                    onChange={(e) => setCity(e.target.value)}
                />
                <TextInput type="text"
                    id="state"
                    labelText="State"
                    className='text-input'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <TextInput type="text"
                    id="postal-code"
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