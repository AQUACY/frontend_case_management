<template>
  <div class="q-pa-md">
    <q-card class="my-card" flat bordered>
      <q-tabs v-model="tab" class="text-teal text-left" align="left">
        <q-tab label="Reminders" name="one" style="text-transform: capitalize" />
        <q-tab label="Client Packet" name="two" style="text-transform: capitalize" />
        <q-tab label="VISA FAQ " name="three" style="text-transform: capitalize" />
        <q-tab label="Billing" name="four" style="text-transform: capitalize" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <div>
            <p>
              Welcome to our Case Management System. My name is Victoria Chen and I am the Managing
              Attorney of North America Immigration Law Group.
              <br />Over the years, our firm has obtained thousands of EB-1A/EB-1B/NIW/O-1 approvals
              and accumulated more than seven thousand 5-star reviews on different review platforms.
              In addition, over 95% of our clients retained us because of the recommendation of our
              previous clients. <br />Our reputation is built upon our consistently prompt,
              professional and comprehensive service as well as our willingness to listen to our
              clients to further improve our services. <br />If you have concerns about the messages
              sent by your attorneys, please don't hesitate to rate the messages negatively. Such
              ratings will be sent to me directly. Please don't hesitate to contact me if you have
              any concerns about your attorney and/or his/her work. In addition to the case
              approval, we highly value client's feedback and experience working with us and your
              concerns will be addressed promptly.
            </p>
            <p>
              Victoria Chen<br />
              Managing Attorney<br />
              North America Immigration Law Group<br />
              victoriachen@chenassociates.com<br />
              888.666.0969 ext 501<br />
            </p>
            <p>-----</p>
          </div>

          <p>
            Getting Started: Please download the
            <a
              href="javascript:;"
              onclick="$('#myOrderOverviewTabContent a[href=\'#clientPacketTab\']').tab('show')"
              >Client Packet</a
            >
            and read the instructions in the Read First area. The Client Packet has various useful
            information and instructs you how to prepare Research Summary and List of Recommenders
            for the attorney to draft your letters.
          </p>

          <p>
            Wegreened team are dedicated to providing the best Quality, Value and Service to meet
            our clients' needs and your case approval and satisfaction about our service are our
            priority. We strive to provide the most clear and comprehensive answers to your
            questions within 24 business hours and provide the letters with the highest quality.
          </p>
          <div
            class="danger deadline-timer py-3"
            style="
              margin-left: -10px;
              padding-left: 10px;
              margin-bottom: 1px;
              border-left: 7px solid #dc3545;
            "
          >
            <h6 class="text-danger font-weight-bold mb-3">
              <span class="danger triangle"></span>
              DIY NIW premium processing upgrade instructions
            </h6>
            <div class="pl-3">
              <p>
                If you are interested in upgrading your pending NIW case to premium processing, note
                it is a rather straightforward process and you can completely prepare for the
                request on your own. To accelerate and facilitate that process, please
                <a
                  href="javascript:;"
                  class="font-weight-bold"
                  onclick="downloadFiles('help', 'NIW PP Upgrade Instructions.pdf')"
                  >click here</a
                >
                to download a detailed, step-by-step DIY instruction for you to complete and submit
                the request yourself from your end.
                <i
                  >(Note this instruction only applies to NIW PP upgrades. It does NOT apply to
                  EB-1A, EB-1B or O-1 PP requests.)</i
                >
                Please be assured that the instructions cover all necessary information you will
                need for successfully completing the request independently. If you plan to upgrade
                your pending NIW to PP, we highly recommend that you review the instructions
                mentioned above and proceed with submitting the PP request directly.
              </p>
              <p>
                As of June 1st, 2023 between 5:00 PM (ET) and the USCIS was more mindful of the U.S.
                citizen matter. USCIS Basic Protection Act (UBPA) introduced and U.S. Audit under
                the King Hall law set up. Please note that regarding Premium Processing Service, you
                may transfer the processing time of your I-140 petition. If the PP effort you
                provide has: Your priority date should be transferred to the USCIS Office within 15
                days. The USCIS Office within NIW PP has UBPA approved your case. However, the U.S.
                granted through Premium Processing Service will set specific the wait time for your
                EAD priority date to become current. You will still need to wait for your priority
                date to become current in order to proceed with the second step of adjustment of
                status.
              </p>
              <p>
                For premium processing fees for premium processing, the fee from November 23, 2023:
                Please note that the USCIS processing time for premium processing service will
                change from 45 calendar days to business days beginning in FY 2024. To better serve
                you after 4/1/2024, for premium processing under NIW & EB2-NIW processing time will
                change from 45 calendar days to 15 business days. For premium processing under
                EB1A/EB1B: the USCIS processing time will change from 15 calendar days to 15
                business days.
              </p>
              <p>
                Note: If you have any questions after reviewing the FAQ and instructions, please
                reach us to manage your account. As a reminder, given the high volume of requests
                for shorter eligibility NIW PP you may have, there might delay in our response to
                your questions. For premium processing and understanding we will check according to
                your questions as soon as possible.
              </p>
            </div>
          </div>

          <div
            class="danger deadline-timer py-3"
            style="
              margin-left: -10px;
              padding-left: 10px;
              margin-bottom: 1px;
              border-left: 7px solid #dc3545;
            "
          >
            <h6 class="text-danger font-weight-bold mb-3">
              <span class="danger triangle"></span>
              Important Notice Regarding Your Stay in the U.S.
            </h6>
            <div class="pl-3">
              <p>
                If you are out of status or your immigrant visa status has expired, it is important
                to note that you may be in the process of extending your status, or you have left
                the U.S. (please update your client record).
              </p>
              <p>
                To stay in the U.S., you need to maintain a valid visa status or file I-485
                (adjustment of status), which is the second step of your green card application. If
                you are out of status for more than 180 days, you may be ineligible to file AOS and
                may have to leave the U.S.
              </p>
              <p>
                Note: After you file I-485, you are allowed to stay in the U.S. based on the pending
                I-485 and eligible for Employment Authorization Document (EAD). The current I-765
                processing time for an EAD is around 6-8 months on average and can be longer. Make
                sure to submit or update the I-485 EAD processing time reminder.
              </p>
              <p>
                Due to current USCIS policy, if you are in the U.S. on a valid nonimmigrant visa
                status (e.g., F-1, H-1B, J-1, etc.), your nonimmigrant visa status will be
                invalidated on your filing date of your pending I-485 to stay in the U.S. In
                addition, if your non-immigrant visa status expires and you do not file another visa
                such as H1B/H-4, O-1/O-2, J-1, before your visa expires, you can only file for AOS
                if based on the pending I-485. If you plan to stay in the U.S. based on your pending
                I-485, be sure to file I-765 (EAD) and I-131 (AP) with your I-485.
              </p>
            </div>
          </div>
          <div class="danger deadline-timer py-3" style="margin-left: -10px; margin-bottom: 1px">
            <h6 class="text-danger font-weight-bold mb-3">
              <span class="danger triangle"></span>
              NIW Adjudication Trends
            </h6>
            <div class="pl-3">
              <p>
                We would like to provide an update on NIW adjudication trends. Recently, we have
                noticed that immigration officers have started to issue a higher number of RFEs
                (Request for Evidence) or even denials to applications whose last peer-reviewed
                publications date a few years ago. These have challenged whether the clients are
                well positioned to advance their research endeavor and will make substantial
                contributions to the U.S. in the foreseeable future.
              </p>
              <p>
                Despite being a self-petition case, NIW petitions are still subject to USCIS
                officers' discretion. To better position your case for approval, we strongly advise
                that you continue your research activities before we file your NIW petition. We have
                also observed that USCIS officers may consult Google Scholar exclusively to
                determine your publication record, so we encourage you to update your Google Scholar
                profile with your complete published papers to demonstrate your continued research
                efforts. It is not essential to wait for the publication of a new research paper
                before submitting your NIW petition.
              </p>
              <p>
                If you are still waiting and may want to delay the publication to wait for your NIW
                petition, we encourage you to publish papers as soon as obtainable with your
                previous PhD group/other research institutions and continue publishing. In the near
                future, we suggest you regularly check your Google Scholar profile to ensure it
                reflects your most recent publications.
              </p>
            </div>
          </div>
        </q-tab-panel>
        <!-- this is the panel for client packet -->
        <q-tab-panel name="two">
          <div id="cp0">
            <div>
              <p class="font-weight-bold ml-3 mb-1"></p>
              <ul>
                <li>
                  Please download "READ FIRST" and Client Packet (Use WinRAR or 7-Zip to unzip it
                  <a href="http://www.7-zip.org/" target="_blank">http://www.7-zip.org/</a>) and
                  carefully read the instructions. To expedite the case preparation process, it is
                  very important for you to read and follow our instructions.
                </li>
                <li>
                  If you have any question regarding the usage of this system, please contact
                  <a href="mailto:info@wegreened.com">info@wegreened.com</a>
                </li>
                <li>
                  Note: Please use <span class="font-weight-bold">Google Chrome Browser</span> for
                  the best performance.
                </li>
                <li>
                  <span class="font-weight-bold text-underline">NOTICE</span>: Please note that
                  <span class="font-weight-bold text-underline"
                    >in the event of early termination of the case</span
                  >, Attorney will deduct a reasonable portion of the attorney fee based on the
                  resources we have shared with you and efforts spent on your case. If the Client
                  Packet has been downloaded, we would deduct $500 out of your paid attorney fee for
                  this.
                  <span class="font-weight-bold text-underline font-italic"
                    >By downloading the Client Packet, you agree to this charge.</span
                  >
                  For more information about the fee breakdown in the event of early termination,
                  please review the question under the "Early Termination" part of the file
                  <span class="font-weight-bold font-italic"
                    >"Frequently Asked Questions for Current Clients.pdf"</span
                  >
                  located in the READ FIRST section below.
                </li>
              </ul>
            </div>
            <hr />
            <div class="clearfix">
              <a href="javascript:;" class="btn btn-sm btn-outline-secondary float-right">
                Download all Files as zip
              </a>
              <h5 class="text-primary font-weight-bold">
                <span class="img-icon iicon-triangle-blue"></span>
                Read First
              </h5>
            </div>
            <div>
              <p class="font-weight-bold ml-3 mb-1"></p>
              <ul>
                <li>
                  <a href="javascript:;" class="text-body">
                    Frequently Asked Questions for Current Clients.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body">
                    Green Card Application Process Overview and Timeline.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body">
                    Important Information About Materials.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body"> Sample Weight Review Profile.pdf </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div class="clearfix">
            <a href="javascript:;" class="btn btn-sm btn-outline-secondary float-right">
              Download all Files as zip
            </a>
            <h5 class="text-primary font-weight-bold">
              <span class="img-icon iicon-triangle-blue"></span>
              NIW
            </h5>
          </div>
          <div id="cp1">
            <div>
              <p class="font-weight-bold ml-3 mb-1">
                Appendix A - NIW Summary of Contributions Guidelines
              </p>
              <ul>
                <li>
                  <a href="javascript:;" class="text-body"> 1_Writing Guidelines_NIW.pdf </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body">
                    2_Guidelines for Preparing the SOC.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body">
                    3_Example of Summary of Contributions_R_24_05.zip
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body">
                    4_Example of Summary of Contributions.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body">
                    5_NIW SOC Online User Emerging Technologies List Update.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body">
                    6_Advanced Professor Paper and Contributions.pdf
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p class="font-weight-bold ml-3 mb-1">Appendix B - Recommendation Letters</p>
              <ul>
                <li>
                  <a href="javascript:;" class="text-body">
                    1_Guidelines for Choosing Recommenders_11_26_2023.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body">
                    2_RECOMMENDER_INFORMATION_JR_5_2023.XLSX
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body">
                    3_Recommender_Information_JR_5_2023.docx
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body">
                    4_Sample Letter of Recommendation.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body"> 5_Recommendation_Q_A_11_1076.docx </a>
                </li>
              </ul>
            </div>

            <div>
              <p class="font-weight-bold ml-3 mb-1">Appendix C - Document List & Sample Details</p>
              <ul>
                <li>
                  <a href="javascript:;" class="text-body">
                    1_Document List_NEW_Other NIW Package_01.11.2024.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body"> 2_Sample CV.docx </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body">
                    3_Advanced Patent Documents Instructions.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body">
                    4_Advanced Patent Documents Instructions_Other_NIW_Package.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body"> 5_Sample_Citations.docx </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body"> 6a_Homepage_AffiliateS.docx </a>
                </li>
                <li>
                  <a href="javascript:;" class="text-body"> 6b_Homepage_AffiliateS.docx </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p class="font-weight-bold ml-3 mb-1">Appendix D - Forms & Instructions</p>
            <ul>
              <li>
                <a href="javascript:;" id="cp1_Form I-140 NIW Instructions.pdf" class="text-body">
                  1_Form I-140 NIW Instructions.pdf
                </a>
              </li>
              <li>
                <a href="javascript:;" id="cp2_ G-28 Instructions (NIW).pdf" class="text-body">
                  2_ G-28 Instructions (NIW).pdf
                </a>
              </li>
            </ul>
          </div>

          <!-- DIY -->

          <div id="cp20">
            <hr />
            <div class="clearfix">
              <a href="javascript:;" class="btn btn-sm btn-outline-secondary float-right">
                Download all Files as zip
              </a>
              <h5 class="text-primary font-weight-bold">
                <span class="img-icon iicon-triangle-blue"></span>
                I-485 DIY
              </h5>
            </div>
            <div class="mb-3 ml-3">
              <p>
                To see whether you are eligible for I-485 filing, please refer to the documents
                <span class="font-italic font-weight-bold"
                  >"Green Card Application Process Overview and Timeline.pdf"</span
                >
                and
                <span class="font-italic font-weight-bold"
                  >"Priority Date Information_How to know if your Priority Date is
                  Current.pdf"</span
                >
                under the Visa FAQ tab.
              </p>
              <p>
                Please note this is the most recent DIY I-485 packet available. However, please keep
                in mind that our samples and instructions in the DIY packet are only meant for
                general guidance when completing the forms. Some forms may expire prior to your
                filing. The same applies to samples and instructions. Please make sure to check the
                edition(s) accepted by USCIS for the relevant forms and review the most updated
                instructions published by USCIS before you submit your applications. You can find
                the edition(s) being accepted by USCIS at any given time under the "Edition Date"
                tab of each link.
              </p>
              <ul class="list-unstyled">
                <li>
                  I-485:
                  <a href="https://www.uscis.gov/i-485" target="_blank"
                    >https://www.uscis.gov/i-485</a
                  >
                </li>
                <li>
                  I-765:
                  <a href="https://www.uscis.gov/i-765" target="_blank"
                    >https://www.uscis.gov/i-765</a
                  >
                </li>
                <li>
                  I-131:
                  <a href="https://www.uscis.gov/i-131" target="_blank"
                    >https://www.uscis.gov/i-131</a
                  >
                </li>
                <li>
                  I-693:
                  <a href="https://www.uscis.gov/i-693" target="_blank"
                    >https://www.uscis.gov/i-693</a
                  >
                </li>
                <li>
                  G-1145:
                  <a href="https://www.uscis.gov/g-1145" target="_blank"
                    >https://www.uscis.gov/g-1145</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p class="font-weight-bold ml-3 mb-1">1_Sample Cover Letters</p>
            <ul>
              <li>
                <a href="javascript:;" class="text-body"> Sample I-485 cover letter_EEO.docx </a>
              </li>
              <li>
                <a href="javascript:;" class="text-body"> Sample I-485 cover letter_STEM.docx </a>
              </li>
              <li>
                <a href="javascript:;" class="text-body"> Sample I-485 cover letter_NIW.docx </a>
              </li>
            </ul>
          </div>

          <div>
            <p class="font-weight-bold ml-3 mb-1">2_Birth Certificate Instructions</p>
            <ul>
              <li>
                <a href="javascript:;" class="text-body"> Birth_Certificates_Instructions.pdf </a>
              </li>
            </ul>
          </div>

          <div>
            <p class="font-weight-bold ml-3 mb-1">3_Forms and Instructions</p>
            <ul>
              <li>
                <a href="javascript:;" class="text-body"> Blank Forms and Instructions.pdf </a>
              </li>
              <li>
                <a href="javascript:;" class="text-body">
                  Form I-485 Instructions for 122322 edition.pdf
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p class="font-weight-bold ml-3 mb-1">4_Other Forms</p>
            <ul>
              <li>
                <a href="javascript:;" class="text-body">
                  I-824 Instructions_Follow-to-Join Benefits for Dependent(s)_DIY.pdf
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p class="font-weight-bold ml-3 mb-1">5_Sample Documents</p>
            <ul>
              <li>
                <a href="javascript:;" class="text-body"> EE5_Employment Letter_TEMP.v57.pdf </a>
              </li>
              <li>
                <a href="javascript:;" class="text-body"> I-485 Personal Statement Sample.pdf </a>
              </li>
              <li>
                <a href="javascript:;" class="text-body"> Sample Military Service JAMRS.pdf </a>
              </li>
              <li>
                <a href="javascript:;" class="text-body"> Sample NotES.pdf </a>
              </li>
            </ul>
          </div>
        </q-tab-panel>
        <!-- this is the panel for visa faq -->
        <q-tab-panel name="three">
          <p class="mb-4">
            In addition to the I-140 case preparation instructions, we have prepared a list of
            Frequently Asked Questions (FAQs) documents for commonly encountered issues during your
            green card application process. If you have any questions regarding any of these issues,
            please carefully review the documents first.
            <span class="font-weight-bold text-underline text-danger">
              Please note that the FAQ documents provided in our system is intended for general
              informational purposes only and does not constitute legal advice. If you have any
              questions after reading the FAQs, please do not hesitate to reach out to your
              attorneys so that we can advise you accordingly based on your specific situations.
            </span>
          </p>

          <div id="faq43" class="mb-4">
            <h6 class="font-weight-bold">
              Premium Processing Service Expansion of EB2-NIW, I-765, I-539
            </h6>
            <p class="text-muted">
              Please carefully review this document first if you have any questions about the
              upcoming Premium Processing Service for I-140 EB2-NIW, I-765, and I-539 O3.
            </p>
            <ul>
              <li>
                <a href="javascript:;" class="text-body">
                  Q_A for Premium Processing Service Expansion of EB2-NIW_ I-765_ I-539.pdf
                  <small class="text-gray ml-1">(01/04/2024)</small></a
                >
              </li>
            </ul>
          </div>

          <div id="faq14" class="mb-4">
            <h6 class="font-weight-bold">EB-1A Service Center FAQ</h6>
            <p class="text-muted">If you have retained us for EB1A, please review this document.</p>
            <ul>
              <li>
                <a href="javascript:;" class="text-body">
                  EB-1A Service Center Q_A.pdf
                  <small class="text-gray ml-1">(06/21/2024)</small></a
                >
              </li>
            </ul>
          </div>

          <div id="faq17" class="mb-4">
            <h6 class="font-weight-bold">EAD (Employment Authorization Document)</h6>
            <p class="text-muted"></p>
            <ul>
              <li>
                <a href="javascript:;" class="text-body">
                  EAD (Employment Authorization Document).pdf
                  <small class="text-gray ml-1">(09/06/2024)</small></a
                >
              </li>
            </ul>
          </div>
        </q-tab-panel>

        <!-- this is the panel for the billing -->
        <q-tab-panel name="four">
          <div class="table-responsive billing-table">
            <PaymentHistoryTable />
          </div>
          <div>
            <PaymentForm @success="handleSuccess" />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import PaymentForm from 'src/components/PaymentForm.vue'
import PaymentHistoryTable from 'src/components/PaymentHistoryTable.vue'
export default {
  components: {
    PaymentForm,
    PaymentHistoryTable,
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
