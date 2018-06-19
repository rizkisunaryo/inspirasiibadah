import {dispatcher} from '../../utils/dist/ActionUtils'

export const statusDispatcher = (dispatch, newStatusState) => {
  dispatcher(dispatch, 'status', newStatusState)
}

export const successAction = () => {
  return () => async (dispatch) => {
    statusDispatcher(dispatch, {loading: false, error: false, message: ''})
  }
}

export const errorAction = (message) => {
  return () => async (dispatch) => {
    statusDispatcher(dispatch, {loading: false, error: true, message})
  }
}
