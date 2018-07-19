import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'
import { connect } from 'react-redux'
import Card from '../card/Card'
import AddCard from '../card/AddCard'
import { ItemTypes } from '../../utils/constants'
import { sortByPosition } from '../../utils/helpers'
import {
  requestEditContainer,
  requestMoveContainer,
  requestDeleteContainer
} from '../../reducers/boardReducer'
import Edit from '../common/Edit'
import DropdownMenu from '../common/DropdownMenu'
import Confirm from '../common/Confirm'

class Container extends Component {
  state = {
    editing: false,
    title: this.props.container.title,
    confirmVisible: false
  }
  editContainer = () => {
    this.props.disableDragging('editingContainer')
    this.setState({ editing: true })
  }
  endEdit = () => {
    this.props.requestEditContainer({
      title: this.state.title,
      containerId: this.props.container.id
    })
    this.props.allowDragging('editingContainer')
    this.setState({ editing: false })
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  close = e => {
    e.preventDefault()
    this.props.allowDragging('editingContainer')
    this.setState({ editing: false, title: this.props.container.title })
  }
  deleteContainer = () => {
    this.setState({ confirmVisible: true })
  }
  confirmDelete = type => () => {
    if (type === 'yes') {
      this.props.requestDeleteContainer({
        containerId: this.props.container.id,
        boardId: this.props.boardId
      })
    }
    this.setState({ confirmVisible: false })
  }
  render() {
    const { confirmVisible } = this.state
    const {
      container,
      canDrop,
      isOver,
      connectCardDropTarget,
      connectContainerDragSource,
      connectContainerDropTarget,
      connectContainerDragPreview
    } = this.props
    const sortedCards =
      container && container.cards ? sortByPosition(container.cards) : []
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
            {this.state.editing ? (
              <Edit
                type="Container"
                title={this.state.title}
                close={this.close}
                handleChange={this.handleChange}
                handleSubmit={this.endEdit}
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
        <Confirm
          open={confirmVisible}
          title={`Delete container`}
          body="Do you really want to delete this container and all cards it contains?"
          noButtonText="no"
          yesButtonText="yes"
          no={this.confirmDelete()}
          yes={this.confirmDelete('yes')}
        />
      </div>
    )
  }
}

const cardTarget = {
  drop(props) {
    const { position, id } = props.container
    return {
      containerId: id,
      containerPosition: position
    }
  }
}

const containerSource = {
  canDrag(props) {
    return props.draggingAllowed
  },
  beginDrag(props) {
    return {
      position: props.position,
      id: props.container.id,
      container: props.container
    }
  }
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
    props.requestMoveContainer({
      dragIndex,
      hoverIndex,
      containerId: props.container.id,
      dragPosContainerId
    })
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

const mapDispatchToProps = {
  requestEditContainer,
  requestMoveContainer,
  requestDeleteContainer
}

const mapStateToProps = state => ({ containers: state.board.containers })

Container = flow(
  DropTarget(ItemTypes.CARD, cardTarget, collectCardDropTarget),
  DragSource(ItemTypes.CONTAINER, containerSource, collectContainerDragSource),
  DropTarget(ItemTypes.CONTAINER, containerTarget, collectContainerDropTarget)
)(Container)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)
