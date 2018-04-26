import React, { Component } from 'react';
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import AudioCard from './Components/AudioCard';
import axios from 'axios';
import {API_URL} from './config';
import ModalPlayer from './Components/ModalPlayer';



class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      entryArr: [],
      loading:false,
      searching:false,
      currentEntry:null,
      err:false
    }

  }
  
  
  componentDidMount() {
    axios({
      'url':`${API_URL}/entries`,
      method:'GET',
      headers: {
        'content-type':'application/json'
      }
    })
    .then(response => {
      this.setState({
        entryArr: response.data
      })
    })
    .catch(err => {
      this.setState({
        err:true
      })
    })
  }
  
  setCurrentEntry(id) {

  }


  render() {

    const cards = this.state.entryArr ? this.state.entryArr.map(entry => {
      return <AudioCard key={entry.id} entry={entry}/>
    }) : '';


    return (
      <div className="App">
        <ModalPlayer/>
        <div className='header'>
          <div className='header-brand-title'>
            LinkLib
          </div>
          <div className='navlinks'>
            <ul className='navlinks-ul'>
              <li className='navlinks-li'><a href='/'>Home</a></li>
              <li className='navlinks-li'><a href='/myresources'> My Audio Resources</a></li>
              <li className='navlinks-li'><a href='/search'> Search Resources</a></li>
            </ul>
          </div>
        </div>
          <main className='ac-container'>
            {cards ? cards : ''}
          </main>
      </div>
    );
  }
}

export default App;
