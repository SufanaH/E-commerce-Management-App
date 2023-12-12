import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import {
  Product,
  addProduct,
  deleteProduct,
  fetchProducts,
  searchProduct,
  updateProduct
} from '../../redux/slices/products/productSlice'

import AdminSidebar from './AdminSidebar'
import Searching from '../Searching'
import SortProduct from '../SortProduct'

import './_adminProduct.scss'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'

const AdminProducts = () => {
  const { products, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.productsReducer
  )
  const dispatch: AppDispatch = useDispatch()
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [editingProduct, setEditingProduct] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(0)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    dispatch(searchProduct(searchValue))
  }

  const searchedProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLocaleLowerCase().includes(searchTerm.toLowerCase())
      )
    : products

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id))
  }

  const handleEditForm = (id: number, name: string, price: number) => {
    setSelectedProductId(id)
    setEditingProduct(!editingProduct)
    setProductName(name)
    setProductPrice(price)
  }

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value)
  }

  const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(event.target.value)
    setProductPrice(price)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!editingProduct) {
      const newProduct = {
        id: new Date().getTime(),
        name: productName,
        price: Number(productPrice)
      }
      dispatch(addProduct(newProduct))
    } else {
      const updatedProduct = {
        id: selectedProductId,
        name: productName,
        price: Number(productPrice)
      }
      dispatch(updateProduct(updatedProduct))
    }
    setProductName('')
    setProductPrice(0)
  }

  if (isLoading) {
    return <p>Loading the data.. </p>
  }
  if (error) {
    return <p> Errors : {error}</p>
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-main-content">
        <ul>
          <li>
            <aside className="admin-sidebar">
              <AdminSidebar />
            </aside>
          </li>
          <li>
            <article>
              <div className="container">
                <div className="main-content">
                  <form action="" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="product"
                      value={productName}
                      placeholder="Product name"
                      onChange={handleChangeName}
                    />
                    <input
                      type="number"
                      name="price"
                      value={productPrice}
                      placeholder="Product price"
                      onChange={handleChangePrice}
                    />
                    <button>{editingProduct ? 'Update Product' : 'Create Product'}</button>
                  </form>
                  <div className="actions">
                    <Searching searchTerm={searchTerm} handleSearch={handleSearch} />
                    <SortProduct />
                  </div>
                  <table className="product-table">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedProducts.length > 0 &&
                        searchedProducts.map((product: Product) => {
                          return (
                            <tr key={product.id} className="product-row">
                              <td>{product.id}</td>
                              <td>
                                <img src={product.image} alt={product.name} />
                              </td>
                              <td>{product.name}</td>
                              <td>{product.price}$</td>
                              <td>
                                <button
                                  onClick={() =>
                                    handleEditForm(product.id, product.name, product.price)
                                  }>
                                  <FaPencilAlt />
                                </button>
                              </td>
                              <td>
                                <button
                                  onClick={() => {
                                    handleDelete(product.id)
                                  }}>
                                  <FaTrashAlt />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminProducts
