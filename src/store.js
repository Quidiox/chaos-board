import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './sagas/sagas'
import boardReducer from './reducers/boardReducer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({ containers: boardReducer }),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store
