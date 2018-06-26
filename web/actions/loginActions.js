import LoginStatus from '../configs/LoginStatus'
import {dispatcher} from '../../utils/dist/ActionUtils'

function loginDispatcher (dispatch, actionName, newLoginState) {
  dispatcher(dispatch, actionName, 'login', newLoginState)
}

export function actionCheckLogin () {
  return () => async (dispatch, getState, {api}) => {
    let isLoggedIn = await api.checkLogin()
    loginDispatcher(
      dispatch,
      'actionCheckLogin: 1',
      {status: isLoggedIn ? LoginStatus.SUCCESSFUL : LoginStatus.FAILED}
    )
  }
}
