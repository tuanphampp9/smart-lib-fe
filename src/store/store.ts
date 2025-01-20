import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import userSlice from './slices/userSlice'
import topicSlice from './slices/topicSlice'
import categorySlice from './slices/categorySlice'
import publisherSlice from './slices/publisherSlice'
import languageSlice from './slices/languageSlice'
import warehouseSlice from './slices/warehouseSlice'
const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    user: userSlice,
    topic: topicSlice,
    category: categorySlice,
    publisher: publisherSlice,
    language: languageSlice,
    warehouse: warehouseSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
