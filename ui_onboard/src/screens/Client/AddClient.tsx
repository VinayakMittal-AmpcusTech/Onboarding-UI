import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "../../common/TextField/TextField";
import { saveClientData, setClientInputBoxValue } from "../../actions/client";
import {
  ContractType,
  LocationName,
} from "../../constants/candidateclientconstants";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import { Box } from "@mui/material";
import { Button } from "../../common/Button/Button";
import { useNavigate } from "react-router-dom";
import { addClientStateList } from "../../constants/constants";
import { isEmailValid, isTextValid } from "../../helpers/validate";
import { EMPTY_ADDRESS_DATA } from "../../utils/addressutil";
import Select from "react-select";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";
import { FloatSelect } from "../../common/FloatSelect/FloatSelect";

interface Props {
  setShowModal: any;
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

const AddClientDetails: React.FC<Props> = ({ setShowModal }) => {
  const dispatch = useAppDispatch();
  const currentClientData = useAppSelector(
    (state: RootState) => state.client.clientData
  );
  const allClientData = useAppSelector(
    (state: RootState) => state.client.allClientData
  );
  let allClientName: object[] = [];

  const locationName = LocationName;

  const [clientNameError, setClientNameError] = useState<any>();
  const [endClientNameError, setEndClientNameError] = useState<any>();
  const [mspNameError, setMspNameError] = useState<any>();
  const [line1Error, setLine1Error] = useState<any>();
  const [line2Error, setLine2Error] = useState<any>();
  const [cityError, setCityError] = useState<any>();
  const [stateError, setStateError] = useState<any>();
  const [zipCodeError, setZipCodeError] = useState<any>();
  const [countryError, setCountryError] = useState<any>();
  const [emailError, setEmailError] = useState<any>();
  const [contactError, setContactError] = useState<any>();
  const [faxError, setFaxError] = useState<any>();

  const onValueChange = (key: any, value: any) => {
    dispatch(setClientInputBoxValue(key, value));
  };

  const boxStyle = {
    alignItems: "center",
    border: "none",
    flexGrow: 1,
    marginTop: "3%",
    overflowY: "auto",
    overflowX: "hidden",
    height: "70vh",
    paddingRight: "10px",
    paddingLeft: "10px",
  };

  const [clientNameValid, setClientNameValid] = useState<boolean>();
  const [endClientNameValid, setEndClientNameValid] = useState<boolean>();
  const [mspNameValid, setMspNameValid] = useState<boolean>();
  const [line1Valid, setLine1Valid] = useState<boolean>();
  const [line2Valid, setLine2Valid] = useState<boolean>();
  const [cityValid, setCityValid] = useState<boolean>();
  const [stateValid, setStateValid] = useState<boolean>();
  const [zipCodeValid, setZipCodeValid] = useState<boolean>();
  const [countryValid, setCountryValid] = useState<boolean>();
  const [emailValid, setEmailValid] = useState<boolean>();
  const [contactValid, setContactValid] = useState<boolean>();
  const [faxValid, setFaxValid] = useState<boolean>();

  function onSubmitClick() {
    setClientNameValid(isTextValid(currentClientData?.clientName));
    setEndClientNameValid(isTextValid(currentClientData?.endClientName));
    setMspNameValid(isTextValid(currentClientData?.mspName));
    setLine1Valid(isTextValid(currentClientData?.line1));
    setLine2Valid(isTextValid(currentClientData?.line2));
    setCityValid(isTextValid(currentClientData?.city));
    setStateValid(isTextValid(currentClientData?.state?.value));
    setZipCodeValid(isTextValid(currentClientData?.zipCode));
    setCountryValid(isTextValid(currentClientData?.country));
    setEmailValid(isEmailValid(currentClientData?.email));
    setContactValid(isTextValid(currentClientData?.contactNumber));
    setFaxValid(isTextValid(currentClientData?.faxNumber));

    if (
      isTextValid(currentClientData?.clientName) &&
      isTextValid(currentClientData?.endClientName) &&
      isTextValid(currentClientData?.mspName) &&
      isTextValid(currentClientData?.line1) &&
      isTextValid(currentClientData?.line2) &&
      isTextValid(currentClientData?.city) &&
      isTextValid(currentClientData?.state?.value) &&
      isTextValid(currentClientData?.country) &&
      isEmailValid(currentClientData?.email) &&
      isTextValid(currentClientData?.zipCode) &&
      isTextValid(currentClientData?.contactNumber) &&
      isTextValid(currentClientData?.faxNumber)
    ) {
      console.log("setShowModal: ", setShowModal);
      dispatch(
        saveClientData(
          currentClientData?.clientName,
          currentClientData?.endClientName,
          currentClientData?.mspName,
          currentClientData?.email,
          currentClientData?.contactNumber,
          currentClientData?.faxNumber,
          currentClientData?.line1,
          currentClientData?.line2,
          currentClientData?.city,
          currentClientData?.state?.value,
          currentClientData?.zipCode,
          currentClientData?.country
        )
      );
      setShowModal(false);
    } else {
      if (!clientNameValid) {
        setClientNameError("Client name should not be empty.");
      }
      if (!endClientNameValid) {
        setEndClientNameError("End client name should not be empty.");
      }
      if (!mspNameValid) {
        setMspNameError("Msp name should not be empty.");
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
        setZipCodeError("Zip code should not be empty.");
      }
      if (!countryValid) {
        setCountryError("Country should not be empty.");
      }
      if (!emailValid) {
        setEmailError("Email should not be empty.");
      }
      if (!contactValid) {
        setContactError("Contact should not be empty.");
      }
      if (!faxValid) {
        setFaxError("Fax no should not be empty.");
      }
    }
  }

  return (
    <>
      <div className="pt-5 px-5 h-[60vh] overflow-auto" id="no-scroll-div">
        <Grid container spacing={2}>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="Client name*"
              value={currentClientData?.clientName}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("clientName", event.target.value);
                setClientNameValid(isTextValid(currentClientData?.clientName));
              }}
              className=""
            />
            {!clientNameValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {clientNameError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="End client name*"
              value={currentClientData?.endClientName}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("endClientName", event.target.value);
                setEndClientNameValid(
                  isTextValid(currentClientData?.endClientName)
                );
              }}
              className=""
            />
            {!endClientNameValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {endClientNameError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="MSP name*"
              value={currentClientData?.mspName}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("mspName", event.target.value);
                setMspNameValid(isTextValid(currentClientData?.mspName));
              }}
              className=""
            />
            {!mspNameValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {mspNameError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="Email*"
              value={currentClientData?.email}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("email", event.target.value.replace(/\s/g, ""));
                setEmailValid(isEmailValid(currentClientData?.email));
              }}
              className=""
            />
            {!emailValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {emailError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="Contact number*"
              value={currentClientData?.contactNumber}
              placeholder={""}
              handleChange={(event) => {
                onValueChange(
                  "contactNumber",
                  event.target.value.replace(/[^0-9]/gi, "")
                );
                setContactValid(currentClientData?.contactNumber);
              }}
              className=""
            />
            {!contactValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {contactError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="Fax number*"
              value={currentClientData?.faxNumber}
              placeholder={""}
              handleChange={(event) => {
                onValueChange(
                  "faxNumber",
                  event.target.value.replace(/[^0-9]/gi, "")
                );
                setFaxValid(currentClientData?.faxNumber);
              }}
              className=""
            />
            {!faxValid ? (
              <p
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {faxError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="Address line 1*"
              value={currentClientData?.line1}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("line1", event?.target?.value);
                setLine1Valid(isTextValid(currentClientData?.line1));
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
            <FloatLabel
              label="Address line 2*"
              value={currentClientData?.line2}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("line2", event?.target?.value);
                setLine2Valid(isTextValid(currentClientData?.line2));
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
            <FloatLabel
              label="City*"
              value={currentClientData?.city}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("city", event.target.value);
                setCityValid(isTextValid(currentClientData?.city));
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
            <Select
              menuPosition="fixed"
              className="text-[14px] text-left"
              placeholder="Work state*"
              options={locationName}
              value={currentClientData?.state}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              onChange={(e: any) => {
                console.log("e: ", e);
                onValueChange("state", e);
                setStateValid(isTextValid(currentClientData?.state.value));
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
            <FloatLabel
              label="Zip code*"
              value={currentClientData?.zipCode}
              placeholder={""}
              handleChange={(event) => {
                onValueChange(
                  "zipCode",
                  event.target.value.replace(/[^0-9]/gi, "")
                );
                setZipCodeValid(isTextValid(currentClientData?.zipCode));
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
            {/* <span>*Client country</span> */}
            <FloatLabel
              label="Client country*"
              value={currentClientData?.country}
              placeholder={""}
              handleChange={(event) => {
                onValueChange("country", event.target.value);
                setCountryValid(isTextValid(currentClientData?.country));
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
            className="mt-3"
            value="Save & Submit"
            handleClick={onSubmitClick}
            styles={{ fontSize: "16px" }}
          />
        </div>
        {/* </Grid> */}
      </div>
    </>
  );
};

export default AddClientDetails;
