<template>
  <div class="background-information-form">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <!-- Basic Information -->
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <q-input
            v-model="formData.main_academic_field"
            label="Main Academic Field"
            outlined
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="formData.specialization"
            label="Specialization"
            outlined
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="formData.unique_skillset"
            label="Unique Skillset"
            type="textarea"
            outlined
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>
      </div>

      <!-- NIW Filing -->
      <div class="row q-mb-md">
        <div class="col-12">
          <q-select
            v-model="formData.filing_niw"
            :options="['yes', 'no']"
            label="Filing NIW?"
            outlined
          />
        </div>
      </div>

      <!-- Critical Discussions -->
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-input
            v-model="formData.critical_discussion_1"
            label="Critical Discussion 1"
            type="textarea"
            outlined
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="formData.critical_discussion_2"
            label="Critical Discussion 2"
            type="textarea"
            outlined
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="formData.critical_discussion_3"
            label="Critical Discussion 3"
            type="textarea"
            outlined
          />
        </div>
      </div>

      <!-- Key Issues -->
      <div v-for="n in 3" :key="`key-issue-${n}`" class="q-mb-lg">
        <div class="text-subtitle1 q-mb-sm">Key Issue {{ n }}</div>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input v-model="formData[`key_issue_${n}`]" :label="`Key Issue ${n}`" outlined />
          </div>
          <template v-if="n > 1">
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData[`key_issue_${n}_discussion_field_1`]"
                :label="`Discussion Field 1`"
                type="textarea"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                v-model="formData[`key_issue_${n}_discussion_field_2`]"
                :label="`Discussion Field 2`"
                type="textarea"
                outlined
              />
            </div>
          </template>
        </div>
      </div>

      <!-- US Benefits -->
      <div v-for="n in 3" :key="`benefit-${n}`" class="q-mb-lg">
        <div class="text-subtitle1 q-mb-sm">US Benefit {{ n }}</div>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input v-model="formData[`benefit_us_issue_${n}`]" :label="`Benefit ${n}`" outlined />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="formData[`benefit_us_issue_${n}_discussion_field_1`]"
              :label="`Discussion Field 1`"
              type="textarea"
              outlined
            />
          </div>
          <div class="col-12 col-md-6">
            <q-input
              v-model="formData[`benefit_us_issue_${n}_discussion_field_2`]"
              :label="`Discussion Field 2`"
              type="textarea"
              outlined
            />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="row justify-end">
        <q-btn type="submit" color="green" label="Save" :loading="store.isLoading" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useBackgroundInformationStore } from 'src/stores/backgroundInformation'

export default {
  name: 'BackgroundInformationForm',

  setup() {
    const $q = useQuasar()
    const store = useBackgroundInformationStore()

    const formData = ref({
      main_academic_field: '',
      specialization: '',
      unique_skillset: '',
      filing_niw: 'no',
      critical_discussion_1: '',
      critical_discussion_2: '',
      critical_discussion_3: '',
      key_issue_1: '',
      key_issue_2: '',
      key_issue_2_discussion_field_1: '',
      key_issue_2_discussion_field_2: '',
      key_issue_3: '',
      key_issue_3_discussion_field_1: '',
      key_issue_3_discussion_field_2: '',
      benefit_us_issue_1: '',
      benefit_us_issue_1_discussion_field_1: '',
      benefit_us_issue_1_discussion_field_2: '',
      benefit_us_issue_2: '',
      benefit_us_issue_2_discussion_field_1: '',
      benefit_us_issue_2_discussion_field_2: '',
      benefit_us_issue_3: '',
      benefit_us_issue_3_discussion_field_1: '',
      benefit_us_issue_3_discussion_field_2: '',
    })

    const onSubmit = async () => {
      try {
        await store.saveBackgroundInformation(formData.value)
        $q.notify({
          type: 'positive',
          message: 'Background information saved successfully',
        })
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: store.errorMessage || 'Failed to save background information',
        })
      }
    }

    onMounted(async () => {
      try {
        const data = await store.fetchBackgroundInformation()
        if (data) {
          formData.value = { ...formData.value, ...data }
        }
      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: store.errorMessage || 'Failed to load background information',
        })
      }
    })

    return {
      store,
      formData,
      onSubmit,
    }
  },
}
</script>
