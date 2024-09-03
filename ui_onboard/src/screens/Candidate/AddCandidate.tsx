import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Fab from "@mui/material/Fab";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import "./AddCandidate.css";
import CandidateDetails from "./CandidateDetails";
import ClientDetails from "../Client/ClientDetails";
import { Box } from "@mui/material";
import VendorDetails from "../Vendor/VendorDetails";
import ReferralDetails from "../Referral/ReferralDetails";
import JobDetails from "../Job/JobDetails";
import BackgroundVerification from "../BackgroundCheck";
import { DocumentationScreen } from "../Documentation";
import StartEndOperationsScreen from "../StartEndOperations";
import RateRevisionScreen from "../RateRevision";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { allClientData, setClientValidation } from "../../actions/client";
import { allJobData, setJobValidation } from "../../actions/job";
import { allVendorData, setVendorValidation } from "../../actions/vendor";
import BasicDetails from "./BasicDetails";
import { useLocation } from "react-router";
import { RootState } from "../../redux/store";
import { isEmailValid, isTextValid } from "../../helpers/validate";
import { candidateData, setCandidateValidation } from "../../actions/candidate";
import { setBgValidation } from "../../actions/backgroundCheck";
import { setDocValidation } from "../../actions/documentation";
import { setStartEndValidation } from "../../actions/startendoperations";
import Swal from "sweetalert2";
import { setReferralValidation } from "../../actions/referral";

