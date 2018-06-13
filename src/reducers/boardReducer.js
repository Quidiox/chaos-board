import {
  BOARD_INITIALIZE_REQUEST,
  BOARD_INITIALIZE,
  CARD_MOVE_REQUEST,
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
  CONTAINER_EDIT,
  CARD_MOVE_BETWEEN_CONTAINERS_REQUEST,
  CARD_MOVE_BETWEEN_CONTAINERS,
  USER_LOGOUT
} from './actionTypes'

const boardReducer = (state = [], action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return []
    case BOARD_INITIALIZE:
      return action.payload
    case CARD_HOVER: {
      const { dragIndex, hoverIndex, containerPosition } = action.payload
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
      return stateCopy
    }
    case CARD_MOVE_BETWEEN_CONTAINERS: {
      const card = action.payload.card
      const sourceContainerPosition = action.payload.sourceContainerPosition
      const targetContainerPosition = action.payload.targetContainerPosition
      const stateCopy = JSON.parse(JSON.stringify(state))
      card.position = stateCopy.containers[targetContainerPosition].cards.length
      stateCopy.containers[targetContainerPosition].cards.push(card)
      let cards = stateCopy.containers[sourceContainerPosition].cards.filter(
        c => c.id !== card.id
      )
      cards = cards.map((c, i) => {
        c.position = i
        return c
      })
      stateCopy.containers[sourceContainerPosition].cards = cards
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
      const { dragIndex, hoverIndex } = action.payload
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

export const requestMoveContainer = payload => ({
  type: CONTAINER_MOVE_REQUEST,
  payload
})

export const requestMoveCardBetweenContainers = payload => ({
  type: CARD_MOVE_BETWEEN_CONTAINERS_REQUEST,
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

export default boardReducer
