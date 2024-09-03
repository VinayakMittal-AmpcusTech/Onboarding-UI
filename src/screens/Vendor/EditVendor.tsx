import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import {
  setVendorInputBoxValue,
  updateOnlyVendorData,
} from "../../actions/vendor";
import { LocationName } from "../../constants/candidateclientconstants";
import { Button } from "../../common/Button/Button";
import { isEmailValid, isTextValid } from "../../helpers/validate";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";
import { editClientData } from "../../actions/client";
import { editContactData } from "../../actions/contact";
import { FloatSelect } from "../../common/FloatSelect/FloatSelect";

interface Props {
  setShowModal: any;
  data: any;
}
const EditVendor: React.FC<Props> = ({ setShowModal, data }) => {
  console.log("data: ", data);
  const dispatch = useAppDispatch();
  // const currentVendorData = useAppSelector(
  //   (state: RootState) => state.vendor.vendorData
  // );
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

  const [companyName, setCompanyName] = useState(data?.vendorId?.companyName);
  const [federalID, setFederalID] = useState(data?.vendorId?.federalId);
  const [contactPerson, setContactPerson] = useState(
    data?.vendorId?.contactPerson
  );
  const [companyEmailID, setCompanyEmailID] = useState(
    data?.addressId[0]?.contactDetailId?.email
  );
  const [contactNo, setContactNo] = useState(
    data?.addressId[0]?.contactDetailId?.contactNumber
  );
  const [faxNo, setFaxNo] = useState(
    data?.addressId[0]?.contactDetailId?.faxNumber
  );
  const [signAuthority, setSignAuthority] = useState(
    data?.vendorId?.signAuthority
  );
  const [signAuthorityDesignation, setSignAuthorityDesignation] = useState(
    data?.vendorId?.signAuthorityDesignation
  );
  const [stateOfIncorporation, setStateOfIncorporation] = useState(
    data?.vendorId?.stateOfIncorporation
  );
  const [line1, setLine1] = useState(data?.addressId[0]?.line1);
  const [line2, setLine2] = useState(data?.addressId[0]?.line2);
  const [city, setCity] = useState(data?.addressId[0]?.city);
  const [state, setState] = useState(data?.addressId[0]?.state);
  const [zipCode, setZipCode] = useState(data?.addressId[0]?.zipCode);
  const [country, setCountry] = useState(data?.addressId[0]?.country);

  useEffect(() => {
    setCompanyName(data?.vendorId?.companyName);
    setFederalID(data?.vendorId?.federalId);
    setContactPerson(data?.vendorId?.contactPerson);
    setCompanyEmailID(data?.addressId[0]?.contactDetailId?.email);
    setContactNo(data?.addressId[0]?.contactDetailId?.contactNumber);
    setFaxNo(data?.addressId[0]?.contactDetailId?.faxNumber);
    setSignAuthority(data?.vendorId?.signAuthority);
    setSignAuthorityDesignation(data?.vendorId?.signAuthorityDesignation);
    setStateOfIncorporation(data?.vendorId?.stateOfIncorporation);
    setLine1(data?.addressId[0]?.line1);
    setLine2(data?.addressId[0]?.line2);
    setCity(data?.addressId[0]?.city);
    setState(data?.addressId[0]?.state);
    setZipCode(data?.addressId[0]?.zipCode);
    setCountry(data?.addressId[0]?.country);
  }, [data]);

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

  const [errors, setErrors] = useState<any>({});

  function onSubmitClick() {
    setCompanyNameValid(isTextValid(companyName));
    setFederalIDValid(isTextValid(federalID));
    setContactPersonValid(isTextValid(contactPerson));
    setCompanyEmailIDValid(isEmailValid(companyEmailID));
    setContactNoValid(isTextValid(contactNo.toString()));
    setFaxNoValid(isTextValid(faxNo.toString()));
    setSignAuthorityValid(isTextValid(signAuthority));
    setSignAuthorityDesignationValid(isTextValid(signAuthorityDesignation));
    setStateOfIncorporationValid(isTextValid(stateOfIncorporation));
    setLine1Valid(isTextValid(line1));
    setLine2Valid(isTextValid(line2));
    setCityValid(isTextValid(city));
    setStateValid(isTextValid(state));
    setZipCodeValid(isTextValid(zipCode.toString()));
    setCountryValid(isTextValid(country));

    if (
      isTextValid(companyName) &&
      isTextValid(federalID) &&
      isTextValid(contactPerson) &&
      isEmailValid(companyEmailID) &&
      isTextValid(contactNo.toString()) &&
      isTextValid(faxNo.toString()) &&
      isTextValid(signAuthority) &&
      isTextValid(signAuthorityDesignation) &&
      isTextValid(stateOfIncorporation) &&
      isTextValid(line1) &&
      isTextValid(line2) &&
      isTextValid(city) &&
      isTextValid(state) &&
      isTextValid(zipCode.toString()) &&
      isTextValid(country)
    ) {
      dispatch(
        updateOnlyVendorData(
          data?.vendorId?.id,
          companyName,
          federalID,
          contactPerson,
          signAuthority,
          signAuthorityDesignation,
          stateOfIncorporation
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
      dispatch(
        editContactData(
          companyEmailID,
          contactNo,
          faxNo,
          data?.addressId[0]?.id
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
        setFaxNoError("Fax no should not be empty.");
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

  return (
    <>
      <div className="pt-5 px-5 h-[65vh] overflow-auto" id="no-scroll-div">
        <Grid container spacing={2}>
          <Grid xs={6} md={6}>
            <FloatLabel
              label="Vendor name*"
              value={companyName}
              placeholder={""}
              handleChange={(event) => {
                setCompanyName(event?.target?.value);
                setCompanyNameValid(isTextValid(event?.target?.value));
                if (!companyNameValid) {
                  setCompanyNameError("Company name should not be empty.");
                }
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
              value={federalID}
              placeholder={""}
              handleChange={(event) => {
                setFederalID(event?.target?.value);
                setFederalIDValid(isTextValid(event?.target?.value));
                if (!federalIDValid) {
                  setFederalIDError("Federal id should not be empty");
                }
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
              value={contactPerson}
              placeholder={""}
              handleChange={(event) => {
                setContactPerson(event?.target?.value);
                setContactPersonValid(isTextValid(event?.target?.value));
                if (!contactPersonValid) {
                  setContactPersonError("Contact person should not be empty.");
                }
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
              label=" Email Id*"
              value={companyEmailID}
              placeholder={""}
              handleChange={(event) => {
                console.log(event.target.value);
                setCompanyEmailID(event?.target?.value.replace(/\s/g, ""));
                setCompanyEmailIDValid(
                  isEmailValid(event?.target?.value.replace(/\s/g, ""))
                );
                if (!companyEmailIDValid) {
                  setCompanyEmailIDError(
                    "Company email id should not be empty."
                  );
                }
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
              label="Company contact no*"
              value={contactNo}
              placeholder={""}
              handleChange={(event) => {
                setContactNo(event.target.value.replace(/[^0-9]/gi, ""));
                setContactNoValid(isTextValid(event?.target?.value));
                if (!contactNoValid) {
                  setContactNoError("Contact no should not be empty.");
                }
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
              value={faxNo}
              placeholder={""}
              handleChange={(event) => {
                setFaxNo(event.target.value.replace(/[^0-9]/gi, ""));
                setFaxNoValid(isTextValid(event?.target?.value));
                if (!faxNoValid) {
                  setFaxNoError("Fax no should not be empty.");
                }
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
              value={signAuthority}
              placeholder={""}
              handleChange={(event) => {
                setSignAuthority(event?.target?.value);
                setSignAuthorityValid(isTextValid(event?.target?.value));
                if (!signAuthorityValid) {
                  setSignAuthorityError("Sign authority should not be empty.");
                }
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
              label="Designation sign authority*"
              value={signAuthorityDesignation}
              placeholder={""}
              handleChange={(event) => {
                setSignAuthorityDesignation(event?.target?.value);
                setSignAuthorityDesignationValid(
                  isTextValid(event?.target?.value)
                );
                if (!signAuthorityDesignationValid) {
                  setSignAuthorityDesignationError(
                    "Sign authority designation should not be empty."
                  );
                }
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
              label="State of incorporation*"
              value={stateOfIncorporation}
              placeholder={""}
              handleChange={(event) => {
                setStateOfIncorporation(event?.target?.value);
                setStateOfIncorporationValid(isTextValid(event?.target?.value));
                if (!stateOfIncorporationValid) {
                  setStateOfIncorporationError(
                    "State of incorporation should not be empty."
                  );
                }
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
              value={line1}
              placeholder={""}
              handleChange={(event) => {
                setLine1(event?.target?.value);
                setLine1Valid(isTextValid(event?.target?.value));
                if (!line1Valid) {
                  setLine1Error("Line1 should not be empty.");
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
            {/* <span>Vendor address line 2</span> */}
            <FloatLabel
              label="Vendor address line 2*"
              value={line2}
              placeholder={""}
              handleChange={(event) => {
                setLine2(event?.target?.value);
                setLine2Valid(isTextValid(event?.target?.value));
                if (!line2Valid) {
                  setLine2Error("Line2 should not be empty.");
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
            {/* <span>Vendor city</span> */}
            <FloatLabel
              label="Vendor city*"
              value={city}
              placeholder={""}
              handleChange={(event) => {
                setCity(event?.target?.value);
                setCityValid(isTextValid(event?.target?.value));
                if (!cityValid) {
                  setCityError("City should not be empty.");
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
            {/* <span>Vendor zip code</span> */}
            <FloatLabel
              label="Vendor zip code*"
              value={zipCode}
              placeholder={""}
              handleChange={(event) => {
                setZipCode(event?.target?.value.replace(/[^0-9]/gi, ""));
                setZipCodeValid(
                  isTextValid(event?.target?.value.replace(/[^0-9]/gi, ""))
                );
                if (!zipCodeValid) {
                  setZipCodeError("Zip code should not be empty.");
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
            <FloatSelect
              labelId={"Vendor state*"}
              options={locationName}
              label="Work state"
              value={state}
              handleChange={(e: any) => {
                setState(e?.target?.value);
                setStateValid(isTextValid(e?.target?.value));
                if (!stateValid) {
                  setStateError("State should not be empty.");
                }
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
                className="text-left -mt-3"
                style={{ fontSize: "12px", color: "red" }}
              >
                {stateError}
              </p>
            ) : null}
          </Grid>
          <Grid xs={6} md={6}>
            {/* <span>Vendor Country</span> */}
            <FloatLabel
              label="Vendor country*"
              value={country}
              placeholder={""}
              handleChange={(event) => {
                setCountry(event?.target?.value);
                setCountryValid(isTextValid(event?.target?.value));
                if (!countryValid) {
                  setCountryError("Country should not be empty.");
                }
              }}
              className=""
            />
            {!countryValid ? (
              <p
                className="text-left -mt-2 "
                style={{ fontSize: "12px", color: "red" }}
              >
                {countryError}
              </p>
            ) : null}
          </Grid>
        </Grid>

        <Grid xs={12} md={12}>
          <div className="m-auto w-[30%] ml-[35%] text-white ">
            <Button
              className=""
              value="Update vendor"
              handleClick={() => onSubmitClick()}
              styles={{ fontSize: "16px" }}
            />
          </div>
        </Grid>
      </div>
    </>
  );
};

export default EditVendor;
