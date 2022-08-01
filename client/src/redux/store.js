import { compose, configureStore } from "@reduxjs/toolkit"
import { persistStore } from "redux-persist"
import logger from "redux-logger"
import createSagaMiddleware from "redux-saga"

import persistReducer from "./root-reducer"
import rootSaga from "./root-saga"

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger)
}

const composeEnhancer =
  (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__) ||
  compose

export const store = configureStore({
  reducer: persistReducer,
  middleware: middlewares,
  compose: composeEnhancer
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

// eslint-disable-next-line
export default { store, persistStore }
