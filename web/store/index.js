import Store, { thunk } from 'repatch'

import api from '../api'
import Development from '../configs/Development'
import ObjectUtils from '../../utils/dist/ObjectUtils'

import kisahList from '../store/kisahListRedux'
import login from '../store/loginRedux'
import status from '../store/statusRedux'
import user from '../store/userRedux'

const store = new Store({
  actionName: '',
  kisahListSaya: kisahList,
  login,
  status,
  user
}).addMiddleware(thunk.withExtraArgument({api}))

if (Development.isDev) {
  // logger middleware
  store.addMiddleware(store => next => reducer => {
    const state = store.getState()
    const nextState = reducer(state)
    if (typeof nextState !== 'function') {
      console.log(
        '\nprevState: ', state,
        '\nnextState: ', nextState,
        '\ndiff: ', ObjectUtils.difference(nextState, state), '\n\n'
      )
    }
    return next(_ => nextState)
  })
}

export default store
