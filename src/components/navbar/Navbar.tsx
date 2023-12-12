import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'

import $ from 'jquery'

import { logout } from '../../redux/slices/users/usersSlice'
import CartElementIcon from '../CartElementIcon'

import './_navbar.scss'

const Navbar = () => {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer)
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)
  const [isSticky, setSticky] = useState(false)

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const handleChange = () => {
    dispatch(logout())
    navigate('/login')
  }

  //+-------Sticky navbar---------+///
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  //+------Navbar handling--------+///
  useEffect(() => {
    const handleNavClick = (e: JQuery.ClickEvent) => {
      const $target = $(e.target)
      if (!$target.is('a:only-child')) {
        $target.siblings('.nav-dropdown').slideToggle()
        $('.nav-dropdown').not($target.siblings()).hide()
        e.stopPropagation()
      }
    }

    const handleHtmlClick = () => {
      $('.nav-dropdown').hide()
    }

    $('#nav-toggle').on('click', function () {
      $('nav ul').slideToggle()
      this.classList.toggle('active')
    })

    $('nav ul li > a:not(:only-child)').on('click', handleNavClick)
    $('html').on('click', handleHtmlClick)

    return () => {
      $('nav ul li > a:not(:only-child)').off('click', handleNavClick)
      $('html').off('click', handleHtmlClick)
      $('#nav-toggle').off('click')
    }
  }, [])

  return (
    <div className={`navigation ${isSticky ? 'sticky' : ''}`}>
      <div className="nav-container">
        <div className="brand">
          <a href="/"> 🔆 StoreRise</a>
        </div>
        <nav className="nav-roll">
          <div className="nav-mobile">
            <a id="nav-toggle" href="#!">
              <span></span>
            </a>
          </div>
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <Link to={`/dashboard/${userData?.role}`}> {userData?.role} Dashboard</Link>
                </li>
                <li>
                  <Link to="/login" onClick={handleChange}>
                    Logout
                  </Link>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/cart">
                {' '}
                <CartElementIcon value={cartItems.length > 0 ? cartItems.length : 0} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
