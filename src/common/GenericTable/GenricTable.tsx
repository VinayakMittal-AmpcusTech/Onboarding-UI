import {
  Cog6ToothIcon,
  DocumentIcon,
  EyeIcon,
  LinkIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Bars3BottomLeftIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/solid";

import {
  Typography,
  Tooltip,
  Checkbox,
  Avatar,
} from "@material-tailwind/react";
import { sortBy } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
// import Pagination from './Pagination';
// import moment from 'moment-timezone';

interface TableColumn {
  key: string;
  label: string;
  index: number;
}

interface TableRow {
  _id?: string;
  profilePicture?: { url: string };
  userName?: string;
  isActive?: boolean;
  activeStatus?: boolean;
  startDate?: string;
  endDate?: string;
  gradeSubmissionDeadline?: string;
  [key: string]: any;
}

interface GenericTableProps {
  onSelectCheckbox?: (ids: string[]) => void;
  showAvatar?: boolean;
  onPressAction?: (rowData: TableRow, action: string) => void;
  onPressSort?: (key: string) => void;
  tableHeader: any;
  tableData: TableRow[];
  actionType: string[];
  showCheckbox: boolean;
  sortValue?: string;
  loading: boolean;
  onPageChange: (page: number) => void;
  count: number;
  showColumnLink: string[];
  onClickRow?: (key: string, rowData: TableRow) => void;
}

// function GenericTable({
//     onSelectCheckbox,
//     showAvatar = false,
//     onPressAction,
//     onPressSort,
//     tableHeader = [],
//     tableData: tableBody = [],
//     actionType = [],
//     showCheckbox = false,
//     sortValue,
//     loading = false,
//     onPageChange,
//     count = 0,
//     showColumnLink = [],
//     onClickRow,
// }: GenericTableProps) {
export const GenericTable: React.FC<GenericTableProps> = ({
  onSelectCheckbox,
  showAvatar,
  onPressAction,
  onPressSort,
  tableHeader,
  tableData,
  actionType,
  showCheckbox,
  sortValue,
  loading,
  onPageChange,
  count,
  showColumnLink,
  onClickRow,
}) => {
  const [sort, setSort] = useState<
    { key: string; value?: "asc" | "desc" } | undefined
  >(undefined);
  const [selectedCheckboxIds, setSelectedCheckboxIds] = useState<string[]>([]);
  const [tableDataState, setTableDataState] = useState<TableRow[]>(tableData);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (tableData?.length > 0) {
      if (sort) {
        const sortedList = sortBy(tableData, [sort.key]);
        if (sort.value === "desc") {
          setTableDataState(sortedList.reverse());
        } else {
          setTableDataState(sortedList);
        }
      } else {
        setTableDataState(tableData);
      }
    } else {
      setTableDataState([]);
    }
  }, [sort, tableData]);
  // console.log("tableData: ", tableData);

  const handleSelectedCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checkboxId = event.target.id;
    let data = [...selectedCheckboxIds];
    if (event.target.checked) {
      data.push(checkboxId);
    } else {
      const newSelectedUserId = data.filter((id) => id !== checkboxId);
      data = newSelectedUserId;
    }
    setSelectedCheckboxIds(data);
    onSelectCheckbox && onSelectCheckbox(data);
  };

  const getActionView = (rowData: TableRow) => {
    return (
      <div className="flex flex-row gap-1">
        {actionType.includes("Edit") && (
          <div
            className=""
            onClick={() => onPressAction && onPressAction(rowData, "Edit")}
          >
            <Tooltip content="Edit">
              <PencilSquareIcon className="w-6 h-6 text-blue-900" />
            </Tooltip>
          </div>
        )}
        {actionType.includes("Delete") && (
          <div
            className=""
            onClick={() => onPressAction && onPressAction(rowData, "Delete")}
          >
            <Tooltip content="Delete">
              <TrashIcon className="w-6 h-6 text-blue-900" />
            </Tooltip>
          </div>
        )}
        {actionType.includes("View") && (
          <div
            className=""
            onClick={() => onPressAction && onPressAction(rowData, "View")}
          >
            <Tooltip content="View">
              <EyeIcon className="w-6 h-6 text-blue-900" />
            </Tooltip>
          </div>
        )}
        {actionType.includes("Manage") && (
          <div
            className=""
            onClick={() => onPressAction && onPressAction(rowData, "Manage")}
          >
            <Tooltip content="Manage">
              <Cog6ToothIcon className="w-6 h-6 text-blue-900" />
            </Tooltip>
          </div>
        )}

        {actionType.includes("Document") && (
          <div
            className=""
            onClick={() => onPressAction && onPressAction(rowData, "Document")}
          >
            <Tooltip content="Document">
              <DocumentIcon className="w-6 h-6 text-blue-900" />
            </Tooltip>
          </div>
        )}

        {rowData?.attendees_id && actionType.includes("Link") && (
          <div
            className=""
            onClick={() => onPressAction && onPressAction(rowData, "Link")}
          >
            <Tooltip content="Link">
              <LinkIcon className="w-6 h-6 text-blue-900" />
            </Tooltip>
          </div>
        )}
      </div>
    );
  };

  const onSortClick = (key: string) => {
    let obj: { key: string; value?: "asc" | "desc" } = { key };
    if (sort && sort.key === key) {
      if (!sort.value) {
        obj.value = "asc";
      } else {
        if (sort.value === "asc") {
          obj.value = "desc";
        } else if (sort.value === "desc") {
          obj = undefined as any;
        }
      }
    } else {
      obj = { key, value: "asc" };
    }
    setSort(obj);
  };

  const getSortIcon = (key: string) => {
    if (sort && sort.key === key) {
      if (sort.value === "asc")
        return (
          <BarsArrowUpIcon
            strokeWidth={10}
            className="h-4 w-4"
            color={"#000000"}
          />
        );
      else if (sort.value === "desc")
        return (
          <BarsArrowDownIcon
            strokeWidth={4}
            className="h-4 w-4"
            color={"#000000"}
          />
        );
      else return <Bars3BottomLeftIcon strokeWidth={2} className="h-4 w-4" />;
    } else {
      return <Bars3BottomLeftIcon strokeWidth={2} className="h-4 w-4" />;
    }
  };

  const dateColumn = ["startDate", "endDate", "gradeSubmissionDeadline"];

  const getDateFormat = (date: string | undefined) => {
    if (!date) return "--";
    return moment(date).format("MM/DD/YYYY");
  };

  return (
    <div className="max-w-[100vw] min-w-[50vw] overflow-auto xl:mt-2 2xl:mt-5 ">
      {!loading && tableDataState?.length === 0 ? (
        <div className="w-full flex flex-row justify-center items-center ">
          <NoSymbolIcon
            strokeWidth={4}
            className="h-12 w-12 mr-4 fill-blue-gray-100 "
            color={"fill-blue-gray-100"}
          />
          <Typography className="text-2xl text-blue-gray-100 font-semibold ">
            No Data Found
          </Typography>
        </div>
      ) : (
        ///// table head and body//////
        <>
          <table className="table-auto w-full min-h-[300px] ">
            <tbody className=" divide-y divide-grey-100  w-full bg-white flex flex-col  overflow-y-scroll items-center justify-between max-h-[72vh] xl:max-h-[57vh]">
              <tr className="flex w-full sticky top-0 bg-[#1262ab]">
                {tableHeader?.map((head: any, index: any) => (
                  <th
                    key={head.key}
                    onClick={() => onSortClick(head.key)}
                    className={`cursor-pointer ${
                      head.index < tableHeader?.length - 1 ? "border-r-2" : ""
                    } border-x-blue-gray-200  bg-[#1262ab] p-4 w-full over ${
                      head.index === 0 ? "rounded-tl-none" : ""
                    } ${
                      head.index === tableHeader.length - 1
                        ? "rounded-tr-lg"
                        : " hover:bg-blue-gray-600"
                    }`}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none text-white truncate"
                    >
                      {head.label}
                      {head.index !== tableHeader?.length - 1 &&
                        getSortIcon(head.key)}
                    </Typography>
                  </th>
                ))}
              </tr>
              {tableDataState?.length > 0 ? (
                tableDataState?.map((data, index) => {
                  const classes =
                    "border-b border-x border-blue-gray-50  flex flex-row w-full items-center h-[60px] ";

                  /////////////table body//////////////

                  return (
                    <tr className="flex w-full  bg-[#fff] " key={index}>
                      {tableHeader?.map((head: any, indexChild: any) =>
                        head.key !== "action" ? (
                          <td
                            className={`truncate max-w-[50%] border-b  border-x border-blue-gray-50  flex flex-row w-full items-center h-[60px] ${
                              showColumnLink.includes(head.key)
                                ? "cursor-pointer"
                                : ""
                            }`}
                            key={indexChild}
                            onClick={() =>
                              showColumnLink.includes(head.key)
                                ? onClickRow && onClickRow(head.key, data)
                                : {}
                            }
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className={`${
                                showColumnLink.includes(head.key)
                                  ? "font-normal ml-4 flex  items-center hover:border-blue-900 hover:cursor-pointer "
                                  : "font-normal ml-4 flex  items-center"
                              }`}
                            >
                              {indexChild === 0 && (
                                <>
                                  {showCheckbox && (
                                    <Checkbox
                                      className="justify-start"
                                      id={data?._id || ""}
                                      checked={selectedCheckboxIds.includes(
                                        data._id || ""
                                      )}
                                      onChange={handleSelectedCheckbox}
                                    />
                                  )}
                                  {showAvatar && (
                                    <>
                                      {data?.profilePicture?.url ? (
                                        <Avatar
                                          size="lg"
                                          variant="circular"
                                          className="w-[40px] h-[40px] rounded-full mr-2 ml-1"
                                          src={data.profilePicture?.url}
                                          alt="candice wu"
                                        />
                                      ) : (
                                        <div className="flex w-[40px] h-[40px] rounded-full mr-2 ml-1 bg-blue-700 justify-center items-center text-white font-medium text-2xl">
                                          {data?.userName
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                        </div>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                              {head.key === "isActive" ||
                              head.key === "activeStatus" ? (
                                data[head.key] === true ? (
                                  <div className="text-[#1B5E20] bg-[#4CAF5033] rounded-md px-2 py-1 font-medium">
                                    Active
                                  </div>
                                ) : (
                                  <div className="text-white bg-[#f0303033] rounded-md px-2 py-1 font-medium">
                                    Deactive
                                  </div>
                                )
                              ) : dateColumn.includes(head.key) ? (
                                getDateFormat(data[head.key])
                              ) : data[head.key] ? (
                                data[head.key]
                              ) : data[head.key] === 0 ? (
                                0
                              ) : (
                                "--"
                              )}
                            </Typography>
                          </td>
                        ) : (
                          actionType.length > 0 && (
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal pl-4"
                              >
                                {getActionView(data)}
                              </Typography>
                            </td>
                          )
                        )
                      )}
                    </tr>
                  );
                })
              ) : (
                <p
                  className="!border-none"
                  style={{ fontSize: "16px", color: "red", marginTop: "10%" }}
                >
                  No record found
                </p>
              )}
            </tbody>
          </table>
          <div className="xl:mr-4 mt-2 mr-7">
            {tableDataState?.length > 0 && (
              <div className="w-full flex items-end content-end justify-end cursor-pointer xl:mt-1"></div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

// export default GenericTable;
