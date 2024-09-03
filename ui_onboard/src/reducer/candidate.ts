import {
  ALL_CANDIDATES_DATA,
  ALL_CANDIDATES_DATA_ERROR,
  CANDIDATE_DATA,
  CANDIDATE_DATA_ERROR,
  CANDIDATE_VALIDATION_DATA,
  EDIT_CANDIDATE_CLIENT_DATA,
  EDIT_CANDIDATE_CLIENT_DATA_ERROR,
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
} from "../actions/type";
import { cloneDeep, remove, findIndex } from "lodash";

//State type for defining the state of the reducer
interface Actions {
  payload: any;
  type: string;
}

//Candidate Interface to define the State type for the state of the reducer
interface CandidateInterface {
  candidateData: any;
  candidateDataError: any;
  getAllCandidates: any;
  getAllCandidatesError: any;
  importantCandidateData: any;
  importantCandidateDataError: any;
  editCandidateData: any;
  editCandidateDataError: any;
  singleCandidateData: any;
  singleCandidateDataError: any;
  editCandidateClientData: any;
  editCandidateClientDataError: any;
  editCandidateJobData: any;
  editCandidateJobDataError: any;
  editCandidateVendorData: any;
  editCandidateVendorDataError: any;
  candidateValidationData: any;
  candidateValidationDataError: any;
}

//State type for defining the state of the reducer
export type State = CandidateInterface;

//Initial state of the reducer of type State
export const initialState: State = {
  candidateData: undefined,
  candidateDataError: {},
  getAllCandidates: [],
  getAllCandidatesError: null,
  importantCandidateData: {},
  importantCandidateDataError: null,
  editCandidateData: {},
  editCandidateDataError: null,
  singleCandidateData: {},
  singleCandidateDataError: null,
  editCandidateClientData: {},
  editCandidateClientDataError: null,
  editCandidateJobData: {},
  editCandidateJobDataError: null,
  editCandidateVendorData: {},
  editCandidateVendorDataError: null,
  candidateValidationData: {
    firstNameValid: "",
    middleNameValid: "",
    lastNameValid: "",
    line1Valid: "",
    line2Valid: "",
    cityValid:"",
    stateValid: "",
    zipCodeValid: "",
    countryValid: "",
    emailValid: "",
    contactNumberValid: "",
    workAuthorizationValid: "",
    workAuthorizationExpiryDateValid: "",
  },
  candidateValidationDataError: {},
};

export const CandidateReducer = (
  state: State = initialState,
  action: Actions
) => {
  switch (action.type) {
    case CANDIDATE_DATA:
      return {
        ...state,
        candidateData: action.payload,
        candidateDataError: "",
      };
    
    case LOCAL_CANDIDATE_DATA: {
      const tempCurrentValue = cloneDeep(state.candidateData);
      tempCurrentValue[action.payload.key] = action.payload.value;

      return {
        ...state,
        candidateData: tempCurrentValue,
      };
    }
    case CANDIDATE_VALIDATION_DATA:
      return {
        ...state,
        candidateValidationData: action.payload,
        candidateValidationDataError: "",
      };
    
    case LOCAL_CANDIDATE_VALIDATION_DATA: {
      const tempCurrentValue = cloneDeep(state?.candidateValidationData);
      tempCurrentValue[action?.payload?.key] = action?.payload?.value;

      return {
        ...state,
        candidateValidationData: tempCurrentValue,
      };
    }
    case ALL_CANDIDATES_DATA:
      return {
        ...state,
        getAllCandidates: action.payload,
        getAllCandidatesError: "",
      };
    case ALL_CANDIDATES_DATA_ERROR:
      return {
        ...state,
        getAllCandidates: "",
        getAllCandidatesError: action.payload,
      };
    case IMPORTANT_CANDIDATE_DATA:
      return {
        ...state,
        importantCandidateData: action.payload,
        importantCandidateDataError: "",
      };
    case IMPORTANT_CANDIDATE_DATA_ERROR:
      return {
        ...state,
        importantCandidateData: "",
        importantCandidateDataError: action.payload,
      };
    case SINGLE_CANDIDATE:
      return {
        ...state,
        singleCandidateData: action.payload,
        singleCandidateDataError: "",
      };
    case SINGLE_CANDIDATE_ERROR:
      return {
        ...state,
        singleCandidateData: "",
        singleCandidateDataError: action.payload,
      };
    case EDIT_RATEREVISION_DATA:
      return {
        ...state,
        editCandidateData: action.payload,
        editCandidateDataError: "",
      };
    case EDIT_RATEREVISION_DATA_ERROR:
      return {
        ...state,
        editCandidateData: "",
        editCandidateDataError: action.payload,
      };
    case EDIT_CANDIDATE_CLIENT_DATA:
      return {
        ...state,
        editCandidateClientData: action.payload,
        editCandidateClientDataError: "",
      };
    case EDIT_CANDIDATE_CLIENT_DATA_ERROR:
      return {
        ...state,
        editCandidateClientData: "",
        editCandidateClientDataError: action.payload,
      };
    case EDIT_CANDIDATE_JOB_DATA:
      return {
        ...state,
        editCandidateJobData: action.payload,
        editCandidateJobDataError: "",
      };
    case EDIT_CANDIDATE_JOB_DATA_ERROR:
      return {
        ...state,
        editCandidateJobData: "",
        editCandidateJobDataError: action.payload,
      };
    case EDIT_CANDIDATE_VENDOR_DATA:
      return {
        ...state,
        editCandidateVendorData: action.payload,
        editCandidateVendorDataError: "",
      };
    case EDIT_CANDIDATE_VENDOR_DATA_ERROR:
      return {
        ...state,
        editCandidateVendorData: "",
        editCandidateVendorDataError: action.payload,
      };
    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
