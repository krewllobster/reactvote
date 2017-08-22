import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Glyphicon, InputGroup, ButtonToolbar, Jumbotron, Form, FormGroup, FormControl, Button, Col} from 'react-bootstrap'
import {
  postNewPoll,
} from '../../modules/newPoll'
const shortid = require('shortid')


class NewPoll extends Component {

  constructor(props) {
    super(props)

    this.state = {
      question: '',
      options: {},
      author: this.props.auth.name || 'anonymous',
    }

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.optionUpdate = this.optionUpdate.bind(this)
    this.addOption = this.addOption.bind(this)
    this.removeOption = this.removeOption.bind(this)
  }

  componentWillMount() {
    const opts = {}
    for (let i = 0; i < 2; i++) {
      const id = shortid.generate()
      opts[id] = {value: ''}
    }
    this.setState({options: opts})
  }

  handleUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addOption() {
    const {options} = this.state
    const count = Object.keys(options).length
    const id = shortid.generate()
    this.setState({
      options: {...options, [id]: {value: ''}}
    })
  }

  removeOption(id) {
    this.setState(prevState => {
      delete prevState.options[id]
      return ({options: prevState.options})
    })
  }

  optionUpdate(event) {
    const {id, value} = event.target
    const {options} = this.state
    this.setState({
      options: {...options, [id]: {value: value}}
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const {question, options, author} = this.state
    const opts = Object.values(options).map(o => {
      return {name: o.value.trim(), votes: 0}
    })
    const poll = {
      question,
      author,
      options: opts
    }
    this.props.postNewPoll(poll)
      .then(data => {
        this.props.socket.emit('newPoll', data)
        this.props.changePage(`/polls/id/${data._id}`)
      })
  }

  render() {

    const {question, options} = this.state
    const qLength = question.trim().length === 0
    const oLength = [...Object.values(options)].some(o => {return o.value.trim().length === 0})
    return (
      <Jumbotron style={{paddingTop: '15px'}}>
        <p style={{textAlign: 'center', margin: 'auto', marginBottom: '15px'}}>Create a new poll!</p>
        <Form horizontal
          style={{maxWidth: '500px', margin: 'auto', padding: '20px'}}
          onSubmit={this.handleSubmit}
        >
          <FormGroup>
            <InputGroup>
              <InputGroup.Addon>
                <Glyphicon glyph='question-sign'/>
              </InputGroup.Addon>
              <FormControl
                type="text"
                name='question'
                placeholder='What would you like to ask?'
                value={question}
                onChange={this.handleUpdate}
              />
            </InputGroup>
          </FormGroup>
          {Object.keys(options).map((o, i) => {
            const {value} = options[o]
            const sub = Object.keys(options).length > 2
            return (
              <FormGroup key={o}>
                <InputGroup>
                  <InputGroup.Addon>
                    <b>{i+1}</b>
                  </InputGroup.Addon>
                  <FormControl type='text'
                    id={o}
                    value={value}
                    placeholder={`Option ${i + 1} here`}
                    onChange={this.optionUpdate}
                  />
                  {sub && <InputGroup.Addon
                    style={{cursor: 'pointer'}}
                    onClick={() => this.removeOption(o)}>
                      <Glyphicon glyph='minus'
                        style={{color: '#d9534f'}}
                      />
                  </InputGroup.Addon>}
                </InputGroup>
              </FormGroup>
            )
          })}
          <FormGroup>
            <InputGroup>
              <ButtonToolbar justified>
                <Button onClick={this.addOption}>
                  <Glyphicon glyph='plus' />
                  <span> Add another option</span>
                </Button>
                <Button type="submit"
                  bsStyle='success'
                  disabled={qLength || oLength}
                >
                  <Glyphicon glyph='ok-sign' />
                  <span> Ask!</span>
                </Button>
              </ButtonToolbar>
            </InputGroup>
          </FormGroup>
        </Form>
      </Jumbotron>
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

//
// {/* <div>
//   <div>
//     <label htmlFor='question'>Question: </label>
//     <input
//       type='text'
//       name='question'
//       onChange={this.handleUpdate}
//       value={question}
//     />
//   </div>
//   <div>
//     <label htmlFor='options'>Options (comma split): </label>
//     <input
//       type='text'
//       name='options'
//       onChange={this.handleUpdate}
//       value={options}
//     />
//   </div>
//   <div>
//     <label htmlFor='author'>Author: {this.state.author}</label>
//   </div>
//   <div>
//     <button
//       disabled={question.trim().length === 0 || options.length === 0}
//       onClick={this.handleSubmit}>Create Poll</button>
//   </div>
// </div> */}
