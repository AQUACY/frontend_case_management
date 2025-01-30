<template>
  <q-page class="messages-page">
    <div class="row full-height">
      <!-- Left Panel - Message List -->
      <div class="col-4 messages-list q-pa-sm" style="border-right: 1px solid #ddd">
        <div class="row items-center q-pa-sm">
          <div class="text-h6 q-mr-auto">Case Messages</div>
          <q-badge v-if="unreadCount > 0" color="red" floating transparent>
            {{ unreadCount }}
          </q-badge>

          <!-- Add New Message Button -->
          <q-btn
            color="primary"
            icon="add"
            label="New Message"
            @click="openNewMessageDialog"
            class="q-ml-sm"
          />
        </div>

        <!-- Search Messages -->
        <q-input v-model="searchQuery" dense outlined placeholder="Search messages" class="q-mb-md">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- Messages List -->
        <q-scroll-area style="height: calc(100vh - 150px)">
          <div v-if="loading" class="text-center q-pa-md">
            <q-spinner color="primary" size="2em" />
          </div>

          <q-list v-else separator>
            <q-item
              v-for="message in filteredMessages"
              :key="message.id"
              clickable
              :active="selectedMessage?.id === message.id"
              @click="selectMessage(message)"
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="person" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ message.subject }}</q-item-label>
                <q-item-label caption lines="2">
                  {{ message.latest_message }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  {{ formatDate(message.updated_at) }}
                </q-item-label>
                <q-badge v-if="message.unread_count" color="primary" rounded>
                  {{ message.unread_count }}
                </q-badge>
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
            <div class="text-h6">{{ selectedMessage.subject }}</div>
            <div class="text-caption text-grey">Case #{{ route.params.id }}</div>
          </div>

          <!-- Messages Area -->
          <q-scroll-area ref="messageScroll" style="height: calc(100vh - 220px)" class="q-pa-md">
            <div v-if="loadingConversation" class="text-center q-pa-md">
              <q-spinner color="primary" size="2em" />
            </div>

            <template v-else>
              <div v-for="msg in conversation" :key="msg.id" class="q-mb-md">
                <div
                  :class="['message-bubble', msg.sender_type === 'user' ? 'user' : 'case_manager']"
                >
                  <div class="row items-center no-wrap q-mb-sm">
                    <div class="text-caption text-weight-medium">
                      {{ msg.sender.name }} ({{ msg.sender_type }})
                    </div>
                  </div>
                  <div class="message-content">{{ msg.content }}</div>
                  <div class="message-time text-caption text-grey-6">
                    {{ formatDate(msg.created_at) }}
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
              placeholder="Type your message"
              @keypress.enter.prevent="sendMessage"
            >
              <template v-slot:after>
                <q-btn
                  round
                  flat
                  color="primary"
                  icon="send"
                  :loading="sending"
                  :disable="!newMessage.trim() || sending"
                  @click="sendMessage"
                />
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
              <q-btn
                label="Send"
                color="primary"
                type="submit"
                :loading="sending"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted, computed, nextTick, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { date, useQuasar } from 'quasar'
import { api } from 'boot/axios'

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
    const loading = ref(false)
    const loadingConversation = ref(false)
    const sending = ref(false)
    const newMessageDialog = ref(false)
    const categories = ref([])
    const isActiveConversation = ref(false)
    const caseId = route.params.id
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
      return date.formatDate(dateStr, 'MMM D, YYYY h:mm A')
    }

    const fetchMessages = async () => {
      loading.value = true
      try {
        console.log('Fetching messages for case:', caseId)
        const response = await api.get(`/api/cases/${caseId}/messages`)
        console.log('Messages response:', response.data.messages)

        if (response.data.messages && Array.isArray(response.data.messages)) {
          messages.value = response.data.messages
        } else {
          console.error('Invalid messages response format:', response.data.messages)
          throw new Error('Invalid messages response format')
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
        console.error('Error response:', error.response)

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
        console.log('Marking message as read:', messageId)
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

    const subscribeToConversation = (messageId) => {
      try {
        // Clean up previous subscription if exists
        if (selectedMessage.value && window.Echo) {
          console.log('Leaving previous channel:', `message.${selectedMessage.value.id}`)
          window.Echo.leave(`message.${selectedMessage.value.id}`)
        }

        console.log('Subscribing to channel:', `message.${messageId}`)
        // Subscribe to new conversation channel
        window.Echo.private(`message.${messageId}`)
          .listen('.new.message', (data) => {
            console.log('New message received:', data)
            conversation.value.push({
              id: data.id,
              content: data.content,
              sender_id: data.sender_id,
              sender_type: data.sender_type,
              sender_name: data.sender_name,
              created_at: data.created_at,
              is_read: data.is_read,
            })

            // Scroll to bottom on new message
            nextTick(() => {
              if (messageScroll.value) {
                messageScroll.value.setScrollPosition('vertical', 99999)
              }
            })

            // Show notification for messages from others
            if (data.sender_type !== 'user') {
              $q.notify({
                type: 'info',
                message: 'New message received',
                position: 'top',
              })
            }

            // Mark as read if conversation is active
            if (isActiveConversation.value) {
              markMessageAsRead(data.id)
            }
          })
          .listen('.message.read', (data) => {
            updateMessageReadStatus(data.message_id)
          })
      } catch (error) {
        console.error('Error subscribing to conversation:', error)
      }
    }

    const selectMessage = async (message) => {
      console.log('Selecting message:', message)

      if (!message || !message.id) {
        console.error('Invalid message object:', message)
        $q.notify({
          type: 'negative',
          message: 'Invalid message selected',
          position: 'top',
        })
        return
      }

      selectedMessage.value = message
      isActiveConversation.value = true
      loadingConversation.value = true

      try {
        console.log('Fetching conversation for message ID:', message.id)
        const response = await api.get(`/api/auth/messages/${message.id}/conversation`)
        console.log('Conversation response:', response.data.conversation)

        if (response.data && response.data.conversation) {
          conversation.value = response.data.conversation
        } else {
          console.error('Invalid response format:', response.data)
          throw new Error('Invalid response format')
        }

        // Subscribe to conversation channel
        subscribeToConversation(message.id)

        await nextTick()
        if (messageScroll.value) {
          messageScroll.value.setScrollPosition('vertical', 99999)
        }

        // Mark conversation as read
        await markMessageAsRead(message.id)
      } catch (error) {
        console.error('Error fetching conversation:', error)
        console.error('Error response:', error.response)

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

    const sendMessage = async () => {
      if (!newMessage.value.trim() || !selectedMessage.value) return

      sending.value = true
      try {
        await api.post(`/api/auth/messages/${selectedMessage.value.id}/reply`, {
          content: newMessage.value,
        })

        newMessage.value = ''
        selectMessage(selectedMessage.value)
      } catch (error) {
        console.error('Error sending message:', error)
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
        await api.post(`/api/auth/cases/${caseId}/addmessages`, newMessageForm.value)

        $q.notify({
          type: 'positive',
          message: 'Message sent successfully',
          position: 'top',
        })

        newMessageDialog.value = false
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

    onMounted(() => {
      console.log('Component mounted, case ID:', caseId)
      fetchMessages()
      fetchCategories()
    })

    onUnmounted(() => {
      // Clean up Echo listener
      if (selectedMessage.value && window.Echo) {
        console.log('Cleaning up Echo listener')
        window.Echo.leave(`message.${selectedMessage.value.id}`)
      }
      isActiveConversation.value = false
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
      loading,
      loadingConversation,
      sending,
      filteredMessages,
      formatDate,
      selectMessage,
      sendMessage,
      newMessageDialog,
      newMessageForm,
      categories,
      openNewMessageDialog,
      submitNewMessage,
      isActiveConversation,
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
  margin: 12px 0;
  padding: 12px;
  border-radius: 12px;
  position: relative;

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

  &.user {
    margin-left: auto;
    background: #32cd32;
    color: white;
    border-bottom-right-radius: 4px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: -8px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-left-color: #32cd32;
      border-right: 0;
      border-bottom: 0;
    }

    .message-time {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  &.case_manager {
    margin-right: auto;
    background: #ffffff;
    color: #000000;
    border-bottom-left-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -8px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-right-color: #ffffff;
      border-left: 0;
      border-bottom: 0;
    }
  }
}

.conversation {
  background: #cca175;
  background-repeat: repeat;
}

// Add these new styles for the conversation header
.conversation-header {
  background: #f0f2f5;
  border-bottom: 1px solid #e0e0e0;

  .text-h6 {
    font-size: 16px;
    line-height: 1.4;
  }

  .text-caption {
    font-size: 13px;
    opacity: 0.7;
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
</style>
