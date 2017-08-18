import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchOnePoll,
  incrementVote,
} from '../../modules/allPolls'

class SinglePoll extends Component {

  constructor(props) {
    super(props)

    this.state = {
      question: null,
      author: null,
      options: null,
      id: null,
    }

    this.handleVote = this.handleVote.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.popState(nextProps)
  }

  componentDidMount() {
    this.popState(this.props)
  }

  popState = (props) => {
    const { id } = props.match.params
    const { polls } = props
    const currPoll = polls.find(p => p._id === id)
    if (currPoll) {
      this.setState({
        question: currPoll.question,
        author: currPoll.author,
        options: currPoll.options,
        id: currPoll._id
      })
    } else {
      this.props.fetchOnePoll(id)
    }
  }

  handleVote(event) {
    const optId = event.target.id
    const pollId = this.state.id


  }

  render() {

    const {question, author, options} = this.state

    return (
      <div>
        {question ? (
          <div>
            <div>Question: {question}</div>
            <ol>
              {options.map(o => {
                return (
                  <li key={o._id}>
                    <div>{o.name} --- votes: {o.votes || '0'}</div>
                    <button onClick={this.handleVote} id={o._id}>Vote!</button>
                  </li>)
              })}
            </ol>
            <div>Author: {author}</div>
          </div>
        ) : <div>Loading</div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  polls: state.allPolls.polls,
  fetching: state.allPolls.fetching,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOnePoll,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePoll)
