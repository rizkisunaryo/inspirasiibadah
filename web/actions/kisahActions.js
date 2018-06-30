import lodashGet from 'lodash/get'
import { Router } from '../routes'

import {dispatcher} from '../../utils/dist/ActionUtils'
import {ERROR_KISAH_30_CHARACTERS} from '../../utils/dist/constants/Errors'
import {errorAction, statusDispatcher, successAction} from '../actions/statusActions'
import {tokenizer} from '../utils/TokenUtil'
import {userDispatcher} from '../actions/userActions'

export const kisahListPenulisDispatcher = (dispatch, actionName, penulisId, newStatusState) => {
  dispatcher(dispatch, actionName, `kisahListPenulis${penulisId}`, newStatusState)
}

export const createKisah = (nama, judul, kisah) => {
  return () => async (dispatch, getState, {api}) => {
    try {
      if (!kisah || kisah.length < 30) {
        await errorAction(ERROR_KISAH_30_CHARACTERS)()(dispatch)
        return
      }

      statusDispatcher(dispatch, 'createKisah: 1', {loading: true})

      const stateUser = getState().user
      if (nama && nama !== stateUser.nama) {
        tokenizer(api.changeNama)(nama)
        userDispatcher(dispatch, 'createKisah: 2', {nama})
      }

      const kisahResp = await tokenizer(api.createKisah)(judul, kisah)
      if (kisahResp.error) {
        await errorAction(kisahResp.error)()(dispatch)
      } else {
        await successAction()()(dispatch)
        Router.pushRoute('penulis', {penulisId: stateUser.id})

        if (lodashGet(getState(), `['kisahListPenulis${stateUser.id}'].list`, []).length < 1) {
          kisahListPenulisDispatcher(
            dispatch,
            'createKisah: 3',
            stateUser.id,
            {list: [{
              id: kisahResp.id,
              updatedAt: (new Date()).toISOString(),
              judul,
              kisah,
              penulisId: stateUser.id,
              penulisNama: stateUser.nama
            }]}
          )
          listKisahPenulisAction(
            stateUser.id,
            undefined,
            10,
            kisahResp.id
          )()(dispatch, getState, {api})
        } else {
          kisahListPenulisDispatcher(
            dispatch,
            'createKisah: 4',
            stateUser.id,
            {list: [{
              id: kisahResp.id,
              updatedAt: (new Date()).toISOString(),
              judul,
              kisah,
              penulisId: stateUser.id,
              penulisNama: stateUser.nama
            }].concat(lodashGet(getState(), `['kisahListPenulis${stateUser.id}'].list`, []))}
          )
        }
      }
    } catch (error) {
      await errorAction(error.toString())()(dispatch)
    }
  }
}

export const listKisahPenulisAction = (
  penulisId,
  updatedAt = (new Date()).toISOString(),
  limit = 10,
  excludedId = ''
) => {
  return () => async (dispatch, getState, {api}) => {
    try {
      clearOtherKisahPenulis(dispatch, getState, penulisId)

      if (lodashGet(getState(), `['kisahListPenulis${penulisId}'].loadingBottom`, false)) return

      kisahListPenulisDispatcher(dispatch, 'listKisahPenulisAction: 1', penulisId, {loadingBottom: true})

      let kisahFetchArr = await api.listKisahPenulis(penulisId, {updatedAt, limit, isAfter: false})
      if (excludedId !== '') {
        kisahFetchArr = kisahFetchArr.filter(kisah => kisah.id !== excludedId)
      }
      kisahFetchArr.sort((a, b) => b.updatedAt > a.updatedAt)

      kisahListPenulisDispatcher(dispatch, 'listKisahPenulisAction: 2', penulisId, {
        list: lodashGet(getState(), `['kisahListPenulis${penulisId}'].list`, []).concat(kisahFetchArr),
        loadingBottom: false
      })
    } catch (error) {
      kisahListPenulisDispatcher(dispatch, 'listKisahPenulisAction: 1', penulisId, {loadingBottom: false})
      throw error
    }
  }
}

const clearOtherKisahPenulis = (dispatch, getState, notDeletedPenulisId) => {
  let kisahPenulisObject = {}
  const prefix = 'kisahListPenulis'
  Object.keys(getState()).forEach(stateKey => {
    if (stateKey.indexOf(prefix) > -1 && stateKey !== prefix + notDeletedPenulisId) {
      kisahPenulisObject[stateKey] = {}
    }
  })
  dispatch(state => ({
    ...state,
    ...kisahPenulisObject,
    actionName: 'clearOtherKisahPenulis: 1'
  }))
}
