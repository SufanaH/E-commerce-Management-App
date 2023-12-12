import { FaShoppingCart } from 'react-icons/fa'

const CartElementIcon = ({ value }: { value: number }) => {
  return (
    <div className="cart-icon">
      <FaShoppingCart />
      <span className="budge"> {value}</span>
    </div>
  )
}

export default CartElementIcon
