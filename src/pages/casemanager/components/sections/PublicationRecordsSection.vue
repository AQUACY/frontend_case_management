<template>
  <div class="publications-section">
    <div class="text-h6 q-mb-md">Publication Records</div>
    <q-card>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-table
              :rows="publications"
              :columns="columns"
              row-key="id"
              :pagination="{ rowsPerPage: 10 }"
            >
              <template v-slot:top>
                <div class="q-table__title">Publications</div>
                <q-space />
                <q-select
                  v-model="filter"
                  :options="filterOptions"
                  label="Filter by type"
                  dense
                  outlined
                  class="q-ml-md"
                  style="width: 200px"
                />
              </template>

              <template v-slot:body-cell-type="props">
                <q-td :props="props">
                  <q-chip :color="getTypeColor(props.row.type)" text-color="white" size="sm">
                    {{ props.row.type }}
                  </q-chip>
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn-group flat>
                    <q-btn
                      flat
                      round
                      size="sm"
                      color="primary"
                      icon="visibility"
                      @click="viewPublication(props.row)"
                    />
                    <q-btn
                      flat
                      round
                      size="sm"
                      color="secondary"
                      icon="download"
                      @click="downloadPublication(props.row)"
                    />
                  </q-btn-group>
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PublicationRecordsSection',
  props: {
    publications: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      filter: null,
      filterOptions: ['Journal Article', 'Conference Paper', 'Book Chapter', 'Patent', 'All'],
      columns: [
        {
          name: 'title',
          required: true,
          label: 'Title',
          align: 'left',
          field: (row) => row.title,
          sortable: true,
        },
        {
          name: 'authors',
          align: 'left',
          label: 'Authors',
          field: (row) => row.authors,
          sortable: true,
        },
        {
          name: 'journal',
          align: 'left',
          label: 'Journal/Conference',
          field: (row) => row.journal,
          sortable: true,
        },
        {
          name: 'year',
          align: 'center',
          label: 'Year',
          field: (row) => row.year,
          sortable: true,
        },
        {
          name: 'type',
          align: 'center',
          label: 'Type',
          field: (row) => row.type,
          sortable: true,
        },
        {
          name: 'citations',
          align: 'center',
          label: 'Citations',
          field: (row) => row.citations,
          sortable: true,
        },
        {
          name: 'actions',
          align: 'center',
          label: 'Actions',
        },
      ],
    }
  },
  methods: {
    getTypeColor(type) {
      const colors = {
        'Journal Article': 'primary',
        'Conference Paper': 'secondary',
        'Book Chapter': 'positive',
        Patent: 'negative',
      }
      return colors[type] || 'grey'
    },
    viewPublication(publication) {
      // Implement view publication details
      console.log('View publication:', publication)
    },
    downloadPublication(publication) {
      // Implement download publication
      console.log('Download publication:', publication)
    },
  },
}
</script>
