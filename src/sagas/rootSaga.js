import { all } from 'redux-saga/effects'
import { boardSagas } from './boardSagas'

export default function* rootSaga() {
  yield all([...boardSagas])
}

