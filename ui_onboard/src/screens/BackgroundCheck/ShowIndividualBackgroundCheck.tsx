import React, { useEffect, useState } from "react";
import { useSpring, animated, Any } from "@react-spring/web";
import { Grid, SelectChangeEvent, TextField } from "@mui/material";
import { TextField as TextField1 } from "../../common/TextField/TextField";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import Select from "react-select";
import {
  BGCAdjuStatusOptions,
  BGCAffidavitOptions,
  BGCInvoiceMonthOptions,
  BGCPackage2Options,
  BGCPackageOptions,
  BGCReportStatusOptions,
  BGCStatusOptions,
  PrimBGCInitiatedThruOptions,
  finalBGCReportOptions,
} from "../../constants/backgroundconstants";
import { Button, Button as Button1 } from "../../common/Button/Button";
import { TextArea } from "../../common/TextArea/TextArea";
import {
  editCandidateBackgroundCheckData,
  setBgValidation,
  setSecondaryButton,
  setTertiaryButton,
} from "../../actions/backgroundCheck";
import { RootState } from "../../redux/store";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";
import { FloatSelect } from "../../common/FloatSelect/FloatSelect";
import { isTextValid } from "../../helpers/validate";
import DeleteForever from "@mui/icons-material/DeleteForever";

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

interface Props {
  open: any;
  setOpen: any;
  data: any;
  showTableCount: any;
  int: any;
  setShowModal: any;
  showModal: any;
}

