import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';

class Landing extends React.Component {

  render() {


    return (
      <div className='login-container'>
      {this.props.loggedIn ? <Redirect to='/'/> : ''}    
        <div className='login-container-header'>
          Login
        </div>
        <div className='login-container-body'>
          <label for='email'>Email Address</label>
          <input ref={input => this.emailInput = input} id='email'/>
          <label for='password'>Password</label>
          <input ref={input => this.passwordInput = input} id='password'/> 
          <button onClick={() => this.props.login(this.emailInput.value, this.passwordInput.value)} className='login-button'>Submit</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Landing);