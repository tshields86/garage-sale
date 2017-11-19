import constants from '../constants'
import { TurboClient, HTTPAsync } from '../utils'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	Here are a few sample actions for User managment.
	Feel free to remove and replace with your own actions
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

export default {

	addItem: (item) => {
		return dispatch => {
			return dispatch(HTTPAsync.post('/api/item', item, constants.ITEM_ADDED))
		}
	},

	locationChanged: (location) => {
		return {
			type: constants.LOCATION_CHANGED,
			data: location
		}
	},

	// this is an asyn AsyncAction
	currentUser: () => {
		return dispatch => {
			return dispatch(HTTPAsync.get('/auth/currentuser', null, constants.CURRENT_USER_RECEIVED))
		}
	},

	fetchItems: () => {
		return dispatch => {
			return dispatch(HTTPAsync.get('/api/item', null, constants.FETCH_ITEMS))
		}
	},

	submitOrder: (order) => {
		return dispatch => {
			return dispatch(HTTPAsync.post('/api/order', order, null))
		}
	},

	sendEmail: (email) => {
		return dispatch => {
			return dispatch(HTTPAsync.post('/email/send', email, null))
		}
	}


	// fetchUsers: (params) => {
	// 	return dispatch => {
	// 		return dispatch(TurboClient.getRequest('user', params, constants.USERS_RECEIVED))
	// 	}
	// },

	// addUser: (params) => {
	// 	return dispatch => {
	// 		return dispatch(TurboClient.postRequest('user', params, constants.USER_CREATED))
	// 	}
	// },

	// // Unlike addUser, register() also maintains a session for login state. After calling 
	// // TurboClient.createUser(), the new user is logged in as well:
	// register: (params) => {
	// 	return dispatch => {
	// 		return dispatch(TurboClient.createUser(params, constants.USER_CREATED))
	// 	}
	// },

	// loginUser: (credentials) => {
	// 	return dispatch => {
	// 		return dispatch(TurboClient.login(credentials, constants.CURRENT_USER_RECEIVED))
	// 	}
	// },

	// currentUser: () => {
	// 	return dispatch => {
	// 		return dispatch(TurboClient.currentUser(constants.CURRENT_USER_RECEIVED))
	// 	}
	// }
	
}
