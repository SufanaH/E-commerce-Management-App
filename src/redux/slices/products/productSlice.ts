import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  productData: Product | null
  singleProduct: Product
  searchTerm: string
}
const data =
  localStorage.getItem('productData') !== null
    ? JSON.parse(String(localStorage.getItem('productDate')))
    : []
const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  singleProduct: {} as Product,
  productData: data.userData,
  searchTerm: ''
}

const fetchProducts = createAsyncThunk('users/fetchProducts', async () => {
  try {
    const response = await api.get('/mock/e-commerce/products.json')
    return response.data
  } catch (error) {
    console.log('Error in fetching', error)
    throw error
  }
})

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTerm = action.payload
    },
    sortProducts: (state, action) => {
      const sortingCriteria = action.payload

      if (sortingCriteria === 'price') {
        state.products.sort((a, b) => a.price - b.price)
      } else if (sortingCriteria === 'name') {
        state.products.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortingCriteria === 'price-high') {
        state.products.sort((a, b) => b.price - a.price)
      } else if (sortingCriteria === 'price-low') {
        state.products.sort((a, b) => a.price - b.price)
      }
    },
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    deleteProduct: (state, action) => {
      const filterProducts = state.products.filter((product) => product.id !== action.payload)
      state.products = filterProducts
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    updateProduct: (state, action) => {
      const { id, name, price } = action.payload
      const foundProductId = state.products.find((product) => product.id === id)
      if (foundProductId) {
        foundProductId.name = name
        foundProductId.price = price
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'fetching api data error'
      })
  }
})
export { fetchProducts }
export const {
  findProductById,
  searchProduct,
  sortProducts,
  deleteProduct,
  updateProduct,
  addProduct
} = productSlice.actions
export default productSlice.reducer
