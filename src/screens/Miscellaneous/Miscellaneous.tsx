import React from "react";
import MiscellaneousCard from "./MiscellaneousCard";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import GavelIcon from "@mui/icons-material/Gavel";
import Grid from "@mui/material/Unstable_Grid2";

const Miscellaneous: React.FC = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={6} md={4}>
          <div
            className="mb-5 flex"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            }}
          >
            <MiscellaneousCard
              className="w-[90%]"
              name={"Work authorization"}
              component={"/show-work-authorization"}
            />
            <div className="w-[125px] bg-[#1976D2] pt-4">
              <GroupRemoveIcon style={{ color: "white" }} />
            </div>
          </div>
        </Grid>
        <Grid xs={6} md={4}>
          {/* <MiscellaneousCard name={"Contract type"} component={"/contract-type"} /> */}
          <div
            className="mb-5 flex"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            }}
          >
            <MiscellaneousCard
              className="w-[90%]"
              name={"Contract type"}
              component={"/contract-type"}
            />
            <div className="w-[125px] bg-[#1976D2] pt-4">
              <GavelIcon style={{ color: "white" }} />
            </div>
          </div>
        </Grid>
      </Grid>
      <div className=" ">
        {/* <img
          style={{ width: "70%", height: "420px" }}
          // src={image1}
          src="https://cdn-fmkch.nitrocdn.com/WalXjknmYyViFiHDyzsNopiswnbohjPn/assets/images/optimized/rev-80eb14f/www.postgrid.com/wp-content/uploads/2021/11/thank-you-letter-to-employees.jpg"
          className="img-rounded mx-auto d-block"
        /> */}
      </div>
    </>
  );
};

export default Miscellaneous;
