import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Orders = {
  id: number
  productId: number
  userId: number
  purchasedAt: Date
}

export type OrdersState = {
  orders: Orders[]
  error: null | string
  isLoading: boolean
  searchTerm: string
}

const initialState: OrdersState = {
  orders: [],
  error: null,
  isLoading: false,
  searchTerm: ''
}
const fetchOrders = createAsyncThunk('users/fetchOrders', async () => {
  try {
    const response = await api.get('/mock/e-commerce/orders.json')
    return response.data
  } catch (error) {
    console.log('Error in fetching', error)
    throw error
  }
})

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    searchOrder: (state, action) => {
      state.searchTerm = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'fetching api data error'
      })
  }
})

export { fetchOrders }
export const { searchOrder } = orderSlice.actions
export default orderSlice.reducer
