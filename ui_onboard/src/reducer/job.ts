import {
  ALL_JOB_DATA,
  ALL_JOB_DATA_ERROR,
  JOB_DATA,
  JOB_DATA_ERROR,
  JOB_VALIDATION_DATA,
  LOCAL_JOB_DATA,
  LOCAL_JOB_VALIDATION_DATA,
  SAVED_JOB_DATA,
  SAVED_JOB_DATA_ERROR,
} from "../actions/type";
import { cloneDeep, remove, findIndex } from "lodash";

//State type for defining the state of the reducer
interface Actions {
  payload: any;
  type: string;
}

//Job Interface to define the State type for the state of the reducer
interface JobInterface {
  jobData: any;
  jobDataError: any;
  allJobData: any;
  allJobDataError: any;
  savedJobData: any;
  savedJobDataError: any;
  jobValidationData: any;
  jobValidationDataError: any;
}

//State type for defining the state of the reducer
export type State = JobInterface;

//Initial state of the reducer of type State
export const initialState: State = {
  jobData: undefined,
  jobDataError: {},
  allJobData: [],
  allJobDataError: null,
  savedJobData: {},
  savedJobDataError: {},
  jobValidationData: {
    requestIDValid: "",
    jobDivaIDValid: "",
    jobTitleValid: "",
    workingFromValid: "",
    workTypeValid: "",
    jobTypeValid: "",
    resumeSourceValid: "",
    lineOfBusinessValid: "",
    skillSetValid: "",
    jobDescriptionValid: "",
  },
  jobValidationDataError: null,
};

export const JobReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case JOB_DATA:
      return {
        ...state,
        jobData: action.payload,
        jobDataError: "",
      };
    case LOCAL_JOB_DATA: {
      const tempCurrentValue = cloneDeep(state.jobData);
      tempCurrentValue[action.payload.key] = action.payload.value;

      return {
        ...state,
        jobData: tempCurrentValue,
      };
    }
    case JOB_VALIDATION_DATA:
      return {
        ...state,
        jobValidationData: action.payload,
        jobValidationDataError: "",
      };

    case LOCAL_JOB_VALIDATION_DATA: {
      const tempCurrentValue = cloneDeep(state?.jobValidationData);
      tempCurrentValue[action?.payload?.key] = action?.payload?.value;

      return {
        ...state,
        jobValidationData: tempCurrentValue,
      };
    }
    case ALL_JOB_DATA:
      return {
        ...state,
        allJobData: action.payload,
        allJobDataError: "",
      };
    case ALL_JOB_DATA_ERROR:
      return {
        ...state,
        allJobData: "",
        allJobDataError: action.payload,
      };
    case SAVED_JOB_DATA:
      return {
        ...state,
        savedJobData: action.payload,
        savedJobDataError: "",
      };
    case SAVED_JOB_DATA_ERROR:
      return {
        ...state,
        savedJobData: "",
        savedJobDataError: action.payload,
      };
    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
