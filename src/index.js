import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import globalReducer from './Store/reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const middlewares = [thunk]

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

    })
  : compose

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

const store = createStore(globalReducer, enhancer)

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Provider store={store}>
    <App />
    </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
