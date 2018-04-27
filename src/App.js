import React, { Component } from 'react';
// import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import AudioCard from './Components/AudioCard';
import axios from 'axios';
import {API_URL} from './config';
import ModalPlayer from './Components/ModalPlayer';
import SearchModule from './Components/SearchModule';
import AddEntry from './Components/AddEntry';
import Spinner from './Components/Spinner';
import qs from 'qs';


class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      entryArr: [],
      loading:false,
      searching:false,
      currentEntry:null,
      err:false,
      searchModal:false,
      isAdding:false
    }

  }
  
  
  componentDidMount() {
    this.fetchEntries();
  }

  fetchEntries() {  

    this.setState({
      loading:true
    })

    axios({
      'url':`${API_URL}/entries`,
      method:'GET',
      headers: {
        'content-type':'application/json'
      }
    })
    .then(response => {
      this.setState({
        entryArr: response.data,
        loading:false
      })
    })
    .catch(err => {
      this.setState({
        loading:false,
        err:true
      })
    })
  }
  
  setCurrentEntry = (id) =>  {
    const currentEntry = this.state.entryArr.filter(entry => Number(entry.id) === Number(id))
    this.setState({
      currentEntry
    })
  }

  clearCurrentEntry = () => {
    this.setState({
      currentEntry:null
    })
  }

  setSearchModal() {
    this.setState({
      searchModal:true
    })
  }

  clearSearchModal = () => {
    this.setState({
      searchModal:false
    })
  }

  searchEntries = keyword => {
    this.setState({
      loading:true
    })
    const data = {'searchTerm':keyword}
    axios({
      'url':`${API_URL}/entries?${qs.stringify(data)}`,
      'method':'GET',
      headers: {
        'content-type':'application-json'
      }
    })
    .then(response => {
      this.setState({
        loading:false,
        entryArr:response.data
      })
    })
      .catch(err => {
        this.setState({
          loading:false,
          err:true
        })
      })
  }

  setAdding = () => {
    this.setState({
      isAdding:true
    })
  }

  clearAdding = () => {
    this.setState({
      isAdding:false
    })
  }

  createNewEntry = (dataObj) =>  {
    this.setState({
      loading:true
    })

    axios({
      'url':`${API_URL}/entries`,
      'method':'POST',
      headers: {
        'content-type':'application/json',
      },
      data: JSON.stringify(dataObj)
    })
    .then(response => {
      this.fetchEntries();
      this.setState({
        loading:false
      })
    })
    .catch(err => {
      this.setState({
        err,
        loading:false
      })
    })
  }

  render() {

    const cards = this.state.entryArr ? this.state.entryArr.map(entry => {
      return <AudioCard key={entry.id} entry={entry} setCurrentEntry={this.setCurrentEntry}/>
    }) : '';


    return (
      <div className="App">
        {this.state.loading ? <Spinner/> : ''}
        {this.state.isAdding ? <AddEntry createNewEntry={this.createNewEntry} clearAdding={this.clearAdding}/> : ''}
       {this.state.searchModal ? <SearchModule searchEntries={this.searchEntries} clearSearchModal={this.clearSearchModal}/> : '' }
        {this.state.currentEntry ? <ModalPlayer clearCurrentEntry={this.clearCurrentEntry} entry={this.state.currentEntry[0]}/> : ''}
        <div className='header'>
          <div className='header-brand-title'>
            LinkLib
          </div>
          <div className='navlinks'>
            <ul className='navlinks-ul'>
              <li className='navlinks-li'><a href='/'>Home</a></li>
              <li className='navlinks-li' onClick ={() => this.setAdding()}> Add Audio</li>
              {/* <li className='navlinks-li'><a href='/myresources'> My Audio Resources</a></li> */}
              <li className='navlinks-li' onClick={() => this.setSearchModal()}> Search For Audio</li>
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
