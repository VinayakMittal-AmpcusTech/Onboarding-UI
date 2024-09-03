import { MouseEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
// import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {
  allClientData,
  deleteClientData,
  deleteOnlyClientData,
} from "../../actions/client";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShowClient from "./ShowIndividualClient";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GenericTable } from "../../common/GenericTable/GenricTable";
import AddClientDetails from "./AddClient";
import { Modal } from "../../common/Modal/Modal";
import { Button } from "../../common/Button/Button";
import EditClientDetails from "./EditClient";
import moment from "moment";
import Swal from "sweetalert2";
import { deleteContactData } from "../../actions/contact";

const TABLE_HEAD: any = [
  { label: "Client Name", key: "clientName" },
  { label: "End client name", key: "endClientName" },
  { label: "Added date", key: "Addeddate" },
  { label: "Address", key: "Address" },
  { label: "Contact Number", key: "contactNumber" },
  { label: "Email", key: "email" },
  { label: "Action", key: "action" },
];

const ShowClientTable: React.FC = () => {
  console.log("TABLE_HEAD: ", TABLE_HEAD);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  let clientData = useAppSelector(
    (state: RootState) => state.client.allClientData
  );
  let clientDataRow = clientData;
  console.log("clientDataRow", clientDataRow);

  const [filteredData, setFilteredData] = useState(clientData);
  console.log("filteredData", filteredData);
  const [count, setCount] = useState(true);
  const [singleClientData, setSingleClientData] = useState({});
  const [expanded, setExpanded] = useState<string | false>(false);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [editData, setEditData] = useState<any>();
  const [addFlag, setAddFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowEditModal(false);
    setAddFlag(false);
    setEditFlag(false);
  };

  useEffect(() => {
    const clientList = clientData?.map((clientdate: any) => {
      const clientName = clientdate?.clientId?.clientName;
      const endClientName = clientdate?.clientId?.endClientName;
      const Address =
        clientdate?.addressId[0]?.city + ", " + clientdate?.addressId[0]?.state;

      const Addeddate = moment
        .utc(clientdate?.addressId[0]?.contactDetailId?.createdAt)
        .format("YYYY-MM-DD");
      const contactNumber =
        clientdate?.addressId[0]?.contactDetailId?.contactNumber;
      const email = clientdate?.addressId[0]?.contactDetailId?.email;

      return {
        ...clientdate,
        Address,
        endClientName,
        Addeddate,
        clientName,
        contactNumber,
        email,
      };
    });
    setFilteredData(clientList);
    if (count) {
      if (clientData?.length !== 0) {
        setFilteredData(
          clientData?.filter((cd: { clientdate: any }) =>
            cd?.clientdate?.clientName?.toLowerCase()?.includes("")
          )
        );
        setCount(false);
      }
    }
  }, [clientData, count, editData]);

  const filterResult = (event: any) => {
    // debugger;
    setFilteredData(clientDataRow);
    let value: string = event.target.value;

    if (clientData?.length !== 0) {
      const data: any = clientData?.filter(
        (cd: { clientId: any; addressId: any }) =>
          cd?.clientId?.clientName
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.clientId?.endClientName
            ?.toLowerCase()
            ?.includes(value.toLowerCase()) ||
          cd?.addressId[0]?.contactDetailId?.createdAt
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
          cd?.addressId[0].contactDetailId?.contactNumber
            ?.toString()
            ?.includes(value) ||
          cd?.addressId[0].contactDetailId?.email
            ?.toLowerCase()
            ?.includes(value.toLowerCase())
      );
      console.log("filteredData inside search: ", data);
      const clientList = data?.map((clientdate: any) => {
        const clientName = clientdate?.clientId?.clientName;
        const endClientName = clientdate?.clientId?.endClientName;
        const Addeddate = moment
          .utc(clientdate?.addressId[0]?.contactDetailId?.createdAt)
          .format("YYYY-MM-DD");
        const contactNumber =
          clientdate?.addressId[0]?.contactDetailId?.contactNumber;
        const email = clientdate?.addressId[0]?.contactDetailId?.email;
        const Address =
          clientdate?.addressId[0].city +
          ", " +
          clientdate?.addressId[0]?.state;
        return {
          ...clientdate,
          Address,
          endClientName,
          Addeddate,
          clientName,
          contactNumber,
          email,
        };
      });

      setFilteredData(clientList);
      console.log("clientList: ", clientList);
    } else {
      const candidateList = clientData?.map((clientdate: any) => {
        const clientName = clientdate?.clientId?.clientName;
        const endClientName = clientdate?.clientId?.endClientName;
        const Addeddate = moment
          .utc(clientdate?.addressId[0]?.contactDetailId?.createdAt)
          .format("YYYY-MM-DD");
        const contactNumber =
          clientdate?.addressId[0]?.contactDetailId?.contactNumber;
        const email = clientdate?.addressId[0]?.contactDetailId?.email;
        const Address =
          clientdate?.addressId[0]?.city +
          ", " +
          clientdate?.addressId[0]?.state;
        return {
          ...clientdate,
          Address,
          endClientName,
          Addeddate,
          clientName,
          contactNumber,
          email,
        };
      });

      console.log("candidateList: ", candidateList);
      setFilteredData(candidateList);
    }
  };

  const showClient = (data: any) => {
    setSingleClientData(data);
    setOpen(true);
  };

  function deleteClientAddress(personId: any): void {
    dispatch(deleteClientData(personId));
    setCount(true);
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

  const onPressAction = (rowData: any, type: any) => {
    // console.log('rowData: ', rowData);
    // console.log(rowData);
    console.log(type);
    console.log("...............", rowData?.addressId[0]?.personId);
    setEditData(rowData);
    console.log("EditData: ", editData);

    if (type == "Edit") {
      setShowEditModal(true);
      setShowModal(true);
      setEditFlag(true);
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
          dispatch(deleteOnlyClientData(rowData?.addressId[0]?.personId));
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
              className="ml-[-13px] p-2 mt-[1px] pl-10 block w-[35%] border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search for clients"
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
            marginLeft: "3px",
            marginRight: "3px",
          }}
        >
          <Button
            value="Add Client"
            className="mt-3 py-1 text-white bg-[#1976D2]"
            handleClick={() => {
              setShowModal(true);
              setAddFlag(true);
            }}
          />
          {addFlag && (
            <Modal
              children={<AddClientDetails setShowModal={setShowModal} />}
              modalStyle={{
                marginTop: "50px",
                overflow: "scroll",
                boxShadow: "initial",
                zIndex: "999px",
              }}
              showModalHeader={true}
              modalHeader={"Add Client"}
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
                <EditClientDetails
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
              modalHeader={"Edit Client"}
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
        tableHeader={TABLE_HEAD}
        onPressAction={onPressAction}
        tableData={filteredData}
        showCheckbox={false}
        showAvatar={false}
        actionType={["Edit", "Delete"]}
        loading={true}
        onPageChange={function (page: number): void {
          throw new Error("Function not implemented.");
        }}
        count={0}
      />
    </>
  );
};

export default ShowClientTable;
