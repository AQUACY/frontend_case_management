<template>
  <q-page padding>
    <div class="row q-mb-md items-center justify-between">
      <div class="text-h6">Message Categories</div>
      <q-btn color="green" icon="add" label="Add Message Category" @click="openAddDialog" />
    </div>

    <!-- Categories Table -->
    <q-table :rows="categories" :columns="columns" row-key="id" :loading="loading">
      <!-- Actions Column -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round color="primary" icon="edit" @click="openEditDialog(props.row)">
            <q-tooltip>Edit Category</q-tooltip>
          </q-btn>
          <q-btn flat round color="negative" icon="delete" @click="confirmDelete(props.row)">
            <q-tooltip>Delete Category</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- Add/Edit Dialog -->
    <q-dialog v-model="dialog.show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ dialog.isEdit ? 'Edit' : 'Add' }} Message Category</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="submitCategory">
            <q-input
              v-model="form.name"
              label="Category Name *"
              :rules="[(val) => !!val || 'Name is required']"
              class="q-mb-md"
            />
            <q-input
              v-model="form.description"
              label="Description"
              type="textarea"
              class="q-mb-md"
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="negative" flat v-close-popup />
              <q-btn
                :label="dialog.isEdit ? 'Update' : 'Add'"
                color="green"
                type="submit"
                :loading="submitting"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Delete Confirmation -->
    <q-dialog v-model="deleteDialog.show">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this category?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="negative"
            @click="deleteCategory"
            :loading="deleteDialog.loading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export default {
  name: 'MessageCategoriesPage',

  setup() {
    const $q = useQuasar()
    const loading = ref(false)
    const submitting = ref(false)
    const categories = ref([])

    const columns = [
      { name: 'name', label: 'Name', field: 'name', sortable: true },
      { name: 'description', label: 'Description', field: 'description' },
      { name: 'actions', label: 'Actions', field: 'actions' },
    ]

    const dialog = ref({
      show: false,
      isEdit: false,
    })

    const deleteDialog = ref({
      show: false,
      loading: false,
      category: null,
    })

    const form = ref({
      name: '',
      description: '',
    })

    const fetchCategories = async () => {
      loading.value = true
      try {
        const response = await api.get('/api/admin/messagecategories')
        categories.value = response.data.data
      } catch (error) {
        console.error('Error fetching categories:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load message categories',
        })
      } finally {
        loading.value = false
      }
    }

    const openAddDialog = () => {
      form.value = { name: '', description: '' }
      dialog.value = { show: true, isEdit: false }
    }

    const openEditDialog = (category) => {
      form.value = { ...category }
      dialog.value = { show: true, isEdit: true }
    }

    const submitCategory = async () => {
      submitting.value = true
      try {
        if (dialog.value.isEdit) {
          await api.patch(`/api/admin/updatemessagecategory/${form.value.id}`, form.value)
          $q.notify({ type: 'positive', message: 'Category updated successfully' })
        } else {
          await api.post('/api/admin/addmessagecategory', form.value)
          $q.notify({ type: 'positive', message: 'Category added successfully' })
        }
        dialog.value.show = false
        fetchCategories()
      } catch (error) {
        console.error('Error submitting category:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to save category',
        })
      } finally {
        submitting.value = false
      }
    }

    const confirmDelete = (category) => {
      deleteDialog.value = {
        show: true,
        loading: false,
        category,
      }
    }

    const deleteCategory = async () => {
      deleteDialog.value.loading = true
      try {
        await api.delete(`/api/admin/deletemessagecategory/${deleteDialog.value.category.id}`)
        $q.notify({ type: 'positive', message: 'Category deleted successfully' })
        deleteDialog.value.show = false
        fetchCategories()
      } catch (error) {
        console.error('Error deleting category:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to delete category',
        })
      } finally {
        deleteDialog.value.loading = false
      }
    }

    onMounted(() => {
      fetchCategories()
    })

    return {
      categories,
      columns,
      loading,
      submitting,
      dialog,
      deleteDialog,
      form,
      openAddDialog,
      openEditDialog,
      submitCategory,
      confirmDelete,
      deleteCategory,
    }
  },
}
</script>
