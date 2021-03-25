import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import SearchIcon from '@material-ui/icons/Search'
import { RateReviewOutlined } from '@material-ui/icons'
import { SidebarChat } from './SidebarChat'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import db, { auth } from "./firebase"

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

export function Sidebar(props) {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      db.collection('chats').onSnapshot(snapshot => (
        setChats(snapshot.docs.map( doc => ({
          id: doc.id,
          data: doc.data(),
        })))
      ))
    }, [])

    const addChat = () => {
      const chatName = prompt('Please enter a chat name');
      if(chatName){
        db.collection('chats').add({
          chatName: chatName
        })
      }
    }

    return (
    <div className="sidebar">
      <div className="sidebar__header">
        {/* <Avatar onClick={() => auth.signOut()} src={user.photo} className='sidebar__avatar'/> */}
        <Avatar onClick={handleOpen} src={user.photo} className='sidebar__avatar'/>
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="Search"/>
        </div>
          <IconButton variant='outlined' className='sidebar__inputButton'>
            <RateReviewOutlined onClick={addChat}/>
          </IconButton>
      </div>

      <div className="sidebar__chats">
          {chats.map(({id, data: {chatName}}) => (
            <SidebarChat key={id} id={id} chatName={chatName}/>
          ))}
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
              <h2 id="transition-modal-title">Are you sure you want to sign out?</h2>
              <p id="transition-modal-description" onClick={() => auth.signOut()}>Yes</p>
              <p id="transition-modal-description" onClick={handleClose}>No</p>

            </div>
          </Fade>
        </Modal>
      </div>
    )
}
