import {
    ALL_CONTRACTTYPE_DATA,
    ALL_CONTRACTTYPE_DATA_ERROR,
    CONTRACTTYPE_DATA,
    CONTRACTTYPE_DATA_ERROR,
    LOCAL_CONTRACTTYPE_DATA,
    SAVED_CONTRACTTYPE_DATA,
    SAVED_CONTRACTTYPE_DATA_ERROR
} from "../actions/type";
import { cloneDeep, remove, findIndex } from "lodash";

//State type for defining the state of the reducer
interface Actions {
    payload: any;
    type: string;
}

//ContractType Interface to define the State type for the state of the reducer
interface ContractTypeInterface {
    contractTypeData: any;
    contractTypeDataError: any;
    allContractTypeData: any,
    allContractTypeDataError: any,
}

//State type for defining the state of the reducer
export type State = ContractTypeInterface;

//Initial state of the reducer of type State
export const initialState: State = {
    contractTypeData: [],
    contractTypeDataError: {},
    allContractTypeData: [],
    allContractTypeDataError: {},
};

export const ContractTypeReducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case CONTRACTTYPE_DATA:
            return {
                ...state,
                contractTypeData: action.payload,
                contractTypeDataError: "",
            };
        case LOCAL_CONTRACTTYPE_DATA: {
            const tempCurrentValue = cloneDeep(state.contractTypeData);
            tempCurrentValue[action.payload.key] = action.payload.value;

            return {
                ...state,
                contractTypeData: tempCurrentValue,
            };
        }
        case ALL_CONTRACTTYPE_DATA:
            return {
                ...state,
                allContractTypeData: action.payload,
                allContractTypeDataError: "",
            };
        case ALL_CONTRACTTYPE_DATA_ERROR:
            return {
                ...state,
                allContractTypeData: "",
                allContractTypeDataError: action.payload,
            };
        case SAVED_CONTRACTTYPE_DATA:
            return {
                ...state,
                savedContractTypeData: action.payload,
                savedContractTypeDataError: "",
            };
        case SAVED_CONTRACTTYPE_DATA_ERROR:
            return {
                ...state,
                savedContractTypeData: "",
                savedContractTypeDataError: action.payload,
            };
        //return state as it is if action is not of any of the aforementioned types
        default:
            return state;
    }
};