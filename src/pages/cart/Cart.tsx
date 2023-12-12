import React, { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { deleteItemFromCart } from '../../redux/slices/cart/cartSlice'

import { FaTrashAlt } from 'react-icons/fa'
import './_cart.scss'

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cartReducer)
  const [paymentForm, setPaymentForm] = useState(false)
  const [addressForm, setAddressForm] = useState(false)
  const dispatch: AppDispatch = useDispatch()

  const handleDeleteItem = (id: number) => {
    dispatch(deleteItemFromCart(id))
  }

  const handlePaymentForm = () => {
    setPaymentForm(!paymentForm)
  }
  const handleAddressFrom = () => {
    setAddressForm(!addressForm)
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
  }
  const cartTotal = () => {
    let totalAmount = 0
    cartItems.length > 0 &&
      cartItems.map((cartItem) => (totalAmount = totalAmount + cartItem.price))
    return totalAmount
  }
  return (
    <div>
      <div className="cart-main">
        <ul className="cart-ul">
          <li>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem, index) => (
                  <tr key={`${cartItem.id}_${cartItem.name}_${index}`}>
                    <td>
                      <img src={cartItem.image} alt={cartItem.name} className="cart-image" />
                    </td>
                    <td>{cartItem.name}</td>
                    <td>{cartItem.description.substring(0, 30)}...</td>
                    <td className="price-td">{cartItem.price}$</td>
                    <td>
                      <button onClick={() => handleDeleteItem(cartItem.id)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </li>
          {/*--------------Chechout-----------------*/}
          <li className="right-li">
            <div className="checkout-right">
              <h2> Cart Summery </h2>
              <h3>
                {' '}
                Total Amount : <p className="price-p"> {cartTotal()}$ </p>{' '}
              </h3>
              <h3>
                {' '}
                Delivery Address: <p> Saudi Arabia, Riyadh</p>
              </h3>
              <button className="cart-btn" onClick={handleAddressFrom}>
                {' '}
                Update Address{' '}
              </button>
              {addressForm && (
                <form className="cart-form" action="add-address" onSubmit={handleSubmit}>
                  <input type="text" name="update-address" placeholder="Country, city, street" />
                  <button className="cart-btn" type="submit">
                    Update
                  </button>
                </form>
              )}
              <button className="cart-btn-2" onClick={handlePaymentForm}>
                {' '}
                Buy{' '}
              </button>
              {paymentForm && (
                <form action="add-payment" onSubmit={handleSubmit} className="cart-form">
                  <input type="text" name="card-number" placeholder="Card Number" />
                  <input type="text" name="name-on-card" placeholder="Name on card" />
                  <input type="text" name="expiry-date" placeholder="MM/DD/YYYY" />
                  <button className="cart-btn-2" type="submit">
                    Buy Now
                  </button>
                </form>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Cart
