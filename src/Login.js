import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from "./firebase";
import './Login.css';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider)
        .catch((error) => alert(error.message));
    };
    return (
          <div className="login">
            <div className="login__logo">
                <img src="https://www.flaticon.com/svg/static/icons/svg/14/14579.svg" alt=""/>
                <h1>Messenger</h1>
            </div>
            <Button onClick={signIn}>Sign In</Button>
          </div>
    )
}

export default Login