import { IconButton } from '@material-ui/core';
import MicNoneIcon from"@material-ui/icons/MicNone";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Chat.css'
import { selectchatName } from './features/chatSlice';
import { Message } from './Message';

export function Chat(props) {
    const [input, setInput] = useState("");
    const chatName = useSelector(selectchatName);


    const sendMessage = (e) => {
        e.preventDefault();

        //Firebase
        setInput("")
    }
    

    return (
        <>
          <div className="chat">
              <div className="chat__header">
                  <h4>To: <span className="chat__name">{chatName}</span></h4>
                  <strong>Details</strong>
              </div>

              {/* chat messages */}
              <div className="chat__messages">
                  <Message/>
                  <Message/>
                  <Message/>
              </div>

              {/* chat input */}
              <div className="chat__input">
                  <form>
                  <input value={input} onChange={e => setInput(e.target.value)} placeholder="messenger" type="text" />
                  <button onClick={sendMessage}>Send Message</button>
                  </form>

                    <IconButton>
                      <MicNoneIcon className ='chat__mic' />
                    </IconButton>
              </div>
          </div>
        </>
    )
}
