<template>
  <q-page class="q-pa-md">
    <!-- Header Section -->
    <!-- <div class="text-h5 q-mb-lg">NIW Case Preparation Steps</div> -->

    <!-- Color Legend -->
    <div class="text-caption q-mb-md">
      <div class="text-green">*Tasks you need to complete are highlighted in GREEN.</div>
      <div class="text-red">*Actions your Case Manager will take are highlighted in RED.</div>
    </div>

    <!-- Steps Container -->
    <div class="steps-container q-gutter-y-lg">
      <!-- Step 1 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-md">Step 1</div>

          <div class="q-mb-sm">
            Please complete <span class="text-green">the Form I-140 Questionnaire.</span>
          </div>

          <div class="text-green q-mb-sm">
            Notify your Case Manager via message as soon as you have completed the Form I-140
            Questionnaire.
          </div>

          <div class="text-red q-mb-sm">
            We review your Form I-140 Questionnaire and provide feedback.
          </div>

          <div class="">
            Once we have reviewed and confirmed your information in the
            <span class="text-green">Form I-140 Questionnaire</span>,
            <span class="text-red">we will generate the Form I-140 for you to sign.</span>
          </div>

          <div class="row justify-end q-mt-md">
            <q-btn color="green" label="Complete Questionnaire" @click="goToQuestionnaire" />
          </div>
        </q-card-section>
      </q-card>

      <!-- Step 2 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-md">Step 2</div>

          <div class="text-green q-mb-md">
            Next, complete the following sections sequentially:
            <ul>
              <li>Education & Professional Experience</li>
              <li>Research Summary</li>
              <li>Proposed Endeavor</li>
              <li>Research Summary</li>
              <li>Publication and Editorial Record</li>
              <li>Evidence of Extraordinary Ability</li>
            </ul>
          </div>

          <div class="text-red">
            We will review these sections and draft a letter of your proposed endeavor and plans for
            future research.
          </div>
        </q-card-section>
      </q-card>

      <!-- Step 3 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-md">Step 3 (Optional depending on case evaluation)</div>

          <div class="q-mb-md text-green">Please provide your list of recommenders.</div>

          <div class="text-red q-mb-md">
            <span class="text-red"
              >We will review your list of recommenders and provide feedback.</span
            >
            <br />
            After your list of recommenders is complete,
            <span class="text-red"
              >we will draft recommendation letter templates based on your profile and proposed
              endeavor and send them to you for review.</span
            >
          </div>

          <div class="q-mb-md">
            After the templates are finalized, please send
            <span class="text-green">them to your recommenders and ask them to:</span>
            <ol>
              <li>Edit the templates as they see fit</li>
              <li>Print the letter on their institutional letterhead</li>
              <li>Sign the letter</li>
              <li>Scan the signed letter</li>
              <li>Send the scanned copy back to you</li>
            </ol>
            Please upload all recommendation letters to your Documents tab.
          </div>
        </q-card-section>
      </q-card>

      <!-- Step 4 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-md">Step 4</div>

          <div class="text-green q-mb-md">
            Whilst waiting for the recommendation letters, please complete the
            <span class="text-green">Personal Statement section.</span>
          </div>

          <div class="text-red">We will review your Personal Statement and provide feedback.</div>

          <div class="row justify-end q-mt-md">
            <q-btn
              color="green"
              label="Complete Personal Statement"
              @click="goToPersonalStatement"
            />
          </div>
        </q-card-section>
      </q-card>

      <!-- Step 5 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-md">Step 5 (Only for clients with foreign degrees)</div>

          <div class="">
            If you hold a foreign degree, a degree evaluation is required to confirm its equivalency
            to a U.S. advanced degree.
            <span class="text-green"
              >We recommend that you use Trustforte for your credential evaluation.</span
            >
            <a href="http://www.trustforte.com" target="_blank">www.trustforte.com</a>
          </div>

          <div class="text-body2 q-mt-sm">
            A general equivalency evaluation is usually sufficient; a course-by-course evaluation is
            not required.
          </div>
        </q-card-section>
      </q-card>

      <!-- Step 6 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-md">Step 6</div>

          <div class="">
            Please upload
            <span class="text-green">all the supporting documents to your Document tab.</span>
          </div>

          <div class="text-red">We start to assemble your evidence package online.</div>

          <div class="row justify-end q-mt-md">
            <q-btn color="green" label="Upload Documents" @click="goToDocuments" />
          </div>
        </q-card-section>
      </q-card>

      <!-- Step 7 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-md">Step 7</div>

          <div class="text-red">
            We review all your documents and evidence and provide feedback if anything is missing or
            needs to be revised.
          </div>
        </q-card-section>
      </q-card>

      <!-- Step 8 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-md">Step 8</div>

          <div class="text-red q-mb-md">We will draft and assemble your petition package.</div>

          <div class="q-mb-md">
            Your Case Manager will draft the petition, compile evidence and ensure that all
            materials meet USCIS standards.
          </div>

          <div class="text-body2">
            During the petition drafting process, we may request additional documents to strengthen
            your package. If so, we will notify you. Please upload the required documents promptly
            so we can continue assembling your package.
          </div>
        </q-card-section>
      </q-card>

      <!-- Step 9 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-md">Step 9</div>

          <div class="text-red q-mb-md">
            We will send your petition package for legal review and recommendation and we will
            incorporate all recommendations and remaining concerns into your final draft.
          </div>

          <div class="text-body2">
            Discuss any changes with us promptly, as no further changes can be made after
            finalization and shipping.
          </div>
        </q-card-section>
      </q-card>

      <!-- Step 10 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 q-mb-md">Step 10</div>

          <div class="text-red q-mb-md">
            Once the application passes the legal review, our team prints, assembles, and packages
            your documents for mailing to USCIS.
          </div>

          <div class="text-body2">
            You will receive your receipt notice from USCIS within 30 days.
          </div>
          <br />

          <div class="q-mb-md">You can see the status of your case on the "Case Status" tab.</div>

          <div class="row justify-end q-mt-md">
            <q-btn color="primary" label="View Case Status" @click="goToCaseStatus" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useRouter } from 'vue-router'
import { useLayoutStore } from 'stores/layout'

export default {
  name: 'CasePreparation',

  setup() {
    const router = useRouter()
    const layoutStore = useLayoutStore()

    const goToQuestionnaire = () => {
      router.push('/client/form-questionnaire')
    }

    const goToPersonalStatement = () => {
      router.push('/client/personal-statement')
    }

    const goToDocuments = () => {
      router.push('/client/documents')
    }

    const goToCaseStatus = () => {
      layoutStore.toggleRightDrawer()
    }

    return {
      goToQuestionnaire,
      goToPersonalStatement,
      goToDocuments,
      goToCaseStatus,
    }
  },
}
</script>

<style scoped>
.text-green {
  color: #4caf50 !important;
}

.text-red {
  color: #f44336 !important;
}

.steps-container {
  max-width: 1200px;
  margin: 0 auto;
}

ul,
ol {
  padding-left: 20px;
  margin: 8px 0;
}

li {
  margin-bottom: 8px;
  line-height: 1.5;
}

li:last-child {
  margin-bottom: 0;
}
</style>
