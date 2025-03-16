<template>
  <q-page class="messages-page">
    <div class="row full-height">
      <!-- Left Panel - Message List -->
      <div class="col-4 messages-list q-pa-sm" style="border-right: 1px solid #ddd">
        <div class="row items-center q-pa-sm">
          <div class="text-h6 q-mr-auto text-green">Case Messages</div>
          <!-- Add New Message Button -->
          <q-btn
            color="green"
            icon="add"
            label="New Message"
            @click="openNewMessageDialog"
            class="q-ml-sm bg-green text-white"
          />
        </div>

        <!-- Search Messages -->
        <q-input v-model="searchQuery" dense outlined placeholder="Search messages" class="q-mb-md">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- Messages List -->
        <q-scroll-area style="height: calc(100vh - 150px); margin-left: auto">
          <div v-if="loading" class="text-center q-pa-md">
            <q-spinner color="green" size="2em" />
          </div>

          <q-list v-else separator>
            <q-item
              v-for="message in filteredMessages"
              :key="message.id"
              clickable
              :class="{
                'selected-message': selectedMessage?.id === message.id,
                'message-item': true,
                'unread-message': message.unread_count > 0,
              }"
              @click="selectMessage(message)"
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="person" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <div class="row items-center">
                  <q-item-label class="q-mr-sm">{{ message.subject }}</q-item-label>
                  <q-badge v-if="message.unread_count > 0" color="red" floating transparent>
                    {{ message.unread_count }}
                  </q-badge>
                </div>
                <q-item-label caption lines="2" class="message-preview">
                  {{ message.latest_message }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  {{ formatDate(message.updated_at) }}
                </q-item-label>
              </q-item-section>

              <!-- Add debug info -->
              <q-tooltip> Message ID: {{ message.id }} </q-tooltip>
            </q-item>
          </q-list>

          <div v-if="!loading && !messages.length" class="text-center q-pa-md text-grey">
            No messages found
          </div>
        </q-scroll-area>
      </div>

      <!-- Right Panel - Conversation -->
      <div class="col-8 conversation">
        <template v-if="selectedMessage">
          <!-- Conversation Header -->
          <div class="conversation-header q-pa-md" style="border-bottom: 1px solid #ddd">
            <div class="row items-center justify-between">
              <div>
                <div class="text-h6 text-white text-bold">{{ selectedMessage.subject }}</div>
                <div class="text-caption text-white">Case #{{ route.params.id }}</div>
              </div>
              <div v-if="remoteTyping" class="typing-indicator text-white">
                <span>Typing</span>
                <span class="dot">.</span>
                <span class="dot">.</span>
                <span class="dot">.</span>
              </div>
            </div>
          </div>

          <!-- Messages Area -->
          <q-scroll-area
            ref="messageScroll"
            style="height: calc(100vh - 200px); width: 100%"
            class="q-pa-md"
          >
            <div v-if="loadingConversation" class="text-center q-pa-md">
              <q-spinner color="green" size="2em" />
            </div>

            <template v-else>
              <div class="messages-container">
                <div v-for="(msg, index) in conversation" :key="msg.id" class="message-wrapper">
                  <!-- Date separator -->
                  <div v-if="shouldShowDateSeparator(msg, index)" class="date-separator">
                    {{ formatDateSeparator(msg.created_at) }}
                  </div>

                  <!-- Message bubble -->
                  <div
                    :class="[
                      'message-bubble',
                      msg.sender_type === 'user' ? 'user' : 'case_manager',
                      msg.pending ? 'pending' : '',
                    ]"
                  >
                    <div class="row items-center no-wrap q-mb-sm">
                      <div class="text-caption text-weight-medium">
                        {{ msg.sender ? msg.sender.name : 'You' }}
                        <span
                          class="text-caption text-white-6"
                          v-if="msg.sender_type === 'case_manager'"
                          >(Case Manager)</span
                        >
                        <span class="text-caption text-white-6" v-if="msg.sender_type === 'user'"
                          >(Client)</span
                        >
                      </div>
                    </div>
                    <div class="message-content">{{ msg.content }}</div>
                    <div class="message-time text-caption text-white-6">
                      {{ formatTime(msg.created_at) }}
                      <q-icon
                        v-if="msg.sender_type === 'user'"
                        :name="msg.is_read ? 'done_all' : 'done'"
                        :color="msg.is_read ? 'green' : 'grey-7'"
                        size="xs"
                        class="q-ml-xs"
                      />
                      <q-spinner-dots
                        v-if="msg.pending"
                        color="grey-7"
                        size="1em"
                        class="q-ml-xs"
                      />
                    </div>
                  </div>
                </div>

                <!-- Typing indicator at the bottom -->
                <div v-if="remoteTyping" class="typing-bubble case_manager">
                  <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </template>
          </q-scroll-area>

          <!-- Message Input -->
          <div class="message-input q-pa-md" style="border-top: 1px solid #ddd">
            <q-input
              v-model="newMessage"
              type="textarea"
              rows="3"
              outlined
              dense
              color="green"
              placeholder="Type your message"
              @keypress.enter.prevent="sendMessage"
              @input="handleTyping"
              ref="messageInput"
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
                  :loading="sending"
                  :disable="!newMessage.trim() || sending"
                  @click="sendMessage"
                >
                  <q-tooltip>Send message</q-tooltip>
                </q-btn>
              </template>
            </q-input>
          </div>
        </template>

        <div v-else class="column items-center justify-center full-height text-grey-6">
          <q-icon name="chat" size="4rem" />
          <div class="text-h6 q-mt-md">Select a message to view conversation</div>
        </div>
      </div>
    </div>

    <!-- New Message Dialog -->
    <q-dialog v-model="newMessageDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">New Message</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="submitNewMessage" class="q-gutter-md">
            <q-select
              v-model="newMessageForm.category_id"
              :options="categories"
              option-value="id"
              option-label="name"
              label="Category *"
              :rules="[(val) => !!val || 'Category is required']"
              emit-value
              map-options
            />

            <q-input
              v-model="newMessageForm.subject"
              label="Subject *"
              :rules="[(val) => !!val || 'Subject is required']"
            />

            <q-input
              v-model="newMessageForm.message"
              type="textarea"
              label="Message *"
              :rules="[(val) => !!val || 'Message is required']"
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="negative" flat v-close-popup />
              <q-btn label="Send" color="green" type="submit" :loading="sending" class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted, computed, nextTick, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { date, useQuasar } from 'quasar'
