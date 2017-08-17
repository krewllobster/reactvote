import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAllPolls,
} from '../../modules/allPolls'

import io from 'socket.io-client'
const socket = io()

class PollList extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAllPolls()
  }

  render() {

    const {polls, fetching} = this.props

    return (
      <div>
        <h3>List of all Polls</h3>
        {fetching ? (
          <div>getting polls</div>
        ) : (
          <ul>
            {polls.map(poll => {
                return (
                  <li>{JSON.stringify(poll)}</li>
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
