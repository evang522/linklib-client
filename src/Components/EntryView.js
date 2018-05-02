import React, { Component } from 'react';
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './EntryView.css';
import AudioCard from './AudioCard';
import ModalPlayer from './ModalPlayer';
import SearchModule from './SearchModule';
import AddEntry from './AddEntry';
import Spinner from './Spinner';
import {withRouter} from 'react-router-dom';

class EntryView extends Component {

  render() {

    const cards = this.state.entryArr.length ? this.state.entryArr.map(entry => {
      return <AudioCard key={entry.id} entry={entry} setCurrentEntry={this.setCurrentEntry}/>
    }) : (<div className='no-cards'>No Audio Entries Found!</div>);


    return (
      <div className="App">
        {this.state.loading ? <Spinner/> : ''}
        {this.state.isAdding ? <AddEntry createNewEntry={this.createNewEntry} clearSearchModal={this.clearSearchModal} clearAdding={this.clearAdding}/> : ''}
       {this.state.searchModal ? <SearchModule  clearAdding={this.clearAdding} searchEntries={this.searchEntries} clearSearchModal={this.clearSearchModal}/> : '' }
        {this.state.currentEntry ? <ModalPlayer clearCurrentEntry={this.clearCurrentEntry} entry={this.state.currentEntry[0]}/> : ''}
          <main className='ac-container'>
            {cards ? cards : ''}
          </main>
      </div>
    );
  }
}

export default withRouter(EntryView);
