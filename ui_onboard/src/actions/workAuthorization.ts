import axios from "axios";
import Swal from "sweetalert2";
import {
  ALL_WORKAUTHORIZATION_DATA,
  ALL_WORKAUTHORIZATION_DATA_ERROR,
  LOCAL_WORKAUTHORIZATION_DATA,
  SAVED_WORKAUTHORIZATION_DATA,
  SAVED_WORKAUTHORIZATION_DATA_ERROR,
  WORKAUTHORIZATION_DATA,
} from "./type";
import { EMPTY_WORKAUTHORIZATION_DATA } from "../utils/workAuthorization";

export const workAuthorizationData = () => async (dispatch: any) => {
  dispatch({
    type: WORKAUTHORIZATION_DATA,
    payload: EMPTY_WORKAUTHORIZATION_DATA,
  });
};

export const setWorkAuthorizationInputBoxValue =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({ type: LOCAL_WORKAUTHORIZATION_DATA, payload: { key, value } });
  };

export const allWorkAuthorizationData = () => async (dispatch: any) => {
  try {
    const result = await axios.get(
      "http://localhost:3001/workAuthorization/get-all-workAuthorization"
    );
    dispatch({
      type: ALL_WORKAUTHORIZATION_DATA,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: ALL_WORKAUTHORIZATION_DATA_ERROR,
      payload: (err as any).response?.data?.message,
    });
  }
};

export const saveWorkAuthorizationData =
  (workAuthorization: string) => async (dispatch: any) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/workAuthorization/add-workAuthorization",
        {
          workAuthorization,
        }
      );
      dispatch({
        type: SAVED_WORKAUTHORIZATION_DATA,
        payload: result.data,
      });
      dispatch(setWorkAuthorizationInputBoxValue("workAuthorization", ""));
      dispatch(allWorkAuthorizationData());
      Swal.fire("WorkAuthorization saved", "", "success");
    } catch (err) {
      dispatch({
        type: SAVED_WORKAUTHORIZATION_DATA_ERROR,
        payload: (err as any).response?.data?.message,
      });
      Swal.fire("Error while saving work authorization", "", "error");
    }
  };

export const editWorkAuthorizationData =
  (id: number, workAuthorization: string) => async (dispatch: any) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/workAuthorization/edit-workAuthorization",
        {
          id,
          workAuthorization,
        }
      );
      if (result) {
        dispatch(allWorkAuthorizationData());
        Swal.fire("Data update successfull", "", "success");
      }
    } catch (err) {
      dispatch(allWorkAuthorizationData());
      Swal.fire("Error while editing", "", "error");
    }
  };

export const deleteWorkAuthorizationData =
  (id: any) => async (dispatch: any) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/workAuthorization/delete-workAuthorization/" + id
      );
      if (result) {
        dispatch(allWorkAuthorizationData());
        Swal.fire("WorkAuthorization deleted", "", "success");
      }
    } catch (err) {
      dispatch(allWorkAuthorizationData());
      Swal.fire("Error while deleting work authorization", "", "error");
    }
  };
