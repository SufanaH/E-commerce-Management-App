import React, { ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'

import {
  Users,
  fetchUsers,
  searchUser,
  deleteUser,
  blockUser
} from '../../redux/slices/users/usersSlice'

import useUserState from '../../hooks/useUserState'

import Searching from '../Searching'
import AdminSidebar from './AdminSidebar'

import './_userList.scss'
import { FaTrashAlt } from 'react-icons/fa'

const UsersList = () => {
  const { users, isLoading, error, searchTerm } = useUserState()

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    dispatch(searchUser(searchValue))
  }

  const searchedUsers = searchTerm
    ? users.filter((user) => user.firstName.toLocaleLowerCase().includes(searchTerm.toLowerCase()))
    : users

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id))
  }

  const handleBlock = (id: number) => {
    dispatch(blockUser(id))
  }

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
                  <div className="actions">
                    <Searching searchTerm={searchTerm} handleSearch={handleSearch} />
                  </div>
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Block</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedUsers.length > 0 &&
                        searchedUsers.map((user: Users) => {
                          return (
                            <tr key={user.id} className="users">
                              <td>{`${user.firstName} ${user.lastName}`}</td>
                              <td>{user.email}</td>
                              <td>{user.role}</td>
                              <td>
                                <button onClick={() => handleBlock(user.id)}>
                                  {user.block ? 'Unblock' : ' 🚫 Block'}
                                </button>
                              </td>
                              <td>
                                <button onClick={() => handleDelete(user.id)}>
                                  {' '}
                                  <FaTrashAlt />{' '}
                                </button>
                              </td>
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

export default UsersList
