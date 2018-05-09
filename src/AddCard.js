import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, TextArea } from 'semantic-ui-react'
import { requestCreateCard } from './reducers/boardReducer'

class AddCard extends Component {
  state = {
    addVisible: false
  }
  addVisible = e => {
    this.setState({ addVisible: true })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.requestCreateCard({
      containerId: this.props.containerId,
      ...this.state
    })
    this.setState({ title: '', addVisible: false })
  }
  close = e => {
    e.preventDefault()
    this.setState({ title: '', addVisible: false })
  }
  render() {
    return (
      <div>
        {this.state.addVisible ? (
          <Form onSubmit={this.handleSubmit}>
            <Form.Field
              value={this.state.title || ''}
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
        ) : (
          <div className='addText'>
            <h4 onClick={this.addVisible}>
              Add card
            </h4>
          </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestCreateCard }, dispatch)

export default connect(null, mapDispatchToProps)(AddCard)
