import React, { Component } from 'react'


class NewPoll extends Component {

  constructor(props) {
    super(props)

    this.state = {
      question: '',
      options: '',
      author: '',
    }

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    console.log('submitting')
  }

  render() {

    const {question, options, author} = this.state

    return (
      <div>
        <div>
          <label for='question'>Question: </label>
          <input
            type='text'
            name='question'
            onChange={this.handleUpdate}
            value={question}
          />
        </div>
        <div>
          <label for='options'>Options (comma split): </label>
          <input
            type='text'
            name='options'
            onChange={this.handleUpdate}
            value={options}
          />
        </div>
        <div>
          <label for='author'>Author: </label>
          <input
            type='text'
            name='author'
            onChange={this.handleUpdate}
            value={author}
          />
        </div>
        <div>
          <button onClick={this.handleSubmit}>Create Poll</button>
        </div>
      </div>
    )
  }
}

export default NewPoll
