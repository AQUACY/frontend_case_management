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
        <q-tab-panel name="one">
          <div></div>

          <p>
            Getting Started: Please download the
            <a
              href="javascript:;"
              onclick="$('#myOrderOverviewTabContent a[href=\'#clientPacketTab\']').tab('show')"
              >Client Packet</a
            >
            and read the instructions in the Read First area. The Client Packet has various useful
            information and instruct you how to prepare Research Summary and List of Recommenders
            for the attorney to draft your letters.
          </p>
          <p>
            Wegreened team are dedicated to providing the best Quality, Value and Service to meet
            our clients' needs and your case approval and satisfaction about our service are our
            priority. We strive to provide the most clear and comprehensive answers to your
            questions within 24 business hours and provide the letters with the highest quality.
          </p>
          <div class="danger deadline-timer py-3" style="margin-left: -10px; margin-bottom: 1px">
            <h6 class="text-danger font-weight-bold mb-3">
              <span class="danger triangle"></span>
              DIY NIW premium processing upgrade instructions
            </h6>
            <div class="pl-3">
              <p>
                If you are interested in upgrading your pending NIW case to premium processing, note
                it is a rather straightforward process and you can completely prepare for the
                request on your own.
                <u
                  >To accelerate and facilitate that process, please
                  <a
                    href="javascript:;"
                    class="font-weight-bold"
                    onclick="downloadFiles('help', 'NIW PP Upgrade Instructions.pdf')"
                    >click here</a
                  >
                  to download a detailed, step-by-step DIY instruction for you to complete and
                  submit the request yourself from your end.</u
                >
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
                If you have a child between the age of 18-21 and the child was born outside of the
                U.S., please review "Child Status Protection Act (CSPA) Introduction and Q _ A.pdf"
                under the Visa FAQ tab and check in with the attorney on whether it is recommended
                for you to upgrade your I-140 to premium processing.
              </p>
              <p>
                Please note that requesting Premium Processing Service can only shorten the
                processing time of your I-140 petition. It does not affect your priority date. Your
                priority date should be approximately the date USCIS receives your I-140 EB2-NIW
                petition. Your priority date is NOT the date USCIS approves your petition. Having
                the I-140 approval through Premium Processing Service will not expedite the wait
                time for your EB2 priority date to become current. You will still need to wait for
                your priority date to become current in order to proceed with the second step of
                green card application.
              </p>
              <p>
                Effective 2/26/2024, note the premium processing fee has been increased to
                <span class="text-underline font-weight-bold">$2,805</span>. Please also be aware
                that the USCIS processing time for premium processing service will change from
                calendar days to business days beginning 4/1/2024. To further clarify, on and after
                4/1/2024, for premium processing under NIW, the USCIS processing time will change
                from 45 calendar days to 45 business days. For premium processing under EB1A/EB1B,
                the USCIS processing time will change from 15 calendar days to 15 business days.
              </p>
              <p>
                Please refer to "Q_A for Premium Processing Service Expansion of EB2-NIW_ I-765_
                I-539.pdf" under the Visa FAQ tab if you have any questions about using Premium
                Processing for your EB2-NIW. If you still have any questions after reading the FAQ
                and instructions, please leave us a message in your account. As a reminder, given
                the large volume of inquiries we receive regarding this new practice, there might be
                a slight delay in our response to your questions. We appreciate your patience and
                understanding as we strive to respond to your questions as soon as possible. Thank
                you.
              </p>
            </div>
          </div>

          <div class="danger deadline-timer py-3" style="margin-left: -20px; margin-bottom: 1px">
            <h6 class="text-danger font-weight-bold mb-3">
              <span class="danger triangle"></span>
              Visa status has expired
            </h6>
            <div class="pl-3">
              <p>
                We see from your client record that your visa status has expired. If you have
                extended or are in the process of extending your status, or you have left the U.S.,
                please update your client record.
              </p>
              <p>
                To stay in the U.S., you need to maintain a valid visa status or file I-485
                (adjustment of status), which is the second step of your green card application. If
                you are out of status for more than 180 days, you won't be eligible to file I-485
                and may trigger a 3-year ban from entry to the U.S.
              </p>
              <p>
                Note: After you file I-485, you are allowed to stay in the U.S. based on the pending
                I-485 and eligible for Employment Authorization Document (EAD). The current I-765
                processing time for an EAD is around 3-6 months on average but it can be longer.
                Note it is difficult to predict the I-485 EAD processing time nowadays.
              </p>
              <p>
                <u
                  >Please be advised that once you register the I-485 EAD with an employer to work
                  or enter the U.S. with AP after an international trip, your non-immigrant visa
                  status will be invalidated</u
                >
                so you only rely on your pending I-485 to stay in the U.S. In addition, if your
                non-immigrant visa status expires and you do not file another visa such as H1B/H4,
                O-1/O-3 or L-1/L-2 before your visa expires, you are only in the U.S. based on the
                pending I-485. If you only stay in the U.S. based on your pending I-485 for more
                than 180 days, you won't be able to file another I-485 if this one gets denied.
              </p>
            </div>
          </div>
          <div
            class="muted deadline-timer py-3"
            style="margin-left: -20px; margin-bottom: 1px; border-left: 7px solid #dc3545"
          >
            <h6 class="text-muted font-weight-bold mb-3">
              <span class="muted triangle"></span>
              NIW Adjudication Trends
            </h6>
            <div class="pl-3">
              <p>
                We would like to provide an update on NIW adjudication trends. Recently, we have
                noticed that immigration officers have started to issue a higher number of RFEs
                (Request for Evidence) or even denials to applicants whose last peer-reviewed
                publication was a few years ago. These have challenged whether the clients are
                well-positioned to advance their research endeavor and that the endeavor has
                national importance (prong 1 &amp; 2 of the Dhanasar decision).
              </p>
              <p>
                Having recent and continuous publications would serve as good evidence for these two
                prongs. If your last peer-reviewed publication was in 2020 or prior, we encourage
                you to publish some papers before we file your NIW petition. We have also observed
                that USCIS officers may consult Google Scholar exclusively to determine your
                publication record, so we encourage you to update your Google Scholar profile with
                any recently published papers or patents that are not currently displayed there. If
                you have any papers that are accepted for publication but have not yet been
                officially published, please also add them to Google Scholar as soon as possible to
                ensure that the officer considers them during case adjudication. Additionally, if
                you have any ongoing research projects, we can incorporate them in your petition to
                demonstrate your continued research efforts. In such instances, it's not necessary
                to wait for the publication of a new research article before submitting your
                petition.
              </p>
              <p>
                If you are in industry and may not be able to publish papers as part of your job
                duties, we encourage you to publish patents or seek collaboration with your previous
                PhD group/other research institutions and continue publishing. At the bare minimum,
                we suggest you maintain ties with academia as much as possible and document any
                evidence of your research-related activities.
              </p>
            </div>
          </div>

          <!-- this is the client record -->

          <div class="mt-3">
            <h6 class="font-weight-bold text-primary">
              <span class="img-icon iicon-triangle-blue"></span> Client Record
              <a href="https://northcms.wenzo.com/my-order/72883/client-record"
                ><span class="img-icon iicon-edit"></span
              ></a>
            </h6>
            <ul>
              <!---->
              <li>
                Current nonimmigrant visa status:
                <span class="text-muted"> J-1 (expiration date: 2025-05-08 ) </span>
              </li>
              <li>
                Admit until date on most recent I-94: <span class="text-muted">2023-10-10</span>
                <br />If your visa is expiring, are you in the process to apply for a new visa?
                <span class="text-muted"> </span>
              </li>
              <li>
                Current Employment Information
                <ul class="pl-3">
                  <li>Name of employer: <span class="text-muted">UNC Chapel Hill</span></li>
                  <li>
                    Job title: <span class="text-muted">Postdoctoral Research Associate</span>
                  </li>
                </ul>
              </li>
              <li>
                Proposed Employment
                <ul class="pl-3">
                  <li>Field of proposed employment: <span class="text-muted"></span></li>
                  <li>Job title: <span class="text-muted"></span></li>
                  <li>Name of company/organization: <span class="text-muted"></span></li>
                </ul>
              </li>
              <li>
                Do you have any dependents (spouse and/or unmarried children)?
                <span class="text-muted">Yes</span>
                <div>
                  <div>
                    Do you have any children between the age of 18 and 21?
                    <span class="text-muted">No</span>
                  </div>
                  <div>
                    Do you have any children older than 21? <span class="text-muted">No</span>
                  </div>
                  <ul class="pl-3">
                    <li>Dhirendra will file Immigrant Visa Processing</li>
                    <li>Darshani</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </q-tab-panel>
        <!-- this is the panel for client packet -->
        <q-tab-panel name="two">
          .3
          <p>
            Please download "READ FIRST" and Client Packet (Use WinRAR or 7-Zip to unzip it
            <a href="http://www.7-zip.org/" target="_blank">http://www.7-zip.org/</a>) and carefully
            read the instructions. To expedite the case preparation process, it is very important
            for you to read and follow our instructions.
          </p>
          <p>
            If you have any question regarding the usage of this system, please contact
            <a href="mailto:info@wegreened.com">info@wegreened.com</a>.
          </p>
          <p>
            Note: Please use <span class="font-weight-bold">Google Chrome Browser</span> for the
            best performance.
          </p>
          <p class="mb-4">
            <span class="font-weight-bold text-underline">NOTICE</span>: Please note that
            <span class="font-weight-bold text-underline"
              >in the event of early termination of the case</span
            >, Attorney will deduct a reasonable portion of the attorney fee based on the resources
            we have shared with you and efforts spent on your case. If the Client Packet has been
            downloaded, we would deduct $500 out of your paid attorney fee for this.
            <span class="font-weight-bold text-underline font-italic"
              >By downloading the Client Packet, you agree to this charge.</span
            >
            For more information about the fee breakdown in the event of early termination, please
            review the question under the "Early Termination" part of the file
            <span class="font-weight-bold font-italic"
              >"Frequently Asked Questions for Current Clients.pdf"</span
            >
            located in the READ FIRST section below.
          </p>
          <div id="cp0">
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
            <!---->
            <div>
              <p class="font-weight-bold ml-3 mb-1"></p>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    id="cpFrequently Asked Questions for Current Clients.pdf"
                    class="text-body"
                  >
                    Frequently Asked Questions for Current Clients.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpGreen Card Application Process Overview and Timeline.pdf"
                    class="text-body"
                  >
                    Green Card Application Process Overview and Timeline.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpHow to use WENZO Case Management Platform.pdf"
                    class="text-body"
                  >
                    How to use WENZO Case Management Platform.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" id="cpSample Google Scholar Profile.pdf" class="text-body">
                    Sample Google Scholar Profile.pdf
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- niw -->
          <div id="cp1">
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
            <div>
              <p class="font-weight-bold ml-3 mb-1">Steps for Case Preparation</p>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    id="cp1_STEPS FOR NIW CASE PREPARATION.pdf"
                    class="text-body"
                  >
                    1_STEPS FOR NIW CASE PREPARATION.pdf
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p class="font-weight-bold ml-3 mb-1">
                Appendix A - NIW Summary of Contributions Guidelines
              </p>
              <ul>
                <li>
                  <a href="javascript:;" id="cp1_Prong Guidelines_NIW.pdf" class="text-body">
                    1_Prong Guidelines_NIW.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cp2_Guidelines for Preparing the SoC.pdf"
                    class="text-body"
                  >
                    2_Guidelines for Preparing the SoC.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cp3_Samples of Summary of Contributions_9.4.24.zip"
                    class="text-body"
                  >
                    3_Samples of Summary of Contributions_9.4.24.zip
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cp4_Summary of Contributions Q_A.pdf"
                    class="text-body"
                  >
                    4_Summary of Contributions Q_A.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cp5_Feb-2024 Critical and Emerging Technologies List Update.pdf"
                    class="text-body"
                  >
                    5_Feb-2024 Critical and Emerging Technologies List Update.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cp6_Proposed Endeavor Guide and Clarifications.pdf"
                    class="text-body"
                  >
                    6_Proposed Endeavor Guide and Clarifications.pdf
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p class="font-weight-bold ml-3 mb-1">Appendix B - Recommender Guidelines</p>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    id="cp1_Guidelines for Choosing Recommenders_11_06_2023.pdf"
                    class="text-body"
                  >
                    1_Guidelines for Choosing Recommenders_11_06_2023.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cp2_Recommender List Instructions_06.12.2023.docx"
                    class="text-body"
                  >
                    2_Recommender List Instructions_06.12.2023.docx
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cp3_ Recommender List Template_06_12_23.docx"
                    class="text-body"
                  >
                    3_ Recommender List Template_06_12_23.docx
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cp4_ Sample Letter of Recommendation.pdf"
                    class="text-body"
                  >
                    4_ Sample Letter of Recommendation.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" id="cp5_Recommender Q_A_5.11.2023.docx" class="text-body">
                    5_Recommender Q_A_5.11.2023.docx
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p class="font-weight-bold ml-3 mb-1">
                Appendix C - Document List &amp; Sample Emails
              </p>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    id="cp1_Document List (NIW)_Online_NIW_Package_06.11.2024.pdf"
                    class="text-body"
                  >
                    1_Document List (NIW)_Online_NIW_Package_06.11.2024.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" id="cp2_Sample Emails.pdf" class="text-body">
                    2_Sample Emails.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cp3_Advanced Degree Documents Instructions.pdf"
                    class="text-body"
                  >
                    3_Advanced Degree Documents Instructions.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cp3_Advanced Degree Documents Instructions_Online_NIW_Package.pdf"
                    class="text-body"
                  >
                    3_Advanced Degree Documents Instructions_Online_NIW_Package.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" id="cp4_Advanced Degree FAQ.pdf" class="text-body">
                    4_Advanced Degree FAQ.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" id="cp5a_Translation_Affidavit.docx" class="text-body">
                    5a_Translation_Affidavit.docx
                  </a>
                </li>
                <li>
                  <a href="javascript:;" id="cp5b_Name_Affidavit.docx" class="text-body">
                    5b_Name_Affidavit.docx
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cp5_Translation_Name Affidavit Overview _ FAQ.pdf"
                    class="text-body"
                  >
                    5_Translation_Name Affidavit Overview _ FAQ.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cp6_NIW CASES ONLY PES-EL Samples_11.29.23.zip"
                    class="text-body"
                  >
                    6_NIW CASES ONLY PES-EL Samples_11.29.23.zip
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p class="font-weight-bold ml-3 mb-1">Appendix D - Forms &amp; Instructions</p>
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
              <p>You may also find instructions for each form under the above links.</p>
              <p>
                In addition, please be aware that the amount of filing fee for each application may
                be subject to changes as well. For a list of most up-to-date filing fees, please be
                sure to refer to the above links and USCIS announcements.
              </p>
              <p>
                Please note certain I-485 documents (e.g., forms, employment letter) need to be
                dated within 2 months of the I-485 filing date. Please carefully review the DIY
                packet for further guidance.
              </p>
              <p>
                As a kind reminder, you are NOT required to submit Form I-693 at the time you file
                your I-485, but may do so if you wish. Because of the time-limited validity of Form
                I-693, you may choose to submit your Form I-693 after you file your Form I-485. You
                may also submit Form I-693 in person at an interview in a USCIS field office, if an
                interview is required. By waiting to submit Form I-693, you may avoid having to
                repeat the immigration medical examination.
              </p>
              <p>
                Please also note - For clients who do not retain us for the I-485 petition, we are
                not able to review your forms, documents, cover letter or answer questions related
                to your I-485. No attorney-client relationship is established for your I-485 case if
                we are not retained so we are not able to give any advice that is related in any way
                to your I-485 application, which includes, but is not limited to, filing strategy
                and form/document review. Thank you!
              </p>
              <p class="font-italic">
                DISCLAIMER - By providing you with our I-485 DIY Packet, we do not guarantee that
                your I-485, I-765, and/or I-131 will be approved. We also do not guarantee that
                USCIS will not issue an RFE for your application(s). The I-485 DIY packet is a
                general guide for preparing and submitting the I-485. It does not account for all
                filing situations. If you have a unique situation, the packet may not provide you
                with adequate guidance to properly submit your I-485.
              </p>
            </div>
            <div>
              <p class="font-weight-bold ml-3 mb-1">1_READ FIRST</p>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    id="cpA_READ FIRST_How to Prepare and File I-485.pdf"
                    class="text-body"
                  >
                    A_READ FIRST_How to Prepare and File I-485.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpB_I-485 Document Checklist_DIY.pdf"
                    class="text-body"
                  >
                    B_I-485 Document Checklist_DIY.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" id="cpC_Birth_Document_Instructions.pdf" class="text-body">
                    C_Birth_Document_Instructions.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpD_When to File an I-131 or I-765.pdf"
                    class="text-body"
                  >
                    D_When to File an I-131 or I-765.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpE_If you have EVER held a J-1 or J-2 visa.pdf"
                    class="text-body"
                  >
                    E_If you have EVER held a J-1 or J-2 visa.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpF_Timeline And Steps After Filing The I-485_DIY.pdf"
                    class="text-body"
                  >
                    F_Timeline And Steps After Filing The I-485_DIY.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpG_After I-485 Approval_USCIS guide_Welcome to the US.pdf"
                    class="text-body"
                  >
                    G_After I-485 Approval_USCIS guide_Welcome to the US.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpH_After I-485 Approval_Travel After Getting Your Green Card.pdf"
                    class="text-body"
                  >
                    H_After I-485 Approval_Travel After Getting Your Green Card.pdf
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p class="font-weight-bold ml-3 mb-1">2_Birth Certificate Instructions</p>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    id="cpBirth_Certificates_Instructions.pdf"
                    class="text-body"
                  >
                    Birth_Certificates_Instructions.pdf
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p class="font-weight-bold ml-3 mb-1">3_Forms and Instructions</p>
              <ul>
                <li>
                  <a href="javascript:;" id="cpBlank Forms and Instructions.pdf" class="text-body">
                    Blank Forms and Instructions.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpForm I-485 Instructions for 122322 edition.pdf"
                    class="text-body"
                  >
                    Form I-485 Instructions for 122322 edition.pdf
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p class="font-weight-bold ml-3 mb-1">4_Other Forms</p>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    id="cpI-824 Instructions_Follow-to-Join Benefits for Dependent(s)_DIY.pdf"
                    class="text-body"
                  >
                    I-824 Instructions_Follow-to-Join Benefits for Dependent(s)_DIY.pdf
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p class="font-weight-bold ml-3 mb-1">5_Sample Documents</p>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    id="cp485_Employment Letter_TEMPLATE.pdf"
                    class="text-body"
                  >
                    485_Employment Letter_TEMPLATE.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpI-485 Personal Statement Outline.pdf"
                    class="text-body"
                  >
                    I-485 Personal Statement Outline.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpPh_D_ Candidate Employment Letter TEMPLATE.pdf"
                    class="text-body"
                  >
                    Ph_D_ Candidate Employment Letter TEMPLATE.pdf
                  </a>
                </li>
                <li>
                  <a href="javascript:;" id="cpSample NABC.pdf" class="text-body">
                    Sample NABC.pdf
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpSworn Statement_Military Service_SAMPLE.pdf"
                    class="text-body"
                  >
                    Sworn Statement_Military Service_SAMPLE.pdf
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p class="font-weight-bold ml-3 mb-1">6_Sample Cover Letters</p>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    id="cpSample I-485 cover letter_EB1A.docx"
                    class="text-body"
                  >
                    Sample I-485 cover letter_EB1A.docx
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpSample I-485 cover letter_EB1B.docx"
                    class="text-body"
                  >
                    Sample I-485 cover letter_EB1B.docx
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:;"
                    id="cpSample I-485 cover letter_NIW.docx"
                    class="text-body"
                  >
                    Sample I-485 cover letter_NIW.docx
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p class="font-weight-bold ml-3 mb-1">7_EAD/AP Renewal Packet</p>
              <ul>
                <li>
                  <a
                    href="javascript:;"
                    id="cpEAD and AP Renewal Instructions.zip"
                    class="text-body"
                  >
                    EAD and AP Renewal Instructions.zip
                  </a>
                </li>
              </ul>
            </div>
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
          With so much content to display at once, and often so little screen real-estate, Cards
          have fast become the design pattern of choice for many companies, including the likes of
          Google and Twitter.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      tab: ref('one'),
    }
  },
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 100%
</style>
