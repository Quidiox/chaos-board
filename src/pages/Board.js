import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestInitializeBoard } from '../reducers/boardReducer'
import { sortByPosition } from '../utils/helpers'
import Container from './container/Container'
import AddContainer from './container/AddContainer'

class Board extends Component {
  state = { draggingAllowed: true, editingCard: false, editingContainer: false }
  componentDidMount() {
    this.props.requestInitializeBoard(this.props.match.params.boardId)
  }
  async shouldComponentUpdate(nextProps) {
    if (nextProps.match.params.boardId !== this.props.match.params.boardId) {
      await this.props.requestInitializeBoard(nextProps.match.params.boardId)
      return true
    }
    return false
  }
  disableDragging = editingType => {
    this.setState({ draggingAllowed: false, [editingType]: true })
  }
  allowDragging = async editingType => {
    await this.setState({ [editingType]: false })
    if (!this.state.editingCard && !this.state.editingContainer) {
      this.setState({ draggingAllowed: true })
    }
  }
  render() {
    const board = this.props.board
    const sortedContainers =
      board && board.containers ? sortByPosition(board.containers) : []
    return (
      <div
        style={{
          marginLeft: '10px',
          marginRight: '10px',
          height: '93%',
          overflowX: 'auto'
        }}
      > {board ? <div>
        <h3>{board.title}</h3>
        <div>
          {sortedContainers && (
            <div style={{ ...scrollingWrapper }}>
              {sortedContainers.map((container, i) => {
                return (
                  <div style={{ ...containerStyle }} key={i}>
                    <Container
                      key={container.id}
                      container={container}
                      boardId={board.id}
                      position={container.position}
                      draggingAllowed={this.state.draggingAllowed}
                      allowDragging={this.allowDragging}
                      disableDragging={this.disableDragging}
                    />
                  </div>
                )
              })}
              <AddContainer style={{ ...containerStyle }} boardId={board.id} />
            </div>
          )}
        </div></div> : <div>loading...</div>}
      </div>
    )
  }
}

const scrollingWrapper = {
  display: 'flex',
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
