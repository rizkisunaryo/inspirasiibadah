const checkLoginFunction = (resolve) => {
  if (typeof gapi === 'undefined' || !gapi) {
    setTimeout(() => checkLoginFunction(resolve), 500)
    return
  }

  gapi.load('auth2', () => {
    const auth2 = gapi.auth2.init({
      client_id: process.env.INSPIRASI_IBADAH_GOOGLE_CLIENT_ID,
      fetch_basic_profile: false,
      scope: 'profile'
    })

    if (auth2.isSignedIn.get()) {
      resolve(auth2.currentUser.get().getBasicProfile())
      return
    }
    resolve(false)
  })
}

export default {
  checkLogin: async () => new Promise(resolve => checkLoginFunction(resolve))
}