const AddCandidate: React.FC = () => {
  const dispatch = useAppDispatch();
  const [stepCount, setStepCount] = useState(1);
  const location = useLocation();

  const steps = [
    "Basic Details",
    "Background Check",
    "Documentation",
    "Start/End Operations",
    "Rate Revision",
  ];
  const [referral, setReferral] = useState<Boolean>(false);

  useEffect(() => {
    dispatch(allClientData());
    dispatch(allJobData());
    dispatch(allVendorData());
  });

  const validationCandidateData = useAppSelector(
    (state: RootState) => state.candidate.candidateValidationData
  );

  const currentCandidateData = useAppSelector(
    (state: RootState) => state.candidate.candidateData
  );
  const currentReferralData = useAppSelector(
    (state: RootState) => state.referral.referralData
  );
  console.log("currentCandidateData", currentCandidateData);
  const validationReferralData = useAppSelector(
    (state: RootState) => state.referral.referralValidationData
  );
  console.log("validationReferralData: ", validationReferralData);
  const currentClientData = useAppSelector(
    (state: RootState) => state.client.clientData
  );

  const validationClientData = useAppSelector(
    (state: RootState) => state.client.clientValidationData
  );

  const currentVendorData = useAppSelector(
    (state: RootState) => state.vendor.vendorData
  );
  const validationVendorData = useAppSelector(
    (state: RootState) => state.vendor.vendorValidationData
  );

  const currentJobData = useAppSelector(
    (state: RootState) => state.job.jobData
  );
  const validationJobData = useAppSelector(
    (state: RootState) => state.job.jobValidationData
  );

  const currentBGCData = useAppSelector(
    (state: RootState) => state?.backgroundCheck?.backgroundCheckData
  );

  const validationBgData = useAppSelector(
    (state: RootState) => state.backgroundCheck.bgValidationData
  );
  console.log("validationBgData: ", validationBgData);

  const currentDocumentationData = useAppSelector(
    (state: RootState) => state?.documentation?.documentationData
  );

  console.log("validationReferralData: ", validationReferralData);
  const validationDocData = useAppSelector(
    (state: RootState) => state.documentation.docValidationData
  );

  const currentStartEndOperationsData = useAppSelector(
    (state: RootState) => state?.startEndOperations?.startEndOperationsData
  );

  const validationStartEndOperationsData = useAppSelector(
    (state: RootState) => state?.startEndOperations?.startEndValidationData
  );

  const [case1Flag, setCase1Flag] = useState<boolean>(false);
  const [case2Flag, setCase2Flag] = useState<boolean>(true);
  const [case3Flag, setCase3Flag] = useState<boolean>(true);

  const next = () => {
    // setNextButtonClick(true);
    // console.log('valid: ', valid);
    console.log("validationDocData: ", validationDocData);

    if (stepCount < steps.length) {
      console.log("stepCount: ", stepCount);

      if (stepCount === 1) {
        if (!isTextValid(currentCandidateData?.firstName)) {
          dispatch(
            setCandidateValidation(
              "firstNameValid",
              "First name should not be empty."
            )
          );
        }
        if (!isTextValid(currentCandidateData?.middleName)) {
          dispatch(
            setCandidateValidation(
              "middleNameValid",
              "Middle name should not be empty."
            )
          );
        }
        if (!isTextValid(currentCandidateData?.lastName)) {
          dispatch(
            setCandidateValidation(
              "lastNameValid",
              "Last name should not be empty."
            )
          );
        }
        if (!isTextValid(currentCandidateData?.line1)) {
          dispatch(
            setCandidateValidation("line1Valid", "Line 1 should not be empty.")
          );
        }
        if (!isTextValid(currentCandidateData?.line2)) {
          dispatch(
            setCandidateValidation("line2Valid", "Line 2 should not be empty.")
          );
        }
        if (!isTextValid(currentCandidateData?.city)) {
          dispatch(
            setCandidateValidation("cityValid", "City should not be empty.")
          );
        }
        if (!isTextValid(currentCandidateData?.state?.value)) {
          dispatch(
            setCandidateValidation("stateValid", "State should not be empty.")
          );
        }
        if (!isTextValid(currentCandidateData?.zipCode)) {
          dispatch(
            setCandidateValidation(
              "zipCodeValid",
              "Zip code should not be empty."
            )
          );
        }
        if (!isTextValid(currentCandidateData?.country)) {
          dispatch(
            setCandidateValidation(
              "countryValid",
              "Country should not be empty."
            )
          );
        }
        if (!isEmailValid(currentCandidateData?.email)) {
          dispatch(setCandidateValidation("emailValid", "Email is invalid."));
        }
        if (!isTextValid(currentCandidateData?.email)) {
          dispatch(
            setCandidateValidation("emailValid", "Email should not be empty.")
          );
        }
        if (!isTextValid(currentCandidateData?.contactNumber)) {
          dispatch(
            setCandidateValidation(
              "contactNumberValid",
              "Contact number should not be empty."
            )
          );
        }
        if (!isTextValid(currentCandidateData?.faxNumber)) {
          dispatch(
            setCandidateValidation(
              "faxNumberValid",
              "Fax number should not be empty."
            )
          );
        }
        if (!isTextValid(currentCandidateData?.workAuthorization?.value)) {
          dispatch(
            setCandidateValidation(
              "workAuthorizationValid",
              "Work authorization should not be empty."
            )
          );
        }
        if (!isTextValid(currentCandidateData?.workAuthorizationExpiryDate)) {
          dispatch(
            setCandidateValidation(
              "workAuthorizationExpiryDateValid",
              "Work authorization expiry date should not be empty."
            )
          );
        }
        if (!isTextValid(currentClientData?.clientName?.value?.clientName)) {
          dispatch(
            setClientValidation(
              "clientNameValid",
              "Client name should not be empty."
            )
          );
        }
        if (!isTextValid(currentClientData?.contractType?.value)) {
          dispatch(
            setClientValidation(
              "contractTypeValid",
              "Contract type should not be empty."
            )
          );
        }
        if (!isTextValid(currentVendorData?.companyName?.value?.companyName)) {
          dispatch(
            setVendorValidation(
              "companyNameValid",
              "Company name should not be empty."
            )
          );
        }
        if (!isTextValid(currentJobData?.jobTitle?.value?.jobTitle)) {
          dispatch(
            setJobValidation("jobTitleValid", "Job title should not be empty.")
          );
        }
        if (!isTextValid(currentJobData?.workingFrom)) {
          dispatch(
            setJobValidation(
              "workingFromValid",
              "Working from should not be empty."
            )
          );
        }
        if (!isTextValid(currentJobData?.workType?.value)) {
          dispatch(
            setJobValidation("workTypeValid", "Work type should not be empty.")
          );
        }
        if (!isTextValid(currentJobData?.resumeSource?.value)) {
          dispatch(
            setJobValidation(
              "resumeSourceValid",
              "Resume source should not be empty."
            )
          );
        }
        if (!isTextValid(currentJobData?.skillSet)) {
          dispatch(
            setJobValidation("skillSetValid", "Skill set should not be empty.")
          );
        }
        if (!isTextValid(currentReferralData?.companyName)) {
          dispatch(
            setReferralValidation(
              "companyNameValid",
              "company Name should not be empty."
            )
          );
        }
        if (!isTextValid(currentReferralData?.city)) {
          dispatch(
            setReferralValidation("cityValid", "city should not be empty.")
          );
        }
        if (!isTextValid(currentReferralData?.contactNumber)) {
          dispatch(
            setReferralValidation(
              "contactNumberValid",
              "contact Number should not be empty."
            )
          );
        }
        if (!isTextValid(currentReferralData?.country)) {
          dispatch(
            setReferralValidation(
              "countryValid",
              "country should not be empty."
            )
          );
        }
        if (!isTextValid(currentReferralData?.email)) {
          dispatch(
            setReferralValidation("emailValid", "email should not be empty.")
          );
        }
        if (!isTextValid(currentReferralData?.faxNumber)) {
          dispatch(
            setReferralValidation(
              "faxNumberValid",
              "faxNumber should not be empty."
            )
          );
        }
        if (!isTextValid(currentReferralData?.federalID)) {
          dispatch(
            setReferralValidation(
              "federalIDValid",
              "federalID should not be empty."
            )
          );
        }
        if (!isTextValid(currentReferralData?.line1)) {
          dispatch(
            setReferralValidation("line1Valid", "line1 should not be empty.")
          );
        }
        if (!isTextValid(currentReferralData?.line2)) {
          dispatch(
            setReferralValidation("line2Valid", "line2 should not be empty.")
          );
        }
        if (!isTextValid(currentReferralData?.signAuthority)) {
          dispatch(
            setReferralValidation(
              "signAuthorityValid",
              "signAuthority should not be empty."
            )
          );
        }
        if (!isTextValid(currentReferralData?.signAuthorityDesignation)) {
          dispatch(
            setReferralValidation(
              "signAuthorityDesignationValid",
              "signAuthority Designation should not be empty."
            )
          );
        }
        if (!isTextValid(currentReferralData?.state.value)) {
          dispatch(
            setReferralValidation("stateValid", "state  should not be empty.")
          );
        }
        if (!isTextValid(currentReferralData?.stateOfIncorporation)) {
          dispatch(
            setReferralValidation(
              "stateOfIncorporationValid",
              "state Of Incorporation  should not be empty."
            )
          );
        }
        if (!isTextValid(currentReferralData?.zipCode)) {
          dispatch(
            setReferralValidation(
              "zipCodeValid",
              "zipCode Name should not be empty."
            )
          );
        }
        if (!isTextValid(currentReferralData?.contactPerson)) {
          dispatch(
            setReferralValidation(
              "contactPersonValid",
              "contact Person should not be empty."
            )
          );
        }

        if (
          validationCandidateData?.firstNameValid === " " &&
          validationCandidateData?.middleNameValid === " " &&
          validationCandidateData?.lastNameValid === " " &&
          validationCandidateData?.line1Valid === " " &&
          validationCandidateData?.line2Valid === " " &&
          validationCandidateData?.cityValid === " " &&
          validationCandidateData?.stateValid === " " &&
          validationCandidateData?.zipCodeValid === " " &&
          validationCandidateData?.countryValid === " " &&
          validationCandidateData?.emailValid === " " &&
          validationCandidateData?.contactNumberValid === " " &&
          validationCandidateData?.faxNumberValid === " " &&
          validationCandidateData?.workAuthorizationValid === " " &&
          validationCandidateData?.workAuthorizationExpiryDateValid === " " &&
          validationClientData?.clientNameValid === " " &&
          validationClientData?.contractTypeValid === " " &&
          validationVendorData?.companyNameValid === " " &&
          validationJobData?.jobTitleValid === " " &&
          validationJobData?.workTypeValid === " " &&
          validationJobData?.workingFromValid === " " &&
          validationJobData?.resumeSourceValid === " " &&
          validationJobData?.skillSetValid === " "
          // (!currentCandidateData?.referralCase ||
          //   (validationReferralData?.companyNameValid === " " &&
          //     validationReferralData?.cityValid === " " &&
          //     validationReferralData?.contactNumberValid === " " &&
          //     validationReferralData?.countryValid === " " &&
          //     validationReferralData?.emailValid === " " &&
          //     validationReferralData?.faxNumberValid === " " &&
          //     validationReferralData?.federalIDValid === " " &&
          //     validationReferralData?.line1Valid === " " &&
          //     validationReferralData?.line2Valid === " " &&
          //     validationReferralData?.signAuthorityValid === " " &&
          //     validationReferralData?.signAuthorityDesignationValid === " " &&
          //     validationReferralData?.stateValid === " " &&
          //     validationReferralData?.stateOfIncorporationValid === " " &&
          //     validationReferralData?.zipCodeValid === " " &&
          //     validationReferralData?.contactPersonValid === " "))
        ) {
          console.log("validationReferralData: ", validationReferralData);
          setStepCount(stepCount + 1);
        } else {
          console.log("validationReferralData: ", validationReferralData);
          Swal.fire({
            icon: "error",
            title: "Whoops!",
            text: "Sorry, errors prevented this registration from going to next page. Please correct errors and try again.",
          });
        }
      }

      if (stepCount === 2) {
        // let case1Flag = false;
        // let case2Flag = true;
        // let case3Flag = true;

        if (!isTextValid(currentBGCData?.caseID1)) {
          dispatch(
            setBgValidation("caseID1Valid", "Case id 1 should not be empty.")
          );
        }
        if (!isTextValid(currentBGCData?.BGCInitiatedOn)) {
          dispatch(
            setBgValidation(
              "BGCInitiatedOnValid",
              "BGC initiated on should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.primaryBGCInitiatedThru?.value)) {
          dispatch(
            setBgValidation(
              "primaryBGCInitiatedThruValid",
              "Primary BGC initiated through should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.BGCPackage1?.value)) {
          dispatch(
            setBgValidation(
              "BGCPackage1Valid",
              "BGC package 1 should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.BGCPackage2?.value)) {
          dispatch(
            setBgValidation(
              "BGCPackage2Valid",
              "BGC package 2 should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.BGCInvoiceMonth?.value)) {
          dispatch(
            setBgValidation(
              "BGCInvoiceMonthValid",
              "BGC invoice month should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.BGCChargesPrimary)) {
          dispatch(
            setBgValidation(
              "BGCChargesPrimaryValid",
              "BGC charges primary should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.BGCStatus?.value)) {
          dispatch(
            setBgValidation("BGCStatusValid", "BGC status should not be empty.")
          );
        }
        if (!isTextValid(currentBGCData?.BGCCompletedOn)) {
          dispatch(
            setBgValidation(
              "BGCCompletedOnValid",
              "BGC completed on should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.BGCAffidavitStatus?.value)) {
          dispatch(
            setBgValidation(
              "BGCAffidavitStatusValid",
              "BGC affidavit status should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.BGCAffidavitOn)) {
          dispatch(
            setBgValidation(
              "BGCAffidavitOnValid",
              "BGC affidavit on should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.BGCReportStatus?.value)) {
          dispatch(
            setBgValidation(
              "BGCReportStatusValid",
              "BGC report status should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.BGCAdjuStatus?.value)) {
          dispatch(
            setBgValidation(
              "BGCAdjuStatusValid",
              "BGC adjudication status should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.adjuSupportingDocs)) {
          dispatch(
            setBgValidation(
              "adjuSupportingDocsValid",
              "Adj supporting docs should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.dateOfAdjudication)) {
          dispatch(
            setBgValidation(
              "dateOfAdjudicationValid",
              "Date of adjudication should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.finalBGCReport?.value)) {
          dispatch(
            setBgValidation(
              "finalBGCReportValid",
              "Final BGC report should not be empty."
            )
          );
        }
        if (!isTextValid(currentBGCData?.BGCRemark)) {
          dispatch(
            setBgValidation("BGCRemarkValid", "BGC remark should not be empty.")
          );
        }

        if (
          validationBgData?.caseID1Valid === " " &&
          validationBgData?.BGCInitiatedOnValid === " " &&
          validationBgData?.primaryBGCInitiatedThruValid === " " &&
          validationBgData?.BGCPackage1Valid === " " &&
          validationBgData?.BGCPackage2Valid === " " &&
          validationBgData?.BGCInvoiceMonthValid === " " &&
          validationBgData?.BGCChargesPrimaryValid === " " &&
          validationBgData?.BGCStatusValid === " " &&
          validationBgData?.BGCCompletedOnValid === " " &&
          validationBgData?.BGCAffidavitStatusValid === " " &&
          validationBgData?.BGCAffidavitOnValid === " " &&
          validationBgData?.BGCReportStatusValid === " " &&
          validationBgData?.BGCAdjuStatusValid === " " &&
          validationBgData?.adjuSupportingDocsValid === " " &&
          validationBgData?.dateOfAdjudicationValid === " " &&
          validationBgData?.finalBGCReportValid === " " &&
          validationBgData?.BGCRemarkValid === " "
        ) {
          console.log("hello");
          console.log("currentBGCData: step 2 ", currentBGCData);
          setCase1Flag(true);
        }

        if (currentBGCData?.secondary === true) {
          if (
            !isTextValid(currentBGCData?.caseID2) ||
            validationBgData?.caseID2Valid !== " "
          ) {
            dispatch(
              setBgValidation("caseID2Valid", "Case id 2 should not be empty.")
            );
          }
          if (
            !isTextValid(currentBGCData?.secondaryBGCInitiatedOn) ||
            validationBgData?.secondaryBGCInitiatedOnValid !== " "
          ) {
            dispatch(
              setBgValidation(
                "secondaryBGCInitiatedOnValid",
                "Secondary BGC initiated on should not be empty."
              )
            );
          }
          if (
            !isTextValid(currentBGCData?.secondaryBGCInitiatedThru?.value) ||
            validationBgData?.secondaryBGCInitiatedThruValid !== " "
          ) {
            dispatch(
              setBgValidation(
                "secondaryBGCInitiatedThruValid",
                "Secondary BGC initiated through should not be empty."
              )
            );
          }
          if (
            !isTextValid(currentBGCData?.secondaryBGCPackage1?.value) ||
            validationBgData?.secondaryBGCPackage1Valid !== " "
          ) {
            dispatch(
              setBgValidation(
                "secondaryBGCPackage1Valid",
                "Secondary BGC package 1 should not be empty."
              )
            );
          }
          if (
            !isTextValid(currentBGCData?.secondaryBGCPackage2?.value) ||
            validationBgData?.secondaryBGCPackage2Valid !== " "
          ) {
            dispatch(
              setBgValidation(
                "secondaryBGCPackage2Valid",
                "Secondary BGC package 2 should not be empty."
              )
            );
          }
          if (
            !isTextValid(currentBGCData?.secondaryBGCInvoiceMonth?.value) ||
            validationBgData?.secondaryBGCInvoiceMonthValid !== " "
          ) {
            dispatch(
              setBgValidation(
                "secondaryBGCInvoiceMonthValid",
                "Secondary BGC invoice month should not be empty."
              )
            );
          }
          if (
            !isTextValid(currentBGCData?.secondaryBGCCharges) ||
            validationBgData?.secondaryBGCChargesValid !== " "
          ) {
            dispatch(
              setBgValidation(
                "secondaryBGCChargesValid",
                "Secondary BGC charges primary should not be empty."
              )
            );
          }

          if (
            currentBGCData?.secondary === false ||
            (validationBgData?.caseID2Valid == " " &&
              validationBgData?.secondaryBGCInitiatedOnValid === " " &&
              validationBgData?.secondaryBGCInitiatedThruValid === " " &&
              validationBgData?.secondaryBGCPackage1Valid === " " &&
              validationBgData?.secondaryBGCPackage2Valid === " " &&
              validationBgData?.secondaryBGCInvoiceMonthValid === " " &&
              validationBgData?.secondaryBGCChargesValid === " ")
          ) {
            setCase2Flag(true);
          } else {
            setCase2Flag(false);
          }
        }
        ////////////
        if (currentBGCData?.tertiary === true) {
          if (
            !isTextValid(currentBGCData?.caseID3) ||
            validationBgData?.caseID3Valid !== " "
          ) {
            dispatch(
              setBgValidation("caseID3Valid", "Case id 3 should not be empty.")
            );
          }
          if (
            !isTextValid(currentBGCData?.tertiaryBGCInitiatedOn) ||
            validationBgData?.tertiaryBGCInitiatedOnValid !== " "
          ) {
            dispatch(
              setBgValidation(
                "tertiaryBGCInitiatedOnValid",
                "Tertiary BGC initiated on should not be empty."
              )
            );
          }
          if (
            !isTextValid(currentBGCData?.tertiaryBGCInitiatedThru?.value) ||
            validationBgData?.tertiaryBGCInitiatedThruValid !== " "
          ) {
            dispatch(
              setBgValidation(
                "tertiaryBGCInitiatedThruValid",
                "Tertiary BGC initiated through should not be empty."
              )
            );
          }
          if (
            !isTextValid(currentBGCData?.tertiaryBGCPackage1?.value) ||
            validationBgData?.tertiaryBGCPackage1Valid !== " "
          ) {
            dispatch(
              setBgValidation(
                "tertiaryBGCPackage1Valid",
                "Tertiary BGC package 1 should not be empty."
              )
            );
          }
          if (
            !isTextValid(currentBGCData?.tertiaryBGCPackage2?.value) ||
            validationBgData?.tertiaryBGCPackage2Valid !== " "
          ) {
            dispatch(
              setBgValidation(
                "tertiaryBGCPackage2Valid",
                "Tertiary BGC package 2 should not be empty."
              )
            );
          }
          if (
            !isTextValid(currentBGCData?.tertiaryBGCInvoiceMonth?.value) ||
            validationBgData?.tertiaryBGCInvoiceMonthValid !== " "
          ) {
            dispatch(
              setBgValidation(
                "tertiaryBGCInvoiceMonthValid",
                "Tertiary BGC invoice month should not be empty."
              )
            );
          }
          if (
            !isTextValid(currentBGCData?.tertiaryBGCCharges) ||
            validationBgData?.tertiaryBGCChargesValid !== " "
          ) {
            dispatch(
              setBgValidation(
                "tertiaryBGCChargesValid",
                "Tertiary BGC charges primary should not be empty."
              )
            );
          }
        }

        if (
          currentBGCData?.tertiary === false ||
          (validationBgData?.caseID3Valid === " " &&
            validationBgData?.tertiaryBGCInitiatedOnValid === " " &&
            validationBgData?.tertiaryBGCInitiatedThruValid === " " &&
            validationBgData?.tertiaryBGCPackage1Valid === " " &&
            validationBgData?.tertiaryBGCPackage2Valid === " " &&
            validationBgData?.tertiaryBGCInvoiceMonthValid === " " &&
            validationBgData?.tertiaryBGCChargesValid === " ")
        ) {
          setCase3Flag(true);
        } else {
          setCase3Flag(false);
        }

        console.log("case1Flag: ", case1Flag);
        console.log("case2Flag: ", case2Flag);
        console.log("case3Flag: ", case3Flag);
        if (
          case1Flag &&
          (case2Flag || !currentBGCData?.secondary) &&
          (case3Flag || !currentBGCData?.tertiary)
        ) {
          setStepCount(stepCount + 1);
        }
        // else {
        //   Swal.fire({
        //     icon: "error",
        //     title: "Whoops!",
        //     text: "Sorry, errors prevented this registration from going to next page. Please correct errors and try again.",
        //   });
        // }
        // console.log('case1Flag: ', case1Flag);
        // console.log('case2Flag: ', case2Flag);
        // console.log('case3Flag: ', case3Flag);
      }

      if (stepCount === 3) {
        if (
          !isTextValid(
            currentDocumentationData?.articlesOrCertificateOFIncorporation
              ?.value
          )
        ) {
          dispatch(
            setDocValidation(
              "articlesOrCertificateOFIncorporationValid",
              "Articles should not be empty."
            )
          );
        }
        if (!isTextValid(currentDocumentationData?.w9Orw4?.value)) {
          dispatch(
            setDocValidation("w9Orw4Valid", "W9 or W4 should not be empty.")
          );
        }
        if (
          !isTextValid(currentDocumentationData?.directDepositAgreement?.value)
        ) {
          dispatch(
            setDocValidation(
              "directDepositAgreementValid",
              "Direct deposit agreement should not be empty."
            )
          );
        }
        if (
          !isTextValid(currentDocumentationData?.voidCheckOrEmailContent?.value)
        ) {
          dispatch(
            setDocValidation(
              "voidCheckOrEmailContentValid",
              "Void check content should not be empty."
            )
          );
        }
        if (!isTextValid(currentDocumentationData?.CIPCICICAOrCIPCICU?.value)) {
          dispatch(
            setDocValidation(
              "CIPCICICAOrCIPCICUValid",
              "CIPCICICA or CIPCICU should not be empty."
            )
          );
        }
        if (
          !isTextValid(currentDocumentationData?.goodStandingDocument?.value)
        ) {
          dispatch(
            setDocValidation(
              "goodStandingDocumentValid",
              "Good standing document should not be empty."
            )
          );
        }
        if (
          !isTextValid(
            currentDocumentationData?.workAuthorizationDocument?.value
          )
        ) {
          dispatch(
            setDocValidation(
              "workAuthorizationDocumentValid",
              "Work authorization document should not be empty."
            )
          );
        }
        if (!isTextValid(currentDocumentationData?.I9Form?.value)) {
          dispatch(
            setDocValidation("I9FormValid", "I9 form should not be empty.")
          );
        }
        if (!isTextValid(currentDocumentationData?.listADocument?.value)) {
          dispatch(
            setDocValidation(
              "listADocumentValid",
              "List A document should not be empty."
            )
          );
        }
        if (!isTextValid(currentDocumentationData?.listBDocument?.value)) {
          dispatch(
            setDocValidation(
              "listBDocumentValid",
              "List B document should not be empty."
            )
          );
        }
        if (!isTextValid(currentDocumentationData?.listCDocument?.value)) {
          dispatch(
            setDocValidation(
              "listCDocumentValid",
              "List C document should not be empty."
            )
          );
        }
        if (!isTextValid(currentDocumentationData?.E_verify?.value)) {
          dispatch(
            setDocValidation("E_verifyValid", "E_verify should not be empty.")
          );
        }
        if (!isTextValid(currentDocumentationData?.E_verificationDate)) {
          dispatch(
            setDocValidation(
              "E_verificationDateValid",
              "E_verification date should not be empty."
            )
          );
        }
        if (!isTextValid(currentDocumentationData?.emergencyForm?.value)) {
          dispatch(
            setDocValidation(
              "emergencyFormValid",
              "Emergency form should not be empty."
            )
          );
        }
        if (!isTextValid(currentDocumentationData?.vaccinationStatus?.value)) {
          dispatch(
            setDocValidation(
              "vaccinationStatusValid",
              "Vaccination status should not be empty."
            )
          );
        }
        if (
          !isTextValid(currentDocumentationData?.clientTaskOrderOrSOWst?.value)
        ) {
          dispatch(
            setDocValidation(
              "clientTaskOrderOrSOWstValid",
              "Client task order should not be empty."
            )
          );
        }
        if (!isTextValid(currentDocumentationData?.MSA?.value)) {
          dispatch(setDocValidation("MSAValid", "MSA should not be empty."));
        }
        if (!isTextValid(currentDocumentationData?.SOW?.value)) {
          dispatch(setDocValidation("SOWValid", "SOW should not be empty."));
        }
        if (!isTextValid(currentDocumentationData?.SOWValidity)) {
          dispatch(
            setDocValidation(
              "SOWValidityValid",
              "SOW validity should not be empty."
            )
          );
        }
        if (
          !isTextValid(
            currentDocumentationData?.certificateOFInsuranceOrCOI?.value
          )
        ) {
          dispatch(
            setDocValidation(
              "certificateOFInsuranceOrCOIValid",
              "COI should not be empty."
            )
          );
        }
        if (!isTextValid(currentDocumentationData?.certificationOfInsurance)) {
          dispatch(
            setDocValidation(
              "certificationOfInsuranceValid",
              "COI date should not be empty."
            )
          );
        }
        if (
          !isTextValid(currentDocumentationData?.clientTaskOrderOrSOW?.value)
        ) {
          dispatch(
            setDocValidation(
              "clientTaskOrderOrSOWValid",
              "COI or SOW should not be empty."
            )
          );
        }
        if (
          !isTextValid(currentDocumentationData?.clientTaskOrderOrSOWst?.value)
        ) {
          dispatch(
            setDocValidation(
              "clientTaskOrderOrSOWstValid",
              "Client task order should not be empty."
            )
          );
        }
        if (
          !isTextValid(currentDocumentationData?.clientTaskOrderSigning?.value)
        ) {
          dispatch(
            setDocValidation(
              "clientTaskOrderSigningValid",
              "Client task order signing should not be empty."
            )
          );
        }
        if (!isTextValid(currentDocumentationData?.TaskOrderExpiryDate)) {
          dispatch(
            setDocValidation(
              "TaskOrderExpiryDateValid",
              "Task order expiry date should not be empty."
            )
          );
        }
        if (
          !isTextValid(currentDocumentationData?.documentationStatus?.value)
        ) {
          dispatch(
            setDocValidation(
              "documentationStatusValid",
              "Documentation status should not be empty."
            )
          );
        }
        if (!isTextValid(currentDocumentationData?.documentationRemark)) {
          dispatch(
            setDocValidation(
              "documentationRemarkValid",
              "Documentation remark should not be empty."
            )
          );
        }
        if (
          !isTextValid(currentDocumentationData?.documentationCompletionDate)
        ) {
          dispatch(
            setDocValidation(
              "documentationCompletionDateValid",
              "Documentation completion date should not be empty."
            )
          );
        }

        if (
          validationDocData?.articlesOrCertificateOFIncorporationValid ===
            " " &&
          validationDocData?.w9Orw4Valid &&
          validationDocData?.directDepositAgreementValid === " " &&
          validationDocData?.voidCheckOrEmailContentValid === " " &&
          validationDocData?.CIPCICICAOrCIPCICUValid === " " &&
          validationDocData?.goodStandingDocumentValid === " " &&
          validationDocData?.workAuthorizationDocumentValid === " " &&
          validationDocData?.I9FormValid === " " &&
          validationDocData?.listADocumentValid === " " &&
          validationDocData?.listBDocumentValid === " " &&
          validationDocData?.listADocumentValid === " " &&
          validationDocData?.E_verifyValid === " " &&
          validationDocData?.E_verificationDateValid === " " &&
          validationDocData?.emergencyFormValid === " " &&
          validationDocData?.vaccinationStatusValid === " " &&
          validationDocData?.MSAValid === " " &&
          validationDocData?.SOWValid === " " &&
          validationDocData?.SOWValidityValid === " " &&
          validationDocData?.certificateOFInsuranceOrCOIValid === " " &&
          validationDocData?.certificationOfInsuranceValid === " " &&
          validationDocData?.clientTaskOrderOrSOWValid === " " &&
          validationDocData?.clientTaskOrderOrSOWstValid === " " &&
          validationDocData?.clientTaskOrderSigningValid === " " &&
          validationDocData?.TaskOrderExpiryDateValid === " " &&
          validationDocData?.documentationStatusValid === " " &&
          validationDocData?.documentationRemarkValid === " " &&
          validationDocData?.documentationCompletionDateValid === " "
        ) {
          setStepCount(stepCount + 1);
        } else {
          Swal.fire({
            icon: "error",
            title: "Whoops!",
            text: "Sorry, errors prevented this registration from going to next page. Please correct errors and try again.",
          });
        }
      }

      if (stepCount === 4) {
        if (!isTextValid(currentStartEndOperationsData.recruiter)) {
          dispatch(
            setStartEndValidation(
              "recruiterValid",
              "Recruiter name should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.teamLead)) {
          dispatch(
            setStartEndValidation(
              "teamLeadValid",
              "Team lead name should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.crm)) {
          dispatch(
            setStartEndValidation("crmValid", "CRM should not be empty.")
          );
        }
        if (!isTextValid(currentStartEndOperationsData.teamManager)) {
          dispatch(
            setStartEndValidation(
              "teamManagerValid",
              "Team manager should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.seniorManager)) {
          dispatch(
            setStartEndValidation(
              "seniorManagerValid",
              "Senior manager should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.assoDirector)) {
          dispatch(
            setStartEndValidation(
              "assoDirectorValid",
              "Associate director should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.centerHead)) {
          dispatch(
            setStartEndValidation(
              "centerHeadValid",
              "Center head should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.onsiteAccDirector)) {
          dispatch(
            setStartEndValidation(
              "onsiteAccDirectorValid",
              "Onsite account director should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.onboCoordinator)) {
          dispatch(
            setStartEndValidation(
              "onboCoordinatorValid",
              "Onboarding coordinator should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.endDate)) {
          dispatch(
            setStartEndValidation(
              "endDateValid",
              "End date should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.grossBr)) {
          dispatch(
            setStartEndValidation(
              "grossBrValid",
              "Gross BR should not be empty."
            )
          );
        }

        if (!isTextValid(currentStartEndOperationsData.mspFeePercentage)) {
          dispatch(
            setStartEndValidation(
              "mspFeePercentageValid",
              "MSP fee in percentage should not be empty."
            )
          );
        }

        if (!isTextValid(currentStartEndOperationsData.mspFee)) {
          dispatch(
            setStartEndValidation("mspFeeValid", "MSP fee should not be empty.")
          );
        }
        if (!isTextValid(currentStartEndOperationsData.payRate)) {
          dispatch(
            setStartEndValidation(
              "payRateValid",
              "Pay rate should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.refFee)) {
          dispatch(
            setStartEndValidation(
              "refFeeValid",
              "Referral fee should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.taxOHPercentage)) {
          dispatch(
            setStartEndValidation(
              "taxOHPercentageValid",
              "Tax OH percentage should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.taxOH)) {
          dispatch(
            setStartEndValidation("taxOHValid", "Tax OH should not be empty.")
          );
        }
        if (
          !isTextValid(currentStartEndOperationsData.hBenefitesOpted?.value)
        ) {
          dispatch(
            setStartEndValidation(
              "hBenefitesOptedValid",
              "Opted for health benefits should not be empty."
            )
          );
        }

        if (!isTextValid(currentStartEndOperationsData.hBenefitesCost)) {
          dispatch(
            setStartEndValidation(
              "hBenefitesCostValid",
              "Health benefits cost should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.netBillRate)) {
          dispatch(
            setStartEndValidation(
              "netBillRateValid",
              "Net bill rate should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.netPurchase)) {
          dispatch(
            setStartEndValidation(
              "netPurchaseValid",
              "Net purchase should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.margin)) {
          dispatch(
            setStartEndValidation("marginValid", "Margin should not be empty.")
          );
        }
        if (!isTextValid(currentStartEndOperationsData.fullTimeSalaryOffered)) {
          dispatch(
            setStartEndValidation(
              "fullTimeSalaryOfferedValid",
              "Full time salary offered should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.joiningStatus?.value)) {
          dispatch(
            setStartEndValidation(
              "joiningStatusValid ",
              "Joining status should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.joiningType?.value)) {
          dispatch(
            setStartEndValidation(
              "joiningTypeValid",
              "Joining type should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.exitClearance?.value)) {
          dispatch(
            setStartEndValidation(
              "exitClearanceValid",
              "Exit clearance type should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.endReason?.value)) {
          dispatch(
            setStartEndValidation(
              "endReasonValid",
              "End reason type should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.jobLevel?.value)) {
          dispatch(
            setStartEndValidation(
              "jobLevelValid",
              "Job levelshould not be empty."
            )
          );
        }
        if (
          !isTextValid(currentStartEndOperationsData.ffInvoiceStatus?.value)
        ) {
          dispatch(
            setStartEndValidation(
              "ffInvoiceStatusValid",
              "Select FF invoice status should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.joiningStatusRemark)) {
          dispatch(
            setStartEndValidation(
              "joiningStatusRemarkValid",
              "Joining status remarks should not be empty."
            )
          );
        }
        if (!isTextValid(currentStartEndOperationsData.endRemarks)) {
          dispatch(
            setStartEndValidation(
              "endRemarksValid",
              "End remarks should not be empty."
            )
          );
        }

        if (
          validationStartEndOperationsData?.recruiterValid === " " &&
          validationStartEndOperationsData?.teamLeadValid === " " &&
          validationStartEndOperationsData?.crmValid === " " &&
          validationStartEndOperationsData?.teamManagerValid === " " &&
          validationStartEndOperationsData?.seniorManagerValid === " " &&
          validationStartEndOperationsData?.assoDirectorValid === " " &&
          validationStartEndOperationsData?.centerHeadValid === " " &&
          validationStartEndOperationsData?.onsiteAccDirectorValid === " " &&
          validationStartEndOperationsData?.onboCoordinatorValid === " " &&
          validationStartEndOperationsData?.endDateValid === " " &&
          validationStartEndOperationsData?.grossBrValid === " " &&
          validationStartEndOperationsData?.mspFeePercentageValid === " " &&
          validationStartEndOperationsData?.mspFeeValid === " " &&
          validationStartEndOperationsData?.payRateValid === " " &&
          validationStartEndOperationsData?.refFeeValid === " " &&
          validationStartEndOperationsData?.taxOHPercentageValid === " " &&
          validationStartEndOperationsData?.taxOHValid === " " &&
          validationStartEndOperationsData?.hBenefitesOptedValid === " " &&
          validationStartEndOperationsData?.hBenefitesCostValid === " " &&
          validationStartEndOperationsData?.netBillRateValid === " " &&
          validationStartEndOperationsData?.netPurchaseValid === " " &&
          validationStartEndOperationsData?.marginValid === " " &&
          validationStartEndOperationsData?.fullTimeSalaryOfferedValid ===
            " " &&
          validationStartEndOperationsData?.joiningStatusValid === " " &&
          validationStartEndOperationsData?.joiningTypeValid === " " &&
          validationStartEndOperationsData?.exitClearanceValid === " " &&
          validationStartEndOperationsData?.endReasonValid === " " &&
          validationStartEndOperationsData?.jobLevelValid === " " &&
          validationStartEndOperationsData?.ffInvoiceStatusValid === " " &&
          validationStartEndOperationsData?.joiningStatusRemarkValid === " " &&
          validationStartEndOperationsData?.endRemarksValid === " "
        ) {
          setStepCount(stepCount + 1);
        } else {
          Swal.fire({
            icon: "error",
            title: "Whoops!",
            text: "Sorry, errors prevented this registration from going to next page. Please correct errors and try again.",
          });
        }
      }
    }
  };

  const previous = () => {
    if (stepCount > 1) {
      setStepCount(stepCount - 1);
    }
  };

  console.log("stepCount: ", stepCount);
  const boxStyle = {
    alignItems: "center",
    border: "none",
    flexGrow: 1,
    marginTop: "3%",
    overflowY: "auto",
    overflowX: "hidden",
    height: "60vh",
    paddingRight: "10px",
    paddingLeft: "10px",
  };

  function showReferral() {
    if (referral) {
      return <ReferralDetails />;
    }
  }

  function showStepScreens(stepCount: any) {
    switch (stepCount) {
      case 1:
        return (
          <Box id="no-scroll-div" sx={boxStyle}>
            <BasicDetails />
          </Box>
        );
      case 2:
        return (
          <Box id="no-scroll-div" sx={boxStyle}>
            <BackgroundVerification />
          </Box>
        );
      case 3:
        return (
          <Box id="no-scroll-div" sx={boxStyle}>
            <DocumentationScreen />
          </Box>
        );
      case 4:
        return (
          <Box id="no-scroll-div" sx={boxStyle}>
            <StartEndOperationsScreen />
          </Box>
        );
      case 5:
        return (
          <Box id="no-scroll-div" sx={boxStyle}>
            <RateRevisionScreen />
          </Box>
        );
      default:
        return (
          <Box sx={boxStyle}>
            <>Error</>
          </Box>
        );
    }
  }

  return (
    <>
      <Stepper activeStep={stepCount - 1} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {showStepScreens(stepCount)}

      <div className="flex justify-between px-7 mt-3">
        <span className="">
          {stepCount > 1 && (
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={previous}
            >
              <WestIcon />
            </Fab>
          )}
        </span>

        <span style={{ marginRight: "1%", marginLeft: "1%" }}>
          {stepCount < 5 && (
            <Fab size="small" color="primary" aria-label="add" onClick={next}>
              <EastIcon />
            </Fab>
          )}
        </span>
      </div>
    </>
  );
};

export default AddCandidate;
