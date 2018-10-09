import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import Insert from './components/insert';
import Update from './components/update';

const client = new ApolloClient({
  uri : 'http://localhost:4000/youtubeApp'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client = {client}>
      <div>
        <h1>Hello</h1>
        <Insert />
        <Update />
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
