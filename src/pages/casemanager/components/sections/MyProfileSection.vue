<template>
  <div class="my-profile-section">
    <div class="text-h6 q-mb-md">My Profile</div>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Academic Degree</q-item-label>
                  <q-item-label>{{ profileDetails?.academic_degree }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Current US Position</q-item-label>
                  <q-item-label>{{ profileDetails?.current_us_position }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Field of Expertise</q-item-label>
                  <q-item-label>{{ profileDetails?.field_of_expertise }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-6">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Research Experience</q-item-label>
                  <q-item-label>{{ profileDetails?.research_experience }} years</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Citation Database Links</q-item-label>
                  <q-item-label class="text-primary">
                    <a :href="profileDetails?.citation_database_link" target="_blank">
                      {{ profileDetails?.citation_database_link }}
                    </a>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'MyProfileSection',
  props: {
    profileDetails: {
      type: Object,
      required: true
    }
  }
}
</script> 
