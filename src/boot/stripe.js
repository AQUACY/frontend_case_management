import { boot } from 'quasar/wrappers'
import { loadStripe } from '@stripe/stripe-js'

// Get the public key from environment variables
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

// Create a promise that resolves with the Stripe instance
const stripePromise = loadStripe(stripePublicKey)

export default boot(({ app }) => {
  // Make stripe available in the app
  app.config.globalProperties.$stripe = stripePromise
})

export { stripePromise }
