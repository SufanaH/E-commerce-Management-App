import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'

const useCategorystate = () => {
  const { categories, error, isLoading, searchTerm } = useSelector(
    (state: RootState) => state.categoriesReducer
  )
  return {
    categories,
    error,
    isLoading,
    searchTerm
  }
}

export default useCategorystate
