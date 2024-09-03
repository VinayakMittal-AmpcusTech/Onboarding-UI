// import * as React from 'react';
import { useSpring, animated } from "@react-spring/web";
import { TextField } from "../../common/TextField/TextField";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import Select from "react-select";
import { Button } from "../../common/Button/Button";
import { RootState } from "../../redux/store";
import { LocationName } from "../../constants/candidateclientconstants";
import ShowIndividualAddress from "../Address/ShowIndividualAddress";
import {
  editCandidateContractTypeData,
  editCandidateData,
  editCandidateWorkAuthorizationData,
} from "../../actions/candidate";
import moment from "moment";
import { Grid, TextField as TextField1 } from "@mui/material";
import { editClientData } from "../../actions/client";
import React, { useEffect, useState } from "react";
import { editContactData } from "../../actions/contact";
import { editWorkAuthorizationData } from "../../actions/workAuthorization";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";
import { isEmailValid, isTextValid } from "../../helpers/validate";
import { DropDown } from "../../common/DropDown/DropDown";
import { FloatSelect } from "../../common/FloatSelect/FloatSelect";

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

interface Props {
  open: any;
  setOpen: any;
  data2: any;
  showTableCount: any;
  int: any;
  setShowModal: any;
}

const ShowCandidate: React.FC<Props> = ({
  open,
  setOpen,
  data2,
  showTableCount,
  int,
  setShowModal,
}) => {
  console.log("data2: ", data2);
  const dispatch = useAppDispatch();
  let data: any = useAppSelector(
    (state: RootState) => state?.candidate?.singleCandidateData
  );
  console.log("data: ", data);
  let workAuthorizationData = useAppSelector(
    (state: RootState) => state.workAuthorization.allWorkAuthorizationData
  );
  console.log("workAuthorizationData: ", workAuthorizationData);
  let contractTypeData = useAppSelector(
    (state: RootState) => state.contractType.allContractTypeData
  );
  console.log("contractTypeData: ", contractTypeData);

  var workAuthorizationResult: any = [];
  if (workAuthorizationData != undefined) {
    workAuthorizationData.forEach(
      (element: { id: number; workAuthorization: any }) => {
        workAuthorizationResult.push({
          label: element.workAuthorization,
          value: element.workAuthorization,
        });
      }
    );
  }

  let contractTypeResult: any = [];
  if (contractTypeData != undefined) {
    contractTypeData.forEach((element: { id: number; contractType: any }) => {
      contractTypeResult.push({
        label: element.contractType,
        value: element.contractType,
      });
    });
  }

  const [disable, setDisable] = useState(true);
  const [firstName, setFirstName] = useState(
    data2?.candidateData?.candidateId?.firstName
  );
  console.log("firstName: ", firstName);
  const [middleName, setMiddleName] = useState(
    data2?.candidateData?.candidateId?.middleName
  );
  const [lastName, setLastName] = useState(
    data2?.candidateData?.candidateId?.lastName
  );
  const [line1, setLine1] = useState(data2?.candidateData?.addressId[0]?.line1);
  const [line2, setLine2] = useState(data2?.candidateData?.addressId[0]?.line2);
  const [city, setCity] = useState(data2?.candidateData?.addressId[0]?.city);
  const [state, setState] = useState(data2?.candidateData?.addressId[0]?.state);
  console.log("state: ", state);
  const [zipCode, setZipCode] = useState(
    data2?.candidateData?.addressId[0]?.zipCode
  );
  const [country, setCountry] = useState(
    data2?.candidateData?.addressId[0]?.country
  );
  const [email, setEmail] = useState(
    data2?.candidateData?.addressId[0]?.contactDetailId?.email
  );
  const [faxNumber, setFaxNumber] = useState(
    data2?.candidateData?.addressId[0]?.contactDetailId?.faxNumber
  );
  const [contactNumber, setContactNumber] = useState(
    data2?.candidateData?.addressId[0]?.contactDetailId?.contactNumber
  );
  const [workAuthorization, setWorkAuthorization] = useState(
    data2?.workAuthorizationData?.workAuthorization
  );
  const [workAuthorizationExpiryDate, setWorkAuthorizationExpiryDate] =
    useState(
      moment
        .utc(data2?.candidateId?.workAuthorizationExpiryDate)
        .format("YYYY-MM-DD")
    );
  const [contractType, setContractType] = useState(
    data2?.contractTypeData?.contractType
  );
  console.log("contractType: ", contractType);

  const [count, setCount] = useState(0);
  const locationName = LocationName;

  useEffect(() => {
    setFirstName(data2?.candidateData?.candidateId?.firstName);
    setMiddleName(data2?.candidateData?.candidateId?.middleName);
    setLastName(data2?.candidateData?.candidateId?.lastName);
    setWorkAuthorizationExpiryDate(
      moment
        .utc(data2?.candidateId?.workAuthorizationExpiryDate)
        .format("YYYY-MM-DD")
    );
    setWorkAuthorization(data2?.workAuthorizationData?.workAuthorization);
    console.log("workAuthorizationExpiryDate: ", workAuthorizationExpiryDate);
    setLine1(data2?.candidateData?.addressId[0]?.line1);
    setLine2(data2?.candidateData?.addressId[0]?.line2);
    setCity(data2?.candidateData?.addressId[0]?.city);
    setState(data2?.candidateData?.addressId[0]?.state);
    setZipCode(data2?.candidateData?.addressId[0]?.zipCode);
    setCountry(data2?.candidateData?.addressId[0]?.country);
    setEmail(data2?.candidateData?.addressId[0]?.contactDetailId?.email);
    setContactNumber(
      data2?.candidateData?.addressId[0]?.contactDetailId?.contactNumber
    );
    setFaxNumber(
      data2?.candidateData?.addressId[0]?.contactDetailId?.faxNumber
    );
    setContractType(data2?.contractTypeData?.contractType);
    setCount(1);
  }, [data]);

  const [firstNameValid, setFirstNameValid] = useState<boolean>();
  const [middleNameValid, setMiddleNameValid] = useState<boolean>();
  const [lastNameValid, setLastNameValid] = useState<boolean>();
  const [line1Valid, setLine1Valid] = useState<boolean>();
  const [line2Valid, setLine2Valid] = useState<boolean>();
  const [cityValid, setCityValid] = useState<boolean>();
  const [stateValid, setStateValid] = useState<boolean>();
  const [zipCodeValid, setZipCodeValid] = useState<boolean>();
  const [countryValid, setCountryValid] = useState<boolean>();
  const [emailValid, setEmailValid] = useState<boolean>();
  const [faxNumberValid, setFaxNumberValid] = useState<boolean>();
  console.log("faxNumberValid: ", faxNumberValid);
  const [contactNumberValid, setContactNumberValid] = useState<boolean>();
  console.log("contactNumberValid: ", contactNumberValid);
  const [workAuthorizationValid, setWorkAuthorizationValid] =
    useState<boolean>();
  const [
    workAuthorizationExpiryDateValid,
    setWorkAuthorizationExpiryDateValid,
  ] = useState<boolean>();
  const [contractTypeValid, setContractTypeValid] = useState<boolean>();

  const [firstNameError, setFirstNameError] = useState<any>();
  const [middleNameError, setMiddleNameError] = useState<any>();
  const [lastNameError, setLastNameError] = useState<any>();
  const [line1Error, setLine1Error] = useState<any>();
  const [line2Error, setLine2Error] = useState<any>();
  const [cityError, setCityError] = useState<any>();
  const [stateError, setStateError] = useState<any>();
  const [zipCodeError, setZipCodeError] = useState<any>();
  const [countryError, setCountryError] = useState<any>();
  const [emailError, setEmailError] = useState<any>();
  const [faxNumberError, setFaxNumberError] = useState<any>();
  const [contactNumberError, setContactNumberError] = useState<any>();
  const [workAuthorizationError, setWorkAuthorizationError] = useState<any>();
  const [
    workAuthorizationExpiryDateError,
    setWorkAuthorizationExpiryDateError,
  ] = useState<any>();
  const [contractTypeError, setContractTypeError] = useState<any>();

  function updateCandidate() {
    setFirstNameValid(isTextValid(firstName));
    setMiddleNameValid(isTextValid(middleName));
    setLastNameValid(isTextValid(lastName));
    setWorkAuthorizationValid(isTextValid(workAuthorization));
    setWorkAuthorizationExpiryDateValid(
      isTextValid(workAuthorizationExpiryDate)
    );
    setLine1Valid(isTextValid(line1));
    setLine2Valid(isTextValid(line2));
    setCityValid(isTextValid(city));
    setStateValid(isTextValid(state));
    setZipCodeValid(isTextValid(zipCode));
    setCountryValid(isTextValid(country));
    setEmailValid(isEmailValid(email));
    setEmailValid(isTextValid(email));
    setContactNumberValid(isTextValid(contactNumber?.toString()));
    setFaxNumberValid(isTextValid(faxNumber?.toString()));
    setContractTypeValid(isTextValid(contractType));

    if (
      isTextValid(firstName) &&
      isTextValid(middleName) &&
      isTextValid(lastName) &&
      isTextValid(workAuthorization) &&
      isTextValid(workAuthorizationExpiryDate) &&
      isTextValid(line1) &&
      isTextValid(line2) &&
      isTextValid(city) &&
      isTextValid(state) &&
      isTextValid(zipCode) &&
      isTextValid(country) &&
      isEmailValid(email) &&
      isTextValid(email) &&
      isTextValid(contactNumber?.toString()) &&
      isTextValid(faxNumber?.toString()) &&
      isTextValid(contractType)
    ) {
      dispatch(
        editCandidateData({
          id: data2?.candidateData?.candidateId?.id,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          workAuthorizationExpiryDate: workAuthorizationExpiryDate,
        })
      );
      dispatch(
        editClientData(
          data2?.candidateData?.candidateId?.personId,
          line1,
          line2,
          city,
          state,
          zipCode,
          country
        )
      );
      dispatch(
        editContactData(
          email,
          contactNumber,
          faxNumber,
          data2?.candidateData?.addressId[0]?.id
        )
      );

      for (let i = 0; i < workAuthorizationData?.length; i++) {
        if (workAuthorizationData[i]?.workAuthorization === workAuthorization) {
          dispatch(
            editCandidateWorkAuthorizationData({
              id: data2?.candidateData?.candidateId?.id,
              workAuthorizationId: workAuthorizationData[i]?.id,
            })
          );
          break;
        }
      }

      for (let i = 0; i < contractTypeData?.length; i++) {
        if (contractTypeData[i]?.contractType === contractType) {
          dispatch(
            editCandidateContractTypeData({
              id: data2?.candidateData?.candidateId?.id,
              contractTypeId: contractTypeData[i]?.id,
            })
          );
          break;
        }
      }

      setShowModal(false);
    } else {
      if (!firstNameValid) {
        setFirstNameError("First name should not be empty.");
      }
      if (!middleNameValid) {
        setMiddleNameError("Middle name should not be empty.");
      }
      if (!lastNameValid) {
        setLastNameError("Last name should not be empty.");
      }
      if (!workAuthorizationValid) {
        setWorkAuthorizationError("Work authorization should not be empty.");
      }
      if (!workAuthorizationExpiryDateValid) {
        setWorkAuthorizationExpiryDateError(
          "Work authorization expiry date should not be empty."
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
        setZipCodeError("Zip code should not be empty.");
      }
      if (!countryValid) {
        setCountryError("Country should not be empty.");
      }
      if (!isTextValid(email)) {
        setEmailError("Email should not be empty");
      }
      if (!isEmailValid(email) && emailValid) {
        setEmailError("Email is not valid");
      }
      if (!contactNumberValid) {
        setContactNumberError("Contact number should not be empty.");
      }
      if (!faxNumberValid) {
        setFaxNumberError("Fax number should not be empty.");
      }
      if (!contractTypeValid) {
        setContractTypeError("Contract type should not be empty.");
      }
    }
  }

  return (
    <>
      <div className="pt-10 pl-10 h-[70vh] overflow-auto" id="no-scroll-div">
        <Grid container spacing={2} columnGap={"15px"}>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatLabel
              label="Candidate first name"
              value={firstName}
              placeholder={""}
              handleChange={(event) => {
                setFirstName(event.target.value);
                setFirstNameValid(isTextValid(event.target.value));
                if (!firstNameValid) {
                  setFirstNameError("First name should not be empty.");
                }
              }}
              className=""
            />
            {!firstNameValid ? (
              <p
                className="text-left -mt-2 "
                style={{ fontSize: "12px", color: "red" }}
              >
                {firstNameError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatLabel
              label="Candidate middle name"
              value={middleName}
              placeholder={""}
              handleChange={(event) => {
                setMiddleName(event.target.value);
                setMiddleNameValid(isTextValid(event.target.value));
                if (!middleNameValid) {
                  setMiddleNameError("Middle name should not be empty.");
                }
              }}
              className=""
            />
            {!middleNameValid ? (
              <p
                className="text-left -mt-2"
                style={{ fontSize: "12px", color: "red" }}
              >
                {middleNameError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatLabel
              label="Candidate last name"
              value={lastName}
              placeholder={""}
              handleChange={(event) => {
                setLastName(event.target.value);
                setLastNameValid(isTextValid(event.target.value));
                if (!lastNameValid) {
                  setLastNameError("Last name should not be empty.");
                }
              }}
              className=""
            />
            {!lastNameValid ? (
              <p
                className="text-left -mt-2"
                style={{ fontSize: "12px", color: "red" }}
              >
                {lastNameError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            {/* <Select
              className='text-[13px] text-left'
              options={workAuthorizationResult}
              value={workAuthorization}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              onChange={(e: any) => {
                setWorkAuthorization(e);
                setWorkAuthorizationValid(isTextValid(e?.value));
                if (!workAuthorizationValid) {
                  setWorkAuthorizationError("Work authorization should not be empty.");
                }
              }}
              isSearchable={true}
            /> */}
            <FloatSelect
              labelId={"Work authorization"}
              options={workAuthorizationResult}
              label="Work authorization"
              value={workAuthorization + ""}
              handleChange={(e: any) => {
                setWorkAuthorization(e?.target?.value);
                setWorkAuthorizationValid(isTextValid(e?.target?.value));
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
            {!workAuthorizationValid ? (
              <p
                className="text-left -mt-2"
                style={{ fontSize: "12px", color: "red", marginBottom: "5px" }}
              >
                {workAuthorizationError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatLabel
              label="Work auth expiry date"
              type="date"
              value={workAuthorizationExpiryDate}
              placeholder={""}
              handleChange={(event) => {
                setWorkAuthorizationExpiryDate(event.target.value);
                setWorkAuthorizationExpiryDateValid(
                  isTextValid(event.target.value)
                );
                if (!workAuthorizationExpiryDateValid) {
                  setWorkAuthorizationExpiryDateError(
                    "Work authorization expiry date should not be empty."
                  );
                }
              }}
              className=""
            />
            {!workAuthorizationExpiryDateValid ? (
              <p
                className="text-left -mt-2"
                style={{ fontSize: "12px", color: "red" }}
              >
                {workAuthorizationExpiryDateError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatLabel
              label="Address line 1"
              value={line1}
              placeholder={""}
              handleChange={(event) => {
                setLine1(event.target.value);
                setLine1Valid(isTextValid(event.target.value));
                if (!line1Valid) {
                  setLine1Error("Line 1 should not be empty.");
                }
              }}
              className=""
            />
            {!line1Valid ? (
              <p
                className="text-left -mt-2"
                style={{ fontSize: "12px", color: "red" }}
              >
                {line1Error}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatLabel
              label="Address line 2"
              value={line2}
              placeholder={""}
              handleChange={(event) => {
                setLine2(event.target.value);
                setLine2Valid(isTextValid(event.target.value));
                if (!line2Valid) {
                  setLine2Error("Line 2 should not be empty.");
                }
              }}
            />
            {!line2Valid ? (
              <p
                className="text-left -mt-2"
                style={{ fontSize: "12px", color: "red" }}
              >
                {line2Error}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatLabel
              label="City"
              value={city}
              placeholder={""}
              handleChange={(event) => {
                setCity(event.target.value);
                setCityValid(isTextValid(event.target.value));
                if (!cityValid) {
                  setCityError("City should not be empty.");
                }
              }}
            />
            {!cityValid ? (
              <p
                className="text-left -mt-2"
                style={{ fontSize: "12px", color: "red" }}
              >
                {cityError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatSelect
              labelId={"Work state"}
              options={locationName}
              label="State"
              value={state + ""}
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
                className="-mt-2 text-left"
                style={{ fontSize: "12px", color: "red" }}
              >
                {stateError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatLabel
              label="Zip code"
              value={zipCode}
              placeholder={""}
              handleChange={(event) => {
                setZipCode(event.target.value.replace(/[^0-9]/gi, ""));
                setZipCodeValid(isTextValid(event.target.value));
                if (!zipCodeValid) {
                  setZipCodeError("Zip code should not be empty.");
                }
              }}
              className=""
            />
            {!zipCodeValid ? (
              <p
                className="-mt-2 text-left"
                style={{ fontSize: "12px", color: "red" }}
              >
                {zipCodeError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatLabel
              label="Country"
              value={country}
              placeholder={""}
              handleChange={(event) => {
                setCountry(event.target.value);
                setCountryValid(isTextValid(event.target.value));
                if (!countryValid) {
                  setCountryError("Country should not be empty.");
                }
              }}
              className=" "
            />
            {!countryValid ? (
              <p
                className="-mt-2 text-left"
                style={{ fontSize: "12px", color: "red" }}
              >
                {countryError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            {/* <span>*Client country</span> */}
            <FloatLabel
              label="Email address"
              value={email}
              placeholder={""}
              handleChange={(event) => {
                setEmail(event.target.value);
                setEmailValid(isEmailValid(event.target.value));
                if (!emailValid) {
                  setEmailError("Email is not valid.");
                }
              }}
              className=""
            />
            {!emailValid ? (
              <p
                className="-mt-2 text-left"
                style={{ fontSize: "12px", color: "red" }}
              >
                {emailError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatLabel
              label="Contact number"
              value={contactNumber}
              placeholder={""}
              handleChange={(event) => {
                setContactNumber(event.target.value.replace(/[^0-9]/gi, ""));
                setContactNumberValid(isTextValid(event.target.value));
                if (!contactNumberValid) {
                  setContactNumberError("Contact number should not be empty.");
                }
              }}
              className=""
            />
            {!contactNumberValid ? (
              <p
                className=" -mt-2 text-left"
                style={{ fontSize: "12px", color: "red" }}
              >
                {contactNumberError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatLabel
              label="Fax number"
              value={faxNumber}
              placeholder={""}
              handleChange={(event) => {
                setFaxNumber(event.target.value.replace(/[^0-9]/gi, ""));
                setFaxNumberValid(isTextValid(event.target.value));
                if (!faxNumberValid) {
                  setFaxNumberError("Fax number should not be empty.");
                }
              }}
            />
            {!faxNumberValid ? (
              <p
                className="-mt-2 text-left"
                style={{ fontSize: "12px", color: "red" }}
              >
                {faxNumberError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={5.5} className="mb-2">
            <FloatSelect
              labelId={"Contract type"}
              options={contractTypeResult}
              label="Contract type"
              value={contractType + ""}
              handleChange={(e: any) => {
                setContractType(e?.target?.value);
                setContractTypeValid(isTextValid(e?.target?.value));
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
            {!contractTypeValid ? (
              <p
                className="-mt-2 text-left"
                style={{ fontSize: "12px", color: "red" }}
              >
                {contractTypeError}
              </p>
            ) : null}
          </Grid>
        </Grid>
        {/* <Grid xs={12} md={12}> */}
        <div className="m-auto w-[20%] ml-[35%] text-white ">
          <Button
            className=""
            value="Update"
            handleClick={() => updateCandidate()}
            styles={{ fontSize: "16px" }}
          />
        </div>
        {/* </Grid> */}
      </div>
    </>
  );
};

export default ShowCandidate;
