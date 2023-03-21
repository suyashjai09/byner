import {
  Modal,
  Dropdown,
} from 'carbon-components-react';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from './ThemeContext';


export const ThemeModel = React.memo(({ openModel, setModelOpen }) => {
  const [prevState, setPrevState] = useState(null)
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

  const [selectedItem,setItem] = useState(themeData[0]);
  const cancelTheme = () => {
    const bodyElement = document.body;
    bodyElement.className = prevState;
    if(bodyElement.className ==="carbon-theme--g90 bx--body--with-modal-open")
    setItem(themeData[1]);
    else 
    setItem(themeData[0]);
    setModelOpen(false);
  }
  const setTheme = (selectedItem) => {
    const bodyElement = document.body;
    setPrevState(bodyElement.className)
    bodyElement.className = selectedItem.value;   
    setItem(selectedItem);
  };

  return (
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
          selectedItem={selectedItem}
          label="Select a Carbon theme"
          titleText="Select a Carbon theme"
        />
      </div>
    </Modal>
  )
})