import React, { ChangeEvent, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "../../common/TextField/TextField";
import { TextArea } from "../../common/TextArea/TextArea";
import { setJobInputBoxValue, setJobValidation } from "../../actions/job";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import Select from "react-select";
import {
  JobTypeList,
  LineOfBusinessList,
  ResumeSourceList,
  WorkTypeList,
} from "../../constants/jobconstants";
import { isTextValid } from "../../helpers/validate";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

const JobDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentJobData = useAppSelector(
    (state: RootState) => state.job.jobData
  );
  const validationJobData = useAppSelector(
    (state: RootState) => state.job.jobValidationData
  );
  console.log("validationJobData: ", validationJobData);

  const allJobData = useAppSelector((state: RootState) => state.job.allJobData);
  let allJobName: object[] = [];
  if (allJobData.length !== 0) {
    allJobData.map(
      (a: {
        id: number;
        requestID: number;
        jobDivaID: number;
        jobTitle: string;
        jobType: string;
        lineOfBusiness: string;
        jobDescription: string;
      }) => {
        let data = {
          label: a.jobTitle,
          value: {
            id: a.id,
            requestID: a.requestID,
            jobDivaID: a.jobDivaID,
            jobTitle: a.jobTitle,
            jobType: a.jobType,
            lineOfBusiness: a.lineOfBusiness,
            jobDescription: a.jobDescription,
          },
        };
        allJobName.push(data);
      }
    );
  }
  const workType = WorkTypeList;
  const jobType = JobTypeList;
  const resumeSource = ResumeSourceList;
  const lineOfBusiness = LineOfBusinessList;

  const onJobValueChange = (key: any, value: any) => {
    dispatch(setJobInputBoxValue(key, value));
  };

  const onValidationChange = (key: any, value: any) => {
    dispatch(setJobValidation(key, value));
  };

  function displayJobData(value: any) {
    onJobValueChange("id", value.id);
    onJobValueChange("requestID", value.requestID);
    onJobValueChange("jobDivaID", value.jobDivaID);
    // onJobValueChange("jobTitle", value.jobTitle);
    onJobValueChange("jobType", { label: value.jobType, value: value.jobType });
    onJobValueChange("lineOfBusiness", {
      label: value.lineOfBusiness,
      value: value.lineOfBusiness,
    });
    onJobValueChange("jobDescription", value.jobDescription);
    onJobValueChange("zipCode", value.zipCode);
    onJobValueChange("country", value.country);
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
          <h1 className="text-left flex justify-between items-center text-[18px] w-full bg-gray-300 -mr-5  p-3">
            {" "}
            Job Details
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
              <div className="relative w-[100%] ">
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
                        <span> Job title/Position name</span>
                      </td>
                      <td scope="col" className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={allJobName}
                          value={currentJobData?.jobTitle}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            displayJobData(e.value);
                            onJobValueChange("jobTitle", e);
                            if (!isTextValid(e?.value?.jobTitle)) {
                              onValidationChange(
                                "jobTitleValid",
                                "Job title is invalid"
                              );
                            } else {
                              onValidationChange("jobTitleValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationJobData?.jobTitleValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold ">
                        <span>Working From</span>
                      </td>
                      <td className="px-6 py-0 ">
                        <TextField
                          value={currentJobData?.workingFrom}
                          placeholder={""}
                          handleChange={(event) => {
                            onJobValueChange(
                              "workingFrom",
                              event?.target?.value
                            );
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "workingFromValid",
                                "Working from is invalid"
                              );
                            } else {
                              onValidationChange("workingFromValid", " ");
                            }
                          }}
                          className=""
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
                          {validationJobData?.workingFromValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Work Type</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={workType}
                          value={currentJobData?.workType}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onJobValueChange("workType", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "workTypeValid",
                                "Work type is invalid"
                              );
                            } else {
                              onValidationChange("workTypeValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationJobData?.workTypeValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Resume Resource</span>
                      </td>
                      <td className="px-6 py-0">
                        <Select
                          className="text-[13px] text-left mt-1"
                          options={resumeSource}
                          value={currentJobData?.resumeSource}
                          getOptionLabel={(option) => option.label}
                          getOptionValue={(option) => option.value}
                          onChange={(e: any) => {
                            onJobValueChange("resumeSource", e);
                            if (!isTextValid(e?.value)) {
                              onValidationChange(
                                "resumeSourceValid",
                                "Resume source is invalid"
                              );
                            } else {
                              onValidationChange("resumeSourceValid", " ");
                            }
                          }}
                          isSearchable={true}
                        />
                        <p
                          className=""
                          style={{ fontSize: "12px", color: "red" }}
                        >
                          {validationJobData?.resumeSourceValid}
                        </p>
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold ">
                        <span>Skill Set</span>
                      </td>
                      <td className="px-6 py-0 ">
                        <TextField
                          value={currentJobData?.skillSet}
                          placeholder={""}
                          handleChange={(event) => {
                            onJobValueChange("skillSet", event?.target?.value);
                            if (!isTextValid(event?.target?.value)) {
                              onValidationChange(
                                "skillSetValid",
                                "Skill set is invalid"
                              );
                            } else {
                              onValidationChange("skillSetValid", " ");
                            }
                          }}
                          className=""
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
                          {validationJobData?.skillSetValid}
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
                  <tbody>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Request Id</span>
                      </td>
                      <td className="px-6 py-4">{currentJobData?.requestID}</td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Job Diva Id</span>
                      </td>
                      <td className="px-6 py-4">{currentJobData?.jobDivaID}</td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Job Type</span>
                      </td>
                      <td className="px-6 py-4">
                        {currentJobData?.jobType.value}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Line Of Business</span>
                      </td>
                      <td className="px-6 py-4">
                        {currentJobData?.lineOfBusiness.value}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        <span>Job Discription</span>
                      </td>
                      <td className="px-6 py-4">
                        {currentJobData?.jobDescription}
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

export default JobDetails;
