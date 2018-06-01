import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { withStyles } from '@material-ui/core/styles'

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
  <AppBar position="static" style={{height: '7%'}}>
    <Toolbar className={classes.nav}>
      <IconButton
        className={classes.menuIcon}
        name="pageAnchorEl"
        aria-owns={pageAnchorEl ? 'simple-menu' : null}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={pageAnchorEl}
        open={Boolean(pageAnchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Close</MenuItem>
        <MenuItem name="pageAnchorEl" onClick={handleClose}>
          <Link to="/home">Home</Link>
        </MenuItem>
        <MenuItem name="pageAnchorEl" onClick={handleClose}>
          <Link to="/board">Board</Link>
        </MenuItem>
      </Menu>
      <Typography variant="title" color="inherit" className={classes.title}>
        Chaos board
      </Typography>
      {user &&
        user.username && (
          <div>
            <IconButton
              name="personAnchorEl"
              aria-owns={Boolean(personAnchorEl) ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
              className={classes.profile}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={personAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(personAnchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Close</MenuItem>
              <MenuItem onClick={handleLogout} className={classes.logout}>
                <Link to="/">Logout</Link>
              </MenuItem>
              <MenuItem onClick={handleEdit}>Edit account</MenuItem>
              <MenuItem onClick={handleDelete}>Delete account</MenuItem>
            </Menu>
          </div>
        )}
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(Header)
