import LoginStatus from '../configs/LoginStatus'
import {dispatcher} from '../../utils/dist/ActionUtils'

function loginDispatcher (dispatch, newLoginState) {
  dispatcher(dispatch, 'login', newLoginState)
}

export function actionCheckLogin () {
  return () => async (dispatch, getState, {api}) => {
    let isLoggedIn = await api.checkLogin()
    loginDispatcher(dispatch, {status: isLoggedIn ? LoginStatus.SUCCESSFUL : LoginStatus.FAILED})
  }
}
