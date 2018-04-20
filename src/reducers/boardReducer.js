import {
  BOARD_INITIALIZE_REQUEST,
  BOARD_INITIALIZE,
  CARD_MOVE_REQUEST,
  CARD_MOVE,
  CARD_MOVE_TO_OTHER_CONTAINER_REQUEST,
  CARD_MOVE_TO_OTHER_CONTAINER,
  CARD_DELETE_FROM_OLD_CONTAINER_REQUEST,
  CARD_DELETE_FROM_OLD_CONTAINER,
  CARD_CREATE,
  CARD_DELETE,
  CARD_EDIT,
  CONTAINER_MOVE_REQUEST,
  CONTAINER_MOVE,
  CONTAINER_CREATE,
  CONTAINER_DELETE,
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
      const { dragIndex, hoverIndex, listIndex } = action.meta
      const stateCopy = JSON.parse(JSON.stringify(state))
      const list = [...stateCopy[listIndex].items]
      list[dragIndex].position = hoverIndex
      list[hoverIndex].position = dragIndex
      return stateCopy
    }
    case CARD_MOVE_TO_OTHER_CONTAINER: {
      const card = action.payload
      const listIndex = action.meta
      const stateCopy = JSON.parse(JSON.stringify(state))
      card.position = stateCopy[listIndex].items.length
      stateCopy[listIndex].items.push(card)
      return stateCopy
    }
    case CARD_DELETE_FROM_OLD_CONTAINER: {
      const { itemIndex, listIndex } = action.meta
      const stateCopy = JSON.parse(JSON.stringify(state))
      stateCopy[listIndex].items.splice(itemIndex, 1)
      for(let i = itemIndex; i<stateCopy[listIndex].items.length; ++i) {
        stateCopy[listIndex].items[i].position-=1
      }
      return stateCopy
    }
    case CARD_CREATE:
    case CARD_DELETE:
    case CARD_EDIT:
    case CONTAINER_MOVE: {
      const { dragIndex, hoverIndex } = action.meta
      const stateCopy = JSON.parse(JSON.stringify(state))
      stateCopy[dragIndex].position = hoverIndex
      stateCopy[hoverIndex].position = dragIndex
      return stateCopy
    }
    case CONTAINER_CREATE:
    case CONTAINER_DELETE:
    case CONTAINER_EDIT:
    default:
      return state
  }
}

export const requestInitializeBoard = () => ({
  type: BOARD_INITIALIZE_REQUEST
})

export const requestMoveCard = (dragIndex, hoverIndex, listIndex) => ({
  type: CARD_MOVE_REQUEST,
  meta: { dragIndex, hoverIndex, listIndex }
})

export const requestMoveContainer = (dragIndex, hoverIndex) => ({
  type: CONTAINER_MOVE_REQUEST,
  meta: { dragIndex, hoverIndex }
})

export const requestMoveCardToOtherContainer = (card, listIndex) => ({
  type: CARD_MOVE_TO_OTHER_CONTAINER_REQUEST,
  meta: { card, listIndex }
})

export const requestDeleteCardFromOldContainer = (itemIndex, listIndex) => ({
  type: CARD_DELETE_FROM_OLD_CONTAINER_REQUEST,
  meta: { itemIndex, listIndex }
})

export const genericActionCreater = (type, payload, error, meta) => ({
  type,
  payload,
  error,
  meta
})

export default boardReducer
