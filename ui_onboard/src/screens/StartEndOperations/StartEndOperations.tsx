// chetan patil - [21/07/2023] - Start End Operations Page

import { ChangeEvent, useState } from "react";
import { TextField } from "../../common/TextField/TextField";
import { TextArea } from "../../common/TextArea/TextArea";
import "./StartEndOperations.css";
import { DropDown } from "../../common/DropDown/DropDown";
import {
  EndReasonList,
  ExitClearanceList,
  FFInvoiceStatusList,
  JobLevelList,
  JoiningStatusList,
  JoiningTypeList,
  yesNoList,
} from "../../constants/constants";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "../../common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import {
  setStartEndInputBoxValue,
  setStartEndValidation,
} from "../../actions/startendoperations";
import Select from "react-select";
import { isTextValid } from "../../helpers/validate";
import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

export const StartEndOperations: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentStartEndOperationsData = useAppSelector(
    (state: RootState) => state?.startEndOperations?.startEndOperationsData
  );

  const validationStartEndOperationsData = useAppSelector(
    (state: RootState) => state?.startEndOperations?.startEndValidationData
  );

  console.log(
    "validationStartEndOperationsData: ",
    validationStartEndOperationsData
  );
  const onValueChange = (key: any, value: any) => {
    dispatch(setStartEndInputBoxValue(key, value));
  };

  const onValidationChange = (key: any, value: any) => {
    console.log("key: ", key);
    console.log("value: ", value);
    dispatch(setStartEndValidation(key, value));
  };
  function Icon({ id, open }: any) {
    return <h1></h1>;
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
            Start End Operations Details
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
          <br />
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
                        <span>Recruiter name</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.recruiter}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("recruiter", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "recruiterValid",
                                "Recruiter name should not be empty."
                              );
                            } else {
                              onValidationChange("recruiterValid", " ");
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
                          {validationStartEndOperationsData?.recruiterValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Team lead name</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.teamLead}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("teamLead", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "teamLeadValid",
                                "Team lead name should not be empty."
                              );
                            } else {
                              onValidationChange("teamLeadValid", " ");
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
                          {/* {validationStartEndOperationsData?.teamLeadValid} */}
                          {validationStartEndOperationsData?.teamLeadValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>CRM</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.crm}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("crm", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "crmValid",
                                "CRM should not be empty."
                              );
                            } else {
                              onValidationChange("crmValid", " ");
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
                          {validationStartEndOperationsData?.crmValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Team manager</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.teamManager}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("teamManager", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "teamManagerValid",
                                "Team manager should not be empty."
                              );
                            } else {
                              onValidationChange("teamManagerValid", " ");
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
                          {validationStartEndOperationsData?.teamManagerValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Senior manager</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.seniorManager}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "seniorManager",
                              event?.target?.value
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "seniorManagerValid",
                                "Senior manager should not be empty."
                              );
                            } else {
                              onValidationChange("seniorManagerValid", " ");
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
                          {validationStartEndOperationsData?.seniorManagerValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Associate director</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.assoDirector}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("assoDirector", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "assoDirectorValid",
                                "Associate director should not be empty."
                              );
                            } else {
                              onValidationChange("assoDirectorValid", " ");
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
                          {validationStartEndOperationsData?.assoDirectorValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Center head</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.centerHead}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("centerHead", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "centerHeadValid",
                                "Center head should not be empty."
                              );
                            } else {
                              onValidationChange("centerHeadValid", " ");
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
                          {validationStartEndOperationsData?.centerHeadValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Onsite account director</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={
                            currentStartEndOperationsData.onsiteAccDirector
                          }
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "onsiteAccDirector",
                              event?.target?.value
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "onsiteAccDirectorValid",
                                "Onsite account director should not be empty."
                              );
                            } else {
                              onValidationChange("onsiteAccDirectorValid", " ");
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
                          {
                            validationStartEndOperationsData?.onsiteAccDirectorValid
                          }
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Onboarding coordinator</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.onboCoordinator}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "onboCoordinator",
                              event?.target?.value
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "onboCoordinatorValid",
                                "Onboarding coordinator should not be empty."
                              );
                            } else {
                              onValidationChange("onboCoordinatorValid", " ");
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
                          {
                            validationStartEndOperationsData?.onboCoordinatorValid
                          }
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>End date</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.endDate}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("endDate", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "endDateValid",
                                "End date should not be empty."
                              );
                            } else {
                              onValidationChange("endDateValid", " ");
                            }
                          }}
                          className="mt-1"
                          type="date"
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
                          {validationStartEndOperationsData?.endDateValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Gross BR</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.grossBr}
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
                          {validationStartEndOperationsData?.grossBrValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>MSP fee in percentage</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.mspFeePercentage}
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
                          {
                            validationStartEndOperationsData?.mspFeePercentageValid
                          }
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>MSP fee</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.mspFee}
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
                          {validationStartEndOperationsData?.mspFeeValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Pay rate</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.payRate}
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
                          {validationStartEndOperationsData?.payRateValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Referral fee</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.refFee}
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
                          {validationStartEndOperationsData?.refFeeValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Tax OH percentage</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.taxOHPercentage}
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
                          {
                            validationStartEndOperationsData?.taxOHPercentageValid
                          }
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
                  <tbody className="">
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Tax OH</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.taxOH}
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
                          {validationStartEndOperationsData?.taxOHValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Opted for health benefits</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={yesNoList}
                          value={currentStartEndOperationsData.hBenefitesOpted}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("hBenefitesOpted", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "hBenefitesOptedValid",
                                "Opted for health benefits should not be empty."
                              );
                            } else {
                              onValidationChange("hBenefitesOptedValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {
                            validationStartEndOperationsData?.hBenefitesOptedValid
                          }
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Health benefits cost</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.hBenefitesCost}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "hBenefitesCost",
                              event?.target?.value
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "hBenefitesCostValid",
                                "Health benefits cost should not be empty."
                              );
                            } else {
                              onValidationChange("hBenefitesCostValid", " ");
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
                          {
                            validationStartEndOperationsData?.hBenefitesCostValid
                          }
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Net bill rate</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.netBillRate}
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
                          {validationStartEndOperationsData?.netBillRateValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Net purchase</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.netPurchase}
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
                          {validationStartEndOperationsData?.netPurchaseValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Margin</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentStartEndOperationsData.margin}
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
                          {validationStartEndOperationsData?.marginValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Full time salary offered</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={
                            currentStartEndOperationsData.fullTimeSalaryOffered
                          }
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "fullTimeSalaryOffered",
                              event?.target?.value
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "fullTimeSalaryOfferedValid",
                                "Full time salary offered should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "fullTimeSalaryOfferedValid",
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
                          {
                            validationStartEndOperationsData?.fullTimeSalaryOfferedValid
                          }
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Joining status</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={JoiningStatusList}
                          value={currentStartEndOperationsData.joiningStatus}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("joiningStatus", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "joiningStatusValid",
                                "Joining status should not be empty."
                              );
                            } else {
                              onValidationChange("joiningStatusValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationStartEndOperationsData?.joiningStatusValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Joining type</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={JoiningTypeList}
                          value={currentStartEndOperationsData.joiningType}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("joiningType", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "joiningTypeValid",
                                "Joining type should not be empty."
                              );
                            } else {
                              onValidationChange("joiningTypeValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationStartEndOperationsData?.joiningTypeValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Exit clearance type</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={ExitClearanceList}
                          value={currentStartEndOperationsData.exitClearance}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("exitClearance", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "exitClearanceValid",
                                "Exit clearance type should not be empty."
                              );
                            } else {
                              onValidationChange("exitClearanceValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationStartEndOperationsData?.exitClearanceValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>End reason type</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={EndReasonList}
                          value={currentStartEndOperationsData.endReason}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("endReason", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "endReasonValid",
                                "End reason type should not be empty."
                              );
                            } else {
                              onValidationChange("endReasonValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationStartEndOperationsData?.endReasonValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Job level</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={JobLevelList}
                          value={currentStartEndOperationsData.jobLevel}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("jobLevel", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "jobLevelValid",
                                "Job levelshould not be empty."
                              );
                            } else {
                              onValidationChange("jobLevelValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationStartEndOperationsData?.jobLevelValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Select FF invoice status</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={FFInvoiceStatusList}
                          value={currentStartEndOperationsData.ffInvoiceStatus}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("ffInvoiceStatus", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "ffInvoiceStatusValid",
                                "Select FF invoice status should not be empty."
                              );
                            } else {
                              onValidationChange("ffInvoiceStatusValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {
                            validationStartEndOperationsData?.ffInvoiceStatusValid
                          }
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Joining status remarks</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          // className="start-end-textarea"
                          // label="Joining Status Remarks"
                          value={
                            currentStartEndOperationsData.joiningStatusRemark
                          }
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "joiningStatusRemark",
                              event?.target?.value
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "joiningStatusRemarkValid",
                                "Joining status remarks should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "joiningStatusRemarkValid",
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
                          {
                            validationStartEndOperationsData?.joiningStatusRemarkValid
                          }
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>End remarks</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          // className="start-end-textarea"
                          // label="End Remarks"
                          value={currentStartEndOperationsData.endRemarks}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("endRemarks", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "endRemarksValid",
                                "End remarks should not be empty."
                              );
                            } else {
                              onValidationChange("endRemarksValid", " ");
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
                          {validationStartEndOperationsData?.endRemarksValid}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </AccordionBody>
      </Accordion>
    </>
  );
};
