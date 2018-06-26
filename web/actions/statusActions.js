import {dispatcher} from '../../utils/dist/ActionUtils'

export const statusDispatcher = (dispatch, actionName, newStatusState) => {
  dispatcher(dispatch, actionName, 'status', newStatusState)
}

export const successAction = () => {
  return () => async (dispatch) => {
    statusDispatcher(dispatch, 'successAction: 1', {loading: false, error: false, message: ''})
  }
}

export const errorAction = (message) => {
  return () => async (dispatch) => {
    statusDispatcher(dispatch, 'errorAction: 1', {loading: false, error: true, message})
  }
}
