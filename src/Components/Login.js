import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {Link } from 'react-router-dom';

class Login extends React.Component {

  render() {


    return (
      <div className='login-container'>
      {this.props.loggedIn ? <Redirect to='/'/> : ''}    
        <div className='login-container-header'>
          Login
        </div>
        <div className='login-container-body'>
          <label htmlFor='email'>Email Address</label>
          <input ref={input => this.emailInput = input} id='email'/>
          <label htmlFor='password'>Password</label>
          <input ref={input => this.passwordInput = input} type='password' id='password'/> 
          <div className='login-message'>{this.props.loginMessage ? this.props.loginMessage : ''}</div>
          <button onClick={() => this.props.login(this.emailInput.value, this.passwordInput.value)} className='login-button'>Submit</button>
          <div className='login-register-link'><Link to='/register'>Sign up for Free</Link></div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);