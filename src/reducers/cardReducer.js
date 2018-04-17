import {
  CARD_MOVE,
  CARD_CREATE,
  CARD_DELETE,
  CARD_EDIT
} from './actionTypes'

const cardReducer = (state = [], action) => {
  switch (action.type) {
    case CARD_MOVE:
    case CARD_CREATE:
    case CARD_DELETE:
    case CARD_EDIT:
    default:
      return state
  }
}

export default cardReducer
