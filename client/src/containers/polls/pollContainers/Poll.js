import React, {Component} from 'react'
import {ListGroup, Jumbotron, ProgressBar} from 'react-bootstrap'
import {Option} from './Option'

const OptionList = (props) => {
  const {options, handleVote} = props
  return (
    <ListGroup style={{margin: '15px'}}>
      {options.map(o => {
        return <Option
                  key={o._id}
                  name={o.name}
                  id={o._id}
                  handleVote={handleVote}
                />
      })}
    </ListGroup>
  )
}

const OptionResults = (props) => {
  const {options} = props
  const totalVotes = options.reduce((acc, val) => acc + val.votes, 0)
  console.log(totalVotes)
  return (
    <div style={{maxWidth: '500px', margin: 'auto'}}>
      {options.map(o => {
        const progress = Math.round(100/totalVotes*o.votes, 2)

        return (
          <div key={o._id}>
            <b>{o.votes}</b> votes for: {o.name}
            <ProgressBar active now={progress} label={progress+'%'} />
          </div>
        )
      })}
    </div>
  )
}

class Poll extends Component {

  render() {

    const {question, author, options, handleVote, voted} = this.props

    return (
      <Jumbotron style={{padding: '15px', textAlign: 'center'}}>
        <h2>{author} asks: {question}</h2>
        {voted
          ? <OptionResults options={options} />
          : <OptionList options={options} handleVote={handleVote} />
        }
      </Jumbotron>
    )
  }

}

export default Poll