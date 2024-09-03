import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { TextField } from "../../common/TextField/TextField";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import {
  ArticlesOfIncorporationList,
  CertificateOfInsuranceList,
  CipcicaCipcicuList,
  ClientTaskOrderOrSOWList,
  ClientTaskOrderOrSOWStepList,
  ClientTaskOrderSigningList,
  DirectDepositeAgreementList,
  DocumentationStatusList,
  EVerifyList,
  EemergencyFormList,
  GoodStandingDocumentationList,
  I9FormList,
  ListADocumentsList,
  ListBDocumentsList,
  ListCDocumentsList,
  MSAList,
  SOWList,
  VaccinationStatusList,
  VoidCheckEmailList,
  W9W4List,
  WorkAuthorizeDocumentationList,
  yesNoList,
} from "../../constants/constants";
import Select from "react-select";
import { Modal } from "../../common/Modal/Modal";
import { DropDown } from "../../common/DropDown/DropDown";
import { DatePicker } from "../../common/DatePicker/DatePicker";
import moment from "moment";
import { Button } from "../../common/Button/Button";
import { editRaterevisionData } from "../../actions/raterevision";
import { RootState } from "../../redux/store";
import {
  editCandidateClientData,
  editCandidateJobData,
  editCandidateVendorData,
} from "../../actions/candidate";
import { getVendorDataByCandidateId } from "../../actions/vendor";
import { useSelector } from "react-redux";

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

interface Props {
  open: any;
  setOpen: any;
  data: any;
  showTableCount: any;
  int: any;
  setShowModal: any;
}

