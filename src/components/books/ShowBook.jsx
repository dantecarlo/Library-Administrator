import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import Spinner from '../layout/spinner'

export class ShowBook extends Component {
  render() {
    const { book } = this.props

    if (!book) return <Spinner />

    const btnLoan =
      book.stock - book.loans.length > 0 ? (
        <Link
          to={`/books/loanBook/${book.id}`}
          className="btn btn-success my-3"
        >
          Loan Book
        </Link>
      ) : null

    return (
      <div>
        <div className="row">
          <div className="col-md-6 mb-4">
            <Link to="/" className="btn btn-secondary">
              <i className="fas fa-arrow-circle-left"> Back to Books</i>
            </Link>
          </div>

          <div className="col-md-6">
            <Link
              to={`/books/edit/${book.id}`}
              className="btn btn-primary float-right"
            >
              <i className="fas fa-pencil-alt"> Edit book</i>
            </Link>
          </div>
          <hr className="mx-5 w-100" />

          <div className="col-12">
            <h2 className="mb-4">{book.title}</h2>

            <p>
              <span className="font-weight-bold">ISBN: </span>
              {book.ISBN}
            </p>

            <p>
              <span className="font-weight-bold">Editorital: </span>
              {book.editorial}
            </p>

            <p>
              <span className="font-weight-bold">Stock: </span>
              {book.stock}
            </p>

            <p>
              <span className="font-weight-bold">Available: </span>
              {book.stock - book.loans.length}
            </p>

            {btnLoan}
          </div>
        </div>
      </div>
    )
  }
}

ShowBook.propTypes = {
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
)(ShowBook)
