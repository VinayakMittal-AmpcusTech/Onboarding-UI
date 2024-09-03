import axios from "axios";
import {
  EMPTY_START_END_OPERATIONS_DATA,
  EMPTY_START_END_VALIDATION_DATA,
} from "../utils/startendoperationsutil";
import {
  LOCAL_START_END_OPERATIONS_DATA,
  LOCAL_START_END_VALIDATION_DATA,
  SINGLE_START_END_OPERATIONS,
  SINGLE_START_END_OPERATIONS_ERROR,
  START_END_OPERATIONS_DATA,
  START_END_VALIDATION_DATA,
} from "./type";
import { allCandidateData } from "./candidate";
import Swal from "sweetalert2";

export const startEndOperationsData = () => async (dispatch: any) => {
  dispatch({
    type: START_END_OPERATIONS_DATA,
    payload: EMPTY_START_END_OPERATIONS_DATA,
  });
};

export const setStartEndInputBoxValue =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({
      type: LOCAL_START_END_OPERATIONS_DATA,
      payload: { key, value },
    });
  };

export const startEndValidationData = () => async (dispatch: any) => {
  dispatch({
    type: START_END_VALIDATION_DATA,
    payload: EMPTY_START_END_VALIDATION_DATA,
  });
};

export const setStartEndValidation =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({
      type: LOCAL_START_END_VALIDATION_DATA,
      payload: { key, value },
    });
  };

export const getCandidateStartEndOperations =
  (candidateId: number) => async (dispatch: any) => {
    try {
      const result = await axios.get(
        "http://localhost:3001/start-end-operations/get-start-end-operations/" +
        candidateId
      );
      if (result) {
        dispatch({
          type: SINGLE_START_END_OPERATIONS,
          payload: result.data,
        });
      }
    } catch (err) {
      console.log("err: ", err);
      dispatch({
        type: SINGLE_START_END_OPERATIONS_ERROR,
        payload: err,
      });
    }
  };

export const editCandidateStartEndOperationsData =
  (
    joiningStatus: any,
    joiningType: any,
    joiningStatusRemark: any,
    recruiter: any,
    teamLead: any,
    crm: any,
    teamManager: any,
    seniorManager: any,
    assoDirector: any,
    centerHead: any,
    onsiteAccDirector: any,
    onboCoordinator: any,
    endDate: any,
    exitClearance: any,
    endReason: any,
    endRemarks: any,
    grossBr: any,
    mspFeePercentage: any,
    mspFee: any,
    payRate: any,
    refFee: any,
    taxOHPercentage: any,
    taxOH: any,
    hBenefitesOpted: any,
    hBenefitesCost: any,
    netBillRate: any,
    netPurchase: any,
    margin: any,
    fullTimeSalaryOffered: any,
    jobLevel: any,
    ffInvoiceStatus: any,
    candidateId: number
  ) =>
    async (dispatch: any) => {
      try {
        const requestObject = {
          joiningStatus: joiningStatus,
          joiningType: joiningType,
          joiningStatusRemark: joiningStatusRemark,
          recruiter: recruiter,
          teamLead: teamLead,
          crm: crm,
          teamManager: teamManager,
          seniorManager: seniorManager,
          assoDirector: assoDirector,
          centerHead: centerHead,
          onsiteAccDirector: onsiteAccDirector,
          onboCoordinator: onboCoordinator,
          endDate: endDate,
          exitClearance: exitClearance,
          endReason: endReason,
          endRemarks: endRemarks,
          grossBr: grossBr,
          mspFeePercentage: mspFeePercentage,
          mspFee: mspFee,
          payRate: payRate,
          refFee: refFee,
          taxOHPercentage: taxOHPercentage,
          taxOH: taxOH,
          hBenefitesOpted: hBenefitesOpted,
          hBenefitesCost: hBenefitesCost,
          netBillRate: netBillRate,
          netPurchase: netPurchase,
          margin: margin,
          fullTimeSalaryOffered: fullTimeSalaryOffered,
          jobLevel: jobLevel,
          ffInvoiceStatus: ffInvoiceStatus,
          candidateId: candidateId,
        };
        const result = await axios.post(
          "http://localhost:3001/start-end-operations/edit-start-end-operations/",
          requestObject
        );
        if (result) {
          dispatch(getCandidateStartEndOperations(candidateId));
          dispatch(allCandidateData());
          Swal.fire("Start end operations update successfull", "", "success");
        }
      } catch (err) {
        console.log("err: ", err);
        //   dispatch(allClientData());
        Swal.fire("Error while editing Start end operation", "", "error");
      }
    };

export const deleteStartEndOperationsData =
  (candidateId: any) => async (dispatch: any) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/start-end-operations/delete-start-end-operations/" +
        candidateId
      );
      if (result) {
        // dispatch(allCandidateData());
        // Swal.fire("Candidate deleted", "", "success");
      }
    } catch (err) {
      //   Swal.fire("Error while deleting candidate", "", "error");
    }
  };
