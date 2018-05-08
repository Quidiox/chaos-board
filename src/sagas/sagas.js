import { call, put, takeLatest, takeEvery, all } from 'redux-saga/effects'
import {
  BOARD_INITIALIZE_REQUEST,
  BOARD_INITIALIZE,
  CARD_MOVE_REQUEST,
  CARD_MOVE,
  CARD_MOVE_TO_OTHER_CONTAINER_REQUEST,
  CARD_MOVE_TO_OTHER_CONTAINER,
  CARD_DELETE_FROM_OLD_CONTAINER_REQUEST,
  CARD_DELETE_FROM_OLD_CONTAINER,
  CONTAINER_MOVE_REQUEST,
  CONTAINER_MOVE,
  CONTAINER_CREATE_REQUEST,
  CONTAINER_CREATE
} from '../reducers/actionTypes'
import apiService from '../api/apiService'
import { genericActionCreater } from '../reducers/boardReducer'

function* initializeBoard() {
  try {
    const board = yield call(apiService.fetchBoard)
    yield put(genericActionCreater(BOARD_INITIALIZE, board))
  } catch (error) {
    console.log(error)
  }
}

function* watchInitializeBoard() {
  yield takeLatest(BOARD_INITIALIZE_REQUEST, initializeBoard)
}

function* moveCard(action) {
  try {
    const meta = { ...action.meta }
    const response = yield call(apiService.changeCardOrder, meta)
    console.log(response)
    yield put(genericActionCreater(CARD_MOVE, null, null, meta))
  } catch (error) {
    console.log(error)
  }
}

function* watchMoveCard() {
  yield takeLatest(CARD_MOVE_REQUEST, moveCard)
}

function* moveCardToOtherContainer(action) {
  try {
    const { containerPosition, card, containerId } = action.meta
    const data = { cardId: card.id, containerId }
    yield put(
      genericActionCreater(CARD_MOVE_TO_OTHER_CONTAINER, card, null, containerPosition)
    )
    const response = yield call(apiService.moveCardToAnotherContainer, data)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

function* watchMoveCardToOtherContainer() {
  yield takeEvery(
    CARD_MOVE_TO_OTHER_CONTAINER_REQUEST,
    moveCardToOtherContainer
  )
}

function* deleteCardFromOldContainer(action) {
  try {
    const meta = { ...action.meta }
    yield put(
      genericActionCreater(CARD_DELETE_FROM_OLD_CONTAINER, null, null, meta)
    )
    const response = yield call(apiService.deleteCardFromOldContainer, meta)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

function* watchDeleteCardFromOldContainer() {
  yield takeEvery(
    CARD_DELETE_FROM_OLD_CONTAINER_REQUEST,
    deleteCardFromOldContainer
  )
}

function* moveContainer(action) {
  try {
    const meta = { ...action.meta }
    const response = yield call(apiService.changeContainerOrder, meta)
    console.log(response)
    yield put(genericActionCreater(CONTAINER_MOVE, null, null, meta))
  } catch (error) {
    console.log(error)
  }
}

function* watchMoveContainer() {
  yield takeLatest(CONTAINER_MOVE_REQUEST, moveContainer)
}

function* createContainer(action) {
  try {
    const response = yield call(apiService.createContainer, action.payload)
    console.log(response)
    yield put(genericActionCreater(CONTAINER_CREATE, response))
  } catch (error) {
    console.log(error)
  }
}

function* watchCreateContainer() {
  yield takeLatest(CONTAINER_CREATE_REQUEST, createContainer)
}

export default function* rootSaga() {
  yield all([
    call(watchInitializeBoard),
    call(watchMoveCard),
    call(watchMoveCardToOtherContainer),
    call(watchDeleteCardFromOldContainer),
    call(watchMoveContainer),
    call(watchCreateContainer)
  ])
}
