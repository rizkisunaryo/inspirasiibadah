export default {
  testApi: async (theNumber, inc, delay) =>
    new Promise(resolve => setTimeout(() => resolve(theNumber + inc), delay))
}
