
//Ajay Bagul - [20-07-23] - loading reducer

//import the types of actions supported
// import { START_LOADING, STOP_LOADING, LOAD_SCREEN } from "../actions/Types";

import { LOAD_SCREEN, START_LOADING, STOP_LOADING } from "../actions/type";

//Actions type to accept either START_LOADING or STOP_LOADING type
export type Actions =
  | {
      type: typeof START_LOADING;
    }
  | {
      type: typeof STOP_LOADING;
    }
  | {
      type: typeof LOAD_SCREEN;
      payload: string;
    };

//LoadingInterface to define the State type for the state of the reducer
interface LoadingInterface {
  loading: boolean;
  screenName: string;
}

//State type for defining the state of the reducer
export type State = LoadingInterface;

//Initial state of the reducer of type State
export const initialState: State = {
  loading: false,
  screenName: "",
};

//Loading reducer which takes a state and an action param
export const LoadingReducer = (state: State = initialState, action: Actions) => {
  //switch between action.type
  switch (action.type)
   {
    case LOAD_SCREEN:
      return {
        
        ...state,
        screenName: action.payload,
      };
    //if action is of type START_LOADING return the state by setting loading to true
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    //if action is of type STOP_LOADING return the state by setting loading to false
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};