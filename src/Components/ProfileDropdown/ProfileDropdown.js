import { Popover, PopoverContent } from '@carbon/react';
import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Notification20, UserAvatar20, Switcher20, Search20,
  AppSwitcher20, User
} from '@carbon/icons-react';
import {
  HeaderGlobalAction,
  Link,
  Tile,
} from '@carbon/react';
import { ThemeModel } from '../../sdk/theme/ThemeModel';
import { AuthContext } from '../../sdk/context/AuthContext';
import { UserProfileImage } from '@carbon/ibm-products';
import { ThemeContext } from '../../sdk/theme/ThemeContext';
import {useTranslation} from "react-i18next";
import { LanguageModel } from '../../translation/LanguageModel/LanguageModel';


export const ProfileDropdown = ({ open, setOpen }) => {

  const [t, i18n] = useTranslation();
  const authContext = useContext(AuthContext)
  const theme = useContext(ThemeContext);
  const [openModel, setModelOpen] = useState(false);
  const [openLanguageModel, setLanguageModelOpen] =useState(false);
  const wrapperRef = useRef(null);
  const showProfilePanelRef = useRef(null);
  const setShowProfilePanelRef = useRef(null);
  showProfilePanelRef.current = open;
  setShowProfilePanelRef.current = setOpen;

  const handleLogout = async (e) => {
    e.preventDefault();
    const logout = await authContext.signout();
  }
  const handleLanguageChange =(e)=>{
    setLanguageModelOpen(!openLanguageModel);
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (showProfilePanelRef.current) {
          setShowProfilePanelRef.current(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef}>
      <UserAvatar20
        type="button"
        onClick={() => {
          setOpen(!open);
        }}>

      </UserAvatar20>
      {open ? (
        <Tile className="bynar-profile-settings-panel" >
          <div className='bynar-profile-info-wrapper' >
            <h4 style={{ 'width': '20rem', 'margin': 'auto' }} >
              Evin Lewis
            </h4>
            <div className='profile-info-image' >
              <UserProfileImage
                backgroundColor={'light-cyan'}
                className="example__user-profile-image"
                size={'xlg'}
                initials={"Evin Lewis"}
                tooltipText={"Evin Lewis"}
                theme={theme?.state?.currentTheme?.value === 'carbon-theme--g90'?'dark':'light'}
              />
            </div>
          </div>
          <ul style={{ 'marginTop': '1rem' }} >
            <li className='bynar-profile-settings-item' ><Link>{t('profile')}</Link></li>
            <li className='bynar-profile-settings-item' ><Link>{t('privacy')}</Link></li>
            <li className='bynar-profile-settings-item' ><Link onClick={ handleLanguageChange}>{t('change-language')}</Link></li>
            <li className='bynar-profile-settings-item' ><Link style={{ 'cursor': 'pointer' }} onClick={() => setModelOpen(!openModel)} >{t('change-theme')}</Link></li>
            <li className='bynar-profile-settings-item' ><Link onClick={handleLogout}>{t('logout')}</Link></li>
          </ul>
        </Tile>
      ) : ('')}
      <div>
        <ThemeModel openModel={openModel} setModelOpen={setModelOpen} />
      </div>
      <div>
        <LanguageModel openLanguageModel={openLanguageModel} setLanguageModelOpen={setLanguageModelOpen} />
      </div>
    </div>
  )
}