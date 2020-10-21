import { Avatar } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setChat } from './features/chatSlice';
import './SidebarChat.css'

export function Sidebarchat({id, chatName}) {
    const dispatch = useDispatch();
    
    return (
      <div 
      onclick={()=> 
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      }
       className='sidebarChat'
    >
        <Avatar />
        <div className="sidebarChat__info">
          <h3>{chatName}</h3>
          <p>Last message sent...</p>
          <small>timestamp</small>
        </div>
      </div>
    )
}
