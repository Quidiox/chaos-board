import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './sagas/sagas'
import cardReducer from './reducers/cardReducer'
import containerReducer from './reducers/containerReducer'
import boardReducer from './reducers/boardReducer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({cards: cardReducer, containers: boardReducer, container: containerReducer}),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store
