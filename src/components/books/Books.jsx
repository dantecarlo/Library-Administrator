import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import Spinner from '../layout/spinner'

const Books = ({ books }) => {
  if (!books) return <Spinner />

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <Link to="/books/new" className="btn btn-success">
          <i className="fas fa-plus"> New Book</i>
        </Link>
      </div>

      <div className="col-md-8">
        <h2>
          <i className="fas fa-book"> Books</i>
        </h2>
      </div>

      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Title</th>
            <th>ISBN</th>
            <th>Editorial</th>
            <th>Stock</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.ISBN}</td>
              <td>{book.editorial}</td>
              <td>{book.stock}</td>
              <td>{book.stock - book.loans.length}</td>
              <td>
                <Link
                  to={`/books/show/${book.id}`}
                  className="btn btn-success btn-block"
                >
                  <i className="fas fa-angle-double-right"> More Info</i>
                </Link>

                <button type="button" className="btn btn-danger btn-block">
                  <i className="fas fa-trash-alt"> Erase Book</i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Books.propTypes = {
  firestore: PropTypes.object.isRequired,
  books: PropTypes.array
}

export default compose(
  firestoreConnect([
    {
      collection: 'books'
    }
  ]),
  connect((state, props) => ({
    books: state.firestore.ordered.books
  }))
)(Books)
