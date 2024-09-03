import axios from "axios";
import { AppDispatch, RootState } from "../redux/store";
import { REFERRAL_DATA, LOCAL_REFERRAL_DATA, REFERRAL_VALIDATION_DATA, ALL_REFERRAL_DATA, ALL_REFERRAL_DATA_ERROR, LOCAL_VENDOR_VALIDATION_DATA, LOCAL_REFERRAL_VALIDATION_DATA } from "./type";
import { EMPTY_REFERRAL_DATA, EMPTY_REFERRAL_VALIDATION_DATA } from "../utils/referral";
import { type } from "@testing-library/user-event/dist/type";

export const referralData = () => async (dispatch: any) => {
    dispatch({ type: REFERRAL_DATA, payload: EMPTY_REFERRAL_DATA });
};

export const setReferralInputBoxValue = (key: any, value: any) => async (dispatch: any) => {
    dispatch({ type: LOCAL_REFERRAL_DATA, payload: { key, value } });
};
export const referralValidationData = () => async (dispatch: any) => {
    dispatch({
        type: REFERRAL_VALIDATION_DATA,
        payload: EMPTY_REFERRAL_VALIDATION_DATA
    })
}
export const setReferralValidation =
    (key: any, value: any) => async (dispatch: any) => {
        dispatch({
            type: LOCAL_REFERRAL_VALIDATION_DATA,
            payload: { key, value },
        });
    };
export const allReferralData = () => async (dispatch: any) => {
    try {
        const result = await axios.get(
            "http://localhost:3001/referral/get-all-referrals"
        );
        dispatch({
            type: ALL_REFERRAL_DATA,
            payload: result.data,
        });
    } catch (err) {
        dispatch({
            type: ALL_REFERRAL_DATA_ERROR,
            payload: (err as any).response?.data?.message,
        });
    }
};