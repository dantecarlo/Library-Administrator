import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'

import Spinner from '../layout/spinner'

const Subscribers = ({ subscribers }) => {
  if (!subscribers) return <Spinner />

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <Link to={'/subscribers/new'} className="btn btn-primary">
          <i className="fas fa-plus"> New Subscriber</i>
        </Link>
      </div>
      <div className="col-md-8">
        <h2>
          <i className="fas fa-users">Subscribers</i>
        </h2>
      </div>

      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Name</th>
            <th>Carrier</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {subscribers.map(subscriber => (
            <tr key={subscriber.id}>
              <td>
                {subscriber.name} {subscriber.lastName}
              </td>
              <td>{subscriber.career}</td>
              <td>
                <Link
                  to={`/subscribers/show/${subscriber.id}`}
                  className="btn btn-success btn-block"
                >
                  <i className="fas fa-angle-double-right"> More Info</i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default compose(
  firestoreConnect([
    {
      collection: 'subscribers'
    }
  ]),
  connect((state, props) => ({
    subscribers: state.firestore.ordered.subscribers
  }))
)(Subscribers)
