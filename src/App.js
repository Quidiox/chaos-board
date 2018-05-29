import React, { Component, Fragment } from 'react'
import { DragDropContext } from 'react-dnd'
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

const styles = {
  nav: {
    minHeight: '25px'
  },
  title: {
    flex: 1,
    textAlign: 'center'
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
  render() {
    const { anchorEl } = this.state
    const { classes } = this.props
    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar className={classes.nav}>
            <IconButton style={{ left: '-20px' }}>
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
            <Typography variant="title" color="inherit" className={classes.title}>
              Chaos board
            </Typography>
            <Button color="inherit" style={{ right: '-20px' }}>
              Login
            </Button>
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

App = DragDropContext(HTML5Backend)(App)

export default withStyles(styles)(App)
