import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'

const LoggedInPageNav = ({
  classes,
  pageAnchorEl,
  handleClick,
  handleClose
}) => (
  <div>
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
  </div>
)

export default LoggedInPageNav
