<template>
  <div class="questionnaire-section q-pa-md">
    <q-card flat bordered v-if="!loading && !error">
      <q-card-section>
        <!-- Status Badge -->
        <div class="text-right q-mb-md">
          <q-badge :color="getBadgeColor(questionnaireData.status)" class="text-capitalize q-pa-sm">
            Status: {{ formatValue(questionnaireData.status) }}
          </q-badge>
        </div>

        <!-- Tabs -->
        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="petition" label="Petition" icon="description" />
          <q-tab name="personal" label="Personal" icon="person" />
          <q-tab name="contact" label="Contact" icon="contact_mail" />
          <q-tab name="current_address" label="Current Address" icon="home" />
          <q-tab name="foreign_address" label="Foreign Address" icon="location_on" />
          <q-tab name="travel" label="Travel & Visa" icon="flight" />
          <q-tab name="employment" label="Employment" icon="work" />
          <q-tab name="work_location" label="Work Location" icon="business" />
          <q-tab name="family" label="Spouse & Children Records" icon="people" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <!-- Petition Information -->
          <q-tab-panel name="petition">
            <div class="text-h6 q-mb-md">Petition Information</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.petition_type"
                  label="Petition Type"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.petition_type)">
                      {{ formatValue(questionnaireData.petition_type) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.petitioner"
                  label="Petitioner"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.petitioner)">
                      {{ formatValue(questionnaireData.petitioner) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="formatDate(questionnaireData.created_at)"
                  label="Created At"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.created_at)">
                      {{ formatDate(questionnaireData.created_at) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="formatDate(questionnaireData.updated_at)"
                  label="Last Updated"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.updated_at)">
                      {{ formatDate(questionnaireData.updated_at) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <!-- Personal Information -->
          <q-tab-panel name="personal">
            <div class="text-h6 q-mb-md">Personal Information</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.family_name"
                  label="Family Name"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.family_name)">
                      {{ formatValue(questionnaireData.family_name) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.given_name"
                  label="Given Name"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.given_name)">
                      {{ formatValue(questionnaireData.given_name) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.full_middle_name"
                  label="Middle Name"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.full_middle_name)">
                      {{ formatValue(questionnaireData.full_middle_name) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.native_alphabet"
                  label="Native Alphabet"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.native_alphabet)">
                      {{ formatValue(questionnaireData.native_alphabet) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.dob"
                  label="Date of Birth"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.dob)">
                      {{ formatDate(questionnaireData.dob) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.city_town_village_of_birth"
                  label="City/Town/Village of Birth"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.city_town_village_of_birth)">
                      {{ formatValue(questionnaireData.city_town_village_of_birth) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.state_of_birth"
                  label="State of Birth"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.state_of_birth)">
                      {{ formatValue(questionnaireData.state_of_birth) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.country_of_birth"
                  label="Country of Birth"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.country_of_birth)">
                      {{ formatValue(questionnaireData.country_of_birth) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.nationality"
                  label="Nationality"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.nationality)">
                      {{ formatValue(questionnaireData.nationality) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.alien_registration_number"
                  label="Alien Registration Number"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.alien_registration_number)">
                      {{ formatValue(questionnaireData.alien_registration_number) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.ssn"
                  label="SSN"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.ssn)">
                      {{ formatValue(questionnaireData.ssn) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <!-- Contact Information -->
          <q-tab-panel name="contact">
            <div class="text-h6 q-mb-md">Contact Information</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.mobile_telephone"
                  label="Mobile Telephone"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.mobile_telephone)">
                      {{ formatValue(questionnaireData.mobile_telephone) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.email_address"
                  label="Email Address"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.email_address)">
                      {{ formatValue(questionnaireData.email_address) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <!-- Current Address -->
          <q-tab-panel name="current_address">
            <div class="text-h6 q-mb-md">Current Address</div>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  readonly
                  :value="questionnaireData.street_number_name"
                  label="Street Number and Name"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.street_number_name)">
                      {{ formatValue(questionnaireData.street_number_name) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.type"
                  label="Type"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.type)">
                      {{ formatValue(questionnaireData.type) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.type_detail"
                  label="Type Detail"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.type_detail)">
                      {{ formatValue(questionnaireData.type_detail) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.city_town"
                  label="City/Town"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.city_town)">
                      {{ formatValue(questionnaireData.city_town) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.state"
                  label="State"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.state)">
                      {{ formatValue(questionnaireData.state) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.zip_code"
                  label="ZIP Code"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.zip_code)">
                      {{ formatValue(questionnaireData.zip_code) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.province"
                  label="Province"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.province)">
                      {{ formatValue(questionnaireData.province) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.country"
                  label="Country"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.country)">
                      {{ formatValue(questionnaireData.country) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <!-- Foreign Address -->
          <q-tab-panel name="foreign_address">
            <div class="text-h6 q-mb-md">Foreign Address</div>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input
                  readonly
                  :value="questionnaireData.foreign_street_number_name"
                  label="Street Number and Name"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.foreign_street_number_name)">
                      {{ formatValue(questionnaireData.foreign_street_number_name) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.foreign_address_type"
                  label="Address Type"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.foreign_address_type)">
                      {{ formatValue(questionnaireData.foreign_address_type) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.foreign_city_town"
                  label="City/Town"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.foreign_city_town)">
                      {{ formatValue(questionnaireData.foreign_city_town) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.foreign_state_province"
                  label="State/Province"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.foreign_state_province)">
                      {{ formatValue(questionnaireData.foreign_state_province) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.foreign_postal_code"
                  label="Postal Code"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.foreign_postal_code)">
                      {{ formatValue(questionnaireData.foreign_postal_code) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.foreign_country"
                  label="Country"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.foreign_country)">
                      {{ formatValue(questionnaireData.foreign_country) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <!-- Travel & Visa -->
          <q-tab-panel name="travel">
            <div class="text-h6 q-mb-md">Travel & Visa Information</div>

            <!-- Last Arrival Information -->
            <q-card flat bordered class="q-mb-md">
              <q-card-section>
                <div class="text-subtitle1 q-mb-md">
                  <q-icon name="flight_land" class="q-mr-sm" />
                  Last Arrival Information
                </div>
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      readonly
                      :value="questionnaireData.last_arrival_date"
                      label="Last Arrival Date"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge :color="getBadgeColor(questionnaireData.last_arrival_date)">
                          {{ formatDate(questionnaireData.last_arrival_date) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      readonly
                      :value="questionnaireData.i_94_arrival_record_number"
                      label="I-94 Arrival Record Number"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge
                          :color="getBadgeColor(questionnaireData.i_94_arrival_record_number)"
                        >
                          {{ formatValue(questionnaireData.i_94_arrival_record_number) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      readonly
                      :value="questionnaireData.expiration_date"
                      label="Expiration Date"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge :color="getBadgeColor(questionnaireData.expiration_date)">
                          {{ formatDate(questionnaireData.expiration_date) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      readonly
                      :value="questionnaireData.status_on_form_i_94"
                      label="Status on Form I-94"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge :color="getBadgeColor(questionnaireData.status_on_form_i_94)">
                          {{ formatValue(questionnaireData.status_on_form_i_94) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <!-- Travel Documents -->
            <q-card flat bordered class="q-mb-md">
              <q-card-section>
                <div class="text-subtitle1 q-mb-md">
                  <q-icon name="article" class="q-mr-sm" />
                  Travel Documents
                </div>
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      readonly
                      :value="questionnaireData.passport_number"
                      label="Passport Number"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge :color="getBadgeColor(questionnaireData.passport_number)">
                          {{ formatValue(questionnaireData.passport_number) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      readonly
                      :value="questionnaireData.travel_document_number"
                      label="Travel Document Number"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge :color="getBadgeColor(questionnaireData.travel_document_number)">
                          {{ formatValue(questionnaireData.travel_document_number) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      readonly
                      :value="questionnaireData.country_of_issuance"
                      label="Country of Issuance"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge :color="getBadgeColor(questionnaireData.country_of_issuance)">
                          {{ formatValue(questionnaireData.country_of_issuance) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      readonly
                      :value="questionnaireData.expiration_date_for_passport"
                      label="Passport Expiration Date"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge
                          :color="getBadgeColor(questionnaireData.expiration_date_for_passport)"
                        >
                          {{ formatDate(questionnaireData.expiration_date_for_passport) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <!-- Visa Processing -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle1 q-mb-md">
                  <q-icon name="verified_user" class="q-mr-sm" />
                  Visa Processing
                </div>
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input
                      readonly
                      :value="questionnaireData.alien_will_apply_for_visa_abroad"
                      label="Will Apply for Visa Abroad"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge
                          :color="getBadgeColor(questionnaireData.alien_will_apply_for_visa_abroad)"
                        >
                          {{ formatValue(questionnaireData.alien_will_apply_for_visa_abroad) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      readonly
                      :value="questionnaireData.alien_in_us"
                      label="Currently in US"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge :color="getBadgeColor(questionnaireData.alien_in_us)">
                          {{ formatValue(questionnaireData.alien_in_us) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      readonly
                      :value="questionnaireData.visa_processing_city_town"
                      label="Visa Processing City/Town"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge
                          :color="getBadgeColor(questionnaireData.visa_processing_city_town)"
                        >
                          {{ formatValue(questionnaireData.visa_processing_city_town) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input
                      readonly
                      :value="questionnaireData.visa_processing_country"
                      label="Visa Processing Country"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge :color="getBadgeColor(questionnaireData.visa_processing_country)">
                          {{ formatValue(questionnaireData.visa_processing_country) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-12">
                    <q-input
                      readonly
                      :value="questionnaireData.if_now_in_the_us"
                      label="If Now in the US"
                      type="textarea"
                      outlined
                      dense
                      stack-label
                    >
                      <template #append>
                        <q-badge :color="getBadgeColor(questionnaireData.if_now_in_the_us)">
                          {{ formatValue(questionnaireData.if_now_in_the_us) }}
                        </q-badge>
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>

          <!-- Employment Information -->
          <q-tab-panel name="employment">
            <div class="text-h6 q-mb-md">Employment Information</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.current_employer_name"
                  label="Current Employer"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.current_employer_name)">
                      {{ formatValue(questionnaireData.current_employer_name) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.job_title"
                  label="Job Title"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.job_title)">
                      {{ formatValue(questionnaireData.job_title) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.full_time_position"
                  label="Full Time Position"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.full_time_position)">
                      {{ formatValue(questionnaireData.full_time_position) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.permanent_position"
                  label="Permanent Position"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.permanent_position)">
                      {{ formatValue(questionnaireData.permanent_position) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.new_position"
                  label="New Position"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.new_position)">
                      {{ formatValue(questionnaireData.new_position) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.occupation"
                  label="Occupation"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.occupation)">
                      {{ formatValue(questionnaireData.occupation) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.annual_income"
                  label="Annual Income"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.annual_income)">
                      {{ formatValue(questionnaireData.annual_income) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  readonly
                  :value="questionnaireData.soc_code"
                  label="SOC Code"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.soc_code)">
                      {{ formatValue(questionnaireData.soc_code) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <q-input
                  readonly
                  :value="questionnaireData.nontechnical_job_description"
                  label="Job Description"
                  type="textarea"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.nontechnical_job_description)">
                      {{ formatValue(questionnaireData.nontechnical_job_description) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.hours_per_week"
                  label="Hours per Week"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.hours_per_week)">
                      {{ formatValue(questionnaireData.hours_per_week) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.wages_per"
                  label="Wages Per"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.wages_per)">
                      {{ formatValue(questionnaireData.wages_per) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <!-- Work Location -->
          <q-tab-panel name="work_location">
            <div class="text-h6 q-mb-md">Work Location</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.worksite_type"
                  label="Worksite Type"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.worksite_type)">
                      {{ formatValue(questionnaireData.worksite_type) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <q-input
                  readonly
                  :value="questionnaireData.worksite_street_number_name"
                  label="Street Number and Name"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.worksite_street_number_name)">
                      {{ formatValue(questionnaireData.worksite_street_number_name) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.work_building_type"
                  label="Building Type"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.work_building_type)">
                      {{ formatValue(questionnaireData.work_building_type) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6">
                <q-input
                  readonly
                  :value="questionnaireData.work_site_additional_details"
                  label="Additional Details"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.work_site_additional_details)">
                      {{ formatValue(questionnaireData.work_site_additional_details) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  readonly
                  :value="questionnaireData.work_city_town"
                  label="City/Town"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.work_city_town)">
                      {{ formatValue(questionnaireData.work_city_town) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  readonly
                  :value="questionnaireData.work_state"
                  label="State"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.work_state)">
                      {{ formatValue(questionnaireData.work_state) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  readonly
                  :value="questionnaireData.work_county_township"
                  label="County/Township"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.work_county_township)">
                      {{ formatValue(questionnaireData.work_county_township) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  readonly
                  :value="questionnaireData.work_zip_code"
                  label="ZIP Code"
                  outlined
                  dense
                  stack-label
                >
                  <template #append>
                    <q-badge :color="getBadgeColor(questionnaireData.work_zip_code)">
                      {{ formatValue(questionnaireData.work_zip_code) }}
                    </q-badge>
                  </template>
                </q-input>
              </div>
            </div>
          </q-tab-panel>

          <!-- Family Members -->
          <q-tab-panel name="family">
            <div class="text-h6 q-mb-md">Spouse & Children Records</div>
            <div
              v-if="questionnaireData.family_members && questionnaireData.family_members.length > 0"
            >
              <div
                v-for="(member, index) in questionnaireData.family_members"
                :key="member.id"
                class="q-mb-md"
              >
                <q-card bordered>
                  <q-card-section>
                    <div class="text-subtitle1 q-mb-md">
                      <q-icon
                        :name="member.relationship === 'Spouse' ? 'favorite' : 'child_care'"
                        class="q-mr-sm"
                      />
                      Family Member #{{ index + 1 }} - {{ member.relationship }}
                    </div>
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-4">
                        <q-input
                          readonly
                          :value="member.family_name_last_name"
                          label="Family Name"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(member.family_name_last_name)">
                              {{ formatValue(member.family_name_last_name) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-4">
                        <q-input
                          readonly
                          :value="member.given_name_first_name"
                          label="Given Name"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(member.given_name_first_name)">
                              {{ formatValue(member.given_name_first_name) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-4">
                        <q-input
                          readonly
                          :value="member.middle_name"
                          label="Middle Name"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(member.middle_name)">
                              {{ formatValue(member.middle_name) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-4">
                        <q-input
                          readonly
                          :value="member.dob"
                          label="Date of Birth"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(member.dob)">
                              {{ formatDate(member.dob) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-4">
                        <q-input
                          readonly
                          :value="member.birth_country"
                          label="Country of Birth"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge :color="getBadgeColor(member.birth_country)">
                              {{ formatValue(member.birth_country) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-4">
                        <q-input
                          readonly
                          :value="member.adjustment_status"
                          label="Adjustment Status"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge
                              :color="member.adjustment_status === 'Yes' ? 'positive' : 'grey'"
                              v-if="member.adjustment_status"
                            >
                              {{ formatValue(member.adjustment_status) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12 col-md-4">
                        <q-input
                          readonly
                          :value="member.visa_abroad"
                          label="Visa Abroad"
                          outlined
                          dense
                          stack-label
                        >
                          <template #append>
                            <q-badge
                              :color="member.visa_abroad === 'Yes' ? 'positive' : 'grey'"
                              v-if="member.visa_abroad"
                            >
                              {{ formatValue(member.visa_abroad) }}
                            </q-badge>
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
            <div v-else class="text-center q-pa-md">
              <q-icon name="people_outline" size="4em" color="grey-5" />
              <div class="text-grey q-mt-sm">No family members listed</div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>

    <!-- Loading State -->
    <div v-if="loading" class="text-center q-pa-lg">
      <q-spinner color="primary" size="3em" />
      <div class="text-grey q-mt-md">Loading questionnaire data...</div>
    </div>

    <!-- Error State -->
    <q-banner v-else-if="error" class="bg-negative text-white">
      {{ error }}
      <template #action>
        <q-btn flat color="white" label="Retry" @click="fetchQuestionnaireData" />
      </template>
    </q-banner>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'QuestionnaireSection',

  props: {
    caseId: {
      type: [String, Number],
      required: true,
    },
  },

  setup(props) {
    const $q = useQuasar()
    const loading = ref(false)
    const error = ref(null)
    const questionnaireData = ref({})
    const activeTab = ref('petition')

    const formatValue = (value) => {
      return value || 'Not Provided'
    }

    const getBadgeColor = (value) => {
      return value ? 'primary' : 'grey-7'
    }

    const safeGet = (field, defaultValue = '') => {
      return questionnaireData.value?.[field] ?? defaultValue
    }

    const formatDate = (value) => {
      if (!value) return 'Not Provided'
      try {
        return new Date(value).toLocaleDateString()
      } catch {
        return 'Invalid Date'
      }
    }

    const fetchQuestionnaireData = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await api.get(`/api/auth/cases/questionnaire/${props.caseId}`)
        questionnaireData.value = response.data.data
        console.log('Fetched data:', questionnaireData.value)
      } catch (err) {
        console.error('Error fetching questionnaire:', err)
        error.value = 'Failed to load questionnaire data'
        $q.notify({
          type: 'negative',
          message: 'Failed to load questionnaire data',
          position: 'top',
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchQuestionnaireData()
    })

    return {
      loading,
      error,
      questionnaireData,
      activeTab,
      safeGet,
      formatDate,
      getBadgeColor,
      formatValue,
    }
  },
}
</script>

<style lang="scss" scoped>
.questionnaire-section {
  .info-card {
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    }
  }

  :deep(.q-field--readonly) {
    .q-field__native {
      color: $grey-8;
    }

    .q-field__label {
      color: $grey-7;
    }
  }

  .q-tab-panels {
    background: transparent;
  }

  // Add styling for empty/null values
  .empty-value {
    color: $grey-6;
    font-style: italic;
  }
}
</style>
