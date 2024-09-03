import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "../../common/TextField/TextField";
import { Button } from "../../common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import {
  saveWorkAuthorizationData,
  setWorkAuthorizationInputBoxValue,
} from "../../actions/workAuthorization";
import { isTextValid } from "../../helpers/validate";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";
import axios from "axios";

interface Props {
  setShowModal: any;
}
const AddWorkAuthorization: React.FC<Props> = ({ setShowModal }) => {
  const dispatch = useAppDispatch();
  const workAuthorization = useAppSelector(
    (state: RootState) => state.workAuthorization.workAuthorizationData
  );

  const onWorkAuthorizationValueChange = (key: any, value: any) => {
    dispatch(setWorkAuthorizationInputBoxValue(key, value));
  };

  const [workAuthorizationError, setWorkAuthorizationError] = useState<any>();

  const [workAuthorizationValid, setWorkAuthorizationValid] =
    useState<boolean>();

  useEffect(() => {
    setWorkAuthorizationValid(
      isTextValid(workAuthorization?.workAuthorization)
    );
  }, [workAuthorization]);

  function onSubmitClick() {
    setWorkAuthorizationValid(
      isTextValid(workAuthorization?.workAuthorization)
    );
    if (workAuthorizationValid) {
      dispatch(saveWorkAuthorizationData(workAuthorization?.workAuthorization));
      setShowModal(false);
    } else {
      if (!workAuthorizationValid) {
        setWorkAuthorizationError("Work authorization is invalid");
      }
    }
  }
  return (
    <>
      <div className="pt-5 px-5">
        <button></button>
        <Grid container spacing={2}>
          <Grid xs={12} md={12}>
            <FloatLabel
              label="Work authorization type*"
              value={workAuthorization?.workAuthorization}
              placeholder={""}
              handleChange={(event) => {
                onWorkAuthorizationValueChange(
                  "workAuthorization",
                  event.target.value
                );
              }}
              className=""
            />
            {!workAuthorizationValid ? (
              <p
                className=""
                style={{
                  fontSize: "12px",
                  color: "red",
                  textAlign: "left",
                  marginBottom: "5px",
                }}
              >
                {workAuthorizationError}
              </p>
            ) : null}
          </Grid>
        </Grid>
        <div className=" ml-36  block w-52">
          <Grid xs={6} md={6}>
            <div className="rate-revision-btn-div ">
              <Button
                className="submit-btn"
                value="Submit"
                handleClick={() => onSubmitClick()}
              />
            </div>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default AddWorkAuthorization;
