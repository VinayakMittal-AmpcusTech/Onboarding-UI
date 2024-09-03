//Chetan Patil - [20-07-23] - user action for user functionality

import axios from "axios";
import { AppDispatch } from "../redux/store";
import {
  CLEAR_ERRORS,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  START_LOADING,
  STOP_LOADING,
} from "./type";
import { API_URL } from "./serverconnection";
import { History, createBrowserHistory } from "history"; //Import History interface
import Swal from "sweetalert2";

export const signIn = (username: string, password: string) => {
  console.log("password: ", password);
  console.log("username: ", username);
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: START_LOADING });

      const result = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      console.log("result: ", result);
      //Get the token from the result
      const { access_token } = result.data;
      localStorage.setItem("token", access_token);
      const { user } = result.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: user,
        token: access_token,
      });

      dispatch({ type: STOP_LOADING });

      //Clear all errors in the reducer
      clearErrors(dispatch);
    } catch (err) {
      console.log("err: ", err);
      //dispatch the error data
      dispatch({
        type: SIGN_IN_ERROR,
        payload: (err as any).response?.data?.message,
      });
      dispatch({ type: STOP_LOADING });
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "The username and password you entered did not match our records.",
      });
    }
  };
};

//Action creator for clearing the user reducer from errors
export const clearErrors = (dispatch: React.Dispatch<any>) => {
  //Dispatch CLEAR_ERRORS type
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const setUserDetails = (user: any, token: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: user,
      token: token,
    });
  };
};
