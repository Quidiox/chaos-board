import React, { Component } from 'react'
import Container from './Container'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { bindActionCreators } from 'redux'
import { requestInitializeBoard } from './reducers/boardReducer'

const style = {
  display: 'flex',
  justifyContent: 'space-around',
  paddingTop: '20px'
}

class Board extends Component {
  componentDidMount() {
    this.props.requestInitializeBoard()
  }
  pushCard = (card, listIndex) => {
    this.setState(
      update(this.state, {
        lists: {
          [listIndex]: {
            items: {
              $push: [card]
            }
          }
        }
      })
    )
  }

  removeCard = (index, listIndex) => {
    this.setState(
      update(this.state, {
        lists: {
          [listIndex]: {
            items: {
              $splice: [[index, 1]]
            }
          }
        }
      })
    )
  }

  moveCard = (dragIndex, hoverIndex, listIndex) => {
    const { items } = this.state.lists[listIndex]
    const dragCard = items[dragIndex]
    this.setState(
      update(this.state, {
        lists: {
          [listIndex]: {
            items: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
            }
          }
        }
      })
    )
  }

  moveContainer = (dragIndex, hoverIndex) => {
    const { lists } = this.state
    const dragContainer = lists[dragIndex]
    this.setState(
      update(this.state, {
        lists: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragContainer]]
        }
      })
    )
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Test board</h1>
        {this.props.containers && (
          <div style={{ ...style }}>
            <div style={{ float: 'left' }}>
              {this.props.containers.map((list, i) => (
                <Container
                  key={list.id}
                  list={list}
                  index={list.position}
                  moveCard={this.moveCard}
                  removeCard={this.removeCard}
                  pushCard={this.pushCard}
                  moveContainer={this.moveContainer}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({ containers: state.containers })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestInitializeBoard }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Board)
