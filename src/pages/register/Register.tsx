import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'

import { fetchUsers, addUser } from '../../redux/slices/users/usersSlice'

import './_register.scss'

const Register = () => {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'User',
    block: false
  })

  const [isError, setError] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [event?.target.name]: event?.target.value }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const newUser = { id: new Date().getTime(), ...user }
    if (user.firstName.length < 2) {
      setError('First name must be at leat 2 character')
      return
    }
    if (user.password.length < 6) {
      setError('Password must be 6 characters ')
      return
    }
    dispatch(fetchUsers()).then(() => dispatch(addUser(newUser)))
    navigate('/dashboard/User')
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <form className="login-form" action="login" onSubmit={handleSubmit}>
          <h1>Resgister</h1>
          <div>
            <label htmlFor="firstName"> First Name </label>
            <input
              type="text"
              name="firstName"
              id="fisrtName"
              value={user.firstName}
              onChange={handleChange}
              required
            />
            <p>{isError}</p>
          </div>
          <label htmlFor="lastName"> Last Name </label>
          <input
            type="text"
            name="lastName"
            id="lasttName"
            value={user.lastName}
            onChange={handleChange}
            required
          />
          <label htmlFor="email"> Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password"> Password: </label>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password must be 6 character"
              onChange={handleChange}
              required
            />
            <p>{isError}</p>
          </div>
          <button className="btn" type="submit">
            Resgister
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
