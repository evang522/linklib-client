import React from 'react';

export default class SearchModule extends React.Component {

  handleSearch() {
    if (!this.input.value) {
      return;
    }
    this.props.searchEntries(this.input.value)
    this.props.clearSearchModal()
  }

  render() {


    return(
      <div className='search-module-overlay'>
        <div className='search-module'>
          <div className='sm-header'>
            Search for...
          </div>
          <div className='sm-input'>
            <input ref={input => this.input = input} placeholder='Philosophy podcasts...'/>
          </div>
          <div className='search-button-container'>
          <button onClick={() => this.handleSearch()} className='search-button search-button-close'>
            SEARCH
          </button>
          <button onClick={() => this.props.clearSearchModal()} className='search-button search-button-close'>
            CLOSE
          </button>
          </div>
        </div>
      </div>
    )
  }
}