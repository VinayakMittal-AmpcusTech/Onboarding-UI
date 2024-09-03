import React, { useState } from "react";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import {
  setClientInputBoxValue,
  setClientValidation,
} from "../../actions/client";
import { LocationName } from "../../constants/candidateclientconstants";
import Select from "react-select";
import { isTextValid } from "../../helpers/validate";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const ClientDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentClientData = useAppSelector(
    (state: RootState) => state.client.clientData
  );
  const validationClientData = useAppSelector(
    (state: RootState) => state.client.clientValidationData
  );
  // console.log("validationClientData: ", validationClientData);
  let contractTypeData = useAppSelector(
    (state: RootState) => state.contractType.allContractTypeData
  );
  var result: any = [];
  if (contractTypeData != undefined) {
    contractTypeData.forEach((element: { contractType: any }) => {
      result.push({
        label: element.contractType,
        value: element.contractType,
      });
    });
  }
  const allClientData = useAppSelector(
    (state: RootState) => state.client.allClientData
  );
  let allClientName: object[] = [];
  if (allClientData?.length !== 0) {
    allClientData?.map((a: any) => {
      a?.addressId?.map((b: any) => {
        let data = {
          label: a?.clientId?.clientName + " (" + b.city + "/" + b.state + ")",
          value: {
            clientId: a?.clientId?.id,
            clientName: a?.clientId?.clientName,
            endClientName: a?.clientId?.endClientName,
            MSPName: a?.clientId?.mspName,
            contactNumber: b?.contactDetailId?.contactNumber,
            email: b?.contactDetailId?.email,
            faxNumber: b?.contactDetailId?.faxNumber,
            line1: b?.line1,
            line2: b?.line2,
            city: b?.city,
            state: b?.state,
            zipCode: b?.zipCode,
            country: b?.country,
          },
        };
        allClientName.push(data);
      });
    });
  }
  const locationName = LocationName;

  const onClientValueChange = (key: any, value: any) => {
    dispatch(setClientInputBoxValue(key, value));
  };

  const onValidationChange = (key: any, value: any) => {
    dispatch(setClientValidation(key, value));
  };

  function displayClientData(value: any) {
    onClientValueChange("id", value?.clientId);
    onClientValueChange("endClientName", value?.endClientName);
    onClientValueChange("mspName", value?.MSPName);
    onClientValueChange("contactNumber", value?.contactNumber);
    onClientValueChange("email", value?.email);
    onClientValueChange("faxNumber", value?.faxNumber);
    onClientValueChange("line1", value?.line1);
    onClientValueChange("line2", value?.line2);
    onClientValueChange("city", value?.city);
    onClientValueChange("state", { label: value?.state, value: value?.state });
    onClientValueChange("zipCode", value?.zipCode);
    onClientValueChange("country", value?.country);
  }
  function Icon({ id, open }: any) {
    return (
      // <svg
      //   xmlns="http://www.w3.org/2000/svg"
      //   fill="none"
      //   viewBox="0 0 24 24"
      //   strokeWidth={2}
      //   stroke="currentColor"
      //   className={`${
      //     id === open ? "rotate-180" : ""
      //   } h-6 w-6  transition-transform`}
      // >
      //   <path
      //     strokeLinecap="round"
      //     strokeLinejoin="round"
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
          {" "}
          <h1 className="text-left text-[18px] flex justify-between  items-center w-[100%] bg-gray-300 p-3 -mr-5">
            {" "}
            Client Details
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
                        <span className="mt-2">Client name</span>
                      </td>
                      <td scope="col" className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={allClientName}
                          value={currentClientData?.clientName}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            displayClientData(e.value);
                            onClientValueChange("clientName", e);
                            if (!isTextValid(e?.value?.clientName)) {
                              onValidationChange(
                                "clientNameValid",
                                "Client name is invalid"
                              );
                            } else {
                              onValidationChange("clientNameValid", " ");
                            }
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
                          {validationClientData?.clientNameValid}
                        </p>
                      </td>
                    </tr>

                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Contact Type</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={result}
                          value={currentClientData?.contractType}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onClientValueChange("contractType", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "contractTypeValid",
                                "Contract type is invalid"
                              );
                            } else {
                              onValidationChange("contractTypeValid", " ");
                            }
                          }}
                          isSearchable={true}
                          styles={{
                            control: (baseStyles, state) => ({
                              ...baseStyles,
                            }),
                          }}
                        />
                        <p
                          className=""
                          style={{
                            fontSize: "12px",
                            color: "red",
                            marginTop: "2px",
                          }}
                        >
                          {validationClientData?.contractTypeValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>End Client Name</span>
                      </td>
                      <td className="px-6 py-4">
                        {currentClientData?.endClientName}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Msp Name</span>
                      </td>{" "}
                      <td className="px-6 py-4">
                        {currentClientData?.mspName}
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
                  <tbody>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Email</span>
                      </td>
                      <td className="px-6 py-4">{currentClientData?.email}</td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Contact Number</span>
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        {currentClientData?.contactNumber}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Fax No</span>
                      </td>{" "}
                      <td className="px-6 py-4">
                        {currentClientData?.faxNumber}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Address</span>
                      </td>
                      <td className="px-6 py-4">
                        {currentClientData?.line1} {currentClientData?.line2},{" "}
                        {currentClientData?.city},{" "}
                        {currentClientData?.state.label},{" "}
                        {currentClientData?.zipCode},{" "}
                        {currentClientData?.country}
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

export default ClientDetails;
