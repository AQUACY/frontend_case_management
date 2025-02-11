<template>
  <q-form @submit.prevent="handleSubmit">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.media_name"
          label="Media Name *"
          outlined
          :rules="[val => !!val || 'Media name is required']"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.date_published"
          type="date"
          label="Date Published *"
          outlined
          :rules="[val => !!val || 'Publication date is required']"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.author"
          label="Author *"
          outlined
          :rules="[val => !!val || 'Author is required']"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.outlet_name"
          label="Outlet Name *"
          outlined
          :rules="[val => !!val || 'Outlet name is required']"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model.number="formData.circulation_count"
          type="number"
          label="Circulation Count *"
          outlined
          :rules="[
            val => !!val || 'Circulation count is required',
            val => val >= 0 || 'Must be 0 or greater'
          ]"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="formData.article_summary"
          type="textarea"
          label="Article Summary *"
          outlined
          rows="4"
          :rules="[val => !!val || 'Article summary is required']"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="formData.work_relevance"
          type="textarea"
          label="Work Relevance *"
          outlined
          rows="4"
          :rules="[val => !!val || 'Work relevance is required']"
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
  name: 'MediaCoverageForm',

  props: {
    item: {
      type: Object,
      default: null
    }
  },

  emits: ['save', 'cancel'],

  setup(props, { emit }) {
    const formData = ref({
      media_name: '',
      date_published: '',
      author: '',
      outlet_name: '',
      circulation_count: 0,
      article_summary: '',
      work_relevance: ''
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
      handleSubmit
    }
  }
}
</script>
