import {ERROR_KISAH_30_CHARACTERS} from '../../utils/dist/ErrorStrings'
import {errorAction, statusDispatcher, successAction} from '../actions/statusActions'
import {tokenizer} from '../utils/TokenUtil'

export const createKisah = (nama, judul, kisah) => {
  return () => async (dispatch, getState, {api}) => {
    try {
      if (!kisah || kisah.length < 30) {
        await errorAction(ERROR_KISAH_30_CHARACTERS)()(dispatch)
        return
      }

      statusDispatcher(dispatch, {loading: true})

      const stateNama = getState().user.nama
      if (nama !== stateNama) {
        tokenizer(api.changeNama)(nama)
      }

      const kisahResp = await tokenizer(api.createKisah)(judul, kisah)
      if (kisahResp.error) {
        // statusDispatcher(dispatch, {loading: false, error: true, message: kisahResp.error})
        await errorAction(kisahResp.error)()(dispatch)
      } else {
        console.log('created Kisah: ', kisahResp)
        await successAction()()(dispatch)
      }
    } catch (error) {
      await errorAction(error.toString())()(dispatch)
    }
  }
}
