import React, { ChangeEvent, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "../../common/TextField/TextField";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import {
  setReferralInputBoxValue,
  setReferralValidation,
} from "../../actions/referral";
import { DropDown } from "../../common/DropDown/DropDown";
import { LocationName } from "../../constants/candidateclientconstants";
import { yesNoList } from "../../constants/constants";
import Select from "react-select";
import { useSelector } from "react-redux";
import { isEmailValid, isTextValid } from "../../helpers/validate";

const ReferralDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentReferralData = useAppSelector(
    (state: RootState) => state.referral.referralData
  );
  console.log("currentReferralData: ", currentReferralData);
  const locationName = LocationName;

  const validationReferralData = useSelector(
    (state: RootState) => state.referral.referralValidationData
  );
  console.log("validationReferralData: ", validationReferralData);

  const onValueChange = (key: any, value: any) => {
    dispatch(setReferralInputBoxValue(key, value));
  };
  const onValidationChange = (key: any, value: any) => {
    dispatch(setReferralValidation(key, value));
  };

  //[#a7d5e7],[#cddfe6]

  return (
    <>
      <h1 className="text-left flex justify-between items-center text-xl w-full bg-gray-300  p-3">
        {" "}
        Referral Details
      </h1>

      <div className="flex gap-5 " style={{ margin: "auto", width: "100%" }}>
        <div className="relative w-[100%] mt-5 ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-4 ">
                  Initial details
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold ">
                  <span> Referral company name</span>
                </td>

                <th scope="col" className="px-6 py-3">
                  <TextField
                    value={currentReferralData?.companyName}
                    placeholder={""}
                    handleChange={(e) => {
                      onValueChange("companyName", e?.target.value);
                      if (!isTextValid(e?.target?.value)) {
                        onValidationChange(
                          "companyNameValid",
                          "Company name should not be empty"
                        );
                      } else {
                        onValidationChange("companyNameValid", " ");
                      }
                    }}
                    // isSearchable={true}

                    className=""
                    styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.companyNameValid}
                  </p>
                </th>
              </tr>

              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>Referral Federal Id</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.federalID}
                    placeholder={""}
                    handleChange={(event) => {
                      onValueChange("federalID", event?.target?.value);
                      if (!isTextValid(event?.target?.value)) {
                        onValidationChange(
                          "federalIDValid",
                          "federalID should not be empty"
                        );
                      } else {
                        onValidationChange("federalIDValid", " ");
                      }
                    }}
                    className="mt-2"
                    styles={{
                      border: "1px solid hsl(0, 0%, 80%)",
                    }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.federalIDValid}
                  </p>
                </td>
              </tr>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>Name Of Contact Person</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.contactPerson}
                    placeholder={""}
                    handleChange={(event) => {
                      onValueChange("contactPerson", event?.target?.value);

                      if (!isTextValid(event?.target?.value)) {
                        onValidationChange(
                          "contactPersonValid",
                          "contact Person should not be empty"
                        );
                      } else {
                        onValidationChange("contactPersonValid", " ");
                      }
                    }}
                    className="mt-2"
                    styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.contactPersonValid}
                  </p>
                </td>
              </tr>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>referral Company email id</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.Email}
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
                          onValidationChange("emailValid", "Email is invalid.");
                        } else {
                          onValidationChange("emailValid", " ");
                        }
                      }
                    }}
                    className="mt-2"
                    styles={{
                      border: "1px solid hsl(0, 0%, 80%)",
                      textAlign: "left",
                      fontSize: "13px",
                    }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.emailValid}
                  </p>
                </td>
              </tr>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>Referral Company Contact No</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.contactNumber}
                    placeholder={""}
                    handleChange={(event) => {
                      onValueChange(
                        "contactNumber",
                        event?.target?.value.replace(/[^0-9]/gi, "")
                      );
                      if (!isTextValid(event?.target?.value)) {
                        onValidationChange(
                          "contactNumberValid",
                          "contactNumber should not be empty"
                        );
                      } else {
                        onValidationChange("contactNumberValid", " ");
                      }
                    }}
                    className="mt-2"
                    styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.contactNumberValid}
                  </p>
                </td>
              </tr>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>Referral Fax No</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.faxNumber}
                    placeholder={""}
                    handleChange={(event) => {
                      onValueChange(
                        "faxNumber",
                        event?.target?.value.replace(/[^0-9]/gi, "")
                      );
                      if (!isTextValid(event?.target?.value)) {
                        onValidationChange(
                          "faxNumberValid",
                          "fax Number should not be empty"
                        );
                      } else {
                        onValidationChange("faxNumberValid", " ");
                      }
                    }}
                    className="mt-2"
                    styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.faxNumberValid}
                  </p>
                </td>
              </tr>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>Name Of Sign Authority</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.signAuthority}
                    placeholder={""}
                    handleChange={(event) => {
                      onValueChange("signAuthority", event?.target?.value);
                      if (!isTextValid(event?.target?.value)) {
                        onValidationChange(
                          "signAuthorityValid",
                          "sign Authority should not be empty"
                        );
                      } else {
                        onValidationChange("signAuthorityValid", " ");
                      }
                    }}
                    className="mt-2"
                    styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.signAuthorityValid}
                  </p>
                </td>
              </tr>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>Designation of sign authority</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.signAuthorityDesignation}
                    placeholder={""}
                    handleChange={(event) => {
                      onValueChange(
                        "signAuthorityDesignation",
                        event?.target?.value
                      );
                      if (!isTextValid(event?.target?.value)) {
                        onValidationChange(
                          "signAuthorityDesignationValid",
                          "sign Authority Designation should not be empty."
                        );
                      } else {
                        onValidationChange(
                          "signAuthorityDesignationValid",
                          " "
                        );
                      }
                    }}
                    className="mt-2"
                    styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.signAuthorityDesignationValid}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="relative w-[100%] mt-5 bg-[#f8f8f8dd]">
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
                  <span>Referral address line 1</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.line1}
                    placeholder={""}
                    handleChange={(event) => {
                      onValueChange("line1", event?.target?.value);
                      if (!isTextValid(event?.target?.value)) {
                        onValidationChange(
                          "line1Valid",
                          "line1 should not be empty"
                        );
                      } else {
                        onValidationChange("line1Valid", " ");
                      }
                    }}
                    className="mt-2"
                    styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.line1Valid}
                  </p>
                </td>
              </tr>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>Referral address line 2</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.line2}
                    placeholder={""}
                    handleChange={(event) => {
                      onValueChange("line2", event?.target?.value);
                      if (!isTextValid(event?.target?.value)) {
                        onValidationChange(
                          "line2Valid",
                          "line2 should not be empty"
                        );
                      } else {
                        onValidationChange("line2Valid", " ");
                      }
                    }}
                    className="mt-2"
                    styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.line2Valid}
                  </p>
                </td>
              </tr>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>Referral City</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.city}
                    placeholder={""}
                    handleChange={(event) => {
                      onValueChange("city", event?.target?.value);
                      if (!isTextValid(event?.target?.value)) {
                        onValidationChange(
                          "cityValid",
                          "city should not be empty"
                        );
                      } else {
                        onValidationChange("cityValid", " ");
                      }
                    }}
                    className="mt-2"
                    styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.cityValid}
                  </p>
                </td>
              </tr>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>Referral Zip Code</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.zipCode}
                    placeholder={""}
                    handleChange={(event) => {
                      onValueChange(
                        "zipCode",
                        event?.target?.value.replace(/[^0-9]/gi, "")
                      );
                      if (!isTextValid(event?.target?.value)) {
                        onValidationChange(
                          "zipCodeValid",
                          "zipCode should not be empty"
                        );
                      } else {
                        onValidationChange("zipCodeValid", " ");
                      }
                    }}
                    className="mt-2"
                    styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.zipCodeValid}
                  </p>
                </td>
              </tr>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>Referral State</span>
                </td>
                <td className="px-6 py-0 mt-2">
                  <Select
                    options={locationName}
                    value={currentReferralData?.state}
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
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.stateValid}
                  </p>
                </td>
              </tr>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>Country</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.country}
                    placeholder={""}
                    handleChange={(event) => {
                      onValueChange("country", event?.target?.value);
                      if (!isTextValid(event.target.value)) {
                        onValidationChange(
                          "countryValid",
                          "country should not be empty"
                        );
                      } else {
                        onValidationChange("countryValid", "");
                      }
                    }}
                    className="mt-2"
                    styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.countryValid}
                  </p>
                </td>
              </tr>
              <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-semibold">
                  <span>Referral State Incorporation</span>
                </td>
                <td className="px-6 py-0">
                  <TextField
                    value={currentReferralData?.stateOfIncorporation}
                    placeholder={""}
                    handleChange={(event) => {
                      onValueChange(
                        "stateOfIncorporation",
                        event?.target?.value
                      );
                      if (!isTextValid(event.target.value)) {
                        onValidationChange(
                          "stateOfIncorporationValid",
                          "state Of Incorporation should not be empty"
                        );
                      } else {
                        onValidationChange("stateOfIncorporationValid", "");
                      }
                    }}
                    className="mt-2"
                    styles={{ border: "1px solid hsl(0, 0%, 80%)" }}
                  />
                  <p className="" style={{ fontSize: "12px", color: "red" }}>
                    {validationReferralData?.stateOfIncorporationValid}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReferralDetails;
