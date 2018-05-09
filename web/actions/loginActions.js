import LoginStatus from '../configs/LoginStatus'

export function actionCheckLogin (inc, delay) {
  return () => async (dispatch, getState, api) => {
    let isLoggedIn = await api.checkLogin()

    dispatch(state => ({
      ...state,
      login: {
        ...state.login,
        status: isLoggedIn ? LoginStatus.SUCCESSFUL : LoginStatus.FAILED
      }
    }))
  }
}
