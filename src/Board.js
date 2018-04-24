import React, { Component } from 'react'
import Container from './Container'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestInitializeBoard } from './reducers/boardReducer'
import { sortByPosition } from './utils/helpers'

class Board extends Component {
  componentDidMount() {
    this.props.requestInitializeBoard()
  }

  render() {
    const containers = this.props.containers
    const sortedContainers = sortByPosition(containers)
    return (
      <div>
        <h1>Test board</h1>
        {containers && (
          <div style={{ ...style }}>
            <div style={{ float: 'left' }}>
              {sortedContainers.map((list, i) => (
                <Container
                  key={list.id}
                  list={list}
                  position={list.position}
                  removeCard={this.removeCard}
                  pushCard={this.pushCard}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const style = {
  display: 'flex',
  justifyContent: 'space-around',
  paddingTop: '20px'
}

const mapStateToProps = state => ({ containers: state.containers })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestInitializeBoard }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Board)
