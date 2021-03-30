import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Chat.css';
import { selectChatId, selectChatName } from './features/chatSlice';
import db from './firebase';
import  Message  from './Message';
import firebase from 'firebase';
import { selectUser } from './features/userSlice';
import FlipMove from "react-flip-move";


export function Chat() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId)
    const [messages, setMessages] = useState([]);

    useEffect(()=> {
        if(chatId) {
            db.collection('chats')
            .doc(chatId)
            .collection("messages")
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) =>
                setMessages(
                    snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
    ));
        }
    },[chatId])


    const sendMessage = (e) => {
        e.preventDefault();
        console.log(e)
            db.collection('chats').doc(chatId).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                uid: user.uid,
                photo: user.photo,
                email: user.email,
                displayName: user.displayName,
            })
        setInput("");
    };
    

    return (
          <div className="chat">
              <div className="chat__header">
                  <h4>
                      To: <span className="chat__name">{chatName}</span>
                  </h4>
                  <strong onClick={() => console.log('clicked')}>Details</strong>
              </div>

              {/* chat messages */}
              <div className="chat__messages">
                  <FlipMove>
                  {messages.map(({id, data}) => (
                      <Message key={id} contents={data}/>
                      ))}
                  </FlipMove>
              </div>

              {/* chat input */}
              <div className="chat__input">
                  <form>
                  <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} placeholder="messenger" 
                    type="text" 
                  />
                  <button onClick={sendMessage}>Send Message</button>
                  </form>

                    <IconButton>
                      <SendIcon onClick={sendMessage} className ='chat__mic' />
                    </IconButton>
              </div>
          </div>
    )
}
