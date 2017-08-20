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
      fetching: false,
    }

    const { socket, incrementVote } = this.props

    this.handleVote = this.handleVote.bind(this)
    socket.on('pollUpdate', data => {
      incrementVote(data)
    })
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
    if (Object.keys(polls).includes(id)) {
      this.setState({
        question: polls[id].question,
        author: polls[id].author,
        options: polls[id].options,
        id: polls[id]._id
      })
    } else if (!this.state.fetching){
      this.props.fetchOnePoll(id)
      this.setState({fetching: true})
    }
  }

  handleVote(event) {
    const optId = event.target.id
    const pollId = this.state.id
    this.props.socket.emit('increment', {poll: pollId, opt: optId})
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
  incrementVote,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePoll)
