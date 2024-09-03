import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { TextField } from "../../common/TextField/TextField";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import {
  ArticlesOfIncorporationList,
  CertificateOfInsuranceList,
  CipcicaCipcicuList,
  ClientTaskOrderOrSOWList,
  ClientTaskOrderOrSOWStepList,
  ClientTaskOrderSigningList,
  DirectDepositeAgreementList,
  DocumentationStatusList,
  EVerifyList,
  EemergencyFormList,
  GoodStandingDocumentationList,
  I9FormList,
  ListADocumentsList,
  ListBDocumentsList,
  ListCDocumentsList,
  MSAList,
  SOWList,
  VaccinationStatusList,
  VoidCheckEmailList,
  W9W4List,
  WorkAuthorizeDocumentationList,
} from "../../constants/constants";
import Select from "react-select";
import { Modal } from "../../common/Modal/Modal";
import { DropDown } from "../../common/DropDown/DropDown";
import { DatePicker } from "../../common/DatePicker/DatePicker";
import moment from "moment";
import { Button } from "../../common/Button/Button";
import { editCandidateDocumentationData } from "../../actions/documentation";
import { RootState } from "../../redux/store";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { isTextValid } from "../../helpers/validate";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";
import { FloatSelect } from "../../common/FloatSelect/FloatSelect";

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
}

