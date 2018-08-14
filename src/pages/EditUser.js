import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import EditForm from './user/EditForm'
import { requestEditUser } from '../reducers/userReducer'

class EditUser extends Component {
  state = {
    name: this.props.user.name,
    username: this.props.user.username,
    password: '',
    confirmPassword: '',
    passwordEdit: false,
    redirect: false
  }

  handleChange = (e, checked) => {
    if (!e.currentTarget.name) {
      this.setState({ passwordEdit: checked })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const {
      name,
      username,
      password,
      confirmPassword,
      passwordEdit
    } = this.state
    if (passwordEdit && password === confirmPassword) {
      this.props.requestEditUser({
        name,
        username,
        password,
        userId: this.props.user.id
      })
    } else {
      this.props.requestEditUser({
        name,
        username,
        userId: this.props.user.id
      })
    }
    this.setState({
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      passwordEdit: false,
      redirect: true
    })
  }

  clear = e => {
    e.preventDefault()
    this.setState({
      name: this.props.user.name,
      username: this.props.user.username,
      password: '',
      confirmPassword: '',
      passwordEdit: false,
      redirect: true
    })
  }

  render() {
    console.log(this.state.redirect, this.props.location.state)
    if (this.state.redirect) {
      return <Redirect to={this.props.location.state.prevPath} />
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <h2>Edit user account</h2>
          <EditForm
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            clear={this.clear}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = { requestEditUser }

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser)
