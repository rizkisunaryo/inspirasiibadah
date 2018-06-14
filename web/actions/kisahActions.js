import {tokenizer} from '../utils/TokenUtil'

export const createKisah = (nama, judul, kisah) => {
  return () => async (dispatch, getState, {api}) => {
    const stateNama = getState().user.nama
    if (nama !== stateNama) {
      tokenizer(api.changeNama)(nama)
    }

    const kisahId = await tokenizer(api.createKisah)(judul, kisah)
    console.log('created Kisah with id: ', kisahId)
  }
}
