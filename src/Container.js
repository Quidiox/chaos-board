import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'
import Card from './Card'
import { ItemTypes } from './constants'
import { sortByPosition } from './utils/helpers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { requestMoveContainer } from './reducers/boardReducer'

class Container extends Component {
  render() {
    const cards = this.props.list.items
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
                {this.props.list.name}
              </h4>
            )}
            {connectCardDropTarget(
              <div
                ref={element => (this.containerRef = element)}
                style={{ ...style, backgroundColor, float: 'left' }}
              >
                {sortedCards.map((card, i) => (
                  <Card
                    key={card.id}
                    index={card.position}
                    id={card.id}
                    listId={this.props.list.id}
                    listIndex={this.props.index}
                    card={card}
                    removeCard={this.props.removeCard}
                    moveCard={this.props.moveCard}
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
    const { id } = props.list
    const sourceObj = monitor.getItem()
    if (id !== sourceObj.listId) props.pushCard(sourceObj.card, props.index)
    return {
      listId: id
    }
  }
}

const containerSource = {
  beginDrag(props) {
    return {
      index: props.index,
      id: props.list.id,
      list: props.list
    }
  }
}

const containerTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
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
    props.requestMoveContainer(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
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
  bindActionCreators({ requestMoveContainer }, dispatch)

Container = flow(
  DropTarget(ItemTypes.CARD, cardTarget, collectCardDropTarget),
  DragSource(ItemTypes.CONTAINER, containerSource, collectContainerDragSource),
  DropTarget(ItemTypes.CONTAINER, containerTarget, collectContainerDropTarget)
)(Container)

export default connect(null, mapDispatchToProps)(Container)
