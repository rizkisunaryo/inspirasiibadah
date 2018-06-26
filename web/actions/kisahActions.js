import Router from 'next/router'

import {dispatcher} from '../../utils/dist/ActionUtils'
import {ERROR_KISAH_30_CHARACTERS} from '../../utils/dist/constants/Errors'
import {errorAction, statusDispatcher, successAction} from '../actions/statusActions'
import {tokenizer} from '../utils/TokenUtil'
import {userDispatcher} from '../actions/userActions'

export const kisahListSayaDispatcher = (dispatch, actionName, newStatusState) => {
  dispatcher(dispatch, actionName, 'kisahListSaya', newStatusState)
}

export const createKisah = (nama, judul, kisah) => {
  return () => async (dispatch, getState, {api}) => {
    try {
      if (!kisah || kisah.length < 30) {
        await errorAction(ERROR_KISAH_30_CHARACTERS)()(dispatch)
        return
      }

      statusDispatcher(dispatch, 'createKisah: 1', {loading: true})

      const stateNama = getState().user.nama
      if (nama && nama !== stateNama) {
        tokenizer(api.changeNama)(nama)
        userDispatcher(dispatch, 'createKisah: 2', {nama})
      }

      const kisahResp = await tokenizer(api.createKisah)(judul, kisah)
      if (kisahResp.error) {
        await errorAction(kisahResp.error)()(dispatch)
      } else {
        await successAction()()(dispatch)
        Router.push('/saya')

        if (getState().kisahListSaya.list.length < 1) {
          kisahListSayaDispatcher(
            dispatch,
            'createKisah: 3',
            {list: [{
              id: kisahResp.id,
              updatedAt: (new Date()).toUTCString(),
              judul,
              kisah
            }]}
          )
          await listKisahSayaDown(undefined, 10, kisahResp.id)()(dispatch, getState, {api})
        } else {
          kisahListSayaDispatcher(
            dispatch,
            'createKisah: 4',
            {list: [{
              id: kisahResp.id,
              updatedAt: (new Date()).toUTCString(),
              judul,
              kisah
            }].concat(getState().kisahListSaya.list)}
          )
        }
      }
    } catch (error) {
      await errorAction(error.toString())()(dispatch)
    }
  }
}

export const listKisahSayaDown = (
  updatedAt = (new Date()).toUTCString(),
  limit,
  excludedId = ''
) => {
  return () => async (dispatch, getState, {api}) => {
    if (getState().kisahListSaya.loadingBottom) return

    kisahListSayaDispatcher(dispatch, 'listKisahSayaDown: 1', {loadingBottom: true})

    let kisahFetchArr = await tokenizer(api.listKisahSaya)({updatedAt, limit, isAfter: false})
    if (excludedId !== '') {
      kisahFetchArr = kisahFetchArr.filter(kisah => kisah.id !== excludedId)
    }
    kisahFetchArr.sort((a, b) => b.updatedAt > a.updatedAt)

    kisahListSayaDispatcher(dispatch, 'listKisahSayaDown: 2', {
      list: getState().kisahListSaya.list.concat(kisahFetchArr),
      loadingBottom: false
    })
  }
}
