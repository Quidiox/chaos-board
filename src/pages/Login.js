import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Redirect } from 'react-router-dom'
import UserForm from './UserForm'
import { requestLoginUser } from '../reducers/userReducer'

class Login extends Component {
  state = { username: '', password: '', redirectToReferrer: false }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { username, password } = this.state
    await this.props.requestLoginUser({ username, password })
    await this.setState({
      username: '',
      password: '',
      redirectToReferrer: true
    })
  }

  clear = e => {
    e.preventDefault()
    this.setState({ username: '', password: '' })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    console.log('hello')
    if (redirectToReferrer === true) {
      console.log('allmost there: ', this.state.redirectToReferrer, from)
      return <Redirect to={from} />
    }
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestLoginUser }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Login)
