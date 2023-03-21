import React, { useState, useRef, useEffect, useContext } from 'react';

import {
  Heading,
  Column,
  Grid,
  Tile,
  Link,
} from '@carbon/react';

import { Warning, InformationDisabled, CloseOutline, AddAlt } from '@carbon/react/icons';
import '../Dashboard/Dashboard.scss'
import { NewsInfoCard } from '../Cards/NewsInfoCard/NewsInfoCard.js';
import { ViewUsageCard } from '../Cards/ViewUsageCard/ViewUsageCard';
import { SupportCard } from '../Cards/SupportCard/SupportCard';

const Dashboard = () => {
  return (
  <div className='bynar-dashboard'>
    <div className='bynar-heading'>
    <Heading className='heading'>
        Pkb Albania
    </Heading>
    <button className='button-dashboard'>
      Create Resource
    </button>
    </div>
    <div className='container'>
     <NewsInfoCard/>
     <ViewUsageCard/>
     <SupportCard/>
    </div>
    
  </div>);
}

export default Dashboard;