import React from 'react';
import { Chat } from './Chat';
import './Messenger.css';
import {Sidebar} from './Sidebar'

export function Messenger(props) {
    

    return (
        <div className="messenger">
            <Sidebar />
            <Chat />
        </div>
    )
}
