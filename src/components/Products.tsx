import React, { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

import { Link } from 'react-router-dom'

import { Product, fetchProducts, searchProduct } from '../redux/slices/products/productSlice'

import Searching from './Searching'
import SortProduct from './SortProduct'

const Products = () => {
  const { products, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    dispatch(searchProduct(searchValue))
  }

  const searchedProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLocaleLowerCase().includes(searchTerm.toLowerCase())
      )
    : products

  if (isLoading) {
    return <p>Loading the data.. </p>
  }
  if (error) {
    return <p> Errors : {error}</p>
  }

  return (
    <section className="content">
      <Searching searchTerm={searchTerm} handleSearch={handleSearch} />
      <SortProduct />
      <div className="product">
        {searchedProducts.length > 0 &&
          searchedProducts.map((product: Product) => {
            return (
              <article key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <button>Buy</button>
                <Link to={`/products/${product.id}`}>
                  <button>Detailes</button>
                </Link>
              </article>
            )
          })}
      </div>
    </section>
  )
}

export default Products
