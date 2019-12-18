import { SEARCH_SUBSCRIBER } from '../actions/types'

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_SUBSCRIBER:
      return {
        ...state,
        name: action.user.name,
        lastName: action.user.lastName,
        code: action.user.code,
        career: action.user.career
      }
    default:
      return state
  }
}
