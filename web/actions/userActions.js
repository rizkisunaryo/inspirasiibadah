import {dispatcher} from '../../utils/dist/ActionUtils'
import {getCookie, setCookieForAYear} from '../../utils/dist/CookieUtils'

const userDispatcher = (dispatch, newUserState) => {
  dispatcher(dispatch, 'user', newUserState)
}

export const initUser = () => {
  return () => async (dispatch, getState, {api}) => {
    let {nama, token} = getState().user
    if (nama === '' && token === '') {
      if (!getCookie('token') || !getCookie('nama')) {
        try {
          const resp = await api.generateNamaAndToken()
          setCookieForAYear('nama', resp.nama)
          setCookieForAYear('token', resp.token)
          userDispatcher(dispatch, resp)
        } catch (error) {
          console.log('error when getting token: ', error)
        }
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
