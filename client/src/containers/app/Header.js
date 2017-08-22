import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../modules/auth'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class Header extends Component {

  logout = () => {
    this.props.logout()
    this.props.changePage('/login')
  }

  navItems = (authed) => {
    if (authed) {
      return [
        {path: '/polls/all', text: 'All Polls', onClick: null},
        {path: '/polls/new', text: 'New Poll', onClick: null},
        {path: '/login', text: 'Logout', onClick: () => this.logout()}
      ]
    } else {
      return [
        {path: '/polls/all', text: 'All Polls', onClick: null},
        {path: '/login', text: 'Login'}
      ]
    }
  }

  render() {

    const {authed} = this.props.auth
    const navItems = this.navItems(authed)
    const headerStyle = {width: '100%', height: '40px', backgroundColor: 'lavender', color: 'white'}
    const itemStyle = {padding: '10px', marginLeft: '20px', marginRight: '20px'}
    return (
      <Navbar staticTop fluid>
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
                <NavItem key={i.path}>
                  <Link to={i.path} onClick={i.onClick}>{i.text}</Link>
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
  logout,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
