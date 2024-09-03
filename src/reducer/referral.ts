import {
    REFERRAL_DATA,
    REFERRAL_DATA_ERROR,
    LOCAL_REFERRAL_DATA,
    ALL_REFERRAL_DATA,
    ALL_REFERRAL_DATA_ERROR,
    REFERRAL_VALIDATION_DATA,
    LOCAL_REFERRAL_VALIDATION_DATA
} from "../actions/type";
import { cloneDeep, remove, findIndex } from "lodash";

//State type for defining the state of the reducer
interface Actions {
    payload: any;
    type: string;
}

//Referral Interface to define the State type for the state of the reducer
interface ReferralInterface {
    referralData: any;
    referralDataError: any;
    allReferralData: any;
    allReferralDataError: any;
    referralValidationData: any;
    referralValidationDataError: any;
}
//State type for defining the state of the reducer
export type State = ReferralInterface;

//Initial state of the reducer of type State
export const initialState: State = {
    referralData: undefined,
    referralDataError: {},
    allReferralData: [],
    allReferralDataError: null,
    referralValidationData: {
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
    referralValidationDataError: null,

};

export const ReferralReducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case REFERRAL_DATA:
            return {
                ...state,
                referralData: action.payload,
                referralDataError: "",
            };
        case LOCAL_REFERRAL_DATA: {
            const tempCurrentValue = cloneDeep(state.referralData);
            tempCurrentValue[action.payload.key] = action.payload.value;

            return {
                ...state,
                referralData: tempCurrentValue,
            };
        }
        case REFERRAL_VALIDATION_DATA: {
            return {
                ...state,
                referralValidationData: action.payload,
                referralValidationDataError: "",
            }
        }
        case LOCAL_REFERRAL_VALIDATION_DATA: {
            const tempCurrentValue = cloneDeep(state?.referralValidationData);
            tempCurrentValue[action?.payload?.key] = action?.payload?.value;

            return {
                ...state,
                referralValidationData: tempCurrentValue,
            };
        }

        case ALL_REFERRAL_DATA:
            return {
                ...state,
                allReferralData: action.payload,
                allReferralDataError: "",
            }


        // case ALL_REFERRAL_DATA:
        //     return {
        //         ...state,
        //         allVendorData: action.payload,
        //         allVendorDataError: "",
        //     };
        case ALL_REFERRAL_DATA_ERROR:
            return {
                ...state,
                allReferralData: "",
                allReferralDataError: action.payload,
            };
        //return state as it is if action is not of any of the aforementioned types
        default:
            return state;
    }
};