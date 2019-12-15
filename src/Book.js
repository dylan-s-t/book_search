// import react, loading image, style sheet (shared)
import React, { Component } from 'react';
import './App.css';
import loadingImage from './assets/loading.gif';

// child component that is a list of books returned by 
// Google's book api
class Book extends Component {
  constructor(props) {
    super(props);

    this.bookClick = this.bookClick.bind(this);
  }
  
  // event handler that opens link to book info page when
  // book title is clicked
  bookClick(book) {
    //console.log(book);
    //console.log(book.volumeInfo.infoLink);
    const bookURL = book.volumeInfo.infoLink;
    window.open(bookURL);
  }

  // html that is rendered in component
  render() {
    // turns jsx into js
    return (
      <div>
        <h2>Book List</h2>
        { this.props.isLoading && 
          (<div>
             <img src={loadingImage} alt = 'book list is loading'/>
          </div>)
        }
        {/* shows book list if search returns something */}
        { 
          this.props.bookTitles ? (
          <div>
            {<ul className = 'list-style'>
              {this.props.bookTitles.map(book => (
                <li key={book.id}>
                  <span className = 'book-details book-title' onClick = {() => this.bookClick(book)}> {book.volumeInfo.title}</span>
                  <br/>
                  {book.volumeInfo.imageLinks && 
                    <img src = {book.volumeInfo.imageLinks.thumbnail} alt = {book.volumeInfo.title}/>
                  }
                  { book.volumeInfo.description ? 
                    <span className = 'book-details'>{book.volumeInfo.description}</span>:
                    <p className = 'book-details no-info'>(description not available)</p>
                  }
                  <br/>
                  { book.volumeInfo.categories ? 
                    <span className = 'book-details'>Categories: {book.volumeInfo.categories}</span>:
                    <p className = 'book-details no-info'>(categories not available)</p>
                  }
                </li>
              ))}
            </ul>}
          </div>) :
          (<p>sorry, that search did not return anything</p>)
        }
      </div>
    );
  }
}

export default Book;
