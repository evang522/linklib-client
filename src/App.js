import React, { Component } from 'react';
import './App.css';
import AudioCard from './Components/AudioCard';
import axios from 'axios';
import {API_URL} from './config';
import ModalPlayer from './Components/ModalPlayer';
import SearchModule from './Components/SearchModule';
import AddEntry from './Components/AddEntry';
import Spinner from './Components/Spinner';
import qs from 'qs';
import CardList from './Components/CardList';
import {BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom';
import Landing from './Components/Landing';
import jsonwebtoken from 'jsonwebtoken';

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
      isAdding:false,
      authToken:localStorage.getItem('authToken') || null,
      userInfo: localStorage.getItem('authToken') ? jsonwebtoken.decode(localStorage.getItem('authToken')) : null 
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
        'content-type':'application/json',
        'Authorization':`Bearer ${this.state.authToken}`
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
        'content-type':'application-json',
        'Authorization':this.state.authToken
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

  //================================== Auth Actions ====================>
  
  register = (firstName,email,password,password1) => {

    if (!firstName || !email || !password || !password1) {
      const err = new Error();
      err.message = 'Missing required fields';
      return this.setState({
        err
      })
    }
    if (password !== password1) {
      const err = new Error();
      err.message = 'Passwords do not match';
      return this.setState({
        err
      })
    }

    if (password.length !== password.trim().length) {
      const err = new Error();
      err.message = 'Password contains whitespace';
      return this.setState({
        err
      })
    }

    //create new user
    const newUser = {
      firstName,
      email,
      password,
      password1
    }

    axios({
      url:`${API_URL}/users`,
      'method':'POST',
      headers: {
        'content-type':'application/json'
      },
      data: JSON.stringify(newUser)
    })
    .then(response => {
      this.setState({
        registered:true
      })
    })
    .catch(err => {
      this.setState({
        err
      })
    })
  }


  login = (email, password) => {
    const loginObj = {
      email,
      password
    }


    console.log(loginObj);
    axios({
      url:`${API_URL}/login`,
      'method':'POST',
      headers: {
        'content-type':'application/json'
      },
      data:JSON.stringify(loginObj)
    })
    .then(response => {
      this.setState({
        authToken:response.data.token
      })
      localStorage.setItem('authToken', response.data.token);
      this.setState({
        authToken: response.data.token
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  logout = () => {
    this.setState({
      userInfo:null,
      authToken:null
    })
  }









  //================================== Component ====================>
  

  render() {
    const renderMergedProps = (component, ...rest) => {
      const finalProps = Object.assign({}, ...rest);
      return (
        React.createElement(component, finalProps)
      );
    }
    
    const PropsRoute = ({ component, ...rest }) => {
      return (
        <Route {...rest} render={routeProps => {
          return renderMergedProps(component, routeProps, rest);
        }}/>
      );
    }

    const cards = this.state.entryArr.length ? this.state.entryArr.map(entry => {
      return <AudioCard key={entry.id} entry={entry} setCurrentEntry={this.setCurrentEntry}/>
    }) : (<div className='no-cards'>No Audio Entries Found!</div>);


    return (
      <div className="App">
        {this.state.loading ? <Spinner/> : ''}
        {this.state.isAdding ? <AddEntry createNewEntry={this.createNewEntry} clearSearchModal={this.clearSearchModal} clearAdding={this.clearAdding}/> : ''}
       {this.state.searchModal ? <SearchModule  clearAdding={this.clearAdding} searchEntries={this.searchEntries} clearSearchModal={this.clearSearchModal}/> : '' }
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
          <Router>
            <div>
              <PropsRoute exact path='/' component={CardList} cards={cards} loggedIn={this.state.authToken}/>
              <PropsRoute path='/landing' component={Landing} login={this.login} loggedIn={this.state.authToken}/>            
            </div>
          </Router>
      </div>
    );
  }
}

export default withRouter(App);
