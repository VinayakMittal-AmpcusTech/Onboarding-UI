//Ajay Bagul - [25-07-23] - Created Background check page
import React, { useEffect, useState } from "react";
import { TextField } from "../../common/TextField/TextField";
import "./backgroundCheck.css";
import { Button } from "../../common/Button/Button";
import { TextArea } from "../../common/TextArea/TextArea";
import {
  BGCAdjuStatusOptions,
  BGCAffidavitOptions,
  BGCInvoiceMonthOptions,
  BGCPackageOptions,
  BGCReportStatusOptions,
  BGCStatusOptions,
  PrimBGCInitiatedThruOptions,
  finalBGCReportOptions,
} from "../../constants/backgroundconstants";
import {
  setBackgroundCheckInputBoxValue,
  setBgValidation,
  setSecondaryButton,
  setTertiaryButton,
} from "../../actions/backgroundCheck";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import Select from "react-select";
import { isTextValid } from "../../helpers/validate";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

export default function BackgroundCheck() {
  const dispatch = useAppDispatch();
  const currentBGCData = useAppSelector(
    (state: RootState) => state?.backgroundCheck?.backgroundCheckData
  );
  console.log("currentBGCData: ", currentBGCData);

  const validationBgData = useAppSelector(
    (state: RootState) => state.backgroundCheck.bgValidationData
  );
  console.log("validationBgData: ", validationBgData);

  const [showSecondary, setShowSecondary] = useState<boolean>(false);
  const showSecondaryRedux = useAppSelector(
    (state: RootState) => state?.backgroundCheck?.secondaryButton
  );
  const [showTertiary, setShowTertiary] = useState<boolean>(false);
  const showTertiaryRedux = useAppSelector(
    (state: RootState) => state?.backgroundCheck?.tertiaryButton
  );

  const onValueChange = (key: any, value: any) => {
    dispatch(setBackgroundCheckInputBoxValue(key, value));
  };

  const onValidationChange = (key: any, value: any) => {
    dispatch(setBgValidation(key, value));
  };

  useEffect(() => {
    setShowSecondary(showSecondaryRedux.secondaryButtonFlag);
    onValueChange("secondary", showSecondary);
    setShowTertiary(showTertiaryRedux.tertiaryButtonFlag);
    onValueChange("tertiary", showTertiary);
  }, [showSecondary, showTertiary]);

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
            Background Check Details
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
            <div className="" style={{ margin: "auto", width: "100%" }}>
              <div
                className="flex gap-5 "
                style={{ margin: "auto", width: "100%" }}
              >
                <div className="relative w-[100%]  ">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          <span>initial details</span>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>case ID-1</span>
                        </td>
                        <td className="px-6 py-0">
                          <TextField
                            // label="adju supporting document"
                            value={currentBGCData?.caseID1}
                            placeholder={""}
                            handleChange={(e: any) => {
                              onValueChange("caseID1", e.target.value);
                              if (!isTextValid(e?.target?.value)) {
                                onValidationChange(
                                  "caseID1Valid",
                                  "Case id 1 should not be empty."
                                );
                              } else {
                                onValidationChange("caseID1Valid", " ");
                              }
                            }}
                            className="mt-2"
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
                            {validationBgData?.caseID1Valid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>BGC initiated On</span>
                        </td>
                        <td className="px-6 py-0">
                          <TextField
                            // label="BGC Initiated On"
                            value={currentBGCData?.BGCInitiatedOn}
                            type="date"
                            // placeholder={""}
                            handleChange={(e) => {
                              onValueChange("BGCInitiatedOn", e.target.value);
                              if (!isTextValid(e?.target?.value)) {
                                onValidationChange(
                                  "BGCInitiatedOnValid",
                                  "BGC initiated on should not be empty."
                                );
                              } else {
                                onValidationChange("BGCInitiatedOnValid", " ");
                              }
                            }}
                            className="mt-2"
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
                            {validationBgData?.BGCInitiatedOnValid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>Primary BGC initiated thru</span>
                        </td>
                        <td className="px-6 py-0">
                          <Select
                            className="text-[13px] text-left mt-2"
                            options={PrimBGCInitiatedThruOptions}
                            value={currentBGCData?.primaryBGCInitiatedThru}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onChange={(e: any) => {
                              onValueChange("primaryBGCInitiatedThru", e);
                              if (!isTextValid(e?.value)) {
                                onValidationChange(
                                  "primaryBGCInitiatedThruValid",
                                  "Primary BGC initiated through should not be empty."
                                );
                              } else {
                                onValidationChange(
                                  "primaryBGCInitiatedThruValid",
                                  " "
                                );
                              }
                            }}
                            isSearchable={true}
                          />
                          <p
                            className=""
                            style={{ fontSize: "12px", color: "red" }}
                          >
                            {validationBgData?.primaryBGCInitiatedThruValid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>BGC package 1</span>
                        </td>
                        <td className="px-6 py-0">
                          <Select
                            className="text-[13px] text-left mt-2"
                            options={BGCPackageOptions}
                            value={currentBGCData?.BGCPackage1}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onChange={(e: any) => {
                              onValueChange("BGCPackage1", e);
                              if (!isTextValid(e?.value)) {
                                onValidationChange(
                                  "BGCPackage1Valid",
                                  "BGC package 1 should not be empty."
                                );
                              } else {
                                onValidationChange("BGCPackage1Valid", " ");
                              }
                            }}
                            isSearchable={true}
                          />
                          <p
                            className=""
                            style={{ fontSize: "12px", color: "red" }}
                          >
                            {validationBgData?.BGCPackage1Valid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>BGC package 2</span>
                        </td>
                        <td className="px-6 py-0">
                          <Select
                            className="text-[13px] text-left mt-2"
                            options={BGCPackageOptions}
                            value={currentBGCData?.BGCPackage2}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onChange={(e: any) => {
                              onValueChange("BGCPackage2", e);
                              if (!isTextValid(e?.value)) {
                                onValidationChange(
                                  "BGCPackage2Valid",
                                  "BGC package 2 should not be empty."
                                );
                              } else {
                                onValidationChange("BGCPackage2Valid", " ");
                              }
                            }}
                            isSearchable={true}
                          />
                          <p
                            className=""
                            style={{ fontSize: "12px", color: "red" }}
                          >
                            {validationBgData?.BGCPackage2Valid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>BGC invoice month</span>
                        </td>
                        <td className="px-6 py-0">
                          <Select
                            className="text-[13px] text-left mt-2"
                            options={BGCInvoiceMonthOptions}
                            value={currentBGCData?.BGCInvoiceMonth}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onChange={(e: any) => {
                              onValueChange("BGCInvoiceMonth", e);
                              if (!isTextValid(e?.value)) {
                                onValidationChange(
                                  "BGCInvoiceMonthValid",
                                  "BGC invoice month should not be empty."
                                );
                              } else {
                                onValidationChange("BGCInvoiceMonthValid", " ");
                              }
                            }}
                            isSearchable={true}
                          />
                          <p
                            className=""
                            style={{ fontSize: "12px", color: "red" }}
                          >
                            {validationBgData?.BGCInvoiceMonthValid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>BGC charges primary</span>
                        </td>
                        <td className="px-6 py-0">
                          <TextField
                            // label={"BGC charges primary"}
                            value={currentBGCData?.BGCChargesPrimary}
                            handleChange={(e: any) => {
                              onValueChange(
                                "BGCChargesPrimary",
                                e.target.value
                              );
                              if (!isTextValid(e.target.value)) {
                                onValidationChange(
                                  "BGCChargesPrimaryValid",
                                  "BGC charges primary should not be empty."
                                );
                              } else {
                                onValidationChange(
                                  "BGCChargesPrimaryValid",
                                  " "
                                );
                              }
                            }}
                            className="mt-2"
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
                            {validationBgData?.BGCChargesPrimaryValid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>BGC Status Options</span>
                        </td>
                        <td className="px-6 py-0">
                          <Select
                            className="text-[13px] text-left mt-2"
                            options={BGCStatusOptions}
                            value={currentBGCData?.BGCStatus}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onChange={(e: any) => {
                              onValueChange("BGCStatus", e);
                              if (!isTextValid(e?.value)) {
                                onValidationChange(
                                  "BGCStatusValid",
                                  "BGC status should not be empty."
                                );
                              } else {
                                onValidationChange("BGCStatusValid", " ");
                              }
                            }}
                            isSearchable={true}
                          />
                          <p
                            className=""
                            style={{ fontSize: "12px", color: "red" }}
                          >
                            {validationBgData?.BGCStatusValid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>BGC completed on</span>
                        </td>
                        <td className="px-6 py-0">
                          <TextField
                            value={currentBGCData?.BGCCompletedOn}
                            type="date"
                            handleChange={(e) => {
                              onValueChange("BGCCompletedOn", e.target.value);
                              if (!isTextValid(e.target.value)) {
                                onValidationChange(
                                  "BGCCompletedOnValid",
                                  "BGC completed on should not be empty."
                                );
                              } else {
                                onValidationChange("BGCCompletedOnValid", " ");
                              }
                            }}
                            className="mt-2"
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
                            {validationBgData?.BGCCompletedOnValid}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                    {!showSecondary ? (
                      <div className="border border-solid mt-5 w-[20%] h-[10px] ml-[190%] ">
                        <Button
                          className="text-white"
                          styles={{ width: "70px", height: "30px" }}
                          value="+"
                          handleClick={() => {
                            dispatch(setSecondaryButton(true));
                            setShowSecondary(true);
                          }}
                        />
                      </div>
                    ) : null}
                  </table>
                </div>
                {/* // dispatch(setBgValidation("caseID2Valid", "Case id 2 should not be empty."))
              // dispatch(setBgValidation("secondaryBGCInitiatedOnValid", "Secondary BGC initiated on should not be empty."))
              // dispatch(setBgValidation("secondaryBGCInitiatedThruValid", "Secondary BGC initiated through should not be empty."))
              // dispatch(setBgValidation("secondaryBGCPackage1Valid", "Secondary BGC package 1 should not be empty."))
              // dispatch(setBgValidation("secondaryBGCPackage2Valid", "Secondary BGC package 2 should not be empty."))
              // dispatch(setBgValidation("secondaryBGCInvoiceMonthValid", "Secondary BGC invoice month should not be empty."))
              // dispatch(setBgValidation("secondaryBGCChargesValid", "Secondary BGC charges primary should not be empty.")) */}

                <div className="relative w-[100%]  ">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          <span>other details</span>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <tr className='bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700'>
                  <td className='px-6 py-4 font-semibold'>
                    <span>BGC completed on</span>
                  </td>
                  <td className='px-6 py-0'>
                    <TextField
                      value={currentBGCData?.BGCCompletedOn}
                      handleChange={(e) =>
                        onValueChange("BGCCompletedOn", e.target.value)
                      }
                      styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                    />
                  </td>
                </tr> */}
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>BGC affidavit status</span>
                        </td>
                        <td className="px-6 py-0">
                          <Select
                            className="text-[13px] text-left mt-2"
                            options={BGCAffidavitOptions}
                            value={currentBGCData?.BGCAffidavitStatus}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onChange={(e: any) => {
                              onValueChange("BGCAffidavitStatus", e);
                              if (!isTextValid(e.value)) {
                                onValidationChange(
                                  "BGCAffidavitStatusValid",
                                  "BGC affidavit status should not be empty."
                                );
                              } else {
                                onValidationChange(
                                  "BGCAffidavitStatusValid",
                                  " "
                                );
                              }
                            }}
                            isSearchable={true}
                          />
                          <p
                            className=""
                            style={{ fontSize: "12px", color: "red" }}
                          >
                            {validationBgData?.BGCAffidavitStatusValid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>BGC affidavit on</span>
                        </td>
                        <td className="px-6 py-0">
                          <TextField
                            type="date"
                            value={currentBGCData?.BGCAffidavitOn}
                            handleChange={(e) => {
                              onValueChange("BGCAffidavitOn", e.target.value);
                              if (!isTextValid(e.target.value)) {
                                onValidationChange(
                                  "BGCAffidavitOnValid",
                                  "BGC affidavit on should not be empty."
                                );
                              } else {
                                onValidationChange("BGCAffidavitOnValid", " ");
                              }
                            }}
                            className="mt-2"
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
                            {validationBgData?.BGCAffidavitOnValid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>BGC report status</span>
                        </td>
                        <td className="px-6 py-0">
                          <Select
                            className="text-[13px] text-left  mt-2"
                            options={BGCReportStatusOptions}
                            value={currentBGCData?.BGCReportStatus}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onChange={(e: any) => {
                              onValueChange("BGCReportStatus", e);
                              if (!isTextValid(e.value)) {
                                onValidationChange(
                                  "BGCReportStatusValid",
                                  "BGC report status should not be empty."
                                );
                              } else {
                                onValidationChange("BGCReportStatusValid", " ");
                              }
                            }}
                            isSearchable={true}
                          />
                          <p
                            className=""
                            style={{ fontSize: "12px", color: "red" }}
                          >
                            {validationBgData?.BGCReportStatusValid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>BGC adjudication Status</span>
                        </td>
                        <td className="px-6 py-0">
                          <Select
                            className="text-[13px] text-left mt-2"
                            options={BGCAdjuStatusOptions}
                            value={currentBGCData?.BGCAdjuStatus}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onChange={(e: any) => {
                              onValueChange("BGCAdjuStatus", e);
                              if (!isTextValid(e.value)) {
                                onValidationChange(
                                  "BGCAdjuStatusValid",
                                  "BGC adjudication status should not be empty."
                                );
                              } else {
                                onValidationChange("BGCAdjuStatusValid", " ");
                              }
                            }}
                            isSearchable={true}
                          />
                          <p
                            className=""
                            style={{ fontSize: "12px", color: "red" }}
                          >
                            {validationBgData?.BGCAdjuStatusValid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>Adjudication supporting document</span>
                        </td>
                        <td className="px-6 py-0">
                          <TextField
                            value={currentBGCData?.adjuSupportingDocs}
                            handleChange={(e) => {
                              onValueChange(
                                "adjuSupportingDocs",
                                e.target.value
                              );
                              if (!isTextValid(e.target.value)) {
                                onValidationChange(
                                  "adjuSupportingDocsValid",
                                  "Adj supporting docs should not be empty."
                                );
                              } else {
                                onValidationChange(
                                  "adjuSupportingDocsValid",
                                  " "
                                );
                              }
                            }}
                            className="mt-2"
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
                            {validationBgData?.adjuSupportingDocsValid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>Date of adjudication</span>
                        </td>
                        <td className="px-6 py-0">
                          <TextField
                            value={currentBGCData?.dateOfAdjudication}
                            type="date"
                            handleChange={(e) => {
                              onValueChange(
                                "dateOfAdjudication",
                                e.target.value
                              );
                              if (!isTextValid(e.target.value)) {
                                onValidationChange(
                                  "dateOfAdjudicationValid",
                                  "Date of adjudication should not be empty."
                                );
                              } else {
                                onValidationChange(
                                  "dateOfAdjudicationValid",
                                  " "
                                );
                              }
                            }}
                            className="mt-2"
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
                            {validationBgData?.dateOfAdjudicationValid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>Final BGC report status</span>
                        </td>
                        <td className="px-6 py-0">
                          <Select
                            className="text-[13px] text-left mt-2"
                            options={finalBGCReportOptions}
                            value={currentBGCData?.finalBGCReport}
                            getOptionLabel={(option) => option.label}
                            getOptionValue={(option) => option.value}
                            onChange={(e: any) => {
                              onValueChange("finalBGCReport", e);
                              if (!isTextValid(e.value)) {
                                onValidationChange(
                                  "finalBGCReportValid",
                                  "Final BGC report should not be empty."
                                );
                              } else {
                                onValidationChange("finalBGCReportValid", " ");
                              }
                            }}
                            isSearchable={true}
                          />
                          <p
                            className=""
                            style={{ fontSize: "12px", color: "red" }}
                          >
                            {validationBgData?.finalBGCReportValid}
                          </p>
                        </td>
                      </tr>
                      <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-semibold">
                          <span>BGC remark</span>
                        </td>
                        <td className="px-6 py-0">
                          <TextArea
                            value={currentBGCData?.BGCRemark}
                            placeholder={""}
                            handleChange={(e) => {
                              onValueChange("BGCRemark", e.target.value);
                              if (!isTextValid(e.target.value)) {
                                onValidationChange(
                                  "BGCRemarkValid",
                                  "BGC remark should not be empty."
                                );
                              } else {
                                onValidationChange("BGCRemarkValid", " ");
                              }
                            }}
                            className="mt-2"
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
                            {validationBgData?.BGCRemarkValid}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                    {/* {!showSecondary ? (
                <div className="add-cancel-1">
                  <Button
                    className="btn-size"
                    value="+"
                    handleClick={() => {
                      dispatch(setSecondaryButton(true));
                      setShowSecondary(true)
                    }}
                  />
                </div>
              ) : null} */}
                  </table>
                </div>
              </div>
              {showSecondary ? (
                <div
                  className="flex gap-5 mt-20"
                  style={{ margin: "auto", width: "100%" }}
                >
                  <div className="relative w-[100%] mt-4">
                    {" "}
                    <h1 className="text-left  p-3 mb-2  w-[30%] bg-gray-200">
                      Case ID-2
                    </h1>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            <span>iniatial details</span>
                          </th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>case ID-2</span>
                          </td>
                          <td className="px-6 py-0">
                            <TextField
                              // label="case ID-2"
                              value={currentBGCData?.caseID2}
                              placeholder={""}
                              handleChange={(e) => {
                                onValueChange("caseID2", e.target.value);
                                if (!isTextValid(e?.target?.value)) {
                                  onValidationChange(
                                    "caseID2Valid",
                                    "Case id 2 should not be empty."
                                  );
                                } else {
                                  onValidationChange("caseID2Valid", " ");
                                }
                              }}
                              className="mt-2"
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
                              {validationBgData?.caseID2Valid}
                            </p>
                          </td>
                        </tr>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>Secondary BGC initiated on</span>
                          </td>
                          <td className="px-6 py-0">
                            <TextField
                              // label="Secondary BGC Initiated On"
                              value={currentBGCData?.secondaryBGCInitiatedOn}
                              type="date"
                              placeholder={""}
                              handleChange={(e) => {
                                onValueChange(
                                  "secondaryBGCInitiatedOn",
                                  e.target.value
                                );
                                if (!isTextValid(e?.target?.value)) {
                                  onValidationChange(
                                    "secondaryBGCInitiatedOnValid",
                                    "Secondary BGC initiated on should not be empty."
                                  );
                                } else {
                                  onValidationChange(
                                    "secondaryBGCInitiatedOnValid",
                                    " "
                                  );
                                }
                              }}
                              className="mt-2"
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
                              {validationBgData?.secondaryBGCInitiatedOnValid}
                            </p>
                          </td>
                        </tr>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>Secondary BGC initiated thru</span>
                          </td>
                          <td className="px-6 py-0">
                            <Select
                              className="text-[13px] text-left mt-2"
                              options={PrimBGCInitiatedThruOptions}
                              value={currentBGCData?.secondaryBGCInitiatedThru}
                              getOptionLabel={(option) => option.label}
                              getOptionValue={(option) => option.value}
                              onChange={(e: any) => {
                                onValueChange("secondaryBGCInitiatedThru", e);
                                if (!isTextValid(e?.value)) {
                                  onValidationChange(
                                    "secondaryBGCInitiatedThruValid",
                                    "Secondary BGC initiated through should not be empty."
                                  );
                                } else {
                                  onValidationChange(
                                    "secondaryBGCInitiatedThruValid",
                                    " "
                                  );
                                }
                              }}
                              isSearchable={true}
                            />
                            <p
                              className=""
                              style={{ fontSize: "12px", color: "red" }}
                            >
                              {validationBgData?.secondaryBGCInitiatedThruValid}
                            </p>
                          </td>
                        </tr>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>Secondary BGC check-1</span>
                          </td>
                          <td className="px-6 py-0">
                            <Select
                              className="text-[13px] text-left mt-2"
                              options={BGCPackageOptions}
                              value={currentBGCData?.secondaryBGCPackage1}
                              getOptionLabel={(option) => option.label}
                              getOptionValue={(option) => option.value}
                              onChange={(e: any) => {
                                onValueChange("secondaryBGCPackage1", e);
                                if (!isTextValid(e?.value)) {
                                  onValidationChange(
                                    "secondaryBGCPackage1Valid",
                                    "Secondary BGC package 1 should not be empty."
                                  );
                                } else {
                                  onValidationChange(
                                    "secondaryBGCPackage1Valid",
                                    " "
                                  );
                                }
                              }}
                              isSearchable={true}
                            />
                            <p
                              className=""
                              style={{ fontSize: "12px", color: "red" }}
                            >
                              {validationBgData?.secondaryBGCPackage1Valid}
                            </p>
                          </td>
                        </tr>
                      </tbody>

                      {showSecondary && !showTertiary ? (
                        <div className="mt-5 w-[15%] h-[20px] ml-[190%]">
                          <Button
                            className="text-white"
                            styles={{ width: "70px", height: "30px" }}
                            value="-"
                            handleClick={() => {
                              dispatch(setSecondaryButton(false));
                              setShowSecondary(false);
                              dispatch(setBgValidation("caseID2Valid", ""));
                              dispatch(
                                setBgValidation(
                                  "secondaryBGCInitiatedOnValid",
                                  ""
                                )
                              );
                              dispatch(
                                setBgValidation(
                                  "secondaryBGCInitiatedThruValid",
                                  ""
                                )
                              );
                              dispatch(
                                setBgValidation("secondaryBGCPackage1Valid", "")
                              );
                              dispatch(
                                setBgValidation("secondaryBGCPackage2Valid", "")
                              );
                              dispatch(
                                setBgValidation(
                                  "secondaryBGCInvoiceMonthValid",
                                  ""
                                )
                              );
                              dispatch(
                                setBgValidation("secondaryBGCChargesValid", "")
                              );
                            }}
                          />
                          <Button
                            className="text-white ml-[0%] "
                            styles={{ width: "70px", height: "30px" }}
                            value="+"
                            handleClick={() => {
                              console.log("showTertiary: ", showTertiary);
                              dispatch(setTertiaryButton(true));
                              setShowTertiary(true);
                            }}
                          />
                        </div>
                      ) : null}
                    </table>
                  </div>
                  {/* // dispatch(setBgValidation("caseID3Valid", "Case id 3 should not be empty."))
                // dispatch(setBgValidation("tertiaryBGCInitiatedOnValid", "Tertiary BGC initiated on should not be empty."))
                // dispatch(setBgValidation("tertiaryBGCInitiatedThruValid", "Tertiary BGC initiated through should not be empty."))
                // dispatch(setBgValidation("tertiaryBGCPackage1Valid", "Tertiary BGC package 1 should not be empty."))
                // dispatch(setBgValidation("tertiaryBGCPackage2Valid", "Tertiary BGC package 2 should not be empty."))
                // dispatch(setBgValidation("tertiaryBGCInvoiceMonthValid", "Tertiary BGC invoice month should not be empty."))
                // dispatch(setBgValidation("tertiaryBGCChargesValid", "Tertiary BGC charges primary should not be empty.")) */}
                  <div className="relative w-[100%] mt-[72px] ">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            <span>other details</span>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>Secondary BGC check-2</span>
                          </td>
                          <td className="px-6 py-0">
                            <Select
                              className="text-[13px] text-left mt-2"
                              options={BGCPackageOptions}
                              value={currentBGCData?.secondaryBGCPackage2}
                              getOptionLabel={(option) => option.label}
                              getOptionValue={(option) => option.value}
                              onChange={(e: any) => {
                                onValueChange("secondaryBGCPackage2", e);
                                if (!isTextValid(e?.value)) {
                                  onValidationChange(
                                    "secondaryBGCPackage2Valid",
                                    "Secondary BGC package 2 should not be empty."
                                  );
                                } else {
                                  onValidationChange(
                                    "secondaryBGCPackage2Valid",
                                    " "
                                  );
                                }
                              }}
                              isSearchable={true}
                            />
                            <p
                              className=""
                              style={{ fontSize: "12px", color: "red" }}
                            >
                              {validationBgData?.secondaryBGCPackage2Valid}
                            </p>
                          </td>
                        </tr>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>Secondary BGC invoice month</span>
                          </td>
                          <td className="px-6 py-0">
                            <Select
                              className="text-[13px] text-left mt-2"
                              options={BGCInvoiceMonthOptions}
                              value={currentBGCData?.secondaryBGCInvoiceMonth}
                              getOptionLabel={(option) => option.label}
                              getOptionValue={(option) => option.value}
                              onChange={(e: any) => {
                                onValueChange("secondaryBGCInvoiceMonth", e);
                                if (!isTextValid(e?.value)) {
                                  onValidationChange(
                                    "secondaryBGCInvoiceMonthValid",
                                    "Secondary BGC invoice month should not be empty."
                                  );
                                } else {
                                  onValidationChange(
                                    "secondaryBGCInvoiceMonthValid",
                                    " "
                                  );
                                }
                              }}
                              isSearchable={true}
                            />
                            <p
                              className=""
                              style={{ fontSize: "12px", color: "red" }}
                            >
                              {validationBgData?.secondaryBGCInvoiceMonthValid}
                            </p>
                          </td>
                        </tr>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>BGC charges secondary</span>
                          </td>
                          <td className="px-6 py-0">
                            <TextField
                              // label={"BGC charges Secondary"}
                              value={currentBGCData?.secondaryBGCCharges}
                              handleChange={(e) => {
                                onValueChange(
                                  "secondaryBGCCharges",
                                  e.target.value
                                );
                                if (!isTextValid(e.target.value)) {
                                  onValidationChange(
                                    "secondaryBGCChargesValid",
                                    "Secondary BGC charges should not be empty."
                                  );
                                } else {
                                  onValidationChange(
                                    "secondaryBGCChargesValid",
                                    " "
                                  );
                                }
                              }}
                              className="mt-2"
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
                              {validationBgData?.secondaryBGCChargesValid}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                      {/* {showSecondary && !showTertiary ? (
                  <div className="add-cancel-2">
                    <Button
                      className="btn-size"
                      value="-"
                      handleClick={() => {
                        dispatch(setSecondaryButton(false));
                        setShowSecondary(false)
                      }}
                    />
                    <Button
                      className="btn-size"
                      value="+"
                      handleClick={() => {
                        dispatch(setTertiaryButton(true));
                        setShowTertiary(true)
                      }}
                    />
                  </div>
                ) : null} */}
                    </table>
                  </div>
                </div>
              ) : null}
              {showTertiary ? (
                <div
                  className="flex gap-5 mt-20"
                  style={{ margin: "auto", width: "100%" }}
                >
                  <div className="relative w-[100%] mt-10 ">
                    <h1 className="text-left  p-3 mb-2  w-[30%] bg-gray-200">
                      Case ID-3
                    </h1>

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            <span>iniatial details</span>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>case ID-3</span>
                          </td>
                          <td className="px-6 py-0">
                            <TextField
                              // label="case ID-2"
                              value={currentBGCData?.caseID3}
                              placeholder={""}
                              handleChange={(e) => {
                                onValueChange("caseID3", e.target.value);
                                if (!isTextValid(e?.target?.value)) {
                                  onValidationChange(
                                    "caseID3Valid",
                                    "Case id 3 should not be empty."
                                  );
                                } else {
                                  onValidationChange("caseID3Valid", " ");
                                }
                              }}
                              className="mt-2"
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
                              {validationBgData?.caseID3Valid}
                            </p>
                          </td>
                        </tr>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>Tertiary BGC initiated on</span>
                          </td>
                          <td className="px-6 py-0">
                            <TextField
                              value={currentBGCData?.tertiaryBGCInitiatedOn}
                              type="date"
                              placeholder={""}
                              handleChange={(e) => {
                                onValueChange(
                                  "tertiaryBGCInitiatedOn",
                                  e.target.value
                                );
                                if (!isTextValid(e?.target?.value)) {
                                  onValidationChange(
                                    "tertiaryBGCInitiatedOnValid",
                                    "Tertiary BGC initiated on should not be empty."
                                  );
                                } else {
                                  onValidationChange(
                                    "tertiaryBGCInitiatedOnValid",
                                    " "
                                  );
                                }
                              }}
                              className="mt-2"
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
                              {validationBgData?.tertiaryBGCInitiatedOnValid}
                            </p>
                          </td>
                        </tr>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>Tertiary BGC initiated thru</span>
                          </td>
                          <td className="px-6 py-0">
                            <Select
                              className="text-[13px] text-left mt-2"
                              options={PrimBGCInitiatedThruOptions}
                              value={currentBGCData?.tertiaryBGCInitiatedThru}
                              getOptionLabel={(option) => option.label}
                              getOptionValue={(option) => option.value}
                              onChange={(e: any) => {
                                onValueChange("tertiaryBGCInitiatedThru", e);
                                if (!isTextValid(e?.value)) {
                                  onValidationChange(
                                    "tertiaryBGCInitiatedThruValid",
                                    "Tertiary BGC initiated through should not be empty."
                                  );
                                } else {
                                  onValidationChange(
                                    "tertiaryBGCInitiatedThruValid",
                                    " "
                                  );
                                }
                              }}
                              isSearchable={true}
                            />
                            <p
                              className=""
                              style={{ fontSize: "12px", color: "red" }}
                            >
                              {validationBgData?.tertiaryBGCInitiatedThruValid}
                            </p>
                          </td>
                        </tr>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>Tertiary BGC check-1</span>
                          </td>
                          <td className="px-6 py-0">
                            <Select
                              className="text-[13px] text-left mt-2"
                              options={BGCPackageOptions}
                              value={currentBGCData?.tertiaryBGCPackage1}
                              getOptionLabel={(option) => option.label}
                              getOptionValue={(option) => option.value}
                              onChange={(e: any) => {
                                onValueChange("tertiaryBGCPackage1", e);
                                if (!isTextValid(e?.value)) {
                                  onValidationChange(
                                    "tertiaryBGCPackage1Valid",
                                    "Tertiary BGC package 1 should not be empty."
                                  );
                                } else {
                                  onValidationChange(
                                    "tertiaryBGCPackage1Valid",
                                    " "
                                  );
                                }
                              }}
                              isSearchable={true}
                            />
                            <p
                              className=""
                              style={{ fontSize: "12px", color: "red" }}
                            >
                              {validationBgData?.tertiaryBGCPackage1Valid}
                            </p>
                          </td>
                        </tr>
                      </tbody>

                      {showTertiary ? (
                        <div className="mt-5 w-[15%] h-[20px] ml-[190%]">
                          <Button
                            className="text-white"
                            styles={{ width: "70px", height: "30px" }}
                            value="-"
                            handleClick={() => {
                              dispatch(setTertiaryButton(false));
                              setShowTertiary(false);
                              dispatch(setBgValidation("caseID3Valid", ""));
                              dispatch(
                                setBgValidation(
                                  "tertiaryBGCInitiatedOnValid",
                                  ""
                                )
                              );
                              dispatch(
                                setBgValidation(
                                  "tertiaryBGCInitiatedThruValid",
                                  ""
                                )
                              );
                              dispatch(
                                setBgValidation("tertiaryBGCPackage1Valid", "")
                              );
                              dispatch(
                                setBgValidation("tertiaryBGCPackage2Valid", "")
                              );
                              dispatch(
                                setBgValidation(
                                  "tertiaryBGCInvoiceMonthValid",
                                  ""
                                )
                              );
                              dispatch(
                                setBgValidation("tertiaryBGCChargesValid", "")
                              );
                            }}
                          />
                        </div>
                      ) : null}
                    </table>
                  </div>
                  <div className="relative w-[100%] mt-24 ">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            <span>other details</span>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>Tertiary BGC check-2</span>
                          </td>
                          <td className="px-6 py-0">
                            <Select
                              className="text-[13px] text-left mt-2"
                              options={BGCPackageOptions}
                              value={currentBGCData?.tertiaryBGCPackage2}
                              getOptionLabel={(option) => option.label}
                              getOptionValue={(option) => option.value}
                              onChange={(e: any) => {
                                onValueChange("tertiaryBGCPackage2", e);
                                if (!isTextValid(e?.value)) {
                                  onValidationChange(
                                    "tertiaryBGCPackage2Valid",
                                    "Tertiary BGC package 2 should not be empty."
                                  );
                                } else {
                                  onValidationChange(
                                    "tertiaryBGCPackage2Valid",
                                    " "
                                  );
                                }
                              }}
                              isSearchable={true}
                            />
                            <p
                              className=""
                              style={{ fontSize: "12px", color: "red" }}
                            >
                              {validationBgData?.tertiaryBGCPackage2Valid}
                            </p>
                          </td>
                        </tr>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>Tertiary BGC invoice month</span>
                          </td>
                          <td className="px-6 py-0">
                            <Select
                              className="text-[13px] text-left mt-2"
                              options={BGCInvoiceMonthOptions}
                              value={currentBGCData?.tertiaryBGCInvoiceMonth}
                              getOptionLabel={(option) => option.label}
                              getOptionValue={(option) => option.value}
                              onChange={(e: any) => {
                                onValueChange("tertiaryBGCInvoiceMonth", e);
                                if (!isTextValid(e?.value)) {
                                  onValidationChange(
                                    "tertiaryBGCInvoiceMonthValid",
                                    "Tertiary BGC invoice month should not be empty."
                                  );
                                } else {
                                  onValidationChange(
                                    "tertiaryBGCInvoiceMonthValid",
                                    " "
                                  );
                                }
                              }}
                              isSearchable={true}
                            />
                            <p
                              className=""
                              style={{ fontSize: "12px", color: "red" }}
                            >
                              {validationBgData?.tertiaryBGCInvoiceMonthValid}
                            </p>
                          </td>
                        </tr>
                        <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-6 py-4 font-semibold">
                            <span>BGC charges Tertiary</span>
                          </td>
                          <td className="px-6 py-0">
                            <TextField
                              // label={"BGC charges Secondary"}
                              value={currentBGCData?.tertiaryBGCCharges}
                              handleChange={(e) => {
                                onValueChange(
                                  "tertiaryBGCCharges",
                                  e.target.value
                                );
                                if (!isTextValid(e.target.value)) {
                                  onValidationChange(
                                    "tertiaryBGCChargesValid",
                                    "Tertiary BGC charges should not be empty."
                                  );
                                } else {
                                  onValidationChange(
                                    "tertiaryBGCChargesValid",
                                    " "
                                  );
                                }
                              }}
                              className="mt-2"
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
                              {validationBgData?.tertiaryBGCChargesValid}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                      {/* {showTertiary ? (
                  <div className="add-cancel-2">
                    <Button
                      className="btn-size"
                      value="-"
                      handleClick={() => {
                        dispatch(setTertiaryButton(false));
                        setShowTertiary(false)
                      }}
                    />
                  </div>
                ) : null} */}
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </AccordionBody>
      </Accordion>
    </>
  );
}
