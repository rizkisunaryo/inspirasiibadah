import {dispatcher} from '../../utils/dist/ActionUtils'
import {tokenizer} from '../utils/TokenUtil'

const statusDispatcher = (dispatch, newStatusState) => {
  dispatcher(dispatch, 'status', newStatusState)
}

export const createKisah = (nama, judul, kisah) => {
  return () => async (dispatch, getState, {api}) => {
    statusDispatcher(dispatch, {loading: true})

    const stateNama = getState().user.nama
    if (nama !== stateNama) {
      tokenizer(api.changeNama)(nama)
    }

    const kisahId = await tokenizer(api.createKisah)(judul, kisah)
    console.log('created Kisah with id: ', kisahId)
    statusDispatcher(dispatch, {loading: false})
  }
}
