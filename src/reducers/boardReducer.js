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
  CARD_HOVER,
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
    case CARD_HOVER: {
      const { dragIndex, hoverIndex, containerPosition } = action.payload
      const stateCopy = JSON.parse(JSON.stringify(state))
      console.log(action.payload)
      const cards = [...stateCopy.containers[containerPosition].cards]
      cards.forEach(async card => {
        if (hoverIndex < dragIndex) {
          if (card.position < dragIndex && card.position >= hoverIndex) {
            card.position += 1
          }
        } else if (hoverIndex > dragIndex) {
          if (card.position > dragIndex && card.position <= hoverIndex) {
            card.position -= 1
          }
        }
      })
      cards[dragIndex].position = hoverIndex
      stateCopy.containers[containerPosition].cards = cards
      return stateCopy
    }
    case CARD_MOVE: {
      /*const { dragIndex, hoverIndex, containerPosition } = action.payload
      const stateCopy = JSON.parse(JSON.stringify(state))
      const cards = [...stateCopy.containers[containerPosition].cards]
      cards.forEach(async card => {
        if (hoverIndex < dragIndex) {
          if (card.position < dragIndex && card.position >= hoverIndex) {
            card.position += 1
          }
        } else if (hoverIndex > dragIndex) {
          if (card.position > dragIndex && card.position <= hoverIndex) {
            card.position -= 1
          }
        }
      })
      cards[dragIndex].position = hoverIndex
      stateCopy.containers[containerPosition].cards = cards
      return stateCopy*/
      return state
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
      // need to get container id and card id here instead of index
      console.log(action)
      const { itemIndex, containerPosition } = action.meta
      const stateCopy = JSON.parse(JSON.stringify(state))
      stateCopy.containers[containerPosition].cards.splice(itemIndex, 1)
      for (
        let i = 0;
        i < stateCopy.containers[containerPosition].cards.length;
        ++i
      ) {
        if (
          stateCopy.containers[containerPosition].cards[i].position >
            itemIndex &&
          stateCopy.containers[containerPosition].cards[i].position > 0
        ) {
          stateCopy.containers[containerPosition].cards[i].position -= 1
        }
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
    case CARD_EDIT: {
      const stateCopy = JSON.parse(JSON.stringify(state))
      const container = stateCopy.containers.find(
        container => container.id === action.meta.containerId
      )
      const cards = container.cards.filter(
        card => card.id !== action.payload.id
      )
      cards.push(action.payload)
      stateCopy.containers[container.position].cards = cards
      return stateCopy
    }
    case CARD_DELETE: {
      const { containerId, cardId } = action.payload
      const stateCopy = JSON.parse(JSON.stringify(state))
      const container = stateCopy.containers.find(
        container => container.id === containerId
      )
      const card = container.cards.find(card => card.id === cardId)
      const cards = container.cards
        .filter(card => card.id !== cardId)
        .map(c => {
          if (c.position > card.position) {
            c.position -= 1
          }
          return c
        })
      stateCopy.containers[container.position].cards = cards
      return stateCopy
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
    case CONTAINER_EDIT: {
      const stateCopy = JSON.parse(JSON.stringify(state))
      const containers = stateCopy.containers.filter(
        container => container.id !== action.payload.id
      )
      containers.push(action.payload)
      stateCopy.containers = containers
      return stateCopy
    }
    case CONTAINER_DELETE: {
      const stateCopy = JSON.parse(JSON.stringify(state))
      // only one board, I need to change this at some point to support many boards
      const board = stateCopy
      const container = board.containers.find(
        container => container.id === action.payload.containerId
      )
      const containers = board.containers
        .filter(container => container.id !== action.payload.containerId)
        .map(c => {
          if (c.position > container.position) {
            c.position -= 1
          }
          return c
        })
      stateCopy.containers = containers
      return stateCopy
    }
    default:
      return state
  }
}

export const requestInitializeBoard = () => ({
  type: BOARD_INITIALIZE_REQUEST
})

export const hoverCard = payload => ({
  type: CARD_HOVER,
  payload
})

export const requestMoveCard = payload => ({
  type: CARD_MOVE_REQUEST,
  payload
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

export const requestCreateCard = payload => ({
  type: CARD_CREATE_REQUEST,
  payload
})

export const requestEditCard = payload => ({
  type: CARD_EDIT_REQUEST,
  payload
})

export const requestDeleteCard = payload => ({
  type: CARD_DELETE_REQUEST,
  payload
})

export const requestCreateContainer = payload => ({
  type: CONTAINER_CREATE_REQUEST,
  payload
})

export const requestEditContainer = payload => ({
  type: CONTAINER_EDIT_REQUEST,
  payload
})

export const requestDeleteContainer = payload => ({
  type: CONTAINER_DELETE_REQUEST,
  payload
})

export const genericActionCreator = (type, payload, error, meta) => ({
  type,
  payload,
  error,
  meta
})

export default boardReducer
