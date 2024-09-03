import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import { saveVendorData, setVendorInputBoxValue } from "../../actions/vendor";
import { LocationName } from "../../constants/candidateclientconstants";
import Select from "react-select";
import { Button } from "../../common/Button/Button";
import { isEmailValid, isTextValid } from "../../helpers/validate";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";

interface Props {
  setShowModal: any;
}
const AddVendor: React.FC<Props> = ({ setShowModal }) => {
  const dispatch = useAppDispatch();
  const currentVendorData = useAppSelector(
    (state: RootState) => state.vendor.vendorData
  );
  const allVendorData = useAppSelector(
    (state: RootState) => state.vendor.allVendorData
  );

  let tempVendorName = [
    {
      label: "TCS",
      value: "TCS",
    },
    {
      label: "WIPRO",
      value: "WIPRO",
    },
    {
      label: "Infosys",
      value: "Infosys",
    },
    {
      label: "Accenture",
      value: "Accenture",
    },
  ];

  let allVendorName: object[] = [];

  if (allVendorData.length !== 0) {
    allVendorName = allVendorData.map((a: { companyName: string }) => {
      return {
        value: a.companyName,
        label: a.companyName,
      };
    });
  }
  const locationName = LocationName;

  const [companyNameError, setCompanyNameError] = useState<any>();
  const [federalIDError, setFederalIDError] = useState<any>();
  const [contactPersonError, setContactPersonError] = useState<any>();
  const [companyEmailIDError, setCompanyEmailIDError] = useState<any>();
  const [contactNoError, setContactNoError] = useState<any>();
  const [faxNoError, setFaxNoError] = useState<any>();
  const [signAuthorityError, setSignAuthorityError] = useState<any>();
  const [signAuthorityDesignationError, setSignAuthorityDesignationError] =
    useState<any>();
  const [stateOfIncorporationError, setStateOfIncorporationError] =
    useState<any>();
  const [line1Error, setLine1Error] = useState<any>();
  const [line2Error, setLine2Error] = useState<any>();
  const [cityError, setCityError] = useState<any>();
  const [stateError, setStateError] = useState<any>();
  const [zipCodeError, setZipCodeError] = useState<any>();
  const [countryError, setCountryError] = useState<any>();

  const onValueChange = (key: any, value: any) => {
    dispatch(setVendorInputBoxValue(key, value));
  };

  const [companyNameValid, setCompanyNameValid] = useState<any>();
  const [federalIDValid, setFederalIDValid] = useState<any>();
  const [contactPersonValid, setContactPersonValid] = useState<any>();
  const [companyEmailIDValid, setCompanyEmailIDValid] = useState<any>();
  const [contactNoValid, setContactNoValid] = useState<any>();
  const [faxNoValid, setFaxNoValid] = useState<any>();
  const [signAuthorityValid, setSignAuthorityValid] = useState<any>();
  const [signAuthorityDesignationValid, setSignAuthorityDesignationValid] =
    useState<any>();
  const [stateOfIncorporationValid, setStateOfIncorporationValid] =
    useState<any>();
  const [line1Valid, setLine1Valid] = useState<any>();
  const [line2Valid, setLine2Valid] = useState<any>();
  const [cityValid, setCityValid] = useState<any>();
  const [stateValid, setStateValid] = useState<any>();
  const [zipCodeValid, setZipCodeValid] = useState<any>();
  const [countryValid, setCountryValid] = useState<boolean>();

  function onSubmitClick() {
    setCompanyNameValid(isTextValid(currentVendorData?.companyName));
    setFederalIDValid(isTextValid(currentVendorData?.federalID));
    setContactPersonValid(isTextValid(currentVendorData?.contactPerson));
    setCompanyEmailIDValid(isEmailValid(currentVendorData?.companyEmailID));
    setContactNoValid(isTextValid(currentVendorData?.contactNo));
    setFaxNoValid(isTextValid(currentVendorData?.faxNo));
    setSignAuthorityValid(isTextValid(currentVendorData?.signAuthority));
    setSignAuthorityDesignationValid(
      isTextValid(currentVendorData?.signAuthorityDesignation)
    );
    setStateOfIncorporationValid(
      isTextValid(currentVendorData?.stateOfIncorporation)
    );
    setLine1Valid(isTextValid(currentVendorData?.line1));
    setLine2Valid(isTextValid(currentVendorData?.line2));
    setCityValid(isTextValid(currentVendorData?.city));
    setStateValid(isTextValid(currentVendorData?.state.value));
    setZipCodeValid(isTextValid(currentVendorData?.zipCode));
    setCountryValid(isTextValid(currentVendorData?.country));

    console.log("setShowModal: ", setShowModal);
    if (
      isTextValid(currentVendorData?.companyName) &&
      isTextValid(currentVendorData?.federalID) &&
      isTextValid(currentVendorData?.contactPerson) &&
      isEmailValid(currentVendorData?.companyEmailID) &&
      isTextValid(currentVendorData?.contactNo) &&
      isTextValid(currentVendorData?.faxNo) &&
      isTextValid(currentVendorData?.signAuthority) &&
      isTextValid(currentVendorData?.signAuthorityDesignation) &&
      isTextValid(currentVendorData?.line1) &&
      isTextValid(currentVendorData?.line2) &&
      isTextValid(currentVendorData?.city) &&
      isTextValid(currentVendorData?.state.value) &&
      isTextValid(currentVendorData?.zipCode) &&
      isTextValid(currentVendorData?.country)
    ) {
      dispatch(
        saveVendorData(
          currentVendorData?.companyName,
          currentVendorData?.federalID,
          currentVendorData?.contactPerson,
          currentVendorData?.companyEmailID,
          currentVendorData?.contactNo,
          currentVendorData?.faxNo,
          currentVendorData?.signAuthority,
          currentVendorData?.signAuthorityDesignation,
          currentVendorData?.stateOfIncorporation,
          currentVendorData?.line1,
          currentVendorData?.line2,
          currentVendorData?.city,
          currentVendorData?.state.value,
          currentVendorData?.zipCode,
          currentVendorData?.country
        )
      );
      setShowModal(false);
    } else {
      if (!companyNameValid) {
        setCompanyNameError("Company name should not be empty.");
      }
      if (!federalIDValid) {
        setFederalIDError("Federal ID should not be empty.");
      }
      if (!contactPersonValid) {
        setContactPersonError("Contact person should not be empty.");
      }
      if (!companyEmailIDValid) {
        setCompanyEmailIDError("Company email should not be empty.");
      }
      if (!contactNoValid) {
        setContactNoError("Contact no should not be empty.");
      }
      if (!faxNoValid) {
        setFaxNoError("Fax no is invalid");
      }
      if (!signAuthorityValid) {
        setSignAuthorityError("Sign authority should not be empty.");
      }
      if (!signAuthorityDesignationValid) {
        setSignAuthorityDesignationError(
          "Sign authority designation should not be empty."
        );
      }
      if (!stateOfIncorporationValid) {
        setStateOfIncorporationError(
          "State of incorporation should not be empty."
        );
      }
      if (!line1Valid) {
        setLine1Error("Line 1 should not be empty.");
      }
      if (!line2Valid) {
        setLine2Error("Line 2 should not be empty.");
      }
      if (!cityValid) {
        setCityError("City should not be empty.");
      }
      if (!stateValid) {
        setStateError("State should not be empty.");
      }
      if (!zipCodeValid) {
        setZipCodeError("Zip Code should not be empty.");
      }
      if (!countryValid) {
        setCountryError("Country should not be empty.");
      }
    }
  }

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      // Your custom control styles here
    }),
    // Add more custom styles for other elements as needed
    placeholder: (styles: any) => ({
      ...styles,
      color: "#1976D2", // Change this color to your desired placeholder color
    }),
  };

  return (
    <>
      <div className="pt-5 px-5 h-[65vh] overflow-auto" id="no-scroll-div">
        {/* <h2>Vendor details</h2> */}
        <Grid container spacing={2}>
          <Grid xs={6} md={6}>
            {/* <span>Vendor name</span> */}
            <FloatLabel
              label=" Vendor name*"
              value={currentVendorData?.companyName}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("companyName", event?.target?.value);

                setCompanyNameValid(
                  isTextValid(currentVendorData?.companyName)
                );
              }}
              className=""
            />
            {!companyNameValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {companyNameError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Vendor federal ID</span> */}
            <FloatLabel
              label="Vendor federal Id*"
              value={currentVendorData?.federalID}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("federalID", event?.target?.value);
                setFederalIDValid(isTextValid(currentVendorData?.federalID));
              }}
              className=""
            />
            {!federalIDValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {federalIDError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Name of contact person</span> */}

            <FloatLabel
              label="Name of contact person*"
              value={currentVendorData?.contactPerson}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("contactPerson", event?.target?.value);
                setContactPersonValid(
                  isTextValid(currentVendorData?.contactPerson)
                );
              }}
              className=""
            />
            {!contactPersonValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {contactPersonError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Vendor company email ID</span> */}
            <FloatLabel
              label=" email Id*"
              value={currentVendorData?.companyEmailID}
              placeholder={""}
              handleChange={(event) => {
                onValueChange(
                  "companyEmailID",
                  event?.target?.value.replace(/\s/g, "")
                );
                setCompanyEmailIDValid(isEmailValid(currentVendorData?.email));
              }}
              className=""
            />
            {!companyEmailIDValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {companyEmailIDError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Vendor company contact no.</span> */}
            <FloatLabel
              label="company contact no*"
              value={currentVendorData?.contactNo}
              placeholder={""}
              handleChange={(event) => {
                onValueChange(
                  "contactNo",
                  event.target.value.replace(/[^0-9]/gi, "")
                );
                setContactNoValid(isTextValid(currentVendorData?.contactNo));
              }}
              className=""
            />
            {!contactNoValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {contactNoError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Vendor fax no.</span> */}
            <FloatLabel
              label="Vendor fax no*"
              value={currentVendorData?.faxNo}
              placeholder={""}
              handleChange={(event) => {
                onValueChange(
                  "faxNo",
                  event.target.value.replace(/[^0-9]/gi, "")
                );
                setFaxNoValid(isTextValid(currentVendorData?.faxNo));
              }}
              className=""
            />
            {!faxNoValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {faxNoError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Name of sign authority</span> */}
            <FloatLabel
              label="Name of sign authority*"
              value={currentVendorData?.signAuthority}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("signAuthority", event?.target?.value);
                setSignAuthorityValid(
                  isTextValid(currentVendorData?.signAuthority)
                );
              }}
              className=""
            />
            {!signAuthorityValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {signAuthorityError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Designation of sign authority</span> */}
            <FloatLabel
              label="Designation sign authorit*"
              value={currentVendorData?.signAuthorityDesignation}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("signAuthorityDesignation", event?.target?.value);
                setSignAuthorityDesignationValid(
                  isTextValid(currentVendorData?.signAuthorityDesignation)
                );
              }}
              className=""
            />
            {!signAuthorityDesignationValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {signAuthorityDesignationError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Vendor state of incorporation</span> */}
            <FloatLabel
              label="state of incorporation*"
              value={currentVendorData?.stateOfIncorporation}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("stateOfIncorporation", event?.target?.value);
                setStateOfIncorporationValid(
                  isTextValid(currentVendorData?.stateOfIncorporation)
                );
              }}
              className=""
            />
            {!stateOfIncorporationValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {stateOfIncorporationError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Vendor address line 1</span> */}
            <FloatLabel
              label="Vendor address line 1*"
              value={currentVendorData?.line1}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("line1", event?.target?.value);
                setLine1Valid(isTextValid(currentVendorData?.line1));
              }}
              className=""
            />
            {!line1Valid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {line1Error}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Vendor address line 2</span> */}
            <FloatLabel
              label="Vendor address line 2*"
              value={currentVendorData?.line2}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("line2", event?.target?.value);
                setLine2Valid(isTextValid(currentVendorData?.line2));
              }}
              className=""
            />
            {!line2Valid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {line2Error}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Vendor city</span> */}
            <FloatLabel
              label="Vendor city*"
              value={currentVendorData?.city}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("city", event?.target?.value);
                setCityValid(isTextValid(currentVendorData?.city));
              }}
              className=""
            />
            {!cityValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {cityError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Vendor zip code</span> */}
            <FloatLabel
              label="Vendor zip code*"
              value={currentVendorData?.zipCode}
              placeholder={""}
              handleChange={(event) => {
                onValueChange(
                  "zipCode",
                  event?.target?.value.replace(/[^0-9]/gi, "")
                );
                setZipCodeValid(isTextValid(currentVendorData?.zipCode));
              }}
              className=""
            />
            {!zipCodeValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {zipCodeError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Vendor state</span> */}
            <Select
              menuPlacement="bottom"
              menuPosition="fixed"
              className="text-[14px] text-left"
              placeholder="Vendor state*"
              options={locationName}
              value={currentVendorData?.state}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              onChange={(e: any) => {
                onValueChange("state", e);
                setStateValid(isTextValid(currentVendorData?.state.value));
              }}
              isSearchable={true}
              styles={customStyles}
            />
            {!stateValid ? (
              <p
                className="text-left "
                style={{ fontSize: "12px", color: "red" }}
              >
                {stateError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Vendor Country</span> */}
            <FloatLabel
              label="Vendor Country*"
              value={currentVendorData?.country}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("country", event?.target?.value);
                setCountryValid(isTextValid(currentVendorData?.country));
              }}
              className=""
            />
            {!countryValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {countryError}
              </p>
            ) : null}
          </Grid>
        </Grid>
        {/* <Grid xs={12} md={12}> */}
        <div className="m-auto w-[30%] ml-[35%] text-white ">
          <Button
            className=""
            value="Save & Submit"
            handleClick={() => onSubmitClick()}
            styles={{ fontSize: "16px" }}
          />
        </div>
        {/* </Grid> */}
      </div>
    </>
  );
};

export default AddVendor;
