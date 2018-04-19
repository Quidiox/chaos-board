import React, { Component } from 'react'
import Container from './Container'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { bindActionCreators } from 'redux'
import { requestInitializeBoard } from './reducers/boardReducer'
import { sortByPosition } from './utils/helpers'

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

  render() {
    const containers = this.props.containers
    const sortedContainers = sortByPosition(containers)
    return (
      <div>
        <h1>Test board</h1>
        {containers && (
          <div style={{ ...style }}>
            <div style={{ float: 'left' }}>
              {sortedContainers.map((list, i) => (
                <Container
                  key={list.id}
                  list={list}
                  index={list.position}
                  removeCard={this.removeCard}
                  pushCard={this.pushCard}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const style = {
  display: 'flex',
  justifyContent: 'space-around',
  paddingTop: '20px'
}

const mapStateToProps = state => ({ containers: state.containers })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestInitializeBoard }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Board)
