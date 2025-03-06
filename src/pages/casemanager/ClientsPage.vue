<template>
  <div class="users">
    <div class="row justify-between q-mb-md">
      <div class="text-h6">User Management</div>
      <q-btn color="green" icon="person_add" label="New User" @click="openNewUserDialog" />
    </div>

    <q-card>
      <q-table :rows="users" :columns="columns" row-key="id" :filter="filter" :loading="loading">
        <template v-slot:top-right>
          <q-input v-model="filter" placeholder="Search Users" dense outlined>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-roles="props">
          <q-td :props="props">
            <q-chip
              v-for="role in props.row.roles"
              :key="role"
              color="green"
              text-color="white"
              size="sm"
            >
              {{ role }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-group flat>
              <!-- <q-btn flat round size="sm" color="green" icon="visibility">
                <q-tooltip>View Details</q-tooltip>
              </q-btn> -->
              <q-btn
                flat
                round
                size="sm"
                color="warning"
                icon="edit"
                @click.stop="openEditUserDialog(props.row)"
              >
                <q-tooltip>Edit User</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                size="sm"
                color="negative"
                icon="delete"
                @click.stop="deleteUser(props.row.id)"
              >
                <q-tooltip>Delete User</q-tooltip>
              </q-btn>
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- New User Dialog -->
    <q-dialog v-model="newUserDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">New User</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="submitNewUser" class="q-gutter-md">
            <q-input
              v-model="newUserForm.name"
              label="Full Name"
              :rules="[(val) => !!val || 'Name is required']"
              outlined
              dense
            />

            <q-input
              v-model="newUserForm.email"
              label="Email"
              type="email"
              :rules="[
                (val) => !!val || 'Email is required',
                (val) => /^[^@]+@[^@]+\.[^@]+$/.test(val) || 'Invalid email',
              ]"
              outlined
              dense
            />

            <q-input
              v-model="newUserForm.password"
              label="Password"
              type="password"
              :rules="[(val) => !!val || 'Password is required']"
              outlined
              dense
            />

            <q-select
              v-model="newUserForm.role"
              :options="roles"
              label="Role"
              :rules="[(val) => !!val || 'Role is required']"
              outlined
              dense
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="negative" v-close-popup flat class="q-mr-sm" />
              <q-btn label="Create" type="submit" color="green" :loading="submitting" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Edit User Dialog -->
    <q-dialog v-model="editUserDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Edit User</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="updateUser" class="q-gutter-md">
            <q-input
              v-model="editUserForm.name"
              label="Full Name"
              :rules="[(val) => !!val || 'Name is required']"
              outlined
              dense
            />

            <q-input
              v-model="editUserForm.email"
              label="Email"
              type="email"
              :rules="[
                (val) => !!val || 'Email is required',
                (val) => /^[^@]+@[^@]+\.[^@]+$/.test(val) || 'Invalid email',
              ]"
              outlined
              dense
            />

            <q-select
              v-model="editUserForm.role"
              :options="roles"
              label="Role"
              :rules="[(val) => !!val || 'Role is required']"
              outlined
              dense
            />

            <q-toggle
              v-model="editUserForm.subscribed_to_announcements"
              label="Subscribe to Announcements"
            />

            <div class="row justify-end q-mt-md">
              <q-btn label="Cancel" color="negative" v-close-popup flat class="q-mr-sm" />
              <q-btn label="Update" type="submit" color="green" :loading="submitting" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'UsersPage',
  setup() {
    const $q = useQuasar()
    const loading = ref(false)
    const submitting = ref(false)
    const filter = ref('')
    const users = ref([])
    const newUserDialog = ref(false)
    const editUserDialog = ref(false)
    const roles = ['Case Manager', 'Client']

    const columns = [
      { name: 'id', label: 'ID', field: 'id', sortable: true },
      { name: 'name', label: 'Name', field: 'name', sortable: true },
      { name: 'email', label: 'Email', field: 'email' },
      { name: 'roles', label: 'Roles', field: 'roles' },
      { name: 'case_count', label: 'Cases', field: 'case_count', sortable: true },
      { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
    ]

    const newUserForm = ref({
      name: '',
      email: '',
      password: '',
      role: null,
    })

    const editUserForm = ref({
      user_id: null,
      name: '',
      email: '',
      role: null,
      subscribed_to_announcements: false,
    })

    const fetchUsers = async () => {
      loading.value = true
      try {
        const response = await api.get('/api/admin/users')
        users.value = response.data.data
      } catch (error) {
        console.error('Error fetching users:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load users',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    const openNewUserDialog = () => {
      newUserForm.value = {
        name: '',
        email: '',
        password: '',
        role: null,
      }
      newUserDialog.value = true
    }

    const openEditUserDialog = (user) => {
      editUserForm.value = {
        user_id: user.id,
        name: user.name,
        email: user.email,
        role: user.roles[0], // Assuming single role
        subscribed_to_announcements: user.subscribed_to_announcements || false,
      }
      editUserDialog.value = true
    }

    const submitNewUser = async () => {
      submitting.value = true
      try {
        await api.post('/api/admin/register', newUserForm.value)

        $q.notify({
          type: 'positive',
          message: 'User created successfully',
          position: 'top',
        })

        newUserDialog.value = false
        fetchUsers() // Refresh the users list
      } catch (error) {
        console.error('Error creating user:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to create user',
          position: 'top',
        })
      } finally {
        submitting.value = false
      }
    }

    const updateUser = async () => {
      submitting.value = true
      try {
        const response = await api.patch(
          `/api/admin/users/${editUserForm.value.user_id}`,
          editUserForm.value,
        )

        $q.notify({
          type: 'positive',
          message: 'User updated successfully',
          position: 'top',
        })
        console.log(response)

        editUserDialog.value = false
        await fetchUsers() // Refresh the users list
      } catch (error) {
        console.error('Error updating user:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to update user',
          position: 'top',
        })
      } finally {
        submitting.value = false
      }
    }

    const deleteUser = async (userId) => {
      try {
        // Show confirmation dialog
        $q.dialog({
          title: 'Confirm Deletion',
          message: 'Are you sure you want to delete this user?',
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          $q.loading.show({
            message: 'Deleting user...',
          })

          // Send user_id in request body
          await api.delete(`/api/admin/users/${userId}`, {
            data: {
              // Use data property to send body with DELETE request
              user_id: userId,
            },
          })

          $q.notify({
            type: 'positive',
            message: 'User deleted successfully',
            position: 'top',
          })

          // Refresh the users list
          await fetchUsers()
          $q.loading.hide()
        })
      } catch (error) {
        console.error('Error deleting user:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to delete user',
          position: 'top',
        })
      } finally {
        $q.loading.hide()
      }
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      loading,
      submitting,
      filter,
      users,
      columns,
      roles,
      newUserDialog,
      editUserDialog,
      newUserForm,
      editUserForm,
      openNewUserDialog,
      openEditUserDialog,
      submitNewUser,
      updateUser,
      deleteUser,
    }
  },
}
</script>
