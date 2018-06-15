import React, { Component, Fragment } from 'react'
import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Header from './pages/Header'
import Board from './components/Board'
import Frontpage from './pages/Frontpage'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import EditUser from './pages/EditUser'
import {
  requestLogoutUser,
  requestVerifyUserToken,
  requestDeleteUser
} from './reducers/userReducer'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

class App extends Component {
  state = {
    pageAnchorEl: null,
    personAnchorEl: null,
    redirectTo: false,
    from: { pathname: '/' }
  }
  componentDidMount() {
    if (this.props.user && this.props.user.username) {
      this.props.requestVerifyUserToken(this.props.user)
    }
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
    this.props.requestDeleteUser(this.props.user)
  }
  render() {
    const { user } = this.props
    const loggedIn = user && user.username ? true : false
    const { pageAnchorEl, personAnchorEl } = this.state
    return (
      <Fragment>
        <Header
          user={user}
          pageAnchorEl={pageAnchorEl}
          personAnchorEl={personAnchorEl}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          handleClick={this.handleClick}
          handleClose={this.handleClose}
          handleLogout={this.handleLogout}
        />
        <Switch>
          <Route exact path="/" component={Frontpage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute loggedIn={loggedIn} path="/home" component={Home} />
          <PrivateRoute loggedIn={loggedIn} path='/user/edit' component={EditUser} />
          <PrivateRoute loggedIn={loggedIn} path="/board" component={Board} />
        </Switch>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestLogoutUser,
      requestVerifyUserToken,
      requestDeleteUser
    },
    dispatch
  )

const mapStateToProps = state => ({
  user: state.user
})

App = DragDropContext(HTML5Backend)(App)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
