import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import update from 'immutability-helper'
import Card from './Card'
import { ItemTypes } from './constants'

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

class Container extends Component {
  state = { name: this.props.list.name, cards: this.props.list.items }

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
    const { cards } = this.state;		
		const dragCard = cards[dragIndex];
    const updatedList = update(cards, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
    })
    console.log(updatedList)
    this.setState({ cards: updatedList })
  }

  render() {
    const { cards } = this.state
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    const style = {
      width: '200px',
      height: '404px',
      border: '1px dashed gray'
    }
    const backgroundColor = isActive ? 'lightgreen' : '#FFF'
    return connectDropTarget(
      <div style={{ ...style, backgroundColor, float: 'left' }}>
        {cards.map((card, i) => {
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
    )
  }
}

export default DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Container)
