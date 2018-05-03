import React from 'react';
import {Redirect} from 'react-router-dom';

export default class CardList extends React.Component {


  render() {
    return (
          <main className='ac-container'>
           {this.props.loggedIn ? '' : <Redirect to='/login'/>}    
            {this.props.cards ? this.props.cards : ''}
          </main>
    )
  }
}