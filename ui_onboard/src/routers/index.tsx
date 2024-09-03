import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import HomepageScreen from "../screens/Homepage";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignIn } from "../screens/Login/signin";
import NavBarScreen from "../screens/Navbar";
import SideBarScreen from "../screens/Sidebar";
import AddCandidateScreen from "../screens/Candidate";
import ShowClientDetails from "../screens/Client/ShowClientDetails";
import AddClientDetails from "../screens/Client/AddClient";
import ShowJobDetails from "../screens/Job/ShowJobDetails";
import AddJobDetails from "../screens/Job/AddJob";
import ShowVendorDetails from "../screens/Vendor/ShowVendorDetails";
import AddVendor from "../screens/Vendor/AddVendor";
import MiscellaneousScreen from "../screens/Miscellaneous";
import ShowWorkAuthorization from "../screens/WorkAuthorization";
import AddWorkAuthorization from "../screens/WorkAuthorization/AddWorkAuthorization";
import WorkAuthorization from "../screens/WorkAuthorization";
import ContractType from "../screens/ContractType";
import AddContractType from "../screens/ContractType/AddContractType";
import { AllData } from "../screens/Homepage/AllData";
import BackgroundVerification from "../screens/BackgroundCheck";
import { DocumentationScreen } from "../screens/Documentation";
import BasicDetails from "../screens/Candidate/BasicDetails";
import { useAppDispatch } from "../hooks/app";
import { setUserDetails } from "../actions/user";
// import HomepageScreen from "../screens/Homepage/index";

