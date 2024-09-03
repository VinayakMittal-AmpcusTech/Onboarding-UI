import {
    ALL_DATA,
    ALL_DATA_ERROR,
} from "../actions/type";
import { cloneDeep, remove, findIndex } from "lodash";

//State type for defining the state of the reducer
interface Actions {
    payload: any;
    type: string;
}

//All Interface to define the State type for the state of the reducer
interface AllInterface {
    allData: any;
    allDataError: any;
}

//State type for defining the state of the reducer
export type State = AllInterface;

//Initial state of the reducer of type State
export const initialState: State = {
    allData: undefined,
    allDataError: {}
};

export const AllReducer = (state: State = initialState, action: Actions) => {
    switch (action.type) {
        case ALL_DATA:
            return {
                ...state,
                allData: action.payload,
                allDataError: "",
            };
        case ALL_DATA_ERROR:
            return {
                ...state,
                allData: action.payload,
                allDataError: "",
            };
        //return state as it is if action is not of any of the aforementioned types
        default:
            return state;
    }
};