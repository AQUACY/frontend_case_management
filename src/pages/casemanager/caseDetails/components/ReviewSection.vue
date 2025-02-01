<template>
  <div class="review-section q-mb-md">
    <div class="row items-center justify-end q-gutter-md">
      <q-select
        v-model="localDecision"
        :options="reviewOptions"
        label="Review Decision"
        outlined
        dense
        color="green"
        style="min-width: 200px"
        emit-value
        map-options
      />

      <!-- Comment field appears when pending is selected -->
      <q-input
        v-if="localDecision === 'pending'"
        v-model="comment"
        label="Review Comment"
        outlined
        dense
        :rules="[(val) => !!val || 'Comment is required for pending status']"
        style="min-width: 300px"
      />

      <q-btn
        :loading="submitting"
        :disable="!isValid"
        color="green"
        label="Submit Review"
        @click="submitReview"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'

export default {
  name: 'ReviewSection',

  props: {
    currentStatus: {
      type: String,
      default: 'review',
    },
    submitting: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['submit-review'],

  setup(props, { emit }) {
    const localDecision = ref(null)
    const comment = ref('')

    const reviewOptions = [
      { label: 'Approve', value: 'approved' },
      { label: 'Set as Pending', value: 'pending' },
      { label: 'Under Review', value: 'review' },
    ]

    const isValid = computed(() => {
      if (!localDecision.value) return false
      if (localDecision.value === 'pending' && !comment.value.trim()) return false
      return true
    })

    const submitReview = () => {
      if (!isValid.value) return

      const reviewData = {
        response: localDecision.value,
        comment: localDecision.value === 'pending' ? comment.value : null,
      }

      emit('submit-review', reviewData)
    }

    // Reset form when status changes
    watch(
      () => props.currentStatus,
      () => {
        localDecision.value = null
        comment.value = ''
      },
    )

    return {
      localDecision,
      comment,
      reviewOptions,
      isValid,
      submitReview,
    }
  },
}
</script>
