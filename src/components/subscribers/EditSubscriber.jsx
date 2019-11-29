import React, { Component, createRef } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import Spinner from '../layout/spinner'

export class EditSubscriber extends Component {
  nameInput = createRef()
  lastNameInput = createRef()
  careerInput = createRef()
  codeInput = createRef()

  editSubscriber = e => {
    e.preventDefault()

    const editedSubscriber = {
      name: this.nameInput.current.value,
      lastName: this.lastNameInput.current.value,
      career: this.careerInput.current.value,
      code: this.codeInput.current.value
    }

    const { subscriber, firestore, history } = this.props

    firestore
      .update(
        {
          collection: 'subscribers',
          doc: subscriber.id
        },
        editedSubscriber
      )
      .then(history.push('/subscribers'))
  }

  render() {
    const { subscriber } = this.props
    if (!subscriber) return <Spinner />

    const { name, lastName, career, code } = subscriber

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={'/subscribers'} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Back to Subscribers
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-user"> Edit Subscriber</i>
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.editSubscriber}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name of Subscriber"
                    required
                    ref={this.nameInput}
                    defaultValue={name}
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
                    ref={this.lastNameInput}
                    defaultValue={lastName}
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
                    ref={this.careerInput}
                    defaultValue={career}
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
                    ref={this.codeInput}
                    defaultValue={code}
                  />
                </div>

                <input
                  type="submit"
                  value="Edit Subscriber"
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

EditSubscriber.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
    {
      collection: 'subscribers',
      storeAs: 'subscriber',
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    subscriber: ordered.subscriber && ordered.subscriber[0]
  }))
)(EditSubscriber)
