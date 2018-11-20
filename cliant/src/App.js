import React, { Component } from 'react';
import BookList from './Component/BookList'
import AddBook from "./Component/AddBook"
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
//apollo cliant setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Book Main Page</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
      
    );
  }
}

export default App;
