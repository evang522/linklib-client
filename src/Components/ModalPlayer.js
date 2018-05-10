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
          <audio className='audio-player' controls src={this.props.entry.hyperlink} autoPlay={false}/>
          <div className='mp-description'>
            {this.props.entry.description}
          </div>
          <div className='mp-tags'>
          </div>
          <div className='modal-player-button-cont'>
            <button onClick={() => {
              this.props.clearCurrentEntry();
              }
            } className='close-audio-button'>
              CLOSE
            </button>
            <button onClick={() => {
              this.props.deleteEntry(this.props.entry.id);
              }
            } className='close-audio-button'>
              DELETE
            </button>
          </div>
        </div>
      </div>
      
    )
  }

}