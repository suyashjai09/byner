import { useNavigate,useLocation } from "react-router-dom";
import { useEffect,useReducer,createContext ,useMemo} from "react";
const initialState = {
  signin: ({ username, password }) =>
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
    if (state.token !== null) {
      if (location.pathname === '/signin' || location.pathname === '/') {
        navigate('/dashboard')
      }
    } else {
      if (location.pathname !== '/signin') {
        navigate('/signin')
      }
    }
  }, [location, state.token]);


  const signin = async ({ username, password }) => {
    try {
      setState({ isLoading: true, isValidLogin: false });
     // const response = await fetch(`https://w5i6csz6w9.execute-api.eu-central-1.amazonaws.com/Stage/login`, {
                //     method: 'POST',
                //     body: JSON.stringify(data),
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // })
      // const { token, name, email } = await fetch(
      //   `/login`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify({ username, password }),
      //     headers: {
      //       "Content-type": "application/json; charset=UTF-8",
      //     },
      //   }
      // ).then((res) => {
      //   const data = { token: "1235", name: "suyash", email: "xyz" }
      //  debugger;
      //   return data
      // })
      const { token,email }={ token: "12345",email: "xyz" };
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