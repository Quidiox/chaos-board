import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, TextArea } from 'semantic-ui-react'
import { requestEditCard, requestEditContainer } from '../reducers/boardReducer'

class Edit extends Component {
  state = {
    title: this.props.title || ''
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    if (this.props.type === 'Card') {
      this.props.requestEditCard({
        title: this.state.title,
        cardId: this.props.cardId,
        containerId: this.props.containerId
      })
    } else if (this.props.type === 'Container') {
      this.props.requestEditContainer({
        title: this.state.title,
        containerId: this.props.containerId
      })
    }
    this.props.endEdit()
    this.setState({ title: '' })
  }
  close = e => {
    e.preventDefault()
    this.props.endEdit()
    this.setState({ title: '' })
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            value={this.state.title}
            control={TextArea}
            placeholder={`${this.props.type} title`}
            name="title"
            onChange={this.handleChange}
          />
          <Form.Group>
            <Form.Field control={Button}>Save</Form.Field>
            <Form.Field control={Button} onClick={this.close}>
              Close
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestEditCard, requestEditContainer }, dispatch)

export default connect(null, mapDispatchToProps)(Edit)
