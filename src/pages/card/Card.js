import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card as CardComp } from 'semantic-ui-react'
import { ItemTypes } from '../../utils/constants'
import {
  requestMoveCard,
  requestMoveCardBetweenContainers,
  requestDeleteCard,
  hoverCard
} from '../../reducers/boardReducer'
import Edit from '../common/Edit'
import DropdownMenu from '../common/DropdownMenu'

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
    this.props.disableDragging('editingCard')
    this.setState({ isEditing: true })
  }
  endEdit = () => {
    this.props.allowDragging('editingCard')
    this.setState({ isEditing: false, isHovering: false })
  }
  deleteCard = () => {
    this.props.requestDeleteCard({
      containerId: this.props.containerId,
      cardId: this.props.card.id
    })
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
    const cursor = this.props.draggingAllowed ? 'move' : 'not-allowed'
    return connectDragSource(
      connectDropTarget(
        <div
          style={{ ...mainDivStyle, cursor, opacity }}
          ref={element => (this.cardRef = element)}
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
        >
          {this.state.isEditing ? (
            <Edit
              type="Card"
              title={card.title}
              cardId={card.id}
              containerId={this.props.containerId}
              endEdit={this.endEdit}
            />
          ) : (
            <CardComp>
              <CardComp.Content style={{ ...cardCompStyle }}>
                <CardComp.Description>
                  {card.title}{' '}
                  {this.state.isHovering && (
                    <div style={{ ...dropdownMenuStyle }}>
                      <DropdownMenu
                        handleEdit={this.editCard}
                        handleDelete={this.deleteCard}
                        type="card"
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

const cardSource = {
  canDrag(props) {
    return props.draggingAllowed
  },
  isDragging(props, monitor) {
    // Not sure if this is doing anything, might be ok to remove
    return monitor.getItem().card.id === props.card.id
  },
  beginDrag(props) {
    return {
      containerId: props.containerId,
      card: props.card,
      position: props.position
    }
  },
  endDrag(props, monitor, component) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    if (dropResult && dropResult.containerId !== item.containerId) {
      props.requestMoveCardBetweenContainers({
        card: item.card,
        targetContainerId: dropResult.containerId,
        targetContainerPosition: dropResult.containerPosition,
        sourceContainerId: item.containerId,
        sourceContainerPosition: props.containerPosition
      })
    } else if (
      dropResult &&
      dropResult.containerId === item.containerId &&
      item.card.position !== item.position
    ) {
      props.requestMoveCard({
        dragIndex: item.card.position,
        hoverIndex: item.position,
        containerPosition: props.containerPosition,
        cardId: props.id,
        containerId: item.containerId
      })
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
      props.hoverCard({
        dragIndex,
        hoverIndex,
        containerPosition: props.containerPosition
      })
      monitor.getItem().position = hoverIndex
    }
  }
}

const collectDragSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

const collectDropTarget = connect => ({
  connectDropTarget: connect.dropTarget(),
  awesome: 'hello'
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestMoveCard,
      requestMoveCardBetweenContainers,
      requestDeleteCard,
      hoverCard
    },
    dispatch
  )

const dropdownMenuStyle = {
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
  backgroundColor: 'white'
}

const cardCompStyle = {
  margin: '.1rem',
  padding: '.1rem'
}

const mapStateToProps = state => ({ containers: state.board.containers })

Card = flow(
  DropTarget(ItemTypes.CARD, cardTarget, collectDropTarget),
  DragSource(ItemTypes.CARD, cardSource, collectDragSource)
)(Card)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card)
