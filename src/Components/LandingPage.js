//================================== Import Dependencies ====================>
import React, {Component} from 'react';
import '../Components/LandingPage.css';
import {Link} from 'react-router-dom';

//================================== Define Landing Page Component ====================>

export default class LandingPage extends Component {

  render() {

    return (
      <main className='landing-page-container'>
        <header>
          LinkLib Audio
        </header>
        <div className='lp-sub-header'>
          Cache and Share your Favorite Podcasts, Lectures, Talks, and more
        </div>
          <div className='lp-buttons'>
          <Link to='/login' className='link-dress'>
          <button className='login-btn'>
            Login
          </button>
            </Link>
          <Link className='link-dress' to='/register'>
          <button className='register-btn'>
            Register
          </button>
            </Link>
        </div>
        <section className='lp-how-it-works-container'>
            <img alt='Linklib Main display Screenshot' src='img/fullscreen.png'/>
            <header className='how-it-works-header'>
              Sign up for Free, then start adding your favorite audio!
            </header>
            <p>Link Lib allows you to submit publicly hosted links to MP3 audio which can be saved and played back in your browser. Consider it your personal cache of lectures, talks, and all sorts of other audio you might want to save or share!</p>
            <img alt='Linklib Main display Screenshot' src='img/addaudio.png'/>
            <br/>
            
        </section>
      </main>
      
    )
  }

}