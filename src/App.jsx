import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import EditSubscriber from './components/subscribers/EditSubscriber'
import NewSubscriber from './components/subscribers/NewSubscriber'
import ShowSubscriber from './components/subscribers/ShowSubscriber'
import Subscribers from './components/subscribers/Subscribers'
import Navbar from './components/layout/Navbar'
import Books from './components/books/Books'
import ShowBook from './components/books/ShowBook'
import NewBook from './components/books/NewBook'
import EditBook from './components/books/EditBook'
import LoanBook from './components/books/LoanBook'
import Login from './components/auth/Login'

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/login"
              component={UserIsNotAuthenticated(Login)}
            />

            <Route exact path="/" component={UserIsAuthenticated(Books)} />
            <Route
              exact
              path="/books/show/:id"
              component={UserIsAuthenticated(ShowBook)}
            />
            <Route
              exact
              path="/books/new"
              component={UserIsAuthenticated(NewBook)}
            />
            <Route
              exact
              path="/books/edit/:id"
              component={UserIsAuthenticated(EditBook)}
            />
            <Route
              exact
              path="/books/loanBook/:id"
              component={UserIsAuthenticated(LoanBook)}
            />

            <Route
              exact
              path="/subscribers"
              component={UserIsAuthenticated(Subscribers)}
            />
            <Route
              exact
              path="/subscribers/new"
              component={UserIsAuthenticated(NewSubscriber)}
            />
            <Route
              exact
              path="/subscribers/show/:id"
              component={UserIsAuthenticated(ShowSubscriber)}
            />
            <Route
              exact
              path="/subscribers/edit/:id"
              component={UserIsAuthenticated(EditSubscriber)}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
