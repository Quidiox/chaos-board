import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { NavLink } from 'react-router-dom'
import AccountEditIcon from 'mdi-react/AccountEditIcon'
import AccountRemoveIcon from 'mdi-react/AccountRemoveIcon'
import AccountOffIcon from 'mdi-react/AccountOffIcon'
import CloseIcon from 'mdi-react/CloseIcon'

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
      <MenuItem onClick={handleClose} className={menuItemStyle}>
        <CloseIcon style={iconStyle} />Close
      </MenuItem>
      <MenuItem onClick={handleLogout} className={menuItemStyle}>
        <AccountOffIcon style={iconStyle} />
        <NavLink to="/">
          <span style={menuItemStyle}>Logout</span>
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleEdit} className={menuItemStyle}>
        <AccountEditIcon style={iconStyle} />
        <NavLink to="/user/edit">
          <span style={menuItemStyle}>Edit account</span>
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleDelete} className={menuItemStyle}>
        <AccountRemoveIcon style={iconStyle} />Delete account
      </MenuItem>
    </Menu>
  </div>
)

const menuItemStyle = {
  color: 'black'
}

const iconStyle = {
  height: '18px',
  width: '18px',
  marginRight: '5px'
}

export default LoggedInMenu
