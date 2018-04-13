import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import update from 'immutability-helper'
import flow from 'lodash/flow'
import Card from './Card'
import { ItemTypes } from './constants'

class Container extends Component {
  state = { cards: this.props.list.items }

  pushCard = card => {
    this.setState(
      update(this.state, {
        cards: {
          $push: [card]
        }
      })
    )
  }

  removeCard = index => {
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[index, 1]]
        }
      })
    )
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state
    const dragCard = cards[dragIndex]
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    )
  }

  render() {
    const { cards } = this.state
    const {
      canDrop,
      isOver,
      connectCardDropTarget,
      connectContainerDragSource,
      connectContainerDropTarget
    } = this.props
    const isActive = canDrop && isOver
    const style = {
      width: '200px',
      height: '404px',
      border: '1px dashed gray'
    }
    const backgroundColor = isActive ? 'lightgreen' : '#FFF'
    return connectContainerDragSource(
      connectContainerDropTarget(
        connectCardDropTarget(
          <div style={{ float: 'left' }}>
            <h4>{this.props.list.name}</h4>
            <div
              ref={element => (this.containerRef = element)}
              style={{ ...style, backgroundColor, float: 'left' }}
            >
              {cards.map((card, i) => {
                // console.log(cards)
                return (
                  <Card
                    key={card.id}
                    index={i}
                    id={card.id}
                    listId={this.props.list.id}
                    card={card}
                    removeCard={this.removeCard}
                    moveCard={this.moveCard}
                  />
                )
              })}
            </div>
          </div>
        )
      )
    )
  }
}

const cardTarget = {
  drop(props, monitor, component) {
    const { id } = props.list
    const sourceObj = monitor.getItem()
    if (id !== sourceObj.listId) component.pushCard(sourceObj.card)
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
    const sourceListId = monitor.getItem().id
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
    if (props.list.id !== sourceListId) {
      props.moveContainer(dragIndex, hoverIndex)
      monitor.getItem().index = hoverIndex
    }
  }
}

const collectCardDropTarget = (connect, monitor) => ({
  connectCardDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

const collectContainerDragSource = (connect, monitor) => {
  return {
    connectContainerDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const collectContainerDropTarget = connect => ({
  connectContainerDropTarget: connect.dropTarget()
})

export default flow(
  DropTarget(ItemTypes.CARD, cardTarget, collectCardDropTarget),
  DragSource(ItemTypes.CONTAINER, containerSource, collectContainerDragSource),
  DropTarget(ItemTypes.CONTAINER, containerTarget, collectContainerDropTarget)
)(Container)
