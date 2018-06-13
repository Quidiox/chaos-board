import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import LoggedInPageNav from './header/LoggedInPageNav'
import LoggedOutPageNav from './header/LoggedOutPageNav'
import LoggedInMenu from './header/LoggedInMenu'

const Header = ({
  user,
  classes,
  handleEdit,
  handleDelete,
  handleClose,
  handleClick,
  handleLogout,
  pageAnchorEl,
  personAnchorEl
}) => (
  <AppBar position="static" style={{ height: '7%' }}>
    <Toolbar className={classes.nav}>
      {user && user.username ? (
        <LoggedInPageNav
          classes={classes}
          pageAnchorEl={pageAnchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
        />
      ) : (
        <LoggedOutPageNav
          classes={classes}
          pageAnchorEl={pageAnchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
        />
      )}
      <Typography variant="title" color="inherit" className={classes.title}>
        Chaos board
      </Typography>
      {user &&
        user.username && (
          <LoggedInMenu
            personAnchorEl={personAnchorEl}
            handleClick={handleClick}
            classes={classes}
            handleClose={handleClose}
            handleLogout={handleLogout}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
    </Toolbar>
  </AppBar>
)

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

export default withStyles(styles)(Header)
