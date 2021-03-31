import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SearchIcon from '@material-ui/icons/Search';
import { RateReviewOutlined } from '@material-ui/icons';
import { SidebarChat } from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function Sidebar(props) {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const [filterChats, setFilteredChats] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    db.collection('chats').onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    db.collection('chats').onSnapshot((snapshot) =>
    setFilteredChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const addChat = () => {
    const chatName = prompt('Please enter a chat name');
    if (chatName) {
      db.collection('chats').add({
        chatName: chatName,
      });
    }
  };

  const searchFunction = (e) => {
    setSearch(e);
    const filtered = chats.filter(chat => {
      return chat.data.chatName.toLowerCase().includes(e.toLowerCase())
    });
    setFilteredChats(filtered);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={handleOpen}
          src={user.photo}
          className="sidebar__avatar"
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => searchFunction(e.target.value)}
          />
        </div>
        <IconButton variant="outlined" className="sidebar__inputButton">
          <RateReviewOutlined onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {filterChats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`${user.displayName.split(' ').slice(0,1).join(' ')},`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => auth.signOut()} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}