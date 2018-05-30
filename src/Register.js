import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserForm from './UserForm'
import { requestCreateUser } from './reducers/userReducer'

class Register extends Component {
  state = { name: '', username: '', password: '' }

  handleChange = e => {
    console.log(e.target.name)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, username, password } = this.state
    this.props.requestCreateUser({ name, username, password })
    this.setState({ name: '', username: '', password: '' })
  }

  clear = e => {
    e.preventDefault()
    this.setState({ name: '', username: '', password: '' })
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h2>Register new account</h2>
          <UserForm
            nameField={true}
            name={this.state.name}
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
