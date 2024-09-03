// chetan patil - [21/07/2023] - Rate revision page
import "./Submit.css";
import { Button } from "../../common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import { sendAllData } from "../../actions/all";
import { EMPTY_CANDIDATE_DATA } from "../../utils/candidateutil";
import { EMPTY_CLIENT_DATA } from "../../utils/clientutil";
import HomepageScreen from "../Homepage";
import { useNavigate } from "react-router-dom";
import { isTextValid } from "../../helpers/validate";
import { setRateRevisionValidation } from "../../actions/raterevision";
import { setDocValidation } from "../../actions/documentation";
import { setCandidateValidation } from "../../actions/candidate";
import { setBgValidation } from "../../actions/backgroundCheck";
import { setVendorValidation } from "../../actions/vendor";
import { setClientValidation } from "../../actions/client";
import { setJobValidation } from "../../actions/job";
import { setStartEndValidation } from "../../actions/startendoperations";
import Swal from "sweetalert2";
import { EMPTY_REFERRAL_DATA } from "../../utils/referral";

export const Submit: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentRateRevisionData = useAppSelector(
    (state: RootState) => state?.rateRevision?.rateRevisionData
  );
  const currentJobData = useAppSelector(
    (state: RootState) => state.job.jobData
  );
  const currentCandidateData = useAppSelector(
    (state: RootState) => state.candidate.candidateData
  );
  const currentClientData = useAppSelector(
    (state: RootState) => state.client.clientData
  );
  const currentVendorData = useAppSelector(
    (state: RootState) => state.vendor.vendorData
  );
  const currentReferralData = useAppSelector(
    (state: RootState) => state.referral.referralData
  );
  const currentBGCData = useAppSelector(
    (state: RootState) => state?.backgroundCheck?.backgroundCheckData
  );
  const currentDocumentationData = useAppSelector(
    (state: RootState) => state?.documentation?.documentationData
  );
  const currentStartEndOperationsData = useAppSelector(
    (state: RootState) => state.startEndOperations.startEndOperationsData
  );
  console.log("currentReferralData: ", currentReferralData);

  const navigate = useNavigate();

  const validationRateRevisionData = useAppSelector(
    (state: RootState) => state?.rateRevision?.rateRevisionValidationData
  );
  console.log("validationRateRevisionData: ", validationRateRevisionData);

  function onSubmitClick() {
    const candidateDataToSend: typeof EMPTY_CANDIDATE_DATA = {
      firstName: currentCandidateData.firstName,
      middleName: currentCandidateData.middleName,
      lastName: currentCandidateData.lastName,
      line1: currentCandidateData.line1,
      line2: currentCandidateData.line2,
      city: currentCandidateData.city,
      state: currentCandidateData.state?.value,
      zipCode: currentCandidateData.zipCode,
      country: currentCandidateData.country,
      email: currentCandidateData.email,
      contactNumber: currentCandidateData.contactNumber,
      faxNumber: currentCandidateData.faxNumber,
      workAuthorization: currentCandidateData.workAuthorization?.value,
      workAuthorizationExpiryDate:
        currentCandidateData.workAuthorizationExpiryDate,
      referralCase: currentCandidateData?.referralCase
        ? currentCandidateData?.referralCase
        : false,
      // contractType: currentClientData.contractType.value,
      // workingFrom: currentJobData.workingFrom,
      // workType: currentJobData.workType.value,
      // skillSet: currentJobData.skillSet,
      // resumeSource: currentJobData.resumeSource.value,
    };

    const referralDataToSend: typeof EMPTY_REFERRAL_DATA = {
      companyName: currentReferralData.companyName,
      federalID: currentReferralData.federalID,
      contactPerson: currentReferralData.contactPerson,
      email: currentReferralData.email,
      contactNumber: currentReferralData.contactNumber,
      faxNumber: currentReferralData.faxNumber,
      signAuthority: currentReferralData.signAuthority,
      signAuthorityDesignation: currentReferralData.signAuthorityDesignation,
      stateOfIncorporation: currentReferralData.stateOfIncorporation,
      line1: currentReferralData.line1,
      line2: currentReferralData.line2,
      city: currentReferralData.city,
      state: currentReferralData.state,
      zipCode: currentReferralData.zipCode,
      country: currentReferralData.country,
    };

    const clientDataToSend = {
      id: currentClientData.id,
      addressId: currentClientData.addressId,
      // clientName: currentClientData.clientName.value.clientName,
      contractType: currentClientData.contractType?.value,
      // endClientName: currentClientData.endClientName,
      // mspName: currentClientData.mspName,
      // line1: currentClientData.line1,
      // line2: currentClientData.line2,
      // city: currentClientData.city,
      // state: currentClientData.state.value,
      // zipCode: currentClientData.zipCode,
      // country: currentClientData.country
    };
    const vendorDataToSent = {
      id: currentVendorData.id,
      // companyName: currentVendorData.companyName.value,
      // federalID: currentVendorData.federalID,
      // contactPerson: currentVendorData.contactPerson,
      // companyEmailID: currentVendorData.companyEmailID,
      // contactNo: currentVendorData.contactNo,
      // faxNo: currentVendorData.faxNo,
      // signAuthority: currentVendorData.signAuthority,
      // signAuthorityDesignation: currentVendorData.signAuthorityDesignation,
      // stateOfIncorporation: currentVendorData.stateOfIncorporation,
      // line1: currentVendorData.line1,
      // line2: currentVendorData.line2,
      // city: currentVendorData.city,
      // state: currentVendorData.state.value,
      // zipCode: currentVendorData.zipCode,
      // country: currentVendorData.country
    };
    // const referralDataToSend = {
    //     id: currentReferralData.id
    //     // companyName: currentReferralData.companyName.value,
    //     // federalID: currentReferralData.federalID,
    //     // contactPerson: currentReferralData.contactPerson,
    //     // companyEmailID: currentReferralData.companyEmailID,
    //     // contactNo: currentReferralData.contactNo,
    //     // faxNo: currentReferralData.faxNo,
    //     // signAuthority: currentReferralData.signAuthority,
    //     // signAuthorityDesignation: currentReferralData.signAuthorityDesignation,
    //     // stateOfIncorporation: currentReferralData.stateOfIncorporation,
    //     // line1: currentReferralData.line1,
    //     // line2: currentReferralData.line2,
    //     // city: currentReferralData.city,
    //     // state: currentReferralData.state.value,
    //     // zipCode: currentReferralData.zipCode,
    //     // country: currentReferralData.country
    // }
    const jobDataToSend = {
      id: currentJobData.id,
      // requestID: currentJobData.requestID,
      // jobDivaID: currentJobData.jobDivaID,
      // jobTitle: currentJobData.jobTitle,
      workingFrom: currentJobData.workingFrom,
      workType: currentJobData.workType?.value,
      // jobType: currentJobData.jobType.value,
      resumeSource: currentJobData.resumeSource?.value,
      // lineOfBusiness: currentJobData.lineOfBusiness.value,
      skillSet: currentJobData.skillSet,
      // jobDescription: currentJobData.jobDescription
    };
    const BGCDataToSend = {
      caseID1: currentBGCData.caseID1,
      BGCInitiatedOn: currentBGCData.BGCInitiatedOn,
      primaryBGCInitiatedThru: currentBGCData.primaryBGCInitiatedThru?.value,
      BGCPackage1: currentBGCData.BGCPackage1?.value,
      BGCPackage2: currentBGCData.BGCPackage2?.value,
      BGCInvoiceMonth: currentBGCData.BGCInvoiceMonth?.value,
      BGCChargesPrimary: currentBGCData.BGCChargesPrimary,
      secondary: currentBGCData?.secondary ? currentBGCData?.secondary : false,
      caseID2: currentBGCData.caseID2,
      secondaryBGCInitiatedOn: currentBGCData.secondaryBGCInitiatedOn,
      secondaryBGCInitiatedThru:
        currentBGCData.secondaryBGCInitiatedThru?.value,
      secondaryBGCPackage1: currentBGCData.secondaryBGCPackage1?.value,
      secondaryBGCPackage2: currentBGCData.secondaryBGCPackage2?.value,
      secondaryBGCInvoiceMonth: currentBGCData.secondaryBGCInvoiceMonth?.value,
      secondaryBGCCharges: currentBGCData.secondaryBGCCharges,
      tertiary: currentBGCData?.tertiary ? currentBGCData?.tertiary : false,
      caseID3: currentBGCData.caseID3,
      tertiaryBGCInitiatedOn: currentBGCData.tertiaryBGCInitiatedOn,
      tertiaryBGCInitiatedThru: currentBGCData.tertiaryBGCInitiatedThru?.value,
      tertiaryBGCPackage1: currentBGCData.tertiaryBGCPackage1?.value,
      tertiaryBGCPackage2: currentBGCData.tertiaryBGCPackage2?.value,
      tertiaryBGCInvoiceMonth: currentBGCData.tertiaryBGCInvoiceMonth?.value,
      tertiaryBGCCharges: currentBGCData.tertiaryBGCCharges,
      BGCStatus: currentBGCData.BGCStatus?.value,
      BGCCompletedOn: currentBGCData.BGCCompletedOn,
      BGCAffidavitStatus: currentBGCData.BGCAffidavitStatus?.value,
      BGCAffidavitOn: currentBGCData.BGCAffidavitOn,
      BGCReportStatus: currentBGCData.BGCReportStatus?.value,
      BGCAdjuStatus: currentBGCData.BGCAdjuStatus?.value,
      adjuSupportingDocs: currentBGCData.adjuSupportingDocs,
      dateOfAdjudication: currentBGCData.dateOfAdjudication,
      finalBGCReport: currentBGCData.finalBGCReport?.value,
      BGCRemark: currentBGCData.BGCRemark,
    };
    const documentationDataToSend = {
      articlesOrCertificateOFIncorporation:
        currentDocumentationData.articlesOrCertificateOFIncorporation?.value,
      w9Orw4: currentDocumentationData.w9Orw4?.value,
      directDepositAgreement:
        currentDocumentationData.directDepositAgreement?.value,
      voidCheckOrEmailContent:
        currentDocumentationData.voidCheckOrEmailContent?.value,
      CIPCICICAOrCIPCICU: currentDocumentationData.CIPCICICAOrCIPCICU?.value,
      goodStandingDocument:
        currentDocumentationData.goodStandingDocument?.value,
      workAuthorizationDocument:
        currentDocumentationData.workAuthorizationDocument?.value,
      I9Form: currentDocumentationData.I9Form?.value,
      listADocument: currentDocumentationData.listADocument?.value,
      listBDocument: currentDocumentationData.listBDocument?.value,
      listCDocument: currentDocumentationData.listCDocument?.value,
      E_verify: currentDocumentationData.E_verify?.value,
      E_verificationDate: currentDocumentationData.E_verificationDate,
      emergencyForm: currentDocumentationData.emergencyForm?.value,
      vaccinationStatus: currentDocumentationData.vaccinationStatus?.value,
      MSA: currentDocumentationData.MSA?.value,
      SOW: currentDocumentationData.SOW?.value,
      SOWValidity: currentDocumentationData.SOWValidity,
      certificateOFInsuranceOrCOI:
        currentDocumentationData.certificateOFInsuranceOrCOI?.value,
      certificationOfInsurance:
        currentDocumentationData.certificationOfInsurance,
      clientTaskOrderOrSOW:
        currentDocumentationData.clientTaskOrderOrSOW?.value,
      clientTaskOrderOrSOWst:
        currentDocumentationData.clientTaskOrderOrSOWst?.value,
      clientTaskOrderSigning:
        currentDocumentationData.clientTaskOrderSigning?.value,
      TaskOrderExpiryDate: currentDocumentationData.TaskOrderExpiryDate,
      documentationStatus: currentDocumentationData.documentationStatus?.value,
      documentationRemark: currentDocumentationData.documentationRemark,
      documentationCompletionDate:
        currentDocumentationData.documentationCompletionDate,
    };
    const startEndOperationsDataToSend = {
      joiningStatus: currentStartEndOperationsData.joiningStatus?.value,
      joiningType: currentStartEndOperationsData.joiningType?.value,
      joiningStatusRemark: currentStartEndOperationsData.joiningStatusRemark,
      recruiter: currentStartEndOperationsData.recruiter,
      teamLead: currentStartEndOperationsData.teamLead,
      crm: currentStartEndOperationsData.crm,
      teamManager: currentStartEndOperationsData.teamManager,
      seniorManager: currentStartEndOperationsData.seniorManager,
      assoDirector: currentStartEndOperationsData.assoDirector,
      centerHead: currentStartEndOperationsData.centerHead,
      onsiteAccDirector: currentStartEndOperationsData.onsiteAccDirector,
      onboCoordinator: currentStartEndOperationsData.onboCoordinator,
      endDate: currentStartEndOperationsData.endDate,
      exitClearance: currentStartEndOperationsData.exitClearance.value,
      endReason: currentStartEndOperationsData.endReason.value,
      endRemarks: currentStartEndOperationsData.endRemarks,
      grossBr: currentStartEndOperationsData.grossBr,
      mspFeePercentage: currentStartEndOperationsData.mspFeePercentage,
      mspFee: currentStartEndOperationsData.mspFee,
      payRate: currentStartEndOperationsData.payRate,
      refFee: currentStartEndOperationsData.refFee,
      taxOHPercentage: currentStartEndOperationsData.taxOHPercentage,
      taxOH: currentStartEndOperationsData.taxOH,
      hBenefitesOpted: currentStartEndOperationsData.hBenefitesOpted.value,
      hBenefitesCost: currentStartEndOperationsData.hBenefitesCost,
      netBillRate: currentStartEndOperationsData.netBillRate,
      netPurchase: currentStartEndOperationsData.netPurchase,
      margin: currentStartEndOperationsData.margin,
      fullTimeSalaryOffered:
        currentStartEndOperationsData.fullTimeSalaryOffered,
      jobLevel: currentStartEndOperationsData.jobLevel?.value,
      ffInvoiceStatus: currentStartEndOperationsData.ffInvoiceStatus?.value,
    };
    const rateRevisionDataToSend = {
      grossBr: currentRateRevisionData.grossBr,
      mspFeePercentage: currentRateRevisionData.mspFeePercentage,
      mspFee: currentRateRevisionData.mspFee,
      netBillRate: currentRateRevisionData.netBillRate,
      payRate: currentRateRevisionData.payRate,
      refFee: currentRateRevisionData.refFee,
      taxOHPercentage: currentRateRevisionData.taxOHPercentage,
      taxOH: currentRateRevisionData.taxOH,
      optedForHB: currentRateRevisionData.optedForHB?.value,
      healthB: currentRateRevisionData.healthB,
      netPurchase: currentRateRevisionData.netPurchase,
      margin: currentRateRevisionData.margin,
      rateRevisionReason: currentRateRevisionData.rateRevisionReason,
    };

    console.log("clientDataToSend: ", clientDataToSend);

    if (!isTextValid(currentRateRevisionData?.grossBr)) {
      dispatch(
        setRateRevisionValidation(
          "grossBrValid",
          "Gross BR should not be empty."
        )
      );
    }
    if (!isTextValid(currentRateRevisionData?.mspFeePercentage)) {
      dispatch(
        setRateRevisionValidation(
          "mspFeePercentageValid",
          "MSP fee in percentage should not be empty."
        )
      );
    }
    if (!isTextValid(currentRateRevisionData?.mspFee)) {
      dispatch(
        setRateRevisionValidation("mspFeeValid", "MSP fee should not be empty.")
      );
    }
    if (!isTextValid(currentRateRevisionData?.netBillRate)) {
      dispatch(
        setRateRevisionValidation(
          "netBillRateValid",
          "Net bill rate should not be empty."
        )
      );
    }
    if (!isTextValid(currentRateRevisionData?.payRate)) {
      dispatch(
        setRateRevisionValidation(
          "payRateValid",
          "Pay rate should not be empty."
        )
      );
    }
    if (!isTextValid(currentRateRevisionData?.refFee)) {
      dispatch(
        setRateRevisionValidation(
          "refFeeValid",
          "Referral fee should not be empty."
        )
      );
    }
    if (!isTextValid(currentRateRevisionData?.taxOHPercentage)) {
      dispatch(
        setRateRevisionValidation(
          "taxOHPercentageValid",
          "Tax OH percentage should not be empty."
        )
      );
    }
    if (!isTextValid(currentRateRevisionData?.optedForHB?.value)) {
      dispatch(
        setRateRevisionValidation(
          "optedForHBValid",
          "Opted for health benefits should not be empty."
        )
      );
    }
    if (!isTextValid(currentRateRevisionData?.taxOH)) {
      dispatch(
        setRateRevisionValidation("taxOHValid", "Tax OH should not be empty.")
      );
    }
    if (!isTextValid(currentRateRevisionData?.healthB)) {
      dispatch(
        setRateRevisionValidation(
          "healthBValid",
          "Health benefits cost should not be empty."
        )
      );
    }
    if (!isTextValid(currentRateRevisionData?.netPurchase)) {
      dispatch(
        setRateRevisionValidation(
          "netPurchaseValid",
          "Net purchase should not be empty."
        )
      );
    }
    if (!isTextValid(currentRateRevisionData?.margin)) {
      dispatch(
        setRateRevisionValidation("marginValid", "Margin should not be empty.")
      );
    }
    if (!isTextValid(currentRateRevisionData?.rateRevisionReason)) {
      dispatch(
        setRateRevisionValidation(
          "rateRevisionReasonValid",
          "Rate revision reason should not be empty."
        )
      );
    }

    if (
      validationRateRevisionData?.grossBrValid === " " &&
      validationRateRevisionData?.mspFeePercentageValid === " " &&
      validationRateRevisionData?.mspFeeValid === " " &&
      validationRateRevisionData?.netBillRateValid === " " &&
      validationRateRevisionData?.payRateValid === " " &&
      validationRateRevisionData?.refFeeValid === " " &&
      validationRateRevisionData?.taxOHPercentageValid === " " &&
      validationRateRevisionData?.optedForHBValid === " " &&
      validationRateRevisionData?.taxOHValid === " " &&
      validationRateRevisionData?.healthBValid === " " &&
      validationRateRevisionData?.netPurchaseValid === " " &&
      validationRateRevisionData?.marginValid === " " &&
      validationRateRevisionData?.rateRevisionReasonValid
    ) {
      dispatch(
        sendAllData(
          candidateDataToSend,
          clientDataToSend,
          vendorDataToSent,
          referralDataToSend,
          jobDataToSend,
          BGCDataToSend,
          documentationDataToSend,
          startEndOperationsDataToSend,
          rateRevisionDataToSend
        )
      );

      navigate("/home-page");

      dispatch(setCandidateValidation("firstNameValid", ""));
      dispatch(setCandidateValidation("middleNameValid", ""));
      dispatch(setCandidateValidation("lastNameValid", ""));
      dispatch(setCandidateValidation("line1Valid", ""));
      dispatch(setCandidateValidation("line2Valid", ""));
      dispatch(setCandidateValidation("cityValid", ""));
      dispatch(setCandidateValidation("stateValid", ""));
      dispatch(setCandidateValidation("zipCodeValid", ""));
      dispatch(setCandidateValidation("countryValid", ""));
      dispatch(setCandidateValidation("emailValid", ""));
      dispatch(setCandidateValidation("emailValid", ""));
      dispatch(setCandidateValidation("contactNumberValid", ""));
      dispatch(setCandidateValidation("workAuthorizationValid", ""));
      dispatch(setCandidateValidation("workAuthorizationExpiryDateValid", ""));
      dispatch(setClientValidation("clientNameValid", ""));
      dispatch(setClientValidation("contractTypeValid", ""));
      dispatch(setVendorValidation("companyNameValid", ""));
      dispatch(setJobValidation("jobTitleValid", ""));
      dispatch(setJobValidation("workingFromValid", ""));
      dispatch(setJobValidation("workTypeValid", ""));
      dispatch(setJobValidation("resumeSourceValid", ""));
      dispatch(setJobValidation("skillSetValid", ""));
      dispatch(setBgValidation("caseID1Valid", ""));
      dispatch(setBgValidation("BGCInitiatedOnValid", ""));
      dispatch(setBgValidation("primaryBGCInitiatedThruValid", ""));
      dispatch(setBgValidation("BGCPackage1Valid", ""));
      dispatch(setBgValidation("BGCPackage2Valid", ""));
      dispatch(setBgValidation("BGCInvoiceMonthValid", ""));
      dispatch(setBgValidation("BGCChargesPrimaryValid", ""));
      dispatch(setBgValidation("BGCStatusValid", ""));
      dispatch(setBgValidation("BGCCompletedOnValid", ""));
      dispatch(setBgValidation("BGCAffidavitStatusValid", ""));
      dispatch(setBgValidation("BGCAffidavitOnValid", ""));
      dispatch(setBgValidation("BGCReportStatusValid", ""));
      dispatch(setBgValidation("BGCAdjuStatusValid", ""));
      dispatch(setBgValidation("adjuSupportingDocsValid", ""));
      dispatch(setBgValidation("dateOfAdjudicationValid", ""));
      dispatch(setBgValidation("finalBGCReportValid", ""));
      dispatch(setBgValidation("BGCRemarkValid", ""));
      dispatch(setBgValidation("caseID2Valid", ""));
      dispatch(setBgValidation("secondaryBGCInitiatedOnValid", ""));
      dispatch(setBgValidation("secondaryBGCInitiatedThruValid", ""));
      dispatch(setBgValidation("secondaryBGCPackage1Valid", ""));
      dispatch(setBgValidation("secondaryBGCPackage2Valid", ""));
      dispatch(setBgValidation("secondaryBGCInvoiceMonthValid", ""));
      dispatch(setBgValidation("secondaryBGCInvoiceMonthValid", ""));
      dispatch(setBgValidation("secondaryBGCChargesValid", ""));
      dispatch(setBgValidation("caseID3Valid", ""));
      dispatch(setBgValidation("tertiaryBGCInitiatedOnValid", ""));
      dispatch(setBgValidation("tertiaryBGCInitiatedThruValid", ""));
      dispatch(setBgValidation("tertiaryBGCPackage1Valid", ""));
      dispatch(setBgValidation("tertiaryBGCPackage2Valid", ""));
      dispatch(setBgValidation("tertiaryBGCInvoiceMonthValid", ""));
      dispatch(setBgValidation("tertiaryBGCChargesValid", ""));
      dispatch(
        setDocValidation("articlesOrCertificateOFIncorporationValid", "")
      );
      dispatch(setDocValidation("w9Orw4Valid", ""));
      dispatch(setDocValidation("directDepositAgreementValid", ""));
      dispatch(setDocValidation("voidCheckOrEmailContentValid", ""));
      dispatch(setDocValidation("CIPCICICAOrCIPCICUValid", ""));
      dispatch(setDocValidation("goodStandingDocumentValid", ""));
      dispatch(setDocValidation("workAuthorizationDocumentValid", ""));
      dispatch(setDocValidation("I9FormValid", ""));
      dispatch(setDocValidation("listADocumentValid", ""));
      dispatch(setDocValidation("listBDocumentValid", ""));
      dispatch(setDocValidation("listCDocumentValid", ""));
      dispatch(setDocValidation("E_verifyValid", ""));
      dispatch(setDocValidation("E_verificationDateValid", ""));
      dispatch(setDocValidation("emergencyFormValid", ""));
      dispatch(setDocValidation("vaccinationStatusValid", ""));
      dispatch(setDocValidation("clientTaskOrderOrSOWstValid", ""));
      dispatch(setDocValidation("MSAValid", ""));
      dispatch(setDocValidation("SOWValid", ""));
      dispatch(setDocValidation("SOWValidityValid", ""));
      dispatch(setDocValidation("certificateOFInsuranceOrCOIValid", ""));
      dispatch(setDocValidation("certificationOfInsuranceValid", ""));
      dispatch(setDocValidation("clientTaskOrderOrSOWValid", ""));
      dispatch(setDocValidation("clientTaskOrderOrSOWstValid", ""));
      dispatch(setDocValidation("clientTaskOrderSigningValid", ""));
      dispatch(setDocValidation("TaskOrderExpiryDateValid", ""));
      dispatch(setDocValidation("documentationStatusValid", ""));
      dispatch(setDocValidation("documentationRemarkValid", ""));
      dispatch(setDocValidation("documentationCompletionDateValid", ""));
      dispatch(setStartEndValidation("recruiterValid", ""));
      dispatch(setStartEndValidation("teamLeadValid", ""));
      dispatch(setStartEndValidation("crmValid", ""));
      dispatch(setStartEndValidation("teamManagerValid", ""));
      dispatch(setStartEndValidation("seniorManagerValid", ""));
      dispatch(setStartEndValidation("assoDirectorValid", ""));
      dispatch(setStartEndValidation("centerHeadValid", ""));
      dispatch(setStartEndValidation("onsiteAccDirectorValid", ""));
      dispatch(setStartEndValidation("onboCoordinatorValid", ""));
      dispatch(setStartEndValidation("endDateValid", ""));
      dispatch(setStartEndValidation("grossBrValid", ""));
      dispatch(setStartEndValidation("mspFeePercentageValid", ""));
      dispatch(setStartEndValidation("mspFeeValid", ""));
      dispatch(setStartEndValidation("payRateValid", ""));
      dispatch(setStartEndValidation("refFeeValid", ""));
      dispatch(setStartEndValidation("taxOHPercentageValid", ""));
      dispatch(setStartEndValidation("taxOHValid", ""));
      dispatch(setStartEndValidation("hBenefitesOptedValid", ""));
      dispatch(setStartEndValidation("hBenefitesCostValid", ""));
      dispatch(setStartEndValidation("netBillRateValid", ""));
      dispatch(setStartEndValidation("netPurchaseValid", ""));
      dispatch(setStartEndValidation("marginValid", ""));
      dispatch(setStartEndValidation("fullTimeSalaryOfferedValid", ""));
      dispatch(setStartEndValidation("joiningStatusValid", ""));
      dispatch(setStartEndValidation("joiningTypeValid", ""));
      dispatch(setStartEndValidation("exitClearanceValid", ""));
      dispatch(setStartEndValidation("endReasonValid", ""));
      dispatch(setStartEndValidation("jobLevelValid", ""));
      dispatch(setStartEndValidation("ffInvoiceStatusValid", ""));
      dispatch(setStartEndValidation("joiningStatusRemarkValid", ""));
      dispatch(setStartEndValidation("endRemarksValid", ""));
      dispatch(setRateRevisionValidation("grossBrValid", ""));
      dispatch(setRateRevisionValidation("mspFeePercentageValid", ""));
      dispatch(setRateRevisionValidation("mspFeeValid", ""));
      dispatch(setRateRevisionValidation("netBillRateValid", ""));
      dispatch(setRateRevisionValidation("payRateValid", ""));
      dispatch(setRateRevisionValidation("refFeeValid", ""));
      dispatch(setRateRevisionValidation("taxOHPercentageValid", ""));
      dispatch(setRateRevisionValidation("optedForHBValid", ""));
      dispatch(setRateRevisionValidation("taxOHValid", ""));
      dispatch(setRateRevisionValidation("healthBValid", ""));
      dispatch(setRateRevisionValidation("netPurchaseValid", ""));
      dispatch(setRateRevisionValidation("marginValid", ""));
      dispatch(setRateRevisionValidation("rateRevisionReasonValid", ""));
    } else {
      Swal.fire({
        icon: "error",
        title: "Whoops!",
        text: "Sorry, errors prevented this registration from going to next page. Please correct errors and try again.",
      });
    }
  }

  return (
    <>
      <div className="m-auto w-[10%] mt-5 text-white">
        <Button
          className=""
          value="Submit"
          handleClick={() => onSubmitClick()}
        />
      </div>
    </>
  );
};
