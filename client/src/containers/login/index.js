import React, { Component } from 'react'
import { push } from 'react-router-redux'
import FacebookLogin from 'react-facebook-login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Jumbotron } from 'react-bootstrap'
import {
  setLogin,
} from '../../modules/auth'

class Login extends Component {

  facebookResponse = (res) => {
    if (res.id) {
      this.props.setLogin(res)
      this.props.changePage('/polls/all')
    }
  }

  render() {
    return (
      <Jumbotron>
        <div style={{maxWidth: '350px', margin: 'auto', textAlign: 'center'}}>
          <p>Please login to create new polls</p>
          <FacebookLogin
            appId='712489788962204'
            size='metro'
            autoLoad={false}
            fields="name, email, picture"
            callback={this.facebookResponse}
            redirectUri='http://localhost:3000/polls/all'
          />
        </div>
      </Jumbotron>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (ref) => push(ref),
  setLogin,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
