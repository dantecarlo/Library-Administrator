import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
export class NewSubscriber extends Component {
  state = {
    name: '',
    lastName: '',
    career: '',
    code: ''
  }

  handleFormInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addSubscriber = e => {
    e.preventDefault()

    const newSubscriber = { ...this.state }
    const { firestore, history } = this.props

    firestore
      .add(
        {
          collection: 'subscribers'
        },
        newSubscriber
      )
      .then(() => history.push('/subscribers'))
  }

  render() {
    const { name, lastName, career, code } = this.state

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={'/subscribers'} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Back to Subscribers
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user-plus"> New Subscriber</i>
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.addSubscriber}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name of Subscriber"
                    required
                    onChange={this.handleFormInput}
                    value={name}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Last Name of Subscriber"
                    required
                    onChange={this.handleFormInput}
                    value={lastName}
                  />
                </div>

                <div className="form-group">
                  <label>Career</label>
                  <input
                    type="text"
                    className="form-control"
                    name="career"
                    placeholder="Career of Subscriber"
                    required
                    onChange={this.handleFormInput}
                    value={career}
                  />
                </div>

                <div className="form-group">
                  <label>Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    placeholder="Code of Subscriber"
                    required
                    onChange={this.handleFormInput}
                    value={code}
                  />
                </div>

                <input
                  type="submit"
                  value="Add Subscriber"
                  className="btn btn-success"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

NewSubscriber.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NewSubscriber)
