import { createStore, combineReducers, applyMiddleware, combose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './sagas/sagas'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import boardRecuder from './reducers/boardReducer'

const sagaMiddleware = createSagaMiddleware()
const history = createHistory()
const middleware = [routerMiddleware(history), sagaMiddleware]

const store = createStore(
  combineReducers({ board: boardRecuder, router: routerReducer }),
  composeWithDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

export default store
