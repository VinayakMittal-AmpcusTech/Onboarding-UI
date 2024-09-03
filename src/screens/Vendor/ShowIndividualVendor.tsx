import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { TextField } from "@mui/material";
import { editClientData } from "../../actions/client";
import { useAppDispatch } from "../../hooks/app";
import { editVendorData } from "../../actions/vendor";

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
}

const ShowVendor: React.FC<Props> = ({
  open,
  setOpen,
  data,
  showTableCount,
}) => {
  const dispatch = useAppDispatch();
  const [disable, setDisable] = React.useState(true);
  const [line1, setLine1] = React.useState(data.line1);
  const [line2, setLine2] = React.useState(data.line2);
  const [city, setCity] = React.useState(data.city);
  const [state, setState] = React.useState(data.state);
  const [zipCode, setZipCode] = React.useState(data.zipCode);
  const [country, setCountry] = React.useState(data.country);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // if (count === 0 && data.personId) {
    setLine1(data.line1);
    setLine2(data.line2);
    setCity(data.city);
    setState(data.state);
    setZipCode(data.zipCode);
    setCountry(data.country);
    setCount(1);
    // }
  }, [data]);

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
        // style={{
        //   borderRadius: "10px",
        //   alignItems: 'center'
        // }}
      >
        <Box sx={style}>
          <button
            style={{ float: "right" }}
            onClick={() => {
              setOpen(false);
              setDisable(true);
            }}
          >
            <CloseIcon />
          </button>
          <Typography id="spring-modal-title" variant="h4" component="h2">
            {data.companyName}
          </Typography>
          <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            {disable ? (
              <button
                style={{ float: "right" }}
                onClick={() => setDisable(false)}
              >
                <EditIcon />
              </button>
            ) : (
              <button
                style={{ float: "right" }}
                onClick={() => {
                  dispatch(
                    editVendorData(
                      data.personId,
                      line1,
                      line2,
                      city,
                      state,
                      zipCode,
                      country
                    )
                  );
                  setDisable(true);
                  setOpen(false);
                  showTableCount(true);
                }}
              >
                <DoneIcon />
              </button>
            )}

            <TextField
              label="Line 1"
              id="Line 1"
              value={line1}
              onChange={(event) => setLine1(event.target.value)}
              size="small"
              variant="standard"
              disabled={disable}
            />
            <TextField
              label="Line 2"
              id="Line 2"
              value={line2}
              onChange={(event) => setLine2(event.target.value)}
              size="small"
              variant="standard"
              disabled={disable}
            />
            <TextField
              label="City"
              id="City"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              size="small"
              variant="standard"
              disabled={disable}
            />
            <TextField
              label="State"
              id="State"
              value={state}
              onChange={(event) => setState(event.target.value)}
              size="small"
              variant="standard"
              disabled={disable}
            />
            <TextField
              label="Zipcode"
              id="Zipcode"
              value={zipCode}
              onChange={(event) => setZipCode(event.target.value)}
              size="small"
              variant="standard"
              disabled={disable}
            />
            <TextField
              label="Country"
              id="Country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              size="small"
              variant="standard"
              disabled={disable}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ShowVendor;
