import React, { useEffect, useState } from "react";
import "./CandidateDetails.css";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "../../common/TextField/TextField";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import {
  setCandidateInputBoxValue,
  setCandidateValidation,
} from "../../actions/candidate";
import { DropDown } from "../../common/DropDown/DropDown";
import {
  LocationName,
  WorkAuthorization,
} from "../../constants/candidateclientconstants";
import Select from "react-select";
import { yesNoList } from "../../constants/constants";
import { isEmailValid, isTextValid } from "../../helpers/validate";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

const CandidateDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentCandidateData = useAppSelector(
    (state: RootState) => state.candidate.candidateData
  );
  const validationCandidateData = useAppSelector(
    (state: RootState) => state.candidate.candidateValidationData
  );

  console.log("currentCandidateData: ", currentCandidateData);
  console.log("reducerCandidateData: ", validationCandidateData);

  let workAuthorizationData = useAppSelector(
    (state: RootState) => state.workAuthorization.allWorkAuthorizationData
  );
  var result: any = [];
  if (workAuthorizationData != undefined) {
    workAuthorizationData.forEach((element: { workAuthorization: any }) => {
      result.push({
        label: element.workAuthorization,
        value: element.workAuthorization,
      });
    });
  }
  const locationName = LocationName;
  // const workAuthorization = WorkAuthorization;

  const onValueChange = (key: any, value: any) => {
    dispatch(setCandidateInputBoxValue(key, value));
  };

  const onValidationChange = (key: any, value: any) => {
    dispatch(setCandidateValidation(key, value));
  };

  const [firstNameError, setFirstNameError] = useState<any>();
  const [middleNameError, setMiddleNameError] = useState<any>();
  const [lastNameError, setLastNameError] = useState<any>();
  const [line1Error, setLine1Error] = useState<any>();
  const [line2Error, setLine2Error] = useState<any>();
  const [cityError, setCityError] = useState<any>();
  const [stateError, setStateError] = useState<any>();
  const [zipCodeError, setZipCodeError] = useState<any>();
  const [countryError, setCountryError] = useState<any>();
  const [emailError, setEmailError] = useState<any>();
  const [contactNumberError, setContactNumberError] = useState<any>();
  const [workAuthorizationError, setWorkAuthorizationError] = useState<any>();
  const [
    workAuthorizationExpiryDateError,
    setWorkAuthorizationExpiryDateError,
  ] = useState<any>();

  const [firstNameValid, setFirstNameValid] = useState<boolean>(false);
  const [middleNameValid, setMiddleNameValid] = useState<boolean>();
  const [lastNameValid, setLastNameValid] = useState<boolean>();
  const [line1Valid, setLine1Valid] = useState<boolean>();
  const [line2Valid, setLine2Valid] = useState<boolean>();
  const [cityValid, setCityValid] = useState<boolean>();
  const [stateValid, setStateValid] = useState<boolean>();
  const [zipCodeValid, setZipCodeValid] = useState<boolean>();
  const [countryValid, setCountryValid] = useState<boolean>();
  const [emailValid, setEmailValid] = useState<boolean>();
  const [contactNumberValid, setContactNumberValid] = useState<boolean>();
  const [workAuthorizationValid, setWorkAuthorizationValid] =
    useState<boolean>();
  const [
    workAuthorizationExpiryDateValid,
    setWorkAuthorizationExpiryDateValid,
  ] = useState<boolean>();

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
          {" "}
          <h1 className="text-left text-[18px] flex justify-between  items-center w-[100%] -mr-5 bg-gray-300 p-3">
            {" "}
            Candidate Details
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="black"
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
                      <td className="px-6 py-4 font-semibold ">
                        <span>Candidate first name</span>
                      </td>
                      <td className="px-6 py-1">
                        <TextField
                          value={currentCandidateData?.firstName}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("firstName", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "firstNameValid",
                                "First name should not be empty."
                              );
                            } else {
                              onValidationChange("firstNameValid", " ");
                            }
                          }}
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                            // marginTop: "px",
                          }}
                        />
                        <p
                          className=""
                          style={{
                            fontSize: "12px",
                            color: "red",
                            marginTop: "3px",
                          }}
                        >
                          {validationCandidateData?.firstNameValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700 ">
                      <td className="px-6 py-4 font-semibold">
                        <span>Candidate middle name</span>
                      </td>
                      <td className="px-6 py-0 ">
                        <TextField
                          value={currentCandidateData?.middleName}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("middleName", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "middleNameValid",
                                "Middle name should not be empty."
                              );
                            } else {
                              onValidationChange("middleNameValid", " ");
                            }
                          }}
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                            marginTop: "5px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationCandidateData?.middleNameValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Candidate last name</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentCandidateData?.lastName}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("lastName", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "lastNameValid",
                                "Last name should not be empty."
                              );
                            } else {
                              onValidationChange("lastNameValid", " ");
                            }
                          }}
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                            marginTop: "5px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationCandidateData?.lastNameValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Line 1</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentCandidateData?.line1}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("line1", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "line1Valid",
                                "Line 1 should not be empty."
                              );
                            } else {
                              onValidationChange("line1Valid", " ");
                            }
                          }}
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                            marginTop: "5px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationCandidateData?.line1Valid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Line 2</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentCandidateData?.line2}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("line2", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "line2Valid",
                                "Line 2 should not be empty."
                              );
                            } else {
                              onValidationChange("line2Valid", " ");
                            }
                          }}
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                            marginTop: "5px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationCandidateData?.line2Valid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>City</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentCandidateData?.city}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("city", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "cityValid",
                                "City should not be empty."
                              );
                            } else {
                              onValidationChange("cityValid", " ");
                            }
                          }}
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                            marginTop: "5px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationCandidateData?.cityValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>State</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={locationName}
                          value={currentCandidateData?.state}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("state", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "stateValid",
                                "State should not be empty."
                              );
                            } else {
                              onValidationChange("stateValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationCandidateData?.stateValid}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="relative w-[100%]  bg-[#f8f8f8dd]">
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
                        <span>Zip code</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentCandidateData?.zipCode}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "zipCode",
                              event.target.value.replace(/[^0-9]/gi, "")
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "zipCodeValid",
                                "Zip code should not be empty."
                              );
                            } else {
                              onValidationChange("zipCodeValid", " ");
                            }
                          }}
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            fontSize: "13px",
                            marginTop: "5px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationCandidateData?.zipCodeValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Country</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentCandidateData?.country}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange("country", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "countryValid",
                                "Country should not be empty."
                              );
                            } else {
                              onValidationChange("countryValid", " ");
                            }
                          }}
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            marginTop: "5px",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationCandidateData?.countryValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Candidate email address</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentCandidateData?.email}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "email",
                              event.target.value.replace(/\s/g, "")
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "emailValid",
                                "Email should not be empty."
                              );
                            } else {
                              if (!isEmailValid(event?.target?.value)) {
                                onValidationChange(
                                  "emailValid",
                                  "Email is invalid."
                                );
                              } else {
                                onValidationChange("emailValid", " ");
                              }
                            }
                          }}
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            marginTop: "5px",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationCandidateData?.emailValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Candidate contact no.</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentCandidateData?.contactNumber}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "contactNumber",
                              event.target.value.replace(/[^0-9]/gi, "")
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "contactNumberValid",
                                "Contact number is invalid"
                              );
                            } else {
                              onValidationChange("contactNumberValid", " ");
                            }
                          }}
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            marginTop: "5px",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationCandidateData?.contactNumberValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Candidate fax no.</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={currentCandidateData?.faxNumber}
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "faxNumber",
                              event.target.value.replace(/[^0-9]/gi, "")
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "faxNumberValid",
                                "Fax number should not be empty."
                              );
                            } else {
                              onValidationChange("faxNumberValid", " ");
                            }
                          }}
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            marginTop: "5px",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationCandidateData?.faxNumberValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Work authorization</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-2"
                          options={result}
                          value={currentCandidateData?.workAuthorization}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onValueChange("workAuthorization", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "workAuthorizationValid",
                                "Work authorization is invalid"
                              );
                            } else {
                              onValidationChange("workAuthorizationValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationCandidateData?.workAuthorizationValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Work authorization expiry date</span>
                      </td>
                      <td className="px-6 py-0">
                        <TextField
                          value={
                            currentCandidateData?.workAuthorizationExpiryDate
                          }
                          type="date"
                          placeholder={""}
                          handleChange={(event) => {
                            onValueChange(
                              "workAuthorizationExpiryDate",
                              event?.target?.value
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "workAuthorizationExpiryDateValid",
                                "Work authorization expiry date is invalid"
                              );
                            } else {
                              onValidationChange(
                                "workAuthorizationExpiryDateValid",
                                " "
                              );
                            }
                          }}
                          styles={{
                            border: "1px solid hsl(0, 0%, 80%)",
                            textAlign: "left",
                            marginTop: "5px",
                            fontSize: "13px",
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {
                            validationCandidateData?.workAuthorizationExpiryDateValid
                          }
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

export default CandidateDetails;
