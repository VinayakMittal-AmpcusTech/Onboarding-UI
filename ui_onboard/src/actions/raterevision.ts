import axios from "axios";
import {
  EMPTY_RATE_REVISION_DATA,
  EMPTY_RATE_REVISION_VALIDATION_DATA,
} from "../utils/raterevisionutil";
import {
  EDIT_RATEREVISION_DATA,
  EDIT_RATEREVISION_DATA_ERROR,
  LOCAL_RATE_REVISION_DATA,
  LOCAL_RATE_REVISION_VALIDATION_DATA,
  RATE_REVISION_DATA,
  RATE_REVISION_VALIDATION_DATA,
  SINGLE_RATE_REVISION,
  SINGLE_RATE_REVISION_ERROR,
  // SINGLE_RATE_REVISION,
  // SINGLE_RATE_REVISION_ERROR,
} from "./type";
import { allCandidateData } from "./candidate";
import Swal from "sweetalert2";

export const rateRevisionData = () => async (dispatch: any) => {
  dispatch({ type: RATE_REVISION_DATA, payload: EMPTY_RATE_REVISION_DATA });
};

export const setInputBoxValueRateRevision =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({ type: LOCAL_RATE_REVISION_DATA, payload: { key, value } });
  };

export const rateRevisionValidationData = () => async (dispatch: any) => {
  dispatch({
    type: RATE_REVISION_VALIDATION_DATA,
    payload: EMPTY_RATE_REVISION_VALIDATION_DATA,
  });
};

export const setRateRevisionValidation =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({
      type: LOCAL_RATE_REVISION_VALIDATION_DATA,
      payload: { key, value },
    });
  };

export const getCandidateRateRevision =
  (candidateId: number) => async (dispatch: any) => {
    try {
      const result = await axios.get(
        "http://localhost:3001/rate-revision/get-rate-revision/" + candidateId
      );
      if (result) {
        dispatch({
          type: SINGLE_RATE_REVISION,
          payload: result.data,
        });
      }
    } catch (err) {
      console.log("err: ", err);
      dispatch({
        type: SINGLE_RATE_REVISION_ERROR,
        payload: err,
      });
    }
  };

export const editRaterevisionData = (body: any) => async (dispatch: any) => {
  try {
    const result = await axios.post(
      `http://localhost:3001/rate-revision/edit-rate-revision`,
      body
    );
    dispatch({
      type: EDIT_RATEREVISION_DATA,
      payload: result.data,
    });
    if (result) {
      dispatch(getCandidateRateRevision(body.candidateId));
      dispatch(allCandidateData());
      Swal.fire("Rate revision  update successful!", "", "success");
    }
  } catch (err) {
    Swal.fire("Error while editing Rate revision", "", "error");
    dispatch({
      type: EDIT_RATEREVISION_DATA_ERROR,
      payload: (err as any).response?.data?.message,
    });
  }
};

export const deleteRateRevisionData =
  (candidateId: any) => async (dispatch: any) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/rate-revision/delete-rate-revision/" +
        candidateId
      );
      if (result) {
        // dispatch(allCandidateData());
        // Swal.fire("Background check deleted", "", "success");
      }
    } catch (err) {
      //   Swal.fire("Error while deleting candidate", "", "error");
    }
  };
