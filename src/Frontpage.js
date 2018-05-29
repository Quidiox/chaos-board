import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'semantic-ui-react'
import UserForm from './UserForm'
import { requestLoginUser } from './reducers/userReducer'

class Frontpage extends Component {
  state = { username: '', password: '', type: 'Login' }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state
    this.props.requestLoginUser({ username, password })
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
          <h2>Login to view your boards</h2>
          <UserForm
            type={this.state.type}
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            clear={this.clear}
          />
          <h2>or create new account</h2>
          <Button onClick={() => this.changeType('Register')}>Register</Button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestLoginUser }, dispatch)

export default connect(null, mapDispatchToProps)(Frontpage)
