<template>
  <q-form @submit.prevent="handleSubmit">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.conference_name"
          label="Conference Name *"
          outlined
          :rules="[(val) => !!val || 'Conference name is required']"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.engagement_date"
          type="date"
          label="Engagement Date *"
          outlined
          :rules="[(val) => !!val || 'Engagement date is required']"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="formData.details"
          type="textarea"
          label="Details *"
          outlined
          rows="4"
          :rules="[(val) => !!val || 'Details are required']"
          hint="Please provide comprehensive information about the speaking engagement"
        />
      </div>
    </div>

    <div class="row justify-end q-mt-md q-gutter-sm">
      <q-btn label="Cancel" color="grey" flat @click="$emit('cancel')" />
      <q-btn label="Save" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'SpeakingEngagementForm',

  props: {
    item: {
      type: Object,
      default: null,
    },
  },

  emits: ['save', 'cancel'],

  setup(props, { emit }) {
    const formData = ref({
      conference_name: '',
      engagement_date: '',
      details: '',
    })

    onMounted(() => {
      if (props.item) {
        formData.value = { ...props.item }
      }
    })

    const handleSubmit = () => {
      emit('save', formData.value)
    }

    return {
      formData,
      handleSubmit,
    }
  },
}
</script>
