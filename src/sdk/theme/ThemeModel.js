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

  const [selectedItem, setItem] = useState(localStorage.getItem("theme") ==="carbon-theme--white"?themeData[0]:themeData[1]);
  const handleTheme = () => {
    const bodyElement = document.body;
    bodyElement.className = selectedItem.value;
    if (selectedItem.value === "carbon-theme--g90") {
      setItem(themeData[1]);
      localStorage.setItem("theme", themeData[1].value)
    }
    else if (selectedItem.value === "carbon-theme--white") {
      setItem(themeData[0]);
      localStorage.setItem("theme", themeData[0].value)
    }
    setModelOpen(false);
  }

  const cancelTheme = () => {
    const bodyElement = document.body;
    const currentTheme = localStorage.getItem("theme");
    if (selectedItem.value !== currentTheme) {
      if (currentTheme === "carbon-theme--g90") {
        setItem(themeData[1]);
        localStorage.setItem("theme", themeData[1].value)
        bodyElement.className = themeData[1].value;
      }
      else {
        setItem(themeData[0]);
        localStorage.setItem("theme", themeData[0].value)
        bodyElement.className = themeData[0].value;
      }
    }
    setModelOpen(false);
  }
  const setTheme = (selectedItem) => {
    const bodyElement = document.body;
    bodyElement.className = selectedItem.value;
    setItem(selectedItem);
  };

  return (
    <Modal
      primaryButtonText="Submit"
      secondaryButtonText="Cancel"
      open={openModel}
      onRequestClose={() => cancelTheme()}
      onRequestSubmit={() => handleTheme()}
    >

      <div className="carbon-theme-dropdown">
        <Dropdown
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