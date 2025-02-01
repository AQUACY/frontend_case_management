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
                <q-badge v-if="message.is_read" color="green" rounded>
                  {{ message.is_read }}
                </q-badge>
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
          </div>

          <!-- Messages Area -->
          <q-scroll-area ref="messageScroll" style="height: calc(100vh - 220px)" class="q-pa-md">
            <div v-for="msg in conversation" :key="msg.id" class="q-mb-md">
              <div :class="['message-bubble q-pa-sm', msg.is_sender ? 'sent' : 'received']">
                <div class="text-body2">{{ msg.content }}</div>
                <div class="text-caption text-grey">
                  {{ formatDate(msg.created_at) }}
                </div>
              </div>
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
            >
              <template v-slot:after>
                <q-btn
                  round
                  flat
                  color="green"
                  icon="send"
                  :disable="!newMessage.trim()"
                  @click="sendMessage"
                />
              </template>
            </q-input>
          </div>
        </template>

        <div v-else class="column items-center justify-center full-height text-grey-6">
          <q-icon name="chat" size="4rem" color="white" />
          <div class="text-h6 q-mt-md text-white">Select a message to view conversation</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, computed, nextTick } from 'vue'
import { date } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'MessagesPage',

  setup() {
    const messages = ref([])
    const conversation = ref([])
    const selectedMessage = ref(null)
    const newMessage = ref('')
    const searchQuery = ref('')
    const unreadCount = ref(0)
    const messageScroll = ref(null)

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

    const fetchUnreadCount = async () => {
      try {
        const response = await api.get('/api/auth/messages/unread-count')
        unreadCount.value = response.data.count
        console.log(unreadCount.value)
        

      } catch (error) {
        console.error('Error fetching unread count:', error)
      }
    }

    const selectMessage = async (message) => {
      selectedMessage.value = message
      try {
        const response = await api.get(`/api/auth/messages/${message.id}/conversation`)
        conversation.value = response.data
        await nextTick()
        if (messageScroll.value) {
          messageScroll.value.setScrollPosition('vertical', 99999)
        }
      } catch (error) {
        console.error('Error fetching conversation:', error)
      }
    }

    const sendMessage = async () => {
      if (!newMessage.value.trim() || !selectedMessage.value) return

      try {
        await api.post(`/api/auth/messages/${selectedMessage.value.id}/reply`, {
          content: newMessage.value,
        })

        // Refresh conversation
        await selectMessage(selectedMessage.value)
        newMessage.value = ''
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }

    onMounted(() => {
      fetchUnreadCount()
    })

    return {
      messages,
      conversation,
      selectedMessage,
      newMessage,
      searchQuery,
      unreadCount,
      messageScroll,
      filteredMessages,
      formatDate,
      selectMessage,
      sendMessage,
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
  border-radius: 8px;
  margin: 4px 0;

  &.sent {
    margin-left: auto;
    background: #dcf8c6;
  }

  &.received {
    margin-right: auto;
    background: #fff;
  }
}

.conversation {
  background: #e5ddd5;
}
</style>
