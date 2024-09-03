// import * as React from 'react';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { TextField } from "../../common/TextField/TextField";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import {
  ArticlesOfIncorporationList,
  CertificateOfInsuranceList,
  CipcicaCipcicuList,
  ClientTaskOrderOrSOWList,
  ClientTaskOrderOrSOWStepList,
  ClientTaskOrderSigningList,
  DirectDepositeAgreementList,
  DocumentationStatusList,
  EVerifyList,
  EemergencyFormList,
  GoodStandingDocumentationList,
  I9FormList,
  ListADocumentsList,
  ListBDocumentsList,
  ListCDocumentsList,
  MSAList,
  SOWList,
  VaccinationStatusList,
  VoidCheckEmailList,
  W9W4List,
  WorkAuthorizeDocumentationList,
  yesNoList,
} from "../../constants/constants";
import Select from "react-select";
import { Modal } from "../../common/Modal/Modal";
import { DropDown } from "../../common/DropDown/DropDown";
import { DatePicker } from "../../common/DatePicker/DatePicker";
import moment from "moment";
import { Button } from "../../common/Button/Button";
import { editRaterevisionData } from "../../actions/raterevision";
import { RootState } from "../../redux/store";
import React, { useState } from "react";
import { Grid, TextField as TextField1 } from "@mui/material";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";
import { isTextValid } from "../../helpers/validate";
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
  data: any;
  showTableCount: any;
  int: any;
  setShowModal: any;
}

