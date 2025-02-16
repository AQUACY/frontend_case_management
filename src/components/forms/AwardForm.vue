<template>
  <q-form @submit.prevent="handleSubmit">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.award_name"
          label="Award Name *"
          outlined
          :rules="[(val) => !!val || 'Award name is required']"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.award_recipient"
          label="Award Recipient *"
          outlined
          :rules="[(val) => !!val || 'Award recipient is required']"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="formData.awarding_institution"
          label="Awarding Institution *"
          outlined
          :rules="[(val) => !!val || 'Awarding institution is required']"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="formData.award_criteria"
          type="textarea"
          label="Award Criteria *"
          outlined
          :rules="[(val) => !!val || 'Award criteria is required']"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="formData.award_significance"
          type="textarea"
          label="Award Significance *"
          outlined
          :rules="[(val) => !!val || 'Award significance is required']"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model.number="formData.number_of_recipients"
          type="number"
          label="Number of Recipients *"
          outlined
          :rules="[
            (val) => !!val || 'Number of recipients is required',
            (val) => val > 0 || 'Must be greater than 0',
          ]"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="formData.competitor_limitations"
          type="textarea"
          label="Competitor Limitations *"
          outlined
          :rules="[(val) => !!val || 'Competitor limitations is required']"
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
  name: 'AwardForm',

  props: {
    item: {
      type: Object,
      default: null,
    },
  },

  emits: ['save', 'cancel'],

  setup(props, { emit }) {
    const formData = ref({
      award_name: '',
      award_recipient: '',
      awarding_institution: '',
      award_criteria: '',
      award_significance: '',
      number_of_recipients: null,
      competitor_limitations: '',
    })

    // Populate form if editing
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
