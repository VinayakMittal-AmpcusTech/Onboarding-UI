import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Button } from "../../common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { editWorkAuthorizationData } from "../../actions/workAuthorization";
import { isTextValid } from "../../helpers/validate";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";
interface Props {
  setShowModal: any;
  data: any;
}
const EditWorkAuthorization: React.FC<Props> = ({ setShowModal, data }) => {
  const dispatch = useAppDispatch();

  const [workAuthorization, setWorkAuthorization] = useState(
    data?.workAuthorization
  );

  const [workAuthorizationError, setWorkAuthorizationError] = useState<any>();

  const [workAuthorizationValid, setWorkAuthorizationValid] =
    useState<boolean>();

  useEffect(() => {
    setWorkAuthorization(data?.workAuthorization);
  }, [data]);

  function onSubmitClick() {
    setWorkAuthorizationValid(isTextValid(workAuthorization));
    if (workAuthorizationValid) {
      dispatch(editWorkAuthorizationData(data?.id, workAuthorization));
      setShowModal(false);
    } else {
      if (!workAuthorizationValid) {
        setWorkAuthorizationError("Work authorization is should not be empty");

        // setShowModal(false);
      }
    }
  }

  return (
    <>
      <div className="pt-5 px-5 ">
        <Grid container spacing={2}>
          <Grid xs={12} md={12}>
            <FloatLabel
              label="Work authorization type*"
              value={workAuthorization}
              placeholder={""}
              handleChange={(event) => {
                setWorkAuthorization(event.target.value);
                setWorkAuthorizationValid(isTextValid(event?.target?.value));
                if (!workAuthorizationValid) {
                  setWorkAuthorizationError(
                    "Work authorization is should not be empty"
                  );
                }
              }}
              className=""
            />
            {!workAuthorizationValid ? (
              <p
                className="-mt-2 mb-2"
                style={{ fontSize: "12px", color: "red", textAlign: "left" }}
              >
                {workAuthorizationError}
              </p>
            ) : null}
          </Grid>
        </Grid>
        <div className="  ml-36  block w-52">
          <Grid xs={1} md={1}>
            <div className="rate-revision-btn-div">
              <Button
                className="submit-btn"
                value="Update"
                handleClick={() => onSubmitClick()}
              />
            </div>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default EditWorkAuthorization;
