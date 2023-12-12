import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { fetchUsers, login } from '../../redux/slices/users/usersSlice'

import './_login.scss'
//import { toast } from 'react-toastify'
//import { v4 as uuidv4 } from 'uuid'
//import { useNavigate } from 'react-router-dom'

const Login = ({ pathName }: { pathName: string }) => {
  const { users } = useSelector((state: RootState) => state.usersReducer)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event?.target.name]: event?.target.value }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const foundUser = users.find((userData) => userData.email === user.email)
    if (!foundUser) {
      return console.log('The user doesnt found')
    }
    if (foundUser.password !== user.password) {
      return console.log('Wrong Password')
    }
    if (foundUser.block) {
      return console.log('Sorry you are blocked')
    }
    if (foundUser && foundUser.password === user.password) {
      dispatch(login(foundUser))
      navigate(pathName ? pathName : '/')
    } else {
      console.log('Password or Email are wrong')
    }
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <form className="login-form" action="login" onSubmit={handleSubmit}>
          <h1>Login</h1>
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
          <input
            type="password"
            name="password"
            placeholder="Password must be 6 character"
            onChange={handleChange}
            required
          />
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
