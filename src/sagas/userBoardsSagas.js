import { call, put, takeLatest, actionChannel, take } from 'redux-saga/effects'
import {
  BOARD_FETCH_BY_USER_REQUEST,
  BOARD_FETCH_BY_USER,
  BOARD_CREATE_REQUEST,
  BOARD_CREATE,
  BOARD_EDIT_REQUEST,
  BOARD_EDIT,
  BOARD_REMOVE_REQUEST,
  BOARD_REMOVE,
  BOARD_ADD_MEMBER_REQUEST,
  BOARD_ADD_MEMBER,
  BOARD_REMOVE_MEMBER_REQUEST,
  BOARD_REMOVE_MEMBER
} from '../reducers/actionTypes'
import apiService from '../api/userBoardsApiService'
import { genericActionCreator } from '../reducers/rootReducer'
import { withToken } from './helpers'

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

export const userBoardsSagas = [
  call(watchCreateBoard)
] 
