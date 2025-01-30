<template>
  <div class="messages-section">
    <div class="text-h6 q-mb-md">Messages</div>
    <q-card>
      <q-card-section>
        <div class="row">
          <!-- Messages List -->
          <div class="col-12 col-md-4 messages-list">
            <q-list separator>
              <q-item
                v-for="message in messages"
                :key="message.id"
                clickable
                :active="selectedMessage?.id === message.id"
                @click="selectMessage(message)"
                v-ripple
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="message.sender.avatar" :alt="message.sender.name" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ message.sender.name }}</q-item-label>
                  <q-item-label caption lines="2">
                    {{ message.preview }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="text-caption">
                    {{ formatDate(message.date) }}
                  </div>
                  <q-badge v-if="message.unread" color="green" floating> New </q-badge>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <!-- Message Content -->
          <div class="col-12 col-md-8 message-content">
            <div v-if="selectedMessage" class="full-height">
              <div class="message-header q-pa-md">
                <div class="row items-center justify-between">
                  <div class="col">
                    <div class="text-h6">{{ selectedMessage.subject }}</div>
                    <div class="text-caption">
                      From: {{ selectedMessage.sender.name }} ({{ selectedMessage.sender.email }})
                    </div>
                    <div class="text-caption">
                      {{ formatDate(selectedMessage.date, true) }}
                    </div>
                  </div>
                  <div class="col-auto">
                    <q-btn-group flat>
                      <q-btn icon="reply" flat round>
                        <q-tooltip>Reply</q-tooltip>
                      </q-btn>
                      <q-btn icon="forward" flat round>
                        <q-tooltip>Forward</q-tooltip>
                      </q-btn>
                      <q-btn icon="delete" flat round>
                        <q-tooltip>Delete</q-tooltip>
                      </q-btn>
                    </q-btn-group>
                  </div>
                </div>
              </div>

              <q-separator />

              <div class="message-body q-pa-md">
                <div v-html="selectedMessage.content"></div>
              </div>

              <div v-if="selectedMessage.attachments?.length" class="message-attachments q-pa-md">
                <div class="text-subtitle2 q-mb-sm">Attachments</div>
                <div class="row q-col-gutter-sm">
                  <div
                    v-for="attachment in selectedMessage.attachments"
                    :key="attachment.id"
                    class="col-12 col-sm-6 col-md-4"
                  >
                    <q-card bordered flat class="attachment-card">
                      <q-card-section class="q-pa-sm">
                        <div class="row items-center">
                          <q-icon :name="getFileIcon(attachment.type)" size="sm" class="q-mr-sm" />
                          <div class="ellipsis">{{ attachment.name }}</div>
                          <q-btn icon="download" flat round dense class="q-ml-sm" size="sm" />
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="full-height column items-center justify-center">
              <q-icon name="email" size="48px" color="grey-5" />
              <div class="text-grey q-mt-sm">Select a message to read</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'MessagesSection',
  props: {
    messages: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      selectedMessage: null,
    }
  },
  methods: {
    formatDate(date, detailed = false) {
      if (!date) return ''
      if (detailed) {
        return new Date(date).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      }
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    },
    selectMessage(message) {
      this.selectedMessage = message
    },
    getFileIcon(type) {
      const icons = {
        pdf: 'picture_as_pdf',
        doc: 'description',
        image: 'image',
        default: 'insert_drive_file',
      }
      return icons[type] || icons.default
    },
  },
}
</script>

<style lang="scss" scoped>
.messages-section {
  .messages-list {
    border-right: 1px solid #ddd;
    height: calc(100vh - 200px);
    overflow-y: auto;
  }

  .message-content {
    height: calc(100vh - 200px);
    display: flex;
    flex-direction: column;
  }

  .message-body {
    flex: 1;
    overflow-y: auto;
  }

  .attachment-card {
    &:hover {
      background: #f5f5f5;
    }
  }
}
</style>
