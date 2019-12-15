/* * * * * * * * * * * * * * * 

      BCIT COMP 2913 
        Project 2
      DYLAN TRERISE 
       19 MAR 2019

- book API from Google Books API

* * * * * * * * * * * * * * */

// import react, child components, stylesheets
import React, { Component } from 'react';
import Book from './Book';
import axios from 'axios';
import './App.css';

// the main component that will be rendered on the page
class App extends Component {

  // constructor to bind this to functions and set up state
  constructor(props) {
    super(props);

    this.state = {
      bookInput: 'ender', // set up initial search item
      bookTitles: [],
      isLoading: false
    }

    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitEmpty = this.handleSubmitEmpty.bind(this);
  }

  // controls form input field of book search item
  handleChange(e) {
    this.setState({bookInput: e.target.value});
  }

  // handles submit of search (button is pressed)
  handleSubmit(e) {
    e.preventDefault();
    this.setState({bookTitles: [], isLoading: true});
    this.getData();
  }

  // does not allow empty item to be submitted
  handleSubmitEmpty(e) {
    alert('please enter an item to search for');
    e.preventDefault();
  }

  // fetch data based on what user inputs 
  getData() {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.bookInput}`)
      .then((response) => { // if successful, save items as bookData
        const bookData = response.data.items;
        this.setState({bookTitles: bookData, isLoading: false});
      })
      .catch((error) => { // if not successful, return error
        console.error('ERROR!', error);
        this.setState({isLoading: false});
      });
  }

  // have page render with an example search once component 
  // mounts (first time app loads only)
  componentDidMount() {
    this.getData();
  }

  // what will be rendered on screen
  render() {
    // turns jsx into js
    return (
      <div className="App">
        <header className = "App-header">
          <h1>Book Search App</h1>
        </header>

        <form className = "form-style" onSubmit = {this.state.bookInput ? this.handleSubmit: this.handleSubmitEmpty}>
          <label>
            <input type="text" className = "input-style" 
              value = {this.state.bookInput} onChange = {this.handleChange}>
            </input>
          </label>
          <button type="submit">search books</button>
        </form>
        { <Book bookTitles = {this.state.bookTitles} isLoading = {this.state.isLoading}/> }
      </div>
    );
  }
}

export default App;
