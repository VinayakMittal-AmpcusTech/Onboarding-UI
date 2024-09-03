// chetan patil - [21/07/2023] - Rate revision page
import { TextField } from "../../common/TextField/TextField";
import { TextArea } from "../../common/TextArea/TextArea";
import "./RateRevision.css";
import Grid from "@mui/material/Unstable_Grid2";
import { yesNoList } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import {
  setInputBoxValueRateRevision,
  setRateRevisionValidation,
} from "../../actions/raterevision";
import { Submit } from "../Submit/Submit";
import Select from "react-select";
import { useLocation } from "react-router";
import React, { useEffect, useState } from "react";
import { isTextValid } from "../../helpers/validate";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

export const RateRevision: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentRateRevisionData = useAppSelector(
    (state: RootState) => state?.rateRevision?.rateRevisionData
  );
  console.log("currentRateRevisionData", currentRateRevisionData);

  const validationRateRevisionData = useAppSelector(
    (state: RootState) => state?.rateRevision?.rateRevisionValidationData
  );
  console.log("validationRateRevisionData: ", validationRateRevisionData);
  const location = useLocation();

  const onValueChange = (key: any, value: any) => {
    dispatch(setInputBoxValueRateRevision(key, value));
  };
  const onValidationChange = (key: any, value: any) => {
    console.log("key: ", key);
    console.log("value: ", value);
    dispatch(setRateRevisionValidation(key, value));
  };
  function Icon({ id, open }: any) {
    return (
      // <svg
      //   // xmlns="http://www.w3.org/2000/svg"
      //   fill="none"
      //   // viewBox="0 0 24 24"
      //   strokeWidth={2}
      //   stroke="currentColor"
      //   // className={`${
      //   //   id === open ? "rotate-180" : ""
      //   // } h-6 w-6  transition-transform`}
      // >
      //   <path
      //     // strokeLinecap="round"
      //     // strokeLinejoin="round"
      //     d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      //   />
      // </svg>
      <h1></h1>
    );
  }
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = React.useState(0);
  console.log("open: ", open);

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          style={{ border: "none" }}
          onClick={() => {
            handleOpen(1);
            setFlag(!flag);
          }}
        >
          <h1 className="text-left flex justify-between items-center text-[18px] w-full text-white bg-[#78a9da] -mr-5  p-3 ">
            {" "}
            Rate Revision Details
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className={`${
                open ? "rotate-180" : ""
              } h-7 w-7 inline-block  transition-transform`}
            >
              <path
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </h1>
        </AccordionHeader>

        <AccordionBody>
          {flag && (
            <div
              className="flex gap-5 "
              style={{ margin: "auto", width: "100%" }}
            >
              <div className="relative w-[100%]  ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Initial details
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Gross BR</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentRateRevisionData?.grossBr}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("grossBr", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "grossBrValid",
                                "Gross BR should not be empty."
                              );
                            } else {
                              onValidationChange("grossBrValid", " ");
                            }
                          }}
                          className="mt-1"
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.grossBrValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>MSP fee in percentage</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentRateRevisionData?.mspFeePercentage}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "mspFeePercentage",
                              event?.target?.value
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "mspFeePercentageValid",
                                "MSP fee in percentage should not be empty."
                              );
                            } else {
                              onValidationChange("mspFeePercentageValid", " ");
                            }
                          }}
                          className="mt-1"
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.mspFeePercentageValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>MSP fee</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentRateRevisionData?.mspFee}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("mspFee", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "mspFeeValid",
                                "MSP fee should not be empty."
                              );
                            } else {
                              onValidationChange("mspFeeValid", " ");
                            }
                          }}
                          className="mt-1"
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.mspFeeValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Net bill rate</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentRateRevisionData?.netBillRate}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("netBillRate", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "netBillRateValid",
                                "Net bill rate should not be empty."
                              );
                            } else {
                              onValidationChange("netBillRateValid", " ");
                            }
                          }}
                          className="mt-1"
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.netBillRateValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Pay rate</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentRateRevisionData?.payRate}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("payRate", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "payRateValid",
                                "Pay rate should not be empty."
                              );
                            } else {
                              onValidationChange("payRateValid", " ");
                            }
                          }}
                          className="mt-1"
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.payRateValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Referral fee</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentRateRevisionData?.refFee}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("refFee", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "refFeeValid",
                                "Referral fee should not be empty."
                              );
                            } else {
                              onValidationChange("refFeeValid", " ");
                            }
                          }}
                          className="mt-1"
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.refFeeValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Tax OH percentage</span>
                      </td>
                      <td className="px-6 py-0 ">
                        <TextField
                          value={currentRateRevisionData?.taxOHPercentage}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "taxOHPercentage",
                              event?.target?.value
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "taxOHPercentageValid",
                                "Tax OH percentage should not be empty."
                              );
                            } else {
                              onValidationChange("taxOHPercentageValid", " ");
                            }
                          }}
                          className="mt-1"
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.taxOHPercentageValid}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="relative w-[100%]  ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Other details
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Opted for health benefits</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={yesNoList}
                          value={currentRateRevisionData?.optedForHB}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("optedForHB", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "optedForHBValid",
                                "Opted for health benefits should not be empty."
                              );
                            } else {
                              onValidationChange("optedForHBValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />{" "}
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.optedForHBValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Tax OH</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentRateRevisionData?.taxOH}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("taxOH", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "taxOHValid",
                                "Tax OH should not be empty."
                              );
                            } else {
                              onValidationChange("taxOHValid", " ");
                            }
                          }}
                          className="mt-1"
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.taxOHValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Health benefits cost</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentRateRevisionData?.healthB}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("healthB", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "healthBValid",
                                "Health benefits cost should not be empty."
                              );
                            } else {
                              onValidationChange("healthBValid", " ");
                            }
                          }}
                          className="mt-1"
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.healthBValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Net purchase</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentRateRevisionData?.netPurchase}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("netPurchase", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "netPurchaseValid",
                                "Net purchase should not be empty."
                              );
                            } else {
                              onValidationChange("netPurchaseValid", " ");
                            }
                          }}
                          className="mt-1"
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.netPurchaseValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Margin</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentRateRevisionData?.margin}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("margin", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "marginValid",
                                "Margin should not be empty."
                              );
                            } else {
                              onValidationChange("marginValid", " ");
                            }
                          }}
                          className="mt-1"
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.marginValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Rate revision reason</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          // className="rate-revision-textarea"
                          value={currentRateRevisionData?.rateRevisionReason}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "rateRevisionReason",
                              event?.target?.value
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "rateRevisionReasonValid",
                                "Rate revision reason should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "rateRevisionReasonValid",
                                " "
                              );
                            }
                          }}
                          className="mt-1"
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationRateRevisionData?.rateRevisionReasonValid}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <Submit /> */}
              </div>
            </div>
          )}
          {/* <div className="border-solid border-2 p-3"></div> */}
        </AccordionBody>
      </Accordion>
      <Submit />
    </>
  );
};
