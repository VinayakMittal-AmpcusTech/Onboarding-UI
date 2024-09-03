import axios from "axios";
import {
  VENDOR_DATA,
  LOCAL_VENDOR_DATA,
  ALL_VENDOR_DATA_ERROR,
  ALL_VENDOR_DATA,
  SAVED_VENDOR_DATA_ERROR,
  SAVED_VENDOR_DATA,
  GET_CANDIDATE_VENDOR_DATA,
  VENDOR_VALIDATION_DATA,
  LOCAL_VENDOR_VALIDATION_DATA,
} from "./type";
import {
  EMPTY_VENDOR_DATA,
  EMPTY_VENDOR_VALIDATION_DATA,
} from "../utils/vendor";
import Swal from "sweetalert2";

export const vendorData = () => async (dispatch: any) => {
  dispatch({ type: VENDOR_DATA, payload: EMPTY_VENDOR_DATA });
};

export const setVendorInputBoxValue =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({ type: LOCAL_VENDOR_DATA, payload: { key, value } });
  };

export const vendorValidationData = () => async (dispatch: any) => {
  dispatch({
    type: VENDOR_VALIDATION_DATA,
    payload: EMPTY_VENDOR_VALIDATION_DATA,
  });
};

export const setVendorValidation =
  (key: any, value: any) => async (dispatch: any) => {
    dispatch({
      type: LOCAL_VENDOR_VALIDATION_DATA,
      payload: { key, value },
    });
  };

export const allVendorData = () => async (dispatch: any) => {
  try {
    const result = await axios.get(
      "http://localhost:3001/vendor/get-all-vendors"
    );
    dispatch({
      type: ALL_VENDOR_DATA,
      payload: result.data,
    });
  } catch (err) {
    dispatch({
      type: ALL_VENDOR_DATA_ERROR,
      payload: (err as any).response?.data?.message,
    });
  }
};

export const saveVendorData =
  (
    companyName: string,
    federalID: number,
    contactPerson: string,
    email: string,
    contactNumber: number,
    faxNumber: number,
    signAuthority: string,
    signAuthorityDesignation: string,
    stateOfIncorporation: string,
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
          "http://localhost:3001/vendor/add-vendor",
          {
            companyName,
            federalID,
            contactPerson,
            email,
            contactNumber,
            faxNumber,
            signAuthority,
            signAuthorityDesignation,
            stateOfIncorporation,
            line1,
            line2,
            city,
            state,
            zipCode,
            country,
          }
        );
        dispatch({
          type: SAVED_VENDOR_DATA,
          payload: result.data,
        });
        dispatch(allVendorData());
        dispatch(setVendorInputBoxValue("companyName", ""));
        dispatch(setVendorInputBoxValue("federalID", ""));
        dispatch(setVendorInputBoxValue("contactPerson", ""));
        dispatch(setVendorInputBoxValue("companyEmailID", ""));
        dispatch(setVendorInputBoxValue("contactNo", ""));
        dispatch(setVendorInputBoxValue("faxNo", ""));
        dispatch(setVendorInputBoxValue("signAuthority", ""));
        dispatch(setVendorInputBoxValue("signAuthorityDesignation", ""));
        dispatch(setVendorInputBoxValue("stateOfIncorporation", ""));
        dispatch(setVendorInputBoxValue("line1", ""));
        dispatch(setVendorInputBoxValue("line2", ""));
        dispatch(setVendorInputBoxValue("state", ""));
        dispatch(setVendorInputBoxValue("zipCode", ""));
        dispatch(setVendorInputBoxValue("country", ""));

        Swal.fire("Vendor saved", "", "success");
      } catch (err) {
        dispatch({
          type: SAVED_VENDOR_DATA_ERROR,
          payload: (err as any).response?.data?.message,
        });
        Swal.fire("Error while saving job", "", "error");
      }
    };

export const editVendorData =
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
          "http://localhost:3001/vendor/edit-vendor",
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
          dispatch(allVendorData());
          Swal.fire(" Update successfull", "", "success");
        }
      } catch (err) {
        dispatch(allVendorData());
        Swal.fire("Error while editing client", "", "error");
      }
    };

export const deleteVendorData = (personId: number) => async (dispatch: any) => {
  try {
    const result = await axios.post(
      "http://localhost:3001/vendor/delete-vendor",
      {
        personId,
      }
    );
    if (result) {
      dispatch(allVendorData());
      Swal.fire("Vendor deleted", "", "success");
    }
  } catch (err) {
    Swal.fire("Error while deleting vendor", "", "error");
  }
};

export const getVendorDataByCandidateId =
  (candidateId: any) => async (dispatch: any) => {
    try {
      const result = await axios.get(
        "http://localhost:3001/candidate-vendor/byForeignKey-candidateId/" +
        candidateId
        // {
        //   candidateId,
        // }
      );
      if (result) {
        // dispatch(allVendorData());
        // Swal.fire("Vendor deleted", "", "success");
        dispatch({
          type: GET_CANDIDATE_VENDOR_DATA,
          payload: result.data,
        });
      }
    } catch (err) {
      Swal.fire("Error while getting vendor", "", "error");
    }
  };

export const deleteOnlyVendorData = (id: any) => async (dispatch: any) => {
  try {
    //  "http://localhost:3001/candidate/get-candidate/" + candidateId;
    const result = await axios.post(
      "http://localhost:3001/vendor/delete-only-vendor/" + id
    );
    if (result) {
      dispatch(allVendorData());
      Swal.fire("Client deleted", "", "success");
    }
  } catch (err) {
    Swal.fire("Error while deleting client", "", "error");
  }
};

export const updateOnlyVendorData =
  (
    id: number,
    companyName: string,
    federalID: number,
    contactPerson: string,
    signAuthority: string,
    signAuthorityDesignation: string,
    stateOfIncorporation: string
  ) =>
    async (dispatch: any) => {
      try {
        const result = await axios.post(
          "http://localhost:3001/vendor/edit-only-vendor",
          {
            id,
            companyName,
            federalID,
            contactPerson,
            signAuthority,
            signAuthorityDesignation,
            stateOfIncorporation,
          }
        );
        if (result) {
          dispatch(allVendorData());
          Swal.fire("Data edited", "", "success");
        }
      } catch (err) {
        dispatch(allVendorData());
        Swal.fire("Error while editing client", "", "error");
      }
    };
