import React from 'react';

export default class SearchModule extends React.Component {

  handleSearch() {
    console.log('handlesearch ran');
    if (!this.input.value) {
      return;
    }
    this.props.searchEntries(this.input.value)
    this.props.clearSearchModal()
    this.props.clearAdding()
  }

  componentDidMount() {
    document.querySelector('.sm-input-input').focus();
  }

  render() {


    return(
      <div className='search-module-overlay'>
        <div className='search-module'>
          <div className='sm-header'>
            Search for...
          </div>
          <div className='sm-input'>
            <input class='sm-input-input' ref={input => this.input = input} placeholder='Philosophy...'/>
          </div>
          <div className='search-button-container'>
          <button onClick={() => {
             this.props.clearSearchModal()
             this.props.clearAdding()
              }
             } className='search-button search-button-close'>
            CLOSE
          </button>
          <button onClick={() => this.handleSearch()} className='search-button search-button-close'>
            SEARCH
          </button>
          </div>
        </div>
      </div>
    )
  }
}