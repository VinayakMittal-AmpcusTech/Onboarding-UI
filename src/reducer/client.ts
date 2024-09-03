import {
  ALL_CLIENT_DATA,
  ALL_CLIENT_DATA_ERROR,
  CLIENT_DATA,
  CLIENT_DATA_ERROR,
  CLIENT_VALIDATION_DATA,
  LOCAL_CLIENT_DATA,
  LOCAL_CLIENT_VALIDATION_DATA,
  SAVED_CLIENT_DATA,
  SAVED_CLIENT_DATA_ERROR,
  UPDATE_ONLY_CLIENT_DATA,
  UPDATE_ONLY_CLIENT_DATA_ERROR,
} from "../actions/type";
import { cloneDeep, remove, findIndex } from "lodash";

//State type for defining the state of the reducer
interface Actions {
  payload: any;
  type: string;
}

//Client Interface to define the State type for the state of the reducer
interface ClientInterface {
  clientData: any;
  clientDataError: any;
  allClientData: any;
  allClientDataError: any;
  savedClientData: any;
  savedClientDataError: any;
  updateOnlyClientData: any;
  updateOnlyClientDataError: any;
  clientValidationData: any;
  clientValidationDataError: any;
}

//State type for defining the state of the reducer
export type State = ClientInterface;

//Initial state of the reducer of type State
export const initialState: State = {
  clientData: undefined,
  clientDataError: {},
  allClientData: [],
  allClientDataError: null,
  savedClientData: {},
  savedClientDataError: {},
  updateOnlyClientData: {},
  updateOnlyClientDataError: null,
  clientValidationData: {
    clientNameValid: "",
    contractTypeValid: "",
    endClientNameValid: "",
    mspNameValid: "",
    emailValid: "",
    contactNumberValid: "",
    faxNumberValid: "",
    addressIdValid: "",
    line1Valid: "",
    line2Valid: "",
    cityValid: "",
    stateValid: "",
    zipCodeValid: "",
    countryValid: "",
  },
  clientValidationDataError: null,
};

export const ClientReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case CLIENT_DATA:
      return {
        ...state,
        clientData: action.payload,
        clientDataError: "",
      };
    case LOCAL_CLIENT_DATA: {
      const tempCurrentValue = cloneDeep(state.clientData);
      tempCurrentValue[action.payload.key] = action.payload.value;

      return {
        ...state,
        clientData: tempCurrentValue,
      };
    }
    case CLIENT_VALIDATION_DATA:
      return {
        ...state,
        clientValidationData: action.payload,
        clientValidationDataError: "",
      };

    case LOCAL_CLIENT_VALIDATION_DATA: {
      const tempCurrentValue = cloneDeep(state?.clientValidationData);
      tempCurrentValue[action?.payload?.key] = action?.payload?.value;

      return {
        ...state,
        clientValidationData: tempCurrentValue,
      };
    }
    case ALL_CLIENT_DATA:
      return {
        ...state,
        allClientData: action.payload,
        allClientDataError: "",
      };
    case ALL_CLIENT_DATA_ERROR:
      return {
        ...state,
        allClientData: "",
        allClientDataError: action.payload,
      };
    case SAVED_CLIENT_DATA:
      return {
        ...state,
        savedClientData: action.payload,
        savedClientDataError: "",
      };
    case SAVED_CLIENT_DATA_ERROR:
      return {
        ...state,
        savedClientData: "",
        savedClientDataError: action.payload,
      };
    case UPDATE_ONLY_CLIENT_DATA:
      return {
        ...state,
        updateOnlyClientData: action.payload,
        updateOnlyClientDataError: "",
      };
    case UPDATE_ONLY_CLIENT_DATA_ERROR:
      return {
        ...state,
        updateOnlyClientData: "",
        updateOnlyClientDataError: action.payload,
      };
    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
