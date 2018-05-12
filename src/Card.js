import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { ItemTypes } from './constants'
import flow from 'lodash/flow'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card as CardComp } from 'semantic-ui-react'
import {
  requestMoveCard,
  requestDeleteCardFromOldContainer,
  requestDeleteCard
} from './reducers/boardReducer'
import EditCard from './EditCard'
import CardDropdown from './CardDropdown'

class Card extends Component {
  state = {
    isHovering: false,
    isEditing: false
  }
  handleMouseHover = e => {
    if (e.type === 'mouseenter') this.setState({ isHovering: true })
    if (e.type === 'mouseleave') this.setState({ isHovering: false })
  }
  editCard = () => {
    this.setState({ isEditing: true })
  }
  endEditCard = () => {
    this.setState({ isEditing: false, isHovering: false })
  }
  deleteCard = () => {
    this.props.requestDeleteCard({containerId: this.props.containerId, cardId: this.props.card.id})
    this.setState({ isHovering: false })
  }
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
          style={{ ...mainDivStyle, opacity }}
          ref={element => (this.cardRef = element)}
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
        >
          {this.state.isEditing ? (
            <EditCard card={card} containerId={this.props.containerId} endEditCard={this.endEditCard} />
          ) : (
            <CardComp>
              <CardComp.Content style={{ ...cardCompStyle }}>
                <CardComp.Description>
                  {card.title}{' '}
                  {this.state.isHovering && (
                    <div style={{ ...cardDropdownStyle }}>
                      <CardDropdown
                        editCard={this.editCard}
                        deleteCard={this.deleteCard}
                      />
                    </div>
                  )}
                </CardComp.Description>
              </CardComp.Content>
            </CardComp>
          )}
        </div>
      )
    )
  }
}

const cardDropdownStyle = {
  position: 'absolute',
  top: '2px',
  right: '2px',
  background: 'white',
  color: 'black',
  cursor: 'pointer'
}

const mainDivStyle = {
  border: '1px dashed gray',
  padding: '.1rem',
  margin: '.1rem',
  backgroundColor: 'white',
  cursor: 'move'
}

const cardCompStyle = {
  margin: '.1rem',
  padding: '.1rem'
}

const cardSource = {
  beginDrag(props) {
    return {
      position: props.position,
      containerId: props.containerId,
      card: props.card
    }
  },
  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (dropResult && dropResult.containerId !== item.containerId) {
      props.requestDeleteCardFromOldContainer(
        item.position,
        props.containerPosition,
        item.containerId,
        item.card.id
      )
    }
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().position
    const hoverIndex = props.position
    const sourceContainerId = monitor.getItem().containerId
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
    if (props.containerId === sourceContainerId) {
      const dragPosCard =
        props.containers[props.containerPosition].cards[dragIndex]
      props.requestMoveCard(
        dragIndex,
        hoverIndex,
        props.containerPosition,
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
    { requestMoveCard, requestDeleteCardFromOldContainer, requestDeleteCard },
    dispatch
  )

const mapStateToProps = state => ({ containers: state.board.containers })

Card = flow(
  DropTarget(ItemTypes.CARD, cardTarget, collectDropTarget),
  DragSource(ItemTypes.CARD, cardSource, collectDragSource)
)(Card)

export default connect(mapStateToProps, mapDispatchToProps)(Card)
