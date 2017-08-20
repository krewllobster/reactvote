import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchAllPolls,
} from '../../modules/allPolls'

class PollList extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchAllPolls()
  }

  render() {

    const {polls, fetching} = this.props
    const ids = Object.keys(polls)

    return (
      <div>
        <h3>List of all Polls</h3>
        {fetching ? (
          <div>getting polls</div>
        ) : (
          <ul>
            {ids.map(id => {
                const poll = polls[id]
                return (
                  <li key={poll._id}>
                    <Link to={`/polls/id/${poll._id}`}>{poll.question}</Link>
                  </li>
                )
              })
            }
          </ul>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  polls: state.allPolls.polls,
  fetching: state.allPolls.fetching,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAllPolls,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollList)
