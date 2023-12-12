import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'

export type Users = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  block: boolean
}

export type UserState = {
  users: Users[]
  error: null | string
  isLoading: boolean
  isLoggedIn: boolean
  userData: Users | null
  block: boolean
  searchTerm: string
}

const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []

const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData,
  block: false,
  searchTerm: ''
}
const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await api.get('/mock/e-commerce/users.json')
    return response.data
  } catch (error) {
    console.log('Error in fetching', error)
    throw error
  }
})

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.searchTerm = action.payload
    },
    login: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    blockUser: (state, action) => {
      const id = action.payload
      const foundUser = state.users.find((user) => user.id === id)
      if (foundUser) {
        foundUser.block = !foundUser.block
      }
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    deleteUser: (state, action) => {
      const filterUsers = state.users.filter((user) => user.id !== action.payload)
      state.users = filterUsers
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName, email } = action.payload
      const foundUser = state.users.find((user) => user.id === id)
      if (foundUser) {
        foundUser.firstName = firstName
        foundUser.lastName = lastName
        foundUser.email = email
        state.userData = foundUser
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'fetching api data error'
      })
  }
})

export { fetchUsers }
export const { login, logout, deleteUser, blockUser, addUser, searchUser, updateUser } =
  userSlice.actions
export default userSlice.reducer
