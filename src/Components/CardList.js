import React from 'react';

export default class CardList extends React.Component {


  render() {
    console.log(this.props)
    return (
          <main className='ac-container'>
            {this.props.cards ? this.props.cards : ''}
          </main>
    )
  }
}