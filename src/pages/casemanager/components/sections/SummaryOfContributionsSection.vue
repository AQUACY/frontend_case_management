<template>
  <div class="soc-section">
    <div class="text-h6 q-mb-md">Summary of Contributions (SOC)</div>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-tabs
              v-model="activeTab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="left"
              narrow-indicator
            >
              <q-tab name="research" label="Research Contributions" />
              <q-tab name="citations" label="Citations Analysis" />
              <q-tab name="impact" label="Impact Statements" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="activeTab" animated>
              <q-tab-panel name="research">
                <div
                  v-for="(contribution, index) in socDetails.research_contributions"
                  :key="index"
                >
                  <div class="text-subtitle1 q-mb-sm">Contribution {{ index + 1 }}</div>
                  <q-card bordered flat class="q-mb-md">
                    <q-card-section>
                      <div class="text-body1">{{ contribution.title }}</div>
                      <div class="text-body2 q-mt-sm">{{ contribution.description }}</div>
                      <div class="text-caption q-mt-sm">
                        Impact Factor: {{ contribution.impact_factor }}
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </q-tab-panel>

              <q-tab-panel name="citations">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-card bordered flat>
                      <q-card-section>
                        <div class="text-h6">Citation Metrics</div>
                        <q-list>
                          <q-item>
                            <q-item-section>
                              <q-item-label caption>Total Citations</q-item-label>
                              <q-item-label>{{
                                socDetails.citation_metrics?.total_citations
                              }}</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label caption>H-Index</q-item-label>
                              <q-item-label>{{
                                socDetails.citation_metrics?.h_index
                              }}</q-item-label>
                            </q-item-section>
                          </q-item>
                          <q-item>
                            <q-item-section>
                              <q-item-label caption>i10-Index</q-item-label>
                              <q-item-label>{{
                                socDetails.citation_metrics?.i10_index
                              }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-card bordered flat>
                      <q-card-section>
                        <div class="text-h6">Citation Sources</div>
                        <q-list>
                          <q-item
                            v-for="(source, index) in socDetails.citation_sources"
                            :key="index"
                          >
                            <q-item-section>
                              <q-item-label>{{ source.name }}</q-item-label>
                              <q-item-label caption>Citations: {{ source.count }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="impact">
                <div v-for="(statement, index) in socDetails.impact_statements" :key="index">
                  <q-card bordered flat class="q-mb-md">
                    <q-card-section>
                      <div class="text-subtitle1">{{ statement.title }}</div>
                      <div class="text-body2 q-mt-sm">{{ statement.content }}</div>
                      <div class="text-caption q-mt-sm">Field: {{ statement.field }}</div>
                    </q-card-section>
                  </q-card>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'SummaryOfContributionsSection',
  props: {
    socDetails: {
      type: Object,
      required: true,
      default: () => ({
        research_contributions: [],
        citation_metrics: {},
        citation_sources: [],
        impact_statements: [],
      }),
    },
  },
  data() {
    return {
      activeTab: 'research',
    }
  },
}
</script>
