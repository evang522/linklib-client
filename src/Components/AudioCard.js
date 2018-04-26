import React from 'react';

export default class AudioCard extends React.Component {

  render() {

    return(
      <div className='audio-card' data-id={this.props.key}>
        <div className='ac-title'>
          {this.props.entry.title}
        </div>
        <div className='audio-card-contents'>
        <div className='ac-author'>
          {this.props.entry.author}
        </div>
        <div className='ac-description'>
          Description:
          {this.props.entry.description}
        </div>
        <div className='tags-label'>
          Tags
        </div>
        <div className='ac-tags'>
         {this.props.entry.tags ? this.props.entry.tags : 'No Tags'}
        </div>
        <button className='open-audio-button'>
          OPEN
        </button>
        </div>
      </div>
      
    )
  }

}