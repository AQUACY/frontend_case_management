<template>
  <div class="row q-col-gutter-md q-mb-lg">
    <div class="col-12 col-md-4">
      <q-input
        v-model.number="countModel"
        type="number"
        :label="label"
        outlined
        min="0"
        @update:model-value="updateCount"
      />
    </div>
    <div class="col-12 col-md-8">
      <q-input
        v-model="notesModel"
        type="textarea"
        label="Notes"
        outlined
        :hint="`List your ${label.toLowerCase()}`"
        @update:model-value="updateNotes"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'PublicationField',

  props: {
    count: {
      type: [Number, String],
      default: 0,
    },
    notes: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
  },

  emits: ['update:count', 'update:notes'],

  setup(props, { emit }) {
    const countModel = ref(props.count)
    const notesModel = ref(props.notes)

    watch(
      () => props.count,
      (newVal) => {
        countModel.value = newVal
      },
    )

    watch(
      () => props.notes,
      (newVal) => {
        notesModel.value = newVal
      },
    )

    const updateCount = (value) => {
      emit('update:count', value)
    }

    const updateNotes = (value) => {
      emit('update:notes', value)
    }

    return {
      countModel,
      notesModel,
      updateCount,
      updateNotes,
    }
  },
}
</script>
