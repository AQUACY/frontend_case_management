import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { boot } from 'quasar/wrappers'

export default boot(() => {
  window.Pusher = Pusher

  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '06ede6efd5dd5850ce28',
    cluster: 'mt1',
    encrypted: true,
    authEndpoint: 'https://api.greenpathcasemanager.com/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    },
  })
})

export {}
