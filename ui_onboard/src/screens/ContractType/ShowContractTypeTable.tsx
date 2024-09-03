import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";

import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShowContractType from "./ShowIndividualContractType";
import {
  contractTypeData,
  deleteContractTypeData,
} from "../../actions/contractType";
import { GenericTable } from "../../common/GenericTable/GenricTable";
import Swal from "sweetalert2";
import { Button } from "../../common/Button/Button";
import { Modal } from "../../common/Modal/Modal";
import AddContractType from "./AddContractType";
import EditContractType from "./EditContractType";

const TABLE_HEAD: any = [
  { label: "Contract Type", key: "contractType" },
  { label: "Action", key: "action" },
];

const ShowContractTypeTable: React.FC = () => {
  console.log("TABLE_HEAD: ", TABLE_HEAD);

  const dispatch = useAppDispatch();
  let contractTypeData = useAppSelector(
    (state: RootState) => state.contractType.allContractTypeData
  );
  let contractTypeDataRow = contractTypeData;
  const [open, setOpen] = useState(false);
  const [singleContractTypeData, setSingleContractTypeData] = useState({});
  const [filteredData, setFilteredData] = useState(contractTypeData);
  console.log("filteredData", filteredData);
  const [count, setCount] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setSingleContractTypeData(false);
    setShowEditModal(false);
    setAddFlag(false);
    setEditFlag(false);
  };
  useEffect(() => {
    const contactList = contractTypeData.map((contactdate: any) => {
      const contractType = contactdate?.contractType;

      return {
        ...contactdate,
        contractType,
      };
    });
    setFilteredData(contactList);

    if (count) {
      if (contractTypeData?.length !== 0) {
        setFilteredData(
          contractTypeData?.filter((cd: { contactdate: any }) =>
            cd?.contactdate?.contactName?.toLowerCase()?.includes("")
          )
        );
        setCount(false);
      }
    }
  }, [contractTypeData, count]);

  const filterResult = (event: any) => {
    setFilteredData(contractTypeDataRow);
    let value: string = event.target.value;

    if (contractTypeData?.length !== 0) {
      const data: any = contractTypeData?.filter((ele: any) =>
        ele?.contractType?.toLowerCase()?.includes(value.toLowerCase())
      );
      console.log("filteredData inside search: ", data);

      const contactList = data?.map((contactdate: any) => {
        const contractType = contactdate?.contractType;

        return {
          ...contactdate,
          contractType,
        };
      });
      setFilteredData(contactList);
      console.log("contactList: ", contactList);
    } else {
      const contactList = contractTypeData?.map((contactdate: any) => {
        const contractType = contactdate?.contractType;

        return {
          ...contactdate,
          contractType,
        };
      });
      console.log("contactList: ", contractTypeData);
      setFilteredData(contactList);
    }
  };

  // const onPressAction = (rowData: any, type: any) => {
  //     console.log(rowData);
  //     console.log(type);
  // };
  const [editData, setEditData] = useState<any>();
  const [addFlag, setAddFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const onPressAction = (rowData: any, type: any) => {
    console.log("rowData:: ", rowData);
    console.log(type);
    if (type == "Edit") {
      setShowEditModal(true);
      setEditFlag(true);
      setEditData(rowData);
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
          dispatch(deleteContractTypeData(rowData?.id));
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
              className="ml-[-13px] mt-[5px] p-2 pl-10 block w-[35%] border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search for contract types"
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
            width: "16%",
            maxHeight: "100%",
            justifyContent: "center",
            alignContent: "left",
            marginTop: "10px",
            // marginLeft: "150px",
          }}
        >
          <Button
            value="Add contract type"
            className="mt-3  text-white"
            handleClick={() => {
              setShowModal(true);
              setAddFlag(true);
            }}
          />
          {addFlag && (
            <Modal
              children={<AddContractType setShowModal={setShowModal} />}
              modalStyle={{
                marginTop: "50px",
                overflow: "scroll",
                boxShadow: "initial",
                zIndex: "999px",
              }}
              showModalHeader={true}
              modalHeader={"Add contract type"}
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
                <EditContractType
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
              modalHeader={"Edit contract type"}
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

export default ShowContractTypeTable;
