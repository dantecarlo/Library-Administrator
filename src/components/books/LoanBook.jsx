import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import Spinner from '../layout/spinner'
import Subscribers from '../subscribers/Subscribers'
import TabSubscriber from '../subscribers/TabSubscriber'

export class LoanBook extends Component {
  state = {
    noResults: false,
    search: '',
    results: {}
  }

  readData = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  requestBook = () => {
    const subscriber = this.state.results

    subscriber.requestDate = new Date().toLocaleDateString()

    const updatedBookState = this.props.book

    updatedBookState.loans.push(subscriber)

    const { firestore, history, book } = this.props

    firestore
      .update(
        {
          collection: 'books',
          doc: book.id
        },
        updatedBookState
      )
      .then(history.push('/'))
  }

  searchSubscriber = e => {
    e.preventDefault()

    const { search } = this.state

    const { firestore } = this.props

    const subsCollection = firestore.collection('subscribers')
    const query = subsCollection.where('code', '==', search).get()

    query.then(result => {
      if (result.empty) {
        this.setState({
          noResults: true,
          results: {}
        })
      } else {
        const data = result.docs[0]
        this.setState({
          results: data.data(),
          noResults: false
        })
      }
    })
  }

  render() {
    const { book } = this.props

    if (!book) return <Spinner />

    const { noResults, results } = this.state

    const tabSubscriber = results.name ? (
      <TabSubscriber subscriber={results} />
    ) : null

    const btnRequest = results.name ? (
      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={this.requestBook}
      >
        Request book
      </button>
    ) : null

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={'/'} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Back to Books
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"> Loan Book: {book.title}</i>
          </h2>

          <div className="row justify-content-center mt-5">
            <div className="col-md-8">
              <form onSubmit={this.searchSubscriber} className="mb-4">
                <legend className="color-primary text-center">
                  Search Susbcriber by Code
                </legend>

                <div className="form-group">
                  <input
                    type="text"
                    name="search"
                    className="form-control"
                    onChange={this.readData}
                  />
                </div>
                <input
                  value="Search Subscriber"
                  type="submit"
                  className="btn btn-success btn-block"
                />
              </form>

              {tabSubscriber}
              {btnRequest}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LoanBook.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
    {
      collection: 'books',
      storeAs: 'book',
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    book: ordered.book && ordered.book[0]
  }))
)(LoanBook)
