import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import {Jumbotron, ListGroup, ListGroupItem} from 'react-bootstrap'
import {
  fetchAllPolls,
  upsertPoll,
} from '../../modules/allPolls'

const Polls = ({polls, changePage}) => {
  return (
    <ListGroup style={{maxWidth: '500px', margin: 'auto'}}>
      {polls.map(p => {
        return(
          <ListGroupItem
            key={p._id}
            onClick={() => changePage(`/polls/id/${p._id}`)}
          >
            {p.question}
          </ListGroupItem>
        )
      })}
    </ListGroup>
  )
}

class PollList extends Component {

  constructor(props) {
    super(props)

    const {socket, upsertPoll} = this.props

    socket.on('addPoll', data => {
      upsertPoll(data)
    })
  }

  componentWillMount() {
    this.props.fetchAllPolls()
  }

  render() {

    const {polls, fetching} = this.props
    const allPolls = Object.values(polls)

    return (
      <Jumbotron style={{paddingTop: '20px', marginTop: '0'}}>
        <h3 style={{textAlign: 'center'}}>All of the Polls!</h3>
        {fetching
          ? null
          : <Polls polls={allPolls}
            changePage={this.props.changePage}/>
        }
      </Jumbotron>
    )
  }
}

const mapStateToProps = state => ({
  polls: state.allPolls.polls,
  fetching: state.allPolls.fetching,
  auth: state.auth,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (ref) => push(ref),
  fetchAllPolls,
  upsertPoll,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollList)
