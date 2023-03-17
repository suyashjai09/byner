import { NotificationsPanel } from '@carbon/ibm-products';
import { OverflowMenuItem ,OverflowMenu} from 'carbon-components-react';
import React, { useState } from 'react';
const sampleData = [
    {
      id: 0,
      title: 'LogRhythm connection failure',
      description: 'LogRhythm is failing to connect, check timeout.',
    }]

export const ProfileDropdown=({open,setOpen})=>{
    return(
        <OverflowMenu>
            <OverflowMenuItem itemText="Stop app" />
    <OverflowMenuItem itemText="Restart app" />
    <OverflowMenuItem itemText="Rename app" />
    <OverflowMenuItem itemText="Clone and move app" disabled requireTitle />
    <OverflowMenuItem itemText="Edit routes and access" requireTitle />

      </OverflowMenu>
    )
}