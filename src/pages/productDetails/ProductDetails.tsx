import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { findProductById } from '../../redux/slices/products/productSlice'

import './_productDetails.scss'
import { FaShoppingCart } from 'react-icons/fa'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { singleProduct, isLoading, error } = useSelector(
    (state: RootState) => state.productsReducer
  )

  const { categories } = useSelector((state: RootState) => state.categoriesReducer)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(findProductById(Number(id)))
  }, [])

  const getCategoryNameById = (categoriesId: number) => {
    const category = categories.find((category) => category.id === categoriesId)
    return category ? category.name + '  ' : 'There is no category for this one'
  }

  if (isLoading) {
    return <p>Loading the data.. </p>
  }
  if (error) {
    return <p> Errors : {error}</p>
  }
  return (
    <div className="product-container">
      <div className="product-box">
        <div className="details-form">
          {singleProduct && (
            <ul>
              <li>
                <div className="image">
                  <img src={singleProduct.image} alt={singleProduct.name} />
                </div>
              </li>
              <li>
                <div className="info">
                  <h3>Product Details</h3>
                  <h3>{singleProduct.name}</h3>
                  <p>Description: {singleProduct.description}</p>
                  <p>
                    Categories:
                    {singleProduct.categories &&
                      singleProduct.categories.map((categoryId) => getCategoryNameById(categoryId))}
                  </p>
                  <p>Price: ${singleProduct.price}</p>
                  <p>Size: {singleProduct.sizes && singleProduct.sizes.join(', ')}</p>
                  <p>Variants: {singleProduct.variants}</p>
                  <button className="btn">
                    <FaShoppingCart className="order-icon" /> Add to Cart
                  </button>
                  <button className="btn-2" onClick={() => navigate('/')}>
                    Back to Shopping
                  </button>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
