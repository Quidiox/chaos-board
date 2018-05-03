import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'
import Card from './Card'
import { ItemTypes } from './constants'
import { sortByPosition } from './utils/helpers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  requestMoveContainer,
  requestMoveCardToOtherContainer
} from './reducers/boardReducer'

class Container extends Component {
  render() {
    const cards = this.props.list.cards
    const sortedCards = sortByPosition(cards)
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
    return connectContainerDropTarget(
      <div
        style={{
          float: 'left',
          margin: '1px',
          border: '1px solid gray'
        }}
      >
        {connectContainerDragPreview(
          <div>
            {connectContainerDragSource(
              <h4 style={{ paddingLeft: '5px', margin: '5px' }}>
                <span style={{ ...handleStyle }} />
                {this.props.list.title}
              </h4>
            )}
            {connectCardDropTarget(
              <div
                ref={element => (this.containerRef = element)}
                style={{ ...style, backgroundColor, float: 'left' }}
              >
                {sortedCards.map((card, i) => (
                  <Card
                    key={card._id}
                    position={card.position}
                    id={card._id}
                    listId={this.props.list._id}
                    listPosition={this.props.position}
                    card={card}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const style = {
  width: '200px',
  height: '404px',
  border: '1px solid black'
}

const handleStyle = {
  backgroundColor: 'green',
  width: '1rem',
  height: '1rem',
  display: 'inline-block',
  marginRight: '0.75rem',
  cursor: 'move'
}

const cardTarget = {
  drop(props, monitor, component) {
    const { _id } = props.list
    const sourceObj = monitor.getItem()
    if (_id !== sourceObj.listId)
      props.requestMoveCardToOtherContainer(sourceObj.card, props.position)
    return {
      listId: _id
    }
  }
}

const containerSource = {
  beginDrag(props) {
    return {
      position: props.position,
      id: props.list._id,
      list: props.list
    }
  }
}

const containerTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().position
    const hoverIndex = props.position
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
    console.log(monitor.getItem())
    props.requestMoveContainer(dragIndex, hoverIndex)
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
    { requestMoveContainer, requestMoveCardToOtherContainer },
    dispatch
  )

Container = flow(
  DropTarget(ItemTypes.CARD, cardTarget, collectCardDropTarget),
  DragSource(ItemTypes.CONTAINER, containerSource, collectContainerDragSource),
  DropTarget(ItemTypes.CONTAINER, containerTarget, collectContainerDropTarget)
)(Container)

export default connect(null, mapDispatchToProps)(Container)
