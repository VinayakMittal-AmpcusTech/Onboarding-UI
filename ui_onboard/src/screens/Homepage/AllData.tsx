import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import {
  getCandidate,
  getImportantCandidateData,
} from "../../actions/candidate";
import { RootState } from "../../redux/store";
import ShowDocumentation from "../Documentation/ShowIndividualDocumentation";
import { Modal } from "../../common/Modal/Modal";
import ShowBackgroundCheck from "../BackgroundCheck/ShowIndividualBackgroundCheck";
import ShowRateRevision from "../RateRevision/ShowIndividualRateRevision";
import ShowCandidate from "../Candidate/ShowIndividualCandidate";

import ShowCandidateClient from "../Client/ShowCandidateClient";
import { getCandidateRateRevision } from "../../actions/raterevision";
import { getCandidateStartEndOperations } from "../../actions/startendoperations";
import { getCandidateDocumentation } from "../../actions/documentation";
import { getCandidateBackgroundCheck } from "../../actions/backgroundCheck";
import moment from "moment";
import { Typography } from "@material-tailwind/react";
import "../../../src/screens/Homepage/Alldata.css";
import ShowStartEndOperations from "../StartEndOperations/ShowIndividualStartEndOperations";

export const AllData: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let bgData = useAppSelector(
    (state: RootState) => state?.backgroundCheck?.singleBackgroundCheckData
  );
  console.log("bgData: ", bgData);
  let docData = useAppSelector(
    (state: RootState) => state?.documentation?.singleDocumentationData
  );
  let startEndData = useAppSelector(
    (state: RootState) => state?.startEndOperations?.singleStartEndOperationData
  );
  let rateData = useAppSelector(
    (state: RootState) => state?.rateRevision?.singleRateRevisionData
  );
  let candidateAddressData = useAppSelector(
    (state: RootState) => state?.candidate?.singleCandidateData
  );
  console.log("candidateAddressData: ", candidateAddressData);
  let candidateData: any = candidateAddressData?.candidateData?.candidateId;
  console.log("candidateData: checking ", candidateData);
  let addressData = candidateAddressData?.candidateData?.addressId[0];
  console.log("addressData: ", addressData);

  const [int, setInt] = useState(1);

  useEffect(() => {
    let id = window.location.href;
    id = id.substring(id.lastIndexOf("=") + 1, id.length);
    console.log("id: ", id);
    dispatch(getCandidateBackgroundCheck(+id));
    dispatch(getCandidateDocumentation(+id));
    dispatch(getCandidateStartEndOperations(+id));
    dispatch(getCandidateRateRevision(+id));
    dispatch(getCandidate(+id));
    // dispatch(getReffers(+id));
  }, []);

  // const handleChange =
  //   (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
  //     setExpanded(isExpanded ? panel : false);
  //     // setFlag(!flag);
  //   };

  // const showVendor = (data: any) => {
  //   // setSingleVendorData(data);
  //   setOpen(true);
  //   setShowAddressModal(true);
  // };

  useEffect(() => {
    console.log("candidateData?.id: ", candidateData?.id);
    dispatch(getImportantCandidateData(candidateData?.id));
    // dispatch(getCandidate(candidateData?.id));
  }, [candidateAddressData]);

  let importantCandidateData: any = useAppSelector(
    (state: RootState) => state.candidate.importantCandidateData
  );
  console.log("importantCandidateData: ", importantCandidateData);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(true);

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const handleAddressCloseModal = () => {
  //   setShowAddressModal(false);
  // };

  const editButton = () => {
    setOpen(true);
    setShowModal(true);
  };

  return (
    <>
      {/* <div>
        <ul className="flex m-auto w-[100%]">
          <li
            className={
              int == 1
                ? "w-[25%]  bg-white text-black p-1 rounded-t-xl border-solid border-[1px] border-gray-400"
                : "w-[25%] bg-[#1976D2] text-white p-1 rounded-t-xl"
            }
            // className='bg-blue-400 text-white p-1 rounded-t-xl'
            onClick={() => {
              // navigate("/background-data")
              setInt(1);
            }}
          >
            Candidate details
          </li>
          <li
            className={
              int == 2
                ? "w-[25%]  bg-white text-black p-1 rounded-t-xl border-solid border-[1px] border-gray-400"
                : "w-[25%] bg-[#1976D2] text-white p-1 rounded-t-xl"
            }
            // className='bg-blue-400 text-white p-1 rounded-t-xl'
            onClick={() => {
              // navigate("/background-data")
              setInt(2);
            }}
          >
            Background Check Data
          </li>
          <li
            className={
              int == 3
                ? "w-[25%] bg-white text-black p-1 rounded-t-xl border-solid border-[1px] border-gray-400"
                : "w-[25%] bg-[#1976D2] text-white p-1 rounded-t-xl"
            }
            // className='bg-blue-400 text-white p-1 rounded-t-xl'
            onClick={() => {
              // navigate("/document-data")
              setInt(3);
            }}
          >
            Documentation Data
          </li>
          <li
            className={
              int == 4
                ? "w-[25%] bg-white text-black p-1 rounded-t-xl border-solid border-[1px] border-gray-400"
                : "w-[25%] bg-[#1976D2] text-white p-1 rounded-t-xl"
            }
            // className='bg-blue-400 text-white p-1 rounded-t-xl'
            onClick={() => {
              // navigate("/start-end-data")
              setInt(4);
            }}
          >
            Start End Operations Data
          </li>
          <li
            className={
              int == 5
                ? "w-[25%] bg-white text-black p-1 rounded-t-xl border-solid border-[1px] border-gray-400"
                : "w-[25%] bg-[#1976D2] text-white p-1 rounded-t-xl"
            }
            // className='bg-blue-400 text-white p-1 rounded-t-xl'
            onClick={() => {
              // navigate("/rate-data")
              setInt(5);
            }}
          >
            Rate Revision Data
          </li>
          <li
            className={
              int == 6
                ? "w-[25%] bg-white text-black p-1 rounded-t-xl border-solid border-[1px] border-gray-400"
                : "w-[25%] bg-[#1976D2] text-white p-1 rounded-t-xl"
            }
            // className='bg-blue-400 text-white p-1 rounded-t-xl'
            onClick={() => {
              // navigate("/rate-data")
              setInt(6);
            }}
          >
            Other Data
          </li>
        </ul>
      </div> */}

      <div className="flex m-auto w-[100%] ">
        <div className="container">
          <div className="arrow-steps clearfix">
            <div
              className={int === 1 ? "step current1" : "step current"}
              onClick={() => {
                setInt(1);
              }}
            >
              {" "}
              <Typography variant="h3">Candidate Details</Typography>
            </div>
            <div
              className={int === 2 ? "step current1" : "step current"}
              onClick={() => {
                setInt(2);
              }}
            >
              <Typography variant="h3">Background Check </Typography>
            </div>

            <div
              className={int === 3 ? "step current1" : "step current"}
              onClick={() => {
                setInt(3);
              }}
            >
              <Typography variant="h3">Documentation </Typography>
            </div>
            <div
              className={int === 4 ? "step current1" : "step current"}
              onClick={() => {
                setInt(4);
              }}
            >
              <Typography variant="h3">Start End Operations </Typography>
            </div>
            <div
              className={int === 5 ? "step current1" : "step current"}
              onClick={() => {
                setInt(5);
              }}
            >
              <Typography variant="h3">Rate Revision </Typography>
            </div>
            <div
              className={int === 7 ? "step current1" : "step current"}
              onClick={() => {
                setInt(7);
              }}
            >
              <Typography variant="h3">Referral Details </Typography>
            </div>
            <div
              className={
                int === 6
                  ? "step current1"
                  : "step current border-solid border-[1px]"
              }
              onClick={() => {
                setInt(6);
              }}
            >
              <Typography variant="h3">Other Data</Typography>
            </div>
          </div>
        </div>
      </div>

      {int == 1 && (
        <>
          <div className="flex gap-5 shadow-2xl px-10 h-[72vh]">
            <div
              id="no-scroll-div"
              className="relative w-[100%] mt-10 h-[60vh] overflow-auto "
            >
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      <span>Personal Details</span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">
                      <span>First name</span>
                    </td>
                    <td className="px-6 py-0">{candidateData?.firstName}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Middle name</td>
                    <td className="px-6 py-4">{candidateData?.middleName}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Last name</td>
                    <td className="px-6 py-4">{candidateData?.lastName}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">
                      Work authorization
                    </td>
                    <td className="px-6 py-4">
                      {
                        candidateAddressData?.workAuthorizationData
                          ?.workAuthorization
                      }
                    </td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">
                      Work authorization expiry date
                    </td>
                    <td className="px-6 py-4">
                      {moment
                        .utc(candidateData?.workAuthorizationExpiryDate)
                        .format("YYYY-MM-DD")}
                    </td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Email</td>
                    <td className="px-6 py-4">
                      {addressData?.contactDetailId?.email}
                    </td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Contract type</td>
                    <td className="px-6 py-4">
                      {candidateAddressData?.contractTypeData?.contractType}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              id="no-scroll-div"
              className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
            >
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      <span>Communication Details</span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">
                      <span>Line 1 </span>
                    </td>
                    <td className="px-6 py-0">{addressData?.line1}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Line 2</td>
                    <td className="px-6 py-4">{addressData?.line2}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">City</td>
                    <td className="px-6 py-4">{addressData?.city}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">State</td>
                    <td className="px-6 py-4">{addressData?.state}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Zip code</td>
                    <td className="px-6 py-4">{addressData?.zipCode}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Country</td>
                    <td className="px-6 py-4">{addressData?.country}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Contact Number</td>
                    <td className="px-6 py-4">
                      {addressData?.contactDetailId?.contactNumber}
                    </td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Fax Number</td>
                    <td className="px-6 py-4">
                      {addressData?.contactDetailId?.faxNumber}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {int == 2 && (
        <div className="flex gap-5 shadow-2xl px-10 h-[72vh]">
          <div
            id="no-scroll-div"
            className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <span>Initial Details</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    <span>Adjustment status</span>
                  </td>
                  <td className="px-6 py-0">{bgData?.BGCAdjuStatus}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Affidavit on</td>
                  <td className="px-6 py-4">{bgData?.BGCAffidavitOn}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Affidavit status</td>
                  <td className="px-6 py-4">{bgData?.BGCAffidavitStatus}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Primary charges</td>
                  <td className="px-6 py-4">{bgData?.BGCChargesPrimary}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Completed on</td>
                  <td className="px-6 py-4">{bgData?.BGCCompletedOn}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Initiated on</td>
                  <td className="px-6 py-4">{bgData?.BGCInitiatedOn}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Invoice month</td>
                  <td className="px-6 py-4">{bgData?.BGCInvoiceMonth}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Package 1</td>
                  <td className="px-6 py-4">{bgData?.BGCPackage1}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Package 2</td>
                  <td className="px-6 py-4">{bgData?.BGCPackage2}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Remarks</td>
                  <td className="px-6 py-4">{bgData?.BGCRemark}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Report status</td>
                  <td className="px-6 py-4">{bgData?.BGCReportStatus}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Status</td>
                  <td className="px-6 py-4">{bgData?.BGCStatus}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Adjust supporting docs
                  </td>
                  <td className="px-6 py-4">{bgData?.adjuSupportingDocs}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            id="no-scroll-div"
            className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <span>Other Details</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Case Id 1</td>
                  <td className="px-6 py-4">{bgData?.caseID1}</td>
                </tr>
                {/* <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                    <td className='px-6 py-4'>Created at</td>
                                    <td className='px-6 py-4'>{bgData?.createdAt}</td>
                                </tr> */}
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Date of adjudication
                  </td>
                  <td className="px-6 py-4">{bgData?.dateOfAdjudication}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Final Report</td>
                  <td className="px-6 py-4">{bgData?.finalBGCReport}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Primary initiated through
                  </td>
                  <td className="px-6 py-4">
                    {bgData?.primaryBGCInitiatedThru}
                  </td>
                </tr>
                {bgData?.secondary && bgData?.caseID2 ? (
                  <>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">Case Id 2</td>
                      <td className="px-6 py-4">{bgData?.caseID2}</td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        Secondary charges
                      </td>
                      <td className="px-6 py-4">
                        {bgData?.secondaryBGCCharges}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        Secondary initiated on
                      </td>
                      <td className="px-6 py-4">
                        {bgData?.secondaryBGCInitiatedOn}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        Secondary initiated through
                      </td>
                      <td className="px-6 py-4">
                        {bgData?.secondaryBGCInitiatedThru}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        Secondary invoice month
                      </td>
                      <td className="px-6 py-4">
                        {bgData?.secondaryBGCInvoiceMonth}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        Secondary Package 1
                      </td>
                      <td className="px-6 py-4">
                        {bgData?.secondaryBGCPackage1}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        Secondary Package 2
                      </td>
                      <td className="px-6 py-4">
                        {bgData?.secondaryBGCPackage2}
                      </td>
                    </tr>
                  </>
                ) : null}
                {bgData?.tertiary && bgData?.caseID3 ? (
                  <>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">Case Id 3</td>
                      <td className="px-6 py-4">{bgData?.caseID3}</td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        Tertiary BGC Charges
                      </td>
                      <td className="px-6 py-4">
                        {bgData?.tertiaryBGCCharges}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        Tertiary BGC Initiated On
                      </td>
                      <td className="px-6 py-4">
                        {bgData?.tertiaryBGCInitiatedOn}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        Tertiary BGC Initiated Thru
                      </td>
                      <td className="px-6 py-4">
                        {bgData?.tertiaryBGCInitiatedThru}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        Tertiary BGC Invoice Month
                      </td>
                      <td className="px-6 py-4">
                        {bgData?.tertiaryBGCInvoiceMonth}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        Tertiary BGC Package 1
                      </td>
                      <td className="px-6 py-4">
                        {bgData?.tertiaryBGCPackage1}
                      </td>
                    </tr>
                    <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-semibold">
                        Tertiary BGC Package 2
                      </td>
                      <td className="px-6 py-4">
                        {bgData?.tertiaryBGCPackage2}
                      </td>
                    </tr>
                  </>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* ------------------------------- */}
      {int == 3 && (
        <div className="flex gap-5 shadow-2xl px-10 h-[72vh]">
          <div
            id="no-scroll-div"
            className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <span>Initial Details</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>CIPCICICA or CIPCICU</span>
                  </td>
                  <td className="px-6 py-0">{docData?.CIPCICICAOrCIPCICU}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    E-verification Date
                  </td>
                  <td className="px-6 py-4">{docData?.E_verificationDate}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">E-verify</td>
                  <td className="px-6 py-4">{docData?.E_verify}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">I9 form</td>
                  <td className="px-6 py-4">{docData?.I9Form}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">MSA</td>
                  <td className="px-6 py-4">{docData?.MSA}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">SOW</td>
                  <td className="px-6 py-4">{docData?.SOW}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">SOW validity</td>
                  <td className="px-6 py-4">{docData?.SOWValidity}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Task order expiry date
                  </td>
                  <td className="px-6 py-4">{docData?.TaskOrderExpiryDate}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Articles or certificate of incorporation
                  </td>
                  <td className="px-6 py-4">
                    {docData?.articlesOrCertificateOFIncorporation}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Certificate of insurance or COI
                  </td>
                  <td className="px-6 py-4">
                    {docData?.certificateOFInsuranceOrCOI}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Certificate of insurance
                  </td>
                  <td className="px-6 py-4">
                    {docData?.certificationOfInsurance}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Client task order or sow
                  </td>
                  <td className="px-6 py-4">{docData?.clientTaskOrderOrSOW}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Client task order or sow st
                  </td>
                  <td className="px-6 py-4">
                    {docData?.clientTaskOrderOrSOWst}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Client task order signing
                  </td>
                  <td className="px-6 py-4">
                    {docData?.clientTaskOrderSigning}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            id="no-scroll-div"
            className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <span>Other Details</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                    <td className='px-6 py-4'>Created at</td>
                                    <td className='px-6 py-4'>{docData?.createdAt}</td>
                                </tr> */}
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Direct deposit agreement
                  </td>
                  <td className="px-6 py-4">
                    {docData?.directDepositAgreement}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Documentation completion date
                  </td>
                  <td className="px-6 py-4">
                    {docData?.documentationCompletionDate}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Documentation remark
                  </td>
                  <td className="px-6 py-4">{docData?.documentationRemark}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Documentation status
                  </td>
                  <td className="px-6 py-4">{docData?.documentationStatus}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Emergency form</td>
                  <td className="px-6 py-4">{docData?.emergencyForm}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Good standing document
                  </td>
                  <td className="px-6 py-4">{docData?.goodStandingDocument}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">List A document</td>
                  <td className="px-6 py-4">{docData?.listADocument}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">List B document</td>
                  <td className="px-6 py-4">{docData?.listBDocument}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">List C document</td>
                  <td className="px-6 py-4">{docData?.listCDocument}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Vaccination status
                  </td>
                  <td className="px-6 py-4">{docData?.vaccinationStatus}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Void check or email content
                  </td>
                  <td className="px-6 py-4">
                    {docData?.voidCheckOrEmailContent}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">W9 or W4</td>
                  <td className="px-6 py-4">{docData?.w9Orw4}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Work authorization document
                  </td>
                  <td className="px-6 py-4">
                    {docData?.workAuthorizationDocument}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --------------------- */}
      {int == 4 && (
        <div className="flex gap-5 shadow-2xl px-10 h-[72vh]">
          <div
            id="no-scroll-div"
            className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <span>Initial Details</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Associate director</span>
                  </td>
                  <td className="px-6 py-0">{startEndData?.assoDirector}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Center Head</td>
                  <td className="px-6 py-4">{startEndData?.centerHead}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">CRM</td>
                  <td className="px-6 py-4">{startEndData?.crm}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">End date</td>
                  <td className="px-6 py-4">{startEndData?.endDate}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">End reason</td>
                  <td className="px-6 py-4">{startEndData?.endReason}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">End remarks</td>
                  <td className="px-6 py-4">{startEndData?.endRemarks}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Exit clearance</td>
                  <td className="px-6 py-4">{startEndData?.exitClearance}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">FF invoice status</td>
                  <td className="px-6 py-4">{startEndData?.ffInvoiceStatus}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Full time salary offered
                  </td>
                  <td className="px-6 py-4">
                    {startEndData?.fullTimeSalaryOffered}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Gross BR</td>
                  <td className="px-6 py-4">{startEndData?.grossBr}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Health benefits cost
                  </td>
                  <td className="px-6 py-4">{startEndData?.hBenefitesCost}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Opted for health benefits
                  </td>
                  <td className="px-6 py-4">{startEndData?.hBenefitesOpted}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Job level</td>
                  <td className="px-6 py-4">{startEndData?.jobLevel}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Joining status</td>
                  <td className="px-6 py-4">{startEndData?.joiningStatus}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Joining status remarks
                  </td>
                  <td className="px-6 py-4">
                    {startEndData?.joiningStatusRemark}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            id="no-scroll-div"
            className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <span>Other Details</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Joining type</td>
                  <td className="px-6 py-4">{startEndData?.joiningType}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Margin</td>
                  <td className="px-6 py-4">{startEndData?.margin}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">MSP fee</td>
                  <td className="px-6 py-4">{startEndData?.mspFee}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    MSP Fee percentage
                  </td>
                  <td className="px-6 py-4">
                    {startEndData?.mspFeePercentage}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Net bill rate</td>
                  <td className="px-6 py-4">{startEndData?.netBillRate}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Net purchase</td>
                  <td className="px-6 py-4">{startEndData?.netPurchase}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Onboarding coordinator
                  </td>
                  <td className="px-6 py-4">{startEndData?.onboCoordinator}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Onsite account director
                  </td>
                  <td className="px-6 py-4">
                    {startEndData?.onsiteAccDirector}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Pay rate</td>
                  <td className="px-6 py-4">{startEndData?.payRate}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Recruiter</td>
                  <td className="px-6 py-4">{startEndData?.recruiter}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Referral fee</td>
                  <td className="px-6 py-4">{startEndData?.refFee}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Senior manager</td>
                  <td className="px-6 py-4">{startEndData?.seniorManager}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Tax OH</td>
                  <td className="px-6 py-4">{startEndData?.taxOH}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Tax OH percentage</td>
                  <td className="px-6 py-4">{startEndData?.taxOHPercentage}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Team lead</td>
                  <td className="px-6 py-4">{startEndData?.teamLead}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Team manager</td>
                  <td className="px-6 py-4">{startEndData?.teamManager}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* ---------------------------------------- */}
      {int == 5 && (
        <div className="flex gap-5 shadow-2xl px-10 h-[72vh]">
          <div
            id="no-scroll-div"
            className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <span>Initial Details</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Gross BR</td>
                  <td className="px-6 py-4">{rateData?.grossBr}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Health benefits</td>
                  <td className="px-6 py-4">{rateData?.healthB}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Margin</td>
                  <td className="px-6 py-4">{rateData?.margin}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">MSP fee</td>
                  <td className="px-6 py-4">{rateData?.mspFee}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    MSP fee percentage
                  </td>
                  <td className="px-6 py-4">{rateData?.mspFeePercentage}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Net bill rate</td>
                  <td className="px-6 py-4">{rateData?.netBillRate}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            id="no-scroll-div"
            className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <span>Other Details</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Net purchase</td>
                  <td className="px-6 py-4">{rateData?.netPurchase}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Opted for health benefits
                  </td>
                  <td className="px-6 py-4">{rateData?.optedForHB}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Pay rate</td>
                  <td className="px-6 py-4">{rateData?.payRate}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    Rate revision reason
                  </td>
                  <td className="px-6 py-4">{rateData?.rateRevisionReason}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Referral fee</td>
                  <td className="px-6 py-4">{rateData?.refFee}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Tax OH</td>
                  <td className="px-6 py-4">{rateData?.taxOH}</td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">Tax OH percentage</td>
                  <td className="px-6 py-4">{rateData?.taxOHPercentage}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {int == 6 && (
        <div className="inline-grid grid-cols-3 gap-4">
          {/* <div className="flex gap-5 shadow-2xl px-10 h-[72vh]"> */}

          <div
            id="no-scroll-div"
            className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <span className="whitespace-nowrap">Client Details</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Client name</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData.clientData?.clientData?.clientName}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>End client name</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {
                      importantCandidateData?.clientData?.clientData
                        ?.endClientName
                    }
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>MSP name</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData?.clientData?.clientData?.mspName}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Email</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {
                      importantCandidateData?.clientData?.addressData[0]
                        ?.addressId[0]?.contactDetailId.email
                    }
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Contact Number</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {
                      importantCandidateData?.clientData?.addressData[0]
                        ?.addressId[0].contactDetailId.contactNumber
                    }
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Fax Number</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {
                      importantCandidateData?.clientData?.addressData[0]
                        ?.addressId[0].contactDetailId.faxNumber
                    }
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Address</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData?.clientData?.addressData[0]
                      ?.addressId[0].line1 +
                      ", " +
                      importantCandidateData?.clientData?.addressData[0]
                        ?.addressId[0].line2 +
                      ", " +
                      importantCandidateData?.clientData?.addressData[0]
                        ?.addressId[0].city +
                      ", " +
                      importantCandidateData?.clientData?.addressData[0]
                        ?.addressId[0].state +
                      ", " +
                      importantCandidateData?.clientData?.addressData[0]
                        ?.addressId[0].country}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            id="no-scroll-div"
            className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <span className="whitespace-nowrap">Job Details</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Job title</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData?.jobData?.jobTitle}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Job Description</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData?.jobData?.jobDescription}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Job Description</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData?.jobData?.jobDivaID}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Job diva id</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData?.jobData?.jobDivaID}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Job diva id</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData?.jobData?.jobType}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Line of business</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData?.jobData?.lineOfBusiness}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Request Id</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData?.jobData?.requestID}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            id="no-scroll-div"
            className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    <span className="whitespace-nowrap">Vendor Details</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Company name</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData.vendorData?.vendorData?.companyName}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Contract person</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {
                      importantCandidateData?.vendorData?.vendorData
                        ?.contactPerson
                    }
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Federal Id</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData?.vendorData?.vendorData?.federalId}
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Sign authority</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {
                      importantCandidateData?.vendorData?.vendorData
                        ?.signAuthority
                    }
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Sign authority designation</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {
                      importantCandidateData?.vendorData?.vendorData
                        ?.signAuthorityDesignation
                    }
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>State of incorporation</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {
                      importantCandidateData?.vendorData?.vendorData
                        ?.stateOfIncorporation
                    }
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Email</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {
                      importantCandidateData?.vendorData?.addressData[0]
                        ?.addressId[0]?.contactDetailId.email
                    }
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Contact Number</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {
                      importantCandidateData?.vendorData?.addressData[0]
                        ?.addressId[0].contactDetailId.contactNumber
                    }
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Fax Number</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {
                      importantCandidateData?.vendorData?.addressData[0]
                        ?.addressId[0].contactDetailId.faxNumber
                    }
                  </td>
                </tr>
                <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-semibold">
                    <span>Address</span>
                  </td>
                  <td className="px-6 py-0" style={{ width: "50%" }}>
                    {importantCandidateData?.vendorData?.addressData[0]
                      ?.addressId[0].line1 +
                      ", " +
                      importantCandidateData?.vendorData?.addressData[0]
                        ?.addressId[0].line2 +
                      ", " +
                      importantCandidateData?.vendorData?.addressData[0]
                        ?.addressId[0].city +
                      ", " +
                      importantCandidateData?.vendorData?.addressData[0]
                        ?.addressId[0].state +
                      ", " +
                      importantCandidateData?.vendorData?.addressData[0]
                        ?.addressId[0].country}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {int == 7 && (
        <>
          <div className="flex gap-5 shadow-2xl px-10 h-[72vh]">
            <div
              id="no-scroll-div"
              className="relative w-[100%] mt-10 h-[60vh] overflow-auto "
            >
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      <span>Personal Details</span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">
                      <span>First name</span>
                    </td>
                    <td className="px-6 py-0">{candidateData?.firstName}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Middle name</td>
                    <td className="px-6 py-4">{candidateData?.middleName}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Last name</td>
                    <td className="px-6 py-4">{candidateData?.lastName}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">
                      Work authorization
                    </td>
                    <td className="px-6 py-4">
                      {
                        candidateAddressData?.workAuthorizationData
                          ?.workAuthorization
                      }
                    </td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">
                      Work authorization expiry date
                    </td>
                    <td className="px-6 py-4">
                      {moment
                        .utc(candidateData?.workAuthorizationExpiryDate)
                        .format("YYYY-MM-DD")}
                    </td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Email</td>
                    <td className="px-6 py-4">
                      {addressData?.contactDetailId?.email}
                    </td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Contract type</td>
                    <td className="px-6 py-4">
                      {candidateAddressData?.contractTypeData?.contractType}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              id="no-scroll-div"
              className="relative w-[100%] mt-10 h-[60vh] overflow-auto"
            >
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs sticky top-0 text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      <span>Communication Details</span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">
                      <span>Line 1 </span>
                    </td>
                    <td className="px-6 py-0">{addressData?.line1}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Line 2</td>
                    <td className="px-6 py-4">{addressData?.line2}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">City</td>
                    <td className="px-6 py-4">{addressData?.city}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">State</td>
                    <td className="px-6 py-4">{addressData?.state}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Zip code</td>
                    <td className="px-6 py-4">{addressData?.zipCode}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Country</td>
                    <td className="px-6 py-4">{addressData?.country}</td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Contact Number</td>
                    <td className="px-6 py-4">
                      {addressData?.contactDetailId?.contactNumber}
                    </td>
                  </tr>
                  <tr className="bg-[#f8f8f8dd] border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-semibold">Fax Number</td>
                    <td className="px-6 py-4">
                      {addressData?.contactDetailId?.faxNumber}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <Modal
        children={
          int == 1 ? (
            <ShowCandidate
              int={1}
              open={open}
              setOpen={setOpen}
              data2={candidateAddressData}
              showTableCount={setCount}
              setShowModal={setShowModal}
            />
          ) : int == 2 ? (
            <ShowBackgroundCheck
              int={2}
              open={open}
              setOpen={setOpen}
              data={location?.state}
              showTableCount={setCount}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          ) : int == 3 ? (
            <ShowDocumentation
              int={3}
              open={open}
              setOpen={setOpen}
              data={location?.state}
              showTableCount={setCount}
              setShowModal={setShowModal}
            />
          ) : int == 4 ? (
            <ShowStartEndOperations
              int={4}
              open={open}
              setOpen={setOpen}
              data={location?.state}
              showTableCount={setCount}
              setShowModal={setShowModal}
            />
          ) : int == 5 ? (
            <ShowRateRevision
              int={5}
              open={open}
              setOpen={setOpen}
              data={location?.state}
              showTableCount={setCount}
              setShowModal={setShowModal}
            />
          ) : int == 6 ? (
            <ShowCandidateClient
              int={candidateData?.id}
              open={open}
              setOpen={setOpen}
              data={importantCandidateData?.clientData}
              showTableCount={setCount}
              setShowModal={setShowModal}
            />
          ) : (
            // <ShowRateRevision
            <ShowCandidate
              int={1}
              open={open}
              setOpen={setOpen}
              data2={candidateAddressData}
              showTableCount={setCount}
              setShowModal={setShowModal}
            />
          )
        }
        modalStyle={
          int === 6
            ? { marginTop: "50px", overflow: "scroll", boxShadow: "initial" }
            : { marginTop: "50px", overflow: "scroll", boxShadow: "initial" }
        }
        showModalHeader={true}
        modalHeader={"Update Data"}
        isFlexible={true}
        topRightCloseButtonID={"x-  "}
        showModal={showModal}
        showBackButton={true}
        showBBPSLogo={true}
        handleBackClick={handleCloseModal}
      ></Modal>
      <div
        style={{
          position: "relative",
        }}
      >
        <button
          style={{
            position: "absolute",
            backgroundColor: "#1976D2",
            color: "white",
            borderRadius: "50%",
            paddingTop: "8px",
            padding: "10px",
            bottom: "-20px",
            right: "0px",
          }}
          onClick={() => {
            editButton();
          }}
        >
          <EditIcon />
        </button>
      </div>
    </>
  );
};
