import { BOARD_INITIALIZE, BOARD_INITIALIZE_REQUEST } from './actionTypes'

const boardReducer = (state = [], action) => {
  console.log('ACTION TYPE: ', action.type)
  console.log('ACTION PAYLOAD', action.payload)
  switch (action.type) {
    case BOARD_INITIALIZE:
      return action.payload
    default:
      return state
  }
}

export const initializeBoard = containers => ({
  type: BOARD_INITIALIZE,
  payload: containers
})

export const requestInitializeBoard = () => ({
  type: BOARD_INITIALIZE_REQUEST
})

export default boardReducer
