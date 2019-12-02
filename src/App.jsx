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
import LendBook from './components/books/LendBook'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Books} />
            <Route exact path="/books/show/:id" component={ShowBook} />
            <Route exact path="/books/new" component={NewBook} />
            <Route exact path="/books/edit/:id" component={EditBook} />
            <Route exact path="/books/lendBook" component={LendBook} />

            <Route exact path="/subscribers" component={Subscribers} />
            <Route exact path="/subscribers/new" component={NewSubscriber} />
            <Route
              exact
              path="/subscribers/show/:id"
              component={ShowSubscriber}
            />
            <Route
              exact
              path="/subscribers/edit/:id"
              component={EditSubscriber}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
