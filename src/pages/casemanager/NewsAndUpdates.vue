<template>
  <q-page class="q-pa-md">
    <!-- Header section with improved styling -->
    <div class="row items-center q-mb-lg">
      <div class="col">
        <h4 class="text-h4 text-weight-bold text-primary q-my-none">News & Updates</h4>
        <p class="text-grey-7 q-mt-sm">Stay informed about the latest announcements and updates</p>
      </div>
      <q-btn
        color="primary"
        icon="add"
        label="New Announcement"
        @click="openNewDialog"
        class="q-px-md"
        unelevated
      />
    </div>

    <!-- Search and filter section -->
    <div class="row q-col-gutter-md q-mb-md q-mb-md">
      <div class="col-12 col-sm-6">
        <q-input
          v-model="searchText"
          dense
          outlined
          placeholder="Search announcements..."
          class="full-width"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon
              v-if="searchText"
              name="close"
              class="cursor-pointer"
              @click="searchText = ''"
            />
          </template>
        </q-input>
      </div>
    </div>

    <!-- Announcements List with enhanced styling -->
    <div class="q-gutter-y-md q-mt-xl">
      <q-card
        v-for="announcement in paginatedAnnouncements"
        :key="announcement.id"
        class="announcement-card q-hover-elevation-4"
        bordered
      >
        <q-card-section>
          <div class="row items-center">
            <div class="text-h6 text-weight-bold text-primary">{{ announcement.title }}</div>
            <q-space />
            <q-btn-group flat>
              <q-btn
                flat
                round
                dense
                icon="edit"
                @click="openEditDialog(announcement)"
                color="primary"
              >
                <q-tooltip>Edit Announcement</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                icon="delete"
                @click="confirmDelete(announcement)"
                color="negative"
              >
                <q-tooltip>Delete Announcement</q-tooltip>
              </q-btn>
            </q-btn-group>
          </div>
          <div class="text-caption q-mb-sm text-grey-7">
            <q-icon name="event" size="xs" class="q-mr-xs" />
            Posted: {{ formatDate(announcement.created_at) }}
            <span v-if="announcement.updated_at !== announcement.created_at">
              <q-separator vertical inset class="q-mx-sm" />
              <q-icon name="update" size="xs" class="q-mr-xs" />
              Updated: {{ formatDate(announcement.updated_at) }}
            </span>
          </div>
          <div
            class="announcement-content text-body1"
            v-html="formatContent(announcement.content)"
          ></div>
        </q-card-section>
      </q-card>

      <!-- Enhanced empty state -->
      <div v-if="!filteredAnnouncements.length && !loading" class="text-center q-pa-xl">
        <q-icon name="announcement" size="6rem" color="grey-4" />
        <div class="text-h6 text-grey-6 q-mt-md">No announcements found</div>
        <div class="text-grey-6">
          {{ searchText ? 'Try adjusting your search' : 'Create your first announcement' }}
        </div>
      </div>

      <!-- Enhanced loading state -->
      <div v-if="loading" class="text-center q-pa-xl">
        <q-spinner-dots color="primary" size="4em" />
        <div class="text-grey q-mt-sm">Loading announcements...</div>
      </div>

      <!-- Pagination -->
      <div class="row justify-center q-mt-lg" v-if="filteredAnnouncements.length">
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          :max-pages="6"
          boundary-numbers
          direction-links
          unelevated
          color="primary"
          active-color="primary"
        />
      </div>
    </div>

    <!-- New/Edit Announcement Dialog -->
    <q-dialog v-model="dialog.show" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ dialog.isEdit ? 'Edit Announcement' : 'New Announcement' }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="handleSubmit" class="q-gutter-md">
            <q-input
              v-model="dialog.form.title"
              label="Title *"
              :rules="[(val) => !!val || 'Title is required']"
            />

            <q-input
              v-model="dialog.form.content"
              type="textarea"
              label="Content *"
              rows="6"
              :rules="[(val) => !!val || 'Content is required']"
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="grey" flat v-close-popup />
              <q-btn
                :label="dialog.isEdit ? 'Update' : 'Post'"
                color="primary"
                type="submit"
                :loading="dialog.loading"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Delete Confirmation Dialog -->
    <q-dialog v-model="deleteDialog.show" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">Confirm Delete</div>
        </q-card-section>

        <q-card-section> Are you sure you want to delete this announcement? </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="negative"
            @click="handleDelete"
            :loading="deleteDialog.loading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'
import { date } from 'quasar'

