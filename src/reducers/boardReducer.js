import {
  BOARD_INITIALIZE_REQUEST,
  BOARD_INITIALIZE,
  CARD_MOVE_REQUEST,
  CARD_MOVE,
  CARD_MOVE_TO_OTHER_CONTAINER_REQUEST,
  CARD_MOVE_TO_OTHER_CONTAINER,
  CARD_DELETE_FROM_OLD_CONTAINER_REQUEST,
  CARD_DELETE_FROM_OLD_CONTAINER,
  CARD_CREATE_REQUEST,
  CARD_CREATE,
  CARD_DELETE_REQUEST,
  CARD_DELETE,
  CARD_EDIT_REQUEST,
  CARD_EDIT,
  CONTAINER_MOVE_REQUEST,
  CONTAINER_MOVE,
  CONTAINER_CREATE_REQUEST,
  CONTAINER_CREATE,
  CONTAINER_DELETE_REQUEST,
  CONTAINER_DELETE,
  CONTAINER_EDIT_REQUEST,
  CONTAINER_EDIT
} from './actionTypes'

const boardReducer = (state = [], action) => {
  // console.log('ACTION TYPE: ', action.type)
  // console.log('ACTION PAYLOAD', action.payload)
  // console.log('ACTION META', action.meta)
  switch (action.type) {
    case BOARD_INITIALIZE:
      return action.payload
    case CARD_MOVE: {
      const { dragIndex, hoverIndex, containerPosition } = action.meta
      const stateCopy = JSON.parse(JSON.stringify(state))
      const container = [...stateCopy.containers[containerPosition].cards]
      container[dragIndex].position = hoverIndex
      container[hoverIndex].position = dragIndex
      return stateCopy
    }
    case CARD_MOVE_TO_OTHER_CONTAINER: {
      const card = action.payload
      const containerPosition = action.meta
      const stateCopy = JSON.parse(JSON.stringify(state))
      card.position = stateCopy.containers[containerPosition].cards.length
      stateCopy.containers[containerPosition].cards.push(card)
      return stateCopy
    }
    case CARD_DELETE_FROM_OLD_CONTAINER: {
      const { itemIndex, containerPosition } = action.meta
      const stateCopy = JSON.parse(JSON.stringify(state))
      stateCopy.containers[containerPosition].cards.splice(itemIndex, 1)
      for (
        let i = itemIndex;
        i < stateCopy.containers[containerPosition].cards.length;
        ++i
      ) {
        stateCopy.containers[containerPosition].cards[i].position -= 1
      }
      return stateCopy
    }
    case CARD_CREATE: {
      const stateCopy = JSON.parse(JSON.stringify(state))
      const container = stateCopy.containers.find(
        container => container.id === action.payload.containerId
      )
      stateCopy.containers[container.position].cards.push(action.payload.card)
      return stateCopy
    }
    case CARD_DELETE:
    case CARD_EDIT: {
      return state
    }
    case CONTAINER_MOVE: {
      const { dragIndex, hoverIndex } = action.meta
      const stateCopy = JSON.parse(JSON.stringify(state))
      stateCopy.containers[dragIndex].position = hoverIndex
      stateCopy.containers[hoverIndex].position = dragIndex
      return stateCopy
    }
    case CONTAINER_CREATE: {
      const stateCopy = JSON.parse(JSON.stringify(state))
      stateCopy.containers.push(action.payload)
      return stateCopy
    }
    case CONTAINER_DELETE:
    case CONTAINER_EDIT:
    default:
      return state
  }
}

export const requestInitializeBoard = () => ({
  type: BOARD_INITIALIZE_REQUEST
})

export const requestMoveCard = (
  dragIndex,
  hoverIndex,
  containerPosition,
  cardId,
  dragPosCardId
) => ({
  type: CARD_MOVE_REQUEST,
  meta: { dragIndex, hoverIndex, containerPosition, cardId, dragPosCardId }
})

export const requestMoveContainer = (
  dragIndex,
  hoverIndex,
  containerId,
  dragPosContainerId
) => ({
  type: CONTAINER_MOVE_REQUEST,
  meta: { dragIndex, hoverIndex, containerId, dragPosContainerId }
})

export const requestMoveCardToOtherContainer = (
  card,
  containerPosition,
  containerId
) => ({
  type: CARD_MOVE_TO_OTHER_CONTAINER_REQUEST,
  meta: { card, containerPosition, containerId }
})

export const requestDeleteCardFromOldContainer = (
  itemIndex,
  containerPosition,
  containerId,
  cardId
) => ({
  type: CARD_DELETE_FROM_OLD_CONTAINER_REQUEST,
  meta: { itemIndex, containerPosition, containerId, cardId }
})

export const requestCreateContainer = payload => ({
  type: CONTAINER_CREATE_REQUEST,
  payload
})

export const requestCreateCard = payload => ({
  type: CARD_CREATE_REQUEST,
  payload
})

export const requestEditCard = payload => ({
  type: CARD_EDIT_REQUEST,
  payload
})

export const requestEditContainer = payload => ({
  type: CONTAINER_EDIT_REQUEST,
  payload
})

export const genericActionCreater = (type, payload, error, meta) => ({
  type,
  payload,
  error,
  meta
})

export default boardReducer
