import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import SongDetail from './components/SongDetail'

import App from './components/App'
import SongCreate from './components/SongCreate'
import SongList from './components/SongList'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import './style/style.css'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SongList} />
        </Route>
        <Route path='/songs/new' component={SongCreate} />
        <Route path='/songs/:id' component={SongDetail}/>

      </Router>

    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
