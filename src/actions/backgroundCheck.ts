import axios from "axios";
import Swal from "sweetalert2";
import {
  EMPTY_BACKGROUND_CHECK_DATA,
  EMPTY_BACKGROUND_CHECK_VALIDATION_DATA,
} from "../utils/backgroundCheckUtil";
import {
  BACKGROUND_CHECK,
  BACKGROUND_CHECK_VALIDATION_DATA,
  LOCAL_BACKGROUND_CHECK,
  LOCAL_BACKGROUND_CHECK_VALIDATION_DATA,
  SECONDARY_BUTTON,
  SINGLE_BACKGROUND_CHECK,
  SINGLE_BACKGROUND_CHECK_ERROR,
  TERTIARY_BUTTON,
} from "./type";
import { allCandidateData } from "./candidate";

export const backgroundCheck = () => async (dispatch: any) => {
  dispatch({ type: BACKGROUND_CHECK, payload: EMPTY_BACKGROUND_CHECK_DATA });
};

export const setBackgroundCheckInputBoxValue =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({ type: LOCAL_BACKGROUND_CHECK, payload: { key, value } });
  };

export const bgValidationData = () => async (dispatch: any) => {
  dispatch({
    type: BACKGROUND_CHECK_VALIDATION_DATA,
    payload: EMPTY_BACKGROUND_CHECK_VALIDATION_DATA,
  });
};

export const setBgValidation =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({
      type: LOCAL_BACKGROUND_CHECK_VALIDATION_DATA,
      payload: { key, value },
    });
  };

export const setSecondaryButton =
  (secondaryButtonFlag: boolean) => async (dispatch: any) => {
    dispatch({ type: SECONDARY_BUTTON, payload: { secondaryButtonFlag } });
  };

export const setTertiaryButton =
  (tertiaryButtonFlag: boolean) => async (dispatch: any) => {
    dispatch({ type: TERTIARY_BUTTON, payload: { tertiaryButtonFlag } });
  };

export const getCandidateBackgroundCheck =
  (candidateId: number) => async (dispatch: any) => {
    try {
      const result = await axios.get(
        "http://localhost:3001/backgroundCheck/get-backgroundcheck/" +
        candidateId
      );
      if (result) {
        dispatch({
          type: SINGLE_BACKGROUND_CHECK,
          payload: result.data,
        });
      }
    } catch (err) {
      console.log("err: ", err);
      dispatch({
        type: SINGLE_BACKGROUND_CHECK_ERROR,
        payload: err,
      });
    }
  };

export const editCandidateBackgroundCheckData =
  (
    caseID1: any,
    BGCInitiatedOn: any,
    primaryBGCInitiatedThru: any,
    BGCPackage1: any,
    BGCPackage2: any,
    BGCInvoiceMonth: any,
    BGCChargesPrimary: any,
    secondary: any,
    caseID2: any,
    secondaryBGCInitiatedOn: any,
    secondaryBGCInitiatedThru: any,
    secondaryBGCPackage1: any,
    secondaryBGCPackage2: any,
    secondaryBGCInvoiceMonth: any,
    secondaryBGCCharges: any,
    tertiary: any,
    caseID3: any,
    tertiaryBGCInitiatedOn: any,
    tertiaryBGCInitiatedThru: any,
    tertiaryBGCPackage1: any,
    tertiaryBGCPackage2: any,
    tertiaryBGCInvoiceMonth: any,
    tertiaryBGCCharges: any,
    BGCStatus: any,
    BGCCompletedOn: any,
    BGCAffidavitStatus: any,
    BGCAffidavitOn: any,
    BGCReportStatus: any,
    BGCAdjuStatus: any,
    adjuSupportingDocs: any,
    dateOfAdjudication: any,
    finalBGCReport: any,
    BGCRemark: any,
    candidateId: number
  ) =>
    async (dispatch: any) => {
      // console.log("hello---------------------")
      try {
        const requestObject = {
          caseID1: caseID1,
          BGCInitiatedOn: BGCInitiatedOn,
          primaryBGCInitiatedThru: primaryBGCInitiatedThru,
          BGCPackage1: BGCPackage1,
          BGCPackage2: BGCPackage2,
          BGCInvoiceMonth: BGCInvoiceMonth,
          BGCChargesPrimary: BGCChargesPrimary,
          secondary: secondary,
          caseID2: caseID2,
          secondaryBGCInitiatedOn: secondaryBGCInitiatedOn,
          secondaryBGCInitiatedThru: secondaryBGCInitiatedThru,
          secondaryBGCPackage1: secondaryBGCPackage1,
          secondaryBGCPackage2: secondaryBGCPackage2,
          secondaryBGCInvoiceMonth: secondaryBGCInvoiceMonth,
          secondaryBGCCharges: secondaryBGCCharges,
          tertiary: tertiary,
          caseID3: caseID3,
          tertiaryBGCInitiatedOn: tertiaryBGCInitiatedOn,
          tertiaryBGCInitiatedThru: tertiaryBGCInitiatedThru,
          tertiaryBGCPackage1: tertiaryBGCPackage1,
          tertiaryBGCPackage2: tertiaryBGCPackage2,
          tertiaryBGCInvoiceMonth: tertiaryBGCInvoiceMonth,
          tertiaryBGCCharges: tertiaryBGCCharges,
          BGCStatus: BGCStatus,
          BGCCompletedOn: BGCCompletedOn,
          BGCAffidavitStatus: BGCAffidavitStatus,
          BGCAffidavitOn: BGCAffidavitOn,
          BGCReportStatus: BGCReportStatus,
          BGCAdjuStatus: BGCAdjuStatus,
          adjuSupportingDocs: adjuSupportingDocs,
          dateOfAdjudication: dateOfAdjudication,
          finalBGCReport: finalBGCReport,
          BGCRemark: BGCRemark,
          candidateId: candidateId,
        };
        const result = await axios.post(
          "http://localhost:3001/backgroundCheck/edit-backgroundcheck/",
          requestObject
        );
        if (result) {
          dispatch(getCandidateBackgroundCheck(candidateId));
          dispatch(allCandidateData());
          Swal.fire("Background check update successfull", "", "success");
        }
      } catch (err) {
        console.log("err: ", err);
        //   dispatch(allClientData());
        Swal.fire("Error while editing background check", "", "error");
      }
    };

export const deleteBgCheckData =
  (candidateId: any) => async (dispatch: any) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/backgroundCheck/delete-bgCheck/" + candidateId
      );
      if (result) {
        // dispatch(allCandidateData());
        // Swal.fire("Background check deleted", "", "success");
      }
    } catch (err) {
      //   Swal.fire("Error while deleting candidate", "", "error");
    }
  };
