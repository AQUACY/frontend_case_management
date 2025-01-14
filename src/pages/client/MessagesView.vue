<template>
  <q-page class="q-pa-md">
    <div class="messages-container">
      <!-- Message Thread -->
      <div class="message-thread q-gutter-y-md">
        <q-card
          v-for="message in messages"
          :key="message.id"
          bordered
          :class="{ 'user-message': message.sender_type === 'Guest' }"
        >
          <q-card-section>
            <!-- Message Header -->
            <div class="row items-center q-mb-md">
              <q-icon
                name="forward"
                v-if="message.sender_type === 'Case Manager'"
                class="q-mr-sm"
              />
              <div class="text-weight-medium">
                {{ getSenderName(message) }}
              </div>
              <q-space />
              <div class="text-caption text-grey">{{ formatDate(message.created_at) }}</div>
            </div>

            <!-- Subject -->
            <div class="text-subtitle2 q-mb-sm" v-if="message.subject">
              {{ message.subject }}
            </div>

            <!-- Message Content -->
            <div
              class="message-content q-mb-md"
              v-html="formatMessageContent(message.message)"
            ></div>

            <!-- Response (if any) -->
            <div
              v-if="message.response"
              class="response-content q-pa-md bg-grey-2 rounded-borders q-mb-md"
            >
              <div class="text-subtitle2 q-mb-sm">Response:</div>
              <div v-html="formatMessageContent(message.response)"></div>
            </div>

            <!-- Status Badge -->
            <q-badge :color="getStatusColor(message.status)" class="q-mb-md">
              {{ message.status }}
            </q-badge>

            <!-- Satisfaction Rating -->
            <div v-if="message.sender_type === 'CaseManager'" class="rating-section q-mt-md">
              <div class="text-subtitle2 q-mb-sm">Is the attorney's response satisfactory?</div>
              <div class="row items-center">
                <q-rating
                  v-model="message.rating"
                  size="1.5em"
                  color="primary"
                  icon="star_border"
                  icon-selected="star"
                  :max="5"
                  @update:model-value="rateMessage(message.id, $event)"
                />
              </div>
            </div>

            <!-- Reply Button - Only show for CaseManager messages and if user_id doesn't match -->
            <div
              v-if="message.sender_type === 'CaseManager' && message.user_id !== currentUserId"
              class="row justify-end q-mt-md"
            >
              <q-btn flat color="primary" label="Reply" @click="replyToMessage(message)" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- New Message Input -->
      <q-card class="message-input q-mt-lg" flat bordered>
        <q-card-section>
          <!-- Subject Input -->
          <q-input
            v-model="newMessageSubject"
            class="q-mb-md"
            outlined
            label="Subject"
            placeholder="Enter message subject"
          />

          <!-- Message Input -->
          <q-input
            v-model="newMessageContent"
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
    const newMessageContent = ref('')
    const newMessageSubject = ref('')
    const sending = ref(false)

    // Add currentUserId from localStorage or your auth system
    const currentUserId = ref(JSON.parse(localStorage.getItem('caseDetails'))?.user?.id)

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
        messages.value = response
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    const formatDate = (dateString) => {
      return date.formatDate(dateString, 'MMM DD, YYYY h:mmA')
    }

    const formatMessageContent = (content) => {
      if (!content) return ''
      // Convert URLs to clickable links
      return content.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" class="text-primary">$1</a>',
      )
    }

    const getSenderName = (message) => {
      return message.sender_type === 'Case Manager'
        ? 'WeGreened.com - Chen Immigration Team'
        : 'You'
    }

    const getStatusColor = (status) => {
      const colors = {
        pending: 'warning',
        resolved: 'positive',
        closed: 'grey',
      }
      return colors[status] || 'grey'
    }

    const sendMessage = async () => {
      if (!newMessageContent.value.trim()) {
        $q.notify({
          type: 'warning',
          message: 'Please enter a message',
        })
        return
      }

      sending.value = true
      try {
        await store.sendMessage({
          subject: newMessageSubject.value,
          message: newMessageContent.value,
          case_id: store.cases.data.id,
        })

        await fetchMessages() // Refresh messages
        // Clear inputs
        newMessageContent.value = ''
        newMessageSubject.value = ''

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

    const rateMessage = async (messageId, rating) => {
      try {
        await store.rateMessage(messageId, rating)
        $q.notify({
          type: 'positive',
          message: 'Rating submitted successfully',
        })
      } catch (error) {
        console.error('Rating error:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to submit rating',
        })
      }
    }

    const replyToMessage = (message) => {
      // Scroll to message input and focus it
      const messageInput = document.querySelector('.message-input')
      if (messageInput) {
        messageInput.scrollIntoView({ behavior: 'smooth' })
        // Set subject with Re: prefix if not already present
        newMessageSubject.value = message.subject?.startsWith('Re:')
          ? message.subject
          : `Re: ${message.subject || ''}`
        // Add quoted text to new message
        newMessageContent.value = `\n\nRe: ${message.message.substring(0, 100)}...`
      }
    }

    return {
      messages,
      newMessageContent,
      newMessageSubject,
      sending,
      formatDate,
      formatMessageContent,
      getSenderName,
      getStatusColor,
      sendMessage,
      replyToMessage,
      rateMessage,
      currentUserId,
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

.response-content {
  border-left: 4px solid var(--q-primary);
}

/* Add styling for user messages */
.user-message {
  background-color: #e3f2fd !important; /* Light seablue color */
}

.user-message :deep(.q-card__section) {
  background-color: transparent;
}
</style>
