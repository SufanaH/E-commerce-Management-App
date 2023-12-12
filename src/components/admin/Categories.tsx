import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'

import {
  Category,
  fetchCategories,
  searchCategory,
  deleteCategory,
  updateCategory,
  addCategory
} from '../../redux/slices/categories/categorySlice'

import Searching from '../Searching'
import AdminSidebar from './AdminSidebar'

import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import './_categoriesAdmin.scss'

const Categories = () => {
  const { categories, isLoading, error, searchTerm } = useSelector(
    (state: RootState) => state.categoriesReducer
  )

  const [categoryName, setCategoryName] = useState('')
  const [editingCategory, setEditingCategory] = useState(false)
  const [selectCategoryId, setSelectedCategoryId] = useState(0)

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    dispatch(searchCategory(searchValue))
  }

  const searchedCategories = searchTerm
    ? categories.filter((category) =>
        category.name.toLocaleLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories

  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id))
  }

  const handleEditForm = (id: number, name: string) => {
    setSelectedCategoryId(id)
    setEditingCategory(!editingCategory)
    setCategoryName(name)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!editingCategory) {
      const newCategory = { id: new Date().getTime(), name: categoryName }
      dispatch(addCategory(newCategory))
    } else {
      const updateCategoryDate = { id: selectCategoryId, name: categoryName }
      dispatch(updateCategory(updateCategoryDate))
    }
    setCategoryName('')
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
                      name="category"
                      value={categoryName}
                      placeholder="Category name"
                      onChange={handleChange}
                    />
                    <button>{editingCategory ? 'Update' : 'Create'}</button>
                  </form>
                  <div className="actions">
                    <Searching searchTerm={searchTerm} handleSearch={handleSearch} />
                  </div>
                  <table className="category-table">
                    <thead>
                      <tr>
                        {/* <th> ID</th> */}
                        <th>Category Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedCategories.length > 0 &&
                        searchedCategories.map((category: Category) => {
                          return (
                            <tr key={category.id} className="categories">
                              {/* <td>{category.id}</td> */}
                              <td>{category.name}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    handleEditForm(category.id, category.name)
                                  }}>
                                  <FaPencilAlt />
                                </button>
                              </td>
                              <td>
                                <button onClick={() => handleDelete(category.id)}>
                                  {' '}
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

export default Categories
