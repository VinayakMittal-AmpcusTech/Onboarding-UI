import React from "react";
import SideBar from "./sidebar";

interface Props {
  open: boolean;
  setOpen: any;
}

const SideBarScreen: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <>
      <SideBar open={open} setOpen={setOpen} />
    </>
  );
};

export default SideBarScreen;
