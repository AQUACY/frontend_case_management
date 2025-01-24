import { boot } from 'quasar/wrappers'
import { loadStripe } from '@stripe/stripe-js'

// Fallback to empty string if env variable is not set
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY || ''

let stripePromise

// Only initialize Stripe if we have a key
if (stripePublicKey) {
  stripePromise = loadStripe(stripePublicKey)
} else {
  console.log('Stripe public key not found')
  stripePromise = null
}

export default boot(({ app }) => {
  // Make stripe available globally
  app.config.globalProperties.$stripe = stripePromise
})

export { stripePromise }
