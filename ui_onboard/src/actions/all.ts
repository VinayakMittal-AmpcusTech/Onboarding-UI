import axios from "axios";
import { AppDispatch, RootState } from "../redux/store";
import { ALL_DATA, ALL_DATA_ERROR } from "./type";
import Swal from "sweetalert2";

export const sendAllData =
  (
    candidateData: any,
    clientData: any,
    vendorData: any,
    referralData: any,
    jobData: any,
    BGCData: any,
    documentationData: any,
    startAndEndOperationData: any,
    rateRevisionData: any
  ) =>
  async (dispatch: AppDispatch, getState: RootState) => {
    try {
      let allData = {
        candidateData: candidateData,
        clientData: clientData,
        vendorData: vendorData,
        referralData: referralData,
        jobData: jobData,
        bgcData: BGCData,
        documentationData: documentationData,
        startAndEndOperationData: startAndEndOperationData,
        rateRevisionData: rateRevisionData,
      };

      const result = await axios.post("http://localhost:3001/candidate/test", {
        allData,
      });
      dispatch({
        type: ALL_DATA,
        payload: result?.data,
      });
      Swal.fire("Candidate added", "", "success");
    } catch (err) {
      dispatch({
        type: ALL_DATA_ERROR,
        payload:
          (err as any)?.response?.data?.message ||
          "Unable to save record at the moment. Please Try Again.",
      });
    }
  };
