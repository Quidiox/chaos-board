import { call, put, takeLatest, actionChannel, take } from 'redux-saga/effects'
import {
  BOARD_INITIALIZE_REQUEST,
  BOARD_INITIALIZE,
  CARD_MOVE_REQUEST,
  CONTAINER_MOVE_REQUEST,
  CONTAINER_MOVE,
  CARD_CREATE_REQUEST,
  CARD_CREATE,
  CARD_EDIT_REQUEST,
  CARD_EDIT,
  CONTAINER_CREATE_REQUEST,
  CONTAINER_CREATE,
  CONTAINER_DELETE_REQUEST,
  CONTAINER_DELETE,
  CONTAINER_EDIT_REQUEST,
  CONTAINER_EDIT,
  CARD_DELETE_REQUEST,
  CARD_DELETE,
  CARD_MOVE_BETWEEN_CONTAINERS_REQUEST,
  CARD_MOVE_BETWEEN_CONTAINERS
} from '../reducers/actionTypes'
import apiService from '../api/apiService'
import { genericActionCreator } from '../reducers/boardReducer'

function* initializeBoard() {
  try {
    const board = yield call(apiService.fetchBoard)
    yield put(genericActionCreator(BOARD_INITIALIZE, board))
  } catch (error) {
    console.log(error)
  }
}
function* watchInitializeBoard() {
  yield takeLatest(BOARD_INITIALIZE_REQUEST, initializeBoard)
}

function* moveCard(action) {
  try {
    yield call(apiService.moveCard, action.payload)
  } catch (error) {
    console.log(error)
  }
}

function* moveCardBetweenContainers(action) {
  try {
    yield call(apiService.moveCardBetweenContainers, action.payload)
    yield put(
      genericActionCreator(CARD_MOVE_BETWEEN_CONTAINERS, action.payload)
    )
  } catch (error) {
    console.log(error)
  }
}

function* moveContainer(action) {
  try {
    yield call(apiService.moveContainer, action.payload)
    yield put(genericActionCreator(CONTAINER_MOVE, action.payload))
  } catch (error) {
    console.log(error)
  }
}

function* createContainer(action) {
  try {
    const response = yield call(apiService.createContainer, action.payload)
    yield put(genericActionCreator(CONTAINER_CREATE, response))
  } catch (error) {
    console.log(error)
  }
}
function* watchCreateContainer() {
  yield takeLatest(CONTAINER_CREATE_REQUEST, createContainer)
}

function* createCard(action) {
  try {
    const response = yield call(apiService.createCard, action.payload)
    yield put(genericActionCreator(CARD_CREATE, response))
  } catch (error) {
    console.log(error)
  }
}

function* watchCreateCard() {
  yield takeLatest(CARD_CREATE_REQUEST, createCard)
}

function* editCard(action) {
  try {
    const response = yield call(apiService.editCard, action.payload)
    yield put(
      genericActionCreator(CARD_EDIT, response, null, {
        containerId: action.payload.containerId
      })
    )
  } catch (error) {
    console.log(error)
  }
}

function* watchEditCard() {
  yield takeLatest(CARD_EDIT_REQUEST, editCard)
}

function* deleteCard(action) {
  try {
    yield call(apiService.deleteCard, action.payload)
    yield put(genericActionCreator(CARD_DELETE, action.payload))
  } catch (error) {
    console.log(error)
  }
}

function* watchDeleteCard() {
  yield takeLatest(CARD_DELETE_REQUEST, deleteCard)
}

function* deleteContainer(action) {
  try {
    yield call(apiService.deleteContainer, action.payload)
    yield put(genericActionCreator(CONTAINER_DELETE, action.payload))
  } catch (error) {
    console.log(error)
  }
}

function* watchDeleteContainer() {
  yield takeLatest(CONTAINER_DELETE_REQUEST, deleteContainer)
}

function* editContainer(action) {
  try {
    const response = yield call(apiService.editContainer, action.payload)
    yield put(genericActionCreator(CONTAINER_EDIT, response))
  } catch (error) {
    console.log(error)
  }
}

function* watchEditContainer() {
  yield takeLatest(CONTAINER_EDIT_REQUEST, editContainer)
}

function* watchDragAndDrop() {
  const requestChannel = yield actionChannel('*')
  while (true) {
    const action = yield take(requestChannel)
    switch (action.type) {
      case CARD_MOVE_REQUEST: {
        yield call(moveCard, action)
        break
      }
      case CONTAINER_MOVE_REQUEST: {
        yield call(moveContainer, action)
        break
      }
      case CARD_MOVE_BETWEEN_CONTAINERS_REQUEST: {
        yield call(moveCardBetweenContainers, action)
        break
      }
      default:
        break
    }
  }
}

export const boardSagas = [
  call(watchDragAndDrop),
  call(watchInitializeBoard),
  call(watchCreateContainer),
  call(watchCreateCard),
  call(watchEditCard),
  call(watchDeleteCard),
  call(watchEditContainer),
  call(watchDeleteContainer)
]