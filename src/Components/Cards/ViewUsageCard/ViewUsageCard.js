import {
    Tile,
    Link,
  } from '@carbon/react';
  import { Warning } from '@carbon/react/icons';
import '../ViewUsageCard/ViewUsageCard.scss'
export const ViewUsageCard=()=>{
    return(
        <div className='dashboard-tile'>
            <div className='bynar-tile-header' style={{ 'height': '1rem', 'width': '100%' }} >
              <h5 style={{ 'maxWidth': 'fit-content', 'float': 'left' }} ><strong>Usage</strong></h5>
              <Link style={{ 'float':'right' }} >View all</Link>
            </div>
            <br/>
            <div className='bynar-tile-content-area' >
              <Warning size='100' style={{ 'margin': 'auto', 'color': 'cornflowerblue' }} />
              <p>This widget can't be loaded at this time. Refresh the page to try again.</p>
            </div>
          </div>
    )
}