import React from "react";
import NavBar from "./navbarscreen";

interface Props {
  open: boolean;
  setOpen: any;
}

const NavBarScreen: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <>
      <NavBar open={open} setOpen={setOpen} />
    </>
  );
};

export default NavBarScreen;
