import React, { Component } from 'react'
import { connect } from 'react-redux'
import Add from '../common/Add'
import { requestCreateCard } from '../../reducers/boardReducer'

class AddCard extends Component {
  state = {
    addFormVisible: false
  }
  addFormVisible = e => {
    this.setState({ addFormVisible: true })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.requestCreateCard({
      containerId: this.props.containerId,
      title: this.state.title
    })
    this.setState({ title: '', addFormVisible: false })
  }
  clear = e => {
    e.preventDefault()
    this.setState({ title: '', addFormVisible: false })
  }
  render() {
    return (
      <div>
        {this.state.addFormVisible ? (
          <Add
            title={this.state.title}
            clear={this.clear}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            type="Card"
          />
        ) : (
          <div className="addText">
            <h4 onClick={this.addFormVisible}>Add card</h4>
          </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = { requestCreateCard }

export default connect(
  null,
  mapDispatchToProps
)(AddCard)
