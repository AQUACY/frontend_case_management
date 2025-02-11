<template>
  <q-form @submit.prevent="handleSubmit">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-input
          v-model="formData.membership_level"
          label="Membership Level *"
          outlined
          :rules="[val => !!val || 'Membership level is required']"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="formData.membership_requirements"
          type="textarea"
          label="Membership Requirements *"
          outlined
          :rules="[val => !!val || 'Membership requirements are required']"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="formData.fee_and_subscription_details"
          type="textarea"
          label="Fee and Subscription Details *"
          outlined
          :rules="[val => !!val || 'Fee and subscription details are required']"
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
  name: 'MembershipForm',

  props: {
    item: {
      type: Object,
      default: null
    }
  },

  emits: ['save', 'cancel'],

  setup(props, { emit }) {
    const formData = ref({
      membership_level: '',
      membership_requirements: '',
      fee_and_subscription_details: ''
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
