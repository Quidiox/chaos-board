import React, { Component } from 'react'
import { connect } from 'react-redux'
import Add from '../common/Add'
import { requestCreateContainer } from '../../reducers/boardReducer'

class AddContainer extends Component {
  state = {}
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    if (this.state.title && this.state.title.length >= 3) {
      this.props.requestCreateContainer({
        boardId: this.props.boardId,
        title: this.state.title
      })
      this.setState({ title: '' })
    }
  }
  clear = e => {
    e.preventDefault()
    this.setState({ title: '' })
  }
  render() {
    return (
      <div style={{ minWidth: '250px' }}>
        <Add
          title={this.state.title}
          clear={this.clear}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          type="Container"
        />
      </div>
    )
  }
}

const mapDispatchToProps = { requestCreateContainer }

export default connect(
  null,
  mapDispatchToProps
)(AddContainer)
