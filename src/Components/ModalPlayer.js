import React from 'react';

export default class ModalPlayer extends React.Component {

  render() {


    return(
      <div className='modal-player-overlay'>
        <div className='modal-player-container'>
          <div className='mp-title'>
          </div>
          <div className='mp-player'>
          </div>
          <div className='mp-description'>
          </div>
          <div className='mp-tags'>
          </div>
        </div>
      </div>
      
    )
  }

}