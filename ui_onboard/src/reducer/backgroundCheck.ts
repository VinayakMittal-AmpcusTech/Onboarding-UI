import { cloneDeep } from "lodash";
import {
  BACKGROUND_CHECK,
  BACKGROUND_CHECK_ERROR,
  BACKGROUND_CHECK_VALIDATION_DATA,
  LOCAL_BACKGROUND_CHECK,
  LOCAL_BACKGROUND_CHECK_VALIDATION_DATA,
  SECONDARY_BUTTON,
  SECONDARY_BUTTON_ERROR,
  SINGLE_BACKGROUND_CHECK,
  SINGLE_BACKGROUND_CHECK_ERROR,
  TERTIARY_BUTTON,
  TERTIARY_BUTTON_ERROR,
} from "../actions/type";

interface Actions {
  payload: any;
  type: string;
}

interface Interface {
  secondaryButton: any;
  secondaryButtonError: any;
  tertiaryButton: any;
  tertiaryButtonError: any;
  backgroundCheckData: any;
  backgroundCheckDataError: any;
  singleBackgroundCheckData: any;
  singleBackgroundCheckDataError: any;
  bgValidationData: any;
  bgValidationDataError: any;
}

export const initialState: State = {
  secondaryButton: false,
  secondaryButtonError: "",
  tertiaryButton: false,
  tertiaryButtonError: "",
  backgroundCheckData: undefined,
  backgroundCheckDataError: {},
  singleBackgroundCheckData: undefined,
  singleBackgroundCheckDataError: {},
  bgValidationData: {
    caseID1Valid: "",
    BGCInitiatedOnValid: "",
    primaryBGCInitiatedThruValid: "",
    BGCPackage1: "",
    BGCPackage2: "",
    BGCInvoiceMonthValid: "",
    BGCChargesPrimaryValid: "",
    caseID2Valid: "",
    secondaryBGCInitiatedOnValid: "",
    secondaryBGCInitiatedThruValid: "",
    secondaryBGCPackage1Valid: "",
    secondaryBGCPackage2Valid: "",
    secondaryBGCInvoiceMonthValid: "",
    secondaryBGCChargesValid: "",
    caseID3Valid: "",
    tertiaryBGCInitiatedOnValid: "",
    tertiaryBGCInitiatedThruValid: "",
    tertiaryBGCPackage1Valid: "",
    tertiaryBGCPackage2Valid: "",
    tertiaryBGCInvoiceMonthValid: "",
    tertiaryBGCChargesValid: "",
    BGCStatusValid: "",
    BGCCompletedOnValid: "",
    BGCAffidavitStatusValid: "",
    BGCAffidavitOnValid: "",
    BGCReportStatusValid: "",
    BGCAdjuStatusValid: "",
    adjuSupportingDocsValid: "",
    dateOfAdjudicationValid: "",
    finalBGCReportValid: "",
    BGCRemarkValid: "",
  },
  bgValidationDataError: {},
};

export type State = Interface;
export const BackgroundCheckReducer = (
  state: State = initialState,
  action: Actions
) => {
  switch (action.type) {
    case SECONDARY_BUTTON:
      return {
        ...state,
        secondaryButton: action.payload,
        secondaryButtonError: "",
      };
    case SECONDARY_BUTTON_ERROR:
      return {
        ...state,
        secondaryButton: false,
        secondaryButtonError: action.payload,
      };
    case TERTIARY_BUTTON:
      return {
        ...state,
        tertiaryButton: action.payload,
        tertiaryButtonError: "",
      };
    case TERTIARY_BUTTON_ERROR:
      return {
        ...state,
        tertiaryButton: false,
        tertiaryButtonError: action.payload,
      };
    case BACKGROUND_CHECK:
      return {
        ...state,
        backgroundCheckData: action.payload,
        backgroundCheckDataError: "",
      };
    case BACKGROUND_CHECK_ERROR:
      return {
        ...state,
        backgroundCheckData: "",
        backgroundCheckDataError: action.payload,
      };
    case SINGLE_BACKGROUND_CHECK:
      return {
        ...state,
        singleBackgroundCheckData: action.payload,
        singleBackgroundCheckDataError: "",
      };
    case SINGLE_BACKGROUND_CHECK_ERROR:
      return {
        ...state,
        singleBackgroundCheckData: "",
        singleBackgroundCheckDataError: action.payload,
      };
    case LOCAL_BACKGROUND_CHECK: {
      const tempCurrentValue = cloneDeep(state.backgroundCheckData);
      tempCurrentValue[action.payload.key] = action.payload.value;
      return {
        ...state,
        backgroundCheckData: tempCurrentValue,
      };
    }

    case BACKGROUND_CHECK_VALIDATION_DATA:
      return {
        ...state,
        bgValidationData: action.payload,
        bgValidationDataError: "",
      };

    case LOCAL_BACKGROUND_CHECK_VALIDATION_DATA: {
      const tempCurrentValue = cloneDeep(state?.bgValidationData);
      tempCurrentValue[action?.payload?.key] = action?.payload?.value;

      return {
        ...state,
        bgValidationData: tempCurrentValue,
      };
    }

    default:
      return state;
  }
};
