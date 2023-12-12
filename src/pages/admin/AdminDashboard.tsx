import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'

import { updateUser } from '../../redux/slices/users/usersSlice'

import useUserState from '../../hooks/useUserState'
import AdminSidebar from '../../components/admin/AdminSidebar'

import './_adminDashboard.scss'

const AdminDashboard = () => {
  const dispatch: AppDispatch = useDispatch()
  const { userData } = useUserState()
  const [editProfileForm, setEditProfileForm] = useState(false)
  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email
  })

  const handleEditForm = () => {
    setEditProfileForm(!editProfileForm)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const updateUserDate = { id: userData?.id, ...user }
    dispatch(updateUser(updateUserDate))
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
              <div className="main-admin-dashboard">
                {userData && (
                  <div>
                    <p> {`ID: ${userData.id}`} </p>
                    <p> {`Name: ${userData.firstName} ${userData.lastName} `} </p>
                    <p> {`Email: ${userData.email}`} </p>
                    <p> {`Role: ${userData.role}`} </p>
                    <button onClick={handleEditForm}> Edit profile</button>
                    {editProfileForm && (
                      <form action="edit-profile" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          name="firstName"
                          value={user.firstName}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={user.lastName}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="email"
                          value={user.email}
                          onChange={handleChange}
                        />
                        <button className="button2" type="submit">
                          Update
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </article>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminDashboard
