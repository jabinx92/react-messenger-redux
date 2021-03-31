import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SearchIcon from '@material-ui/icons/Search';
import { RateReviewOutlined } from '@material-ui/icons';
import { SidebarChat } from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

export function Sidebar(props) {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const [filterChats, setFilteredChats] = useState([]);
  const classes = useStyles();
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
        {console.log(filterChats)}
        {filterChats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
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
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {user.displayName.split(' ').slice(0,1).join(' ')},
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Are you sure you want to sign out?
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={() => auth.signOut()} size="small" color="primary">
                Yes
              </Button>
              <Button onClick={handleClose} size="small" color="primary">
                No
              </Button>
            </CardActions>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}