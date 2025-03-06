<template>
  <div class="q-pa-md">
    <q-card class="my-card q-pa-md" flat>
      <div>
        <p>
          <b>Welcome to GreenPath Case Manager Platform</b>
        </p>
        <p>
          We are pleased to welcome you to <b>GreenPath Case Manager Platform</b>. My name is
          <b>Paul Asare</b>, and I am the <b>Founder</b> and Lead <b>Case Manager</b> at GreenPath
          Immigration.
        </p>
        <p>
          Our firm has assisted numerous clients in successfully obtaining
          <b>EB-1A, EB-1B and NIW</b>
          approvals earning several positive reviews across various platforms. A significant
          majority of our clients come to us through recommendations, a testament to the trust we
          have built over time.
        </p>
        <p>
          We are committed to providing <b>efficient, professional, and detail-oriented service,</b>
          ensuring that every client receives personalized support throughout the petition process.
          Your experience matters to us, and we continuously strive to improve our services based on
          client feedback.
        </p>
        <p>
          If you have concerns about messages from your assigned <b>Case Manager,</b> you are
          encouraged to <b>submit feedback directly</b> — negative ratings will be sent to me for
          immediate review. Your input helps us maintain the highest standards of service, and I am
          available to address any concerns regarding your Case Managers work.
        </p>

        <p>
          Beyond securing petition approvals, we place great importance on your overall experience
          with our team. Your feedback is invaluable in helping us refine our approach and provide
          the best possible assistance. Please feel free to reach out to me directly for any
          inquiries or assistance.
        </p>
        <p>
          <b>Best Regards</b>,
          <br />
          <b>Paul Asare</b>
          <br />
          Founder and Lead Case Manager
          <br />
          Green Path Immigration LLC
          <br />
          <a href="mailto:paul@greenpathimmigration.com">paul@greenpathimmigration.com</a>
          <br />
          <a href="tel:+19133853029">+1(913) 3853029</a>
        </p>
      </div>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
// import PaymentForm from 'src/components/PaymentForm.vue'
export default {
  components: {
    // PaymentForm,
  },
  setup() {
    return {
      tab: ref('one'),
    }
  },
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 100%;
}

.billing-table {
  margin: 1rem 0;
}

.table {
  background: #fff;
  border: 1px solid #dee2e6;
}

th {
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  padding: 0.75rem;
  font-weight: 600;
  color: #495057;
}

td {
  padding: 0.75rem;
  vertical-align: middle;
  color: #212529;
  border-color: #dee2e6;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.completed {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.transaction-cell {
  font-family: monospace;
  color: #666;
  font-size: 0.9rem;
}
</style>
