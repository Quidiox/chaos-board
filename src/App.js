import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Container from './Container'

const style = {
  display: 'flex',
  justifyContent: 'space-around',
  paddingTop: '20px'
}

class App extends Component {
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
          { id: 8, text: 'list 4 hello you' }
        ]
      }
    ]
  }

  render() {
    return (
      <div style={{ style }}>
        <h1>{this.state.name}</h1>
        <div style={{float: 'left'}}>
          {this.state.lists.map(list => (
            <Container key={list.id} list={list} />
          ))}
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
