import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  return (
    <div>
      filter
      <form onChange={(event) => dispatch(setFilter(event.target.value))}>
        <input name="filter" />
      </form>
    </div>
  )
}

export default VisibilityFilter