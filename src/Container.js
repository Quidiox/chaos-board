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
    const cards = this.props.container.cards
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
          padding: '1px'
        }}
      >
        {connectContainerDragPreview(
          <div>
            {connectContainerDragSource(
              <h4 style={{ paddingLeft: '5px', margin: '5px' }}>
                <i
                  style={{ cursor: 'move' }}
                  className="expand exchange alternate icon"
                />
                {this.props.container.title}
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
                    position={card.position}
                    id={card.id}
                    containerId={this.props.container.id}
                    containerPosition={this.props.position}
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
  minHeight: '404px',
  border: '1px solid black',
  height: '100%'
}

const cardTarget = {
  drop(props, monitor, component) {
    const { id } = props.container
    const sourceObj = monitor.getItem()
    if (id !== sourceObj.containerId)
      props.requestMoveCardToOtherContainer(sourceObj.card, props.position, id)
    return {
      containerId: id
    }
  }
}

const containerSource = {
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
    const dragPosContainerId = props.containers[dragIndex].id
    props.requestMoveContainer(
      dragIndex,
      hoverIndex,
      props.container.id,
      dragPosContainerId
    )
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

const mapStateToProps = state => ({ containers: state.board.containers })

Container = flow(
  DropTarget(ItemTypes.CARD, cardTarget, collectCardDropTarget),
  DragSource(ItemTypes.CONTAINER, containerSource, collectContainerDragSource),
  DropTarget(ItemTypes.CONTAINER, containerTarget, collectContainerDropTarget)
)(Container)

export default connect(mapStateToProps, mapDispatchToProps)(Container)
