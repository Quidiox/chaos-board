import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Login from './user/Login'
import Register from './user/Register'

class Frontpage extends Component {
  state = { registered: true }
  handleClick = () => {
    this.setState({ registered: !this.state.registered })
  }
  render() {
    const { registered } = this.state
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {registered ? (
          <div>
            <Login /> If you don't have account you need to <Button onClick={this.handleClick}>Register</Button>
          </div>
        ) : (
          <div>
            <Register /> If you already have an account you can <Button onClick={this.handleClick}>Login</Button>
          </div>
        )}
      </div>
    )
  }
}

export default Frontpage
