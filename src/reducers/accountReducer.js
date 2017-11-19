import constants from '../constants'

var initialState = {
  currentUser: null
}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state)
  switch (action.type){
    case constants.CURRENT_USER_RECEIVED:
      // console.log('CURRENT_USER_RECEIVED:', JSON.stringify(action.data))
      updated['currentUser'] = action.data.user

      return updated

    default:
      return updated
  }
}