import React, { Component } from 'react'
import { Form, Button, TextArea } from 'semantic-ui-react'
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
    if (this.state.title && this.state.title.length > 3) {
      this.props.requestCreateContainer({
        boardId: this.props.boardId,
        ...this.state
      })
      this.setState({ title: '' })
    }
  }
  clearForm = e => {
    e.preventDefault()
    this.setState({ title: '' })
  }
  render() {
    return (
      <div style={{ minWidth: '250px' }}>
        <h4>Add container</h4>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            required
            control={TextArea}
            value={this.state.title || ''}
            label="Title"
            placeholder="Container title"
            name="title"
            onChange={this.handleChange}
          />
          <Form.Group>
            <Form.Field control={Button}>Save</Form.Field>
            <Form.Field control={Button} onClick={this.clearForm}>
              Clear
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestCreateContainer }, dispatch)

export default connect(null, mapDispatchToProps)(AddContainer)
