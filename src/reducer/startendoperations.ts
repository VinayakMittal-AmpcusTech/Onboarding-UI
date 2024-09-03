import { cloneDeep } from "lodash";
import {
  LOCAL_START_END_OPERATIONS_DATA,
  LOCAL_START_END_VALIDATION_DATA,
  SINGLE_START_END_OPERATIONS,
  SINGLE_START_END_OPERATIONS_ERROR,
  START_END_OPERATIONS_DATA,
  START_END_OPERATIONS_DATA_ERROR,
  START_END_VALIDATION_DATA,
} from "../actions/type";

//State type for defining the state of the reducer
interface Actions {
  payload: any;
  type: string;
}

//Start End Operations Interface to define the State type for the state of the reducer
interface StartEndOperationsInterface {
  startEndOperationsData: any;
  startEndOperationsDataError: any;
  singlestartEndOperationData: any;
  singlestartEndOperationError: any;
  startEndValidationData: any;
  startEndValidationDataError: any;
}

//State type for defining the state of the reducer
export type State = StartEndOperationsInterface;

//Initial state of the reducer of type State
export const initialState: State = {
  startEndOperationsData: undefined,
  startEndOperationsDataError: {},
  singlestartEndOperationData: undefined,
  singlestartEndOperationError: {},
  startEndValidationData: {
    joiningStatus: "",
    joiningType: "",
    joiningStatusRemark: "",
    recruiter: "",
    teamLead: "",
    crm: "",
    teamManager: "",
    seniorManager: "",
    assoDirector: "",
    centerHead: "",
    onsiteAccDirector: "",
    onboCoordinator: "",
    endDate: "",
    exitClearance: "",
    endReason: "",
    endRemarks: "",
    grossBr: "",
    mspFeePercentage: "",
    mspFee: "",
    payRate: "",
    refFee: "",
    taxOHPercentage: "",
    taxOH: "",
    hBenefitesOpted: "",
    hBenefitesCost: "",
    netBillRate: "",
    netPurchase: "",
    margin: "",
    fullTimeSalaryOffered: "",
    jobLevel: "",
    ffInvoiceStatus: "",
  },
  startEndValidationDataError: {},
};

export const StartEndOperationsReducer = (
  state: State = initialState,
  action: Actions
) => {
  switch (action.type) {
    case START_END_OPERATIONS_DATA:
      return {
        ...state,
        startEndOperationsData: action.payload,
        startEndOperationsDataError: "",
      };
    case START_END_OPERATIONS_DATA_ERROR:
      return {
        ...state,
        startEndOperationData: "",
        startEndOperationDataError: action.payload,
      };
    case SINGLE_START_END_OPERATIONS:
      return {
        ...state,
        singleStartEndOperationData: action.payload,
        singleStartEndOperationDataError: "",
      };
    case SINGLE_START_END_OPERATIONS_ERROR:
      return {
        ...state,
        singleStartEndOperationData: "",
        singleStartEndOperationDataError: action.payload,
      };
    case LOCAL_START_END_OPERATIONS_DATA: {
      const tempCurrentValue = cloneDeep(state.startEndOperationsData);
      tempCurrentValue[action.payload.key] = action.payload.value;

      return {
        ...state,
        startEndOperationsData: tempCurrentValue,
      };
    }

    case START_END_VALIDATION_DATA:
      return {
        ...state,
        startEndValidationData: action.payload,
        startEndValidationDataError: "",
      };

    case LOCAL_START_END_VALIDATION_DATA: {
      const tempCurrentValue = cloneDeep(state?.startEndValidationData);
      tempCurrentValue[action?.payload?.key] = action?.payload?.value;

      return {
        ...state,
        startEndValidationData: tempCurrentValue,
      };
    }
    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
