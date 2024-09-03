import React, { ChangeEvent, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "../../common/TextField/TextField";
import { TextArea } from "../../common/TextArea/TextArea";
import { saveJobData, setJobInputBoxValue } from "../../actions/job";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import { DropDown } from "../../common/DropDown/DropDown";
import { Button } from "../../common/Button/Button";
import Select from "react-select";
import { isTextValid } from "../../helpers/validate";
import {
  JobTypeList,
  LineOfBusinessList,
  ResumeSourceList,
  WorkTypeList,
} from "../../constants/jobconstants";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";

interface Props {
  setShowModal: any;
}

const AddJobDetails: React.FC<Props> = ({ setShowModal }) => {
  const dispatch = useAppDispatch();
  const currentJobData = useAppSelector(
    (state: RootState) => state.job.jobData
  );
  console.log("currentJobData: ", currentJobData);
  const jobType = JobTypeList;
  const lineOfBusiness = LineOfBusinessList;

  const [requestIDError, setRequestIDError] = useState<any>();
  const [jobDivaIDError, setJobDivaIDError] = useState<any>();
  const [jobTitleError, setJobTitleError] = useState<any>();
  const [jobTypeError, setJobTypeError] = useState<any>();
  const [lineOfBusinessError, setLineOfBusinessError] = useState<any>();
  const [jobDescriptiontError, setJobDescriptionError] = useState<any>();

  const onValueChange = (key: any, value: any) => {
    dispatch(setJobInputBoxValue(key, value));
  };
  const boxStyle = {
    alignItems: "center",
    border: "none",
    flexGrow: 1,
    marginTop: "3%",
    overflowY: "auto",
    overflowX: "hidden",
    height: "70vh",
    paddingRight: "10px",
    paddingLeft: "10px",
  };

  const [requestIDValid, setRequestIDValid] = useState<boolean>();
  const [jobDivaIDValid, setJobDivaIDValid] = useState<boolean>();
  const [jobTitleValid, setJobTitleValid] = useState<boolean>();
  const [jobTypeValid, setJobTypeValid] = useState<boolean>();
  const [lineOfBusinessValid, setLineOfBusinessValid] = useState<boolean>();
  const [jobDescriptiontValid, setJobDescriptionValid] = useState<boolean>();

  function onSubmitClick() {
    setRequestIDValid(isTextValid(currentJobData?.requestID));
    setJobDivaIDValid(isTextValid(currentJobData?.jobDivaID));
    setJobTitleValid(isTextValid(currentJobData?.jobTitle));
    setJobTypeValid(isTextValid(currentJobData?.jobType.value));
    setLineOfBusinessValid(isTextValid(currentJobData?.lineOfBusiness.value));
    setJobDescriptionValid(isTextValid(currentJobData?.jobDescription));
    console.log("setShowModal: ", setShowModal);

    if (
      isTextValid(currentJobData?.requestID) &&
      isTextValid(currentJobData?.jobDivaID) &&
      isTextValid(currentJobData?.jobTitle) &&
      isTextValid(currentJobData?.jobType.value) &&
      isTextValid(currentJobData?.lineOfBusiness.value) &&
      isTextValid(currentJobData?.jobDescription)
    ) {
      dispatch(
        saveJobData(
          currentJobData?.requestID,
          currentJobData?.jobDivaID,
          currentJobData?.jobTitle,
          currentJobData?.jobType.value,
          currentJobData?.lineOfBusiness.value,
          currentJobData?.jobDescription
        )
      );
      setShowModal(false);
    } else {
      if (!requestIDValid) {
        setRequestIDError("Request id should not be empty.");
      }
      if (!jobDivaIDValid) {
        setJobDivaIDError("Job diva id should not be empty.");
      }
      if (!jobTitleValid) {
        setJobTitleError("Job title should not be empty.");
      }
      if (!jobTypeValid) {
        setJobTypeError("Job type should not be empty.");
      }
      if (!lineOfBusinessValid) {
        setLineOfBusinessError("Line of business should not be empty.");
      }
      if (!jobDescriptiontValid) {
        setJobDescriptionError("Job description should not be empty.");
      }
    }
  }

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      // Your custom control styles here
    }),
    // Add more custom styles for other elements as needed
    placeholder: (styles: any) => ({
      ...styles,
      color: "#1976D2", // Change this color to your desired placeholder color
    }),
  };

  return (
    <>
      <div className="pt-5 px-5">
        <Grid container spacing={2}>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="Request Id*"
              value={currentJobData?.requestID}
              placeholder={""}
              handleChange={(event) => {
                onValueChange(
                  "requestID",
                  event.target.value.replace(/[^0-9]/gi, "")
                );
                setRequestIDValid(isTextValid(currentJobData?.requestID));
              }}
              className=" "
            />
            {!requestIDValid ? (
              <p
                className="text-left -mt-2"
                style={{ fontSize: "12px", color: "red" }}
              >
                {requestIDError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="Job diva Id*"
              value={currentJobData?.jobDivaID}
              placeholder={""}
              handleChange={(event) => {
                onValueChange(
                  "jobDivaID",
                  event.target.value.replace(/[^0-9]/gi, "")
                );
                setJobDivaIDValid(isTextValid(currentJobData?.jobDivaID));
              }}
              className=""
            />
            {!jobDivaIDValid ? (
              <p
                className="text-left -mt-2"
                style={{ fontSize: "12px", color: "red" }}
              >
                {jobDivaIDError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="Job title/Position name*"
              value={currentJobData?.jobTitle}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("jobTitle", event.target.value);
                setJobTitleValid(isTextValid(currentJobData?.jobTitle));
              }}
              className=""
            />
            {!jobTitleValid ? (
              <p
                className="text-left -mt-2"
                style={{ fontSize: "12px", color: "red" }}
              >
                {jobTitleError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span className="font-serif">Job type</span> */}
            <Select
              menuPosition="fixed"
              placeholder="Job type*"
              className="text-[14px] text-left"
              options={jobType}
              value={currentJobData?.jobType}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              onChange={(e: any) => {
                onValueChange("jobType", e);
                setJobTypeValid(isTextValid(currentJobData?.jobType.value));
              }}
              styles={customStyles}
            />
            {!jobTypeValid ? (
              <p className="mr-16" style={{ fontSize: "12px", color: "red" }}>
                {jobTypeError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span className="font-serif">Line of Business</span> */}
            <Select
              menuPosition="fixed"
              placeholder="Line of business*"
              className="text-[14px] text-left"
              options={lineOfBusiness}
              value={currentJobData?.lineOfBusiness}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              onChange={(e: any) => {
                onValueChange("lineOfBusiness", e);
                setLineOfBusinessValid(
                  isTextValid(currentJobData?.lineOfBusiness.value)
                );
              }}
              isSearchable={true}
              styles={customStyles}
            />
            {!lineOfBusinessValid ? (
              <p
                className="text-left"
                style={{ fontSize: "12px", color: "red" }}
              >
                {lineOfBusinessError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span className="font-serif">Job Description</span> */}
            <FloatLabel
              label="Job description*"
              value={currentJobData?.jobDescription}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("jobDescription", event?.target?.value);
                setJobDescriptionValid(
                  isTextValid(currentJobData?.jobDescription)
                );
              }}
              className=""
            />
            {!jobDescriptiontValid ? (
              <p
                className="text-left -mt-2"
                style={{ fontSize: "13px", color: "red" }}
              >
                {jobDescriptiontError}
              </p>
            ) : null}
          </Grid>
        </Grid>
        <div className="m-auto w-[30%] ml-[35%] text-white ">
          <Button
            className=""
            value="Save & Submit"
            handleClick={() => onSubmitClick()}
            styles={{ fontSize: "16px" }}
          />
        </div>
        {/* </Grid> */}
      </div>
    </>
  );
};

export default AddJobDetails;
