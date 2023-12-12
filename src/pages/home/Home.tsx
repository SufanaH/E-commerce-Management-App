import { ChangeEvent, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import { Product, fetchProducts, searchProduct } from '../../redux/slices/products/productSlice'

import SortProduct from '../../components/SortProduct'
import Searching from '../../components/Searching'
import HeroSection from '../../components/hero/HeroSection'
import { addToCart } from '../../redux/slices/cart/cartSlice'

import {
  FaCartPlus,
  FaHeart,
  FaShippingFast,
  FaPhoneAlt,
  FaCreditCard,
  FaChevronRight,
  FaChevronLeft
} from 'react-icons/fa'
import { Card } from 'react-bootstrap'

import './_home.scss'

const Home = () => {
  const { products, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)
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

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = searchedProducts.slice(indexOfFirstItem, indexOfLastItem)

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev <= 1 ? 1 : prev - 1))
  }

  const totalPages = Math.ceil(searchedProducts.length / itemsPerPage)

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }
  if (isLoading) {
    return <p>Loading the data.. </p>
  }
  if (error) {
    return <p> Errors : {error}</p>
  }
  return (
    <div className="container">
      <HeroSection />
      <div className="bar">
        <div className="cards-container">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <div className="icon">
                <FaShippingFast />
              </div>
              <Card.Title>Free Shipping</Card.Title>
              <Card.Text>Free shipping on first month</Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <div className="icon">
                <FaPhoneAlt />
              </div>
              <Card.Title>Support 24/7</Card.Title>
              <Card.Text>Contact us 24 hrs a day</Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <div className="icon">
                <FaCreditCard />
              </div>
              <Card.Title>Payment</Card.Title>
              <Card.Text>We accepted all types of payments</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="main-content">
        <div className="actions">
          <Searching searchTerm={searchTerm} handleSearch={handleSearch} />
          <SortProduct />
        </div>
        <section className="product">
          {currentItems.length > 0 &&
            currentItems.map((product: Product) => {
              return (
                <article key={product.id} className="product-card">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="footer-card">
                    <p>{product.price} $</p>
                    <div>
                      <button
                        onClick={() => {
                          handleAddToCart(product)
                        }}>
                        <FaCartPlus className="cart-icon" />
                      </button>
                      <button>
                        <FaHeart className="wishlist-icon" />
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
        </section>

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            <FaChevronLeft />
          </button>
          <div className="page-numbers">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => changePage(number)}
                className={currentPage === number ? 'active' : ''}>
                {number}
              </button>
            ))}
          </div>
          <button onClick={nextPage} disabled={indexOfLastItem >= searchedProducts.length}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