export default {
  name: 'NewsAndUpdates',

  setup() {
    const $q = useQuasar()
    const loading = ref(false)
    const announcements = ref([])
    const searchText = ref('')
    const currentPage = ref(1)
    const itemsPerPage = 5

    const dialog = ref({
      show: false,
      isEdit: false,
      loading: false,
      form: {
        title: '',
        content: '',
      },
      editId: null,
    })

    const deleteDialog = ref({
      show: false,
      loading: false,
      announcement: null,
    })

    // Computed properties for filtering and pagination
    const filteredAnnouncements = computed(() => {
      if (!searchText.value) return announcements.value
      const search = searchText.value.toLowerCase()
      return announcements.value.filter(
        (announcement) =>
          announcement.title.toLowerCase().includes(search) ||
          announcement.content.toLowerCase().includes(search),
      )
    })

    const totalPages = computed(() => Math.ceil(filteredAnnouncements.value.length / itemsPerPage))

    const paginatedAnnouncements = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return filteredAnnouncements.value.slice(start, end)
    })

    // Watch for search changes to reset pagination
    watch(searchText, () => {
      currentPage.value = 1
    })

    const fetchAnnouncements = async () => {
      loading.value = true
      try {
        const response = await api.get('/api/auth/announcements')
        announcements.value = response.data
      } catch (error) {
        console.error('Error fetching announcements:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load announcements',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    const openNewDialog = () => {
      dialog.value = {
        show: true,
        isEdit: false,
        loading: false,
        form: {
          title: '',
          content: '',
        },
        editId: null,
      }
    }

    const openEditDialog = (announcement) => {
      dialog.value = {
        show: true,
        isEdit: true,
        loading: false,
        form: {
          title: announcement.title,
          content: announcement.content,
        },
        editId: announcement.id,
      }
    }

    const handleSubmit = async () => {
      dialog.value.loading = true
      try {
        if (dialog.value.isEdit) {
          await api.patch(`/api/admin/announcements/${dialog.value.editId}`, dialog.value.form)
        } else {
          await api.post('/api/admin/announcements', dialog.value.form)
        }

        await fetchAnnouncements()
        dialog.value.show = false
        $q.notify({
          type: 'positive',
          message: `Announcement ${dialog.value.isEdit ? 'updated' : 'posted'} successfully`,
          position: 'top',
        })
      } catch (error) {
        console.error('Error saving announcement:', error)
        $q.notify({
          type: 'negative',
          message: `Failed to ${dialog.value.isEdit ? 'update' : 'post'} announcement`,
          position: 'top',
        })
      } finally {
        dialog.value.loading = false
      }
    }

    const confirmDelete = (announcement) => {
      deleteDialog.value = {
        show: true,
        loading: false,
        announcement,
      }
    }

    const handleDelete = async () => {
      deleteDialog.value.loading = true
      try {
        await api.delete(`/api/admin/announcements/${deleteDialog.value.announcement.id}`)
        await fetchAnnouncements()
        deleteDialog.value.show = false
        $q.notify({
          type: 'positive',
          message: 'Announcement deleted successfully',
          position: 'top',
        })
      } catch (error) {
        console.error('Error deleting announcement:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to delete announcement',
          position: 'top',
        })
      } finally {
        deleteDialog.value.loading = false
      }
    }

    const formatDate = (dateString) => {
      return date.formatDate(dateString, 'MMMM D, YYYY h:mm A')
    }

    const formatContent = (content) => {
      // Convert line breaks to HTML breaks for display
      return content.replace(/\n/g, '<br>')
    }

    onMounted(() => {
      fetchAnnouncements()
    })

    return {
      loading,
      announcements,
      dialog,
      deleteDialog,
      openNewDialog,
      openEditDialog,
      handleSubmit,
      confirmDelete,
      handleDelete,
      formatDate,
      formatContent,
      searchText,
      currentPage,
      filteredAnnouncements,
      paginatedAnnouncements,
      totalPages,
    }
  },
}
</script>

<style lang="scss" scoped>
.announcement-card {
  transition: all 0.2s ease;
  border-radius: 8px;

  &:hover {
    transform: translateY(-2px);
  }
}

.announcement-content {
  white-space: pre-line;
  line-height: 1.8;
  color: $grey-8;

  ::v-deep(a) {
    color: $primary;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

// Add smooth transitions
.q-card {
  transition: all 0.3s ease;
}

.q-pagination {
  ::v-deep(.q-btn) {
    min-width: 32px;
    padding: 4px 0;
  }
}
</style>
