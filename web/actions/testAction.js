export function testAction (inc, delay) {
  return () => async (dispatch, getState, api) => {
    const { testRedux } = getState()
    const theNumber = await api.testApi(testRedux.theNumber, inc, delay)
    dispatch(state => ({
      ...state,
      testRedux: {
        ...testRedux,
        theNumber
      }
    }))
  }
}
