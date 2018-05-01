import React from 'react';

export default class Landing extends React.Component {

  render() {

    return (
      <div className='login-container'>
        <div className='login-container-header'>
          Login
        </div>
        <div className='login-container-body'>
          <label for='email'>Email Address</label>
          <input id='email'/>
          <label for='password'>Password</label>
          <input id='password'/> 
          <button className='login-button'>Submit</button>
        </div>
      </div>
    )
  }
}