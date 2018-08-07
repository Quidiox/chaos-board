import { call, put, takeLatest } from 'redux-saga/effects'
import {
  BOARD_FETCH_BY_USER_REQUEST,
  BOARD_FETCH_BY_USER,
  BOARD_CREATE_REQUEST,
  BOARD_CREATE,
  BOARD_EDIT_REQUEST,
  BOARD_EDIT,
  BOARD_DELETE_REQUEST,
  BOARD_DELETE
} from '../reducers/actionTypes'
import apiService from '../api/userBoardsApiService'
import { genericActionCreator } from '../reducers/rootReducer'
import { withToken } from './helpers'

function* fetchBoardsByUser(token, action) {
  try {
    const response = yield call(
      apiService.fetchBoardsByUser,
      token,
      action.payload
    )
    yield put(genericActionCreator(BOARD_FETCH_BY_USER, response))
  } catch (error) {
    console.log(error)
  }
}

function* watchFetchBoardsByUser() {
  yield takeLatest(BOARD_FETCH_BY_USER_REQUEST, withToken(fetchBoardsByUser))
}

function* createBoard(token, action) {
  try {
    const response = yield call(apiService.createBoard, token, action.payload)
    yield put(genericActionCreator(BOARD_CREATE, response))
  } catch (error) {
    console.log(error)
  }
}

function* watchCreateBoard() {
  yield takeLatest(BOARD_CREATE_REQUEST, withToken(createBoard))
}

function* editBoard(token, action) {
  try {
    const response = yield call(apiService.editBoard, token, action.payload)
    yield put(genericActionCreator(BOARD_EDIT, response))
  } catch (error) {
    console.log(error)
  }
}

function* watchEditBoard() {
  yield takeLatest(BOARD_EDIT_REQUEST, withToken(editBoard))
}

function* deleteBoard(token, action) {
  try {
    yield call(apiService.deleteBoard, token, action.payload)
    yield put(genericActionCreator(BOARD_DELETE, action.payload))
  } catch (error) {
    console.log(error)
  }
}

function* watchDeleteBoard() {
  yield takeLatest(BOARD_DELETE_REQUEST, withToken(deleteBoard))
}

export const userBoardsSagas = [
  call(watchCreateBoard),
  call(watchFetchBoardsByUser),
  call(watchEditBoard),
  call(watchDeleteBoard)
]
