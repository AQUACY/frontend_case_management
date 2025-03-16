<template>
  <q-page class="messages-page">
    <div class="row full-height">
      <!-- Left Panel - Message List -->
      <div class="col-4 messages-list q-pa-sm" style="border-right: 1px solid #ddd">
        <div class="row items-center q-pa-sm">
          <div class="text-h6 q-mr-auto">Messages</div>
          <q-badge v-if="unreadCount > 0" color="red" floating transparent>
            {{ unreadCount }}
          </q-badge>
        </div>

        <!-- Search Messages -->
        <q-input v-model="searchQuery" dense outlined placeholder="Search messages" class="q-mb-md">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- Messages List -->
        <q-scroll-area style="height: calc(100vh - 150px)">
          <q-list separator>
            <q-item
              v-for="message in filteredMessages"
              :key="message.id"
              clickable
              :active="selectedMessage?.id === message.id"
              @click="selectMessage(message)"
              v-ripple
            >
              <q-item-section>
                <q-item-label class="text-green">{{ message.subject }}</q-item-label>
                <q-item-label caption>
                  {{ message.latest_message }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption>
                  {{ formatDate(message.updated_at) }}
                </q-item-label>
                <q-badge v-if="!message.is_read" color="red" rounded> New </q-badge>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>

      <!-- Right Panel - Conversation -->
      <div class="col-8 conversation">
        <template v-if="selectedMessage">
          <!-- Conversation Header -->
          <div class="conversation-header q-pa-md" style="border-bottom: 1px solid #ddd">
            <div class="text-h6">{{ selectedMessage.subject }}</div>
            <div class="text-caption">
              <q-icon
                name="circle"
                :color="isTyping ? 'green' : 'grey'"
                size="xs"
                class="q-mr-xs"
              />
              {{ isTyping ? 'Typing...' : 'Online' }}
            </div>
          </div>

          <!-- Messages Area -->
          <q-scroll-area ref="messageScroll" style="height: calc(100vh - 220px)" class="q-pa-md">
            <div v-for="(msg, index) in conversation" :key="index" class="q-mb-md">
              <div :class="['message-bubble q-pa-sm', msg.is_sender ? 'sent' : 'received']">
                <div class="text-body2">{{ msg.content }}</div>
                <div class="text-caption text-grey">
                  {{ formatDate(msg.created_at) }}
                  <q-icon
                    v-if="msg.is_sender"
                    :name="msg.is_read ? 'done_all' : 'done'"
                    :color="msg.is_read ? 'blue' : 'grey'"
                    size="xs"
                    class="q-ml-xs"
                  />
                </div>
              </div>
            </div>
            <div v-if="isLoading" class="text-center q-pa-md">
              <q-spinner color="green" size="2em" />
            </div>
          </q-scroll-area>

          <!-- Message Input -->
          <div class="message-input q-pa-md" style="border-top: 1px solid #ddd">
            <q-input
              v-model="newMessage"
              type="textarea"
              rows="3"
              outlined
              dense
              placeholder="Type your message"
              @keypress.enter.prevent="sendMessage"
              @input="handleTyping"
            >
              <template v-slot:before>
                <q-btn round flat icon="attach_file" color="grey">
                  <q-tooltip>Attach file</q-tooltip>
                </q-btn>
              </template>
              <template v-slot:after>
                <q-btn
                  round
                  flat
                  color="green"
                  icon="send"
                  :disable="!newMessage.trim() || isSending"
                  @click="sendMessage"
                >
                  <q-tooltip>Send message</q-tooltip>
                </q-btn>
              </template>
            </q-input>
          </div>
        </template>

        <div v-else class="column items-center justify-center full-height text-grey-6">
          <q-icon name="chat" size="4rem" color="grey-5" />
          <div class="text-h6 q-mt-md">Select a message to view conversation</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, computed, nextTick, onBeforeUnmount, watch } from 'vue'
