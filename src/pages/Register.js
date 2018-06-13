import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import UserForm from './UserForm'
import { requestCreateUser } from '../reducers/userReducer'

class Register extends Component {
  state = { name: '', username: '', password: '' }

  handleChange = e => {
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
          <h3>Or <Link to='/login'>login</Link> with an existing account.</h3>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestCreateUser }, dispatch)

export default connect(null, mapDispatchToProps)(Register)
