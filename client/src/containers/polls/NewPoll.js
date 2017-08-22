import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  postNewPoll,
} from '../../modules/newPoll'

class NewPoll extends Component {

  constructor(props) {
    super(props)

    this.state = {
      question: '',
      options: '',
      author: this.props.auth.name || 'anonymous',
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
    const {question, options, author} = this.state
    const opts = []
    options.split(',')
      .map(o => o.trim())
      .forEach(o => opts.push({
        name: o,
        votes: 0,
      }))
    const poll = {
      question,
      author,
      options: opts
    }
    this.props.postNewPoll(poll)
      .then(data => console.log(data))
    // this.props.changePage('/polls/all')
  }

  render() {

    const {question, options, author} = this.state

    return (
      <div>
        <div>
          <label htmlFor='question'>Question: </label>
          <input
            type='text'
            name='question'
            onChange={this.handleUpdate}
            value={question}
          />
        </div>
        <div>
          <label htmlFor='options'>Options (comma split): </label>
          <input
            type='text'
            name='options'
            onChange={this.handleUpdate}
            value={options}
          />
        </div>
        <div>
          <label htmlFor='author'>Author: {this.state.author}</label>
        </div>
        <div>
          <button onClick={this.handleSubmit}>Create Poll</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (ref) => push(ref),
  postNewPoll,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPoll)
