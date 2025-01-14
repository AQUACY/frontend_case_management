<template>
  <q-page class="q-pa-md">
    <div class="messages-container">
      <!-- Message Thread -->
      <div class="message-thread q-gutter-y-md">
        <q-card v-for="message in messages" :key="message.id" flat bordered>
          <q-card-section>
            <!-- Message Header -->
            <div class="row items-center q-mb-md">
              <q-icon
                name="forward"
                v-if="message.from === 'WeGreened.com - Chen Immigration Billing Dept'"
                class="q-mr-sm"
              />
              <div class="text-weight-medium">{{ message.from }}</div>
              <q-space />
              <div class="text-caption text-grey">{{ formatDate(message.date) }}</div>
            </div>

            <!-- Message Content -->
            <div
              class="message-content q-mb-md"
              v-html="formatMessageContent(message.content)"
            ></div>

            <!-- Satisfaction Rating -->
            <div v-if="message.showRating" class="rating-section q-mt-md">
              <div class="text-subtitle2 q-mb-sm">Is the attorney's response satisfactory?</div>
              <div class="row items-center">
                <q-rating
                  v-model="message.rating"
                  size="1.5em"
                  color="primary"
                  icon="star_border"
                  icon-selected="star"
                  :max="5"
                />
              </div>
            </div>

            <!-- Reply Button -->
            <div class="row justify-end q-mt-md">
              <q-btn flat color="primary" label="Reply" @click="replyToMessage(message)" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- New Message Input -->
      <q-card class="message-input q-mt-lg" flat bordered>
        <q-card-section>
          <q-input
            v-model="newMessage"
            type="textarea"
            rows="4"
            outlined
            placeholder="Type your message here..."
          />
          <div class="row justify-end q-mt-md">
            <q-btn color="primary" label="Send Message" :loading="sending" @click="sendMessage" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { date } from 'quasar'
import { useMessagesStore } from 'src/stores/messages'

export default {
  name: 'MessagesView',

  setup() {
    const store = useMessagesStore()
    const $q = useQuasar()
    const messages = ref([])
    const newMessage = ref('')
    const sending = ref(false)

    onMounted(async () => {
      try {
        await fetchMessages()
      } catch (error) {
        console.error('Error loading messages:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load messages',
        })
      }
    })

    const fetchMessages = async () => {
      try {
        const response = await store.fetchMessages()
        messages.value = response.map((msg) => ({
          ...msg,
          rating: 0,
          showRating: msg.from.includes('Immigration Team'), // Only show rating for attorney messages
        }))
      } catch (error) {
        console.log(error)
      }
    }

    const formatDate = (dateString) => {
      return date.formatDate(dateString, 'MMM DD, YYYY h:mmA')
    }

    const formatMessageContent = (content) => {
      // Convert URLs to clickable links
      return content.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" class="text-primary">$1</a>',
      )
    }

    const sendMessage = async () => {
      if (!newMessage.value.trim()) {
        $q.notify({
          type: 'warning',
          message: 'Please enter a message',
        })
        return
      }

      sending.value = true
      try {
        await store.sendMessage({
          content: newMessage.value,
          case_id: store.cases.data.id,
        })

        await fetchMessages() // Refresh messages
        newMessage.value = '' // Clear input

        $q.notify({
          type: 'positive',
          message: 'Message sent successfully',
        })
      } catch (error) {
        console.error('Send error:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to send message',
        })
      } finally {
        sending.value = false
      }
    }

    const replyToMessage = (message) => {
      // Scroll to message input and focus it
      const messageInput = document.querySelector('.message-input')
      if (messageInput) {
        messageInput.scrollIntoView({ behavior: 'smooth' })
        // Add quoted text to new message
        newMessage.value = `\n\nRe: ${message.content.substring(0, 100)}...`
      }
    }

    return {
      messages,
      newMessage,
      sending,
      formatDate,
      formatMessageContent,
      sendMessage,
      replyToMessage,
    }
  },
}
</script>

<style scoped>
.messages-container {
  max-width: 900px;
  margin: 0 auto;
}

.message-content {
  white-space: pre-wrap;
}

.message-content :deep(a) {
  text-decoration: none;
}

.message-content :deep(a):hover {
  text-decoration: underline;
}
</style>
