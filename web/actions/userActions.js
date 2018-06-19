import {dispatcher} from '../../utils/dist/ActionUtils'
import {getCookie, setCookieForAYear} from '../../utils/dist/CookieUtils'

export const userDispatcher = (dispatch, newUserState) => {
  dispatcher(dispatch, 'user', newUserState)
}

export const initUser = () => {
  return () => async (dispatch, getState, {api}) => {
    let {nama, token} = getState().user
    if (!getCookie('token')) {
      try {
        const resp = await api.generateNamaAndToken()
        setCookieForAYear('token', resp.token)
        userDispatcher(dispatch, resp)
      } catch (error) {
        console.log('error when getting token: ', error)
      }
    } else if (nama === '' || token === '') {
      token = getCookie('token')
      const user = await api.getNama(token)
      setCookieForAYear('token', token)
      userDispatcher(dispatch, {nama: user.nama, token})
    }
  }
}