import { date, useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'MessagesView',

  setup() {
    const $q = useQuasar()
    const messages = ref([])
    const conversation = ref([])
    const selectedMessage = ref(null)
    const newMessage = ref('')
    const searchQuery = ref('')
    const unreadCount = ref(0)
    const messageScroll = ref(null)
    const isLoading = ref(false)
    const isSending = ref(false)
    const isTyping = ref(false)
    const typingTimeout = ref(null)
    const pollingInterval = ref(null)
    const messageListPollingInterval = ref(null)

    const filteredMessages = computed(() => {
      if (!searchQuery.value) return messages.value
      const query = searchQuery.value.toLowerCase()
      return messages.value.filter(
        (msg) =>
          msg.subject.toLowerCase().includes(query) ||
          msg.latest_message.toLowerCase().includes(query),
      )
    })

    const formatDate = (dateStr) => {
      const messageDate = new Date(dateStr)
      const today = new Date()

      // If message is from today, just show time
      if (messageDate.toDateString() === today.toDateString()) {
        return date.formatDate(dateStr, 'h:mm A')
      }

      // If message is from this year, show month and day
      if (messageDate.getFullYear() === today.getFullYear()) {
        return date.formatDate(dateStr, 'MMM D, h:mm A')
      }

      // Otherwise show full date
      return date.formatDate(dateStr, 'MMM D, YYYY h:mm A')
    }

    const fetchMessages = async () => {
      try {
        const response = await api.get('/api/auth/messages')
        messages.value = response.data

        // If we have a selected message, update its read status in the list
        if (selectedMessage.value) {
          const index = messages.value.findIndex((m) => m.id === selectedMessage.value.id)
          if (index !== -1) {
            messages.value[index].is_read = true
          }
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    const fetchUnreadCount = async () => {
      try {
        const response = await api.get('/api/auth/messages/unread-count')
        unreadCount.value = response.data.count
      } catch (error) {
        console.error('Error fetching unread count:', error)
      }
    }

    const fetchConversation = async (messageId, scrollToBottom = false) => {
      if (!messageId) return

      isLoading.value = true
      try {
        const response = await api.get(`/api/auth/messages/${messageId}/conversation`)
        conversation.value = response.data

        // Mark message as read
        if (selectedMessage.value && !selectedMessage.value.is_read) {
          await api.post(`/api/auth/messages/${messageId}/mark-read`)
          selectedMessage.value.is_read = true
          await fetchUnreadCount()
        }

        if (scrollToBottom) {
          await nextTick()
          scrollToBottom()
        }
      } catch (error) {
        console.error('Error fetching conversation:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load conversation',
        })
      } finally {
        isLoading.value = false
      }
    }

    const selectMessage = async (message) => {
      selectedMessage.value = message
      await fetchConversation(message.id, true)

      // Start polling for this conversation
      startConversationPolling()
    }

    const scrollToBottom = () => {
      if (messageScroll.value) {
        messageScroll.value.setScrollPosition('vertical', 99999)
      }
    }

    const sendMessage = async () => {
      if (!newMessage.value.trim() || !selectedMessage.value || isSending.value) return

      isSending.value = true

      // Optimistically add message to conversation
      const tempId = Date.now()
      const optimisticMessage = {
        id: tempId,
        content: newMessage.value,
        created_at: new Date().toISOString(),
        is_sender: true,
        is_read: false,
        pending: true,
      }

      conversation.value.push(optimisticMessage)
      const messageToSend = newMessage.value
      newMessage.value = ''

      // Scroll to bottom to show new message
      await nextTick()
      scrollToBottom()

      try {
        const response = await api.post(`/api/auth/messages/${selectedMessage.value.id}/reply`, {
          content: messageToSend,
        })

        // Replace optimistic message with real one
        const index = conversation.value.findIndex((m) => m.id === tempId)
        if (index !== -1) {
          conversation.value[index] = {
            ...response.data,
            is_sender: true,
          }
        }

        // Update message list to show latest message
        // await fetchMessages()
      } catch (error) {
        console.error('Error sending message:', error)

        // Remove optimistic message and show error
        conversation.value = conversation.value.filter((m) => m.id !== tempId)

        $q.notify({
          type: 'negative',
          message: 'Failed to send message. Please try again.',
        })
      } finally {
        isSending.value = false
      }
    }

    const handleTyping = () => {
      // Clear previous timeout
      if (typingTimeout.value) {
        clearTimeout(typingTimeout.value)
      }

      // Simulate sending typing indicator to server
      // In a real implementation, you would emit this to the server
      console.log('User is typing...')

      // Set timeout to clear typing indicator after 2 seconds of inactivity
      typingTimeout.value = setTimeout(() => {
        console.log('User stopped typing')
      }, 2000)
    }

    const startConversationPolling = () => {
      // Clear any existing polling
      if (pollingInterval.value) {
        clearInterval(pollingInterval.value)
      }

      // Poll for new messages every 5 seconds
      pollingInterval.value = setInterval(() => {
        if (selectedMessage.value) {
          fetchConversation(selectedMessage.value.id)
        }
      }, 5000)
    }

    const startMessageListPolling = () => {
      // Poll for new messages in the list every 10 seconds
      messageListPollingInterval.value = setInterval(() => {
        fetchMessages()
        fetchUnreadCount()
      }, 10000)
    }

    onMounted(() => {
      fetchMessages()
      fetchUnreadCount()
      startMessageListPolling()
    })

    onBeforeUnmount(() => {
      // Clean up intervals when component is destroyed
      if (pollingInterval.value) {
        clearInterval(pollingInterval.value)
      }

      if (messageListPollingInterval.value) {
        clearInterval(messageListPollingInterval.value)
      }

      if (typingTimeout.value) {
        clearTimeout(typingTimeout.value)
      }
    })

    // Watch for changes in the conversation to scroll to bottom
    watch(conversation, (newVal, oldVal) => {
      if (newVal.length > oldVal.length) {
        nextTick(() => scrollToBottom())
      }
    })

    return {
      messages,
      conversation,
      selectedMessage,
      newMessage,
      searchQuery,
      unreadCount,
      messageScroll,
      isLoading,
      isSending,
      isTyping,
      filteredMessages,
      formatDate,
      selectMessage,
      sendMessage,
      handleTyping,
      scrollToBottom,
    }
  },
}
</script>

<style lang="scss" scoped>
.messages-page {
  height: calc(100vh - 50px);
}

.message-bubble {
  max-width: 80%;
  border-radius: 12px;
  margin: 4px 0;
  position: relative;
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &.sent {
    margin-left: auto;
    background: #dcf8c6;
    border-bottom-right-radius: 4px;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      right: -8px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-left-color: #dcf8c6;
      border-right: 0;
      border-bottom: 0;
    }
  }

  &.received {
    margin-right: auto;
    background: #fff;
    border-bottom-left-radius: 4px;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -8px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-right-color: #fff;
      border-left: 0;
      border-bottom: 0;
    }
  }
}

.conversation {
  background: #e5ddd5;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.conversation-header {
  background: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.message-input {
  background: #f0f0f0;
}

// Animation for new messages
.message-bubble {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Style for pending messages
.message-bubble.sent.pending {
  opacity: 0.7;
}
</style>
