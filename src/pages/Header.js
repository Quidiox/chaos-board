import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import LoggedInPageNav from './header/LoggedInPageNav'
import LoggedOutPageNav from './header/LoggedOutPageNav'
import LoggedInMenu from './header/LoggedInMenu'
import { requestLogoutUser, requestDeleteUser } from '../reducers/userReducer'

class Header extends Component {
  state = {
    pageAnchorEl: null,
    personAnchorEl: null
  }
  handleClick = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget })
  }
  handleClose = () => {
    this.setState({ pageAnchorEl: null, personAnchorEl: null })
  }
  handleLogout = () => {
    this.handleClose()
    this.props.requestLogoutUser()
  }
  handleEdit = () => {
    this.handleClose()
  }
  handleDelete = () => {
    this.handleClose()
    this.props.requestDeleteUser(this.props.user)
  }
  render() {
    const { user, classes } = this.props
    const { pageAnchorEl, personAnchorEl } = this.state
    return (
      <AppBar position="static" style={{ height: '7%' }}>
        <Toolbar className={classes.nav}>
          {user && user.username ? (
            <LoggedInPageNav
              classes={classes}
              pageAnchorEl={pageAnchorEl}
              handleClick={this.handleClick}
              handleClose={this.handleClose}
            />
          ) : (
            <LoggedOutPageNav
              classes={classes}
              pageAnchorEl={pageAnchorEl}
              handleClick={this.handleClick}
              handleClose={this.handleClose}
            />
          )}
          <Typography variant="title" color="inherit" className={classes.title}>
            Chaos board
          </Typography>
          {user &&
            user.username && (
              <LoggedInMenu
                personAnchorEl={personAnchorEl}
                handleClick={this.handleClick}
                classes={classes}
                handleClose={this.handleClose}
                handleLogout={this.handleLogout}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
              />
            )}
        </Toolbar>
      </AppBar>
    )
  }
}

const styles = {
  nav: {
    minHeight: '25px'
  },
  title: {
    flex: 1,
    textAlign: 'center'
  },
  login: {
    right: '-20px'
  },
  profile: {
    backgroundColor: 'secondary',
    right: '-20px'
  },
  menuIcon: {
    left: '-20px'
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestLogoutUser,
      requestDeleteUser
    },
    dispatch
  )

const mapStateToProps = state => ({ user: state.user })

Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default withStyles(styles)(Header)
