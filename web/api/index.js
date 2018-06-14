import {BACKEND_URL} from '../configs/Backend'

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

const createKisah = token => (judul, kisah) => {
  return fetch(BACKEND_URL + '/kisah', {
    method: 'POST',
    headers: {
      token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({judul, kisah})
  }).then(resp => resp.json())
}

const generateNamaAndToken = () => {
  return fetch(BACKEND_URL + '/token').then(resp => resp.json())
}

const getNama = token => {
  return fetch(BACKEND_URL + '/user/nama', {headers: {token}}).then(resp => resp.json())
}

export default {
  checkLogin: async () => new Promise(resolve => checkLoginFunction(resolve)),
  createKisah,
  generateNamaAndToken,
  getNama
}
