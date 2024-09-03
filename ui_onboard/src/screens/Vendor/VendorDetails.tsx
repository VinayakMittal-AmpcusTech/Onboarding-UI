import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "../../common/TextField/TextField";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import {
  setVendorInputBoxValue,
  setVendorValidation,
} from "../../actions/vendor";
import { LocationName } from "../../constants/candidateclientconstants";
import Select from "react-select";
import { isTextValid } from "../../helpers/validate";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

const VendorDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentVendorData = useAppSelector(
    (state: RootState) => state.vendor.vendorData
  );
  console.log("currentVendorData: ", currentVendorData);
  const validationVendorData = useAppSelector(
    (state: RootState) => state.vendor.vendorValidationData
  );
  console.log("validationVendorData: ", validationVendorData);
  const allVendorData = useAppSelector(
    (state: RootState) => state.vendor.allVendorData
  );
  let allVendorName: object[] = [];
  if (allVendorData?.length !== 0) {
    allVendorData?.map((a: any) => {
      a?.addressId?.map((b: any) => {
        let data = {
          label: a?.vendorId?.companyName,
          value: {
            id: a?.vendorId?.id,
            companyName: a?.vendorId?.companyName,
            federalId: a?.vendorId?.federalId,
            contactPerson: a?.vendorId?.contactPerson,
            email: b?.contactDetailId?.email,
            contactNumber: b?.contactDetailId?.contactNumber,
            faxNumber: b?.contactDetailId?.faxNumber,
            signAuthority: a?.vendorId?.signAuthority,
            signAuthorityDesignation: a?.vendorId?.signAuthorityDesignation,
            stateOfIncorporation: a?.vendorId?.stateOfIncorporation,
            line1: b?.line1,
            line2: b?.line2,
            city: b?.city,
            zipCode: b?.zipCode,
            state: b?.state,
            country: b?.country,
          },
        };
        allVendorName.push(data);
      });
    });
  }
  const locationName = LocationName;

  const onVendorValueChange = (key: any, value: any) => {
    dispatch(setVendorInputBoxValue(key, value));
  };

  const onValidationChange = (key: any, value: any) => {
    dispatch(setVendorValidation(key, value));
  };

  function displayVendorData(value: any) {
    onVendorValueChange("id", value?.id);
    onVendorValueChange("federalID", value?.federalId);
    onVendorValueChange("contactPerson", value?.contactPerson);
    onVendorValueChange("email", value?.email);
    onVendorValueChange("contactNumber", value?.contactNumber);
    onVendorValueChange("faxNumber", value?.contactNumber);
    onVendorValueChange("signAuthority", value?.signAuthority);
    onVendorValueChange(
      "signAuthorityDesignation",
      value?.signAuthorityDesignation
    );
    onVendorValueChange("stateOfIncorporation", value?.stateOfIncorporation);
    onVendorValueChange("line1", value?.line1);
    onVendorValueChange("line2", value?.line2);
    onVendorValueChange("city", value?.city);
    onVendorValueChange("zipCode", value?.zipCode);
    onVendorValueChange("state", { label: value?.state, value: value?.state });
    onVendorValueChange("country", value?.country);
  }
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
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
          <h1 className="text-left flex justify-between items-center text-[18px] w-full bg-gray-300  -mr-5  p-3 ">
            {" "}
            Vendor Details
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
                      <td className="px-6 py-4 font-semibold ">
                        <span>Vendor Details</span>
                      </td>

                      <td scope="col" className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={allVendorName}
                          value={currentVendorData?.companyName}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            displayVendorData(e.value);
                            onVendorValueChange("companyName", e);
                            if (!isTextValid(e?.value?.companyName)) {
                              onValidationChange(
                                "companyNameValid",
                                "Company name is invalid"
                              );
                            } else {
                              onValidationChange("companyNameValid", " ");
                            }
                            console.log(
                              "e?.value?.companyName: ",
                              e?.value?.companyName
                            );
                          }}
                          isSearchable={true}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                              backgroundColor: "rgb(249 250 251)",
                            }),
                          }}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationVendorData?.companyNameValid}
                        </p>
                      </td>
                    </tr>

                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Vendor Federal Id</span>
                      </td>{" "}
                      <td className="px-6 py-4">
                        {currentVendorData?.federalID}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Name Of Contact Person</span>
                      </td>{" "}
                      <td className="px-6 py-4">
                        {currentVendorData?.contactPerson}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Vendor Company Email</span>
                      </td>{" "}
                      <td className="px-6 py-4">{currentVendorData?.email}</td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Vendor Company Contact Number</span>
                      </td>{" "}
                      <td className="px-6 py-4">
                        {currentVendorData?.contactNumber}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Vendor Fax No</span>
                      </td>{" "}
                      <td className="px-6 py-4">
                        {currentVendorData?.faxNumber}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Name Of Sign Authority</span>
                      </td>{" "}
                      <td className="px-6 py-4">
                        {currentVendorData?.signAuthority}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Designation of sign authority</span>
                      </td>
                      <td className="px-6 py-4">
                        {currentVendorData?.signAuthorityDesignation}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="relative w-[100%] bg-[#f8f8f8dd]">
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
                        <span>Vendor state of incorporation</span>
                      </td>
                      <td className="px-6 py-4">
                        {currentVendorData?.stateOfIncorporation}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Line 1</span>
                      </td>
                      <td className="px-6 py-4">{currentVendorData?.line1}</td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Line 2</span>
                      </td>
                      <td className="px-6 py-4">{currentVendorData?.line2}</td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>City</span>
                      </td>
                      <td className="px-6 py-4">{currentVendorData?.city}</td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Zip Code</span>
                      </td>
                      <td className="px-6 py-4">
                        {currentVendorData?.zipCode}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>State</span>
                      </td>
                      <td className="px-6 py-4">
                        {currentVendorData?.state.value}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Country</span>
                      </td>
                      <td className="px-6 py-4">
                        {currentVendorData?.country}
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

export default VendorDetails;
