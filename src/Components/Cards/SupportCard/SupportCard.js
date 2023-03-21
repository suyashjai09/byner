import '../SupportCard/SupportCard.scss'
import {
    Tile,
    Link,
  } from '@carbon/react';
  import { Warning } from '@carbon/react/icons';
export const SupportCard=()=>{
    return(
        <div className='dashboard-tile'>
            <div className='bynar-tile-header' >
              <h5 style={{ 'maxWidth': 'fit-content', 'float': 'left' }} ><strong>Recent Support Cases</strong></h5>
              <Link style={{ 'float':'right' }} >View all</Link>
            </div>
            <br/>
            <div className='bynar-tile-content-area' >
            <Warning size='100' style={{ 'margin': 'auto', 'color': 'cornflowerblue' }} />
              <p>You don't have permission to manage users on this account.</p>
            </div>
          </div>
    )
}