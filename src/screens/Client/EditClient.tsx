import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "../../common/TextField/TextField";
import {
  editClientData,
  saveClientData,
  setClientInputBoxValue,
  updateOnlyClientData,
} from "../../actions/client";
import {
  ContractType,
  LocationName,
} from "../../constants/candidateclientconstants";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import { Box, SelectChangeEvent } from "@mui/material";
import { Button } from "../../common/Button/Button";
import { useNavigate } from "react-router-dom";
import { addClientStateList } from "../../constants/constants";
import { isEmailValid, isTextValid } from "../../helpers/validate";
import { EMPTY_ADDRESS_DATA } from "../../utils/addressutil";
import Select from "react-select";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";
import { editContactData } from "../../actions/contact";
import { FloatSelect } from "../../common/FloatSelect/FloatSelect";

interface Props {
  setShowModal: any;
  data: any;
}

const EditClientDetails: React.FC<Props> = ({ setShowModal, data }) => {
  console.log("data: ", data);
  const dispatch = useAppDispatch();
  const currentClientData = useAppSelector(
    (state: RootState) => state.client.clientData
  );
  const allClientData = useAppSelector(
    (state: RootState) => state.client.allClientData
  );
  let allClientName: object[] = [];
  const locationName = LocationName;

  const [clientName, setClientName] = useState(data?.clientId?.clientName);
  const [endClientName, setEndClientName] = useState(
    data?.clientId?.endClientName
  );
  const [mspName, setMspName] = useState(data?.clientId?.mspName);
  const [line1, setLine1] = useState(data?.addressId[0]?.line1);
  const [line2, setLine2] = useState(data?.addressId[0]?.line2);
  const [city, setCity] = useState(data?.addressId[0]?.city);
  const [state, setState] = useState(data?.addressId[0]?.state);
  console.log("state: ", state);
  const [zipCode, setZipCode] = useState(data?.addressId[0]?.zipCode);
  const [country, setCountry] = useState(data?.addressId[0]?.country);
  const [email, setEmail] = useState(
    data?.addressId[0]?.contactDetailId?.email
  );
  const [contact, setContact] = useState(
    data?.addressId[0]?.contactDetailId?.contactNumber
  );
  const [fax, setFax] = useState(
    data?.addressId[0]?.contactDetailId?.faxNumber
  );

  useEffect(() => {
    setClientName(data?.clientId?.clientName);
    setEndClientName(data?.clientId?.endClientName);
    setMspName(data?.clientId?.mspName);
    setLine1(data?.addressId[0]?.line1);
    setLine2(data?.addressId[0]?.line2);
    setCity(data?.addressId[0]?.city);
    setState(data?.addressId[0]?.state);
    setZipCode(data?.addressId[0]?.zipCode);
    setCountry(data?.addressId[0]?.country);
    setEmail(data?.addressId[0]?.contactDetailId?.email);
    setContact(data?.addressId[0]?.contactDetailId?.contactNumber);
    setFax(data?.addressId[0]?.contactDetailId?.faxNumber);
  }, [data]);

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

  const onSubmitClick = () => {
    setClientNameValid(isTextValid(clientName));
    setEndClientNameValid(isTextValid(endClientName));
    setMspNameValid(isTextValid(mspName));
    setLine1Valid(isTextValid(line1));
    setLine2Valid(isTextValid(line2));
    setCityValid(isTextValid(city));
    setStateValid(isTextValid(state));
    setZipCodeValid(isTextValid(zipCode));
    setCountryValid(isTextValid(country));
    setEmailValid(isEmailValid(email));
    setContactValid(isTextValid(contact?.toString()));
    setFaxValid(isTextValid(fax?.toString()));

    // console.log('setShowModal: ', setShowModal);
    console.log("contact: ", contact);
    console.log("fax: ", fax);
    console.log("contactValid: ", contactValid);
    console.log("faxValid: ", faxValid);
    console.log("stateValid: ", stateValid);
    console.log("clientNameValid: ", clientNameValid);

    if (
      isTextValid(clientName) &&
      isTextValid(endClientName) &&
      isTextValid(mspName) &&
      isTextValid(line1) &&
      isTextValid(line2) &&
      isTextValid(city) &&
      isTextValid(state) &&
      isTextValid(country) &&
      isEmailValid(email) &&
      isTextValid(zipCode) &&
      isTextValid(contact?.toString()) &&
      isTextValid(fax?.toString())
    ) {
      dispatch(
        updateOnlyClientData(
          data?.clientId?.id,
          clientName,
          endClientName,
          mspName
        )
      );
      dispatch(
        editClientData(
          data?.addressId[0]?.personId,
          line1,
          line2,
          city,
          state,
          zipCode,
          country
        )
      );
      dispatch(editContactData(email, contact, fax, data?.addressId[0]?.id));
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
  };

  return (
    <>
      <div className="pt-5 px-5 h-[58vh] overflow-auto" id="no-scroll-div">
        <Grid container spacing={2}>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="Client name*"
              value={clientName}
              placeholder={""}
              handleChange={(event) => {
                setClientName(event.target.value);
                setClientNameValid(isTextValid(event?.target?.value));
                if (!clientNameValid) {
                  setClientNameError("Client name should not be empty.");
                }
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
              value={endClientName}
              placeholder={""}
              handleChange={(event) => {
                setEndClientName(event.target.value);
                setEndClientNameValid(isTextValid(event?.target?.value));
                if (!endClientNameValid) {
                  setEndClientNameError("End client name should not be empty.");
                }
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
              value={mspName}
              placeholder={""}
              handleChange={(event) => {
                setMspName(event.target.value);
                setMspNameValid(isTextValid(event?.target?.value));
                if (!mspNameValid) {
                  setMspNameError("Msp name should not be empty.");
                }
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
              value={email}
              placeholder={""}
              handleChange={(event) => {
                setEmail(event.target.value.replace(/\s/g, ""));
                setEmailValid(isEmailValid(event?.target?.value));
                if (!emailValid) {
                  setEmailError("Email should not be empty.");
                }
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
              value={contact}
              placeholder={""}
              handleChange={(event) => {
                setContact(event.target.value.replace(/[^0-9]/gi, ""));
                setContactValid(isTextValid(event?.target?.value));
                if (!contactValid) {
                  setContactError("Contact should not be empty.");
                }
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
              value={fax}
              placeholder={""}
              handleChange={(event) => {
                setFax(event.target.value.replace(/[^0-9]/gi, ""));
                setFaxValid(isTextValid(event?.target?.value));
                if (!faxValid) {
                  setFaxError("Fax number should not be empty.");
                }
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
              value={line1}
              placeholder={""}
              handleChange={(event) => {
                setLine1(event?.target?.value);
                setLine1Valid(isTextValid(event?.target?.value));
                if (!line1Valid) {
                  setLine1Error("Address line 1 should not be empty");
                }
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
              value={line2}
              placeholder={""}
              handleChange={(event) => {
                setLine2(event?.target?.value);
                setLine2Valid(isTextValid(event?.target?.value));
                if (!line2Valid) {
                  setLine2Error("Address line 2 should not be empty");
                }
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
              value={city}
              placeholder={""}
              handleChange={(event) => {
                setCity(event.target.value);
                setCityValid(isTextValid(event?.target?.value));
                if (!cityValid) {
                  setCityError("city should not be empty");
                }
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
            <FloatSelect
              labelId={"Work state"}
              options={locationName}
              label="Work state"
              value={state}
              handleChange={(e: any) => {
                setState(e?.target?.value);
                setStateValid(isTextValid(e?.target?.value));
              }}
              styles={{
                border: "none",
                textAlign: "left",
                width: "100%",
                height: "38px",
                borderRadius: "none",
                fontSize: "14px",
              }}
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
              value={zipCode}
              placeholder={""}
              handleChange={(event) => {
                setZipCode(event.target.value.replace(/[^0-9]/gi, ""));
                setZipCodeValid(isTextValid(event?.target?.value));
                if (!zipCodeValid) {
                  setZipCodeError("Zip code should not be empty");
                }
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
              value={country}
              placeholder={""}
              handleChange={(event) => {
                setCountry(event.target.value);
                setCountryValid(isTextValid(event?.target?.value));
                if (!countryValid) {
                  setCountryError("Country should not be empty.");
                }
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
            className="my-3"
            value="Update client"
            handleClick={() => onSubmitClick()}
            styles={{ fontSize: "16px" }}
          />
        </div>
        {/* </Grid> */}
      </div>
    </>
  );
};

export default EditClientDetails;
