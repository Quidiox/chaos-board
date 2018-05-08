import React, { Component } from 'react'
import { Form, Button, Input, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestCreateContainer } from './reducers/boardReducer'

class AddContainer extends Component {
  state = {}
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.requestCreateContainer({
      boardId: this.props.boardId,
      ...this.state
    })
    this.setState({ title: '', description: '' })
  }
  render() {
    return (
      <div>
        <h4>New container</h4>
        <Form>
          <Form.Field
            control={Input}
            label="Title"
            placeholder="Container title"
            name="title"
            onChange={this.handleChange}
          />
          <Form.Field
            control={TextArea}
            label="Description"
            placeholder="Container description"
            name="description"
            onChange={this.handleChange}
          />
          <Form.Field control={Button} onClick={this.handleSubmit}>
            Submit
          </Form.Field>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestCreateContainer }, dispatch)

export default connect(null, mapDispatchToProps)(AddContainer)
