import React, { Component, createRef } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import Spinner from '../layout/spinner'

export class EditBook extends Component {
  titleInput = createRef()
  ISBNInput = createRef()
  editorialInput = createRef()
  stockInput = createRef()

  editBook = e => {
    e.preventDefault()

    const editedBook = {
      title: this.titleInput.current.value,
      ISBN: this.ISBNInput.current.value,
      editorial: this.editorialInput.current.value,
      stock: this.stockInput.current.value
    }

    const { book, firestore, history } = this.props

    firestore
      .update(
        {
          collection: 'books',
          doc: book.id
        },
        editedBook
      )
      .then(history.push('/'))
  }

  render() {
    const { book } = this.props
    if (!book) return <Spinner />

    const { title, ISBN, editorial, stock } = book

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={'/'} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Back to Books
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"> Edit book</i>
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.editBook}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Title of book"
                    required
                    ref={this.titleInput}
                    defaultValue={title}
                  />
                </div>

                <div className="form-group">
                  <label>ISBN</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="ISBN of book"
                    required
                    ref={this.ISBNInput}
                    defaultValue={ISBN}
                  />
                </div>

                <div className="form-group">
                  <label>Editorial</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Editorial"
                    placeholder="Editorial of book"
                    required
                    ref={this.editorialInput}
                    defaultValue={editorial}
                  />
                </div>

                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="Stock"
                    placeholder="Stock of Book"
                    required
                    ref={this.stockInput}
                    defaultValue={stock}
                  />
                </div>

                <input
                  type="submit"
                  value="Edit book"
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

EditBook.propTypes = {
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
)(EditBook)
