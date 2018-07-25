import React, { Component, Fragment } from 'react'
import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Header from './pages/Header'
import Board from './pages/Board'
import Frontpage from './pages/Frontpage'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import EditUser from './pages/EditUser'
import { requestVerifyUserToken } from './reducers/userReducer'
import { requestFetchBoardsByUser } from './reducers/userBoardsReducer'

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? (
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
    redirectTo: false,
    from: { pathname: '/' }
  }
  async componentDidMount() {
    if (this.props.user && this.props.user.username) {
      await this.props.requestVerifyUserToken(this.props.user)
      await this.props.requestFetchBoardsByUser(this.props.user)
    }
  }
  render() {
    const { user } = this.props
    const loggedIn = user && user.username ? true : false
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Frontpage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute loggedIn={loggedIn} path="/home" component={Home} />
          <PrivateRoute
            loggedIn={loggedIn}
            path="/user/edit"
            component={EditUser}
          />
          <PrivateRoute
            loggedIn={loggedIn}
            path="/board/:boardId"
            component={Board}
          />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestVerifyUserToken,
      requestFetchBoardsByUser
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
