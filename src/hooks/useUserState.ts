import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'

const useUserState = () => {
  const { users, isLoading, isLoggedIn, userData, error, searchTerm, block } = useSelector(
    (state: RootState) => state.usersReducer
  )
  return {
    users,
    error,
    isLoading,
    isLoggedIn,
    userData,
    block,
    searchTerm
  }
}

export default useUserState
