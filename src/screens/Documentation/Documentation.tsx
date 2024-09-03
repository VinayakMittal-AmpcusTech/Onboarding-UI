// Ajay Bagul - [21/07/2023] - Documentation page

import { ChangeEvent, useState } from "react";
import { TextField } from "../../common/TextField/TextField";
import { TextArea } from "../../common/TextArea/TextArea";
import "./Documentation.css";
import Grid from "@mui/material/Unstable_Grid2";
import { DropDown } from "../../common/DropDown/DropDown";
import {
  ArticlesOfIncorporationList,
  CertificateOfInsuranceList,
  CipcicaCipcicuList,
  ClientTaskOrderOrSOWList,
  ClientTaskOrderOrSOWStepList,
  ClientTaskOrderSigningList,
  DirectDepositeAgreementList,
  DocumentationStatusList,
  EVerifyList,
  EemergencyFormList,
  GoodStandingDocumentationList,
  I9FormList,
  ListADocumentsList,
  ListBDocumentsList,
  ListCDocumentsList,
  MSAList,
  SOWList,
  VaccinationStatusList,
  VoidCheckEmailList,
  W9W4List,
  WorkAuthorizeDocumentationList,
  yesNoList,
} from "../../constants/constants";
import { Button } from "../../common/Button/Button";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import {
  setDocValidation,
  setDocumentationCheckInputBoxValue,
} from "../../actions/documentation";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { isTextValid } from "../../helpers/validate";
import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

