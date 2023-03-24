import React, { useState,useEffect } from 'react';
import {
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction
} from 'carbon-components-react';
import HeaderContainer from "carbon-components-react/lib/components/UIShell/HeaderContainer";
import {
  Notification20,Search20
} from '@carbon/icons-react';
import { Navbar } from '../Navbar/Navbar';
import { NotificationPanel } from '../NotificationPanel/NotificationPanel';
import { sampleData } from '../NotificationPanel/NotificationData';
import '../../sdk/theme/Themes.scss'
import { ProfileDropdown } from '../ProfileDropdown/ProfileDropdown';
import Dashboard from '../Dashboard/Dashboard';
import { Outlet } from 'react-router-dom';
export const CommonHeader = () => {
  return (
    <div >
      <HeaderContainer
        render={HeaderComponent}
      />
    </div>
  );
};


const HeaderComponent = ({ isSideNavExpanded, onClickSideNavExpand }) => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const [notificationsData, setNotificationsData] = useState(sampleData);
  return (
    <>
      <Header aria-label="IBM Platform Name">
        <HeaderMenuButton
          aria-label="Open menu"
          isCollapsible
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName prefix="IBM">Platform</HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Search" onClick={() => { }}>
            <Search20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Notifications" onClick={() => setOpen(!open)}>
            <Notification20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="User" >
            <ProfileDropdown open={profileDropdown} setOpen={setProfileDropdown} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
        <Navbar isSideNavExpanded={isSideNavExpanded} onClickSideNavExpand={onClickSideNavExpand} />
        {/* <SideNav aria-label="Side navigation"
          isPersistent={false}
          expanded={isSideNavExpanded}
        >
          <SideNavItems>
            <SideNavMenu renderIcon={Search20} title="Category title">
              <SideNavMenuItem
                aria-current="page"
                href="javascript:void(0)"
              >

                Link
              </SideNavMenuItem>
              <SideNavMenuItem href="javascript:void(0)">
                Link
              </SideNavMenuItem>
            </SideNavMenu>
            <SideNavMenu renderIcon={Fade16} title="Category title1">
              <SideNavMenuItem
                aria-current="page"
                href="javascript:void(0)"
              >
                Link
              </SideNavMenuItem>
              <SideNavMenuItem href="javascript:void(0)">
                Link
              </SideNavMenuItem>
            </SideNavMenu>
            <SideNavMenu renderIcon={Fade16} title="Category title2">
              <SideNavMenuItem
                aria-current="page"
                href="javascript:void(0)"
              >
                Link
              </SideNavMenuItem>
              <SideNavMenuItem href="javascript:void(0)">
                Link
              </SideNavMenuItem>
            </SideNavMenu>
            <SideNavMenu renderIcon={Fade16} title="Category title3">
              <SideNavMenuItem
                aria-current="page"
                href="javascript:void(0)"
              >
                Link
              </SideNavMenuItem>
              <SideNavMenuItem href="javascript:void(0)">
                Link
              </SideNavMenuItem>
            </SideNavMenu>
          </SideNavItems>
        </SideNav> */}
      </Header>
      <Outlet />

      <div className="main--content">
        <NotificationPanel open={open} setOpen={setOpen} setNotificationsData={setNotificationsData} notificationsData={notificationsData} />
      </div>
    </>
  )
}
