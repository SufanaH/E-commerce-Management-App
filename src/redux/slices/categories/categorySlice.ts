import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Category = {
  id: number
  name: string
}

export type CategorytState = {
  categories: Category[]
  error: null | string
  isLoading: boolean
  searchTerm: string
}

const initialState: CategorytState = {
  categories: [],
  error: null,
  isLoading: false,
  searchTerm: ''
}
const fetchCategories = createAsyncThunk('users/fetchCategories', async () => {
  try {
    const response = await api.get('/mock/e-commerce/categories.json')
    return response.data
  } catch (error) {
    console.log('Error in fetching', error)
    throw error
  }
})

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    searchCategory: (state, action) => {
      state.searchTerm = action.payload
    },
    deleteCategory: (state, action) => {
      const filterCategories = state.categories.filter((category) => category.id !== action.payload)
      state.categories = filterCategories
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload
      const foundCategory = state.categories.find((category) => category.id === id)
      if (foundCategory) {
        foundCategory.name = name
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'fetching api data error'
      })
  }
})

export { fetchCategories }
export const { searchCategory, deleteCategory, addCategory, updateCategory } = categorySlice.actions

export default categorySlice.reducer
