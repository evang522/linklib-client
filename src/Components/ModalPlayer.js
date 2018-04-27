import React from 'react';

export default class ModalPlayer extends React.Component {

  playAudio() {
    document.querySelector('.player').play()
  }


  render() {


    return(
      <div className='modal-player-overlay'>
        <div className='modal-player-container'>
          <div className='mp-title'>
            {this.props.entry.title}
          </div>
          <div className='mp-author'>
            {this.props.entry.author}
          </div>
          <audio className='audio-player' controls src={this.props.entry.hyperlink} autoplay={false}/>
          <div className='mp-description'>
            {this.props.entry.description}
          </div>
          <div className='mp-tags'>
          </div>
          <button onClick={() => {
            this.props.clearCurrentEntry();
            }
          } className='close-audio-button'>
            CLOSE
          </button>
        </div>
      </div>
      
    )
  }

}