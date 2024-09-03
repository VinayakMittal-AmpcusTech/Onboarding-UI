import axios from "axios";
import { AppDispatch, RootState } from "../redux/store";
import {
  ALL_CANDIDATES_DATA,
  ALL_CANDIDATES_DATA_ERROR,
  CANDIDATE_DATA,
  CANDIDATE_DATA_ERROR,
  CANDIDATE_VALIDATION_DATA,
  EDIT_CANDIDATE_CLIENT_DATA,
  EDIT_CANDIDATE_CLIENT_DATA_ERROR,
  EDIT_CANDIDATE_DATA,
  EDIT_CANDIDATE_DATA_ERROR,
  EDIT_CANDIDATE_JOB_DATA,
  EDIT_CANDIDATE_JOB_DATA_ERROR,
  EDIT_CANDIDATE_VENDOR_DATA,
  EDIT_CANDIDATE_VENDOR_DATA_ERROR,
  EDIT_RATEREVISION_DATA,
  EDIT_RATEREVISION_DATA_ERROR,
  IMPORTANT_CANDIDATE_DATA,
  IMPORTANT_CANDIDATE_DATA_ERROR,
  LOCAL_CANDIDATE_DATA,
  LOCAL_CANDIDATE_VALIDATION_DATA,
  SINGLE_CANDIDATE,
  SINGLE_CANDIDATE_ERROR,
} from "./type";
import {
  EMPTY_CANDIDATE_DATA,
  EMPTY_CANDIDATE_VALIDATION_DATA,
} from "../utils/candidateutil";
import Swal from "sweetalert2";

export const candidateData = () => async (dispatch: any) => {
  dispatch({ type: CANDIDATE_DATA, payload: EMPTY_CANDIDATE_DATA });
};

export const setCandidateInputBoxValue =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({ type: LOCAL_CANDIDATE_DATA, payload: { key, value } });
  };

export const candidateValidationData = () => async (dispatch: any) => {
  dispatch({
    type: CANDIDATE_VALIDATION_DATA,
    payload: EMPTY_CANDIDATE_VALIDATION_DATA,
  });
};

export const setCandidateValidation =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({
      type: LOCAL_CANDIDATE_VALIDATION_DATA,
      payload: { key, value },
    });
  };

export const allCandidateData = () => async (dispatch: any) => {
  try {
    const result = await axios.get(
      "http://localhost:3001/candidate/get-all-candidate"
    );
    dispatch({
      type: ALL_CANDIDATES_DATA,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: ALL_CANDIDATES_DATA_ERROR,
      payload: (err as any).response?.data?.message,
    });
  }
};

export const getImportantCandidateData =
  (candidateId: any) => async (dispatch: any) => {
    try {
      const result = await axios.get(
        `http://localhost:3001/candidate/importantData/${candidateId}`
      );
      dispatch({
        type: IMPORTANT_CANDIDATE_DATA,
        payload: result.data,
      });
    } catch (err) {
      dispatch({
        type: IMPORTANT_CANDIDATE_DATA_ERROR,
        payload: (err as any).response?.data?.message,
      });
    }
  };

export const getCandidate = (candidateId: number) => async (dispatch: any) => {
  try {
    const result = await axios.get(
      "http://localhost:3001/candidate/get-candidate/" + candidateId
    );
    if (result) {
      dispatch({
        type: SINGLE_CANDIDATE,
        payload: result.data,
      });
    }
  } catch (err) {
    console.log("err: ", err);
    dispatch({
      type: SINGLE_CANDIDATE_ERROR,
      payload: err,
    });
  }
};

export const editCandidateData = (body: any) => async (dispatch: any) => {
  try {
    const result = await axios.post(
      `http://localhost:3001/candidate/edit-candidate`,
      body
    );
    dispatch({
      type: EDIT_CANDIDATE_DATA,
      payload: result.data,
    });
    if (result) {
      dispatch(getCandidate(body.id));
      dispatch(allCandidateData());
      Swal.fire("Candidate update successfull", "", "success");
    }
  } catch (err) {
    Swal.fire("Error while editing candidate", "", "error");
    dispatch({
      type: EDIT_CANDIDATE_DATA_ERROR,
      payload: (err as any).response?.data?.message,
    });
  }
};