const ShowBackgroundCheck: React.FC<Props> = ({
  open,
  setOpen,
  // data,
  showTableCount,
  int,
  setShowModal,
  showModal,
}) => {
  const dispatch = useAppDispatch();
  let data = useAppSelector(
    (state: RootState) => state?.backgroundCheck?.singleBackgroundCheckData
  );
  console.log("data?????????????????????????????: ", data);
  const [showSecondaryBGCInitiatedThru, setShowSecondaryBGCInitiatedThru] =
    useState(data?.secondaryBGCInitiatedThru);
  // const [showSecondary, setShowSecondary] = useState(data?.caseID2);
  const [disable, setDisable] = useState(true);
  const [caseID1, setCaseID1] = useState(data?.caseID1);
  const [BGCInitiatedOn, setBGCInitiatedOn] = useState(data?.BGCInitiatedOn);
  const [primaryBGCInitiatedThru, setPrimaryBGCInitiatedThru] = useState(
    data?.primaryBGCInitiatedThru
  );
  // console.log("primaryBGCInitiatedThru: ", primaryBGCInitiatedThru);

  const [BGCPackage1, setBGCPackage1] = useState(data?.BGCPackage1);
  // console.log("BGCPackage1: ", BGCPackage1);
  const [BGCPackage2, setBGCPackage2] = useState(data?.BGCPackage2);
  const [BGCInvoiceMonth, setBGCInvoiceMonth] = useState(data?.BGCInvoiceMonth);
  const [BGCChargesPrimary, setBGCChargesPrimary] = useState(
    data?.BGCChargesPrimary
  );
  const [secondary, setSecondary] = useState(data?.secondary);
  const [caseID2, setCaseID2] = useState(data?.caseID2);
  const [secondaryBGCInitiatedOn, setSecondaryBGCInitiatedOn] = useState(
    data?.secondaryBGCInitiatedOn
  );
  const [secondaryBGCInitiatedThru, setSecondaryBGCInitiatedThru] = useState(
    data?.secondaryBGCInitiatedThru
  );
  const [secondaryBGCPackage1, setSecondaryBGCPackage1] = useState(
    data?.secondaryBGCPackage1
  );
  const [secondaryBGCPackage2, setSecondaryBGCPackage2] = useState(
    data?.secondaryBGCPackage2
  );
  const [secondaryBGCInvoiceMonth, setSecondaryBGCInvoiceMonth] = useState(
    data?.secondaryBGCInvoiceMonth
  );
  const [secondaryBGCCharges, setSecondaryBGCCharges] = useState(
    data?.secondaryBGCCharges
  );
  const [tertiary, setTertiary] = useState(data?.tertiary);
  const [caseID3, setCaseID3] = useState(data?.caseID3);
  const [tertiaryBGCInitiatedOn, setTertiaryBGCInitiatedOn] = useState(
    data?.tertiaryBGCInitiatedOn
  );
  const [tertiaryBGCInitiatedThru, setTertiaryBGCInitiatedThru] = useState(
    data?.tertiaryBGCInitiatedThru
  );
  const [tertiaryBGCPackage1, setTertiaryBGCPackage1] = useState(
    data?.tertiaryBGCPackage1
  );
  const [tertiaryBGCPackage2, setTertiaryBGCPackage2] = useState(
    data?.tertiaryBGCPackage2
  );
  const [tertiaryBGCInvoiceMonth, setTertiaryBGCInvoiceMonth] = useState(
    data?.tertiaryBGCInvoiceMonth
  );
  const [tertiaryBGCCharges, setTertiaryBGCCharges] = useState(
    data?.tertiaryBGCCharges
  );
  const [BGCStatus, setBGCStatus] = useState(data?.BGCStatus);
  const [BGCCompletedOn, setBGCCompletedOn] = useState(data?.BGCCompletedOn);
  const [BGCAffidavitStatus, setBGCAffidavitStatus] = useState(
    data?.BGCAffidavitStatus
  );
  const [BGCAffidavitOn, setBGCAffidavitOn] = useState(data?.BGCAffidavitOn);
  const [BGCReportStatus, setBGCReportStatus] = useState(data?.BGCReportStatus);
  const [BGCAdjuStatus, setBGCAdjuStatus] = useState(data?.BGCAdjuStatus);
  const [adjuSupportingDocs, setAdjuSupportingDocs] = useState(
    data?.adjuSupportingDocs
  );
  const [dateOfAdjudication, setDateOfAdjudication] = useState(
    data?.dateOfAdjudication
  );
  const [finalBGCReport, setFinalBGCReport] = useState(data?.finalBGCReport);
  const [BGCRemark, setBGCRemark] = useState(data?.BGCRemark);

  // React.useEffect(() => {
  //   if (!showModal) {
  //     setShowSecondary(secondary);
  //     setShowTertiary(tertiary);
  //   }
  // });

  React.useEffect(() => {
    setCaseID1(data?.caseID1);
    setBGCInitiatedOn(data?.BGCInitiatedOn);
    setPrimaryBGCInitiatedThru(data?.primaryBGCInitiatedThru);
    setBGCPackage1(data?.BGCPackage1);
    setBGCPackage2(data?.BGCPackage2);
    setBGCInvoiceMonth(data?.BGCInvoiceMonth);
    setBGCChargesPrimary(data?.BGCChargesPrimary);
    setSecondary(data?.secondary);
    setCaseID2(data?.caseID2);
    setSecondaryBGCInitiatedOn(data?.secondaryBGCInitiatedOn);
    setSecondaryBGCInitiatedThru(data?.secondaryBGCInitiatedThru);
    setSecondaryBGCPackage1(data?.secondaryBGCPackage1);
    setSecondaryBGCPackage2(data?.secondaryBGCPackage2);
    setSecondaryBGCInvoiceMonth(data?.secondaryBGCInvoiceMonth);
    setSecondaryBGCCharges(data?.secondaryBGCCharges);
    setTertiary(data?.tertiary);
    setCaseID3(data?.caseID3);
    setTertiaryBGCInitiatedOn(data?.tertiaryBGCInitiatedOn);
    setTertiaryBGCInitiatedThru(data?.tertiaryBGCInitiatedThru);
    setTertiaryBGCPackage1(data?.tertiaryBGCPackage1);
    setTertiaryBGCPackage2(data?.tertiaryBGCPackage2);
    setTertiaryBGCInvoiceMonth(data?.tertiaryBGCInvoiceMonth);
    setTertiaryBGCCharges(data?.tertiaryBGCCharges);
    setBGCStatus(data?.BGCStatus);
    setBGCCompletedOn(data?.BGCCompletedOn);
    setBGCAffidavitStatus(data?.BGCAffidavitStatus);
    setBGCAffidavitOn(data?.BGCAffidavitOn);
    setBGCReportStatus(data?.BGCReportStatus);
    setBGCAdjuStatus(data?.BGCAdjuStatus);
    setAdjuSupportingDocs(data?.adjuSupportingDocs);
    setDateOfAdjudication(data?.dateOfAdjudication);
    setFinalBGCReport(data?.finalBGCReport);
    setBGCRemark(data?.BGCRemark);
  }, [data]);

  const [caseID1Valid, setCaseID1Valid] = useState<boolean>();
  const [BGCInitiatedOnValid, setBGCInitiatedOnValid] = useState<boolean>();
  const [primaryBGCInitiatedThruValid, setPrimaryBGCInitiatedThruValid] =
    useState<boolean>();
  const [BGCPackage1Valid, setBGCPackage1Valid] = useState<boolean>();
  const [BGCPackage2Valid, setBGCPackage2Valid] = useState<boolean>();
  const [BGCInvoiceMonthValid, setBGCInvoiceMonthValid] = useState<boolean>();
  const [BGCChargesPrimaryValid, setBGCChargesPrimaryValid] =
    useState<boolean>();
  // const [secondaryValid, setSecondaryValid] = useState<boolean>();
  const [caseID2Valid, setCaseID2Valid] = useState<boolean>();
  const [secondaryBGCInitiatedOnValid, setSecondaryBGCInitiatedOnValid] =
    useState<boolean>();
  const [secondaryBGCInitiatedThruValid, setSecondaryBGCInitiatedThruValid] =
    useState<boolean>();
  const [secondaryBGCPackage1Valid, setSecondaryBGCPackage1Valid] =
    useState<boolean>();
  const [secondaryBGCPackage2Valid, setSecondaryBGCPackage2Valid] =
    useState<boolean>();
  const [secondaryBGCInvoiceMonthValid, setSecondaryBGCInvoiceMonthValid] =
    useState<boolean>();
  const [secondaryBGCChargesValid, setSecondaryBGCChargesValid] =
    useState<boolean>();
  // const [tertiaryValid, setTertiaryValid] = useState<boolean>();
  const [caseID3Valid, setCaseID3Valid] = useState<boolean>();
  const [tertiaryBGCInitiatedOnValid, setTertiaryBGCInitiatedOnValid] =
    useState<boolean>();
  const [tertiaryBGCInitiatedThruValid, setTertiaryBGCInitiatedThruValid] =
    useState<boolean>();
  const [tertiaryBGCPackage1Valid, setTertiaryBGCPackage1Valid] =
    useState<boolean>();
  const [tertiaryBGCPackage2Valid, setTertiaryBGCPackage2Valid] =
    useState<boolean>();
  const [tertiaryBGCInvoiceMonthValid, setTertiaryBGCInvoiceMonthValid] =
    useState<boolean>();
  const [tertiaryBGCChargesValid, setTertiaryBGCChargesValid] =
    useState<boolean>();
  const [BGCStatusValid, setBGCStatusValid] = useState<boolean>();
  const [BGCCompletedOnValid, setBGCCompletedOnValid] = useState<boolean>();
  const [BGCAffidavitStatusValid, setBGCAffidavitStatusValid] =
    useState<boolean>();
  const [BGCAffidavitOnValid, setBGCAffidavitOnValid] = useState<boolean>();
  const [BGCReportStatusValid, setBGCReportStatusValid] = useState<boolean>();
  const [BGCAdjuStatusValid, setBGCAdjuStatusValid] = useState<any>();
  const [adjuSupportingDocsValid, setAdjuSupportingDocsValid] =
    useState<boolean>();
  const [dateOfAdjudicationValid, setDateOfAdjudicationValid] =
    useState<boolean>();
  const [finalBGCReportValid, setFinalBGCReportValid] = useState<boolean>();
  const [BGCRemarkValid, setBGCRemarkValid] = useState<boolean>();
  const [caseID1Error, setCaseID1Error] = useState<any>();
  const [BGCInitiatedOnError, setBGCInitiatedOnError] = useState<any>();
  const [primaryBGCInitiatedThruError, setPrimaryBGCInitiatedThruError] =
    useState<any>();
  const [BGCPackage1Error, setBGCPackage1Error] = useState<any>();
  const [BGCPackage2Error, setBGCPackage2Error] = useState<any>();
  const [BGCInvoiceMonthError, setBGCInvoiceMonthError] = useState<any>();
  const [BGCChargesPrimaryError, setBGCChargesPrimaryError] = useState<any>();
  const [caseID2Error, setCaseID2Error] = useState<any>();
  const [secondaryBGCInitiatedOnError, setSecondaryBGCInitiatedOnError] =
    useState<any>();
  const [secondaryBGCInitiatedThruError, setSecondaryBGCInitiatedThruError] =
    useState<any>();
  const [secondaryBGCPackage1Error, setSecondaryBGCPackage1Error] =
    useState<any>();
  const [secondaryBGCPackage2Error, setSecondaryBGCPackage2Error] =
    useState<any>();
  const [secondaryBGCInvoiceMonthError, setSecondaryBGCInvoiceMonthError] =
    useState<any>();
  const [secondaryBGCChargesError, setSecondaryBGCChargesError] =
    useState<any>();
  const [tertiaryError, setTertiaryError] = useState<any>();
  const [caseID3Error, setCaseID3Error] = useState<any>();
  const [tertiaryBGCInitiatedOnError, setTertiaryBGCInitiatedOnError] =
    useState<any>();
  const [tertiaryBGCInitiatedThruError, setTertiaryBGCInitiatedThruError] =
    useState<any>();
  const [tertiaryBGCPackage1Error, setTertiaryBGCPackage1Error] =
    useState<any>();
  const [tertiaryBGCPackage2Error, setTertiaryBGCPackage2Error] =
    useState<any>();
  const [tertiaryBGCInvoiceMonthError, setTertiaryBGCInvoiceMonthError] =
    useState<any>();
  const [tertiaryBGCChargesError, setTertiaryBGCChargesError] = useState<any>();
  const [BGCStatusError, setBGCStatusError] = useState<any>();
  const [BGCCompletedOnError, setBGCCompletedOnError] = useState<any>();
  const [BGCAffidavitStatusError, setBGCAffidavitStatusError] = useState<any>();
  const [BGCAffidavitOnError, setBGCAffidavitOnError] = useState<any>();
  const [BGCReportStatusError, setBGCReportStatusError] = useState<any>();
  const [BGCAdjuStatusError, setBGCAdjuStatusError] = useState<any>();
  const [adjuSupportingDocsError, setAdjuSupportingDocsError] = useState<any>();
  const [dateOfAdjudicationError, setDateOfAdjudicationError] = useState<any>();
  const [finalBGCReportError, setFinalBGCReportError] = useState<any>();
  const [BGCRemarkError, setBGCRemarkError] = useState<any>();

  // const [showSecondary, setShowSecondary] = useState<boolean>(false);
  // const [showTertiary, setShowTertiary] = useState<boolean>(false);
  // const [candidateId, setCandidateId] = useState(data?.candidateId);
  // const [count, setCount] = React.useState(0);

  function updateCandidateBackground() {
    setCaseID1Valid(isTextValid(caseID1));
    setBGCInitiatedOnValid(isTextValid(BGCInitiatedOn));
    setPrimaryBGCInitiatedThruValid(isTextValid(primaryBGCInitiatedThru));
    setBGCPackage1Valid(isTextValid(BGCPackage1));
    setBGCPackage2Valid(isTextValid(BGCPackage2));
    setBGCInvoiceMonthValid(isTextValid(BGCInvoiceMonth));
    setBGCChargesPrimaryValid(isTextValid(BGCChargesPrimary));
    setCaseID2Valid(isTextValid(caseID2));
    setSecondaryBGCInitiatedOnValid(isTextValid(secondaryBGCInitiatedOn));
    setSecondaryBGCInitiatedThruValid(isTextValid(secondaryBGCInitiatedThru));
    setSecondaryBGCPackage1Valid(isTextValid(secondaryBGCPackage1));
    setSecondaryBGCPackage2Valid(isTextValid(secondaryBGCPackage2));
    setSecondaryBGCInvoiceMonthValid(isTextValid(secondaryBGCInvoiceMonth));
    setSecondaryBGCChargesValid(isTextValid(secondaryBGCCharges));
    setCaseID3Valid(isTextValid(caseID3));
    setTertiaryBGCInitiatedOnValid(isTextValid(tertiaryBGCInitiatedOn));
    setTertiaryBGCInitiatedThruValid(isTextValid(tertiaryBGCInitiatedThru));
    setTertiaryBGCPackage1Valid(isTextValid(tertiaryBGCPackage1));
    setTertiaryBGCPackage2Valid(isTextValid(tertiaryBGCPackage2));
    setTertiaryBGCInvoiceMonthValid(isTextValid(tertiaryBGCInvoiceMonth));
    setTertiaryBGCChargesValid(isTextValid(tertiaryBGCCharges));
    setBGCStatusValid(isTextValid(BGCStatus));
    setBGCCompletedOnValid(isTextValid(BGCCompletedOn));
    setBGCAffidavitStatusValid(isTextValid(BGCAffidavitStatus));
    setBGCAffidavitOnValid(isTextValid(BGCAffidavitOn));
    setBGCReportStatusValid(isTextValid(BGCReportStatus));
    setBGCAdjuStatusValid(isTextValid(BGCAdjuStatus));
    setAdjuSupportingDocsValid(isTextValid(adjuSupportingDocs));
    setDateOfAdjudicationValid(isTextValid(dateOfAdjudication));
    setFinalBGCReportValid(isTextValid(finalBGCReport));
    setBGCStatusValid(isTextValid(BGCStatus));
    setBGCRemarkValid(isTextValid(BGCRemark));

    // if(isTextValid(caseID1 && () && isTextValid(caseID2) && () )

    if (
      isTextValid(caseID1) ||
      isTextValid(BGCInitiatedOn) ||
      isTextValid(primaryBGCInitiatedThru) ||
      isTextValid(BGCPackage1) ||
      isTextValid(BGCPackage2) ||
      isTextValid(BGCInvoiceMonth) ||
      isTextValid(BGCChargesPrimary) ||
      isTextValid(caseID2) ||
      isTextValid(secondaryBGCInitiatedOn) ||
      isTextValid(secondaryBGCInitiatedThru) ||
      isTextValid(secondaryBGCPackage1) ||
      isTextValid(secondaryBGCPackage2) ||
      isTextValid(secondaryBGCInvoiceMonth) ||
      isTextValid(secondaryBGCCharges) ||
      isTextValid(caseID3) ||
      isTextValid(tertiaryBGCInitiatedOn) ||
      isTextValid(tertiaryBGCInitiatedThru) ||
      isTextValid(tertiaryBGCPackage1) ||
      isTextValid(tertiaryBGCPackage2) ||
      isTextValid(tertiaryBGCInvoiceMonth) ||
      isTextValid(BGCStatus) ||
      isTextValid(BGCCompletedOn) ||
      isTextValid(BGCAffidavitOn) ||
      isTextValid(BGCReportStatus) ||
      isTextValid(BGCAdjuStatus) ||
      isTextValid(adjuSupportingDocs) ||
      isTextValid(dateOfAdjudication) ||
      isTextValid(finalBGCReport) ||
      isTextValid(BGCStatus) ||
      isTextValid(tertiaryBGCCharges) ||
      isTextValid(BGCRemark)
    ) {
      dispatch(
        editCandidateBackgroundCheckData(
          caseID1,
          BGCInitiatedOn,
          primaryBGCInitiatedThru,
          BGCPackage1,
          BGCPackage2,
          BGCInvoiceMonth,
          BGCChargesPrimary,
          secondary,
          caseID2,
          secondaryBGCInitiatedOn,
          secondaryBGCInitiatedThru,
          secondaryBGCPackage1,
          secondaryBGCPackage2,
          secondaryBGCInvoiceMonth,
          secondaryBGCCharges,
          tertiary,
          caseID3,
          tertiaryBGCInitiatedOn,
          tertiaryBGCInitiatedThru,
          tertiaryBGCPackage1,
          tertiaryBGCPackage2,
          tertiaryBGCInvoiceMonth,
          tertiaryBGCCharges,
          BGCStatus,
          BGCCompletedOn,
          BGCAffidavitStatus,
          BGCAffidavitOn,
          BGCReportStatus,
          BGCAdjuStatus,
          adjuSupportingDocs,
          dateOfAdjudication,
          finalBGCReport,
          BGCRemark,
          data?.candidateId
        )
      );

      setShowModal(false);
    } else {
      if (!caseID1Valid) {
        setCaseID1Error("CaseId1 should not be empty.");
      }
      if (!BGCInitiatedOnValid) {
        setBGCInitiatedOnError(" BGCInitiatedOn should not be empty.");
      }
      if (!primaryBGCInitiatedThruValid) {
        setPrimaryBGCInitiatedThruError(
          "PrimaryBGCInitiatedThru should not be empty."
        );
      }
      if (!BGCPackage1Valid) {
        setBGCPackage1Error("BGCPackage1 should not be empty.");
      }
      if (!BGCPackage2Valid) {
        setBGCPackage2Error("BGCPackage2 date should not be empty.");
      }
      if (!BGCInvoiceMonthValid) {
        setBGCInvoiceMonthError("BGCInvoiceMonth should not be empty.");
      }
      if (!BGCChargesPrimaryValid) {
        setBGCChargesPrimaryError("Bgc charges primary should not be empty.");
      }
      // if (!adjuSupportingDocsValid) {
      //   setAdjuSupportingDocs("Adjudication should not be empty.");
      // }
      if (!caseID2Valid) {
        setCaseID2Error("Case id 2 should not be empty.");
      }
      if (!secondaryBGCInitiatedOnValid) {
        setSecondaryBGCInitiatedOnError(
          "Secondary bgc initiated on should not be empty."
        );
      }
      if (!secondaryBGCInitiatedThruValid) {
        setSecondaryBGCInitiatedThruError(
          "Secondary bgc initiated thru should not be empty."
        );
      }
      if (!secondaryBGCPackage1Valid) {
        setSecondaryBGCPackage1Error(
          "Secondary bgc package1 should not be empty"
        );
      }
      if (!secondaryBGCPackage2Valid) {
        setSecondaryBGCPackage2Error(
          "Secondary bgc package 2 should not be empty."
        );
      }
      if (!secondaryBGCInvoiceMonthValid) {
        setSecondaryBGCInvoiceMonthError(
          "Secondary bgc invoice month should not be empty."
        );
      }
      if (!secondaryBGCChargesValid) {
        setSecondaryBGCChargesError(
          "Secondary bgc charges should not be empty."
        );
      }

      if (!caseID3Valid) {
        setCaseID3Error("Case id 3 should not be empty.");
      }
      if (!tertiaryBGCInitiatedOnValid) {
        setTertiaryBGCInitiatedOnError(
          "Tertiary bgc initiated on should not be empty."
        );
      }
      if (!tertiaryBGCInitiatedThruValid) {
        setTertiaryBGCInitiatedThruError(
          "Tertiary bgc initiated thru should not be empty."
        );
      }
      if (!tertiaryBGCPackage1Valid) {
        setTertiaryBGCPackage1Error(
          "Tertiary bgc package1 should not be empty."
        );
      }
      if (!tertiaryBGCPackage2Valid) {
        setTertiaryBGCPackage2Error(
          "Tertiary bgc package2 should not be empty."
        );
      }
      if (!tertiaryBGCInvoiceMonthValid) {
        setTertiaryBGCInvoiceMonthError(
          "Tertiary bgc invoice month should not be empty."
        );
      }
      if (!tertiaryBGCChargesValid) {
        setTertiaryBGCChargesError("Tertiary bgc charges should not be empty.");
      }
      if (!BGCStatusValid) {
        setBGCStatusError("Bgc status should not be empty.");
      }
      if (!BGCCompletedOnValid) {
        setBGCCompletedOnError("Bgc completed on should not be empty.");
      }
      if (!BGCAffidavitStatusValid) {
        setBGCAffidavitStatusError("Bgc affidavit status should not be empty.");
      }

      if (!BGCAffidavitOnValid) {
        setBGCAffidavitOnError("Bgc affidavit on should not be empty.");

        if (!BGCReportStatusValid) {
          setBGCReportStatusError("Bgc report status should not be empty.");
        }
        if (!BGCAdjuStatusValid) {
          setBGCAdjuStatusError("Bgc adju status should not be empty.");
        }
        if (!adjuSupportingDocsValid) {
          setAdjuSupportingDocsError(
            "Adju supporting docs should not be empty."
          );
        }
        if (!dateOfAdjudicationValid) {
          setDateOfAdjudicationError(
            "Date of adjudication should not be empty."
          );
        }
        if (!finalBGCReportValid) {
          setFinalBGCReportError("Final bgc report should not be empty.");
        }
        if (!BGCRemarkValid) {
          setBGCRemarkError("Bgc remark should not be empty.");
        }
      }
    }
  }
  /////////////////////////case id 2////////////////////
  const [otherCases, setOtherCases] = useState<
    Array<{
      id?: number;
      caseID?: string;
      caseID2?: string;
      caseID3?: string;
      secondaryBGCInitiatedOn: string;
      secondaryBGCInitiatedThru: string;
      secondaryBGCPackage1: string;
      secondaryBGCPackage2: string;
      secondaryBGCInvoiceMonth: string;
      secondaryBGCCharges: string;
      TertiaryBGCCharges: String;
      TertiaryBGCInitiatedOn: String;
      TertiaryBGCInitiatedThru: String;
      TertiaryBGCInvoiceMonth: String;
      TertiaryBGCPackage1: String;
      TertiaryBGCPackage2: String;
    }>
  >([]);
  console.log("Other cases:", otherCases);
  const handleAdd = () => {
    if (otherCases.length < 2) {
      let data = [...otherCases];
      data.push({
        id: otherCases.length + 1,
        caseID: "",
        secondaryBGCInitiatedOn: "",
        secondaryBGCInitiatedThru: "",
        secondaryBGCPackage1: "",
        secondaryBGCPackage2: "",
        secondaryBGCInvoiceMonth: "",
        secondaryBGCCharges: "",
        TertiaryBGCCharges: "",
        TertiaryBGCInitiatedOn: "",
        TertiaryBGCInitiatedThru: "",
        TertiaryBGCInvoiceMonth: "",
        TertiaryBGCPackage1: "",
        TertiaryBGCPackage2: "",
      });
      setOtherCases([...data]);
      if (otherCases.length === 0) {
        setSecondary(true);
      } else if (otherCases.length === 1) {
        setTertiary(true);
      }
    }
  };

  const handleRemoveCase = (index: number) => {
    let data = [...otherCases];
    data.splice(index, 1);
    setOtherCases([...data]);
    if (index === 0) {
      setSecondary(false);
    } else if (index === 1) {
      setTertiary(false);
    }
  };
  // xs:w-100 sm:w-100 md:w-50 lg:w-50 xl:w-200

  const addOtherCasesData = (data: any) => {
    if (otherCases.length < 2) {
      let dataSet = [...otherCases];
      if (data.secondary === true) {
        setSecondary(true);
        dataSet.push({
          id: dataSet.length + 2,
          caseID: data.caseID2,
          // caseID2: data.caseID2,
          secondaryBGCInitiatedOn: data.secondaryBGCInitiatedOn,
          secondaryBGCInitiatedThru: data.secondaryBGCInitiatedThru,
          secondaryBGCPackage1: data.secondaryBGCPackage1,
          secondaryBGCPackage2: data.secondaryBGCPackage2,
          secondaryBGCInvoiceMonth: data.secondaryBGCInvoiceMonth,
          secondaryBGCCharges: data.secondaryBGCCharges,
          TertiaryBGCCharges: "",
          TertiaryBGCInitiatedOn: "",
          TertiaryBGCInitiatedThru: "",
          TertiaryBGCInvoiceMonth: "",
          TertiaryBGCPackage1: "",
          TertiaryBGCPackage2: "",
        });
        if (Object.hasOwn(data, "tertiary") && data.tertiary) {
          setTertiary(true);
          dataSet.push({
            id: dataSet.length + 2,
            caseID: data.caseID3,
            caseID3: data.caseID3,
            secondaryBGCInitiatedOn: "",
            secondaryBGCInitiatedThru: "",
            secondaryBGCPackage1: "",
            secondaryBGCPackage2: "",
            secondaryBGCInvoiceMonth: "",
            secondaryBGCCharges: "",
            TertiaryBGCCharges: data.tertiaryBGCCharges,
            TertiaryBGCInitiatedOn: data.tertiaryBGCInitiatedOn,
            TertiaryBGCInitiatedThru: data.tertiaryBGCInitiatedThru,
            TertiaryBGCInvoiceMonth: data.tertiaryBGCInvoiceMonth,
            TertiaryBGCPackage1: data.tertiaryBGCPackage1,
            TertiaryBGCPackage2: data.tertiaryBGCPackage2,
          });
        }
        setTimeout(() => setOtherCases([...dataSet]), 400);
      }
    }
  };

  useEffect(() => {
    addOtherCasesData(data);
  }, [data]);

  return (
    <>
      <div className="pl-10 mt-3 h-[70vh] overflow-auto " id="no-scroll-div ">
        <div className="flex justify-left items-left w-[490px] bg-gray-300  py-[3px] mb-8 -ml-3">
          <h1 className=" text-left ml-3 mt-2 underline"> Case-1 </h1>
          <button
            onClick={handleAdd}
            className=" ml-72 rounded-md p-[6px] text-white  bg-[#1976D2]"
          >
            Add case
            <p className=" -mt-[26px] text-xl text-white ml-28">+</p>
          </button>
        </div>
        <Grid container spacing={2} columnGap={"15px"} className="">
          <>
            <div className="mt-3 pl-5">
              <Grid container spacing={2} columnGap={"15px"}>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatLabel
                    label=" Id"
                    className="pl-10"
                    value={caseID1}
                    placeholder={""}
                    handleChange={(e: any) => {
                      setCaseID1(e?.target?.value);
                      setCaseID1Valid(isTextValid(e?.target?.value));
                      if (!caseID1Valid) {
                        setCaseID1Error("Case id 1 should not be empty.");
                      }
                    }}
                  />
                  {!caseID1Valid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {caseID1Error}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatLabel
                    label="Bgc initiated on"
                    // label="BGC Initiated On"
                    value={BGCInitiatedOn}
                    type="date"
                    placeholder={""}
                    handleChange={(e) => {
                      setBGCInitiatedOn(e.target.value);
                      setBGCInitiatedOnValid(isTextValid(e.target.value));
                      if (!BGCInitiatedOnValid) {
                        setBGCInitiatedOnError(
                          "BGCInitiatedOn should not be empty."
                        );
                      }
                    }}
                  />
                  {!BGCInitiatedOnValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {BGCInitiatedOnError}
                    </p>
                  ) : null}
                </Grid>

                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatSelect
                    labelId={"Primary BGC initiated thru"}
                    label="Primary bgc initiated thru"
                    options={PrimBGCInitiatedThruOptions}
                    value={primaryBGCInitiatedThru}
                    handleChange={(e: any) => {
                      setPrimaryBGCInitiatedThru(e.target.value);
                      setPrimaryBGCInitiatedThruValid(
                        isTextValid(e.target.value)
                      );
                    }}
                    className="text-start"
                    styles={{
                      border: "none",
                      textAlign: "left",
                      width: "100%",
                      height: "38px",
                      borderRadius: "none",
                      fontSize: "14px",
                    }}
                  />
                  {!primaryBGCInitiatedThruValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {primaryBGCInitiatedThruError}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatSelect
                    labelId={"BGC package 1"}
                    label="Bgc package 1"
                    options={BGCPackageOptions}
                    value={BGCPackage1}
                    handleChange={(e: any) => {
                      setBGCPackage1Valid(isTextValid(e.target.value));
                      setBGCPackage1(e.target.value);
                    }}
                    styles={{
                      border: "none",
                      textAlign: "left",
                      width: "100%",
                      height: "38px",
                      borderRadius: "none",
                      fontSize: "14px",
                    }}
                  />
                  {!BGCPackage1Valid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {BGCPackage1Error}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatSelect
                    label="Bgc package 2"
                    labelId={"BGC package 2"}
                    options={BGCPackageOptions}
                    value={BGCPackage2}
                    handleChange={(e: any) => {
                      setBGCPackage2Valid(isTextValid(e.target.value));
                      setBGCPackage2(e.target.value);
                    }}
                    styles={{
                      border: "none",
                      textAlign: "left",
                      width: "100%",
                      height: "38px",
                      borderRadius: "none",
                      fontSize: "14px",
                    }}
                  />
                  {!BGCPackage2Valid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {BGCPackage2Error}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatSelect
                    label="Bgc invoice month"
                    labelId={"BGC invoice month"}
                    options={BGCInvoiceMonthOptions}
                    value={BGCInvoiceMonth}
                    handleChange={(e: any) => {
                      setBGCInvoiceMonth(e.target.value);
                      setBGCInvoiceMonthValid(isTextValid(e.target.value));
                    }}
                    styles={{
                      border: "none",
                      textAlign: "left",
                      width: "100%",
                      height: "38px",
                      borderRadius: "none",
                      fontSize: "14px",
                    }}
                  />
                  {!BGCInvoiceMonthValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {BGCInvoiceMonthError}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatLabel
                    label={"Bgc charges primary"}
                    value={BGCChargesPrimary}
                    handleChange={(e) => {
                      setBGCChargesPrimary(e.target.value);
                      setBGCChargesPrimaryValid(isTextValid(e.target.value));
                      if (BGCChargesPrimaryValid) {
                        setBGCChargesPrimaryError(
                          "Bgc charges primary should not be empty."
                        );
                      }
                    }}
                    // placeholder={""}
                    // styles={{
                    //   border: "1px solid hsl(0, 0%, 80%)",
                    //   textAlign: "left",
                    //   width: "100%",
                    //   height: "38px",
                    //   borderRadius: "none",
                    //   fontSize: "14px",
                    // }}
                  />
                  {!BGCChargesPrimaryValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {BGCChargesPrimaryError}
                    </p>
                  ) : null}
                </Grid>
                {/* <FloatLabel
                  label="Bgc remark"
                  value={BGCRemark}
                  placeholder={""}
                  handleChange={(e) => {
                    setBGCRemark(e.target.value);
                    setBGCRemarkValid(isTextValid(e.target.value));
                    if (BGCRemarkValid) {
                      setBGCRemarkError("Bgc remark should not be empty.");
                    }
                  }}
                />
                {!BGCRemarkValid ? (
                  <p
                    className="-mt-2 text-left"
                    style={{ fontSize: "12px", color: "red" }}
                  >
                    {BGCRemarkError}
                  </p>
                ) : null} */}
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatLabel
                    label="Bgc completed on"
                    value={BGCCompletedOn}
                    type="date"
                    handleChange={(e) => {
                      setBGCCompletedOn(e.target.value);
                      setBGCCompletedOnValid(isTextValid(e.target.value));
                      if (!BGCCompletedOnValid) {
                        setBGCCompletedOnError(
                          "Bgc completed on should not be empty"
                        );
                      }
                    }}
                    placeholder={""}
                  />
                  {!BGCCompletedOnValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {BGCCompletedOnError}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatSelect
                    labelId={"BGC affidavit status"}
                    label="Bgc affidavit status"
                    options={BGCAffidavitOptions}
                    value={BGCAffidavitStatus}
                    handleChange={(e: any) => {
                      setBGCAffidavitStatus(e.target.value);
                      setBGCAffidavitStatusValid(isTextValid(e.target.value));
                    }}
                    styles={{
                      border: "none",
                      textAlign: "left",
                      width: "100%",
                      height: "38px",
                      borderRadius: "none",
                      fontSize: "14px",
                    }}
                  />
                  {!BGCAffidavitStatusValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {BGCAffidavitStatusError}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatLabel
                    type="date"
                    label="Bgc affidavit on"
                    value={BGCAffidavitOn}
                    handleChange={(e) => {
                      setBGCAffidavitOn(e.target.value);
                      setBGCAffidavitOnValid(isTextValid(e.target.value));
                      if (!BGCAffidavitOnValid) {
                        setBGCAffidavitOnError(
                          "Bgc affidavit on should not be empty."
                        );
                      }
                    }}
                    placeholder={""}
                  />
                  {!BGCAffidavitOnValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {BGCAffidavitOnError}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatSelect
                    labelId={"BGC Report Status"}
                    label="Bgc report status"
                    options={BGCReportStatusOptions}
                    value={BGCReportStatus}
                    handleChange={(e: any) => {
                      setBGCReportStatus(e.target.value);
                      setBGCReportStatusValid(isTextValid(e.target.value));
                    }}
                    styles={{
                      border: "none",
                      textAlign: "left",
                      width: "100%",
                      height: "38px",
                      borderRadius: "none",
                      fontSize: "14px",
                    }}
                  />
                  {!BGCReportStatusValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {BGCReportStatusError}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatSelect
                    labelId={"BGC adjudication Status"}
                    label="Bgc adjudication status"
                    options={BGCAdjuStatusOptions}
                    value={BGCAdjuStatus}
                    handleChange={(e: any) => {
                      setBGCAdjuStatus(e.target.value);
                      setBGCAdjuStatusValid(isTextValid(e.target.value));
                    }}
                    styles={{
                      border: "none",
                      textAlign: "left",
                      width: "100%",
                      height: "38px",
                      borderRadius: "none",
                      fontSize: "14px",
                    }}
                  />
                  {!BGCAdjuStatusValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {BGCAdjuStatusError}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatLabel
                    label="Adjudication supporting doc"
                    value={adjuSupportingDocs}
                    handleChange={(e) => {
                      setAdjuSupportingDocs(e.target.value);
                      setAdjuSupportingDocsValid(isTextValid(e.target.value));
                      if (!adjuSupportingDocsValid) {
                        setAdjuSupportingDocsError(
                          "Adjudication supporting doc should not be empty."
                        );
                      }
                    }}
                    placeholder={""}
                  />
                  {!adjuSupportingDocsValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {adjuSupportingDocsError}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatLabel
                    label="Date of adjudication"
                    value={dateOfAdjudication}
                    type="date"
                    handleChange={(e) => {
                      setDateOfAdjudication(e.target.value);
                      setDateOfAdjudicationValid(isTextValid(e.target.value));
                    }}
                    placeholder={""}
                  />
                  {!dateOfAdjudicationValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {dateOfAdjudicationError}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatSelect
                    labelId={"Final BGC report status"}
                    label="Final bgc report status"
                    options={finalBGCReportOptions}
                    value={finalBGCReport}
                    handleChange={(e: any) => {
                      setFinalBGCReport(e.target.value);
                      setFinalBGCReportValid(isTextValid(e.target.value));
                    }}
                    styles={{
                      border: "none",
                      textAlign: "left",
                      width: "100%",
                      height: "38px",
                      borderRadius: "none",
                      fontSize: "14px",
                    }}
                  />
                  {!finalBGCReportValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {finalBGCReportError}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatLabel
                    label="Bgc remark"
                    value={BGCRemark}
                    placeholder={""}
                    handleChange={(e) => {
                      setBGCRemark(e.target.value);
                      setBGCRemarkValid(isTextValid(e.target.value));
                      if (BGCRemarkValid) {
                        setBGCRemarkError("Bgc remark should not be empty.");
                      }
                    }}
                  />
                  {!BGCRemarkValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {BGCRemarkError}
                    </p>
                  ) : null}
                </Grid>
                <Grid xs={6} md={5.5} className="mb-2">
                  <FloatSelect
                    labelId={"BGC Status Options"}
                    label="Bgc status options"
                    options={BGCStatusOptions}
                    value={BGCStatus}
                    handleChange={(e: any) => {
                      setBGCStatus(e.target.value);
                      setBGCStatusValid(isTextValid(e.target.value));
                    }}
                    styles={{
                      border: "none",
                      textAlign: "left",
                      width: "100%",
                      height: "38px",
                      borderRadius: "none",
                      fontSize: "14px",
                    }}
                  />
                  {!BGCStatusValid ? (
                    <p
                      className="-mt-2 text-left"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {BGCStatusError}
                    </p>
                  ) : null}
                </Grid>
              </Grid>
            </div>
          </>

          {otherCases.map((ele: any, index: any) => (
            <div key={index}>
              {index === 0 ? (
                <div key={index} className="">
                  <div className="my-10 mt-0  flex ">
                    <button
                      className=" "
                      key={index}
                      onClick={() => handleRemoveCase(index)}
                    >
                      <h1 className=" flex justify-start mt  py-2 -mb-8 underline bg-gray-300  items-start w-[490px] rounded-none px-5 ">
                        {" "}
                        Case-{ele.id}{" "}
                      </h1>
                      <DeleteForever color="primary" className="ml-96 " />
                    </button>
                  </div>
                  <Grid
                    className="pl-4"
                    container
                    spacing={2}
                    columnGap={"15px"}
                  >
                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatLabel
                        label="Id"
                        value={caseID2}
                        placeholder={""}
                        handleChange={(e: any) => {
                          setCaseID2(e.target.value);
                          setCaseID2Valid(isTextValid(e.target.value));
                          if (!caseID2Valid)
                            setCaseID2Error("Case id2 should not be empty.");
                        }}
                        className=""
                      />
                      {!caseID2Valid ? (
                        <p
                          className="-mt-2 text-left"
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {caseID2Error}
                        </p>
                      ) : null}
                    </Grid>
                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatLabel
                        label={"Secondary BGC charges"}
                        value={secondaryBGCCharges}
                        handleChange={(e) => {
                          setSecondaryBGCCharges(e.target.value);
                          setSecondaryBGCChargesValid(
                            isTextValid(e?.target?.value)
                          );
                          if (!secondaryBGCChargesValid) {
                            setSecondaryBGCChargesError(
                              "Bgc charges secondary should not be empty."
                            );
                          }
                        }}
                        placeholder={""}
                        styles={{
                          border: "1px solid hsl(0, 0%, 80%)",
                          textAlign: "left",
                          width: "100%",
                          height: "38px",
                          borderRadius: "none",
                          fontSize: "14px",
                        }}
                      />
                      {!secondaryBGCChargesValid ? (
                        <p
                          className="-mt-2 text-left"
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {secondaryBGCChargesError}
                        </p>
                      ) : null}
                    </Grid>
                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatLabel
                        label="Secondary bgc initiated on"
                        value={secondaryBGCInitiatedOn}
                        type="date"
                        placeholder={""}
                        handleChange={(e) => {
                          setSecondaryBGCInitiatedOn(e.target.value);
                          setSecondaryBGCInitiatedOnValid(
                            isTextValid(e.target.value)
                          );
                          // ele.secondaryBGCInitiatedOn = e.target.value;
                          setOtherCases([...otherCases]);
                        }}
                      />

                      {!secondaryBGCInitiatedOnValid ? (
                        <p
                          className="-mt-2 text-left"
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {secondaryBGCInitiatedOnError}
                        </p>
                      ) : null}
                    </Grid>

                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatSelect
                        labelId={"Secondary BGC initiated thru"}
                        label="Secondary bgc initiated thru"
                        options={PrimBGCInitiatedThruOptions}
                        value={secondaryBGCInitiatedThru}
                        handleChange={(e: any) => {
                          setSecondaryBGCInitiatedThru(e?.target?.value);
                          setSecondaryBGCInitiatedThruValid(
                            isTextValid(e?.target?.value)
                          );
                        }}
                        styles={{
                          border: "none",
                          textAlign: "left",
                          width: "100%",
                          height: "38px",
                          borderRadius: "none",
                          fontSize: "14px",
                        }}
                      />
                      {!secondaryBGCInitiatedThruValid ? (
                        <p
                          className="-mt-2 text-left"
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {secondaryBGCInitiatedThruError}
                        </p>
                      ) : null}
                    </Grid>

                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatSelect
                        labelId={"Secondary BGC check-1"}
                        label="Secondary bgc check-1"
                        options={BGCPackageOptions}
                        value={secondaryBGCPackage1}
                        handleChange={(e: any) => {
                          //   let data = [...otherCases];
                          //   data[index].secondaryBGCPackage1 = e.target.value;
                          //   setOtherCases([...data]);
                          setSecondaryBGCPackage1(e.target.value);
                          setSecondaryBGCPackage1Valid(
                            isTextValid(e.target.value)
                          );
                        }}
                        styles={{
                          border: "none",
                          textAlign: "left",
                          width: "100%",
                          height: "38px",
                          borderRadius: "none",
                          fontSize: "14px",
                        }}
                      />
                      {!secondaryBGCPackage1Valid ? (
                        <p
                          className="-mt-2 text-left"
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {secondaryBGCPackage1Error}
                        </p>
                      ) : null}
                    </Grid>
                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatSelect
                        labelId={"Secondary BGC check-2"}
                        label="Secondary bgc check-2"
                        options={BGCPackageOptions}
                        value={secondaryBGCPackage2}
                        handleChange={(e: any) => {
                          // let data = [...otherCases];
                          // data[index].secondaryBGCPackage2 = e.target.value;
                          // setOtherCases([...data]);
                          setSecondaryBGCPackage2(e?.target?.value);
                          setSecondaryBGCPackage2Valid(
                            isTextValid(e?.target?.value)
                          );
                        }}
                        styles={{
                          border: "none",
                          textAlign: "left",
                          width: "100%",
                          height: "38px",
                          borderRadius: "none",
                          fontSize: "14px",
                        }}
                      />
                      {!secondaryBGCPackage2Valid ? (
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {secondaryBGCPackage2Error}
                        </p>
                      ) : null}
                    </Grid>
                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatSelect
                        labelId={"Secondary BGC invoice month"}
                        label="Secondary bgc invoice month"
                        options={BGCInvoiceMonthOptions}
                        value={secondaryBGCInvoiceMonth}
                        handleChange={(e: any) => {
                          // let data = [...otherCases];
                          // data[index].secondaryBGCInvoiceMonth = e.target.value;
                          // setOtherCases([...data]);
                          setSecondaryBGCInvoiceMonth(e.target.value);
                          setSecondaryBGCInvoiceMonthValid(
                            isTextValid(e.target.value)
                          );
                        }}
                        // handleChange={(e: any) => setSecondaryBGCInvoiceMonth(e)}
                        styles={{
                          border: "none",
                          textAlign: "left",
                          width: "100%",
                          height: "38px",
                          borderRadius: "none",
                          fontSize: "14px",
                        }}
                      />
                      {!secondaryBGCInvoiceMonthValid ? (
                        <p
                          className="-mt-2 text-left"
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {secondaryBGCInvoiceMonthError}
                        </p>
                      ) : null}
                    </Grid>
                  </Grid>
                </div>
              ) : (
                <div key={index} className="">
                  <div className="my-10 mt-0  flex">
                    <button
                      className="  "
                      key={index}
                      onClick={() => handleRemoveCase(index)}
                    >
                      <h1 className=" flex justify-start  py-2 -mb-8 underline bg-gray-300  items-start w-[490px] rounded-none px-5 ">
                        {" "}
                        Case-{ele.id}{" "}
                      </h1>
                      <DeleteForever color="primary" className="ml-96 " />
                    </button>
                  </div>
                  <Grid
                    className="pl-4"
                    container
                    spacing={2}
                    columnGap={"15px"}
                  >
                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatLabel
                        label="Id"
                        // label={`Id-${index + 2}`}
                        value={caseID3}
                        placeholder={""}
                        handleChange={(e: any) => {
                          setCaseID3(e.target.value);
                          setCaseID3Valid(isTextValid(e.target.value));
                          if (!caseID3Valid)
                            setCaseID3Error("Case id3 should not be empty.");
                        }}
                        className=""
                      />
                      {!caseID3Valid ? (
                        <p
                          className="-mt-2 text-left"
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {caseID3Error}
                        </p>
                      ) : null}
                    </Grid>
                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatLabel
                        label="Tertiary BGC Charges"
                        value={tertiaryBGCCharges}
                        // placeholder={""}
                        handleChange={(e) => {
                          // ele.secondaryBGCCharges = e.target.value;
                          // setOtherCases([...otherCases]);

                          setTertiaryBGCCharges(e?.target?.value);
                          setTertiaryBGCChargesValid(
                            isTextValid(e.target.value)
                          );
                          if (tertiaryBGCChargesValid) {
                            setTertiaryBGCChargesError(
                              "Tertiary bgc charges should not be empty."
                            );
                          }
                        }}
                      />
                      {!tertiaryBGCChargesValid ? (
                        <p
                          className="-mt-2 text-left"
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {tertiaryBGCChargesError}
                        </p>
                      ) : null}
                    </Grid>

                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatLabel
                        label="Tertiary BGC Initiated On"
                        value={tertiaryBGCInitiatedOn}
                        type="date"
                        placeholder={""}
                        handleChange={(e: any) => {
                          setTertiaryBGCInitiatedOn(e.target.value);
                          setTertiaryBGCInitiatedOnValid(
                            isTextValid(e.target.value)
                          );
                        }}
                      />

                      {!tertiaryBGCInitiatedOnValid ? (
                        <p
                          className="-mt-2 text-left"
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {tertiaryBGCInitiatedOnError}
                        </p>
                      ) : null}
                    </Grid>

                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatSelect
                        labelId={"Tertiary BGC Initiated Thru	  "}
                        label="Tertiary BGC Initiated Thru	
                        "
                        options={PrimBGCInitiatedThruOptions}
                        value={tertiaryBGCInitiatedThru}
                        handleChange={(e: any) => {
                          setTertiaryBGCInitiatedThru(e.target.value);
                          setTertiaryBGCInitiatedThruValid(
                            isTextValid(e.target.value)
                          );
                        }}
                        styles={{
                          border: "none",
                          textAlign: "left",
                          width: "100%",
                          height: "38px",
                          borderRadius: "none",
                          fontSize: "14px",
                        }}
                      />
                      {!tertiaryBGCInitiatedThruValid ? (
                        <p
                          className="-mt-2 text-left"
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {tertiaryBGCInitiatedThruError}
                        </p>
                      ) : null}
                    </Grid>
                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatSelect
                        labelId={"Tertiary BGC Invoice Month"}
                        label="Tertiary BGC Invoice Month"
                        options={BGCInvoiceMonthOptions}
                        value={tertiaryBGCInvoiceMonth}
                        handleChange={(e: any) => {
                          setTertiaryBGCInvoiceMonth(e.target.value);
                          setTertiaryBGCInvoiceMonthValid(
                            isTextValid(e.target.value)
                          );
                        }}
                        styles={{
                          border: "none",
                          textAlign: "left",
                          width: "100%",
                          height: "38px",
                          borderRadius: "none",
                          fontSize: "14px",
                        }}
                      />

                      {!tertiaryBGCInvoiceMonthValid ? (
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {tertiaryBGCInvoiceMonthError}
                        </p>
                      ) : null}
                    </Grid>

                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatSelect
                        labelId={"Tertiary BGC Package 1	"}
                        label="Tertiary BGC Package 1"
                        options={BGCPackageOptions}
                        value={tertiaryBGCPackage1}
                        handleChange={(e: any) => {
                          setTertiaryBGCPackage1(e.target.value);
                          setTertiaryBGCPackage1Valid(
                            isTextValid(e.target.value)
                          );
                        }}
                        placeholder={""}
                        styles={{
                          border: "1px solid hsl(0, 0%, 80%)",
                          textAlign: "left",
                          width: "100%",
                          height: "38px",
                          borderRadius: "none",
                          fontSize: "14px",
                        }}
                      />

                      {!tertiaryBGCPackage1Valid ? (
                        <p
                          className="-mt-2 text-left"
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {tertiaryBGCPackage1Error}
                        </p>
                      ) : null}
                    </Grid>
                    <Grid xs={6} md={5.5} className="mb-2">
                      <FloatSelect
                        labelId={"Tertiary BGC Package 2	"}
                        label="Tertiary BGC Package 2"
                        options={BGCPackage2Options}
                        value={tertiaryBGCPackage2}
                        handleChange={(e: any) => {
                          setTertiaryBGCPackage2(e.target.value);
                          setTertiaryBGCPackage2Valid(
                            isTextValid(e.target.value)
                          );
                        }}
                        placeholder={""}
                        styles={{
                          border: "1px solid hsl(0, 0%, 80%)",
                          textAlign: "left",
                          width: "100%",
                          height: "38px",
                          borderRadius: "none",
                          fontSize: "14px",
                        }}
                      />

                      {!tertiaryBGCPackage2Valid ? (
                        <p
                          className="-mt-2 text-left"
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {tertiaryBGCPackage2Error}
                        </p>
                      ) : null}
                    </Grid>
                  </Grid>
                </div>
              )}
            </div>
          ))}
        </Grid>

        <div className="m-auto w-[20%] ml-[35%] text-white ">
          <Button
            className=""
            value="Update"
            handleClick={() => {
              updateCandidateBackground();
            }}
            styles={{ fontSize: "16px" }}
          />
        </div>
      </div>
    </>
  );
};

export default ShowBackgroundCheck;
