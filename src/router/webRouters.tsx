import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProtectedRouter from './UserProtectedRouter'
import AdminProtectedRouter from './AdminProtectedRouter'

import Home from '../pages/home/Home'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ProductDetails from '../pages/productDetails/ProductDetails'

import UserDashboard from '../pages/user/UserDashboard'
import UserProfile from '../pages/user/UserProfile'

import Login from '../pages/login/Login'
import Register from '../pages/register/Register'

import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import UserOrders from '../components/user/UserOrders'
import AdminOrders from '../components/admin/AdminOrders'
import UsersList from '../components/admin/UsersList'
import Categories from '../components/admin/Categories'
import AdminProducts from '../components/admin/AdminProducts'

import Contact from '../pages/contact/Contact'
import AboutUs from '../pages/aboutUs/AboutUs'
import Cart from '../pages/cart/Cart'

const Routers = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login pathName="" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/aboutus" element={<AboutUs />} />

          <Route path="/dashboard" element={<AdminProtectedRouter />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/categories" element={<Categories />} />
            <Route path="admin/products" element={<AdminProducts />} />
            <Route path="admin/users" element={<UsersList />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>

          <Route path="/dashboard" element={<UserProtectedRouter />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrders />} />
          </Route>

          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
export default Routers
