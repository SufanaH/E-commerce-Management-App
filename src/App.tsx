import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Routers from './router/webRouters'
import { AppDispatch } from './redux/store'
import { fetchProducts } from './redux/slices/products/productSlice'
import { fetchUsers } from './redux/slices/users/usersSlice'
import { fetchCategories } from './redux/slices/categories/categorySlice'
import { fetchOrders } from './redux/slices/orders/ordersSlice'

import './App.css'

function App() {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchUsers())
    dispatch(fetchCategories())
    dispatch(fetchOrders())
  }, [])
  return (
    <div className="App">
      <>
        <Routers />
      </>
    </div>
  )
}

export default App
