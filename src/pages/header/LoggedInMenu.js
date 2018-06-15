import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'

const LoggedInMenu = ({
  personAnchorEl,
  handleClick,
  classes,
  handleClose,
  handleLogout,
  handleEdit,
  handleDelete
}) => (
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
      <MenuItem onClick={handleEdit}><Link to='/user/edit'>Edit account</Link></MenuItem>
      <MenuItem onClick={handleDelete}>Delete account</MenuItem>
    </Menu>
  </div>
)

export default LoggedInMenu