export const Documentation: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentDocumentationData = useAppSelector(
    (state: RootState) => state?.documentation?.documentationData
  );
  console.log("currentDocumentationData: ", currentDocumentationData);

  const validationDocData = useAppSelector(
    (state: RootState) => state.documentation.docValidationData
  );
  console.log("validationDocData: ", validationDocData);

  // const [articlesOfIncorporation, setArticlesOfIncorporation] = useState<any>();
  // const [W9W4, setW9W4] = useState<any>();
  // const [directDepositAgreement, setDirectDepositAgreement] = useState<any>();
  // const [voidCheckEmail, setVoidCheckEmail] = useState<any>();
  // const [cipcicaCipcicu, setCipcicaCipcicu] = useState<any>();
  // const [goodStandingDocumentation, setGoodStandingDocumentation] =
  //   useState<any>();
  // const [workAuthorizeDocumentation, setWorkAuthorizeDocumentation] =
  //   useState<any>();
  // const [i9Form, setI9Form] = useState<any>();
  // const [listADocuments, setListADocuments] = useState<any>();
  // const [listBDocuments, setListBDocuments] = useState<any>();
  // const [listCDocuments, setListCDocuments] = useState<any>();
  // const [eVerify, setEVerify] = useState<any>();
  // const [eVerificationDate, setEVerificationDate] = useState<any>();
  // const [emergencyForm, setEmergencyForm] = useState<any>();
  // const [vaccinationStatus, setVaccinationStatus] = useState<any>();
  // const [MSA, setMSA] = useState<any>();
  // const [SOW, setSOW] = useState<any>();
  // const [SOWValidity, setSOWValidity] = useState<any>();
  // const [certificateOfInsurance, setCertificateOfInsurance] = useState<any>();
  // const [certificateOfInsuranceDate, setCertificateOfInsuranceDate] =
  //   useState<any>();
  // const [clientTaskOrderOrSOW, setClientTaskOrderOrSOW] = useState<any>();
  // const [clientTaskOrderOrSOWStep, setClientTaskOrderOrSOWStep] =
  //   useState<any>();
  // const [clientTaskOrderSigning, setClientTaskOrderSigning] = useState<any>();
  // const [taskOrderExpiryDate, setTaskOrderExpiryDate] = useState<any>();
  // const [documentationStatus, setDocumentationStatus] = useState<any>();
  // const [documentationRemark, setDocumentationRemark] = useState<any>();
  // const [docuCompletionDate, setDocuCompletionDate] = useState<any>();

  const onValueChange = (key: any, value: any) => {
    dispatch(setDocumentationCheckInputBoxValue(key, value));
  };

  const onValidationChange = (key: any, value: any) => {
    dispatch(setDocValidation(key, value));
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
            Documentation Details
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
                        Initial Details
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Articles of incorporation</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left  mt-2"
                          options={ArticlesOfIncorporationList}
                          value={
                            currentDocumentationData?.articlesOrCertificateOFIncorporation
                          }
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange(
                              "articlesOrCertificateOFIncorporation",
                              e
                            );
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "articlesOrCertificateOFIncorporationValid",
                                "Articles should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "articlesOrCertificateOFIncorporationValid",
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
                          {
                            validationDocData?.articlesOrCertificateOFIncorporationValid
                          }
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>W9 Or W4</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={W9W4List}
                          value={currentDocumentationData?.w9Orw4}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("w9Orw4", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "w9Orw4Valid",
                                "W9 or W4 should not be empty."
                              );
                            } else {
                              onValidationChange("w9Orw4Valid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationDocData?.w9Orw4Valid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Direct deposit agreement</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={DirectDepositeAgreementList}
                          value={
                            currentDocumentationData?.directDepositAgreement
                          }
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("directDepositAgreement", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "directDepositAgreementValid",
                                "Direct deposit agreement should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "directDepositAgreementValid",
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
                          {validationDocData?.directDepositAgreementValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Void check email</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={VoidCheckEmailList}
                          value={
                            currentDocumentationData?.voidCheckOrEmailContent
                          }
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("voidCheckOrEmailContent", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "voidCheckOrEmailContentValid",
                                "Void check content should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "voidCheckOrEmailContentValid",
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
                          {validationDocData?.voidCheckOrEmailContentValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>CIPCIA Or CIPCICU</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={CipcicaCipcicuList}
                          value={currentDocumentationData?.CIPCICICAOrCIPCICU}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("CIPCICICAOrCIPCICU", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "CIPCICICAOrCIPCICUValid",
                                "CIPCICICA or CIPCICU should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "CIPCICICAOrCIPCICUValid",
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
                          {validationDocData?.CIPCICICAOrCIPCICUValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Good standing documentation</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={GoodStandingDocumentationList}
                          value={currentDocumentationData?.goodStandingDocument}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("goodStandingDocument", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "goodStandingDocumentValid",
                                "Good standing document should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "goodStandingDocumentValid",
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
                          {validationDocData?.goodStandingDocumentValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Work authorization documentation</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={WorkAuthorizeDocumentationList}
                          value={
                            currentDocumentationData?.workAuthorizationDocument
                          }
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("workAuthorizationDocument", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "workAuthorizationDocumentValid",
                                "Work authorization document should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "workAuthorizationDocumentValid",
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
                          {validationDocData?.workAuthorizationDocumentValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>I9 Form</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={I9FormList}
                          value={currentDocumentationData?.I9Form}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("I9Form", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "I9FormValid",
                                "I9 form should not be empty."
                              );
                            } else {
                              onValidationChange("I9FormValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationDocData?.I9FormValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>List A documents</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={ListADocumentsList}
                          value={currentDocumentationData?.listADocument}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("listADocument", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "listADocumentValid",
                                "List A document should not be empty."
                              );
                            } else {
                              onValidationChange("listADocumentValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationDocData?.listADocumentValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>List B documents</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={ListBDocumentsList}
                          value={currentDocumentationData?.listBDocument}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("listBDocument", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "listBDocumentValid",
                                "List B document should not be empty."
                              );
                            } else {
                              onValidationChange("listBDocumentValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationDocData?.listBDocumentValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>List C documents</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={ListCDocumentsList}
                          value={currentDocumentationData?.listCDocument}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("listCDocument", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "listCDocumentValid",
                                "List C document should not be empty."
                              );
                            } else {
                              onValidationChange("listCDocumentValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationDocData?.listCDocumentValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>E-Verify</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={EVerifyList}
                          value={currentDocumentationData?.E_verify}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("E_verify", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "E_verifyValid",
                                "E_verify should not be empty."
                              );
                            } else {
                              onValidationChange("E_verifyValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationDocData?.E_verifyValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>E-Verification date</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentDocumentationData?.E_verificationDate}
                          type="date"
                          handleChange={(e: any) => {
                            onValueChange("E_verificationDate", e.target.value);
                            if (!isTextValid(e?.target?.value)) {
                              onValidationChange(
                                "E_verificationDateValid",
                                "E_verification date should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "E_verificationDateValid",
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
                          {validationDocData?.E_verificationDateValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Emergency form</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={EemergencyFormList}
                          value={currentDocumentationData?.emergencyForm}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("emergencyForm", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "emergencyFormValid",
                                "Emergency form should not be empty."
                              );
                            } else {
                              onValidationChange("emergencyFormValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationDocData?.emergencyFormValid}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="relative w-[100%] ">
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
                        <span>Vaccination status</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={VaccinationStatusList}
                          value={currentDocumentationData?.vaccinationStatus}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("vaccinationStatus", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "vaccinationStatusValid",
                                "Vaccination status should not be empty."
                              );
                            } else {
                              onValidationChange("vaccinationStatusValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationDocData?.vaccinationStatusValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Client task order or SOW step</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={ClientTaskOrderOrSOWStepList}
                          value={
                            currentDocumentationData?.clientTaskOrderOrSOWst
                          }
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("clientTaskOrderOrSOWst", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "clientTaskOrderOrSOWstValid",
                                "Client task order should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "clientTaskOrderOrSOWstValid",
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
                          {validationDocData?.clientTaskOrderOrSOWstValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>MSA</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={MSAList}
                          value={currentDocumentationData?.MSA}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("MSA", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "MSAValid",
                                "MSA should not be empty."
                              );
                            } else {
                              onValidationChange("MSAValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationDocData?.MSAValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>SOW</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={SOWList}
                          value={currentDocumentationData?.SOW}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("SOW", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "SOWValid",
                                "SOW should not be empty."
                              );
                            } else {
                              onValidationChange("SOWValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationDocData?.SOWValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>SOW Validity</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentDocumentationData?.SOWValidity}
                          type="date"
                          handleChange={(e: any) => {
                            onValueChange("SOWValidity", e.target.value);
                            if (!isTextValid(e.target.value)) {
                              onValidationChange(
                                "SOWValidityValid",
                                "SOW validity should not be empty."
                              );
                            } else {
                              onValidationChange("SOWValidityValid", " ");
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
                          {validationDocData?.SOWValidityValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Certificate of insurance</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={CertificateOfInsuranceList}
                          value={
                            currentDocumentationData?.certificateOFInsuranceOrCOI
                          }
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("certificateOFInsuranceOrCOI", e);
                            if (!isTextValid(e.value)) {
                              onValidationChange(
                                "certificateOFInsuranceOrCOIValid",
                                "COI should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "certificateOFInsuranceOrCOIValid",
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
                          {validationDocData?.certificateOFInsuranceOrCOIValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Client task order signing</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={ClientTaskOrderSigningList}
                          value={
                            currentDocumentationData?.clientTaskOrderSigning
                          }
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("clientTaskOrderSigning", e);
                            if (!isTextValid(e.value)) {
                              onValidationChange(
                                "clientTaskOrderSigningValid",
                                "Client task order signing should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "clientTaskOrderSigningValid",
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
                          {validationDocData?.clientTaskOrderSigningValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Task order expiry date</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentDocumentationData?.TaskOrderExpiryDate}
                          type="date"
                          handleChange={(e: any) => {
                            onValueChange(
                              "TaskOrderExpiryDate",
                              e.target.value
                            );
                            if (!isTextValid(e.target.value)) {
                              onValidationChange(
                                "TaskOrderExpiryDateValid",
                                "Task order expiry date should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "TaskOrderExpiryDateValid",
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
                          {validationDocData?.TaskOrderExpiryDateValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Certificate of insurance date</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={
                            currentDocumentationData?.certificationOfInsurance
                          }
                          type="date"
                          handleChange={(e: any) => {
                            onValueChange(
                              "certificationOfInsurance",
                              e.target.value
                            );
                            if (!isTextValid(e.target.value)) {
                              onValidationChange(
                                "certificationOfInsuranceValid",
                                "COI date should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "certificationOfInsuranceValid",
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
                          {validationDocData?.certificationOfInsuranceValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Client task order or SOW</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={ClientTaskOrderOrSOWList}
                          value={currentDocumentationData?.clientTaskOrderOrSOW}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("clientTaskOrderOrSOW", e);
                            if (!isTextValid(e.value)) {
                              onValidationChange(
                                "clientTaskOrderOrSOWValid",
                                "COI or SOW should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "clientTaskOrderOrSOWValid",
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
                          {validationDocData?.clientTaskOrderOrSOWValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Documentation status</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={DocumentationStatusList}
                          value={currentDocumentationData?.documentationStatus}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("documentationStatus", e);
                            if (!isTextValid(e.value)) {
                              onValidationChange(
                                "documentationStatusValid",
                                "Documentation status should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "documentationStatusValid",
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
                          {validationDocData?.documentationStatusValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Documents completion date</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={
                            currentDocumentationData?.documentationCompletionDate
                          }
                          type="date"
                          handleChange={(e: any) => {
                            onValueChange(
                              "documentationCompletionDate",
                              e.target.value
                            );
                            if (!isTextValid(e.target.value)) {
                              onValidationChange(
                                "documentationCompletionDateValid",
                                "Documentation completion date should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "documentationCompletionDateValid",
                                " "
                              );
                            }
                          }}
                          className=""
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
                          {validationDocData?.documentationCompletionDateValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Documentation remarks</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentDocumentationData?.documentationRemark}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "documentationRemark",
                              event?.target?.value
                            );
                            if (!isTextValid(event.target.value)) {
                              onValidationChange(
                                "documentationRemarkValid",
                                "Documentation remark should not be empty."
                              );
                            } else {
                              onValidationChange(
                                "documentationRemarkValid",
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
                          {validationDocData?.documentationRemarkValid}
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
