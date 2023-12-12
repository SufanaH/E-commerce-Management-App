import { Link } from 'react-router-dom'

import useUserState from '../../hooks/useUserState'

import './_adminSidebar.scss'
import { FaBox, FaShoppingCart, FaThLarge, FaUser, FaUsers } from 'react-icons/fa'

const AdminSidebar = () => {
  const { userData } = useUserState()
  return (
    <div className="sidebar-container">
      <aside className="sidebar">
        <div className="profile-icon">
          <div className="circle">
            <FaUser className="user-icon" />
          </div>
        </div>
        <p> {`${userData?.firstName} ${userData?.lastName}`} </p>
        <ul>
          <li>
            <Link to="/dashboard/admin">
              <FaUser className="icon" /> My Profile
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/categories">
              {' '}
              <FaThLarge className="icon" /> Categories{' '}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/products">
              {' '}
              <FaBox className="icon" /> Products{' '}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/orders">
              {' '}
              <FaShoppingCart className="icon" /> Orders{' '}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/users">
              {' '}
              <FaUsers className="icon" /> Users{' '}
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default AdminSidebar
