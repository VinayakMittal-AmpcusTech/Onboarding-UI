import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";

import Select from "react-select";

import { setCandidateInputBoxValue } from "../../actions/candidate";
import ClientDetails from "../Client/ClientDetails";
import CandidateDetails from "./CandidateDetails";
import VendorDetails from "../Vendor/VendorDetails";
import JobDetails from "../Job/JobDetails";
import ReferralDetails from "../Referral/ReferralDetails";
import { yesNoList } from "../../constants/constants";

const BasicDetails: React.FC = () => {
  const [flag, setFlag] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<any>();
  console.log("selectedOption::::", selectedOption);
  console.log("flag:::", flag);

  const dispatch = useAppDispatch();

  // const currentCandidateData = useAppSelector(
  //   (state: RootState) => state.candidate.candidateData
  // );

  const onValueChange = (key: any, value: any) => {
    dispatch(setCandidateInputBoxValue(key, value));
  };

  function select(e: any) {
    setSelectedOption(e);
    if (selectedOption?.includes("Yes")) {
      setFlag(true);
    }
    // else if (selectedOption.includes("No")) {
    //   setFlag(false);
    // }
  }

  return (
    <>
      <CandidateDetails />
      <ClientDetails />
      <VendorDetails />
      <JobDetails />
      <div className="w-[30%] mt-10 mb-10 border-solid border-2 rounded-md bg-gray-300 ">
        <span className="text-center  text-xl   ">
          Do you want to add a referral ?
        </span>
        <Select
          className="mt-2"
          options={yesNoList}
          value={selectedOption?.value}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          onChange={(e: any) => {
            select(e.value);
            if (e?.value?.includes("Yes")) {
              onValueChange("referralCase", true);
            } else {
              onValueChange("referralCase", false);
            }
          }}
          isSearchable={true}
        />
      </div>

      {selectedOption === "Yes" && <ReferralDetails />}
    </>
  );
};

export default BasicDetails;
