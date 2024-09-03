// chetan patil - [26-07-2023] - Rate Revision Reducer Page

import { cloneDeep } from "lodash";
import {
  EDIT_RATEREVISION_DATA,
  EDIT_RATEREVISION_DATA_ERROR,
  LOCAL_RATE_REVISION_DATA,
  LOCAL_RATE_REVISION_VALIDATION_DATA,
  RATE_REVISION_DATA,
  RATE_REVISION_DATA_ERROR,
  RATE_REVISION_VALIDATION_DATA,
  SINGLE_RATE_REVISION,
  SINGLE_RATE_REVISION_ERROR,
} from "../actions/type";

interface Actions {
  payload: any;
  type: string;
}

//Rate Revision Interface to define the State type for the state of the reducer
interface RateRevisionInterface {
  rateRevisionData: any;
  rateRevisionDataError: any;
  editRaterevisionData: any;
  editRaterevisionDataError: any;
  singleRateRevisionData: any;
  singleRateRevisionDataError: any;
  rateRevisionValidationData: any;
  rateRevisionValidationDataError: any;
}

//State type for defining the state of the reducer
export type State = RateRevisionInterface;

//Initial state of the reducer of type State
export const initialState: State = {
  rateRevisionData: undefined,
  rateRevisionDataError: {},
  editRaterevisionData: {},
  editRaterevisionDataError: null,
  singleRateRevisionData: undefined,
  singleRateRevisionDataError: {},
  rateRevisionValidationData: {
    grossBrValid: "",
    mspFeePercentageValid: "",
    mspFeeValid: "",
    netBillRateValid: "",
    payRateValid: "",
    refFeeValid: "",
    taxOHPercentageValid: "",
    taxOHValid: "",
    optedForHBValid: "",
    healthBValid: "",
    netPurchaseValid: "",
    marginValid: "",
    rateRevisionReasonValid: "",
  },
  rateRevisionValidationDataError: {},
};

export const RateRevisionReducer = (
  state: State = initialState,
  action: Actions
) => {
  switch (action.type) {
    case RATE_REVISION_DATA:
      return {
        ...state,
        rateRevisionData: action.payload,
        rateRevisionDataError: "",
      };
    case LOCAL_RATE_REVISION_DATA: {
      const tempCurrentValue = cloneDeep(state.rateRevisionData);
      tempCurrentValue[action.payload.key] = action.payload.value;

      return {
        ...state,
        rateRevisionData: tempCurrentValue,
      };
    }
    case RATE_REVISION_DATA_ERROR:
      return {
        ...state,
        rateRevisionData: "",
        rateRevisionDataError: action.payload,
      };
    case SINGLE_RATE_REVISION:
      return {
        ...state,
        singleRateRevisionData: action.payload,
        singleRateRevisionDataError: "",
      };
    case SINGLE_RATE_REVISION_ERROR:
      return {
        ...state,
        singleRateRevisionData: "",
        singleRateRevisionDataError: action.payload,
      };
    case EDIT_RATEREVISION_DATA:
      return {
        ...state,
        editRaterevisionData: action.payload,
        editRaterevisionDataError: "",
      };
    case EDIT_RATEREVISION_DATA_ERROR:
      return {
        ...state,
        editRaterevisionData: "",
        editRaterevisionDataError: action.payload,
      };

    case RATE_REVISION_VALIDATION_DATA:
      return {
        ...state,
        rateRevisionValidationData: action.payload,
        rateRevisionValidationDataError: "",
      };

    case LOCAL_RATE_REVISION_VALIDATION_DATA: {
      const tempCurrentValue = cloneDeep(state?.rateRevisionValidationData);
      tempCurrentValue[action?.payload?.key] = action?.payload?.value;

      return {
        ...state,
        rateRevisionValidationData: tempCurrentValue,
      };
    }
    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
