import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      filter
      <form onChange={(event) => dispatch(filterChange(event.target.value))}>
        <input name="filter" />
      </form>
    </div>
  )
}

export default VisibilityFilter