<template>
  <div class="proposed-employment-section">
    <div class="text-h6 q-mb-md">Proposed Employment/Proposed Endeavor</div>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Proposed Position</q-item-label>
                  <q-item-label>{{ employmentDetails?.proposed_position }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label caption>Employer Name</q-item-label>
                  <q-item-label>{{ employmentDetails?.employer_name }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label caption>Employer Address</q-item-label>
                  <q-item-label>{{ employmentDetails?.employer_address }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label caption>Job Description</q-item-label>
                  <q-item-label>{{ employmentDetails?.job_description }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label caption>Annual Salary</q-item-label>
                  <q-item-label>${{ employmentDetails?.annual_salary }}</q-item-label>
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
  name: 'ProposedEmploymentSection',
  props: {
    employmentDetails: {
      type: Object,
      required: true
    }
  }
}
</script> 
