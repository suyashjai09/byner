import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useReducer, createContext, useMemo } from "react";
import { BaseURL } from "../constant";
const initialState = {
  signin: () =>
    Promise.resolve(null),
  signout: () => Promise.resolve(null),
  user: null,
  email: null,
  token: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
  isValidLogin: false,
}
export const AuthContext = createContext(initialState)
const { Provider, Consumer } = AuthContext;
const simpleReducer = (state, payload) => ({ ...state, ...payload });

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useReducer(simpleReducer, initialState);


  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      if (token) {
        setState({
          token,
          isLoggedIn: true,
          email,
        });
      }
    } catch (e) {
      setState({
        token: null,
        isLoggedIn: false,
        name: null,
        email: null,
      });
    } finally {
      setState({
        isFirstRender: false,
      });
    }
  }, []);

  useEffect(() => {
    const tokenCheck=localStorage.getItem("token");
    if (tokenCheck !== null) {
      if (location.pathname === '/signin' || location.pathname === '/' || location.pathname === '/forgotpassword' || location.pathname === '/signup') {
        navigate('/dashboard')
      }
    } else {
      if (location.pathname === '/' || location.pathname === '/dashboard' || location.pathname === '/datatable' || location.pathname === '/tearsheet') {
        navigate('/signin');
      }

    }
  }, [location, state.token]);


  const signin = async (data, isMfa) => {
    try {
      debugger;
      setState({ isLoading: true, isValidLogin: false });
      let endPoint = "";
      if (isMfa) {
        endPoint = "mfa";
      }
      else {
        endPoint = "login";
      }
      //  const response = await fetch(`${BaseURL}/${endPoint}`, {
      //                 method: 'POST',
      //                 body: JSON.stringify(data),
      //                 headers: {
      //                     'Content-Type': 'application/json',
      //                 },
      //             })
      //   if(response.ok){

      //   }
      const { token, name, email } = { token: "1235", name: "suyash", email: "xyz" };
      // const { token, name, email } = await fetch(
      //   `${BaseURL}/${endPoint}`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify(data),
      //     headers: {
      //       "Content-type": "application/json; charset=UTF-8",
      //     },
      //   }
      // ).then((res) => {
      //   // const data = { token: "1235", name: "suyash", email: "xyz" }
      //   const apiData=res.json()
      //    return apiData
      // }) 
      if (token) {
        setState({
          isLoggedIn: true,
          token,
          error: null,
          email,
        });
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        navigate("/dashboard");

      } else {
        setState({
          inValidLogin: true,
          isLoggedIn: false,
          token: null,
          email: null,
        });

      }
    } catch (e) {
      setState({ error: "Error logging in" });
    } finally {
      setState({ isLoading: false });
    }
  };

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/signin");
    setState({
      user: null,
      token: null,
      isLoggedIn: false,
      email: null,
    });
  };


  const providerValue = useMemo(
    () => ({
      ...state,
      signin,
      signout,
    }),
    [
      state,
      signin,
      signout,
    ]
  )
  return (
    <Provider value={providerValue}>
      {children}
    </Provider>
  )
}