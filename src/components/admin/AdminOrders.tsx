import { useEffect } from 'react'

import { fetchOrders } from '../../redux/slices/orders/ordersSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'

import AdminSidebar from './AdminSidebar'

const AdminOrders = () => {
  const { orders, isLoading, error } = useSelector((state: RootState) => state.ordersReducer)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  if (isLoading) {
    return <p>Loading the data.. </p>
  }
  if (error) {
    return <p> Errors : {error}</p>
  }
  return (
    <div className="dashboard-container">
      <div className="dashboard-main-content">
        <ul>
          <li>
            <aside className="admin-sidebar">
              <AdminSidebar />
            </aside>
          </li>
          <li>
            <article>
              <div className="container">
                <div className="main-content">
                  <h3> Users Orders </h3>
                  <div className="actions"></div>
                  <table className="category-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>User ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 &&
                        orders.map((Order) => {
                          return (
                            <tr key={Order.id} className="order">
                              <td> {Order.productId} </td>
                              <td> {Order.purchasedAt.toString()} </td>
                              <td> {Order.userId} </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminOrders
