<template>
  <div class="settings q-pa-lg">
    <div class="text-h6 q-mb-lg text-green">Settings</div>

    <div class="row q-col-gutter-md">
      <!-- Settings Navigation -->
      <div class="col-12 col-md-3">
        <q-card>
          <q-list padding>
            <q-item
              v-for="item in settingsMenu"
              :key="item.label"
              clickable
              v-ripple
              :class="{
                'selected-item': currentSection === item.value,
                'menu-item': true
              }"
              @click="currentSection = item.value"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>{{ item.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- Settings Content -->
      <div class="col-12 col-md-9">
        <q-card>
          <q-card-section>
            <!-- Profile Settings -->
            <div v-if="currentSection === 'profile'">
              <div class="text-h6 q-mb-md text-green">Profile Settings</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.name" color="green" label="Full Name" outlined dense />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.email" color="green" label="Email" type="email" outlined dense />
                </div>
                <div class="col-12">
                  <q-input v-model="profile.bio" label="Bio" color="green" type="textarea" outlined />
                </div>
              </div>
            </div>

            <!-- Notifications Settings -->
            <div v-if="currentSection === 'notifications'">
              <div class="text-h6 q-mb-md">Notification Preferences</div>
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Email Notifications</q-item-label>
                    <q-item-label caption> Receive notifications via email </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle v-model="notifications.email" />
                  </q-item-section>
                </q-item>
                <q-item tag="label" v-ripple>
                  <!-- <q-item-section>
                    <q-item-label>Case Updates</q-item-label>
                    <q-item-label caption> Get notified about case status changes </q-item-label>
                  </q-item-section> -->
                  <!-- <q-item-section side>
                    <q-toggle v-model="notifications.cases" />
                  </q-item-section> -->
                </q-item>
              </q-list>
            </div>

            <!-- Security Settings -->
            <div v-if="currentSection === 'security'">
              <div class="text-h6 q-mb-md">Security Settings</div>
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label>Change Password</q-item-label>
                    <div class="row q-col-gutter-md q-mt-sm">
                      <div class="col-12 col-md-4">
                        <q-input
                          v-model="security.currentPassword"
                          label="Current Password"
                          type="password"
                          outlined
                          dense
                        />
                      </div>
                      <div class="col-12 col-md-4">
                        <q-input
                          v-model="security.newPassword"
                          label="New Password"
                          type="password"
                          outlined
                          dense
                        />
                      </div>
                      <div class="col-12 col-md-4">
                        <q-input
                          v-model="security.confirmPassword"
                          label="Confirm Password"
                          type="password"
                          outlined
                          dense
                        />
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
                <!-- <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Two-Factor Authentication</q-item-label>
                    <q-item-label caption> Enable 2FA for additional security </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle v-model="security.twoFactor" />
                  </q-item-section>
                </q-item> -->
              </q-list>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="negative" @click="resetChanges" />
            <q-btn label="Save Changes" color="green" :loading="saving" @click="saveChanges" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'

export default {
  name: 'SettingsPage',
  setup() {
    const $q = useQuasar()
    const currentSection = ref('profile')
    const saving = ref(false)

    const settingsMenu = [
      { label: 'Profile', value: 'profile', icon: 'person' },
      { label: 'Notifications', value: 'notifications', icon: 'notifications' },
      { label: 'Security', value: 'security', icon: 'security' },
    ]

    const profile = ref({
      name: '',
      email: '',
      bio: '',
    })

    const notifications = ref({
      email: false,
      cases: true,
    })

    const security = ref({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactor: false,
      errors: {},
    })

    // Load user data from localStorage
    const loadUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'))
        if (userData) {
          profile.value = {
            name: userData.name || '',
            email: userData.email || '',
            bio: '',
          }

          notifications.value.email = userData.subscribed_to_announcement || false

          console.log('Loaded user data:', {
            profile: profile.value,
            notifications: notifications.value,
          }) // Debug log
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    }

    // Load user data when component mounts
    onMounted(() => {
      loadUserData()
    })

    // Save changes based on current section
    const saveChanges = async () => {
      saving.value = true
      try {
        switch (currentSection.value) {
          case 'profile':
            await updateProfile()
            break
          case 'notifications':
            await updateNotifications()
            break
          case 'security':
            await updatePassword()
            break
        }
      } catch (error) {
        console.error('Error saving changes:', error)
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to save changes',
        })
      } finally {
        saving.value = false
      }
    }

    // Update profile information
    const updateProfile = async () => {
      const response = await api.put('/api/auth/account/update', {
        name: profile.value.name,
        email: profile.value.email,
      })

      if (response.data.success) {
        // Update localStorage with new data
        const userData = JSON.parse(localStorage.getItem('user'))
        userData.name = profile.value.name
        userData.email = profile.value.email
        localStorage.setItem('user', JSON.stringify(userData))

        $q.notify({
          type: 'positive',
          message: 'Profile updated successfully',
        })
      }
    }

    // Update notification preferences
    const updateNotifications = async () => {
      const userData = JSON.parse(localStorage.getItem('user'))
      const userId = userData.id

      const response = await api.patch(`/api/auth/user/${userId}/subscribe`, {
        subscribed_to_announcements: notifications.value.email,
      })
      console.log(response)
      if (response.status === 200) {
        // Update localStorage
        userData.subscribed_to_announcement = notifications.value.email
        localStorage.setItem('user', JSON.stringify(userData))

        $q.notify({
          type: 'positive',
          message: 'Notification preferences updated successfully',
        })
      }
    }

    // Update password
    const updatePassword = async () => {
      try {
        // Reset previous errors
        security.value.errors = {}

        // Validate password length
        if (security.value.newPassword.length < 8) {
          $q.notify({
            type: 'negative',
            message: 'The new password must be at least 8 characters.',
          })
          return
        }

        // Validate password confirmation
        if (security.value.newPassword !== security.value.confirmPassword) {
          $q.notify({
            type: 'negative',
            message: 'The new password confirmation does not match.',
          })
          return
        }

        const response = await api.put('/api/auth/account/password', {
          current_password: security.value.currentPassword,
          new_password: security.value.newPassword,
          new_password_confirmation: security.value.confirmPassword,
        })

        if (response.data.status === 'success') {
          // Clear password fields
          security.value.currentPassword = ''
          security.value.newPassword = ''
          security.value.confirmPassword = ''

          $q.notify({
            type: 'positive',
            message: response.data.message || 'Password updated successfully',
          })
        }
      } catch (error) {
        console.error('Password update error:', error)

        if (error.response?.status === 422) {
          // Validation errors
          const errorMessage = error.response.data.message
          const errors = error.response.data.errors

          if (errors?.current_password) {
            $q.notify({
              type: 'negative',
              message: errors.current_password[0],
            })
          } else if (errors?.new_password) {
            $q.notify({
              type: 'negative',
              message: errors.new_password[0],
            })
          } else {
            $q.notify({
              type: 'negative',
              message: errorMessage || 'Validation failed',
            })
          }
        } else {
          // Other errors
          $q.notify({
            type: 'negative',
            message: error.response?.data?.message || 'Error updating password',
          })
        }
      }
    }

    // Reset form changes
    const resetChanges = () => {
      loadUserData() // Reload original data
      security.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactor: false,
        errors: {},
      }
    }

    return {
      currentSection,
      settingsMenu,
      profile,
      notifications,
      security,
      saving,
      saveChanges,
      resetChanges,
      updatePassword,
    }
  },
}
</script>
<style lang="scss" scoped>
.menu-item {
  transition: background-color 0.3s ease;
  border-radius: 4px;
  margin: 2px 0;

  &:hover {
    background: rgba(21, 187, 90, 0.1);
  }
}

.selected-item {
  background: rgb(21, 187, 90) !important;
  color: white !important;

  .q-item__section {
    color: white !important;
  }

  .q-icon {
    color: white !important;
  }
}
</style>
