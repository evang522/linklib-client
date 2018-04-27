import React from 'react';

export default class AudioCard extends React.Component {


  render() {
    const tags = this.props.entry.tags ? this.props.entry.tags.map(tag => {
      return (
        <div className='tags-label'>
        {tag}
        </div>
      )
    }) : null;

    return(
      <div className='audio-card'>
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
        <div className='ac-tags'>
          {tags ? tags : (<div className='tags-label'>No Tags</div>)}
        </div>
        <button onClick={() => this.props.setCurrentEntry(this.props.entry.id)}className='open-audio-button'>
          OPEN
        </button>
        </div>
      </div>
      
    )
  }

}