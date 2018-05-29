import React, { Component, Fragment } from 'react'
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
      <Fragment>
        <h2>Login or create new account</h2>
        <Button onClick={() => this.changeType('Register')}>Register</Button>
        <UserForm
          type={this.state.type}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          clear={this.clear}
        />
      </Fragment>
    )
  }
}

export default Frontpage
