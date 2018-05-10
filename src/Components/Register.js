import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';

class Register extends React.Component {

  render() {


    return (
      <div className='login-container'>
      {this.props.loggedIn ? <Redirect to='/'/> : ''}    
        <div className='login-container-header'>
          Create a New Account
        </div>
        <div className='login-container-body register-container'>
          <label htmlFor='name'>First Name</label>
          <input ref={input => this.nameInput = input} id='name'/>
          <label htmlFor='email'>Email Address</label>
          <input ref={input => this.emailInput = input} id='email'/>
          <label htmlFor='password'>Password</label>
          <input ref={input => this.passwordInput = input} id='password'/> 
          <label htmlFor='password1'>Verify Password</label>
          <input type='password' ref={input => this.password1Input = input} id='password1'/> 
          <button onClick={() => this.props.register(this.nameInput.value, this.emailInput.value, this.passwordInput.value, this.password1Input.value)} className='login-button'>Submit</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Register);