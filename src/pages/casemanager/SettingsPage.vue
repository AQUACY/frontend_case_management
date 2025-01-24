<template>
  <div class="settings">
    <div class="text-h6 q-mb-lg">Settings</div>

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
              :active="currentSection === item.value"
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
              <div class="text-h6 q-mb-md">Profile Settings</div>
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.name" label="Full Name" outlined dense />
                </div>
                <div class="col-12 col-md-6">
                  <q-input v-model="profile.email" label="Email" type="email" outlined dense />
                </div>
                <div class="col-12">
                  <q-input v-model="profile.bio" label="Bio" type="textarea" outlined />
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
                  <q-item-section>
                    <q-item-label>Case Updates</q-item-label>
                    <q-item-label caption> Get notified about case status changes </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle v-model="notifications.cases" />
                  </q-item-section>
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
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Two-Factor Authentication</q-item-label>
                    <q-item-label caption> Enable 2FA for additional security </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle v-model="security.twoFactor" />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="negative" />
            <q-btn label="Save Changes" color="primary" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SettingsPage',
  setup() {
    const currentSection = ref('profile')

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
      email: true,
      cases: true,
    })

    const security = ref({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactor: false,
    })

    return {
      currentSection,
      settingsMenu,
      profile,
      notifications,
      security,
    }
  },
}
</script>
