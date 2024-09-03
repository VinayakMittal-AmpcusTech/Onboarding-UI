import { cloneDeep } from "lodash";
import {
  DOCUMENTATION_DATA,
  DOCUMENTATION_DATA_ERROR,
  DOCUMENTATION_VALIDATION_DATA,
  DOCUMENTATION_VALIDATION_DATA_ERROR,
  LOCAL_DOCUMENTATION_DATA,
  LOCAL_DOCUMENTATION_VALIDATION_DATA,
  SINGLE_DOCUMENTATION,
  SINGLE_DOCUMENTATION_ERROR,
} from "../actions/type";

interface Actions {
  payload: any;
  type: string;
}

interface Interface {
  documentationData: any;
  documentationDataError: any;
  singleDocumentationData: any;
  singleDocumentationDataError: any;
  docValidationData: any;
  docValidationDataError: any;
}

export const initialState: State = {
  documentationData: undefined,
  documentationDataError: {},
  singleDocumentationData: undefined,
  singleDocumentationDataError: {},
  docValidationData: {
    articlesOrCertificateOFIncorporationValid: "",
    w9Orw4Valid: "",
    directDepositAgreementValid: "",
    voidCheckOrEmailContentValid: "",
    CIPCICICAOrCIPCICUValid: "",
    goodStandingDocumentValid: "",
    workAuthorizationDocumentValid: "",
    I9FormValid: "",
    listADocumentValid: "",
    listBDocumentValid: "",
    listCDocumentValid: "",
    E_verifyValid: "",
    E_verificationDateValid: "",
    emergencyFormValid: "",
    vaccinationStatusValid: "",
    MSAValid: "",
    SOWValid: "",
    SOWValidityValid: "",
    certificateOFInsuranceOrCOIValid: "",
    certificationOfInsuranceValid: "",
    clientTaskOrderOrSOWValid: "",
    clientTaskOrderOrSOWstValid: "",
    clientTaskOrderSigningValid: "",
    TaskOrderExpiryDateValid: "",
    documentationStatusValid: "",
    documentationRemarkValid: "",
    documentationCompletionDateValid: "",
  },
  docValidationDataError: {},
};
export type State = Interface;
export const documentationReducer = (
  state: State = initialState,
  action: Actions
) => {
  switch (action.type) {
    case DOCUMENTATION_DATA:
      return {
        ...state,
        documentationData: action.payload,
        documentationDataError: "",
      };
    case DOCUMENTATION_DATA_ERROR:
      return {
        ...state,
        documentationData: "",
        documentationDataError: action.payload,
      };
    case SINGLE_DOCUMENTATION:
      return {
        ...state,
        singleDocumentationData: action.payload,
        singleDocumentationDataError: "",
      };
    case SINGLE_DOCUMENTATION_ERROR:
      return {
        ...state,
        singleDocumentationData: "",
        singleDocumentationDataError: action.payload,
      };
    case LOCAL_DOCUMENTATION_DATA: {
      const tempCurrentValue = cloneDeep(state.documentationData);
      tempCurrentValue[action.payload.key] = action.payload.value;
      return {
        ...state,
        documentationData: tempCurrentValue,
      };
    }
    case DOCUMENTATION_VALIDATION_DATA:
      return {
        ...state,
        docValidationData: action.payload,
        docValidationDataError: "",
      };

    case LOCAL_DOCUMENTATION_VALIDATION_DATA: {
      const tempCurrentValue = cloneDeep(state?.docValidationData);
      tempCurrentValue[action?.payload?.key] = action?.payload?.value;

      return {
        ...state,
        docValidationData: tempCurrentValue,
      };
    }
    default:
      return state;
  }
};
