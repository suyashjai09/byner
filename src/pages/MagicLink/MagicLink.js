import React, { useState, useRef, useContext, useEffect } from 'react';
import {
    Form,
    Button,
    Heading,
    Checkbox,
    FormLabel,
    Link,
    InlineNotification,
} from '@carbon/react';
import {
    PasswordInput, TextInput, ToastNotification
} from 'carbon-components-react';
import { Loader } from '../../Components/Loader/Loader';
import { AuthContext } from '../../sdk/context/AuthContext';
import { MagicLinkPopup } from './MagicLinkPopup';
import { BaseURL } from '../../sdk/constant';
import {
    useLocation,useNavigate
} from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
import './MagicLink.scss';
export const MagicLink = () => {

    const navigate=useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const authContext = useContext(AuthContext)
    const [error, setError] = useState("");
    const [isMagicLink, setIsMagicLink] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userSignIn, setUserSignIn] = useState(false);
    const [errorNotification, setErrorNotification] = useState({});
    const [serverErrorNotification, setServerErrorNotification] = useState({});
    const [userEmail, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [serverNotification, setServerNotification] = useState(false);
    const location = useLocation();
    const { email, token } = useSearchParams();

    const emailInput = useRef(null);
    const validateEmail = (userEmail) => {
        return String(userEmail)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleEmailFormSubmit = (e) => {
        e.preventDefault();
        if (userEmail.length == 0) {
            setErrorNotification({
                title: "Email should not be blank"
            });
        }
        else if (!validateEmail(userEmail)) {
            setErrorNotification({
                title: "Enter valid email"
            });
        }
        else {
            setErrorNotification({
            })
            setServerNotification(false);
            const fetchData = async () => {

                try {
                    setLoading(true);
                    const data = {
                        email: userEmail
                    }
                    const response = await fetch(`${BaseURL}/magic-login`, {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })

                    if (response.ok) {
                        // setIsMagicLink(false);
                        setServerErrorNotification({
                            title: "Link sent to registered mail",
                            status: 'success'
                        })
                        setServerNotification(true);
                    }
                    else if (response.status === 500) {
                        setServerErrorNotification({
                            title: "Username not registered",
                            status: 'error'
                        })
                        setServerNotification(true);
                    }
                    setLoading(false);
                }
                catch (e) {
                    console.log("error");
                    setLoading(false);
                }
            }
            fetchData();

        }

    }

    const validateMagicLink = (email, magicLinkToken) => {

        const fetchData = async () => {

            try {
                setLoading(true);
                const data = {
                    email: email,
                    code: magicLinkToken,
                }

                // const response = await fetch(`${BaseURL}/verify-magic-link`, {
                //     method: 'POST',
                //     body: JSON.stringify(data),
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // })

                const response={
                    status:500,
                    ok:false
                }

                if (response.ok) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("theme", 'carbon-theme--white');
                    localStorage.setItem("lang", "english");
                    const bodyElement = document.body;
                    bodyElement.className = localStorage.getItem("theme");
                    navigate("/dashboard");
                }
                else if (response.status === 500) {
                    setError('Magic link Expired ,please retry');
                    setIsMagicLink(false);
                }
                setLoading(false);
            }
            catch (e) {
                console.log("error");
                setLoading(false);
            }
        }
        fetchData();

    }



    useEffect(() => {
        const tokenCheck = localStorage.getItem("token");
        if (tokenCheck !== null) {
            setUserSignIn(true);
        } else {
            // setUserSignIn(false);
            // setIsMagicLink(false);
            const email = searchParams.get('email');
            const magicLinkToken = searchParams.get('token');
            // console.log("ee", email, "ml", magicLinkToken,searchParams.get('token').length, "testoo")
            if (email != null && magicLinkToken != null && magicLinkToken.length===0) {
                
                validateMagicLink(email, magicLinkToken);

            }
            else if (email == null || magicLinkToken == null || magicLinkToken.length===0) {
                setIsMagicLink(false);
                setError("Enter valid magic link")
               
            }
            else if (email == null && magicLinkToken == null) {
                setIsMagicLink(true);
                
               
            }


        }
    }, [location]);

    // useEffect(() => {
    //     const email =searchParams.get('email');
    //     const magicLinkToken=searchParams.get('token');
    //     console.log("ee",email,magicLinkToken,"testoo")
    //     if(email!=null && magicLinkToken!=null){

    //     }
    //     else{

    //     }
    // }, [location])

    console.log(serverErrorNotification, serverNotification, "test")
    return (
        <>
            {userSignIn ? (
                <MagicLinkPopup />
            ) : (
                <>
                    {isMagicLink ?
                        (<div className='magiclink-container' >
                            <div className='box-container'>
                                <Form onSubmit={handleEmailFormSubmit}>
                                    <div style={{ paddingRight: '20px' }}>
                                        <Heading>Magic Link</Heading>
                                        {serverNotification ? (
                                            <div className='magiclink-notification-box'>
                                                <ToastNotification
                                                    iconDescription="describes the close button"
                                                    subtitle={serverErrorNotification?.title}
                                                    timeout={0}
                                                    title={""}
                                                    kind={serverErrorNotification?.status}
                                                />
                                            </div>
                                        ) :
                                            (
                                                <div className='magiclink-notification-box'>

                                                </div>
                                            )}
                                        <div className='login-input-wrapper' >
                                            <FormLabel className='input-label' >Enter your Email for magic link </FormLabel>
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
                                                value={userEmail}
                                                onChange={e => { setEmail(e.target.value); if (typeof errorNotification == 'object' && Object.keys(errorNotification).length !== 0) setErrorNotification({}); setErrorNotification(false) }}
                                            />
                                        </div>
                                    </div>
                                    <div className='fields-container'>
                                        {loading ?
                                            (<div className='loader-signin'>
                                                <Loader />
                                            </div>) :
                                            (<Button

                                                type="submit"
                                                iconDescription={""}
                                                size="xl"
                                                className="submit-button"
                                            >{"Continue"}</Button>)}

                                    </div>

                                </Form>
                            </div>
                        </div>) : (
                            <div className='magiclink-send-container' >
                                <div className='box-container'>
                                    <div style={{ paddingRight: '20px' }}>
                                        <p>{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                </>
            )}
        </>
    )
}