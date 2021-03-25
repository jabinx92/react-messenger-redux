import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
// import "./Signout.css"
// import { RateReviewOutlined } from '@material-ui/icons'
// import { SidebarChat } from './SidebarChat'
// import { useSelector } from 'react-redux'
// import { selectUser } from './features/userSlice'
import { auth } from "./firebase"

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function Signout(props) {
    const classes = useStyles();

     return (
         <div className={classes.root}>
            {console.log('this is happening')}
      <Alert onClose={() => {}}>Are you sure you want to sign out?</Alert>
      <Alert
        action={
          <Button onClick={() => auth.signOut()} color="inherit" size="small">
            Yes
          </Button>
        }
      >
        <Alert
            action={
            <Button onClick={() => auth.signOut()} color="inherit" size="small">
                Yes
            </Button>
            }
        >
        </Alert>
        Are you sure you want to sign out?
      </Alert>
    </div>
  );
}