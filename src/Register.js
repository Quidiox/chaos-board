import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserForm from './UserForm'
import { requestCreateUser } from './reducers/userReducer'

class Register extends Component {
  state = { username: '', password: '', type: 'Register' }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state
    this.props.requestCreateUser({ username, password })
    this.setState({ username: '', password: '' })
  }

  changeType = type => {
    this.setState({ type })
  }

  clear = e => {
    e.preventDefault()
    this.setState({ username: '', password: '' })
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h2>Register new account</h2>
          <UserForm
            type={this.state.type}
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            clear={this.clear}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestCreateUser }, dispatch)

export default connect(null, mapDispatchToProps)(Register)