export const editCandidateClientData = (body: any) => async (dispatch: any) => {
  try {
    const result = await axios.post(
      `http://localhost:3001/candidate/edit-candidate-client`,
      body
    );
    dispatch({
      type: EDIT_CANDIDATE_CLIENT_DATA,
      payload: result.data,
    });
    if (result) {
      // dispatch(getCandidate(body.id));
      // dispatch(allCandidateData());
      dispatch(getImportantCandidateData(body.id));
      Swal.fire("Client updated successfully", "", "success");
    }
  } catch (err) {
    Swal.fire("Error while updating", "", "error");
    dispatch({
      type: EDIT_CANDIDATE_CLIENT_DATA_ERROR,
      payload: (err as any).response?.data?.message,
    });
  }
};

export const editCandidateJobData = (body: any) => async (dispatch: any) => {
  try {
    const result = await axios.post(
      `http://localhost:3001/candidate/edit-candidate-job`,
      body
    );
    dispatch({
      type: EDIT_CANDIDATE_JOB_DATA,
      payload: result.data,
    });
    if (result) {
      // dispatch(getCandidate(body.id));
      // dispatch(allCandidateData());
      dispatch(getImportantCandidateData(body.id));
      Swal.fire("Job updated successfully", "", "success");
    }
  } catch (err) {
    Swal.fire("Error while updating", "", "error");
    dispatch({
      type: EDIT_CANDIDATE_JOB_DATA_ERROR,
      payload: (err as any).response?.data?.message,
    });
  }
};

export const editCandidateVendorData = (body: any) => async (dispatch: any) => {
  console.log("body: ", body);
  try {
    const result = await axios.post(
      `http://localhost:3001/candidate/edit-candidate-vendor`,
      body
    );
    console.log("result: of vendor service ", result);
    dispatch({
      type: EDIT_CANDIDATE_VENDOR_DATA,
      payload: result.data,
    });
    if (result) {
      Swal.fire("Vendor Update successfully", "", "success");
    }
  } catch (err) {
    Swal.fire("Error while updating", "", "error");
    dispatch({
      type: EDIT_CANDIDATE_VENDOR_DATA_ERROR,
      payload: (err as any).response?.data?.message,
    });
  }
};

export const editCandidateWorkAuthorizationData =
  (body: any) => async (dispatch: any) => {
    console.log("body: ", body);
    try {
      const result = await axios.post(
        `http://localhost:3001/candidate/edit-candidate-work-authorization`,
        body
      );
      if (result) {
        Swal.fire("Candidate update successfull", "", "success");
      }
    } catch (err) {
      Swal.fire("Error while editing", "", "error");
      // dispatch({
      //   type: EDIT_CANDIDATE_VENDOR_DATA_ERROR,
      //   payload: (err as any).response?.data?.message,
      // });
    }
  };

export const editCandidateContractTypeData =
  (body: any) => async (dispatch: any) => {
    console.log("body: ", body);
    try {
      const result = await axios.post(
        `http://localhost:3001/candidate/edit-candidate-contract-type`,
        body
      );
      if (result) {
        Swal.fire("update successfull", "", "success");
      }
    } catch (err) {
      Swal.fire("Error while editing", "", "error");
      // dispatch({
      //   type: EDIT_CANDIDATE_VENDOR_DATA_ERROR,
      //   payload: (err as any).response?.data?.message,
      // });
    }
  };

export const deleteCandidateData = (id: any) => async (dispatch: any) => {
  try {
    const result = await axios.post(
      "http://localhost:3001/candidate/delete-candidate/" + id
    );
    if (result) {
      dispatch(allCandidateData());
      Swal.fire("Candidate deleted successfully", "", "success");
    }
  } catch (err) {
    Swal.fire("Error while deleting candidate", "", "error");
  }
};
