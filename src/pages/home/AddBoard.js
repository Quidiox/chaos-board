import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Add from '../common/Add'
import { requestCreateBoard } from '../../reducers/userBoardsReducer'

class AddBoard extends Component {
  state = {}
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    if (this.state.title && this.state.title.length >= 3) {
      this.props.requestCreateBoard({
        title: this.state.title
      })
      this.setState({ title: '' })
    }
  }
  clear = e => {
    console.log(e)
    e.preventDefault()
    this.props.boardFormVisible()
    this.setState({ title: '' })
  }
  render() {
    return (
      <div style={{ width: '175px' }}>
        <Add
          title={this.state.title}
          clear={this.clear}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          type="Board"
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestCreateBoard }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(AddBoard)
