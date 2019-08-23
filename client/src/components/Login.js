import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

import Button from '@material-ui/core/Button';

const Login = (props) => {

  const [ credentials, setCredentials ] = useState({

        username: '',
        password: ''
      });


    const handleChange = e => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      });
      console.log(credentials);
    };

    const handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth()
      // make a post request to retrieve a token from the api
        .post('http://localhost:5000/api/login', credentials)
      // when you have handled the token, navigate to the BubblePage route
      .then(res => {
          localStorage.setItem('token', res.data.payload);
          props.history.push("/bubblepage")
        })
        .catch(err => {
          console.log(err.response);
          });
    };


    return(
      <div>
        <h1>Welcome to the Bubble App!</h1>
        <p>Build a login page here</p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
            type="text"
            name="username"
            placeholder="name"
            value={credentials.username}
            onChange={handleChange}
            />
          </div>
          <div>
            <input
            type="password"
            name="password"
            placeholder="password"
            value={credentials.password}
            onChange={handleChange}
            />
          </div><br />
          <Button variant='contained' color='secondary' onClick={handleSubmit}>Login</Button>
        </form>
      </div>
    );

};

export default Login;