const ShowCandidateClient: React.FC<Props> = ({
  open,
  setOpen,
  data,
  showTableCount,
  int,
  setShowModal,
}) => {
  console.log("data: ", data);

  const dispatch = useAppDispatch();
  let candidateClientdata = useAppSelector(
    (state: RootState) => state?.candidate?.importantCandidateData?.clientData
  );
  console.log("candidateClientdata: ", candidateClientdata);
  let candidateJobdata = useAppSelector(
    (state: RootState) => state?.candidate?.importantCandidateData?.jobData
  );
  let candidateVendorData = useAppSelector(
    (state: RootState) => state?.candidate?.importantCandidateData?.vendorData
  );
  console.log("candidateVendorData: ", candidateVendorData);

  // let candidateReferralData = useSelector(
  //   (state: RootState) => state?.candidate?.referralData
  // );
  // console.log("candidateReferralData: ", candidateReferralData);

  const [companyName, setCompanyName] = React.useState({
    value: candidateVendorData?.vendorData?.companyName,
    label: candidateVendorData?.vendorData?.companyName,
  });

  const [jobTitle, setJobTitle] = React.useState({
    value: candidateJobdata?.jobTitle,
    label: candidateJobdata?.jobTitle,
  });
  const [clientName, setClientName] = React.useState({
    value: candidateClientdata?.clientData?.clientName,
    label: candidateClientdata?.clientData?.clientName,
  });

  console.log("companyName: ", companyName);
  console.log("clientName: ", clientName);
  console.log("jobTitle: ", jobTitle);

  const allClientData = useAppSelector(
    (state: RootState) => state.client.allClientData
  );
  let allClientName: any[] = [];
  let clientOptions: any[] = [];
  if (allClientData.length !== 0) {
    allClientData.map((a: any) => {
      a?.addressId.map((b: any) => {
        let data = {
          label: a?.clientId.clientName + " (" + b.city + "/" + b.state + ")",
          value: {
            clientId: a?.clientId.id,
            clientName: a?.clientId.clientName,
            endClientName: a?.clientId.endClientName,
            MSPName: a?.clientId.mspName,
            contactNumber: b.contactDetailId.contactNumber,
            email: b.contactDetailId.email,
            faxNumber: b.contactDetailId.faxNumber,
            line1: b?.line1,
            line2: b?.line2,
            city: b?.city,
            state: b?.state,
            zipCode: b?.zipCode,
            country: b?.country,
          },
        };
        allClientName.push(data);
        let optionsData = {
          label: a?.clientId.clientName,
          value: a?.clientId.clientName,
        };
        clientOptions.push(optionsData);
      });
    });
  }
  console.log("allClientName: ", allClientName);

  const allJobData = useAppSelector((state: RootState) => state.job.allJobData);
  let allJobName: any[] = [];
  let jobOptions: any[] = [];
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
        let optionsData = {
          label: a.jobTitle,
          value: a.jobTitle,
        };
        jobOptions.push(optionsData);
      }
    );
  }
  console.log("allJobName: ", allJobName);

  const allVendorData = useAppSelector(
    (state: RootState) => state.vendor.allVendorData
  );
  let allVendorName: any[] = [];
  let vendorOptions: any[] = [];

  if (allVendorData.length !== 0) {
    allVendorData.map((a: any) => {
      a?.addressId.map((b: any) => {
        let data = {
          label: a.vendorId.companyName,
          value: {
            id: a.vendorId.id,
            companyName: a.vendorId.companyName,
            federalId: a.vendorId.federalId,
            contactPerson: a.vendorId.contactPerson,
            email: b.contactDetailId.email,
            contactNumber: b.contactDetailId.contactNumber,
            faxNumber: b.contactDetailId.faxNumber,
            signAuthority: a.vendorId.signAuthority,
            signAuthorityDesignation: a.vendorId.signAuthorityDesignation,
            stateOfIncorporation: a.vendorId.stateOfIncorporation,
            line1: b.line1,
            line2: b.line2,
            city: b.city,
            zipCode: b.zipCode,
            state: b.state,
            country: b.country,
          },
        };
        allVendorName.push(data);
        let optionsData = {
          label: a.vendorId.companyName,
          value: a.vendorId.companyName,
        };
        vendorOptions.push(optionsData);
      });
    });
  }
  console.log("allVendorName: ", allVendorName);

  React.useEffect(() => {
    dispatch(getVendorDataByCandidateId(int));
    // setClientName(candidateClientdata?.clientData?.clientName)
    // setJobTitle(candidateJobdata?.jobTitle);
    // setCompanyName(candidateVendorData?.companyName);
  }, [candidateClientdata, clientName]);

  const VendorDataByCandidateId = useAppSelector(
    (state: RootState) => state.vendor.getVendorDataByCandidateId
  );
  console.log("VendorDataByCandidateId: ", VendorDataByCandidateId);

  function updateCandidateClient() {
    for (let i = 0; i < allClientName.length; i++) {
      if (allClientName[i].value?.clientName == clientName?.value) {
        console.log("int: ", int);
        let obj = {
          id: int,
          clientId: allClientName[i].value?.clientId,
        };
        dispatch(editCandidateClientData(obj));
      }
    }

    for (let i = 0; i < allJobName.length; i++) {
      if (allJobName[i].value?.jobTitle == jobTitle?.value) {
        dispatch(getVendorDataByCandidateId(int));

        let obj = {
          id: int,
          jobId: allJobName[i]?.value?.id,
        };
        dispatch(editCandidateJobData(obj));
      }
    }

    for (let i = 0; i < allVendorName.length; i++) {
      if (allVendorName[i].value?.companyName == companyName?.value) {
        console.log("int: ", int);
        let obj = {
          id: int,
          vendorId: allVendorName[i]?.value?.id,
          candidateVendorId: VendorDataByCandidateId?.id,
        };
        dispatch(editCandidateVendorData(obj));
      }
    }
    setShowModal(false);
  }

  return (
    <div className="">
      <div
        id="no-scroll-div"
        className="relative w-[100%] mt-2 shadow-2xl overflow-auto"
      >
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <span>Client Name</span>
              </td>
              <td className="px-6 py-0">
                <Select
                  menuPosition="fixed"
                  options={clientOptions}
                  value={clientName}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  onChange={(e: any) => {
                    setClientName(e);
                    console.log("clientName: ", clientName);
                  }}
                  isSearchable={true}
                />
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <span>Job title</span>
              </td>
              <td className="px-6 py-0">
                <Select
                  menuPosition="fixed"
                  options={jobOptions}
                  value={jobTitle}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  onChange={(e: any) => {
                    // displayClientData(e.value);
                    // onClientValueChange("clientName", e);
                    setJobTitle(e);
                    console.log("jobTitle: ", jobTitle);
                  }}
                  isSearchable={true}
                />
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                <span>Vendor Name</span>
              </td>
              <td className="px-6 py-0">
                <Select
                  menuPosition="fixed"
                  options={vendorOptions}
                  value={companyName}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  onChange={(e: any) => {
                    setCompanyName(e);
                    console.log("companyName: ", companyName);
                  }}
                  isSearchable={true}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="m-auto w-[20%] ml-[38%] py-2 text-white ">
          <Button
            className=""
            value="update"
            handleClick={() => {
              updateCandidateClient();
            }}
            styles={{ fontSize: "16px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowCandidateClient;
