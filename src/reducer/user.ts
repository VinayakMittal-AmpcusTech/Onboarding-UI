//Chetan Patil - [20/07/2023] - user reducer

import { LOGOUT, SIGN_IN_FAILED, SIGN_IN_REQUEST, SIGN_IN_SUCCESS } from "../actions/type";

  
  //UserInterface to define the State type for the state of the reducer
  
  interface UserInterface {
    userDetails: any;
    userDetailsError: string;
    token: string | null;
    error: string | null;
    loginRequest: boolean;
  }
  
  interface Actions {
    payload: any;
    type: string;
    token: string;
  }
  //State type for defining the state of the reducer
  export type State = UserInterface;
  
  //Initial state of the reducer of type State
  export const initialState: State = {
    userDetails: undefined,
    userDetailsError: "",
    token: null,
    error: null,
    loginRequest: false,
  };
  export const UserReducer = (state: State = initialState, action: Actions) => {
    //switch between action.type
    switch (action.type) {
      //if action is of type SIGN_IN or SIGN_UP return the state by setting token to the payload
      case SIGN_IN_REQUEST:
        return {
          ...state,
          loginRequest: true,
        };
      case SIGN_IN_SUCCESS:
        return {
          ...state,
          token: action.token,
          userDetails: action.payload,
          loginRequest: false,
        };
    //   case SIGN_UP:
    //     return {
    //       ...state,
    //       //token: action.token,
    //       userDetails: action.payload,
    //     };
      //if action is of type SIGN_IN_ERROR or SIGN_UP_ERROR return the state by setting error to the payload
      case SIGN_IN_FAILED:
    //   case SIGN_UP_ERROR:
    //     return {
    //       ...state,
    //       error: action.payload,
    //       loginRequest: false,
    //       userDetails: undefined,
    //     };
      //if action is of type LOGOUT return the state by setting error and token to null
      case LOGOUT:
        return {
          ...state,
          token: null,
          error: null,
        };
      //if action is of type CLEAR_ERRORS return the state by setting error to null
    //   case CLEAR_ERRORS:
    //     return {
    //       ...state,
    //       error: null,
    //     };
    //   case APPLICATION_ROLES:
    //     return {
    //       ...state,
    //       roleDetails: action.payload,
    //       roleDetailsError: "",
    //     };
    //   case APPLICATION_ROLES_ERROR:
    //     return {
    //       ...state,
    //       roleDetails: [],
    //       roleDetailsError: action.payload,
    //     };
      //return state as it is if action is not of any of the aforementioned types
      default:
        return state;
    }
  };
  