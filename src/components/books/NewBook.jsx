import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

export class NewBook extends Component {
  state = {
    title: '',
    ISBN: '',
    editorial: '',
    stock: ''
  }

  handleFormInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addBook = e => {
    e.preventDefault()

    const newBook = { ...this.state }
    newBook.loans = []
    const { firestore, history } = this.props

    firestore
      .add(
        {
          collection: 'books'
        },
        newBook
      )
      .then(() => history.push('/'))
  }

  render() {
    const { title, ISBN, editorial, stock } = this.state

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"> Go back</i>
          </Link>
        </div>

        <div className="col-12">
          <h2>
            <i className="fas fa-book"> New Book</i>
          </h2>

          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.addBook}>
                <div className="form-group">
                  <label>Title: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Title o Name of Book"
                    required
                    value={title}
                    onChange={this.handleFormInput}
                  />
                </div>

                <div className="form-group">
                  <label>ISBN: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    placeholder="ISBN"
                    required
                    value={ISBN}
                    onChange={this.handleFormInput}
                  />
                </div>

                <div className="form-group">
                  <label>Editorial: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Editorial"
                    required
                    value={editorial}
                    onChange={this.handleFormInput}
                  />
                </div>

                <div className="form-group">
                  <label>Stock: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="stock"
                    placeholder="Stock o Name of Book"
                    required
                    value={stock}
                    onChange={this.handleFormInput}
                  />
                </div>

                <input
                  type="submit"
                  value="Add Book"
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

NewBook.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NewBook)
