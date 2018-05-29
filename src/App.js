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
import Board from './Board'
import Frontpage from './Frontpage'
import Home from './Home'

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
    return (
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton style={{left: '-20px'}}>
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
            <Typography variant="title" color="inherit" style={{flex: 1}}>
              Chaos board
            </Typography>
            <Button color="inherit" style={{right: '-20px'}}>Login</Button>
          </Toolbar>
        </AppBar>
        <Switch>
          <div>
            <Route exact path="/" component={Frontpage} />
            <Route path="/home" component={Home} />
            <Route path="/board" component={Board} />
          </div>
        </Switch>
      </Fragment>
    )
  }
}

App = DragDropContext(HTML5Backend)(App)

export default App
