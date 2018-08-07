import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import UserForm from './user/UserForm'
import { requestLoginUser } from '../reducers/userReducer'

class Login extends Component {
  state = { username: '', password: '' }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state
    this.props.requestLoginUser({ username, password })
    this.setState({
      username: '',
      password: ''
    })
  }

  clear = e => {
    e.preventDefault()
    this.setState({ username: '', password: '' })
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h2>Login with an existing account</h2>
          <UserForm
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            clear={this.clear}
          />
          <h4>
            Or <Link to="/register">register</Link> a new account.
          </h4>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { requestLoginUser }

export default connect(
  null,
  mapDispatchToProps
)(Login)
