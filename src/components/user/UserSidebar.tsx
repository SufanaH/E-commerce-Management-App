import { Link } from 'react-router-dom'

import useUserState from '../../hooks/useUserState'
import { FaThLarge, FaUser } from 'react-icons/fa'

import '../admin/_adminSidebar.scss'

const UserSidebar = () => {
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
            <Link to="/dashboard/user/profile">
              <FaUser className="icon" /> My Profile
            </Link>
          </li>
          <li>
            <Link to="/dashboard/user/orders">
              <FaThLarge className="icon" /> My orders
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default UserSidebar
