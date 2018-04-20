import { call, put, takeLatest, all } from 'redux-saga/effects'
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
  CONTAINER_MOVE
} from '../reducers/actionTypes'
import apiService from '../api/apiService'
import { genericActionCreater } from '../reducers/boardReducer'

function* initializeBoard() {
  try {
    const containers = yield call(apiService.fetchAllContainers)
    yield put(genericActionCreater(BOARD_INITIALIZE, containers))
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
    const { listIndex, card } = action.meta
    const response = yield call(apiService.moveCardToAnotherContainer, action)
    yield put(
      genericActionCreater(CARD_MOVE_TO_OTHER_CONTAINER, card, null, listIndex)
    )
  } catch (error) {
    console.log(error)
  }
}

function* watchMoveCardToOtherContainer() {
  yield takeLatest(
    CARD_MOVE_TO_OTHER_CONTAINER_REQUEST,
    moveCardToOtherContainer
  )
}

function* deleteCardFromOldContainer(action) {
  try {
    const meta = action.meta
    const response = yield call(apiService.deleteCardFromOldContainer, meta)
    yield put(
      genericActionCreater(CARD_DELETE_FROM_OLD_CONTAINER, null, null, meta)
    )
  } catch (error) {
    console.log(error)
  }
}

function* watchDeleteCardFromOldContainer() {
  yield takeLatest(
    CARD_DELETE_FROM_OLD_CONTAINER_REQUEST,
    deleteCardFromOldContainer
  )
}

function* moveContainer(action) {
  try {
    const meta = { ...action.meta }
    const response = yield call(apiService.changeContainerOrder, meta)
    yield put(genericActionCreater(CONTAINER_MOVE, null, null, meta))
  } catch (error) {
    console.log(error)
  }
}

function* watchMoveContainer() {
  yield takeLatest(CONTAINER_MOVE_REQUEST, moveContainer)
}

export default function* rootSaga() {
  yield all([
    call(watchInitializeBoard),
    call(watchMoveCard),
    call(watchMoveCardToOtherContainer),
    call(watchDeleteCardFromOldContainer),
    call(watchMoveContainer)
  ])
}
