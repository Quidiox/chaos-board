import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Card from './Card'
import { ItemTypes } from './constants'
import { sortByPosition } from './utils/helpers'
import {
  requestMoveContainer,
  requestDeleteContainer
} from './reducers/boardReducer'
import AddCard from './AddCard'
import Edit from './Edit'
import DropdownMenu from './DropdownMenu'

class Container extends Component {
  state = {
    isEditing: false
  }
  editContainer = () => {
    this.props.disableDragging('editingContainer')
    this.setState({ isEditing: true })
  }
  endEdit = () => {
    this.props.allowDragging('editingContainer')
    this.setState({ isEditing: false })
  }
  deleteContainer = () => {
    this.props.requestDeleteContainer({
      containerId: this.props.container.id,
      boardId: this.props.boardId
    })
  }
  render() {
    const sortedCards = sortByPosition(this.props.container.cards)
    const {
      canDrop,
      isOver,
      connectCardDropTarget,
      connectContainerDragSource,
      connectContainerDropTarget,
      connectContainerDragPreview
    } = this.props
    const isActive = canDrop && isOver
    const backgroundColor = isActive ? 'lightgreen' : '#FFF'
    const cursor = this.props.draggingAllowed ? 'move' : 'not-allowed'
    return connectContainerDropTarget(
      <div
        style={{
          float: 'left',
          padding: '1px'
        }}
      >
        {connectContainerDragPreview(
          <div style={{ position: 'relative' }}>
            {connectContainerDragSource(
              <i
                style={{ paddingLeft: '2px', margin: '5px', cursor }}
                className="expand exchange alternate icon"
              />
            )}
            {this.state.isEditing ? (
              <Edit
                title={this.props.container.title}
                containerId={this.props.container.id}
                endEdit={this.endEdit}
                type="Container"
              />
            ) : (
              <div>
                <h4
                  style={{
                    padding: '0px',
                    margin: '0px',
                    position: 'absolute',
                    top: '4px',
                    left: '30px'
                  }}
                >
                  {this.props.container.title}
                </h4>
                <div style={{ ...dropdownMenuStyle }}>
                  <DropdownMenu
                    handleEdit={this.editContainer}
                    handleDelete={this.deleteContainer}
                    type="container"
                  />
                </div>
              </div>
            )}
            {connectCardDropTarget(
              <div
                ref={element => (this.containerRef = element)}
                style={{ ...containerStyle, backgroundColor, float: 'left' }}
              >
                {sortedCards.map((card, i) => (
                  <Card
                    key={card.id}
                    id={card.id}
                    card={card}
                    position={card.position}
                    containerId={this.props.container.id}
                    containerPosition={this.props.position}
                    draggingAllowed={this.props.draggingAllowed}
                    allowDragging={this.props.allowDragging}
                    disableDragging={this.props.disableDragging}
                  />
                ))}
                <AddCard containerId={this.props.container.id} />
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const dropdownMenuStyle = {
  position: 'absolute',
  top: '4px',
  right: '2px',
  background: 'white',
  color: 'black',
  cursor: 'pointer'
}

const containerStyle = {
  width: '250px',
  minHeight: '404px',
  border: '1px solid black',
  height: '100%'
}

const cardTarget = {
  drop(props) {
    const { position, id } = props.container
    return {
      containerId: id,
      containerPosition: position
    }
  },
  // this might be the right place to handle card hover in new container when moving card to an other container
  hover(props, monitor) {
    if(props.container.id!==monitor.getItem().containerId) {
      // console.log('this line: ',monitor.getItem(), props.container.id)
    }
  }
}

const containerSource = {
  canDrag(props) {
    return !props.isEditing
  },
  beginDrag(props) {
    return {
      position: props.position,
      id: props.container.id,
      container: props.container
    }
  } /*, implement requestMoveContainer here
  endDrag(props, monitor) {

  }*/
}

const containerTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().position
    const hoverIndex = props.container.position
    if (dragIndex === hoverIndex) {
      return
    }
    const hoverBoundingRect = component.decoratedComponentInstance.decoratedComponentInstance.containerRef.getBoundingClientRect()
    const hoverMiddleX = (hoverBoundingRect.left - hoverBoundingRect.right) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientX = clientOffset.x - hoverBoundingRect.right
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return
    }
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return
    }
    const dragPosContainerId = props.containers[dragIndex].id
    props.requestMoveContainer(
      dragIndex,
      hoverIndex,
      props.container.id,
      dragPosContainerId
    )
    monitor.getItem().position = hoverIndex
  }
}

const collectCardDropTarget = (connect, monitor) => ({
  connectCardDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

const collectContainerDragSource = (connect, monitor) => ({
  connectContainerDragSource: connect.dragSource(),
  connectContainerDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

const collectContainerDropTarget = connect => ({
  connectContainerDropTarget: connect.dropTarget()
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestMoveContainer,
      requestDeleteContainer
    },
    dispatch
  )

const mapStateToProps = state => ({ containers: state.board.containers })

Container = flow(
  DropTarget(ItemTypes.CARD, cardTarget, collectCardDropTarget),
  DragSource(ItemTypes.CONTAINER, containerSource, collectContainerDragSource),
  DropTarget(ItemTypes.CONTAINER, containerTarget, collectContainerDropTarget)
)(Container)

export default connect(mapStateToProps, mapDispatchToProps)(Container)
