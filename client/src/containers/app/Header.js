import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout, setLogin } from '../../modules/auth'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class Header extends Component {

  componentWillMount() {
    if (!this.props.auth.id) {
      const storedAuth = JSON.parse(localStorage.getItem('krewll-vote-login'))
      if (storedAuth) {
        this.props.setLogin(storedAuth)
      }
    }
  }

  logout = () => {
    this.props.logout()
    this.props.changePage('/login')
  }

  navItems = (authed, chpg) => {
    if (authed) {
      return [
        {text: 'All Polls', onClick: () => chpg('/polls/all')},
        {text: 'New Poll', onClick: () => chpg('/polls/new')},
        {text: 'Logout', onClick: () => this.logout()}
      ]
    } else {
      return [
        {text: 'All Polls', onClick: () => chpg('/polls/all')},
        {text: 'Login', onClick: () => chpg('/login')}
      ]
    }
  }

  render() {
    const {changePage} = this.props
    const {authed} = this.props.auth
    const navItems = this.navItems(authed, changePage)
    return (
      <Navbar staticTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            Krewll-Vote
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {navItems.map(i => {
              return (
                <NavItem key={i.text} onClick={i.onClick}>
                  {i.text}
                </NavItem>
              )
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (ref) => push(ref),
  setLogin,
  logout,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
