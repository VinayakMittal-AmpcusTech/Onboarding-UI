import {
    ALL_WORKAUTHORIZATION_DATA,
    ALL_WORKAUTHORIZATION_DATA_ERROR,
    WORKAUTHORIZATION_DATA,
    WORKAUTHORIZATION_DATA_ERROR,
    LOCAL_WORKAUTHORIZATION_DATA,
    SAVED_WORKAUTHORIZATION_DATA,
    SAVED_WORKAUTHORIZATION_DATA_ERROR
} from "../actions/type";
import { cloneDeep, remove, findIndex } from "lodash";

//State type for defining the state of the reducer
interface Actions {
    payload: any;
    type: string;
}

//WorkAuthorization Interface to define the State type for the state of the reducer
interface WorkAuthorizationInterface {
    workAuthorizationData: any;
    workAuthorizationDataError: any;
    allWorkAuthorizationData: any,
    allWorkAuthorizationDataError: any,
}

//State type for defining the state of the reducer
export type State = WorkAuthorizationInterface;

//Initial state of the reducer of type State
export const initialState: State = {
    workAuthorizationData: [],
    workAuthorizationDataError: {},
    allWorkAuthorizationData: [],
    allWorkAuthorizationDataError: {},
};

export const WorkAuthorizationReducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case WORKAUTHORIZATION_DATA:
            return {
                ...state,
                workAuthorizationData: action.payload,
                workAuthorizationDataError: "",
            };
        case LOCAL_WORKAUTHORIZATION_DATA: {
            const tempCurrentValue = cloneDeep(state.workAuthorizationData);
            tempCurrentValue[action.payload.key] = action.payload.value;

            return {
                ...state,
                workAuthorizationData: tempCurrentValue,
            };
        }
        case ALL_WORKAUTHORIZATION_DATA:
            return {
                ...state,
                allWorkAuthorizationData: action.payload,
                allWorkAuthorizationDataError: "",
            };
        case ALL_WORKAUTHORIZATION_DATA_ERROR:
            return {
                ...state,
                allWorkAuthorizationData: "",
                allWorkAuthorizationDataError: action.payload,
            };
        case SAVED_WORKAUTHORIZATION_DATA:
            return {
                ...state,
                savedWorkAuthorizationData: action.payload,
                savedWorkAuthorizationDataError: "",
            };
        case SAVED_WORKAUTHORIZATION_DATA_ERROR:
            return {
                ...state,
                savedWorkAuthorizationData: "",
                savedWorkAuthorizationDataError: action.payload,
            };
        //return state as it is if action is not of any of the aforementioned types
        default:
            return state;
    }
};