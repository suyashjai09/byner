import React, { createContext, useEffect, useReducer } from 'react';



export const ThemeContext = createContext();

const themeData = [
  {
    text: 'White',
    value: 'carbon-theme--white',
  },
  {
    text: 'Gray 90',
    value: 'carbon-theme--g90',
  }
];

const initialState = {
  currentTheme: themeData[0], 
}

const themeReducer = (state, action) => {
  switch (action.type.value) {
    case 'carbon-theme--white':
      return { currentTheme: action.type };
    case 'carbon-theme--g90':
      return { currentTheme: action.type };
    default:
      return state;
  }
};

export const ThemeProvider=(props)=> {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    dispatch({type: themeData[0]})
  }, [])
  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {
        // eslint-disable-next-line react/prop-types
        props.children
      }
    </ThemeContext.Provider>
  );
}
