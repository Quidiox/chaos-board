import React, { Component } from 'react'
import Container from './Container'
import update from 'immutability-helper'

class Board extends Component {
  state = {
    name: 'test board',
    lists: [
      {
        name: 'list one',
        id: 1,
        items: [{ id: 1, text: 'hello world' }, { id: 2, text: 'hello you' }]
      },
      {
        name: 'list two',
        id: 2,
        items: [
          { id: 3, text: 'list 2 hello world' },
          { id: 4, text: 'list 2 hello you' }
        ]
      },
      {
        name: 'list three',
        id: 3,
        items: [
          { id: 5, text: 'list 3 hello world' },
          { id: 6, text: 'list 3 hello you' }
        ]
      },
      {
        name: 'list four',
        id: 4,
        items: [
          { id: 7, text: 'list 4 hello world' },
          { id: 8, text: 'list 4 hello you' },
          { id: 9, text: 'list 4 a much longer hello world to you too' }
        ]
      }
    ]
  }

  pushCard = (card, listIndex) => {
    this.setState(
      update(this.state, {
        lists: {
          [listIndex]: {
            items: {
              $push: [card]
            }
          }
        }
      })
    )
  }

  removeCard = (index, listIndex) => {
    this.setState(
      update(this.state, {
        lists: {
          [listIndex]: {
            items: {
              $splice: [[index, 1]]
            }
          }
        }
      })
    )
  }

  moveCard = (dragIndex, hoverIndex, listIndex) => {
    const { items } = this.state.lists[listIndex]
    const dragCard = items[dragIndex]
    this.setState(
      update(this.state, {
        lists: {
          [listIndex]: {
            items: {
              $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
            }
          }
        }
      })
    )
  }

  moveContainer = (dragIndex, hoverIndex) => {
    const { lists } = this.state
    const dragContainer = lists[dragIndex]
    this.setState(
      update(this.state, {
        lists: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragContainer]]
        }
      })
    )
  }

  render() {
    return (
      <div style={{ style }}>
        <h1>{this.state.name}</h1>
        <div style={{ float: 'left' }}>
          {this.state.lists.map((list, i) => (
            <Container
              key={list.id}
              list={list}
              index={i}
              moveCard={this.moveCard}
              removeCard={this.removeCard}
              pushCard={this.pushCard}
              moveContainer={this.moveContainer}
            />
          ))}
        </div>
      </div>
    )
  }
}

const style = {
  display: 'flex',
  justifyContent: 'space-around',
  paddingTop: '20px'
}

export default Board
