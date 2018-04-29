import Store, { thunk } from 'repatch'

import api from '../api'
import testRedux from '../store/testRedux'

export default new Store({
  testRedux
})
  .addMiddleware(thunk.withExtraArgument(api))
