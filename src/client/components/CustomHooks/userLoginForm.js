import React, {useState} from 'react';

const userLoginForm = (callback) => {
  const [inputs, setInputs] = useState({});
  const handleLogin = (event) => {
    if (event) {
      event.preventDefault();
    }
  }
  const handleLoginInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  return {
    handleLogin,
    handleLoginInputChange,
    inputs
  };
}

export {userLoginForm};