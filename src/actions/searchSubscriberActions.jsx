import { SEARCH_SUBSCRIBER } from './types'

export const searchSubscriber = user => {
  return {
    type: SEARCH_SUBSCRIBER,
    user
  }
}
