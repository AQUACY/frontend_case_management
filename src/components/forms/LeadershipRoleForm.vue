<template>
  <q-form @submit.prevent="handleSubmit">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.role_position"
          label="Role/Position *"
          outlined
          :rules="[(val) => !!val || 'Role position is required']"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.organization_name"
          label="Organization Name *"
          outlined
          :rules="[(val) => !!val || 'Organization name is required']"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.service_start_date"
          type="date"
          label="Start Date *"
          outlined
          :rules="[(val) => !!val || 'Start date is required']"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="formData.service_end_date"
          type="date"
          label="End Date"
          outlined
          hint="Leave blank if still in this role"
          :rules="[
            (val) =>
              !val || val > formData.service_start_date || 'End date must be after start date',
          ]"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="formData.organization_prestige"
          type="textarea"
          label="Organization's Prestige *"
          outlined
          rows="4"
          :rules="[(val) => !!val || 'Organization prestige is required']"
          hint="Describe the organization's standing in your field"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="formData.role_summary"
          type="textarea"
          label="Role Summary *"
          outlined
          rows="4"
          :rules="[(val) => !!val || 'Role summary is required']"
          hint="Provide detailed information about your responsibilities and achievements"
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
  name: 'LeadershipRoleForm',

  props: {
    item: {
      type: Object,
      default: null,
    },
  },

  emits: ['save', 'cancel'],

  setup(props, { emit }) {
    const formData = ref({
      role_position: '',
      organization_name: '',
      service_start_date: '',
      service_end_date: null,
      organization_prestige: '',
      role_summary: '',
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
