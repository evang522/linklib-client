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
import {BrowserRouter as Router, Link, Route, withRouter} from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import jsonwebtoken from 'jsonwebtoken';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      entryArr: [],
      viewPublicEntries:false,
      viewPrivateEntries:true,
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
  
  
  fetchEntries = () => {  

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
        'Authorization':`Bearer ${this.state.authToken}`
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
        'Authorization':`Bearer ${this.state.authToken}`
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

  //================================== Set Entry Views ====================>
  setPublic = () => {
    this.setState({
      viewPublicEntries:true,
      viewPrivateEntries:false
    })
  }

  setPrivate = () => {
    this.setState({
      viewPublicEntries:false,
      viewPrivateEntries:true
    })
  }




  //================================== Auth Actions ====================>
  
  register = (name,email,password,password1) => {
    this.setState({
      loading:true
    })

    if (!name || !email || !password || !password1) {
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
      name,
      email,
      password,
      password1
    }

    axios({
      url:`${API_URL}/users`,
      'method':'POST',
      headers: {
        'content-type':'application/json',
        'Authorization':`Bearer ${this.state.authToken}`
      },
      data: JSON.stringify(newUser)
    })
    .then(response => {
      this.setState({
        registered:true,
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


  login = (email, password) => {
    this.setState({
      loading:true
    })

    const loginObj = {
      email,
      password
    }


    axios({
      url:`${API_URL}/login`,
      'method':'POST',
      headers: {
        'content-type':'application/json',
        'Authorization':`Bearer ${this.state.authToken}`
      },
      data:JSON.stringify(loginObj)
    })
    .then(response => {

      localStorage.setItem('authToken', response.data.token);
      this.setState({
        authToken: response.data.token,
      }, () => {
        this.setState({
          authToken:response.data.token,
          userInfo: jsonwebtoken.decode(response.data.token),
          loading:false
        })
        this.fetchEntries();
      })
      
    })
    .catch(err => {
      this.setState({
        loading:false
      })
      console.log(err);
    })
  }

  logout = () => {
    this.setState({
      userInfo:null,
      authToken:null
    })
    localStorage.clear('authToken');
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

    const allCards = this.state.entryArr.length ? this.state.entryArr.map(entry => {
      return <AudioCard key={entry.id} entry={entry} setCurrentEntry={this.setCurrentEntry}/>
    }) : (<div className='no-cards'></div>);

 
    const myCards = this.state.entryArr.length && this.state.authToken && this.state.userInfo? this.state.entryArr.filter(entry => entry.poster === this.state.userInfo.id).map(entry => {
      return <AudioCard key={entry.id} entry={entry} setCurrentEntry={this.setCurrentEntry}/>
    }) : (<div className='no-cards'></div>);

    return (
      <div className="App">
        {this.state.loading && this.state.authToken ? <Spinner/> : ''}
        {this.state.isAdding && this.state.authToken ? <AddEntry createNewEntry={this.createNewEntry} clearSearchModal={this.clearSearchModal} clearAdding={this.clearAdding}/> : ''}
       {this.state.searchModal && this.state.authToken ? <SearchModule  clearAdding={this.clearAdding} searchEntries={this.searchEntries} clearSearchModal={this.clearSearchModal}/> : '' }
        {this.state.currentEntry ? <ModalPlayer clearCurrentEntry={this.clearCurrentEntry} entry={this.state.currentEntry[0]}/> : ''}
        <div className='header'>
          <div onClick={() => { 
                if (this.state.authToken) {
                this.fetchEntries()
                }
              }} className='header-brand-title'>
            LinkLib
          </div>
          <div className='navlinks'>
            <ul className='navlinks-ul'>
                {this.state.authToken ? 
                <div className='flex-div'>
              <li className={this.state.viewPrivateEntries && this.state.authToken ? ' navlinks-li selected-button' : 'navlinks-li'} onClick={() => this.setPrivate()}> My Entries</li>
              <li className={this.state.viewPublicEntries && this.state.authToken ? ' navlinks-li selected-button' : 'navlinks-li'} onClick={() => this.setPublic()}> Public Entries</li>
              <li className='navlinks-li' onClick ={() => this.setAdding()}> Add Audio</li>
              {/* <li className='navlinks-li'><a href='/myresources'> My Audio Resources</a></li> */}
              <li className='navlinks-li' onClick={() => this.setSearchModal()}> Search</li>4
              {this.state.authToken ? <li className='navlinks-li' onClick={() => this.logout()}> Log Out</li> : <li className='navlinks-li'><Link to='/login'>Login</Link></li> }
              </div>
              : ''}
            </ul>
          </div>
        </div>
          <Router>
            <div>
              {this.state.viewPrivateEntries ?  <PropsRoute exact path='/' component={CardList} cards={myCards} loggedIn={this.state.authToken}/> : <PropsRoute exact path='/' component={CardList} cards={allCards} loggedIn={this.state.authToken}/>  }
             
              <PropsRoute path='/login' component={Login} login={this.login} loggedIn={this.state.authToken}/>            
              <PropsRoute path='/register' component={Register} register={this.register} loggedIn={this.state.authToken} />
            </div>
          </Router>
      </div>
    );
  }
}

export default withRouter(App);
