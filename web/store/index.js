import Store, { thunk } from 'repatch'

import api from '../api'
import Development from '../configs/Development'
import ObjectUtils from '../../utils/dist/ObjectUtils'

import login from '../store/loginRedux'
import user from '../store/userRedux'

const store = new Store({
  login,
  user
}).addMiddleware(thunk.withExtraArgument({api}))

if (Development.isDev) {
  // logger middleware
  store.addMiddleware(store => next => reducer => {
    const state = store.getState()
    const nextState = reducer(state)
    const diff = ObjectUtils.difference(nextState, state)
    console.log('\nprevState: ', state, '\nnextState: ', nextState, '\ndiff: ', diff, '\n\n')
    return next(_ => nextState)
  })
}

export default store
