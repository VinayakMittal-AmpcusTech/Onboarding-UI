import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "../../common/TextField/TextField";
import { Button } from "../../common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/app";
import { RootState } from "../../redux/store";
import {
  editContractTypeData,
  saveContractTypeData,
  setContractTypeInputBoxValue,
} from "../../actions/contractType";
import { isTextValid } from "../../helpers/validate";
import { FloatLabel } from "../../common/FloatLabel/FloatLabel";

interface Props {
  setShowModal: any;
  data: any;
}

const EditContractType: React.FC<Props> = ({ setShowModal, data }) => {
  console.log("data: ", data);
  const dispatch = useAppDispatch();

  const [contractType, setContractType] = useState(data?.contractType);

  const [contractTypeError, setContractTypeError] = useState<any>();

  const [contractTypeValid, setContractTypeValid] = useState<boolean>();

  useEffect(() => {
    setContractType(data?.contractType);
  }, [data]);

  function onSubmitClick() {
    setContractTypeValid(isTextValid(contractType));
    if (contractTypeValid) {
      dispatch(editContractTypeData(data?.id, contractType));
      setShowModal(false);
    } else {
      if (!contractTypeValid) {
        setContractTypeError("Contract type should not be empty");
        // setShowModal(false);
      }
    }
  }

  return (
    <>
      {/* <h2>Contract type</h2> */}
      <div className="pt-5 px-5">
        <Grid container spacing={2}>
          <Grid xs={12} md={12}>
            <FloatLabel
              label="Contract type*"
              value={contractType}
              placeholder={""}
              handleChange={(event) => {
                // onContractTypeValueChange("contractType", event.target.value);
                setContractType(event.target.value);
                setContractTypeValid(isTextValid(event.target.value));
                if (!contractTypeValid) {
                  setContractTypeError("Contract type should not be empty");
                }
              }}
              className=""
            />
            {!contractTypeValid ? (
              <p
                className="-mt-2 mb-2 text-left"
                style={{ fontSize: "12px", color: "red" }}
              >
                {contractTypeError}
              </p>
            ) : null}
          </Grid>
        </Grid>
        <div className=" ml-36 my-3  block w-52">
          <Grid xs={6} md={6}>
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

export default EditContractType;