import { api } from 'boot/axios'
import Pusher from 'pusher-js'

// Date helper functions
/**
 * Format a date for API requests to ensure consistent format
 * @param {Date|string} date - The date to format
 * @returns {string} - Formatted date string
 */
function formatDateForApi(date) {
  if (!date) return null

  // If it's already a string, try to parse it
  if (typeof date === 'string') {
    date = new Date(date)
  }

  // Check if date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid date provided to formatDateForApi:', date)
    return null
  }

  // Format as ISO string which is compatible with Laravel's datetime parsing
  return date.toISOString()
}

/**
 * Format a date for display in the UI
 * @param {Date|string} date - The date to format
 * @returns {string} - Formatted date string for display
 */
function formatDateForDisplay(date) {
  if (!date) return ''

  // If it's a string, parse it
  if (typeof date === 'string') {
    date = new Date(date)
  }

  // Check if date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid date provided to formatDateForDisplay:', date)
    return ''
  }

  // Format for display (customize as needed)
  return date.toLocaleString()
}

export default {
  name: 'CaseMessages',

  setup() {
    const route = useRoute()
    const $q = useQuasar()
    const messages = ref([])
    const conversation = ref([])
    const selectedMessage = ref(null)
    const newMessage = ref('')
    const searchQuery = ref('')
    const unreadCount = ref(0)
    const messageScroll = ref(null)
    const messageInput = ref(null)
    const loading = ref(false)
    const loadingConversation = ref(false)
    const sending = ref(false)
    const newMessageDialog = ref(false)
    const categories = ref([])
    const isActiveConversation = ref(false)
    const remoteTyping = ref(false)
    const typingTimeout = ref(null)
    const typingIndicatorTimeout = ref(null)
    const caseId = route.params.id
    const pusher = ref(null)
    const channel = ref(null)
    const lastMessageTimestamp = ref(null)

    const newMessageForm = ref({
      category_id: null,
      subject: '',
      message: '',
      case_id: caseId,
    })

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
        return date.formatDate(dateStr, 'MMM D')
      }

      // Otherwise show full date
      return date.formatDate(dateStr, 'MMM D, YYYY')
    }

    const formatTime = (dateStr) => {
      return date.formatDate(dateStr, 'h:mm A')
    }

    const formatDateSeparator = (dateStr) => {
      const messageDate = new Date(dateStr)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      if (messageDate.toDateString() === today.toDateString()) {
        return 'Today'
      } else if (messageDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday'
      } else {
        return date.formatDate(dateStr, 'dddd, MMMM D, YYYY')
      }
    }

    const shouldShowDateSeparator = (message, index) => {
      if (index === 0) return true

      const currentDate = new Date(message.created_at).toDateString()
      const prevDate = new Date(conversation.value[index - 1].created_at).toDateString()

      return currentDate !== prevDate
    }

    const fetchUnreadCount = async () => {
      try {
        const response = await api.get('/api/auth/messages/unread-count')
        unreadCount.value = response.data.unread_count
      } catch (error) {
        console.error('Error fetching unread count:', error)
      }
    }

    const fetchMessages = async () => {
      loading.value = true
      try {
        const response = await api.get(`/api/cases/${caseId}/messages`)
        if (response.data.messages && Array.isArray(response.data.messages)) {
          messages.value = response.data.messages.map((message) => ({
            ...message,
            unread_count: message.unread_count || 0,
          }))
          await fetchUnreadCount()
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load messages',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    const markMessageAsRead = async (messageId) => {
      try {
        await api.post(`/api/auth/messages/${messageId}/read`)

        // Update local read status
        const message = conversation.value.find((m) => m.id === messageId)
        if (message) {
          message.is_read = true
        }
      } catch (error) {
        console.error('Error marking message as read:', error)
      }
    }

    const updateMessageReadStatus = (messageId) => {
      const message = conversation.value.find((m) => m.id === messageId)
      if (message) {
        message.is_read = true
      }
    }

    const updateMessageUnreadCount = (messageId) => {
      const message = messages.value.find((m) => m.id === messageId)
      if (message) {
        message.unread_count = (message.unread_count || 0) + 1
      }
    }

    const addMessageToConversation = (data) => {
      // Check if message already exists in conversation
      const exists = conversation.value.some((msg) => msg.id === data.id)
      if (!exists) {
        conversation.value.push(data)

        // Update the latest message in the message list
        const messageIndex = messages.value.findIndex((m) => m.id === selectedMessage.value?.id)
        if (messageIndex !== -1) {
          messages.value[messageIndex].latest_message = data.content
          messages.value[messageIndex].updated_at = data.created_at
        }

        // Scroll to bottom on new message
        nextTick(() => {
          scrollToBottom()
        })

        // Show notification for messages from others
        if (data.sender_type !== 'case_manager') {
          $q.notify({
            type: 'info',
            message: 'New message received',
            position: 'top',
          })
        }

        // Mark as read if conversation is active
        if (isActiveConversation.value) {
          markMessageAsRead(data.id)
        } else if (data.sender_type !== 'case_manager') {
          // Update unread count for this specific message thread
          updateMessageUnreadCount(selectedMessage.value?.id)
        }

        // Update last message timestamp
        if (data.created_at) {
          lastMessageTimestamp.value = data.created_at
        }
      }
    }

    const handleTyping = () => {
      // Clear previous timeout
      if (typingTimeout.value) {
        clearTimeout(typingTimeout.value)
      }

      // Emit typing event to server via Pusher
      if (pusher.value && selectedMessage.value) {
        // Use a client event for typing indicators
        channel.value.trigger('client-typing', {
          message_id: selectedMessage.value.id,
          user: 'case_manager',
          typing: true,
        })
      }

      // Set timeout to clear typing indicator after 2 seconds of inactivity
      typingTimeout.value = setTimeout(() => {
        // Emit stopped typing event
        if (pusher.value && selectedMessage.value) {
          channel.value.trigger('client-typing', {
            message_id: selectedMessage.value.id,
            user: 'case_manager',
            typing: false,
          })
        }
      }, 2000)
    }

    const initializePusher = () => {
      try {
        // Initialize Pusher
        pusher.value = new Pusher(process.env.PUSHER_APP_KEY, {
          cluster: process.env.PUSHER_APP_CLUSTER,
          encrypted: true,
        })

        // Subscribe to the messages channel
        channel.value = pusher.value.subscribe('messages')

        // Listen for new messages
        channel.value.bind('new-message', (data) => {
          console.log('New message received via Pusher:', data)

          // Check if the message is already in the conversation
          const exists = conversation.value.some((msg) => msg.id === data.id)
          if (!exists) {
            // Add message to conversation
            addMessageToConversation(data)
          }
        })

        // Listen for read receipts
        channel.value.bind('read-receipt', (data) => {
          console.log('Read receipt received:', data)
          // Update UI to show message has been read
          updateMessageReadStatus(data.message_id)
        })

        // Listen for typing indicators
        channel.value.bind('client-typing', (data) => {
          console.log('Typing indicator received:', data)
          // Only show typing indicator for other users and for the current conversation
          if (
            data.user !== 'case_manager' &&
            selectedMessage.value &&
            data.message_id === selectedMessage.value.id
          ) {
            remoteTyping.value = data.typing

            // Clear previous timeout if exists
            if (typingIndicatorTimeout.value) {
              clearTimeout(typingIndicatorTimeout.value)
            }

            // Set a safety timeout to clear typing indicator after 5 seconds
            // in case the "stopped typing" event is missed
            if (data.typing) {
              typingIndicatorTimeout.value = setTimeout(() => {
                remoteTyping.value = false
              }, 5000)
            }
          }
        })

        console.log('Pusher initialized successfully')
      } catch (error) {
        console.error('Error initializing Pusher:', error)
      }
    }

    const getUpdates = async () => {
      if (!selectedMessage.value || !lastMessageTimestamp.value) return

      try {
        // Using formatDateForApi to ensure proper date formatting for the API
        const response = await api.get(`/api/auth/messages/${selectedMessage.value.id}/updates`, {
          params: {
            last_timestamp: formatDateForApi(lastMessageTimestamp.value),
          },
        })

        if (response.data.new_messages && response.data.new_messages.length > 0) {
          // Add new messages to the conversation
          response.data.new_messages.forEach((message) => {
            addMessageToConversation(message)
          })

          // Update last timestamp
          const lastMessage = response.data.new_messages[response.data.new_messages.length - 1]
          lastMessageTimestamp.value = lastMessage.created_at
        }
      } catch (error) {
        console.error('Error getting updates:', error)
      }
    }

    const selectMessage = async (message) => {
      selectedMessage.value = message
      isActiveConversation.value = true
      loadingConversation.value = true

      try {
        const response = await api.get(`/api/auth/messages/${message.id}/conversation`)

        if (response.data && response.data.conversation) {
          conversation.value = response.data.conversation

          // Set last message timestamp for polling fallback
          if (conversation.value.length > 0) {
            lastMessageTimestamp.value =
              conversation.value[conversation.value.length - 1].created_at
          }

          // Reset unread count when message is selected
          message.unread_count = 0
        } else {
          throw new Error('Invalid response format')
        }

        await nextTick()
        scrollToBottom()

        // Mark conversation as read
        await markMessageAsRead(message.id)

        // Focus on message input
        nextTick(() => {
          if (messageInput.value) {
            messageInput.value.focus()
          }
        })
      } catch (error) {
        console.error('Error fetching conversation:', error)

        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to load conversation',
          position: 'top',
          timeout: 5000,
        })
        conversation.value = []
      } finally {
        loadingConversation.value = false
      }
    }

    const scrollToBottom = () => {
      if (messageScroll.value) {
        messageScroll.value.setScrollPosition('vertical', 99999)
      }
    }

    const sendMessage = async () => {
      if (!newMessage.value.trim() || !selectedMessage.value || sending.value) return

      sending.value = true

      // Generate a unique temporary ID for the optimistic message
      const tempId = `temp-${Date.now()}`
      const optimisticMessage = {
        id: tempId,
        content: newMessage.value,
        created_at: new Date().toISOString(),
        sender_type: 'case_manager',
        sender: { name: 'You' }, // Replace with actual user name
        is_read: false,
        pending: true, // Initially set as pending
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

        // Replace optimistic message with real one if response contains the message
        if (response.data && response.data.id) {
          const index = conversation.value.findIndex((m) => m.id === tempId)
          if (index !== -1) {
            conversation.value[index] = {
              ...response.data,
              pending: false, // Set pending to false as it's now confirmed
            }

            // Update last message timestamp
            lastMessageTimestamp.value = response.data.created_at
          }
        }

        // Update message list to show latest message
        const messageIndex = messages.value.findIndex((m) => m.id === selectedMessage.value.id)
        if (messageIndex !== -1) {
          messages.value[messageIndex].latest_message = messageToSend
          messages.value[messageIndex].updated_at = new Date().toISOString()
        }

        // Focus back on the input
        nextTick(() => {
          if (messageInput.value) {
            messageInput.value.focus()
          }
        })
      } catch (error) {
        console.error('Error sending message:', error)

        // Remove optimistic message on error
        conversation.value = conversation.value.filter((m) => m.id !== tempId)

        $q.notify({
          type: 'negative',
          message: 'Failed to send message',
          position: 'top',
        })
      } finally {
        sending.value = false
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/auth/messages/categories')
        categories.value = response.data.data
      } catch (error) {
        console.error('Error fetching categories:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load message categories',
          position: 'top',
        })
      }
    }

    const openNewMessageDialog = () => {
      newMessageDialog.value = true
      newMessageForm.value = {
        category_id: null,
        subject: '',
        message: '',
        case_id: caseId,
      }
    }

    const submitNewMessage = async () => {
      sending.value = true
      try {
        const response = await api.post(
          `/api/auth/cases/${caseId}/addmessages`,
          newMessageForm.value,
        )

        $q.notify({
          type: 'positive',
          message: 'Message sent successfully',
          position: 'top',
        })

        newMessageDialog.value = false

        // Refresh messages list to show the new message
        await fetchMessages()

        // If response contains the new message ID, select it
        if (response.data && response.data.id) {
          const newMessageObj = messages.value.find((m) => m.id === response.data.id)
          if (newMessageObj) {
            selectMessage(newMessageObj)
          }
        }
      } catch (error) {
        console.error('Error sending message:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to send message',
          position: 'top',
        })
      } finally {
        sending.value = false
      }
    }

    // Watch for changes in the conversation to scroll to bottom
    watch(conversation, (newVal, oldVal) => {
      if (newVal.length > oldVal.length) {
        nextTick(() => scrollToBottom())
      }
    })

    onMounted(() => {
      fetchMessages()
      fetchCategories()

      // Initialize Pusher
      initializePusher()

      // Set up polling for updates (as a fallback)
      const updatesPollInterval = setInterval(getUpdates, 10000) // Poll every 10 seconds

      // Set up polling for messages list (as a fallback)
      const messagesPollInterval = setInterval(async () => {
        // Fetch messages silently in the background
        try {
          const oldMessages = JSON.parse(JSON.stringify(messages.value))
          const oldSelectedMessageId = selectedMessage.value?.id

          // Fetch messages without updating UI
          const response = await api.get(`/api/cases/${caseId}/messages`)
          if (response.data.messages && Array.isArray(response.data.messages)) {
            // Create new messages array without modifying the reference
            const newMessages = response.data.messages.map((message) => ({
              ...message,
              unread_count: message.unread_count || 0,
            }))

            // Check for new messages
            const hasNewMessages = newMessages.length > oldMessages.length

            // Only update if there are new messages and not sending
            if (hasNewMessages && !sending.value) {
              // Update messages reference without causing UI refresh
              messages.value = newMessages

              // Silently update unread count
              await fetchUnreadCount()

              // If user had a message selected, maintain that selection
              if (oldSelectedMessageId) {
                const currentSelection = newMessages.find((m) => m.id === oldSelectedMessageId)
                if (currentSelection && currentSelection !== selectedMessage.value) {
                  selectedMessage.value = currentSelection
                }
              }

              // Silent notification (no UI popup)
              console.log('New messages received in background')
            }
          }
        } catch (error) {
          console.error('Background message polling error:', error)
          // Silent failure - don't notify user of background refresh issues
        }
      }, 30000) // Poll every 30 seconds

      onUnmounted(() => {
        // Clean up intervals
        clearInterval(updatesPollInterval)
        clearInterval(messagesPollInterval)

        // Clean up Pusher
        if (channel.value) {
          channel.value.unbind_all()
          pusher.value.unsubscribe('messages')
        }

        if (pusher.value) {
          pusher.value.disconnect()
        }

        // Clear any remaining timeouts
        if (typingTimeout.value) {
          clearTimeout(typingTimeout.value)
        }

        if (typingIndicatorTimeout.value) {
          clearTimeout(typingIndicatorTimeout.value)
        }

        isActiveConversation.value = false
      })
    })

    return {
      route,
      messages,
      conversation,
      selectedMessage,
      newMessage,
      searchQuery,
      unreadCount,
      messageScroll,
      messageInput,
      loading,
      loadingConversation,
      sending,
      remoteTyping,
      filteredMessages,
      formatDate,
      formatTime,
      formatDateSeparator,
      shouldShowDateSeparator,
      selectMessage,
      sendMessage,
      handleTyping,
      scrollToBottom,
      newMessageDialog,
      newMessageForm,
      categories,
      openNewMessageDialog,
      submitNewMessage,
      isActiveConversation,
      updateMessageUnreadCount,
      formatDateForDisplay,
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
  margin: 8px 0;
  padding: 12px;
  border-radius: 12px;
  position: relative;
  animation: fadeIn 0.3s ease;

  .message-content {
    font-size: 14px;
    line-height: 1.4;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .message-time {
    margin-top: 4px;
    font-size: 11px;
    opacity: 0.8;
  }

  &.case_manager {
    margin-left: auto;
    background: #ffffff;
    color: #000000;
    border-bottom-right-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: -8px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-left-color: #ffffff;
      border-right: 0;
      border-bottom: 0;
    }

    .message-time {
      color: rgba(0, 0, 0, 0.6);
    }

    &.pending {
      opacity: 0.7;
    }
  }

  &.user {
    margin-right: auto;
    background: #32cd32;
    color: white;
    border-bottom-left-radius: 4px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -8px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-right-color: #32cd32;
      border-left: 0;
      border-bottom: 0;
    }

    .message-time {
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

.conversation {
  background: #dcf8c7;
  background-repeat: repeat;
}

// Add these new styles for the conversation header
.conversation-header {
  background: $green;
  border-bottom: 1px solid #e0e0e0;

  .text-h6 {
    font-size: 16px;
    line-height: 1.4;
  }

  .text-caption {
    font-size: 13px;
    opacity: 0.7;
    color: white;
  }
}

// Style for the message input area
.message-input {
  background: #f0f2f5;
  border-top: 1px solid #e0e0e0;

  .q-input {
    background: white;
    border-radius: 8px;
  }
}

.q-dialog {
  .q-card {
    max-width: 500px;
    width: 100%;
  }
}

.message-item {
  transition: background-color 0.3s ease;
  border-radius: 4px;
  margin: 2px 0;

  &:hover {
    background: rgba(21, 187, 90, 0.1);
  }

  &.unread-message {
    font-weight: bold;

    .message-preview {
      color: $grey-9;
    }
  }
}

.selected-message {
  background: rgb(21, 187, 90) !important;
  color: white !important;

  .q-item__label--caption {
    color: rgba(255, 255, 255, 0.7) !important;
  }

  .q-badge {
    background: white !important;
    color: rgb(21, 187, 90) !important;
  }
}

.q-badge {
  font-size: 0.8em;
  padding: 2px 6px;
}

// Date separator
.date-separator {
  text-align: center;
  margin: 16px 0;
  position: relative;
  color: $grey-8;
  font-size: 12px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: $grey-5;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
}

.typing-bubble {
  max-width: 80px;
  margin: 8px 0;
  padding: 12px;
  border-radius: 12px;
  position: relative;
  margin-right: auto;
  background: #32cd32;
  color: white;
  border-bottom-left-radius: 4px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -8px;
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-right-color: #32cd32;
    border-left: 0;
    border-bottom: 0;
  }

  .typing-dots {
    display: flex;
    justify-content: center;

    span {
      height: 8px;
      width: 8px;
      margin: 0 2px;
      background-color: white;
      border-radius: 50%;
      display: inline-block;
      opacity: 0.4;

      &:nth-child(1) {
        animation: bounce 1.5s infinite;
      }

      &:nth-child(2) {
        animation: bounce 1.5s infinite 0.3s;
      }

      &:nth-child(3) {
        animation: bounce 1.5s infinite 0.6s;
      }
    }
  }
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
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
</style>
