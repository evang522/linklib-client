import React from 'react';
import Audio from 'react-audioplayer';
import ReactDOM from 'react-dom';

export default class ModalPlayer extends React.Component {

  playAudio() {
    document.querySelector('.player').play()
  }

  onClose() {
    ReactDOM.findDOMNode(this.audioComponent).dispatchEvent(new Event('audio-pause'));
  }


  render() {
    console.log(this.props, 'PROPS');

    const playlist = [
      {
      name: this.props.entry.title,
      src: this.props.entry.hyperlink
      }
    ];

    return(
      <div className='modal-player-overlay'>
        <div className='modal-player-container'>
          <div className='mp-title'>
            {this.props.entry.title}
          </div>
          <div className='mp-author'>
            {this.props.entry.author}
          </div>
          <div className='mp-player'>
              <Audio
                width={1200}
                height={500}
                autoPlay={false}
                playlist={playlist}
                ref={audioComponent => { this.audioComponent = audioComponent; }}
              />
          </div>
          <div className='mp-description'>
            {this.props.entry.description}
          </div>
          <div className='mp-tags'>
          </div>
          <button onClick={() => {
            this.props.clearCurrentEntry();
            this.onClose();
            }
          } className='close-audio-button'>
            CLOSE
          </button>
        </div>
      </div>
      
    )
  }

}