const ShowRateRevision: React.FC<Props> = ({
  open,
  setOpen,
  // data,
  showTableCount,
  int,
  setShowModal,
}) => {
  const dispatch = useAppDispatch();
  let data = useAppSelector(
    (state: RootState) => state?.rateRevision?.singleRateRevisionData
  );
  const [disable, setDisable] = React.useState(true);
  const [count, setCount] = React.useState(0);

  const [grossBr, setGrossBr] = React.useState(data?.grossBr);

  const [healthB, setHealthB] = React.useState(data?.healthB);

  const [margin, setMargin] = React.useState(data?.margin);

  const [mspFee, setMspFee] = React.useState(data?.mspFee);

  const [mspFeePercentage, setMspFeePercentage] = React.useState(
    data?.mspFeePercentage
  );

  const [netBillRate, setNetBillRate] = React.useState(data?.netBillRate);

  const [netPurchase, setNetPurchase] = React.useState(data?.netPurchase);

  const [optedForHB, setOptedForHB] = React.useState(data?.optedForHB);

  const [payRate, setPayRate] = React.useState(data?.payRate);

  const [rateRevisionReason, setRateRevisionReason] = React.useState(
    data?.rateRevisionReason
  );

  const [refFee, setRefFee] = React.useState(data?.refFee);

  const [taxOH, setTaxOH] = React.useState(data?.taxOH);

  const [taxOHPercentage, setTaxOHPercentage] = React.useState(
    data?.taxOHPercentage
  );

  React.useEffect(() => {
    setGrossBr(data?.grossBr);
    setHealthB(data?.healthB);
    setMargin(data?.margin);
    setMspFee(data?.mspFee);
    setMspFeePercentage(data?.mspFeePercentage);
    setNetBillRate(data?.netBillRate);
    setNetPurchase(data?.netPurchase);
    setOptedForHB(data?.optedForHB);
    setPayRate(data?.payRate);
    setRateRevisionReason(data?.rateRevisionReason);
    setRefFee(data?.refFee);
    setTaxOH(data?.taxOH);
    setTaxOHPercentage(data?.taxOHPercentage);
    setCount(1);
  }, [data]);

  const updatingObject = {
    grossBr: grossBr,
    healthB: healthB,
    margin: margin,
    mspFee: mspFee,
    mspFeePercentage: mspFeePercentage,
    netBillRate: netBillRate,
    netPurchase: netPurchase,
    optedForHB: optedForHB,
    payRate: payRate,
    rateRevisionReason: rateRevisionReason,
    refFee: refFee,
    taxOH: taxOH,
    taxOHPercentage: taxOHPercentage,
    candidateId: data?.candidateId,
  };

  const [grossBrValid, setGrossBrValid] = useState<boolean>();
  const [marginValid, setMarginValid] = useState<boolean>();
  const [mspFeeValid, setMspFeeValid] = useState<boolean>();
  const [mspFeePercentageValid, setMspFeePercentageValid] = useState<boolean>();
  const [netBillRateValid, setNetBillRateValid] = useState<boolean>();
  const [netPurchaseValid, setNetPurchaseValid] = useState<boolean>();
  const [optedForHBValid, setOptedForHBValid] = useState<boolean>();
  const [payRateValid, setPayRateValid] = useState<boolean>();
  const [rateRevisionReasonValid, setRateRevisionReasonValid] =
    useState<boolean>();
  const [refFeeValid, setRefFeeValid] = useState<boolean>();
  const [taxOHValid, setTaxOHValid] = useState<boolean>();
  const [taxOHPercentageValid, setTaxOHPercentageValid] = useState<boolean>();

  const [healthBValid, sethealthBValid] = useState<boolean>();

  const [grossBrError, setGrossBrError] = useState<any>();
  const [marginError, setMarginError] = useState<any>();
  const [mspFeeError, setMspFeeError] = useState<any>();
  const [mspFeePercentageError, setMspFeePercentageError] = useState<any>();
  const [netBillRateError, setNetBillRateError] = useState<any>();
  const [netPurchaseError, setNetPurchaseError] = useState<any>();
  const [optedForHBError, setOptedForHBError] = useState<any>();
  const [payRateError, setPayRateError] = useState<any>();
  const [rateRevisionReasonError, setRateRevisionReasonError] = useState<any>();
  const [refFeeError, setRefFeeError] = useState<any>();
  const [taxOHError, setTaxOHError] = useState<any>();
  const [taxOHPercentageError, setTaxOHPercentageError] = useState<any>();
  const [healthBError, setHealthBError] = useState<any>();

  function updateCandidateRateRevision() {
    console.log("margin: ", margin);
    console.log("rateRevisionReason: ", rateRevisionReason);

    setGrossBrValid(isTextValid(grossBr));
    sethealthBValid(isTextValid(healthB));
    setMarginValid(isTextValid(margin));
    setMspFeeValid(isTextValid(mspFee));
    setMspFeePercentageValid(isTextValid(mspFeePercentage));
    setNetBillRateValid(isTextValid(netBillRate));
    setNetPurchaseValid(isTextValid(netPurchase));
    setOptedForHBValid(isTextValid(optedForHB));
    setPayRateValid(isTextValid(payRate));
    setRateRevisionReasonValid(isTextValid(rateRevisionReason));
    setRefFeeValid(isTextValid(refFee));
    setTaxOHValid(isTextValid(taxOH));
    setTaxOHPercentageValid(isTextValid(taxOHPercentage));

    if (
      isTextValid(grossBr) &&
      isTextValid(healthB) &&
      isTextValid(margin) &&
      isTextValid(mspFee) &&
      isTextValid(mspFeePercentage) &&
      isTextValid(netBillRate) &&
      isTextValid(netPurchase) &&
      isTextValid(optedForHB) &&
      isTextValid(payRate) &&
      isTextValid(rateRevisionReason) &&
      isTextValid(refFee) &&
      isTextValid(taxOH) &&
      isTextValid(taxOHPercentage)
    ) {
      dispatch(editRaterevisionData(updatingObject));
      setShowModal(false);
    } else {
      setGrossBrError("Gross br should not be empty.");
      setHealthBError("Health benefits cost should not be empty.");
      setMarginError("Margin should not be empty.");
      setMspFeeError("Msp fee should not be empty.");
      setMspFeePercentageError("Msp fee percentage should not be empty.");
      setNetBillRateError("Net bill rate should not be empty.");
      setNetPurchaseError("Net purchase should not be empty.");
      setOptedForHBError("Opted for health benefits should not be empty.");
      setPayRateError("Pay rate should not be empty.");
      setRateRevisionReasonError("Rate revision should not be empty.");
      setRefFeeError("Rate revision should not be empty.");
      setTaxOHError("Tax OH should not be empty.");
      setTaxOHPercentageError("Tax OH percentage should not be empty.");
    }
  }

  return (
    <div className="pt-10 pl-10 h-[60vh] overflow-auto" id="no-scroll-div">
      <Grid container spacing={2} columnGap={"15px"}>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatLabel
            label="Gross BR"
            value={grossBr}
            placeholder={""}
            handleChange={(event) => {
              setGrossBr(event.target.value);
              setGrossBrValid(isTextValid(event.target.value));
              if (!grossBrValid) {
                setGrossBrError("Gross br should not be empty.");
              }
            }}
            className=""
          />
          {!grossBrValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {grossBrError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatLabel
            label="Health benefits cost"
            value={healthB}
            placeholder={""}
            handleChange={(event) => {
              setHealthB(event.target.value);
              sethealthBValid(isTextValid(event.target.value));
              if (!healthBValid) {
                setHealthBError("Health benefits cost should not be empty.");
              }
            }}
            className=""
          />
          {!healthBValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {healthBError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatLabel
            label="Margin"
            value={margin}
            placeholder={""}
            handleChange={(event) => {
              setMargin(event.target.value);
              setMarginValid(isTextValid(event.target.value));
              if (!marginValid) {
                setMarginError("Margin should not be empty.");
              }
            }}
            className=""
          />
          {!marginValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {marginError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatLabel
            label="MSP fee"
            value={mspFee}
            placeholder={""}
            handleChange={(event) => {
              setMspFee(event.target.value);
              setMspFeeValid(isTextValid(event.target.value));
              if (!mspFeeValid) {
                setMspFeeError("Msp fee should not be empty.");
              }
            }}
            className=""
          />
          {!mspFeeValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {mspFeeError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatLabel
            label="MSP fee percentage"
            value={mspFeePercentage}
            placeholder={""}
            handleChange={(event) => {
              setMspFeePercentage(event.target.value);
              setMspFeePercentageValid(isTextValid(event.target.value));
              if (!mspFeePercentageValid) {
                setMspFeePercentageError(
                  "Msp fee percentage should not be empty."
                );
              }
            }}
            className=""
          />
          {!mspFeePercentageValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {mspFeePercentageError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatLabel
            label="Net bill rate"
            value={netBillRate}
            placeholder={""}
            handleChange={(event) => {
              setNetBillRate(event.target.value);
              setNetBillRateValid(isTextValid(event.target.value));
              if (!netBillRateValid) {
                setNetBillRateError("Net bill rate should not be empty.");
              }
            }}
            className=""
          />
          {!netBillRateValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {netBillRateError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatLabel
            label="Net purchase"
            value={netPurchase}
            placeholder={""}
            handleChange={(event) => {
              setNetPurchase(event.target.value);
              setNetPurchaseValid(isTextValid(event.target.value));
              if (!netPurchaseValid) {
                setNetPurchaseError("Net purchase should not be empty.");
              }
            }}
            className=""
          />
          {!netPurchaseValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {netPurchaseError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatSelect
            labelId={"Health benefits opted"}
            options={yesNoList}
            label="Health benefits opted"
            value={optedForHB}
            handleChange={(e: any) => {
              setOptedForHB(e?.target?.value);
              setOptedForHBValid(isTextValid(e?.target?.value));
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
          {!optedForHBValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {optedForHBError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatLabel
            label="Pay rate"
            value={payRate}
            placeholder={""}
            handleChange={(event) => {
              setPayRate(event.target.value);
              setPayRateValid(isTextValid(event.target.value));
              if (!payRateValid) {
                setPayRateError("Pay rate should not be empty.");
              }
            }}
            className=""
          />
          {!payRateValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {payRateError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatLabel
            label="Rate revision reason"
            value={rateRevisionReason}
            placeholder={""}
            handleChange={(event) => {
              setRateRevisionReason(event.target.value);
              setRateRevisionReasonValid(isTextValid(event.target.value));
              if (!rateRevisionReasonValid) {
                setRateRevisionReasonError(
                  "Rate revision should not be empty."
                );
              }
            }}
            className=""
          />
          {!rateRevisionReasonValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {rateRevisionReasonError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatLabel
            label="Ref fee"
            value={refFee}
            placeholder={""}
            handleChange={(event) => {
              setRefFee(event.target.value);
              setRefFeeValid(isTextValid(event.target.value));
              if (!refFeeValid) {
                setRefFeeError("Rate revision should not be empty.");
              }
            }}
            className=""
          />
          {!refFeeValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {refFeeError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatLabel
            label="Tax OH"
            value={taxOH}
            placeholder={""}
            handleChange={(event) => {
              setTaxOH(event.target.value);
              setTaxOHValid(isTextValid(event.target.value));
              if (!taxOHValid) {
                setTaxOHError("Tax OH should not be empty.");
              }
            }}
            className=""
          />
          {!taxOHValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {taxOHError}
            </p>
          ) : null}
        </Grid>
        <Grid xs={6} md={5.5} className="mb-2">
          <FloatLabel
            label="Tax OH percentage"
            value={taxOHPercentage}
            placeholder={""}
            handleChange={(event) => {
              setTaxOHPercentage(event.target.value);
              setTaxOHPercentageValid(isTextValid(event.target.value));
              if (!taxOHPercentageValid) {
                setTaxOHPercentageError(
                  "Tax OH percentage should not be empty."
                );
              }
            }}
            className=""
          />
          {!taxOHPercentageValid ? (
            <p
              className="-mt-2 text-left"
              style={{ fontSize: "12px", color: "red" }}
            >
              {taxOHPercentageError}
            </p>
          ) : null}
        </Grid>
      </Grid>
      <div className="m-auto w-[20%] ml-[35%] text-white ">
        <Button
          className=""
          value="update"
          handleClick={() => {
            updateCandidateRateRevision();
          }}
          styles={{ fontSize: "16px" }}
        />
      </div>
    </div>
  );
};

export default ShowRateRevision;
