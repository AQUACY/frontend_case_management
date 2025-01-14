<template>
  <q-page class="q-pa-lg">
    <q-card>
      <q-card-section>
        <q-card-section>
          <span class="text-red">Required Fields</span> <br />
          <ul>
            <li>
              Please make sure you update your client record promptly to provide the most up to date
              information. <br />
            </li>
            <li>
              If you extend, renew, or change your nonimmigrant visa status, please update your
              Client Record and let us know. <br />
            </li>
            <li>
              If you intend to leave the US and return after signing this agreement, but before
              filing the I-140 or I-485, please let us know.
            </li>
          </ul>
          <p class="text-green text-bold" style="margin-left: 20px">
            1. * a. Which type of petition(s) are you retaining us to file for you at this time?
            Please check all that apply:
          </p>

          <ul style="text-decoration: none; margin-left: 20px">
            <li class="q-mt-sm">
              <q-checkbox
                v-model="option1"
                label="I-140 filed under the category of EB-1A (Alien of Extraordinary Ability)"
                color="blue"
              />
            </li>
            <li style="margin-top: -10px">
              <q-checkbox
                v-model="option2"
                label="I-140 filed under the category of EB-1B/OR (Outstanding Researchers and Professors)"
                color="blue"
              />
            </li>
            <li style="margin-top: -10px">
              <q-checkbox
                v-model="option3"
                label="I-140 filed under the category of EB-2 NIW (National Interest Waiver)"
                color="blue"
              />
            </li>
            <li style="margin-top: -10px">
              <q-checkbox
                v-model="option4"
                label="I-129 filed under the category of O-1A"
                color="blue"
              />
            </li>
            <li style="margin-top: -10px">
              <q-checkbox
                v-model="option5"
                label="I-129 filed under the category of O-1B"
                color="blue"
              />
            </li>
            <li style="margin-top: -10px">
              <q-checkbox
                v-model="option6"
                label="I-140 filed under the category of EB-1A (Alien of Extraordinary Ability)"
                color="blue"
              />
            </li>
            <li style="margin-top: -10px">
              <q-checkbox
                v-model="option7"
                label="I-140 filed under the category of EB-1A (Alien of Extraordinary Ability)"
                color="blue"
              />
            </li>
            <li style="margin-top: -10px">
              <q-checkbox v-model="option8" label="Other" color="blue" /> <input />
            </li>
          </ul>

          <ul style="margin-left: 40px">
            <li>
              <div class="row">
                <div class="col-6">Which category should be submitted first?</div>
                <div class="col-6" style="width: 30%">
                  <q-select dense v-model="model" :options="options" />
                </div>
              </div>
            </li>
            <li style="margin-top: -10px">
              <div class="row">
                <div class="col-6">Plan for filing the I-140 EB-1A:</div>
                <div class="col-6" style="width: 30%">
                  <q-select dense v-model="model" :options="options" />
                </div>
              </div>
            </li>
            <li style="margin-top: -10px">
              <div class="row">
                <div class="col-6">I-485 filing plan for I-140 EB-1A:</div>
                <div class="col-6" style="width: 30%">
                  <q-select dense v-model="model" :options="options" />
                </div>
              </div>
            </li>
            <li style="margin-top: -10px">
              <div class="row">
                <div class="col-6">Plan for filing the I-140 EB-2 NIW:</div>
                <div class="col-6" style="width: 30%">
                  <q-select dense v-model="model" :options="options" />
                </div>
              </div>
            </li>
            <li style="margin-top: -10px">
              <div class="row">
                <div class="col-6">I-485 filing plan for I-140 EB-2 NIW:</div>
                <div class="col-6" style="width: 30%">
                  <q-select dense v-model="model" :options="options" />
                </div>
              </div>
            </li>
          </ul>
        </q-card-section>
        <q-card-section>
          <p class="q-pa-lg" style="margin-top: -20px">
            For I-140 clients, please note that requesting Premium Processing Service can only
            shorten the processing time of your I-140 petition. It does not affect your priority
            date. Your priority date should be approximately the date USCIS receives your I-140
            petition. Your priority date is NOT the date USCIS approves your petition. Having the
            I-140 approval through Premium Processing Service will not expedite the wait time for
            your priority date to become current. You will still need to wait for your priority date
            to become current in order to proceed with the second step of green card application.
          </p>

          <ul>
            <li style="margin-top: -10px">
              <div class="row">
                <div class="col-6 q-pa-md">
                  b. Besides the I-140(s) you are retaining us for, have you previously filed any
                  immigrant visa petition (e.g. I-140, I-130, and I-485)?
                </div>
                <div class="col-6" style="width: 30%">
                  <div class="q-gutter-sm q-pa-md">
                    <q-radio v-model="choice" val="yes" label="Yes" />
                    <q-radio v-model="choice" val="no" label="No" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul style="margin-left: 20px">
            <li>
              For your I-485 filing plan (if applicable), please refer to the “Green Card
              Application Process Overview and Timeline” under the Visa FAQ tab for additional
              information.
            </li>
            <li class="text-bold">
              There is a risk with filing the I-485 prior to getting I-140 approval. If your I-140
              is denied, your I-485 will also be denied, and you would lose your filing fee(s).
            </li>
            <li>
              If you plan to file File the I-140 and I-485(s) simultaneously:<br />
              Please note that it usually takes our clients at least 4 weeks to prepare the I-485
              for filing. Therefore, to avoid any delays with the filing of your I-140, please be
              sure to retain us for your I-485 as soon as possible. Please send us a message when
              you are ready to retain us for your I-485. If for some reason you are unable to
              prepare your I-485 so that it is ready to file with your I-140, please be aware that
              you can file your I-485 while your I-140 is pending after you receive your I-140
              receipt notice. It usually takes 1-2 weeks to receive the I-140 receipt notice,
              however, it can take up to 30 days.
            </li>
            <li></li>
            <li></li>
          </ul>
        </q-card-section>
        <q-card-section>
          <p class="text-green text-bold" style="margin-left: 20px">
            2. <span style="color: red">*</span> Plan for filing the I-485 or immigrant visa
            processing, please check one: <br />
            <u style="color: black">
              Note whether you are allowed to file I-485 or immigrant visa processing is first
              determined by visa bulletin. Click here to see if you are eligible for filing I-485 or
              immigrant visa processing
            </u>
          </p>
          <p style="margin-left: 20px">
            Please note you must be in the U.S. when you file the I-485, and you should intend to
            remain in the U.S., although you may be able to travel for brief periods of time while
            the I-485 is pending. Otherwise you will have to undergo immigrant visa processing. You
            can find more information about the differences between the I-485 and immigrant visa
            processing in the “Adjustment of Status I-485 v. Immigrant Visa Processing.pdf” document
            under the Visa FAQ tab.
          </p>
          <ul style="margin-left: 20px">
            <li>
              <q-radio
                v-model="choice"
                val="yes"
                label="I plan to use the free I-485 Do-It-Yourself Packet"
              />
            </li>
            <li>
              <q-radio
                v-model="choice"
                val="yes"
                label="I plan to retain your firm for the I-485 (please click here for our I-485 attorney fee)"
              />
            </li>
            <li>
              <q-radio v-model="choice" val="yes" label="I have already filed the I-485 on:" />
              <input class="q-ml-sm" />
            </li>
            <li>
              <q-radio
                v-model="choice"
                val="yes"
                label="I have used the EAD/AP based on I-485 to work or travel on
