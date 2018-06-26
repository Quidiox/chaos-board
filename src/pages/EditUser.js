import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EditForm from './EditForm'
import { requestEditUser } from '../reducers/userReducer'

class EditUser extends Component {
  state = {
    name: this.props.user.name,
    username: this.props.user.username,
    password: '',
    confirmPassword: '',
    passwordEdit: false
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
      this.props.requestEditUser({ name, username, password, userId: this.props.user.id })
    } else {
      this.props.requestEditUser({ name, username, userId: this.props.user.id })
    }
    this.setState({
      name: '',
      username: '',
      password: '',
      confirmPassword: '',
      passwordEdit: false
    })
  }

  clear = e => {
    e.preventDefault()
    this.setState({
      name: this.props.user.name,
      username: this.props.user.username,
      password: '',
      confirmPassword: '',
      passwordEdit: false
    })
  }

  render() {
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestEditUser }, dispatch)

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser)