export function dispatcher (dispatch, substateName, newSubstate) {
  dispatch(state => Object.assign(
    {},
    state,
    {[substateName]: Object.assign(
      {},
      state[substateName],
      newSubstate
    )}
  ))
}