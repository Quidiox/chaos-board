import React, { Component } from 'react'
import UserForm from './UserForm'
import { Button } from 'semantic-ui-react'

class Frontpage extends Component {
  state = { username: '', password: '', type: 'Login' }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
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

export default Frontpage
