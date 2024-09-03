import axios from "axios";
import Swal from "sweetalert2";
import {
  ALL_CONTRACTTYPE_DATA,
  ALL_CONTRACTTYPE_DATA_ERROR,
  LOCAL_CONTRACTTYPE_DATA,
  SAVED_CONTRACTTYPE_DATA,
  SAVED_CONTRACTTYPE_DATA_ERROR,
  CONTRACTTYPE_DATA,
} from "./type";
import { EMPTY_CONTRACTTYPE_DATA } from "../utils/contractType";

export const contractTypeData = () => async (dispatch: any) => {
  dispatch({ type: CONTRACTTYPE_DATA, payload: EMPTY_CONTRACTTYPE_DATA });
};

export const setContractTypeInputBoxValue =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({ type: LOCAL_CONTRACTTYPE_DATA, payload: { key, value } });
  };

export const allContractTypeData = () => async (dispatch: any) => {
  try {
    const result = await axios.get(
      "http://localhost:3001/contractType/get-all-contractType"
    );
    dispatch({
      type: ALL_CONTRACTTYPE_DATA,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: ALL_CONTRACTTYPE_DATA_ERROR,
      payload: (err as any).response?.data?.message,
    });
  }
};

export const saveContractTypeData =
  (contractType: string) => async (dispatch: any) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/contractType/add-contractType",
        {
          contractType,
        }
      );
      dispatch({
        type: SAVED_CONTRACTTYPE_DATA,
        payload: result.data,
      });
      dispatch(setContractTypeInputBoxValue("contractType", ""));
      dispatch(allContractTypeData());
      Swal.fire("ContractType saved", "", "success");
    } catch (err) {
      dispatch({
        type: SAVED_CONTRACTTYPE_DATA_ERROR,
        payload: (err as any).response?.data?.message,
      });
      Swal.fire("Error while saving work authorization", "", "error");
    }
  };

export const editContractTypeData =
  (id: any, contractType: string) => async (dispatch: any) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/contractType/edit-contractType",
        {
          id,
          contractType,
        }
      );
      if (result) {
        dispatch(allContractTypeData());
        Swal.fire("ContractType edited", "", "success");
      }
    } catch (err) {
      dispatch(allContractTypeData());
      Swal.fire("Error while editing work authorization", "", "error");
    }
  };

export const deleteContractTypeData = (id: any) => async (dispatch: any) => {
  try {
    const result = await axios.post(
      "http://localhost:3001/contractType/delete-contractType/" + id
    );
    if (result) {
      dispatch(allContractTypeData());
      Swal.fire("ContractType deleted", "", "success");
    }
  } catch (err) {
    dispatch(allContractTypeData());
    Swal.fire("Error while deleting work authorization", "", "error");
  }
};
