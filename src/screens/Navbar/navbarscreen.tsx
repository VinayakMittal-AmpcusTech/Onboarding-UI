import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomPopover from "../../common/ProfileModal/ProfileModal";
import ProfileModal from "../../common/ProfileModal/ProfileModal";

interface Props {
  open: boolean;
  setOpen: any;
}

const NavBar: React.FC<Props> = ({ open, setOpen }) => {
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  let user: any = localStorage.getItem("user");
  user = JSON.parse(user);
  console.log("user: nav ", user);

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <div className="w-full flex justify-between items-center">
          <Typography variant="h6" noWrap component="div">
            Onboarding Tool
          </Typography>
          <Typography
            style={{ marginLeft: 0 }}
            className="cursor-pointer"
            variant="h6"
            noWrap
            component="div"
          >
            <div className="">
              <ProfileModal userInfo={{ user }} />
            </div>
          </Typography>
        </div>
        {/* <CustomPopover content={"undefined"} trigger={undefined} /> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
