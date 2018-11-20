import React, {Component} from 'react'
import {graphql} from 'react-apollo'

//react apollo glues the data to react component
import {getBooksQuery} from '../Queries/queries'

import BookDetails from './BookDetail'

class BookList extends Component {
    state = {
        selected: null
    }
    displayBooks = () =>{
        var data = this.props.data;
        if(data.loading){
            return (<div>Loading Books..</div>)
        }
        else{
            return( data.books.map((book) =>{
                return(
                    <li onClick={(e) =>{this.setState({selected:book.id})}} key={book.id}>{book.name}</li>
                )
            })) 
        }
    }
    render() {
    
      return (
        <div>
          <ul id="book-list">
            {this.displayBooks()}
          </ul>
          <BookDetails bookId={this.state.selected} />
        </div>
      );
    }
  }
  
  export default graphql(getBooksQuery)(BookList);