import React, { Component } from 'react'
import Container from './Container'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestInitializeBoard } from './reducers/boardReducer'
import { sortByPosition } from './utils/helpers'
import AddContainer from './AddContainer'

class Board extends Component {
  state = {}
  componentDidMount() {
    this.props.requestInitializeBoard()
  }

  render() {
    const board = this.props.board
    const sortedContainers = board.containers
      ? sortByPosition(board.containers)
      : []
    return (
      <div style={{ height: '100%', marginLeft: '10px', marginRight: '10px' }}>
        <h1
          style={{ position: 'fixed', top: '0', height: '36px' }}
        >
          {board.title}
        </h1>
        <div style={{ height: '100%', paddingTop: '36px' }}>
          {sortedContainers && (
            <div style={{ ...scrollingWrapper }}>
              {sortedContainers.map((container, i) => {
                return (
                  <div style={{ ...containerStyle }} key={i}>
                    <Container
                      key={container.id}
                      container={container}
                      position={container.position}
                    />
                  </div>
                )
              })}
              <AddContainer style={{...containerStyle}} boardId={board.id} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

const scrollingWrapper = {
  display: 'flex',
  overflowX: 'auto',
  minWidth: '100%',
  minHeight: '200px',
  height: '100%'
}
const containerStyle = {
  minWidth: '250px',
  marginLeft: '2px',
  marginRight: '2px'
}

const mapStateToProps = state => ({ board: state.board })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestInitializeBoard }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Board)
