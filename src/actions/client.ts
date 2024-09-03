import axios from "axios";
import {
  ALL_CLIENT_DATA,
  ALL_CLIENT_DATA_ERROR,
  CLIENT_DATA,
  CLIENT_VALIDATION_DATA,
  LOCAL_CLIENT_DATA,
  LOCAL_CLIENT_VALIDATION_DATA,
  SAVED_CLIENT_DATA,
  SAVED_CLIENT_DATA_ERROR,
} from "./type";
import {
  EMPTY_CLIENT_DATA,
  EMPTY_CLIENT_VALIDATION_DATA,
} from "../utils/clientutil";
import Swal from "sweetalert2";

export const clientData = () => async (dispatch: any) => {
  dispatch({ type: CLIENT_DATA, payload: EMPTY_CLIENT_DATA });
};

export const setClientInputBoxValue =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({ type: LOCAL_CLIENT_DATA, payload: { key, value } });
  };

export const clientValidationData = () => async (dispatch: any) => {
  dispatch({
    type: CLIENT_VALIDATION_DATA,
    payload: EMPTY_CLIENT_VALIDATION_DATA,
  });
};

export const setClientValidation =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({
      type: LOCAL_CLIENT_VALIDATION_DATA,
      payload: { key, value },
    });
  };

export const allClientData = () => async (dispatch: any) => {
  try {
    const result = await axios.get(
      "http://localhost:3001/client/get-all-clients"
    );
    dispatch({
      type: ALL_CLIENT_DATA,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: ALL_CLIENT_DATA_ERROR,
      payload: (err as any).response?.data?.message,
    });
  }
};

export const saveClientData =
  (
    clientName: string,
    endClientName: string,
    mspName: string,
    email: string,
    contactNumber: number,
    faxNumber: number,
    line1: string,
    line2: string,
    city: string,
    state: string,
    zipCode: number,
    country: string
  ) =>
  async (dispatch: any) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/client/add-client",
        {
          clientName,
          endClientName,
          mspName,
          email,
          contactNumber,
          faxNumber,
          line1,
          line2,
          city,
          state,
          zipCode,
          country,
        }
      );
      dispatch({
        type: SAVED_CLIENT_DATA,
        payload: result.data,
      });
      dispatch(allClientData());
      dispatch(setClientInputBoxValue("clientName", ""));
      dispatch(setClientInputBoxValue("endClientName", ""));
      dispatch(setClientInputBoxValue("mspName", ""));
      dispatch(setClientInputBoxValue("email", ""));
      dispatch(setClientInputBoxValue("contactNumber", ""));
      dispatch(setClientInputBoxValue("faxNumber", ""));
      dispatch(setClientInputBoxValue("line1", ""));
      dispatch(setClientInputBoxValue("line2", ""));
      dispatch(setClientInputBoxValue("city", ""));
      dispatch(setClientInputBoxValue("state", ""));
      dispatch(setClientInputBoxValue("zipCode", ""));
      dispatch(setClientInputBoxValue("country", ""));
      Swal.fire("Client added successfully", "", "success");
    } catch (err) {
      dispatch({
        type: SAVED_CLIENT_DATA_ERROR,
        payload: (err as any).response?.data?.message,
      });
      Swal.fire("Error while adding client", "", "error");
    }
  };

export const editClientData =
  (
    personId: number,
    line1: string,
    line2: string,
    city: string,
    state: string,
    zipCode: number,
    country: string
  ) =>
  async (dispatch: any) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/client/edit-client",
        {
          personId,
          line1,
          line2,
          city,
          state,
          zipCode,
          country,
        }
      );
      if (result) {
        dispatch(allClientData());
        Swal.fire("updated successfully", "", "success");
      }
    } catch (err) {
      dispatch(allClientData());
      Swal.fire("Error while updating client", "", "error");
    }
  };

export const deleteClientData = (personId: number) => async (dispatch: any) => {
  try {
    const result = await axios.post(
      "http://localhost:3001/client/delete-client",
      {
        personId,
      }
    );
    if (result) {
      dispatch(allClientData());
      Swal.fire("Deleted successfully", "", "success");
    }
  } catch (err) {
    Swal.fire("Error while deleting client", "", "error");
  }
};

export const deleteOnlyClientData =
  (personId: any) => async (dispatch: any) => {
    try {
      //  "http://localhost:3001/candidate/get-candidate/" + candidateId;
      const result = await axios.post(
        "http://localhost:3001/client/delete-only-client/" + personId
      );
      if (result) {
        dispatch(allClientData());
        Swal.fire("Client deleted", "", "success");
      }
    } catch (err) {
      Swal.fire("Error while deleting client", "", "error");
    }
  };

export const updateOnlyClientData =
  (id: number, clientName: string, endClientName: string, mspName: string) =>
  async (dispatch: any) => {
    try {
      const result = await axios.post(
        "http://localhost:3001/client/edit-only-client",
        {
          id,
          clientName,
          endClientName,
          mspName,
        }
      );
      if (result) {
        dispatch(allClientData());
        Swal.fire("Client updated successfully", "", "success");
      }
    } catch (err) {
      dispatch(allClientData());
      Swal.fire("Error while editing client", "", "error");
    }
  };
