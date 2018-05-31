import React, { Component, Fragment } from 'react'
import { DragDropContext } from 'react-dnd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from './Header'
import Board from './Board'
import Frontpage from './Frontpage'
import Home from './Home'
import {
  requestLogoutUser,
  requestVerifyUserToken,
  requestEditUser,
  requestDeleteUser
} from './reducers/userReducer'

class App extends Component {
  state = {
    pageAnchorEl: null,
    personAnchorEl: null
  }
  componentDidMount() {
    const user = window.localStorage.getItem('loggedChaosBoardUser')
    const parsedUser = JSON.parse(user)
    if (parsedUser) {
      try {
        this.props.requestVerifyUserToken(parsedUser)
      } catch (error) {
        console.log(error)
      }
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
    this.props.requestEditUser()
  }
  handleDelete = () => {
    this.handleClose()
    this.props.requestDeleteUser()
  }

  render() {
    const { pageAnchorEl, personAnchorEl } = this.state
    return (
      <Fragment>
        <Header user={this.props.user} pageAnchorEl={pageAnchorEl} personAnchorEl={personAnchorEl} handleClick={this.handleClick} handleClose={this.handleClose} handleLogout={this.handleLogout} />
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
  bindActionCreators({ requestLogoutUser, requestVerifyUserToken, requestEditUser, requestDeleteUser }, dispatch)

const mapStateToProps = state => ({
  user: state.user
})

App = DragDropContext(HTML5Backend)(App)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
