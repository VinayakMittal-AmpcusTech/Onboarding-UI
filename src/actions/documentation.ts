import axios from "axios";
import {
  EMPTY_DOCUMENTATION,
  EMPTY_DOCUMENTATION_VALIDATION_DATA,
} from "../utils/documentationUtil";
import {
  DOCUMENTATION_DATA,
  DOCUMENTATION_VALIDATION_DATA,
  LOCAL_DOCUMENTATION_DATA,
  LOCAL_DOCUMENTATION_VALIDATION_DATA,
  SINGLE_DOCUMENTATION,
  SINGLE_DOCUMENTATION_ERROR,
} from "./type";
import Swal from "sweetalert2";
import { allCandidateData } from "./candidate";

export const documentation = () => async (dispatch: any) => {
  dispatch({ type: DOCUMENTATION_DATA, payload: EMPTY_DOCUMENTATION });
};

export const setDocumentationCheckInputBoxValue =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({ type: LOCAL_DOCUMENTATION_DATA, payload: { key, value } });
  };

export const docValidationData = () => async (dispatch: any) => {
  dispatch({
    type: DOCUMENTATION_VALIDATION_DATA,
    payload: EMPTY_DOCUMENTATION_VALIDATION_DATA,
  });
};

export const setDocValidation =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({
      type: LOCAL_DOCUMENTATION_VALIDATION_DATA,
      payload: { key, value },
    });
  };

export const getCandidateDocumentation =
  (candidateId: number) => async (dispatch: any) => {
    try {
      const result = await axios.get(
        "http://localhost:3001/documentation/get-documentation/" + candidateId
      );
      if (result) {
        dispatch({
          type: SINGLE_DOCUMENTATION,
          payload: result.data,
        });
      }
    } catch (err) {
      console.log("err: ", err);
      dispatch({
        type: SINGLE_DOCUMENTATION_ERROR,
        payload: err,
      });
    }
  };

export const editCandidateDocumentationData =
  (
    articlesOrCertificateOFIncorporation: any,
    w9Orw4: any,
    directDepositAgreement: any,
    voidCheckOrEmailContent: any,
    CIPCICICAOrCIPCICU: any,
    goodStandingDocument: any,
    workAuthorizationDocument: any,
    I9Form: any,
    listADocument: any,
    listBDocument: any,
    listCDocument: any,
    E_verify: any,
    E_verificationDate: any,
    emergencyForm: any,
    vaccinationStatus: any,
    clientTaskOrderOrSOWst: any,
    MSA: any,
    SOW: any,
    SOWValidity: any,
    certificateOFInsuranceOrCOI: any,
    clientTaskOrderSigning: any,
    TaskOrderExpiryDate: any,
    certificationOfInsurance: any,
    clientTaskOrderOrSOW: any,
    documentationStatus: any,
    documentationCompletionDate: any,
    documentationRemark: any,
    candidateId: number
  ) =>
    async (dispatch: any) => {
      try {
        const requestObject = {
          articlesOrCertificateOFIncorporation:
            articlesOrCertificateOFIncorporation,
          w9Orw4: w9Orw4,
          directDepositAgreement: directDepositAgreement,
          voidCheckOrEmailContent: voidCheckOrEmailContent,
          CIPCICICAOrCIPCICU: CIPCICICAOrCIPCICU,
          goodStandingDocument: goodStandingDocument,
          workAuthorizationDocument: workAuthorizationDocument,
          I9Form: I9Form,
          listADocument: listADocument,
          listBDocument: listBDocument,
          listCDocument: listCDocument,
          E_verify: E_verify,
          E_verificationDate: E_verificationDate,
          emergencyForm: emergencyForm,
          vaccinationStatus: vaccinationStatus,
          clientTaskOrderOrSOWst: clientTaskOrderOrSOWst,
          MSA: MSA,
          SOW: SOW,
          SOWValidity: SOWValidity,
          certificateOFInsuranceOrCOI: certificateOFInsuranceOrCOI,
          clientTaskOrderSigning: clientTaskOrderSigning,
          TaskOrderExpiryDate: TaskOrderExpiryDate,
          certificationOfInsurance: certificationOfInsurance,
          clientTaskOrderOrSOW: clientTaskOrderOrSOW,
          documentationStatus: documentationStatus,
          documentationCompletionDate: documentationCompletionDate,
          documentationRemark: documentationRemark,
          candidateId: candidateId,
        };
        const result = await axios.post(
          "http://localhost:3001/documentation/edit-documentation/",
          requestObject
        );
        if (result) {
          dispatch(getCandidateDocumentation(candidateId));
          dispatch(allCandidateData());
          Swal.fire("Documentation update successfull", "", "success");
        }
      } catch (err) {
        console.log("err: ", err);
        //   dispatch(allClientData());
        Swal.fire("Error while editing documentation", "", "error");
      }
    };

export const deleteDocumentationData =
  (candidateId: any) => async (dispatch: any) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/documentation/delete-documentation/" +
        candidateId
      );
      console.log("result: ", result);
      if (result) {
        // dispatch(allCandidateData());
        // Swal.fire("Candidate deleted", "", "success");
      }
    } catch (err) {
      // Swal.fire("Error while deleting candidate", "", "error");
    }
  };
