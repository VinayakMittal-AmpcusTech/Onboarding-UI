import React, { ChangeEvent, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "../../common/TextField/TextField";
import { TextArea } from "../../common/TextArea/TextArea";
import {
  editJobData,
  saveJobData,
  setJobInputBoxValue,
} from "../../actions/job";
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
import { FloatSelect } from "../../common/FloatSelect/FloatSelect";

interface Props {
  setShowModal: any;
  data: any;
}

const EditJobDetails: React.FC<Props> = ({ setShowModal, data }) => {
  console.log("data: ", data);
  const dispatch = useAppDispatch();
  const currentJobData = useAppSelector(
    (state: RootState) => state.job.jobData
  );
  const workTypeList = WorkTypeList;
  const jobTypeList = JobTypeList;
  const resumeSourceList = ResumeSourceList;
  const lineOfBusinessList = LineOfBusinessList;

  const [requestID, setRequestID] = useState(data?.requestID);
  const [jobDivaID, setJobDivaID] = useState(data?.jobDivaID);
  const [jobTitle, setJobTitle] = useState(data?.jobTitle);
  const [jobType, setJobType] = useState(data?.jobType);
  const [lineOfBusiness, setLineOfBusiness] = useState(data?.lineOfBusiness);
  const [jobDescription, setJobDescription] = useState(data?.jobDescription);

  useEffect(() => {
    setRequestID(data?.requestID);
    setJobDivaID(data?.jobDivaID);
    setJobTitle(data?.jobTitle);
    setJobType(data?.jobType);
    setLineOfBusiness(data?.lineOfBusiness);
    setJobDescription(data?.jobDescription);
  }, [data]);

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
  const [jobDescriptionValid, setJobDescriptionValid] = useState<boolean>();

  function onSubmitClick() {
    console.log("jobType: ", jobType);
    setRequestIDValid(isTextValid(requestID.toString()));
    setJobDivaIDValid(isTextValid(jobDivaID.toString()));
    setJobTitleValid(isTextValid(jobTitle));
    setJobTypeValid(isTextValid(jobType));
    setLineOfBusinessValid(isTextValid(lineOfBusiness));
    setJobDescriptionValid(isTextValid(jobDescription));
    console.log("setShowModal: ", setShowModal);

    if (
      isTextValid(requestID.toString()) &&
      isTextValid(jobDivaID.toString()) &&
      isTextValid(jobTitle) &&
      isTextValid(jobType) &&
      isTextValid(lineOfBusiness) &&
      isTextValid(jobDescription)
    ) {
      dispatch(
        editJobData(
          data?.id,
          requestID,
          jobDivaID,
          jobTitle,
          jobType,
          lineOfBusiness,
          jobDescription
        )
      );
      setShowModal(false);
    } else {
      if (!requestIDValid) {
        setRequestIDError("Request id is Invalid");
      }
      if (!jobDivaIDValid) {
        setJobDivaIDError("Job diva id is Invalid");
      }
      if (!jobTitleValid) {
        setJobTitleError("Job title is Invalid");
      }
      if (!jobTypeValid) {
        setJobTypeError("Job type is Invalid");
      }
      if (!lineOfBusinessValid) {
        setLineOfBusinessError("Line of business is Invalid");
      }
      if (!jobDescriptionValid) {
        setJobDescriptionError("Job description is Invalid");
      }
    }
  }

  return (
    <>
      <div className="pt-5 px-5">
        <Grid container spacing={2}>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="Request Id*"
              value={requestID}
              placeholder={""}
              handleChange={(event) => {
                setRequestID(event.target.value.replace(/[^0-9]/gi, ""));
                setRequestIDValid(isTextValid(event?.target?.value));
                if (!requestIDValid) {
                  setRequestIDError("Request id should not be empty.");
                }
              }}
              className=""
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
              label="Job diva Id*
"
              value={jobDivaID}
              placeholder={""}
              handleChange={(event) => {
                setJobDivaID(event.target.value.replace(/[^0-9]/gi, ""));
                setJobDivaIDValid(isTextValid(event?.target?.value));
                if (!jobDivaIDValid) {
                  setJobDivaIDError("Job diva id should not be empty");
                }
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
              value={jobTitle}
              placeholder={""}
              handleChange={(event) => {
                setJobTitle(event?.target?.value);
                setJobTitleValid(isTextValid(event?.target?.value));
                if (!jobTitleValid) {
                  setJobTitleError("Job title should not be empty.");
                }
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
            <FloatSelect
              labelId={"Job type*"}
              options={jobTypeList}
              label="Job type*"
              value={jobType}
              handleChange={(e: any) => {
                setJobType(e?.target?.value);
                setJobTypeValid(isTextValid(e?.target?.value));
                if (jobTypeValid) {
                  setJobTypeError("Job type should not be empty.");
                }
              }}
              styles={{
                border: "none",
                borderRadius: "none",
                textAlign: "left",
                width: "100%",
                height: "38px",
                fontSize: "14px",
              }}
            />
            {!jobTypeValid ? (
              <p className="" style={{ fontSize: "12px", color: "red" }}>
                {jobTypeError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            <FloatSelect
              labelId={"Line of business"}
              options={lineOfBusinessList}
              label="Line of business*"
              value={lineOfBusiness}
              handleChange={(e: any) => {
                setLineOfBusiness(e?.target?.value);
                setLineOfBusinessValid(isTextValid(e?.target?.value));
                if (lineOfBusinessValid) {
                  setLineOfBusinessError(
                    "Line of business should not be empty."
                  );
                }
              }}
              styles={{
                border: "none",
                textAlign: "left",
                width: "100%",
                height: "38px",
                borderRadius: "none",
                fontSize: "14px",
              }}
            />
            {!lineOfBusinessValid ? (
              <p className="" style={{ fontSize: "12px", color: "red" }}>
                {lineOfBusinessError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span className="font-serif">Job Description</span> */}
            <FloatLabel
              label="Job description*"
              value={jobDescription}
              placeholder={""}
              handleChange={(event) => {
                setJobDescription(event?.target?.value);
                setJobDescriptionValid(isTextValid(event?.target?.value));
                if (jobDescriptionValid) {
                  setJobDescriptionError("Job description should not be empty");
                }
              }}
              className=""
            />
            {!jobDescriptionValid ? (
              <p
                className="text-left -mt-2"
                style={{ fontSize: "13px", color: "red" }}
              >
                {jobDescriptiontError}
              </p>
            ) : null}
          </Grid>
        </Grid>
        {/* <Grid xs={6} md={6}> */}
        <div className="m-auto w-[30%] ml-[35%] text-white ">
          <Button
            className=""
            value="Update Job"
            handleClick={() => onSubmitClick()}
            styles={{ fontSize: "16px" }}
          />
        </div>
        {/* </Grid> */}
      </div>
    </>
  );
};

export default EditJobDetails;
