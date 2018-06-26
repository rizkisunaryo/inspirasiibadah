import {dispatcher} from '../../utils/dist/ActionUtils'
import {getCookie, setCookieForAYear} from '../../utils/dist/CookieUtils'

export const userDispatcher = (dispatch, actionName, newUserState) => {
  dispatcher(dispatch, actionName, 'user', newUserState)
}

export const initUser = () => {
  return () => async (dispatch, getState, {api}) => {
    let {nama, token} = getState().user
    if (!getCookie('token')) {
      try {
        const resp = await api.generateNamaAndToken()
        setCookieForAYear('token', resp.token)
        userDispatcher(dispatch, 'initUser: 1', resp)
      } catch (error) {
        console.log('error when getting token: ', error)
      }
    } else if (nama === '' || token === '') {
      token = getCookie('token')
      const user = await api.getNama(token)
      setCookieForAYear('token', token)
      userDispatcher(dispatch, 'initUser: 2', {nama: user.nama, token})
    }
  }
}
