import React, { Component } from 'react'
import Container from './Container'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestInitializeBoard } from './reducers/boardReducer'
import { sortByPosition } from './utils/helpers'

class Board extends Component {
  componentDidMount() {
    this.props.requestInitializeBoard()
  }

  render() {
    const board = this.props.board
    const sortedContainers = board.containers
      ? sortByPosition(board.containers)
      : []
    return (
      <div>
        <h1>{board.title}</h1>
        {board.containers && (
          <div style={{ ...style }}>
            <div style={{ float: 'left' }}>
              {sortedContainers.map((list, i) => {
                return (
                  <Container
                    key={list._id}
                    list={list}
                    position={list.position}
                  />
                )
              })}
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

const mapStateToProps = state => ({ board: state.board })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestInitializeBoard }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Board)
