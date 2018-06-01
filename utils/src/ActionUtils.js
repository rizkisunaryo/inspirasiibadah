export function dispatcher (dispatch, substateName, newSubstate) {
  dispatch(state => ({
    ...state,
    [substateName]: {
      ...state[substateName],
      ...newSubstate
    }
  }))
}