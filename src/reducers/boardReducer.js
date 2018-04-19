import {
  BOARD_INITIALIZE_REQUEST,
  BOARD_INITIALIZE,
  CARD_MOVE_REQUEST,
  CARD_MOVE,
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
  console.log('ACTION META', action.meta)
  switch (action.type) {
    case BOARD_INITIALIZE:
      return action.payload
    case CARD_MOVE:
      const { dragIndex, hoverIndex, listIndex } = action.meta
      const stateCopy = JSON.parse(JSON.stringify(state))
      const list = [...stateCopy[listIndex].items]
      list[dragIndex].position = hoverIndex
      list[hoverIndex].position = dragIndex
      console.log(stateCopy[listIndex].items)
      return stateCopy
    case CARD_CREATE:
    case CARD_DELETE:
    case CARD_EDIT:
    case CONTAINER_MOVE:
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

export const requestMoveContainer = () => ({
  type: CONTAINER_MOVE_REQUEST
})

export const genericActionCreater = (type, payload, meta, error) => ({
  type,
  payload,
  meta,
  error
})

export default boardReducer
