import {
  VENDOR_DATA,
  VENDOR_DATA_ERROR,
  LOCAL_VENDOR_DATA,
  ALL_VENDOR_DATA,
  ALL_VENDOR_DATA_ERROR,
  SAVED_VENDOR_DATA,
  SAVED_VENDOR_DATA_ERROR,
  GET_CANDIDATE_VENDOR_DATA,
  GET_CANDIDATE_VENDOR_DATA_ERROR,
  VENDOR_VALIDATION_DATA,
  LOCAL_VENDOR_VALIDATION_DATA,
} from "../actions/type";
import { cloneDeep, remove, findIndex } from "lodash";

//State type for defining the state of the reducer
interface Actions {
  payload: any;
  type: string;
}

//Vendor Interface to define the State type for the state of the reducer
interface VendorInterface {
  vendorData: any;
  vendorDataError: any;
  allVendorData: any;
  allVendorDataError: any;
  savedVendorData: any;
  savedVendorDataError: any;
  getVendorDataByCandidateId: any;
  getVendorDataByCandidateIdError: any;
  vendorValidationData: any;
  vendorValidationDataError: any;
}

//State type for defining the state of the reducer
export type State = VendorInterface;

//Initial state of the reducer of type State
export const initialState: State = {
  vendorData: undefined,
  vendorDataError: {},
  allVendorData: [],
  allVendorDataError: null,
  savedVendorData: {},
  savedVendorDataError: {},
  getVendorDataByCandidateId: {},
  getVendorDataByCandidateIdError: null,
  vendorValidationData: {
    companyNameValid: "",
    federalIDValid: "",
    contactPersonValid: "",
    emailValid: "",
    contactNumberValid: "",
    faxNumberValid: "",
    signAuthorityValid: "",
    signAuthorityDesignationValid: "",
    stateOfIncorporationValid: "",
    line1Valid: "",
    line2Valid: "",
    cityValid: "",
    stateValid: "",
    zipCodeValid: "",
    countryValid: "",
  },
  vendorValidationDataError: null,
};

export const VendorReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case VENDOR_DATA:
      return {
        ...state,
        vendorData: action.payload,
        vendorDataError: "",
      };
    case LOCAL_VENDOR_DATA: {
      const tempCurrentValue = cloneDeep(state.vendorData);
      tempCurrentValue[action.payload.key] = action.payload.value;

      return {
        ...state,
        vendorData: tempCurrentValue,
      };
    }
    case VENDOR_VALIDATION_DATA:
      return {
        ...state,
        vendorValidationData: action.payload,
        vendorValidationDataError: "",
      };

    case LOCAL_VENDOR_VALIDATION_DATA: {
      const tempCurrentValue = cloneDeep(state?.vendorValidationData);
      tempCurrentValue[action?.payload?.key] = action?.payload?.value;

      return {
        ...state,
        vendorValidationData: tempCurrentValue,
      };
    }
    case ALL_VENDOR_DATA:
      return {
        ...state,
        allVendorData: action.payload,
        allVendorDataError: "",
      };
    case ALL_VENDOR_DATA_ERROR:
      return {
        ...state,
        allVendorData: "",
        allVendorDataError: action.payload,
      };
    case SAVED_VENDOR_DATA:
      return {
        ...state,
        savedVendorData: action.payload,
        savedVendorDataError: "",
      };
    case SAVED_VENDOR_DATA_ERROR:
      return {
        ...state,
        savedVendorData: "",
        savedVendorDataError: action.payload,
      };
    case GET_CANDIDATE_VENDOR_DATA:
      return {
        ...state,
        getVendorDataByCandidateId: action.payload,
        getVendorDataByCandidateIdError: "",
      };
    case GET_CANDIDATE_VENDOR_DATA_ERROR:
      return {
        ...state,
        getVendorDataByCandidateId: "",
        getVendorDataByCandidateIdError: action.payload,
      };
    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
