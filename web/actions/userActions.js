import {dispatcher} from '../../utils/dist/ActionUtils'
import {BACKEND_URL} from '../configs/Backend'
import {getCookie, setCookieForAYear} from '../../utils/dist/CookieUtils'
import LoginStatus from '../configs/LoginStatus'

function loginDispatcher (dispatch, newLoginState) {
  dispatcher(dispatch, 'login', newLoginState)
}

export function actionCheckLogin () {
  return () => async (dispatch, getState, api) => {
    let isLoggedIn = await api.checkLogin()
    loginDispatcher(dispatch, {status: isLoggedIn ? LoginStatus.SUCCESSFUL : LoginStatus.FAILED})
  }
}

const userDispatcher = (dispatch, newUserState) => {
  dispatcher(dispatch, 'user', newUserState)
}

export const initUser = () => {
  return () => async (dispatch, getState, {api}) => {
    let {nama, token} = getState().user
    if (nama === '' && token === '') {
      if (!getCookie('token') || !getCookie('nama')) {
        fetch(BACKEND_URL + '/token')
          .then(resp => resp.json())
          .then(resp => {
            setCookieForAYear('nama', resp.nama)
            setCookieForAYear('token', resp.token)
            userDispatcher(dispatch, resp)
          })
          .catch(err => console.log('error when getting token: ', err))
      } else {
        nama = getCookie('nama')
        token = getCookie('token')
        setCookieForAYear('nama', getCookie('nama'))
        setCookieForAYear('token', getCookie('token'))
        userDispatcher(dispatch, {nama, token})
      }
    }
  }
}
