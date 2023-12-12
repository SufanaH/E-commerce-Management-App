import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { fetchOrders } from '../../redux/slices/orders/ordersSlice'
import UserSidebar from './UserSidebar'

const UserOrders = () => {
  const { isLoading, error } = useSelector((state: RootState) => state.ordersReducer)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  const ordersUser = [
    {
      name: 'Laptop',
      orderId: '#1234',
      orderDate: '2023-10-01'
    },
    {
      name: 'Smartphone',
      orderId: '#5678',
      orderDate: '2023-10-10'
    }
  ]

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
              <UserSidebar />
            </aside>
          </li>
          <li>
            <article>
              <div className="container">
                <div className="main-content">
                  <h3> My Orders : </h3>
                  <table className="category-table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Order ID</th>
                        <th>Order Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordersUser.map((order, index) => (
                        <tr key={index}>
                          <td>{order.name}</td>
                          <td>{order.orderId}</td>
                          <td>{order.orderDate}</td>
                        </tr>
                      ))}
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

export default UserOrders
