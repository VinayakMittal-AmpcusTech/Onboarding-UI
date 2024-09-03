import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { TextField } from "@mui/material";
import { useAppDispatch } from "../../hooks/app";
import { editWorkAuthorizationData } from "../../actions/workAuthorization";
import "./wa.css";

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

const ShowWorkAuthorization: React.FC<Props> = ({
  open,
  setOpen,
  data,
  showTableCount,
}) => {
  const dispatch = useAppDispatch();
  const [disable, setDisable] = React.useState(true);
  const [id, setId] = React.useState(data.id);
  const [workAuthorization, setWorkAuthorization] = React.useState(
    data.workAuthorization
  );
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // if (count === 0 && data.personId) {
    setId(data.id);
    setWorkAuthorization(data.workAuthorization);
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
        sx={{
          height: "100%",
          width: "100%",
        }}
        style={{
          height: "100%",
          width: "100%",
        }}
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
                  dispatch(editWorkAuthorizationData(id, workAuthorization));
                  setDisable(true);
                  setOpen(false);
                  showTableCount(true);
                }}
              >
                <DoneIcon />
              </button>
            )}

            <TextField
              label="Work authorization"
              id="workAuthorization"
              value={workAuthorization}
              onChange={(event) => setWorkAuthorization(event.target.value)}
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

export default ShowWorkAuthorization;
