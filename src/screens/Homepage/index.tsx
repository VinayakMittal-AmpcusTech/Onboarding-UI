import React, { useEffect, useState } from "react";
import ContentAreaScreen from "../ContentArea";
import SideBarScreen from "../Sidebar";
import NavBarScreen from "../Navbar";
import MiniDrawer from "./Homepage";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import {
  allCandidateData,
  deleteCandidateData,
  getCandidate,
  getImportantCandidateData,
} from "../../actions/candidate";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {
  deleteBgCheckData,
  getCandidateBackgroundCheck,
} from "../../actions/backgroundCheck";
import {
  deleteDocumentationData,
  getCandidateDocumentation,
} from "../../actions/documentation";
import {
  deleteStartEndOperationsData,
  getCandidateStartEndOperations,
} from "../../actions/startendoperations";
import {
  deleteRateRevisionData,
  getCandidateRateRevision,
} from "../../actions/raterevision";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import moment from "moment";
import { GenericTable } from "../../common/GenericTable/GenricTable";
import Swal from "sweetalert2";
// import GenericTable from "../../common/GenericTable/GenricTable";

const TABLE_HEAD: any = [
  { label: "Candidate Name", key: "candidateName" },
  { label: "Work Type", key: "workType" },
  { label: "Added date", key: "addedDate" },
  { label: "Address", key: "fullAddress" },
  { label: "Contact Number", key: "contactNumber" },
  { label: "Email", key: "email" },
  { label: "Action", key: "action" },
];

