import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import LoggedInPageNav from './header/LoggedInPageNav'
import LoggedOutPageNav from './header/LoggedOutPageNav'
import LoggedInMenu from './header/LoggedInMenu'
import { requestLogoutUser, requestDeleteUser } from '../reducers/userReducer'
import Confirm from './common/Confirm'

class Header extends Component {
  state = {
    pageAnchorEl: null,
    personAnchorEl: null,
    confirmVisible: false
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
    this.setState({ confirmVisible: true })
  }
  confirmDelete = type => () => {
    if (type === 'yes') {
      this.props.requestDeleteUser(this.props.user)
    }
    this.setState({ confirmVisible: false })
  }

  titlesString = (boardsOwned, user) => {
    let titles = boardsOwned.join(', ')
    const index = titles.lastIndexOf(', ')
    if (index !== -1) {
      titles =
        titles.substring(0, index) + ' and ' + titles.substring(index + 2)
    }
    return titles
  }
  render() {
    const { user, classes, boards } = this.props
    const { pageAnchorEl, personAnchorEl, confirmVisible } = this.state
    const boardsOwned = boards
      .filter(board => board.owner === user.id)
      .map(board => board.title)
    const howManyBoardsToDelete =
      boardsOwned.length > 0 ? boardsOwned.length : 0
    const titles = boardsOwned.length > 0 ? this.titlesString(boardsOwned) : ''
    return (
      <Fragment>
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
            <Typography
              variant="title"
              color="inherit"
              className={classes.title}
            >
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
        {user &&
          user.username && (
            <Confirm
              open={confirmVisible}
              title={`Delete user: ${user.name} (${user.username})`}
              body={`Do you really want to delete your user account? Deleting your user account will also delete ${howManyBoardsToDelete} boards and all containers and cards associated with them! Boards to be deleted: ${titles}`}
              noButtonText="no"
              yesButtonText="yes"
              no={this.confirmDelete()}
              yes={this.confirmDelete('yes')}
            />
          )}
      </Fragment>
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

const mapDispatchToProps = {
  requestLogoutUser,
  requestDeleteUser
}

const mapStateToProps = state => ({ user: state.user, boards: state.boards })

Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default withStyles(styles)(Header)
