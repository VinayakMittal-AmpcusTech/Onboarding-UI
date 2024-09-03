import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
// import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {
  allVendorData,
  deleteOnlyVendorData,
  deleteVendorData,
  vendorData,
} from "../../actions/vendor";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShowVendor from "./ShowIndividualVendor";
import Swal from "sweetalert2";
import { GenericTable } from "../../common/GenericTable/GenricTable";
import moment from "moment";
// import AddClientDetails from "./AddClient";
import AddVendor from "./AddVendor";
import { Modal } from "../../common/Modal/Modal";
import { Button } from "../../common/Button/Button";
import EditVendor from "./EditVendor";
import { deleteClientData } from "../../actions/client";
import { deleteContactData } from "../../actions/contact";

const TABLE_HEAD: any = [
  { label: "Company Name", key: "companyName" },
  { label: "Contact Person", key: "contactPerson" },
  { label: "Added date", key: "Addeddate" },
  { label: "Address", key: "Address" },
  { label: "Contact Number", key: "contactNumber" },
  { label: "Email", key: "email" },
  { label: "Action", key: "action" },
];

const ShowVendorTable: React.FC = () => {
  console.log("TABLE_HEAD: ", TABLE_HEAD);

  const dispatch = useAppDispatch();
  // const [open, setOpen] = useState(false);

  const vendorData = useAppSelector(
    (state: RootState) => state.vendor.allVendorData
  );
  let vendorDataRow = vendorData;
  console.log("vendordeteData", vendorData);

  const [filteredData, setFilteredData] = useState(vendorData);
  console.log("filteredData", filteredData);
  const [count, setCount] = useState(true);
  const [open, setOpen] = useState(false);
  const [singleVendorData, setSingleVendorData] = useState({});
  const [expanded, setExpanded] = useState<string | false>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setAddFlag(false);
    setEditFlag(false);
  };
  useEffect(() => {
    const venderList = vendorData?.map((venderdate: any) => {
      const companyName = venderdate?.vendorId?.companyName;
      console.log("companyName", companyName);
      const contactPerson = venderdate?.vendorId?.contactPerson;
      const Addeddate = moment
        .utc(venderdate?.addressId[0]?.createdAt)
        .format("YYYY-MM-DD");

      const Address =
        venderdate?.addressId[0]?.city + ", " + venderdate?.addressId[0]?.state;
      const contactNumber =
        venderdate?.addressId[0]?.contactDetailId?.contactNumber;
      const email = venderdate?.addressId[0]?.contactDetailId?.email;

      return {
        ...venderdate,
        companyName,
        contactPerson,
        Addeddate,
        Address,
        contactNumber,
        email,
      };
    });
    setFilteredData(venderList);
    if (count) {
      if (vendorData?.length !== 0) {
        setFilteredData(
          vendorData?.filter((cd: { venderdate: any }) =>
            cd?.venderdate?.companyName?.toLowerCase()?.includes("")
          )
        );
        setCount(false);
      }
    }
  }, [vendorData, count]);

  const filterResult = (event: any) => {
    setFilteredData(vendorDataRow);
    let value: string = event.target.value;

    if (vendorData?.length !== 0) {
      const data: any = vendorData?.filter(
        (cd: { vendorId: any; addressId: any }) =>
          cd?.vendorId?.companyName
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.vendorId?.contactPerson
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.addressId[0]?.contactDetailId?.createdAt
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.addressId[0]?.city
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.addressId[0]?.state
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.addressId[0]?.contactDetailId?.contactNumber
            ?.toString()
            ?.includes(value) ||
          cd?.addressId[0]?.contactDetailId?.email
            ?.toLowerCase()
            ?.includes(value.toLowerCase())
      );
      console.log("filteredData inside search: ", data);
      const venderList = data?.map((venderdate: any) => {
        const companyName = venderdate?.vendorId?.companyName;
        const contactPerson = venderdate?.vendorId?.contactPerson;
        const Addeddate = moment
          .utc(venderdate?.addressId[0]?.createdAt)
          .format("YYYY-MM-DD");

        const Address =
          venderdate?.addressId[0]?.city +
          ", " +
          venderdate?.addressId[0]?.state;
        const contactNumber =
          venderdate?.addressId[0]?.contactDetailId?.contactNumber;
        const email = venderdate?.addressId[0]?.contactDetailId?.email;

        return {
          ...venderdate,
          companyName,
          contactPerson,
          Addeddate,
          Address,
          contactNumber,
          email,
        };
      });
      setFilteredData(venderList);
      console.log("venderList if: ", venderList);
    } else {
      const venderList = vendorData?.map((venderdate: any) => {
        const companyName = venderdate?.vendorId?.companyName;
        const contactPerson = venderdate?.vendorId?.contactPerson;
        const Addeddate = moment
          .utc(venderdate?.addressId[0]?.createdAt)
          .format("YYYY-MM-DD");

        const Address =
          venderdate?.addressId[0]?.city +
          ", " +
          venderdate?.addressId[0]?.state;
        const contactNumber =
          venderdate?.addressId[0]?.contactDetailId?.contactNumber;
        const email = venderdate?.addressId[0]?.contactDetailId?.email;

        return {
          ...venderdate,
          companyName,
          contactPerson,
          Addeddate,
          Address,
          contactNumber,
          email,
        };
      });
      console.log("venderList else: ", venderList);
      setFilteredData(venderList);
    }
  };

  const [editData, setEditData] = useState<any>();
  const [addFlag, setAddFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

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
          // Swal.fire('Saved!', '', 'success')
          dispatch(deleteOnlyVendorData(rowData?.vendorId?.id));
          dispatch(deleteClientData(rowData?.addressId[0]?.personId));
          dispatch(
            deleteContactData(rowData?.addressId[0]?.contactDetailId?.id)
          );
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  return (
    <>
      <div
        style={{ display: "flex" }}
        className="flex flex-row overflow-auto"
        id="no-scroll-div"
      >
        <div
          style={{ borderRadius: "15px", marginBottom: "10px", width: "90%" }}
          className="py-3 px-4"
        >
          <div className="relative max-w ">
            <label htmlFor="hs-table-search" className="sr-only  ">
              Search
            </label>

            <input
              style={{ border: "0.5px solid gray" }}
              type="text"
              name="hs-table-search"
              id="hs-table-search"
              className="ml-[-13px] p-2 mt-[0px] pl-10 block w-[35%] border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search for vendors"
              onChange={(event) => filterResult(event)}
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
        <div
          style={{
            width: "10%",
            maxHeight: "100%",
            justifyContent: "center",
            alignContent: "center",
            // marginLeft: "-10px",
            marginLeft: "6px",
            marginRight: "6px",
          }}
        >
          <Button
            value="Add Vendor"
            className="mt-3 py-1 text-white bg-[#1976D2]"
            handleClick={() => {
              setShowModal(true);
              setAddFlag(true);
            }}
          />
          {addFlag && (
            <Modal
              children={<AddVendor setShowModal={setShowModal} />}
              modalStyle={{
                marginTop: "50px",
                overflow: "scroll",
                boxShadow: "initial",
                zIndex: "999px",
              }}
              showModalHeader={true}
              modalHeader={"Add Vendor"}
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
                <EditVendor setShowModal={setShowEditModal} data={editData} />
              }
              modalStyle={{
                marginTop: "50px",
                overflow: "scroll",
                boxShadow: "initial",
                zIndex: "999px",
              }}
              showModalHeader={true}
              modalHeader={"Edit Vendor"}
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
export default ShowVendorTable;
