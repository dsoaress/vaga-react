import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from './modules/rootReducer'
import { rootSaga } from './modules/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

sagaMiddleware.run(rootSaga)

export { store }
