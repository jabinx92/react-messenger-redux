import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import './Chat.css';
import { selectChatId, selectChatName } from './features/chatSlice';
import db from './firebase';
import  Message  from './Message';
import firebase from 'firebase';
import { selectUser } from './features/userSlice';
import FlipMove from "react-flip-move";

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




export function Chat() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);
    const messageEl = useRef(null);
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

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
    },[chatId]);

    useEffect(() => {
        if (messageEl) {
          messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])


    const sendMessage = (e) => {
        if(input.length <= 0) {
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
                <strong onClick={handleOpen} style={{cursor: "pointer"}}>Details</strong>
            </div>

            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">
                    Details Section
                    </h2>
                </div>
                </Fade>
            </Modal>

              {/* chat messages */}
              <div className="chat__messages" ref={messageEl}>
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
