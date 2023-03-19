import { Popover, PopoverContent } from '@carbon/react';
import React, { useState ,useEffect,useRef} from 'react';
import { Notification20, UserAvatar20, Switcher20,Search20,
  AppSwitcher20,User} from '@carbon/icons-react';
  import {
    HeaderGlobalAction,
    Link,
    Tile,
  } from '@carbon/react';
import { ThemeModel } from '../../sdk/theme/ThemeModel';


export const ProfileDropdown=({open,setOpen,openModel,setModelOpen})=>{
    const wrapperRef = useRef(null);
    const showProfilePanelRef = useRef(null);
    const setShowProfilePanelRef = useRef(null);
    showProfilePanelRef.current = open;
    setShowProfilePanelRef.current = setOpen;
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
  
    return(
      <div ref={wrapperRef}>
      <UserAvatar20
        type="button"
        onClick={() => {
          setOpen(!open);
        }}>
       
      </UserAvatar20>
      {open? (
                <Tile className="bynar-profile-settings-panel" >
                  <div className='bynar-profile-info-wrapper' >
                    <h4 style={{ 'width': '20rem', 'margin': 'auto' }} >
                      Evin Lewis
                    </h4>
                    <div className='profile-info-image' >
                      <UserAvatar20 className='profile-info-image-icon'  />
                    </div>
                  </div>
                  <ul style={{ 'marginTop': '1rem' }} >
                    <li className='bynar-profile-settings-item' ><Link>Profile</Link></li>
                    <li className='bynar-profile-settings-item' ><Link>Privacy</Link></li>
                    <li className='bynar-profile-settings-item' ><Link style={{ 'cursor': 'pointer' }} onClick={() => setModelOpen(!openModel)} >Change Theme</Link></li>
                    <li className='bynar-profile-settings-item' ><Link>Logout</Link></li>
                  </ul>
                </Tile>
              ) : ('')}
    <div>
      <ThemeModel openModel={openModel} setModelOpen={setModelOpen}/>
    </div>         
    </div>
    )
}