"
              />
              <input class="q-ml-sm" />
            </li>
            <li>
              <q-radio
                v-model="choice"
                val="yes"
                label="I plan to do immigrant visa processing in"
              />
              <input class="q-ml-sm" /> (for clients who will be applying for permanent resident
              status from outside the U.S.; please click here for our IV processing attorney fee)
            </li>
          </ul>
        </q-card-section>
        <q-card-section> </q-card-section>

        <q-card-section class="q-pt-xs">
          <div class="row items-center justify-between">
            <div class="col">
              <div class="text-h5 text-caption">title</div>
            </div>
            <div class="col-auto">
              <div class="text-overline text-right">time and date</div>
            </div>
          </div>
          <div class="text-caption text-grey">--Announcement--</div>
          content
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useCaseStore } from 'stores/clientrecords'

export default {
  setup() {
    const option1 = ref(false)
    const option2 = ref(false)
    const option3 = ref(false)
    const option4 = ref(false)
    const option5 = ref(false)
    const option6 = ref(false)
    const option7 = ref(false)
    const option8 = ref(false)

    const petitionMapping = {
      'I-140 EB-1A': option1,
      'I-140 EB-1B/OR': option2,
      'I-140 EB-2 NIW': option3,
      'I-129 O-1A': option4,
    }

    const model = ref(null)
    const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
    const choice = ref(null)
    const caseStore = useCaseStore()
    const petitionTypes = ref([])

    onMounted(async () => {
      try {
        await caseStore.fetchClientRecords()
        let petitionTypes = caseStore.crecords.petition_types

        // Check if petitionTypes is a string and parse it
        if (typeof petitionTypes === 'string') {
          petitionTypes = JSON.parse(petitionTypes)
        }

        // Check if petitionTypes is now an array
        if (Array.isArray(petitionTypes)) {
          petitionTypes.forEach((type) => {
            if (petitionMapping[type]) {
              petitionMapping[type].value = true
            }
          })
        } else {
          console.error('petitionTypes is not an array:', petitionTypes)
        }
      } catch (error) {
        console.error('Error fetching petition types:', error)
      }
    })
    return {
      option1,
      option2,
      option3,
      option4,
      option5,
      option6,
      option7,
      option8,
      model,
      options,
      choice,
      caseStore,
      petitionTypes,
    }
  },
}
</script>
