import {Modal,
  Dropdown,
} from 'carbon-components-react';
import React, { useState ,useContext, useEffect,useRef} from 'react';
import { ThemeContext } from './ThemeContext';


export const ThemeModel=({openModel,setModelOpen})=>{
    
    const theme = useContext(ThemeContext);
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
      const cancelTheme =()=>{
       
        // const bodyElement = document.body;
        // if(theme.state.currentTheme ==="carbon-theme--white"){
        //     console.log("w change")
        //     bodyElement.className = themeData[1].value;
        //     // theme.dispatch({ type: themeData[1] });
        // }
        // else {
        //     console.log("grey change")
        //     bodyElement.className = themeData[0].value;
        //     //  theme.dispatch({ type: themeData[0] });
        // }
        setModelOpen(false);
      }
      const setTheme = (selectedItem) => {
        const bodyElement = document.body;
        bodyElement.className = selectedItem.value;
        theme.dispatch({ type: selectedItem });
      };
      
return(
    <Modal
    primaryButtonText="Submit"
    secondaryButtonText="Cancel"
    open={openModel}
    onRequestClose={() => cancelTheme()}
    onRequestSubmit={() => setModelOpen(false)}
    >
    
    <div className="carbon-theme-dropdown">
    <Dropdown
      direction="down"
      ariaLabel="Theme dropdown"
      id="theme-dropdown"
      items={themeData}
      itemToString={(item) => (item ? item.text : "")}
      onChange={(event) => setTheme(event.selectedItem)}
      selectedItem={theme.state.currentTheme}
      label="Select a Carbon theme"
      titleText="Select a Carbon theme"
     />
    </div>
    </Modal>
)
}