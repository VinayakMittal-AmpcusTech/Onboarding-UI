// import { Popover } from "@headlessui/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import PopoverComponent from "../Popover";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FloatLabel } from "../FloatLabel/FloatLabel";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "../TextField/TextField";

const profIcon = <AccountCircleIcon sx={{ fontSize: 30 }} />;
interface Props {
  userInfo: any;
}
const ProfileModal: React.FC<Props> = ({ userInfo }) => {
  const [show, setShow] = useState<boolean>(false);

  const navigate = useNavigate();

  let user: any = localStorage.getItem("user");
  user = JSON.parse(user);
  console.log("user: nav ", user);

  return (
    <PopoverComponent
      button={profIcon}
      className="ml-[-24px] border border-solid bg-gray-50"
    >
      <div className="p-2 w-52 h-80 ">
        <div className="flex flex-col justify-center space-y-4 ">
          <div className="flex flex-col justify-center items-center ">
            <img
              // src="data:image/jpeg;base64,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"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsmfBDCVvtjGb-4V1QGHn-ikuY1-D5t2Ub1cT6UT1YLg&s"
              className=" w-20 h-20  rounded-full  "
              //
              alt="ProfilePicture"
            />
          </div>
          <div className="flex flex-row">
            <div className=" font-bold">Frist name:</div>

            <div className="ml-3">{user?.firstName}</div>
          </div>
          <div className="flex flex-row">
            <div className=" font-bold">Last name:</div>

            <div className="ml-3">{user?.lastName}</div>
          </div>
          <div className="flex flex-row">
            <div className=" font-bold">Email:</div>

            <div className="ml-3">{user?.email}</div>
          </div>

          <div className="flex flex-row">
            <div className=" font-bold">Role:</div>

            <div className="ml-3">{user?.role}</div>
          </div>
          <div className="flex flex-row">
            <div className=" font-bold">Username:</div>

            <div className="ml-3">{user?.username}</div>
          </div>

          <div className="w-full flex justify-center items-center gap-2">
            <Button
              variant="filled"
              className="h-8 py-2 px-3 bg-[#1976db]"
              onClick={() => {
                Swal.fire({
                  title: "Do you really want to log out ?",
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
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/sign-in");
                  } else if (result.isDenied) {
                    // Swal.fire('Changes are not saved', '', 'info')
                  }
                });
              }}
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </PopoverComponent>
  );
};
export default ProfileModal;
