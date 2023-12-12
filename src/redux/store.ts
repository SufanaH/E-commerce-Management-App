import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import categorySlice from './slices/categories/categorySlice'
import usersSlice from './slices/users/usersSlice'
import ordersSlice from './slices/orders/ordersSlice'
import cartSlice from './slices/cart/cartSlice'

export const store = configureStore({
  reducer: {
    productsReducer: productsReducer,
    categoriesReducer: categorySlice,
    usersReducer: usersSlice,
    ordersReducer: ordersSlice,
    cartReducer: cartSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
