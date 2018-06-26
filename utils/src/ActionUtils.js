export const dispatcher = (dispatch, actionName, substateName, newSubstate) => {
  dispatch(state => ({
    ...state,
    actionName,
    [substateName]: {
      ...state[substateName],
      ...newSubstate
    }
  }))
}
