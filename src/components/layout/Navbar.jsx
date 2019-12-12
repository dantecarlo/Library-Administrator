import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

import { PropTypes } from 'prop-types'
export class Navbar extends Component {
  state = {
    isAuthenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    const { auth } = props
    console.log(auth)
    if (auth.uid) {
      console.log(state.isAuthenticated)
      return { isAuthenticated: true }
    } else {
      console.log(state.isAuthenticated)
      return { isAuthenticated: false }
    }
  }

  logout = () => {
    const { firebase } = this.props
    firebase.logout()
  }

  render() {
    const { isAuthenticated } = this.state
    const { auth } = this.props

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <nav className="navbar navbar-light">
          <span className="navbar-brand mb-0 h1">
            Administrador de Biblioteca
          </span>
        </nav>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          {isAuthenticated && (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={'/subscribers'} className="nav-link">
                  Subscribers
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/'} className="nav-link">
                  Books
                </Link>
              </li>
            </ul>
          )}

          {isAuthenticated && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="#!" className="nav-link">
                  {auth.email}
                </a>
              </li>

              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.logout}
                >
                  Log Out
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar)
