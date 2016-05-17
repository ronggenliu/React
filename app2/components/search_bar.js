import React, { Component } from 'react';

/*
  Searchs for cusips. Performs a like search
*/
class SearchBar extends Component{
  constructor(props) {
    super(props);
    this.state = { term : ''};
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event){
    this.setState({ term: event.target.value});
  }

  onFormSubmit(event){
    event.preventDefault();

    //calls methos on the parent component
    this.props.onSearchTermChange(this.state.term);

  }

  render(){
    return (
      <form onSubmit={this.onFormSubmit} className="input-group sme-search-bar">
        <input
          placeholder="Enter security cusip here....! "
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange} />
        <div className="input-group-btn">
          <button type="submit" className="btn btn-secondary swap-search-button">submit search</button>
        </div>
      </form>
    );
  }
}

export default SearchBar;
