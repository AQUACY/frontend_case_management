<template>
  <q-page class="q-pa-md">
    <!-- Case Categories Header -->
    <div class="q-mb-lg">
      <q-tabs
        v-model="tab"
        class="text-primary"
        active-color="primary"
        indicator-color="primary"
        align="left"
      >
        <q-tab name="niw" label="NIW" />
        <q-tab name="eb1a" label="EB1A" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="niw">
          <!-- Note Section -->
          <div class="text-caption q-mb-md">
            <div class="text-blue">*Actions required on your end are marked in BLUE.</div>
            <div class="text-green">*Actions that our firm will take are marked in GREEN.</div>
          </div>

          <!-- Steps Section -->
          <div class="steps-container q-gutter-y-lg">
            <!-- Step 1 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 1</div>

                <div class="text-body1">
                  Please provide your CV, Google Scholar profile, Summary of Contributions, and List
                  of Recommenders
                </div>

                <div class="q-mt-sm">
                  Please refer to Appendix A and Appendix B in the
                  <a href="#" class="text-primary">Client Packet</a>.
                </div>

                <div class="q-mt-sm">
                  Please also complete your
                  <a href="#" class="text-primary">Client Record</a>
                  tab.
                </div>

                <div class="row justify-end q-mt-md">
                  <q-btn color="primary" label="Do It Now" @click="handleDoItNow(1)" />
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 2 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 2</div>

                <div class="text-green q-mb-md">
                  We review your Summary of Contributions and List of Recommenders, and provide
                  feedback.
                </div>

                <div class="q-mb-md">
                  After your Summary of Contributions is finalized,
                  <span class="text-green">
                    we draft your employment letter, or a statement confirming your proposed
                    endeavor and plans for future research and employment in the field.
                  </span>
                </div>

                <div class="q-mb-md">
                  After your List of Recommenders is finalized,
                  <span class="text-blue">
                    please contact the recommenders to confirm whether they are willing to sign a
                    letter to support your petition.
                  </span>
                </div>

                <div class="text-body2 q-mt-md">
                  As a reminder, degree evidence is required for NIW filing based on advanced
                  degree.
                  <span class="text-blue">
                    Please ensure that your degree-related documents such as diploma, transcript and
                    degree evaluation (if the degree is obtained outside of U.S.) have been uploaded
                    to your account.
                  </span>
                  We will not need your degree documents to begin drafting documents. However, since
                  some of these documents could take time to obtain, we recommend that you get them
                  prepared sooner rather than later.
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 3 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 3</div>

                <div class="text-green q-mb-md">
                  We upload the draft of your employment letter / statement of proposed endeavor.
                </div>

                <div class="text-blue q-mb-md">
                  Please review and give us your feedback using
                  <span class="text-weight-medium">track changes</span>.
                </div>

                <div class="text-green">
                  We review your changes to the letter and upload a revised version within a few
                  days.
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 4 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="row items-center justify-between">
                  <div class="text-h6">Step 4</div>
                  <q-btn color="primary" label="Do It Now" @click="handleDoItNow(4)" />
                </div>

                <div class="text-blue q-mt-md">
                  Please upload your signed employment letter / statement of proposed endeavor.
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 5 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 5</div>

                <div class="text-green q-mb-md">
                  We draft your recommendation letters along with your petition letter.
                </div>

                <div class="text-body2">Check the countdown timer on your account page.</div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 6 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 6</div>

                <div class="text-green q-mb-md">
                  We upload the first draft of your recommendation letters and petition letter.
                </div>

                <div class="text-body1 q-mb-md">
                  <span class="text-blue">
                    For petition letter, please review for factual accuracy and correct technical
                    discussion using
                    <span class="text-weight-medium">track changes</span>.
                  </span>
                  Also make sure that all your work and achievements have been discussed
                  comprehensively. We highly prefer to keep the structure of the petition letter
                  intact as it is part of our proven format that has led to our high approval rate.
                  Also, do not alter any of the legal discussion.
                </div>

                <div class="text-body1">
                  <span class="text-blue">
                    For recommendation letters, please review and give us your feedback using
                    <span class="text-weight-medium">track changes</span>.
                  </span>
                  If you don't have major changes, go ahead and get the recommendation letters
                  signed! You may refer to our email sample in Appendix C in
                  <a href="#" class="text-primary">Client Packet</a>
                  ("Email to send to a recommender along with the draft of the letter").
                </div>
              </q-card-section>
            </q-card>

            <!-- Step 7 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="row items-center justify-between">
                  <div class="text-h6">Step 7</div>
                  <q-btn color="primary" label="Do It Now" @click="handleDoItNow(7)" />
                </div>

                <div class="q-mt-md">
                  When you are waiting for the recommenders to return the signed letters,
                  <span class="text-blue">
                    please fill out the
                    <a href="#" class="text-primary">Questionnaire tab</a>
                    and the
                    <a href="#" class="text-primary">ETA-750B tab</a>, and upload the required
                    identity documents to the "Identity Documents and Forms" section under the
                    Documents tab.
                  </span>
                </div>

                <div class="q-mt-sm">
                  Once you have completed the Questionnaire and Form ETA-750B, please ensure to
                  leave us a message.
                </div>

                <div class="q-mt-sm">
                  Once we have reviewed and confirmed your information in the Questionnaire and
                  ETA-750B tabs,
                  <span class="text-green">
                    we will generate the Form G-28, Form I-140 and Form ETA-750B for you to sign.
                  </span>
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 8 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="row items-center justify-between">
                  <div class="text-h6">Step 8</div>
                  <q-btn color="primary" label="Do It Now" @click="handleDoItNow(8)" />
                </div>

                <div class="text-blue q-mt-md">
                  Please upload all the signed recommendation letters.
                </div>

                <div class="q-mt-md">
                  Checklist:
                  <ul class="q-mt-sm">
                    <li>
                      Are they on letterhead? It would be best if they are, but if not, it is still
                      acceptable.
                    </li>
                    <li>
                      Original signature by recommender? Note that original signature is not
                      required; you can provide a soft copy of the signed recommendation letter.
                    </li>
                    <li>
                      Hand-signed signature by recommender? We prefer if the letter is hand-signed,
                      but if it has an electronic signature, it is still acceptable.
                    </li>
                    <li>
                      ALL recommendation letters uploaded to your account? We would need all of the
                      recommendation letters uploaded and reviewed before we can start drafting your
                      petition letter to ensure that we make accurate quotations in the petition
                      letter.
                    </li>
                  </ul>
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 9 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 9</div>

                <div class="text-green q-mb-md">
                  We upload your finalized Petition Letter after you confirm there is no further
                  changes you want to make.
                </div>

                <div class="text-blue q-mb-md">
                  Please begin gathering the supporting materials according to the exhibit index and
                  upload your supporting documents.
                </div>

                <div>
                  Please refer to "Document List" in Appendix C in the
                  <a href="#" class="text-primary">Client Packet</a>.
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 10 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 10</div>

                <div class="text-green q-mb-md">
                  After you upload all the supporting documents, we start to assemble your evidence
                  package online.
                </div>

                <div class="text-body1">
                  It is possible that we need further evidence/documents from you while we assemble
                  your package. If that is the case, we will send a message to let you know. Please
                  then upload the required documents as soon as possible so that we can continue
                  working on your package assembly. Once we confirm that all of your evidence is
                  sufficient and consistent with the petition letter, we will directly print out
                  your petition package for mailing. Please be sure to discuss any changes and
                  revisions with us timely as we will not be able to make further changes to your
                  package after it has been finalized on our end and placed out for shipping.
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 11 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 11</div>

                <div class="text-green q-mb-md">
                  We file your case! You will receive your receipt notice from USCIS within 7-30
                  days.
                </div>

                <div>
                  To check current USCIS processing time, please see here:
                  <a
                    href="https://egov.uscis.gov/processing-times/"
                    target="_blank"
                    class="text-primary"
                  >
                    https://egov.uscis.gov/processing-times/
                  </a>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-tab-panel>

        <q-tab-panel name="eb1a">
          <!-- Note Section -->
          <div class="text-caption q-mb-md">
            <div class="text-blue">*Actions required on your end are marked in BLUE.</div>
            <div class="text-green">*Actions that our firm will take are marked in GREEN.</div>
          </div>

          <!-- Steps Section -->
          <div class="steps-container q-gutter-y-lg">
            <!-- Step 1 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 1</div>

                <div class="text-body1">
                  Please provide your CV, Google Scholar profile, Summary of Contributions, and List
                  of Recommenders
                </div>

                <div class="q-mt-sm">
                  Please refer to Appendix A and Appendix B in the
                  <a href="#" class="text-primary">Client Packet</a>.
                </div>

                <div class="q-mt-sm">
                  Please also complete your
                  <a href="#" class="text-primary">Client Record</a>
                  tab.
                </div>

                <div class="row justify-end q-mt-md">
                  <q-btn color="primary" label="Do It Now" @click="handleDoItNow(1)" />
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 2 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 2</div>

                <div class="text-green q-mb-md">
                  We review your Summary of Contributions and List of Recommenders, and provide
                  feedback.
                </div>

                <div class="q-mb-md">
                  After your Summary of Contributions is finalized,
                  <span class="text-green">
                    we draft your employment letter, or a statement confirming your proposed
                    endeavor and plans for future research and employment in the field.
                  </span>
                </div>

                <div class="text-blue">
                  Please review and provide feedback on the draft employment letter.
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 3 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 3</div>

                <div class="text-green">
                  We draft recommendation letter templates based on your Summary of Contributions
                  and send them to you for review.
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 4 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 4</div>

                <div class="text-blue q-mb-md">
                  Please review the recommendation letter templates and provide feedback.
                </div>

                <div class="text-blue q-mb-md">
                  After the templates are finalized, please send them to your recommenders and ask
                  them to:
                </div>

                <div class="q-mb-md">
                  1. Edit the templates as they see fit
                  <br />
                  2. Print the letter on their institutional letterhead
                  <br />
                  3. Sign the letter
                  <br />
                  4. Scan the signed letter
                  <br />
                  5. Send the scanned copy back to you
                </div>

                <div class="text-blue">
                  Please upload all recommendation letters to your Documents tab.
                </div>

                <div class="row justify-end q-mt-md">
                  <q-btn color="primary" label="Do It Now" @click="handleDoItNow(4)" />
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 5 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 5</div>

                <div class="text-green">
                  We draft your petition letter and send it to you for review.
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 6 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 6</div>

                <div class="text-blue">Please review the petition letter and provide feedback.</div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 7 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 7</div>

                <div class="text-blue q-mb-md">
                  Please complete the I-140 questionnaire in your Questionnaire tab.
                </div>

                <div class="row justify-end q-mt-md">
                  <q-btn color="primary" label="Do It Now" @click="handleDoItNow(7)" />
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 8 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 8</div>

                <div class="text-blue q-mb-md">
                  Please upload all supporting evidence to your Documents tab.
                </div>

                <div class="q-mb-md">
                  Please refer to Appendix C in the
                  <a href="#" class="text-primary">Client Packet</a>
                  for the list of required documents.
                </div>

                <div class="row justify-end q-mt-md">
                  <q-btn color="primary" label="Do It Now" @click="handleDoItNow(8)" />
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 9 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 9</div>

                <div class="text-green">
                  We review all your documents and evidence, and provide feedback if anything is
                  missing or needs to be revised.
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 10 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 10</div>

                <div class="text-green">We assemble your petition package.</div>

                <div class="q-mt-sm">
                  Please note that during our final review, we may find that additional documents
                  are needed to strengthen your package. If that is the case, we will send a message
                  to let you know. Please then upload the required documents as soon as possible so
                  that we can continue working on your package assembly. Once we confirm that all of
                  your evidence is sufficient and consistent with the petition letter, we will
                  directly print out your petition package for mailing. Please be sure to discuss
                  any changes and revisions with us timely as we will not be able to make further
                  changes to your package after it has been finalized on our end and placed out for
                  shipping.
                </div>
              </q-card-section>
            </q-card>

            <!-- Down Arrow -->
            <div class="text-center">
              <q-icon name="arrow_downward" size="md" color="grey" />
            </div>

            <!-- Step 11 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">Step 11</div>

                <div class="text-green q-mb-md">
                  We file your case! You will receive your receipt notice from USCIS within 7-30
                  days.
                </div>

                <div>
                  To check current USCIS processing time, please see here:
                  <a
                    href="https://egov.uscis.gov/processing-times/"
                    target="_blank"
                    class="text-primary"
                  >
                    https://egov.uscis.gov/processing-times/
                  </a>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <!-- Footer -->
    <div class="text-caption q-pa-md text-grey">
      WeGreened.com - NAmiLG, All Rights Reserved
      <br />
      By using this case management platform, you are understanding and accepting the following
      <a href="#" class="text-primary">privacy policy</a>. All the documents and case system are
      protected by 18 U.S. Code § 1832.
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { useQuasar } from 'quasar'

export default {
  name: 'CasePreparation',

  setup() {
    const router = useRouter()
    // const $q = useQuasar()

    const handleDoItNow = (step) => {
      switch (step) {
        case 1:
          router.push('/client/documents')
          break
        case 4:
          router.push('/client/documents')
          break
        case 7:
          router.push('/client/questionnaire')
          break
        case 8:
          router.push('/client/documents')
          break
        default:
          break
      }
    }

    return {
      handleDoItNow,
      tab: ref('niw'),
    }
  },
}
</script>

<style scoped>
.text-blue {
  color: #2196f3 !important;
}

.text-green {
  color: #4caf50 !important;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.steps-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Add emphasis to track changes text */
.text-weight-medium {
  font-weight: 500;
}

ul {
  padding-left: 20px;
  margin: 0;
}

li {
  margin-bottom: 8px;
  line-height: 1.5;
}

li:last-child {
  margin-bottom: 0;
}

.text-caption a {
  text-decoration: none;
}

.text-caption a:hover {
  text-decoration: underline;
}
</style>
