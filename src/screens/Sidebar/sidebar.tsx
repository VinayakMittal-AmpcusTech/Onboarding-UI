import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/app";
import { candidateData } from "../../actions/candidate";
import { allClientData, clientData } from "../../actions/client";
import { allVendorData, vendorData } from "../../actions/vendor";
import { referralData } from "../../actions/referral";
import { allJobData, jobData } from "../../actions/job";
import { rateRevisionData } from "../../actions/raterevision";
import { backgroundCheck } from "../../actions/backgroundCheck";
import { startEndOperationsData } from "../../actions/startendoperations";
import { documentation } from "../../actions/documentation";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BusinessIcon from "@mui/icons-material/Business";
import StorefrontIcon from "@mui/icons-material/Storefront";
import WorkIcon from "@mui/icons-material/Work";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { allWorkAuthorizationData } from "../../actions/workAuthorization";
import { allContractTypeData } from "../../actions/contractType";
import LogoutIcon from "@mui/icons-material/Logout";
import { signIn } from "../../actions/user";
import Swal from "sweetalert2";

const drawerWidth = 240;

interface Props {
  open: boolean;
  setOpen: any;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SideBar: React.FC<Props> = ({ open, setOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);
  console.log("path: ", path);

  const list = [
    "Display candidates",
    "Add new candidates",
    "Show clients",
    "Show vendors",
    "Show jobs",
    "Miscellaneous",
  ];
  const listIcon = [
    <PersonIcon />,
    <PersonAddIcon />,
    <BusinessIcon />,
    <StorefrontIcon />,
    <WorkIcon />,
    <MiscellaneousServicesIcon />,
  ];
  const listNavigate = [
    "/home-page",
    "/add-candidate",
    "/show-clients",
    "/show-vendors",
    "/show-jobs",
    "/miscellaneous",
  ];

  const navigation = (index: number) => {
    if (listNavigate[index] === "/add-candidate") {
      dispatch(candidateData());
      dispatch(clientData());
      dispatch(vendorData());
      dispatch(referralData());
      dispatch(jobData());
      dispatch(rateRevisionData());
      dispatch(backgroundCheck());
      dispatch(startEndOperationsData());
      dispatch(documentation());
    }
    if (listNavigate[index] === "/show-clients") {
      dispatch(allClientData());
    }
    if (listNavigate[index] === "/show-jobs") {
      dispatch(allJobData());
    }
    if (listNavigate[index] === "/show-vendors") {
      dispatch(allVendorData());
    }
    if (listNavigate[index] === "/miscellaneous") {
      dispatch(allWorkAuthorizationData());
      dispatch(allContractTypeData());
    }
    return listNavigate[index];
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const image = require("../../Assets/icon.png");

  return (
    <Drawer className="!sm:hidden" variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <div className="w-full flex justify-between items-center">
              <span className="text-sm">
                <OnboradingLogo />
              </span>
              <ChevronLeftIcon />
            </div>
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {list.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            // sx={{ display: 'block' }}
            sx={
              path === listNavigate[index]
                ? { bgcolor: "#1976D2", color: "white", display: "block" }
                : { display: "block" }
            }
            button
            component={Link}
            to={navigation(index)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                // sx={{
                //   minWidth: 0,
                //   mr: open ? 3 : 'auto',
                //   justifyContent: 'center',
                // }}
                sx={
                  path === listNavigate[index]
                    ? {
                        color: "white",
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }
                    : {
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }
                }
              >
                {listIcon[index]}
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              {/* <a href={navigation(index)}>{text}</a> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div
        className="flex gap-6 pl-[20px]"
        onClick={() => {
          // localStorage.removeItem("token");
          // localStorage.removeItem("user");
          // navigate("/sign-in");

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
        <LogoutIcon style={{ color: "#6C6C6C" }} />
        {open && "Log out"}
      </div>
    </Drawer>
  );
};

export default SideBar;

export const OnboradingLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="170.98335999999995"
      viewBox="2.6 -34.6 290.92999999999995 45.1"
      height="44.020104952741015"
      data-palette-color="#1976d2"
    >
      <path
        d="M20.1-7L20.1-7Q21.8-7 23.03-8.5 24.25-10 24.78-12.2 25.3-14.4 25.3-16.9L25.3-16.9Q25.3-19.45 24.75-21.73 24.2-24 22.98-25.6 21.75-27.2 20.1-27.2L20.1-27.2Q18.5-27.2 17.3-25.6 16.1-24 15.5-21.7 14.9-19.4 14.9-16.9L14.9-16.9Q14.9-14.4 15.48-12.2 16.05-10 17.28-8.5 18.5-7 20.1-7ZM28.95-1.68Q25 0.3 20.08 0.3 15.15 0.3 11.23-1.68 7.3-3.65 4.95-7.6 2.6-11.55 2.6-16.9L2.6-16.9Q2.6-25 7.48-29.78 12.35-34.55 20.1-34.55 27.85-34.55 32.75-29.78 37.65-25 37.65-16.9L37.65-16.9Q37.65-11.55 35.27-7.6 32.9-3.65 28.95-1.68ZM57.45-4.15L57.4-13.45Q57.4-16.25 55.2-16.25L55.2-16.25Q54.15-16.25 53.47-15.38 52.8-14.5 52.7-13.05L52.7-13.05 52.7-5.35Q52.7-2.3 51.45-1.15 50.2 0 47.05 0L47.05 0Q44.1 0 43.02-1.38 41.95-2.75 41.95-5.9L41.95-5.9 41.95-18.2Q41.95-20.75 43.32-22.3 44.7-23.85 47-23.85L47-23.85Q48.9-23.85 50.2-23.3 51.5-22.75 52.15-21.4L52.15-21.4Q56.05-23.95 61.65-23.95L61.65-23.95Q65.2-23.95 66.77-21.15 68.35-18.35 68.35-11.95L68.35-11.95Q68.35-8.8 68.2-6.83 68.05-4.85 67.72-3.43 67.4-2 66.7-1.3 66-0.6 65.07-0.3 64.15 0 62.7 0L62.7 0Q59.9 0 58.67-1.05 57.45-2.1 57.45-4.15L57.45-4.15ZM83.9-28.65L83.9-21.8Q87.2-24.25 91.05-24.25L91.05-24.25Q94.95-24.25 97.55-20.95 100.15-17.65 100.15-12.6L100.15-12.6Q100.15-6.5 96.2-3.08 92.25 0.35 85.95 0.35L85.95 0.35Q82.09 0.35 79.22-0.75 76.34-1.85 74.72-4.05 73.09-6.25 73.05-9.35L73.05-9.35 72.95-28.2Q72.95-31.3 74.45-32.75 75.95-34.2 78.45-34.2L78.45-34.2Q81.25-34.2 82.57-32.88 83.9-31.55 83.9-28.65L83.9-28.65ZM83.95-7.65L83.95-7.65Q84.84-5.95 86.45-5.95L86.45-5.95Q87.8-5.95 88.55-7.65 89.3-9.35 89.3-11.55L89.3-11.55Q89.3-12.75 89.09-13.9 88.9-15.05 88.55-15.98 88.2-16.9 87.65-17.48 87.09-18.05 86.4-18.05L86.4-18.05Q84.84-18.05 83.95-16.2L83.95-16.2Q83.95-15.55 83.95-12.48 83.95-9.4 83.95-7.65ZM120.44-11.85L120.44-11.85Q120.44-14.45 119.79-16.43 119.14-18.4 117.89-18.4L117.89-18.4Q117.04-18.4 116.39-17.4 115.74-16.4 115.44-14.95 115.14-13.5 115.14-11.85L115.14-11.85Q115.14-9.3 115.84-7.38 116.54-5.45 117.84-5.45 119.14-5.45 119.79-7.35 120.44-9.25 120.44-11.85ZM117.84 0.35L117.84 0.35Q113.94 0.35 110.82-1.05 107.69-2.45 105.82-5.25 103.94-8.05 103.94-11.8L103.94-11.8Q103.94-17.5 107.84-20.85 111.74-24.2 117.84-24.2 123.94-24.2 127.79-20.85 131.64-17.5 131.64-11.8L131.64-11.8Q131.64-6.15 127.72-2.9 123.79 0.35 117.84 0.35ZM144.79 0.3L144.79 0.3Q140.84 0.3 138.24-2.93 135.64-6.15 135.64-11.75L135.64-11.75Q135.64-17.45 138.22-20.83 140.79-24.2 144.79-24.2L144.79-24.2Q148.84-24.2 152.29-21.35L152.29-21.35Q153.64-23.85 156.64-23.85L156.64-23.85Q159.34-23.85 160.84-22.68 162.34-21.5 162.34-18.35L162.34-18.35 162.34-5.35Q162.34-2.35 161.09-1.18 159.84 0 156.69 0L156.69 0Q153.39 0 152.34-1.85L152.34-1.85Q149.14 0.3 144.79 0.3ZM151.59-7.2L151.59-16.55Q150.74-18 149.39-18L149.39-18Q148.09-18 147.29-16.1 146.49-14.2 146.49-11.75L146.49-11.75Q146.49-9.45 147.24-7.65 147.99-5.85 149.34-5.85L149.34-5.85Q150.74-5.85 151.59-7.2L151.59-7.2ZM177.79-15.4L177.79-5.35Q177.79-2.35 176.54-1.18 175.29 0 172.09 0L172.09 0Q169.14 0 168.09-1.38 167.04-2.75 167.04-5.9L167.04-5.9 167.04-18.2Q167.04-19.9 167.64-21.18 168.24-22.45 169.39-23.15 170.54-23.85 172.09-23.85L172.09-23.85Q175.89-23.85 177.09-21.65L177.09-21.65Q179.99-23.85 182.69-23.85L182.69-23.85Q187.94-23.85 187.94-18.85L187.94-18.85Q187.94-16.85 186.79-15.6 185.64-14.35 183.79-14.35L183.79-14.35Q182.69-14.35 182.01-14.8 181.34-15.25 180.76-15.7 180.19-16.15 179.44-16.15L179.44-16.15Q178.34-16.15 177.79-15.4L177.79-15.4ZM216.79-28.7L216.79-7.5Q216.79-3.45 215.44-1.73 214.09 0 211.29 0L211.29 0Q208.09 0 206.89-2L206.89-2Q203.64 0.35 199.03 0.35L199.03 0.35Q195.14 0.35 192.53-2.88 189.94-6.1 189.94-11.7L189.94-11.7Q189.94-17.4 192.49-20.78 195.03-24.15 199.03-24.15L199.03-24.15Q202.64-24.15 205.78-21.85L205.78-21.85 205.78-28.25Q205.78-31.3 207.29-32.77 208.79-34.25 211.29-34.25L211.29-34.25Q214.04-34.25 215.41-33.15 216.79-32.05 216.79-28.7L216.79-28.7ZM205.89-7.2L205.89-7.2 205.84-16.55Q204.99-17.95 203.64-17.95L203.64-17.95Q202.78-17.95 202.11-17 201.44-16.05 201.09-14.65 200.74-13.25 200.74-11.7L200.74-11.7Q200.74-9.4 201.49-7.6 202.24-5.8 203.59-5.8L203.59-5.8Q203.84-5.8 204.09-5.85 204.34-5.9 204.53-5.98 204.74-6.05 204.94-6.18 205.14-6.3 205.28-6.45 205.44-6.6 205.59-6.8 205.74-7 205.89-7.2ZM221.23-30.8L221.23-30.8Q221.23-32.45 222.66-33.52 224.08-34.6 226.68-34.6L226.68-34.6Q232.13-34.6 232.13-30.8L232.13-30.8Q232.13-28.7 230.76-27.85 229.38-27 226.68-27L226.68-27Q224.33-27 222.78-27.9 221.23-28.8 221.23-30.8ZM232.08-18.35L232.08-5.35Q232.08-2.35 230.83-1.18 229.58 0 226.43 0L226.43 0Q223.48 0 222.41-1.38 221.33-2.75 221.33-5.9L221.33-5.9 221.33-18.2Q221.33-20.75 222.71-22.3 224.08-23.85 226.38-23.85L226.38-23.85Q229.08-23.85 230.58-22.68 232.08-21.5 232.08-18.35L232.08-18.35ZM252.03-4.15L251.98-13.45Q251.98-16.25 249.78-16.25L249.78-16.25Q248.73-16.25 248.06-15.38 247.38-14.5 247.28-13.05L247.28-13.05 247.28-5.35Q247.28-2.3 246.03-1.15 244.78 0 241.63 0L241.63 0Q238.68 0 237.61-1.38 236.53-2.75 236.53-5.9L236.53-5.9 236.53-18.2Q236.53-20.75 237.91-22.3 239.28-23.85 241.58-23.85L241.58-23.85Q243.48-23.85 244.78-23.3 246.08-22.75 246.73-21.4L246.73-21.4Q250.63-23.95 256.23-23.95L256.23-23.95Q259.78-23.95 261.36-21.15 262.93-18.35 262.93-11.95L262.93-11.95Q262.93-8.8 262.78-6.83 262.63-4.85 262.31-3.43 261.98-2 261.28-1.3 260.58-0.6 259.66-0.3 258.73 0 257.28 0L257.28 0Q254.48 0 253.26-1.05 252.03-2.1 252.03-4.15L252.03-4.15ZM276.03 0.3L276.03 0.3Q272.08 0.3 269.48-2.93 266.88-6.15 266.88-11.8L266.88-11.8Q266.88-17.5 269.43-20.85 271.98-24.2 275.98-24.2L275.98-24.2Q280.03-24.2 283.48-21.4L283.48-21.4Q284.78-23.85 287.78-23.85L287.78-23.85Q290.48-23.85 292-22.65 293.53-21.45 293.53-18.35L293.53-18.35 293.53-9.2Q293.53-4.35 292.9-0.88 292.28 2.6 290.75 5.25 289.23 7.9 286.55 9.2 283.88 10.5 279.98 10.5L279.98 10.5Q277.28 10.5 274.98 9.75 272.68 9 271.33 7.9 269.98 6.8 269.23 5.7 268.48 4.6 268.48 3.8L268.48 3.8Q268.48 2.85 269.03 2.2 269.58 1.55 270.58 1.55L270.58 1.55Q271.18 1.55 273.6 2.85 276.03 4.15 277.53 4.15L277.53 4.15Q282.63 4.15 282.63-1.1L282.63-1.1Q279.73 0.3 276.03 0.3ZM282.83-7.2L282.83-7.2 282.78-16.65Q281.93-18.05 280.63-18.05L280.63-18.05Q279.73-18.05 279.05-17.1 278.38-16.15 278.05-14.75 277.73-13.35 277.73-11.8L277.73-11.8Q277.73-9.45 278.48-7.68 279.23-5.9 280.58-5.9L280.58-5.9Q281.93-5.9 282.83-7.2Z"
        opacity="1"
        transform="matrix(1,0,0,1,0,0)"
        fill="#1976d2"
        className="wordmark-text-0"
        data-fill-palette-color="quaternary"
        id="text-0"
      />
    </svg>
  );
};