const HomepageScreen: React.FC = () => {
  console.log("TABLE_HEAD: ", TABLE_HEAD);
  // window.location.reload();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(allCandidateData());
  }, []);

  let candidateData: any = useAppSelector(
    (state: RootState) => state.candidate.getAllCandidates
  );
  let candidateDataRow = candidateData;
  console.log("candidateDataRow: ", candidateDataRow);
  const [open, setOpen] = useState(false);
  const [singleCandidateData, setSingleCandidateData] = useState({});
  const [filteredData, setFilteredData] = useState<any>();
  console.log("filteredData", filteredData);
  const [count, setCount] = useState(true);

  useEffect(() => {
    const candidateList = candidateData?.map((candidate: any) => {
      const candidateName =
        candidate?.candidateId?.firstName +
        " " +
        candidate?.candidateId?.lastName;
      const workType = candidate?.candidateId?.workType;
      const addedDate = moment.utc(candidate?.createdAt).format("YYYY-MM-DD");
      const contactNumber =
        candidate?.addressId[0]?.contactDetailId?.contactNumber;
      const email = candidate?.addressId[0]?.contactDetailId?.email;
      const fullAddress =
        candidate?.addressId?.[0]?.city +
        ", " +
        candidate?.addressId?.[0]?.state;
      return {
        ...candidate,
        fullAddress,
        candidateName,
        workType,
        addedDate,
        contactNumber,
        email,
      };
    });
    setFilteredData(candidateList);

    if (count) {
      if (candidateData?.length !== 0) {
        setFilteredData(
          candidateData?.filter((cd: { candidateId: any }) =>
            cd?.candidateId?.firstName?.toLowerCase()?.includes("")
          )
        );
        setCount(false);
      }
    }
  }, [candidateData]);

  const filterResult = (event: any) => {
    // debugger;
    setFilteredData(candidateDataRow);
    let value: string = event.target.value;

    if (candidateData?.length !== 0) {
      console.log("ala");
      const data: any = candidateData?.filter(
        (cd: { candidateId: any; addressId: any }) =>
          cd?.candidateId?.firstName
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.candidateId?.lastName
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.candidateId?.workType
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.candidateId?.createdAt
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.addressId[0]?.contactDetailId?.contactNumber
            ?.toString()
            ?.includes(value) ||
          cd?.addressId[0]?.city
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.addressId[0]?.state
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.addressId[0]?.contactDetailId?.email
            ?.toLowerCase()
            ?.includes(value.toLowerCase())
      );
      // console.log(' cd?.addressId[0]?.contactDetailId?.contactNumber: ', cd?.addressId[0]?.city)
      console.log("filteredData inside search: ", data);
      const candidateList = data?.map((candidate: any) => {
        const candidateName =
          candidate?.candidateId?.firstName +
          " " +
          candidate?.candidateId?.lastName;
        const workType = candidate?.candidateId?.workType;
        const addedDate = moment.utc(candidate?.createdAt).format("YYYY-MM-DD");
        const contactNumber =
          candidate?.addressId[0]?.contactDetailId?.contactNumber;
        const email = candidate?.addressId[0]?.contactDetailId?.email;
        const fullAddress =
          candidate?.addressId?.[0]?.city +
          ", " +
          candidate?.addressId?.[0]?.state;
        return {
          ...candidate,
          fullAddress,
          candidateName,
          workType,
          addedDate,
          contactNumber,
          email,
        };
      });
      console.log("candidateList: ", candidateList);
      setFilteredData(candidateList);
    } else {
      const candidateList = candidateData?.map((candidate: any) => {
        const candidateName =
          candidate?.candidateId?.firstName +
          " " +
          candidate?.candidateId?.lastName;
        const workType = candidate?.candidateId?.workType;
        const addedDate = moment.utc(candidate?.createdAt).format("YYYY-MM-DD");
        const contactNumber =
          candidate?.addressId[0]?.contactDetailId?.contactNumber;
        const email = candidate?.addressId[0]?.contactDetailId?.email;
        const fullAddress =
          candidate?.addressId?.[0]?.city +
          ", " +
          candidate?.addressId?.[0]?.state;
        return {
          ...candidate,
          fullAddress,
          candidateName,
          workType,
          addedDate,
          contactNumber,
          email,
        };
      });
      console.log("candidateList: ", candidateList);
      setFilteredData(candidateList);
    }
  };

  const showCandidate = (data: any) => {
    setSingleCandidateData(data);
    setOpen(true);
  };

  function deleteJob(id: any): void {
    // dispatch(deleteCandidateData(id));
    // setCount(true);
  }

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
  // const [data3, setData3] = useState<any>();
  // const [flag, setFlag] = useState<boolean>(false);
  // const [isAscending, setIsAscending] = useState(true);
  // const [isAscendingWorkType, setIsAscendingWorkType] = useState(true);
  // const [isAscendingDate, setIsAscendingDate] = useState(true);
  // console.log("data3", data3);

  const onPressAction = (rowData: any, type: any) => {
    console.log(rowData);
    console.log(type);
    if (type === "View") {
      dispatch(getCandidateBackgroundCheck(rowData?.candidateId.id));
      dispatch(getCandidateDocumentation(rowData?.candidateId.id));
      dispatch(getCandidateStartEndOperations(rowData?.candidateId.id));
      dispatch(getCandidateRateRevision(rowData?.candidateId.id));
      dispatch(getCandidate(rowData?.candidateId.id));
      navigate("/all-data?candidateId=" + rowData?.candidateId.id, {
        state: {
          candidateData: {
            candidateData: rowData?.candidateId,
            addressData: rowData?.addressId,
          },
          bgCheck: rowData?.candidateId?.backgroundCheckId,
          document: rowData?.candidateId?.documentationId,
          rateRevision: rowData?.candidateId?.rateRevisionId,
          startEndOperations: rowData?.candidateId?.startEndOperationId,
        },
      });
    } else if (type === "Delete") {
      // dispatch(deleteBgCheckData(rowData?.candidateId?.id));
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
          // Swal.fire('Saved!', '', 'success')
          dispatch(deleteBgCheckData(rowData?.candidateId?.id));
          dispatch(deleteDocumentationData(rowData?.candidateId?.id));
          dispatch(deleteStartEndOperationsData(rowData?.candidateId?.id));
          dispatch(deleteRateRevisionData(rowData?.candidateId?.id));
          dispatch(deleteCandidateData(rowData?.candidateId?.id));
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

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
              className="ml-[-13px] p-2 pl-10 block w-[35%] border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search for candidates"
              onChange={(event) => {
                // setFlag(false);
                filterResult(event);
              }}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-2">
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
      </div>
      {/* <div className="flex flex-col" style={{ height: "70vh" }}>
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className=" divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">

                            <div id="all-candidate" className="relative overflow-x-auto shadow-md sm:rounded-lg h-[70vh]">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-[14px] text-white divide-y bg-[#1976d2]"

                                    >
                                        <tr>
                                            <th
                                                style={{
                                                    position: "sticky", top: 0, zIndex: 5,
                                                    backgroundColor: "#1976d2"
                                                }}
                                                scope="col"
                                                className="px-2 py-1 border border-slate-300 text-center"
                                            >

                                                <div className="flex  m-auto w-[80%] align-middle pt-2 border-l-[#1976d2]">
                                                    <h1 className="">Candidate name</h1>
                                                    {isAscending ? (
                                                        <h1 onClick={sortingByName} className="mt-[-12px]"><ArrowDropUpIcon sx={{ fontSize: 40 }} /></h1>

                                                    ) : (
                                                        <h1 onClick={sortingByName} className="mt-[-13px]"><ArrowDropDownIcon sx={{ fontSize: 40 }} /></h1>
                                                    )}
                                                </div>
                                            </th>
                                            <th
                                                style={{
                                                    position: "sticky", top: 0, zIndex: 5, backgroundColor: "#1976d2"
                                                }}
                                                scope="col"
                                                className="px-2 py-1 border border-slate-300 text-center"
                                            >

                                                <div className="flex  m-auto w-[80%] align-middle pt-2">
                                                    <h1 className="">Work type</h1>
                                                    {isAscendingWorkType ? (
                                                        <h1 onClick={sortingByWorkType} className="mt-[-12px]"><ArrowDropUpIcon sx={{ fontSize: 40 }} /></h1>

                                                    ) : (
                                                        <h1 onClick={sortingByWorkType} className="mt-[-13px]"><ArrowDropDownIcon sx={{ fontSize: 40 }} /></h1>
                                                    )}
                                                </div>
                                            </th>
                                            <th
                                                style={{
                                                    position: "sticky", top: 0, zIndex: 5, backgroundColor: "#1976d2"
                                                }}
                                                scope="col"
                                                className="px-2 py-1 border border-slate-300 text-center"
                                            >

                                                <div className="flex  m-auto w-[80%] align-middle pt-2">
                                                    <h1 className="">Added date</h1>
                                                    {isAscendingDate ? (
                                                        <h1 onClick={sortingByDate} className="mt-[-12px]"><ArrowDropUpIcon sx={{ fontSize: 40 }} /></h1>

                                                    ) : (
                                                        <h1 onClick={sortingByDate} className="mt-[-13px]"><ArrowDropDownIcon sx={{ fontSize: 40 }} /></h1>
                                                    )}
                                                </div>
                                            </th>
                                            <th
                                                style={{
                                                    position: "sticky", top: 0, zIndex: 5, backgroundColor: "#1976d2"
                                                }}
                                                scope="col"
                                                className="px-2 py-1 border border-slate-300 text-center"
                                            >
                                                Address
                                            </th>
                                            <th
                                                style={{
                                                    position: "sticky", top: 0, zIndex: 5, backgroundColor: "#1976d2"
                                                }}
                                                scope="col"
                                                className="px-2 py-1 border border-slate-300 text-center"
                                            >
                                                Contact Number
                                            </th>
                                            <th
                                                style={{
                                                    position: "sticky", top: 0, zIndex: 5, backgroundColor: "#1976d2"
                                                }}
                                                scope="col"
                                                className="px-2 py-1 border border-slate-300 text-center"
                                            >
                                                Email
                                            </th>
                                            <th
                                                style={{
                                                    position: "sticky", top: 0, zIndex: 5, backgroundColor: "#1976d2"
                                                }}
                                                scope="col"
                                                className="px-2 py-1 border border-slate-300 text-center border-r-[#1976d2]"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {!flag
                                            ? filteredData?.map((ele: any, index: any) => (
                                                <tr>
                                                    <td className="border-b p-3 ml-3 border border-slate-300 text-center">
                                                        {ele?.candidateId?.firstName +
                                                            " " +
                                                            ele?.candidateId?.lastName}
                                                    </td>
                                                    <td className="border-b p-3 ml-3 border border-slate-300 text-center">
                                                        {ele?.candidateId?.workType}
                                                    </td>
                                                    <td className="border-b p-3 ml-3 border border-slate-300 text-center">
                                                        {moment.utc(ele?.candidateId?.createdAt).format('YYYY-MM-DD')}
                                                    </td>
                                                    <td className="border-b p-3 ml-3 border border-slate-300 text-center">
                                                        {ele?.addressId[0]?.city +
                                                            ", " +
                                                            ele?.addressId[0]?.state}
                                                    </td>
                                                    <td className="border-b p-3 ml-3 border border-slate-300 text-center">
                                                        {ele?.addressId[0]?.contactDetailId?.contactNumber}
                                                    </td>
                                                    <td className="border-b p-3 ml-3 border border-slate-300 text-center">
                                                        {ele?.addressId[0]?.contactDetailId?.email}
                                                    </td>

                                                    <td className="border-b border border-slate-300 text-center border-solid">
                                                        <Button className=""> Delete</Button>
                                                    </td>

                                                </tr>
                                            ))
                                            : data3?.map((ele: any, index: any) => (
                                                <tr>
                                                    <td className="border-b p-3 ml-3 border border-slate-300 text-center">
                                                        {ele?.candidateId?.firstName +
                                                            " " +
                                                            ele?.candidateId?.lastName}
                                                    </td>
                                                    <td className="border-b p-3 ml-3 border border-slate-300 text-center">
                                                        {ele?.candidateId?.workType}
                                                    </td>
                                                    <td className="border-b p-3 ml-3 border border-slate-300 text-center">
                                                        {moment.utc(ele?.candidateId?.createdAt).format('YYYY-MM-DD')}
                                                    </td>
                                                    <td className="border-b p-3 ml-3 border border-slate-300 text-center">
                                                        {ele?.addressId[0]?.city +
                                                            ", " +
                                                            ele?.addressId[0]?.state}
                                                    </td>
                                                    <td className="border-b p-3 ml-3 border border-slate-300 text-center">
                                                        {ele?.addressId[0]?.contactDetailId?.contactNumber}
                                                    </td>
                                                    <td className="border-b p-3 ml-3 border border-slate-300 text-center">
                                                        {ele?.addressId[0]?.contactDetailId?.email}
                                                    </td>

                                                    <td className="border-b border border-slate-300 text-center">
                                                        <Button className=""> Delete</Button>
                                                    </td>

                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
      <GenericTable
        showColumnLink={["fullAddress"]}
        // onClickRow={onClickRow}
        tableHeader={TABLE_HEAD}
        onPressAction={onPressAction}
        tableData={filteredData}
        // actionType={null}
        showCheckbox={false}
        showAvatar={false}
        actionType={["View", "Delete"]}
        // sortValue={""}
        loading={true}
        onPageChange={function (page: number): void {
          throw new Error("Function not implemented.");
        }}
        count={0}

        // loading={loading}
        // onSelectCheckbox={(selectedIds) => setSelectedUseDetails(selectedIds)}
        // count={course?.courseDetails?.count}
        // onPageChange={(activePageNo) => {
        //   getCourse(activePageNo);
        // }}
      />
      {/* <ShowJob open={open} setOpen={setOpen} data={singleJobData} showTableCount={setCount} /> */}
    </>
  );
};

export default HomepageScreen;
