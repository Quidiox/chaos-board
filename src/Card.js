import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from './constants'
import flow from 'lodash/flow'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  requestMoveCard,
  requestDeleteCardFromOldContainer
} from './reducers/boardReducer'

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
      position: props.position,
      listId: props.listId,
      card: props.card
    }
  },
  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (dropResult && dropResult.listId !== item.listId) {
      props.requestDeleteCardFromOldContainer(item.position, props.listPosition, item.listId, item.card.id)
    }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().position
    const hoverIndex = props.position
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
      const dragPosCard = props.containers[props.listPosition].cards[dragIndex]
      props.requestMoveCard(
        dragIndex,
        hoverIndex,
        props.listPosition,
        props.id,
        dragPosCard.id
      )
      monitor.getItem().position = hoverIndex
    }
  }
}

const collectDragSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

const collectDropTarget = connect => ({
  connectDropTarget: connect.dropTarget()
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { requestMoveCard, requestDeleteCardFromOldContainer },
    dispatch
  )

const mapStateToProps = state => ({ containers: state.board.containers })

Card = flow(
  DropTarget(ItemTypes.CARD, cardTarget, collectDropTarget),
  DragSource(ItemTypes.CARD, cardSource, collectDragSource)
)(Card)

export default connect(mapStateToProps, mapDispatchToProps)(Card)
