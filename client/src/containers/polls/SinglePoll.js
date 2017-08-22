import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Poll from './pollContainers/Poll'
import {
  fetchOnePoll,
  incrementVote,
} from '../../modules/allPolls'

class SinglePoll extends Component {

  constructor(props) {
    super(props)

    this.state = {
      poll: null,
      message: 'loading',
      error: null,
      voted: false,
    }

    const { socket, incrementVote } = this.props

    socket.on('pollUpdate', data => {
      incrementVote(data)
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
    if (voted.includes(id)) {
      this.setState({voted: true})
    }
  }

  componentWillReceiveProps(nextProps) {
    const {polls} = nextProps
    const {id} = nextProps.match.params
    const poll = polls[id]
    if (poll) {
      this.setState({poll, message: null})
    } else {
      this.setState({message: 'no such poll'})
    }
  }

  handleVote(optId) {
    const pollId = this.props.match.params.id
    const userId = this.props.auth.id
    const voted = JSON.parse(localStorage.getItem('krewll-vote')) || []
    if (voted.includes(pollId)) {
      this.setState({error: 'You have already cast a vote. Click to see results'})
    } else {
      voted.push(pollId)
      localStorage.setItem('krewll-vote', JSON.stringify(voted))
      this.props.socket.emit('increment', {poll: pollId, opt: optId})
      this.setState({voted: true})
    }
  }

  render() {

    const {poll, error, voted} = this.state
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
            />
            {error
              ? <Link to={`${path}/results`}>{error}</Link>
              : null
            }
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
  incrementVote,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePoll)
