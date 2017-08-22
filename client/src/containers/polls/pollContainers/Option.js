import React from 'react'
import {ListGroupItem} from 'react-bootstrap'

export const Option = (props) => {
  const {name, id, handleVote} = props
  return (
    <ListGroupItem onClick={() => handleVote(id)}>
      {name}
    </ListGroupItem>
  )
}
