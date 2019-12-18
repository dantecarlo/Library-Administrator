import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import Spinner from '../layout/spinner'
import Subscribers from '../subscribers/Subscribers'
import TabSubscriber from '../subscribers/TabSubscriber'

// Redux Actions
import { searchSubscriber } from '../../actions/searchSubscriberActions'
export class LoanBook extends Component {
  state = {
    noResults: false,
    search: ''
  }

  readData = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  requestBook = () => {
    const { user: subscriber } = this.props
    console.log(subscriber)
    subscriber.requestDate = new Date().toLocaleDateString()

    const loanBooks = [...this.props.book.loans, subscriber]

    const book = { ...this.props.book }
    book.loans = loanBooks
    console.log(book)

    const { firestore, history } = this.props

    firestore
      .update(
        {
          collection: 'books',
          doc: book.id
        },
        book
      )
      .then(history.push('/'))
  }

  searchSubscriber = e => {
    e.preventDefault()

    const { search } = this.state

    const { firestore, searchSubscriber } = this.props

    const subsCollection = firestore.collection('subscribers')
    const query = subsCollection.where('code', '==', search).get()

    query.then(result => {
      if (result.empty) {
        searchSubscriber({})

        this.setState({
          noResults: true
        })
      } else {
        const data = result.docs[0]
        searchSubscriber(data.data())

        this.setState({
          noResults: false
        })
      }
    })
  }

  render() {
    const { book } = this.props

    if (!book) return <Spinner />

    const { user } = this.props

    const tabSubscriber = user.name ? <TabSubscriber subscriber={user} /> : null

    const btnRequest = user.name ? (
      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={this.requestBook}
      >
        Request book
      </button>
    ) : null

    const { noResults } = this.state
    const noResultsMsg = noResults ? (
      <div className="alert alert-danger text-center font-weight-bold">
        No Results
      </div>
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

              {noResultsMsg}
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
  connect(
    ({ firestore: { ordered }, user }, props) => ({
      book: ordered.book && ordered.book[0],
      user: user
    }),
    { searchSubscriber }
  )
)(LoanBook)
