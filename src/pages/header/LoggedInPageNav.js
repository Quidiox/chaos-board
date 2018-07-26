import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const LoggedInPageNav = ({
  classes,
  pageAnchorEl,
  handleClick,
  handleClose,
  boards
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
      <MenuItem name="pageAnchorEl" onClick={handleClose}  className={classes.linkMenuItem}>
        <NavLink
          to="/home"
          activeClassName="currentLink"
        >
          Home
        </NavLink>
      </MenuItem>
      {boards &&
        boards.length > 0 &&
        boards.map(board => (
          <MenuItem
            key={board.id}
            name="pageAnchorEl"
            onClick={handleClose}
            className={classes.linkMenuItem}
          >
            <NavLink to={`/board/${board.id}`} activeClassName="currentLink">
              {board.title}
            </NavLink>
          </MenuItem>
        ))}
    </Menu>
  </div>
)

const mapStateToProps = state => ({
  boards: state.boards
})

export default withRouter(connect(mapStateToProps)(LoggedInPageNav))