function Routers() {
  const logged = true;
  const [open, setOpen] = React.useState(false);

  const token = localStorage.getItem("token");

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      dispatch(setUserDetails(JSON.parse(user), token));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div />;
  } else {
    return (
      <Routes>
        <Route path="*" element={<SignIn />} />
        <Route path="/sign-in" index element={<SignIn />} />
        <Route path="/sign-in/:id" element={<SignIn />} />
        <Route
          path="/home-page"
          element={
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <NavBarScreen open={open} setOpen={setOpen} />
              <SideBarScreen open={open} setOpen={setOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                <DrawerHeader />
                <ProtectedRoute>
                  <HomepageScreen />
                </ProtectedRoute>
              </Box>
            </Box>
          }
        />
        <Route
          path="/all-data"
          element={
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <NavBarScreen open={open} setOpen={setOpen} />
              <SideBarScreen open={open} setOpen={setOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                <DrawerHeader />
                <ProtectedRoute>
                  <AllData />
                </ProtectedRoute>
              </Box>
            </Box>
          }
        />
        <Route
          path="/add-candidate"
          element={
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <NavBarScreen open={open} setOpen={setOpen} />
              <SideBarScreen open={open} setOpen={setOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                <DrawerHeader />
                <ProtectedRoute>
                  <AddCandidateScreen />
                </ProtectedRoute>
              </Box>
            </Box>
          }
        />
        <Route
          path="/show-clients"
          element={
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <NavBarScreen open={open} setOpen={setOpen} />
              <SideBarScreen open={open} setOpen={setOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                <DrawerHeader />
                <ProtectedRoute>
                  <ShowClientDetails />
                </ProtectedRoute>
              </Box>
            </Box>
          }
        />
        <Route
          path="/show-jobs"
          element={
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <NavBarScreen open={open} setOpen={setOpen} />
              <SideBarScreen open={open} setOpen={setOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                <DrawerHeader />
                <ProtectedRoute>
                  <ShowJobDetails />
                </ProtectedRoute>
              </Box>
            </Box>
          }
        />
        <Route
          path="/add-candidate-backgroundCheck"
          element={
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <NavBarScreen open={open} setOpen={setOpen} />
              <SideBarScreen open={open} setOpen={setOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                <DrawerHeader />
                <ProtectedRoute>
                  <BackgroundVerification />
                </ProtectedRoute>
              </Box>
            </Box>
          }
        />
        <Route
          path="/add-candidate-documentation"
          element={
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <NavBarScreen open={open} setOpen={setOpen} />
              <SideBarScreen open={open} setOpen={setOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                <DrawerHeader />
                <ProtectedRoute>
                  <DocumentationScreen />
                </ProtectedRoute>
              </Box>
            </Box>
          }
        />
        <Route
          path="/add-candidate-basic"
          element={
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <NavBarScreen open={open} setOpen={setOpen} />
              <SideBarScreen open={open} setOpen={setOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                <DrawerHeader />
                <ProtectedRoute>
                  <BasicDetails />
                </ProtectedRoute>
              </Box>
            </Box>
          }
        />
        <Route
          path="/show-vendors"
          element={
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <NavBarScreen open={open} setOpen={setOpen} />
              <SideBarScreen open={open} setOpen={setOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                <DrawerHeader />
                <ProtectedRoute>
                  <ShowVendorDetails />
                </ProtectedRoute>
              </Box>
            </Box>
          }
        />
        {/* <Route path="/add-vendor"
                    element={
                        <Box sx={{ display: 'flex' }}>
                            <CssBaseline />
                            <NavBarScreen open={open} setOpen={setOpen} />
                            <SideBarScreen open={open} setOpen={setOpen} />
                            <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                                <DrawerHeader />
                                <ProtectedRoute>
                                    <AddVendor />
                                </ProtectedRoute>
                            </Box>
                        </Box>
                    }
                /> */}
        {/* <Route path="/add-client"
                    element={
                        <Box sx={{ display: 'flex' }}>
                            <CssBaseline />
                            <NavBarScreen open={open} setOpen={setOpen} />
                            <SideBarScreen open={open} setOpen={setOpen} />
                            <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                                <DrawerHeader />
                                <ProtectedRoute>
                                    <AddClientDetails />
                                </ProtectedRoute>
                            </Box>
                        </Box>
                    }
                /> */}
        {/* <Route path="/add-job"
                    element={
                        <Box sx={{ display: 'flex' }}>
                            <CssBaseline />
                            <NavBarScreen open={open} setOpen={setOpen} />
                            <SideBarScreen open={open} setOpen={setOpen} />
                            <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                                <DrawerHeader />
                                <ProtectedRoute>
                                    <AddJobDetails />
                                </ProtectedRoute>
                            </Box>
                        </Box>
                    }
                /> */}
        <Route
          path="/show-work-authorization"
          element={
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <NavBarScreen open={open} setOpen={setOpen} />
              <SideBarScreen open={open} setOpen={setOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                <DrawerHeader />
                <ProtectedRoute>
                  <WorkAuthorization />
                </ProtectedRoute>
              </Box>
            </Box>
          }
        />
        {/* <Route path="/add-work-authorization"
                    element={
                        <Box sx={{ display: 'flex' }}>
                            <CssBaseline />
                            <NavBarScreen open={open} setOpen={setOpen} />
                            <SideBarScreen open={open} setOpen={setOpen} />
                            <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                                <DrawerHeader />
                                <ProtectedRoute>
                                    <AddWorkAuthorization />
                                </ProtectedRoute>
                            </Box>
                        </Box>
                    }
                /> */}
        <Route
          path="/contract-type"
          element={
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <NavBarScreen open={open} setOpen={setOpen} />
              <SideBarScreen open={open} setOpen={setOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                <DrawerHeader />
                <ProtectedRoute>
                  <ContractType />
                </ProtectedRoute>
              </Box>
            </Box>
          }
        />
        {/* <Route path="/add-contract-type"
                    element={
                        <Box sx={{ display: 'flex' }}>
                            <CssBaseline />
                            <NavBarScreen open={open} setOpen={setOpen} />
                            <SideBarScreen open={open} setOpen={setOpen} />
                            <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                                <DrawerHeader />
                                <ProtectedRoute>
                                    <AddContractType />
                                </ProtectedRoute>
                            </Box>
                        </Box>
                    }
                /> */}
        <Route
          path="/miscellaneous"
          element={
            <Box sx={{ display: "flex" }}>
              <CssBaseline />
              <NavBarScreen open={open} setOpen={setOpen} />
              <SideBarScreen open={open} setOpen={setOpen} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
                <DrawerHeader />
                <ProtectedRoute>
                  <MiscellaneousScreen />
                </ProtectedRoute>
              </Box>
            </Box>
          }
        />
        {/* <Route path="/sign-in" element={<SignIn />} /> */}
        {/* <Route path="*" element={<SignIn />} /> */}
      </Routes>
    );
  }
}

export default Routers;