const ShowDocumentation: React.FC<Props> = ({
  open,
  setOpen,
  // data,
  showTableCount,
  int,
  setShowModal,
}) => {
  const dispatch = useAppDispatch();
  let data = useAppSelector(
    (state: RootState) => state?.documentation?.singleDocumentationData
  );
  const [disable, setDisable] = React.useState(true);

  const [
    articlesOrCertificateOFIncorporation,
    setArticlesOrCertificateOFIncorporation,
  ] = React.useState(data?.articlesOrCertificateOFIncorporation);

  const [w9Orw4, setW9Orw4] = React.useState(data?.w9Orw4);
  const [directDepositAgreement, setDirectDepositAgreement] = React.useState(
    data?.directDepositAgreement
  );
  const [voidCheckOrEmailContent, setVoidCheckOrEmailContent] = React.useState(
    data?.voidCheckOrEmailContent
  );
  const [CIPCICICAOrCIPCICU, setCIPCICICAOrCIPCICU] = React.useState(
    data?.CIPCICICAOrCIPCICU
  );
  const [goodStandingDocument, setGoodStandingDocument] = React.useState(
    data?.goodStandingDocument
  );
  const [workAuthorizationDocument, setWorkAuthorizationDocument] =
    React.useState(data?.workAuthorizationDocument);
  const [I9Form, setI9Form] = React.useState(data?.I9Form);
  const [listADocument, setListADocument] = React.useState(data?.listADocument);
  const [listBDocument, setListBDocument] = React.useState(data?.listBDocument);
  const [listCDocument, setListCDocument] = React.useState(data?.listCDocument);
  const [E_verify, setE_verify] = React.useState(data?.E_verify);
  const [E_verificationDate, setE_verificationDate] = React.useState(
    moment.utc(data?.E_verificationDate).format("YYYY-MM-DD")
  );
  const [emergencyForm, setEmergencyForm] = React.useState(data?.emergencyForm);
  const [vaccinationStatus, setVaccinationStatus] = React.useState(
    data?.vaccinationStatus
  );
  const [clientTaskOrderOrSOWst, setClientTaskOrderOrSOWst] = React.useState(
    data?.clientTaskOrderOrSOWst
  );
  const [MSA, setMSA] = React.useState(data?.MSA);

  const [SOW, setSOW] = React.useState(data?.SOW);
  const [SOWValidity, setSOWValidity] = React.useState(
    moment.utc(data?.SOWValidity).format("YYYY-MM-DD")
  );
  const [certificateOFInsuranceOrCOI, setCertificateOFInsuranceOrCOI] =
    React.useState(data?.certificateOFInsuranceOrCOI);

  const [clientTaskOrderSigning, setClientTaskOrderSigning] = React.useState(
    data?.clientTaskOrderSigning
  );
  const [TaskOrderExpiryDate, setTaskOrderExpiryDate] = React.useState(
    moment.utc(data?.TaskOrderExpiryDate).format("YYYY-MM-DD")
  );
  const [certificationOfInsurance, setCertificationOfInsurance] =
    React.useState(
      moment.utc(data?.certificationOfInsurance).format("YYYY-MM-DD")
    );
  const [clientTaskOrderOrSOW, setClientTaskOrderOrSOW] = React.useState(
    data?.clientTaskOrderOrSOW
  );
  const [documentationStatus, setDocumentationStatus] = React.useState(
    data?.documentationStatus
  );
  const [documentationCompletionDate, setDocumentationCompletionDate] =
    React.useState(
      moment.utc(data?.documentationCompletionDate).format("YYYY-MM-DD")
    );
  const [documentationRemark, setDocumentationRemark] = React.useState(
    data?.documentationRemark
  );
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setArticlesOrCertificateOFIncorporation(
      data?.articlesOrCertificateOFIncorporation
    );
    setW9Orw4(data?.w9Orw4);
    setDirectDepositAgreement(data?.directDepositAgreement);
    setVoidCheckOrEmailContent(data?.voidCheckOrEmailContent);
    setCIPCICICAOrCIPCICU(data?.CIPCICICAOrCIPCICU);
    setGoodStandingDocument(data?.goodStandingDocument);
    setWorkAuthorizationDocument(data?.workAuthorizationDocument);

    setI9Form(data?.I9Form);
    setListADocument(data?.listADocument);
    setListBDocument(data?.listBDocument);
    setListCDocument(data?.listCDocument);
    setE_verify(data?.E_verify);

    setE_verificationDate(
      moment.utc(data?.E_verificationDate).format("YYYY-MM-DD")
    );
    setEmergencyForm(data?.emergencyForm);
    setVaccinationStatus(data?.vaccinationStatus);
    setClientTaskOrderOrSOWst(data?.clientTaskOrderOrSOWst);
    setMSA(data?.MSA);
    setSOW(data?.SOW);
    setSOWValidity(moment.utc(data?.SOWValidity).format("YYYY-MM-DD"));
    setCertificateOFInsuranceOrCOI(data?.certificateOFInsuranceOrCOI);
    setClientTaskOrderSigning(data?.clientTaskOrderSigning);
    setTaskOrderExpiryDate(
      moment.utc(data?.TaskOrderExpiryDate).format("YYYY-MM-DD")
    );
    setCertificationOfInsurance(
      moment.utc(data?.certificationOfInsurance).format("YYYY-MM-DD")
    );
    setClientTaskOrderOrSOW(data?.clientTaskOrderOrSOW);
    setDocumentationStatus(data?.documentationStatus);
    setDocumentationCompletionDate(
      moment.utc(data?.documentationCompletionDate).format("YYYY-MM-DD")
    );
    setDocumentationRemark(data?.documentationRemark);
    setCount(1);
  }, [data]);

  const [
    articlesOrCertificateOFIncorporationValid,
    setArticlesOrCertificateOFIncorporationValid,
  ] = useState<boolean>();

  const [w9Orw4Valid, setW9Orw4Valid] = useState<boolean>();
  const [directDepositAgreementValid, setDirectDepositAgreementValid] =
    useState<boolean>();
  const [voidCheckOrEmailContentValid, setVoidCheckOrEmailContentValid] =
    useState<boolean>();
  const [CIPCICICAOrCIPCICUValid, setCIPCICICAORCIPCICUValid] =
    useState<boolean>();
  const [goodStandingDocumentValid, setGoodStandingDocumentValid] =
    useState<boolean>();
  const [workAuthorizationDocumentValid, setWorkAuthorizationDocumentValid] =
    useState<boolean>();
  const [I9FormValid, setI9FOrmValid] = useState<boolean>();
  const [listADocumentValid, setListADocumentValid] = useState<boolean>();
  const [listBDocumentValid, setListBDocumentValid] = useState<boolean>();
  const [listCDocumentValid, setListCDocumentValid] = useState<boolean>();
  const [E_verifyValid, setE_VerifyValid] = useState<boolean>();
  const [E_verificationDateValid, setE_VerificationDateValid] =
    useState<boolean>();
  const [emergencyFormValid, setemergencyFormValid] = useState<boolean>();
  const [vaccinationStatusValid, setVaccinationStatusValid] =
    useState<boolean>();
  const [clientTaskOrderOrSOWstValid, setClientTaskOrderOrSOWstValid] =
    useState<boolean>();
  const [MSAValid, setMSAValid] = useState<boolean>();
  const [SOWValid, setSOWValid] = useState<boolean>();
  const [SOWValidityValid, setSOWVAlidityValid] = useState<boolean>();
  const [
    certificateOFInsuranceOrCOIValid,
    setCertificateOFInsuranceOrCOIValid,
  ] = useState<boolean>();
  const [clientTaskOrderSigningValid, setClientTaskOrderSigningValid] =
    useState<boolean>();
  const [TaskOrderExpiryDateValid, setTAskOrderExpiryDateValid] =
    useState<boolean>();
  const [certificationOfInsuranceValid, setCertificationOfInsuranceValid] =
    useState<boolean>();

  const [documentationStatusValid, setDocumentationStatusValid] =
    useState<boolean>();
  const [clientTaskOrderOrSOWValid, setClientTaskOrderOrSOWValid] =
    useState<boolean>();
  const [documentationRemarkValid, setDocumentationRemarkValid] =
    useState<boolean>();
  const [
    documentationCompletionDateValid,
    setDocumentationCompletionDateValid,
  ] = useState<boolean>();

  const [
    articlesOrCertificateOFIncorporationError,
    setArticlesOrCertificateOFIncorporationError,
  ] = useState<any>();

  const [w9Orw4Error, setW9Orw4Error] = useState<any>();
  const [directDepositAgreementError, setDirectDepositAgreementError] =
    useState<any>();
  const [voidCheckOrEmailContentError, setVoidCheckOrEmailContentError] =
    useState<any>();
  const [CIPCICICAOrCIPCICUError, setCIPCICICAORCIPCICUError] = useState<any>();
  const [goodStandingDocumentError, setGoodStandingDocumentError] =
    useState<any>();
  const [workAuthorizationDocumentError, setWorkAuthorizationDocumentError] =
    useState<any>();
  const [I9FormError, setI9FOrmError] = useState<any>();
  const [listADocumentError, setListADocumentError] = useState<any>();
  const [listBDocumentError, setListBDocumentError] = useState<any>();
  const [listCDocumentError, setListCDocumentError] = useState<any>();
  const [E_verifyError, setE_VerifyError] = useState<any>();
  const [E_verificationDateError, setE_VerificationDateError] = useState<any>();
  const [emergencyFormError, setemergencyFormError] = useState<any>();
  const [vaccinationStatusError, setVaccinationStatusError] = useState<any>();
  const [clientTaskOrderOrSOWstError, setClientTaskOrderOrSOWstError] =
    useState<any>();
  const [MSAError, setMSAError] = useState<any>();
  const [SOWError, setSOWError] = useState<any>();
  const [SOWValidityError, setSOWVAlidityError] = useState<any>();
  const [
    certificateOFInsuranceOrCOIError,
    setCertificateOFInsuranceOrCOIError,
  ] = useState<any>();
  const [clientTaskOrderSigningError, setClientTaskOrderSigningError] =
    useState<any>();
  const [TaskOrderExpiryDateError, setTAskOrderExpiryDateError] =
    useState<any>();
  const [certificationOfInsuranceError, setCertificationOfInsuranceError] =
    useState<any>();

  const [documentationStatusError, setDocumentationStatusError] =
    useState<any>();
  const [clientTaskOrderOrSOWError, setClientTaskOrderOrSOWError] =
    useState<any>();
  const [documentationRemarkError, setDocumentationRemarkError] =
    useState<any>();
  const [
    documentationCompletionDateError,
    setDocumentationCompletionDateError,
  ] = useState<any>();

  function updateCandidateDocumentation() {
    setArticlesOrCertificateOFIncorporationValid(
      isTextValid(articlesOrCertificateOFIncorporation)
    );
    setW9Orw4Valid(isTextValid(w9Orw4));
    setDirectDepositAgreementValid(isTextValid(directDepositAgreement));
    setVoidCheckOrEmailContentValid(isTextValid(voidCheckOrEmailContent));
    setCIPCICICAORCIPCICUValid(isTextValid(CIPCICICAOrCIPCICU));
    setGoodStandingDocumentValid(isTextValid(goodStandingDocument));
    setWorkAuthorizationDocumentValid(isTextValid(workAuthorizationDocument));
    setI9FOrmValid(isTextValid(I9Form));
    setListADocumentValid(isTextValid(listADocument));
    setListBDocumentValid(isTextValid(listBDocument));
    setListCDocumentValid(isTextValid(listCDocument));
    setE_VerifyValid(isTextValid(E_verify));
    setE_VerificationDateValid(isTextValid(E_verificationDate));
    setemergencyFormValid(isTextValid(emergencyForm));
    setVaccinationStatusValid(isTextValid(vaccinationStatus));
    setClientTaskOrderOrSOWstValid(isTextValid(clientTaskOrderOrSOWst));

    setMSAValid(isTextValid(MSA));
    setSOWValid(isTextValid(SOW));
    setSOWVAlidityValid(isTextValid(SOWValidity));
    setCertificateOFInsuranceOrCOIValid(
      isTextValid(certificateOFInsuranceOrCOI)
    );
    setClientTaskOrderSigningValid(isTextValid(clientTaskOrderSigning));
    setTAskOrderExpiryDateValid(isTextValid(TaskOrderExpiryDate));
    setCertificationOfInsuranceValid(isTextValid(certificationOfInsurance));
    setClientTaskOrderOrSOWValid(isTextValid(clientTaskOrderOrSOW));
    setDocumentationStatusValid(isTextValid(documentationStatus));
    setDocumentationCompletionDateValid(
      isTextValid(documentationCompletionDate)
    );
    setDocumentationRemarkValid(isTextValid(documentationRemark));

    if (
      isTextValid(articlesOrCertificateOFIncorporation) &&
      isTextValid(w9Orw4) &&
      isTextValid(directDepositAgreement) &&
      isTextValid(voidCheckOrEmailContent) &&
      isTextValid(CIPCICICAOrCIPCICU) &&
      isTextValid(goodStandingDocument) &&
      isTextValid(workAuthorizationDocument) &&
      isTextValid(I9Form) &&
      isTextValid(listADocument) &&
      isTextValid(listBDocument) &&
      isTextValid(listCDocument) &&
      isTextValid(E_verify) &&
      isTextValid(E_verificationDate) &&
      isTextValid(emergencyForm) &&
      isTextValid(vaccinationStatus) &&
      isTextValid(clientTaskOrderOrSOWst) &&
      isTextValid(MSA) &&
      isTextValid(SOW) &&
      isTextValid(SOWValidity) &&
      isTextValid(certificateOFInsuranceOrCOI) &&
      isTextValid(clientTaskOrderSigning) &&
      isTextValid(TaskOrderExpiryDate) &&
      isTextValid(certificationOfInsurance) &&
      isTextValid(clientTaskOrderOrSOW) &&
      isTextValid(documentationStatus) &&
      isTextValid(documentationCompletionDate) &&
      isTextValid(documentationRemark)
    ) {
      dispatch(
        editCandidateDocumentationData(
          articlesOrCertificateOFIncorporation,
          w9Orw4,
          directDepositAgreement,
          voidCheckOrEmailContent,
          CIPCICICAOrCIPCICU,
          goodStandingDocument,
          workAuthorizationDocument,
          I9Form,
          listADocument,
          listBDocument,
          listCDocument,
          E_verify,
          E_verificationDate,
          emergencyForm,
          vaccinationStatus,
          clientTaskOrderOrSOWst,
          MSA,
          SOW,
          SOWValidity,
          certificateOFInsuranceOrCOI,
          clientTaskOrderSigning,
          TaskOrderExpiryDate,
          certificationOfInsurance,
          clientTaskOrderOrSOW,
          documentationStatus,
          documentationCompletionDate,
          documentationRemark,

          data?.candidateId
        )
      );
      setShowModal(false);
    } else {
      if (!articlesOrCertificateOFIncorporationValid) {
        setArticlesOrCertificateOFIncorporationError(
          "articles Or Certificat eOF Incorporation should not be empty."
        );
      }
      if (!w9Orw4Valid) {
        setW9Orw4Error("w9Orw4 should not be empty.");
      }
      if (!directDepositAgreementValid) {
        setDirectDepositAgreementError(
          "direct Deposit Agreement should not be empty."
        );
      }

      if (!voidCheckOrEmailContentValid) {
        setVoidCheckOrEmailContentError(
          "void Check Or Email Content should not be empty."
        );
      }
      if (!CIPCICICAOrCIPCICUValid) {
        setCIPCICICAORCIPCICUError("CIPCICICA Or CIPCICU should not be empty.");
      }
      if (!goodStandingDocumentValid) {
        setGoodStandingDocumentError(
          "good Standing Document should not be empty."
        );
      }
      if (!workAuthorizationDocumentValid) {
        setWorkAuthorizationDocumentError(
          "Work authorization document should not be empty."
        );
      }
      if (!I9FormValid) {
        setI9FOrmError("I9 Form should not be empty.");
      }
      if (!listADocumentValid) {
        setListADocumentError("list A Document should not be empty.");
      }
      if (!listBDocumentValid) {
        setListBDocumentError("list B Document should not be empty.");
      }
      if (!listCDocumentValid) {
        setListCDocumentError("list C DocumentValid should not be empty.");
      }
      if (!E_verifyValid) {
        setE_VerifyError("E_verify should not be empty.");
      }
      if (!E_verificationDateValid) {
        setE_VerificationDateError("E_verification Date should not be empty.");
      }
      if (!emergencyFormValid) {
        setemergencyFormError("Emergency form should not be empty.");
      }
      if (!vaccinationStatusValid) {
        setVaccinationStatusError("Vaccination status should not be empty.");
      }
      if (!clientTaskOrderOrSOWstValid) {
        setClientTaskOrderOrSOWError(
          "Client task order Or SOWst should not be empty."
        );
      }
      if (!MSAValid) {
        setMSAError("MSA should not be empty.");
      }
      if (!SOWValid) {
        setSOWError("SOW should not be empty.");
      }
      if (!SOWValidityValid) {
        setSOWVAlidityError("SOW Validity should not be empty.");
      }
      if (!certificateOFInsuranceOrCOIValid) {
        setCertificateOFInsuranceOrCOIError(
          "Certificate OF Insurance Or COI should not be empty."
        );
      }
      if (!clientTaskOrderSigningValid) {
        setClientTaskOrderSigningError(
          "Client Task Order Signing should not be empty."
        );
      }
      if (!TaskOrderExpiryDateValid) {
        setTAskOrderExpiryDateError(
          "Task Order Expiry Date should not be empty."
        );
      }
      if (!certificationOfInsuranceValid) {
        setCertificationOfInsuranceError(
          "Certification Of Insurance should not be empty."
        );
      }
      if (!documentationStatusValid) {
        setDocumentationStatusError(
          "Documentation Status should not be empty."
        );
      }
      if (!clientTaskOrderOrSOWValid) {
        setClientTaskOrderOrSOWError(
          "Client Task OrderOrSOW should not be empty."
        );
      }
      if (!documentationRemarkValid) {
        setDocumentationRemarkError(
          "Documentation remark should not be empty."
        );
      }
      if (!documentationCompletionDateValid) {
        setDocumentationCompletionDateError(
          "Documentation Completion Date should not be empty."
        );
      }
    }
  }

  return (
    <div className="pt-10 pl-10 h-[60vh] overflow-auto" id="no-scroll-div">
      <Grid container spacing={2} columnGap={"15px"}>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"CIPCICICA OR CIPCICU"}
            options={CipcicaCipcicuList}
            label="CIPCICICA OR CIPCICU"
            value={CIPCICICAOrCIPCICU}
            handleChange={(e: any) => {
              setCIPCICICAOrCIPCICU(e.target.value);
              setCIPCICICAORCIPCICUValid(isTextValid(e.target.value));
              console.log("CIPCICICAOrCIPCICU: ", e.target.value);
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
          {!CIPCICICAOrCIPCICUValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "5px" }}
            >
              {CIPCICICAOrCIPCICUError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatLabel
            label="E_verificationDate"
            type="date"
            value={E_verificationDate}
            placeholder={""}
            handleChange={(event) => {
              setE_verificationDate(event.target.value);
              setE_VerificationDateValid(isTextValid(event.target.value));
              if (!E_verificationDateValid) {
                setE_VerificationDateError(
                  "E-verification Date should not be empty."
                );
              }
            }}
            className=""
          />
          {!E_verificationDateValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "5px" }}
            >
              {E_verificationDateError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"E Verify"}
            options={EVerifyList}
            label="E Verify"
            value={E_verify}
            handleChange={(e: any) => {
              setE_verify(e.target.value);
              setE_VerifyValid(isTextValid(e.target.value));
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
          {!E_verifyValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            >
              {E_verifyError}
            </p>
          ) : (
            <p
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            ></p>
          )}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"I9 form"}
            options={I9FormList}
            label="I9 form"
            value={I9Form}
            handleChange={(e: any) => {
              setI9Form(e.target.value);
              setI9FOrmValid(isTextValid(e.target.value));
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
          {!I9FormValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            >
              {I9FormError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"MSA"}
            options={MSAList}
            label="MSA"
            value={MSA}
            handleChange={(e: any) => {
              setMSA(e.target.value);
              setMSAValid(isTextValid(e.target.value));
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
          {!MSAValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {MSAError}
            </p>
          ) : (
            <p
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            ></p>
          )}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"SOW"}
            options={SOWList}
            label="SOW"
            value={SOW}
            handleChange={(e: any) => {
              setSOW(e.target.value);
              setSOWValid(isTextValid(e.target.value));
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
          {!SOWValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {SOWError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatLabel
            label="SOW validity"
            type="date"
            value={SOWValidity}
            placeholder={""}
            handleChange={(event) => {
              setSOWValidity(event.target.value);
              setSOWVAlidityValid(isTextValid(event.target.value));
              if (!SOWValidityValid) {
                setSOWVAlidityError("SOW validity should not be empty.");
              }
            }}
            className=""
          />
          {!SOWValidityValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            >
              {SOWValidityError}
            </p>
          ) : (
            <p
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            ></p>
          )}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatLabel
            label="Task order expiry date"
            type="date"
            value={TaskOrderExpiryDate}
            placeholder={""}
            handleChange={(event) => {
              setTaskOrderExpiryDate(event.target.value);
              setTAskOrderExpiryDateValid(isTextValid(event.target.value));
              if (!TaskOrderExpiryDateValid) {
                setTAskOrderExpiryDateError(
                  "Task order expiry date should not be empty."
                );
              }
            }}
            className=""
          />
          {!TaskOrderExpiryDateValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            >
              {TaskOrderExpiryDateError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"Art. if inc"}
            options={ArticlesOfIncorporationList}
            label="Art. if inc"
            value={articlesOrCertificateOFIncorporation}
            handleChange={(e: any) => {
              setArticlesOrCertificateOFIncorporation(e.target.value);
              setArticlesOrCertificateOFIncorporationValid(
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
          {!articlesOrCertificateOFIncorporationValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {articlesOrCertificateOFIncorporationError}
            </p>
          ) : (
            <p
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            ></p>
          )}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"COI list"}
            options={CertificateOfInsuranceList}
            label="COI list"
            value={certificateOFInsuranceOrCOI}
            handleChange={(e: any) => {
              setCertificateOFInsuranceOrCOI(e.target.value);
              setCertificateOFInsuranceOrCOIValid(isTextValid(e.target.value));
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
          {!certificateOFInsuranceOrCOIValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "5px" }}
            >
              {certificateOFInsuranceOrCOIError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatLabel
            label="COI date"
            type="date"
            value={certificationOfInsurance}
            placeholder={""}
            handleChange={(event) => {
              setCertificationOfInsurance(event.target.value);
              setCertificationOfInsuranceValid(isTextValid(event.target.value));
              if (!certificationOfInsuranceValid) {
                setCertificationOfInsuranceError(
                  "Certificate of insurance Date should not be empty."
                );
              }
            }}
            className=""
          />
          {!certificationOfInsuranceValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {certificationOfInsuranceError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"COI or SOW list"}
            options={ClientTaskOrderOrSOWList}
            label="COI or SOW list"
            value={clientTaskOrderOrSOW}
            handleChange={(e: any) => {
              setClientTaskOrderOrSOW(e.target.value);
              setClientTaskOrderOrSOWValid(isTextValid(e.target.value));
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

          {!clientTaskOrderOrSOWValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "5px" }}
            >
              {clientTaskOrderOrSOWError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"CTO or SOW step"}
            options={ClientTaskOrderOrSOWStepList}
            label="CTO or SOW step"
            value={clientTaskOrderOrSOWst}
            handleChange={(e: any) => {
              setClientTaskOrderOrSOWst(e.target.value);
              setClientTaskOrderOrSOWstValid(isTextValid(e.target.value));
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
          {!clientTaskOrderOrSOWstValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {clientTaskOrderOrSOWstError}
            </p>
          ) : (
            <p
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            ></p>
          )}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"CTO signing"}
            options={ClientTaskOrderSigningList}
            label="CTO signing"
            value={clientTaskOrderSigning}
            handleChange={(e: any) => {
              setClientTaskOrderSigning(e.target.value);
              setClientTaskOrderSigningValid(isTextValid(e.target.value));
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
          {!clientTaskOrderSigningValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "5px" }}
            >
              {clientTaskOrderSigningError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"Direct deposit agreement"}
            options={DirectDepositeAgreementList}
            label="Direct deposit agreement"
            value={directDepositAgreement}
            handleChange={(e: any) => {
              setDirectDepositAgreement(e.target.value);
              setDirectDepositAgreementValid(isTextValid(e.target.value));
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
          {!directDepositAgreementValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {directDepositAgreementError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatLabel
            label="Doc. completion date"
            type="date"
            value={documentationCompletionDate}
            placeholder={""}
            handleChange={(event) => {
              setDocumentationCompletionDate(event.target.value);
              setDocumentationCompletionDateValid(
                isTextValid(event.target.value)
              );
              if (!documentationCompletionDateValid) {
                setDocumentationCompletionDateError(
                  "Documentation completion date should not be empty."
                );
              }
            }}
            className=""
          />
          {!documentationCompletionDateValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {documentationCompletionDateError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"Doc. status"}
            options={DocumentationStatusList}
            label="Doc. status"
            value={documentationStatus}
            handleChange={(e: any) => {
              setDocumentationStatus(e.target.value);
              setDocumentationStatusValid(isTextValid(e.target.value));
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
          {!documentationStatusValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {documentationStatusError}
            </p>
          ) : (
            <p
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            ></p>
          )}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"Emergency form"}
            options={EemergencyFormList}
            label="Emergency form"
            value={emergencyForm}
            handleChange={(e: any) => {
              setEmergencyForm(e.target.value);
              setemergencyFormValid(isTextValid(e.target.value));
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
          {!emergencyFormValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "5px" }}
            >
              {emergencyFormError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"Good stand. doc."}
            options={GoodStandingDocumentationList}
            label="Good stand. doc."
            value={goodStandingDocument}
            handleChange={(e: any) => {
              setGoodStandingDocument(e.target.value);
              setGoodStandingDocumentValid(isTextValid(e.target.value));
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
          {!goodStandingDocumentValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {goodStandingDocumentError}
            </p>
          ) : (
            <p
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            ></p>
          )}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"List A doc."}
            options={ListADocumentsList}
            label="List A doc."
            value={listADocument}
            handleChange={(e: any) => {
              setListADocument(e.target.value);
              setListADocumentValid(isTextValid(e.target.value));
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
          {!listADocumentValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {listADocumentError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"List B doc."}
            options={ListBDocumentsList}
            label="List B doc."
            value={listBDocument}
            handleChange={(e: any) => {
              setListBDocument(e.target.value);
              setListBDocumentValid(isTextValid(e.target.value));
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
          {!listBDocumentValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {listBDocumentError}
            </p>
          ) : (
            <p
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            ></p>
          )}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"List C doc."}
            options={ListCDocumentsList}
            label="List C doc."
            value={listCDocument}
            handleChange={(e: any) => {
              setListCDocument(e.target.value);
              setListCDocumentValid(isTextValid(e.target.value));
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
          {!listCDocumentValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {listCDocumentError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"Vaccination status"}
            options={VaccinationStatusList}
            label="Vaccination status"
            value={vaccinationStatus}
            handleChange={(e: any) => {
              setVaccinationStatus(e.target.value);
              setVaccinationStatusValid(isTextValid(e.target.value));
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
          {!vaccinationStatusValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {vaccinationStatusError}
            </p>
          ) : (
            <p
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            ></p>
          )}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"Void check/email content"}
            options={VoidCheckEmailList}
            label="Void check/email content"
            value={voidCheckOrEmailContent}
            handleChange={(e: any) => {
              setVoidCheckOrEmailContent(e.target.value);
              setVoidCheckOrEmailContentValid(isTextValid(e.target.value));
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
          {!voidCheckOrEmailContentValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {voidCheckOrEmailContentError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"W9 or W4"}
            options={W9W4List}
            label={"W9 or W4"}
            value={w9Orw4}
            handleChange={(e: any) => {
              setW9Orw4(e.target.value);
              setW9Orw4Valid(isTextValid(e.target.value));
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
          {!w9Orw4Valid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "15px" }}
            >
              {w9Orw4Error}
            </p>
          ) : (
            <p
              style={{ fontSize: "12px", color: "red", marginBottom: "10px" }}
            ></p>
          )}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatSelect
            labelId={"Work. Auth. doc."}
            options={WorkAuthorizeDocumentationList}
            label={"Work. Auth. doc."}
            value={workAuthorizationDocument}
            handleChange={(e: any) => {
              setWorkAuthorizationDocument(e.target.value);
              setWorkAuthorizationDocumentValid(isTextValid(e.target.value));
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
          {!workAuthorizationDocumentValid ? (
            <p
              className=""
              style={{ fontSize: "12px", color: "red", marginBottom: "5px" }}
            >
              {workAuthorizationDocumentError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5}>
          <FloatLabel
            label="Documentation remark"
            value={documentationRemark}
            placeholder={""}
            handleChange={(event) => {
              setDocumentationRemark(event.target.value);
              setDocumentationRemarkValid(isTextValid(event.target.value));
              if (!documentationRemarkValid) {
                setDocumentationRemarkError(
                  "Documentation remark should not be empty."
                );
              }
            }}
            className=""
          />
          {!documentationRemarkValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red", marginBottom: "5px" }}
            >
              {documentationRemarkError}
            </p>
          ) : null}
        </Grid>
      </Grid>
      <div className="m-auto w-[20%] ml-[35%] text-white ">
        <Button
          className=""
          value="Update"
          handleClick={() => {
            updateCandidateDocumentation();
          }}
          styles={{ fontSize: "16px" }}
        />
      </div>
    </div>
  );
};

export default ShowDocumentation;
