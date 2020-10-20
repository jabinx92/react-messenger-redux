import { Avatar } from '@material-ui/core';
import React from 'react';
import './SidebarChat.css'

export function Sidebarchat(props) {
    

    return (
    <>
      <div className='sidebarChat'>
        <Avatar />
        <div className="sidebarChat__info">
          <h3>Channel Name</h3>
          <p>Last message sent...</p>
          <small>timestamp</small>
        </div>
      </div>    
    </>
    )
}
