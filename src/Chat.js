import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import './Chat.css';
import { selectChatId, selectChatName } from './features/chatSlice';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase';
import { selectUser } from './features/userSlice';

import FlipMove from "react-flip-move";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function Chat() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);
  const messageEl = useRef(null);
  const [open, setOpen] = useState(false);
  const [website, setWebsite] = useState(false);
  const [code, setCode] = useState(false);

  const onButton = {
    background: "gainsboro",
    borderRadius: "30px",
    fontSize: "15px",
    height: "46px",
    lineHeight: "20px",
    padding: "0 25px",
    transition: "background .2s ease-in",
    width: "auto",
    color: "#3ea4fb",
  };

  const button = {
    background: "#0a7cff",
    borderRadius: "30px",
    fontSize: "15px",
    height: "46px",
    lineHeight: "20px",
    padding: "0 25px",
    transition: "background .2s ease-in",
    width: "auto",
    color: "white",
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (chatId) {
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
  }, [chatId]);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])


  const sendMessage = (e) => {
    if (input.length <= 0) {
      return;
    }
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
        <strong onClick={handleOpen} style={{ cursor: "pointer" }}>Details</strong>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"This project is created by Jonathan Won."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Thanks for checking out my project, link to my personal website and code source below!
                </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={code ? onButton : button} onMouseEnter={() => setCode(true)} onMouseLeave={() => setCode(false)} href="https://github.com/jabinx92/react-messenger-redux" color="primary" target="_blank" autoFocus>
            Code Source
                </Button>
          <Button style={website ? onButton : button} onMouseEnter={() => setWebsite(true)} onMouseLeave={() => setWebsite(false)} href="http://jonathanwon.com" target="_blank" color="primary">
            Personal Website
                </Button>
        </DialogActions>
      </Dialog>

      {/* chat messages */}
      <div className="chat__messages" ref={messageEl}>
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
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
          <SendIcon onClick={sendMessage} className='chat__mic' />
        </IconButton>
      </div>
    </div>
  )
}
