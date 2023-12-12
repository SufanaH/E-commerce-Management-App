import { ChangeEvent } from 'react'

import { useDispatch } from 'react-redux'

import { sortProducts } from '../redux/slices/products/productSlice'

const SortProduct = () => {
  const dispatch = useDispatch()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    dispatch(sortProducts(selectedValue))
  }

  return (
    <div className="sort">
      <label> Sort By: </label>
      <select onChange={handleChange}>
        <option value="price" defaultValue="price">
          Price
        </option>
        <option value="name">Name</option>
        <option value="price-high">High to low price</option>
        <option value="price-low">Low to high price</option>
      </select>
    </div>
  )
}
export default SortProduct
