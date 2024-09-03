import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import { Button } from "../../common/Button/Button";

import { Link } from "react-router-dom";
import { allClientData } from "../../actions/client";
// import { allJobData, deleteJobData } from "../../actions/job";
import ShowJob from "./ShowIndividualJob";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import { MDBDataTable } from "mdbreact";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { GenericTable } from "../../common/GenericTable/GenricTable";
import moment from "moment";
import { Modal } from "../../common/Modal/Modal";
import AddClientDetails from "../Client/AddClient";
import AddJobDetails from "./AddJob";
import EditJobDetails from "./EditJob";
import Swal from "sweetalert2";
import { deleteJobData } from "../../actions/job";

const TABLE_HEAD: any = [
  { label: "Job Title", key: "jobTitle" },
  { label: "Job Type", key: "jobType" },
  { label: "Line Of Business", key: "lineOfBusiness" },
  { label: "Added date", key: "Addeddate" },
  { label: "Action", key: "action" },
];

const ShowJobTable: React.FC = () => {
  const dispatch = useAppDispatch();
  let jobData = useAppSelector((state: RootState) => state.job.allJobData);
  let jobDataRow = jobData;

  const [open, setOpen] = useState(false);
  const [singleJobData, setSingleJobData] = useState({});
  const [filteredData, setFilteredData] = useState(jobData);
  console.log("jobData", jobData);
  const [count, setCount] = useState(true);

  console.log("filteredData after sort", filteredData);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setAddFlag(false);
    setEditFlag(false);
    setShowEditModal(false);
  };

  useEffect(() => {
    const jobList =
      jobData &&
      jobData?.map((jobdate: any) => {
        const jobTitle = jobdate?.jobTitle;
        const jobType = jobdate?.jobType;
        const lineOfBusiness = jobdate?.lineOfBusiness;
        const Addeddate = moment.utc(jobdate?.createdAt).format("YYYY-MM-DD");

        return {
          ...jobdate,
          jobTitle,
          jobType,
          lineOfBusiness,
          Addeddate,
        };
      });
    setFilteredData(jobList);
    if (count) {
      if (jobData?.length !== 0) {
        setFilteredData(
          jobData?.filter((cd: { jobdate: any }) =>
            cd?.jobdate?.jobName?.toLowerCase()?.includes("")
          )
        );
        setCount(false);
      }
    }
  }, [jobData, count]);

  const filterResult = (event: any) => {
    setFilteredData(jobDataRow);
    let value: string = event.target.value;
    if (jobData?.length !== 0) {
      const data: any = jobData?.filter(
        (ele?: any) =>
          ele?.jobTitle?.toLowerCase()?.includes(value.toLowerCase()) ||
          ele?.jobType?.toLowerCase()?.includes(value.toLowerCase()) ||
          ele?.lineOfBusiness?.toLowerCase()?.includes(value.toLowerCase()) ||
          ele?.createdAt?.toLowerCase()?.includes(value.toLowerCase())
      );
      console.log("filteredData inside search: ", data);
      const jobList = data?.map((jobdate: any) => {
        const jobTitle = jobdate?.jobTitle;
        const jobType = jobdate?.jobType;
        const lineOfBusiness = jobdate?.lineOfBusiness;
        const Addeddate = moment.utc(jobdate?.createdAt).format("YYYY-MM-DD");

        return {
          ...jobdate,
          jobTitle,
          jobType,
          lineOfBusiness,
          Addeddate,
        };
      });
      setFilteredData(jobList);
      console.log("jobList: ", jobList);
    } else {
      const jobList = jobData?.map((jobdate: any) => {
        const jobTitle = jobdate?.jobTitle;
        const jobType = jobdate?.jobType;
        const lineOfBusiness = jobdate?.lineOfBusiness;
        const Addeddate = moment.utc(jobdate?.createdAt).format("YYYY-MM-DD");

        return {
          ...jobdate,
          jobTitle,
          jobType,
          lineOfBusiness,
          Addeddate,
        };
      });
      console.log("jobList: ", jobList);
      setFilteredData(jobList);
    }
  };

  const boxStyle = {
    alignItems: "center",
    border: "none",
    flexGrow: 1,
    marginTop: "3%",
    overflowY: "auto",
    overflowX: "hidden",
    height: "60vh",
    paddingRight: "10px",
    paddingLeft: "10px",
  };

  const button = {
    backgroundColor: "Green",
    border: "none",
    color: "white",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline - block",
    fontSize: "16px",
  };

  const [editData, setEditData] = useState<any>();
  const [addFlag, setAddFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);

  const onPressAction = (rowData: any, type: any) => {
    console.log(rowData);
    console.log(type);

    if (type == "Edit") {
      setShowModal(true);
      setEditFlag(true);
      setEditData(rowData);
      setShowEditModal(true);
      setAddFlag(false);
    } else if (type == "Delete") {
      Swal.fire({
        title: "Do you really want to delete it ?",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteJobData(rowData?.id));
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };
  const [jobDetails, setJobDetails] = useState<
    {
      jobTitle: string;
      jobType: string;
      lineOfBusiness: string;
      addedDate: string;
    }[]
  >([]);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{ borderRadius: "15px", marginBottom: "10px", width: "90%" }}
          className="py-3 px-4"
        >
          <div className="relative max-w">
            <label htmlFor="hs-table-search" className="sr-only">
              Search
            </label>
            <input
              style={{ border: "0.5px solid gray" }}
              type="text"
              name="hs-table-search"
              id="hs-table-search"
              className="ml-[-13px] p-2 mt-[15px] pl-10 block w-[35%] border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search for jobs"
              onChange={(event) => filterResult(event)}
            />

            <div className="absolute mt-[-27px] left-0 flex items-center pointer-events-none pl-2">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "10%",
            maxHeight: "100%",
            justifyContent: "center",
            alignContent: "center",
            marginLeft: "3px",
            marginRight: "3px",
          }}
        >
          <Button
            value="Add Job"
            className="mt-3 py-1 text-white bg-[#1976D2]"
            handleClick={() => {
              setShowModal(true);
              setAddFlag(true);
            }}
          />
          {addFlag && (
            <Modal
              children={<AddJobDetails setShowModal={setShowModal} />}
              modalStyle={{
                marginTop: "50px",
                overflow: "scroll",
                boxShadow: "initial",
                zIndex: "999px",
              }}
              showModalHeader={true}
              modalHeader={"Add Job"}
              isFlexible={true}
              topRightCloseButtonID={"x-  "}
              showModal={showModal}
              showBackButton={true}
              showBBPSLogo={true}
              handleBackClick={handleCloseModal}
            ></Modal>
          )}
          {editFlag && (
            <Modal
              children={
                <EditJobDetails
                  setShowModal={setShowEditModal}
                  data={editData}
                />
              }
              modalStyle={{
                marginTop: "50px",
                overflow: "scroll",
                boxShadow: "initial",
                zIndex: "999px",
              }}
              showModalHeader={true}
              modalHeader={"Edit Job"}
              isFlexible={true}
              topRightCloseButtonID={"x-  "}
              showModal={showEditModal}
              showBackButton={true}
              showBBPSLogo={true}
              handleBackClick={handleCloseModal}
            ></Modal>
          )}
        </div>
      </div>

      <GenericTable
        showColumnLink={["fullAddress"]}
        // onClickRow={onClickRow}
        tableHeader={TABLE_HEAD}
        onPressAction={onPressAction}
        tableData={filteredData}
        // actionType={null}
        showCheckbox={false}
        showAvatar={false}
        actionType={["Edit", "Delete"]}
        // sortValue={""}
        loading={true}
        onPageChange={function (page: number): void {
          throw new Error("Function not implemented.");
        }}
        count={0}
      />
    </>
  );
};

export default ShowJobTable;
