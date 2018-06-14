import {tokenizer} from '../utils/TokenUtil'

export const createKisah = (judul, kisah) => {
  return () => async (dispatch, getState, {api}) => {
    const id = await tokenizer(api.createKisah)(judul, kisah)
    console.log('created Kisah with id: ', id)
  }
}
