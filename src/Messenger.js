import React from 'react';
import { Chat } from './Chat';
import './Messenger.css';
import {Sidebar} from './Sidebar'

function Messenger() {
    

    return (
        <div className="messenger">
            <Sidebar />
            <Chat />
        </div>
    )
}

export default Messenger
