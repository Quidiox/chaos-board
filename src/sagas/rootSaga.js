import { all } from 'redux-saga/effects'
import { boardSagas } from './boardSagas'
import { userSagas } from './userSagas'
import { userBoardsSagas } from './userBoardsSagas'
import { usersSagas } from './usersSagas'

export default function* rootSaga() {
  yield all([...boardSagas, ...userSagas, ...userBoardsSagas, ...usersSagas])
}
