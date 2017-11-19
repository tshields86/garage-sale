import constants from '../constants'

var initialState = {
  currentLocation: {lat:40.7224017, lng:-73.9896719}
}

export default (state = initialState, action) => {
  let updated = Object.assign({}, state)
  switch (action.type){
    case constants.LOCATION_CHANGED:
      // console.log('LOCATION CHANGED:', JSON.stringify(action.data))
      updated['currentLocation'] = action.data

      return updated

    default:
      return updated
  }
}