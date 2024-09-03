import axios from "axios";
import { AppDispatch, RootState } from "../redux/store";
import {
  ALL_JOB_DATA,
  ALL_JOB_DATA_ERROR,
  JOB_DATA,
  JOB_VALIDATION_DATA,
  LOCAL_JOB_DATA,
  LOCAL_JOB_VALIDATION_DATA,
  SAVED_JOB_DATA,
  SAVED_JOB_DATA_ERROR,
} from "./type";
import { EMPTY_JOB_DATA, EMPTY_JOB_VALIDATION_DATA } from "../utils/job";
import Swal from "sweetalert2";

export const jobData = () => async (dispatch: any) => {
  dispatch({ type: JOB_DATA, payload: EMPTY_JOB_DATA });
};

export const setJobInputBoxValue =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({ type: LOCAL_JOB_DATA, payload: { key, value } });
  };

export const jobValidationData = () => async (dispatch: any) => {
  dispatch({
    type: JOB_VALIDATION_DATA,
    payload: EMPTY_JOB_VALIDATION_DATA,
  });
};

export const setJobValidation =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({
      type: LOCAL_JOB_VALIDATION_DATA,
      payload: { key, value },
    });
  };

export const allJobData = () => async (dispatch: any) => {
  try {
    const result = await axios.get("http://localhost:3001/job/get-all-jobs");
    dispatch({
      type: ALL_JOB_DATA,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: ALL_JOB_DATA_ERROR,
      payload: (err as any).response?.data?.message,
    });
  }
};

export const saveJobData =
  (
    requestID: number,
    jobDivaID: number,
    jobTitle: string,
    jobType: string,
    lineOfBusiness: string,
    jobDescription: string
  ) =>
    async (dispatch: any) => {
      try {
        const result = await axios.post("http://localhost:3001/job/add-job", {
          requestID,
          jobDivaID,
          jobTitle,
          jobType,
          lineOfBusiness,
          jobDescription,
        });
        dispatch({
          type: SAVED_JOB_DATA,
          payload: result.data,
        });
        dispatch(setJobInputBoxValue("requestID", ""));
        dispatch(setJobInputBoxValue("jobDivaID", ""));
        dispatch(setJobInputBoxValue("jobTitle", ""));
        dispatch(setJobInputBoxValue("jobType", ""));
        dispatch(setJobInputBoxValue("lineOfBusiness", ""));
        dispatch(setJobInputBoxValue("jobDescription", ""));
        dispatch(allJobData());
        Swal.fire("Job saved", "", "success");
      } catch (err) {
        dispatch({
          type: SAVED_JOB_DATA_ERROR,
          payload: (err as any).response?.data?.message,
        });
        Swal.fire("Error while saving job", "", "error");
      }
    };

export const editJobData =
  (
    id: number,
    requestID: number,
    jobDivaID: number,
    jobTitle: string,
    jobType: string,
    lineOfBusiness: string,
    jobDescription: string
  ) =>
    async (dispatch: any) => {
      try {
        const result = await axios.post("http://localhost:3001/job/edit-job", {
          id,
          requestID,
          jobDivaID,
          jobTitle,
          jobType,
          lineOfBusiness,
          jobDescription,
        });
        if (result) {
          dispatch(allJobData());
          Swal.fire("Job edited", "", "success");
        }
      } catch (err) {
        dispatch(allJobData());
        Swal.fire("Error while editing job", "", "error");
      }
    };

export const deleteJobData = (id: number) => async (dispatch: any) => {
  console.log("id: ", id);
  try {
    const result = await axios.post(
      "http://localhost:3001/job/delete-only-job/" + id
    );
    console.log("result: ", result);
    if (result) {
      dispatch(allJobData());
      Swal.fire("Job deleted", "", "success");
    }
  } catch (err) {
    dispatch(allJobData());
    Swal.fire("Error while deleting job", "", "error");
  }
};
