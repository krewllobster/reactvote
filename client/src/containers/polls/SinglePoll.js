import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Poll from './pollContainers/Poll'
import {
  fetchOnePoll,
  upsertPoll,
} from '../../modules/allPolls'


class SinglePoll extends Component {

  constructor(props) {
    super(props)

    this.state = {
      poll: null,
      message: 'loading',
      error: null,
      voted: false,
      votedFor: null,
    }

    const { socket, upsertPoll } = this.props

    socket.on('pollUpdate', data => {
      upsertPoll(data)
    })

    this.handleVote = this.handleVote.bind(this)
  }

  componentWillMount() {
    const {polls} = this.props
    const {id} = this.props.match.params
    const poll = polls[id]

    if(!poll) {
      this.props.fetchOnePoll(id)
    } else {
      this.setState({poll, message: null})
    }

    const voted = JSON.parse(localStorage.getItem('krewll-vote')) || []
    const didvote = voted.find(i => i.id === id)
    if (didvote) {
      this.setState({voted: true, votedFor: didvote.option})
    }
  }

  componentWillReceiveProps(nextProps) {
    const {polls} = nextProps
    const {id} = nextProps.match.params
    const poll = polls[id]
    if (poll) {
      this.setState({poll, message: null})
    } else {
      this.setState({message: 'This poll has been deleted'})
    }
  }

  handleVote(optId) {
    const pollId = this.props.match.params.id
    const userId = this.props.auth.id
    const {options} = this.state.poll
    const votedFor = options.find(o => o._id === optId).name
    const voted = JSON.parse(localStorage.getItem('krewll-vote')) || []
    voted.push({id: pollId, option: votedFor})
    localStorage.setItem('krewll-vote', JSON.stringify(voted))
    this.props.socket.emit('increment', {poll: pollId, opt: optId})
    this.setState({voted: true, votedFor})
  }

  render() {

    const {poll, error, voted, votedFor} = this.state
    const path = this.props.location.pathname
    const {question, options, author} = poll || false

    return (
      <div>
        {poll ? (
          <div>
            <Poll
              question={question}
              author={author}
              options={options}
              handleVote={this.handleVote}
              voted={voted}
              votedFor={votedFor}
            />
          </div>
        ) : <div>{this.state.message}</div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  polls: state.allPolls.polls,
  fetching: state.allPolls.fetching,
  auth: state.auth,
  userId: state.allPolls.userId,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOnePoll,
  upsertPoll,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePoll)
