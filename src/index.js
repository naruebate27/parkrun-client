import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

import './index.css'
import { AuthProvider } from './context/AuthContext'
import * as serviceWorker from './serviceWorker'
import App from './App'
import Home from './pages/Home'
import Login from './components/Login'
import Register from './components/Register'

const client = new ApolloClient({

  uri: process.env.REACT_APP_TRACKING_GRAPHQL_CLIENT,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.error({ graphQLErrors })
      }
      if (networkError) {
        console.error({ networkError })
      }
    }),
    // authMiddleware,
    new HttpLink({
      uri: process.env.REACT_APP_API_URL,
    }),
  ]),
  cache: new InMemoryCache(),
})
ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <AuthProvider>
          <Route path="/" component={App} />
        </AuthProvider>

      </Switch>
    </ApolloProvider>
  </Router>,

  // ReactDOM.render(<App />, document.getElementById('root')),
  document.getElementById('root'),
)
serviceWorker.unregister()
