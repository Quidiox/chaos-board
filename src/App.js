import React, { Component, Fragment } from 'react'
import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { Route, Link, Switch } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Board from './Board'
import Frontpage from './Frontpage'
import Home from './Home'
import { requestLogoutUser } from './reducers/userReducer'

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
  logout: {
    backgroundColor: 'secondary',
    right: '-20px'
  },
  menuIcon: {
    left: '-20px'
  }
}

class App extends Component {
  state = {
    anchorEl: null
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleClose = () => {
    this.setState({ anchorEl: null })
  }
  handleLogout = () => {
    this.props.requestLogoutUser()
  }
  render() {
    const { anchorEl } = this.state
    const { classes } = this.props
    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar className={classes.nav}>
            <IconButton className={classes.menuIcon}>
              <MenuIcon
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>
                <Link to="/home">Home</Link>
              </MenuItem>
              <MenuItem onClick={this.handleClose}>
                <Link to="/board">Board</Link>
              </MenuItem>
            </Menu>
            <Typography
              variant="title"
              color="inherit"
              className={classes.title}
            >
              Chaos board
            </Typography>

            {this.props.user && this.props.user.username ? (
              <Button onClick={this.handleLogout} className={classes.logout}>
                <Link to="/" style={{ color: 'white' }}>
                  Logout
                </Link>
              </Button>
            ) : (
              <Button className={classes.login}>
                <Link to="/" style={{ color: 'white' }}>
                  Login
                </Link>
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={Frontpage} />
          <Route path="/home" component={Home} />
          <Route path="/board" component={Board} />
        </Switch>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestLogoutUser }, dispatch)

const mapStateToProps = state => ({
  user: state.user
})

App = DragDropContext(HTML5Backend)(App)
App = withStyles(styles)(App)

export default connect(mapStateToProps, mapDispatchToProps)(App)
