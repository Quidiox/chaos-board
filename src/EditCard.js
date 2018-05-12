import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, TextArea } from 'semantic-ui-react'
import { requestEditCard } from './reducers/boardReducer'

class EditCard extends Component {
  state = {
    addVisible: false,
    title: this.props.card.title || ''
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.requestEditCard({ title: this.state.title, cardId: this.props.card.id ,containerId: this.props.containerId })
    this.props.endEditCard()
    this.setState({ title: '', addVisible: false })
  }
  close = e => {
    e.preventDefault()
    this.props.endEditCard()
    this.setState({ title: '', addVisible: false })
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            value={this.state.title}
            control={TextArea}
            placeholder="Card title"
            name="title"
            onChange={this.handleChange}
          />
          <Form.Group>
            <Form.Field control={Button}>Save</Form.Field>
            <Form.Field control={Button} onClick={this.close}>
              Clear
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestEditCard }, dispatch)

export default connect(null, mapDispatchToProps)(EditCard)
