import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from './constants'
import flow from 'lodash/flow'

class Card extends Component {
  render() {
    const {
      card,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props
    const opacity = isDragging ? 0 : 1
    return connectDragSource(
      connectDropTarget(
        <div
          style={{ ...style, opacity }}
          ref={element => (this.cardRef = element)}
        >
          {card.text}
        </div>
      )
    )
  }
}

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  margin: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
}

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index,
      listId: props.listId,
      card: props.card
    }
  },
  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if (dropResult && dropResult.listId !== item.listId) {
      props.removeCard(item.index)
    }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    const sourceListId = monitor.getItem().listId
    if (dragIndex === hoverIndex) {
      return
    }
    const hoverBoundingRect = component.cardRef.getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }
    if (props.listId === sourceListId) {
      props.moveCard(dragIndex, hoverIndex)
      monitor.getItem().index = hoverIndex
    }
  }
}

const collectDragSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const collectDropTarget = connect => ({
  connectDropTarget: connect.dropTarget()
})

export default flow(
  DropTarget(ItemTypes.CARD, cardTarget, collectDropTarget),
  DragSource(ItemTypes.CARD, cardSource, collectDragSource)
)(Card)
