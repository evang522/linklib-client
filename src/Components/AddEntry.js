import React from 'react';

export default class AddEntry extends React.Component {
  
  processEntry() {
    const data = {};
    if (!this.authorInput.value || !this.titleInput.value || !this.hyperlinkInput.value || !this.descriptionInput.value) {
      console.log('prevented');
      return;
    }
    data.author=this.authorInput.value;
    data.title=this.titleInput.value;
    data.description = this.descriptionInput.value;
    data.hyperlink = this.hyperlinkInput.value; 
    this.props.createNewEntry(data);
    this.props.clearAdding()
  }

  render() {
    return(

      <div className='add-entry-overlay'>
        <div className='add-entry-container'>
          <div className='ae-header'>
            Add New Audio Entry
          </div>
          <div className='ae-forms'>
            <label htmlFor='title'>Title</label>
            <input ref={input => this.titleInput = input} id='title' className='ae-input-label'/>
            <label htmlFor='hyperlink'>Link</label>
            <input ref={input => this.hyperlinkInput = input} id='hyperlink' />
            <label htmlFor='author'>Author</label>
            <input ref={input => this.authorInput = input} id='author'/>
            <label htmlFor='description'>Description</label>
            <textarea ref={input => this.descriptionInput = input} id='description'/>


          </div>
          <div className='ae-buttons-container'>
            <button onClick={() => this.processEntry()}>Submit</button>
            <button onClick={() => this.props.clearAdding()}>Close</button>
          </div>
        </div>
      </div>
    )
  }

}