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
import { editJobData } from "../../actions/job";

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

const ShowJob: React.FC<Props> = ({ open, setOpen, data, showTableCount }) => {
  const dispatch = useAppDispatch();
  const [disable, setDisable] = React.useState(true);
  const [id, setId] = React.useState(data.id);
  const [jobDescription, setJobDescription] = React.useState(
    data.jobDescription
  );
  const [jobDivaId, setJobDivaId] = React.useState(data.jobDivaId);
  const [jobTitle, setJobTitle] = React.useState(data.jobTitle);
  const [jobType, setJobType] = React.useState(data.jobType);
  const [lineOfBusiness, setLineOfBusiness] = React.useState(
    data.lineOfBusiness
  );
  const [requestId, setRequestId] = React.useState(data.requestId);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // if (count === 0 && data.personId) {
    setId(data.id);
    setJobDescription(data.jobDescription);
    setJobDivaId(data.jobDivaId);
    setJobTitle(data.jobTitle);
    setJobType(data.jobType);
    setLineOfBusiness(data.lineOfBusiness);
    setRequestId(data.requestId);
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
                    editJobData(
                      id,
                      requestId,
                      jobDivaId,
                      jobTitle,
                      jobType,
                      lineOfBusiness,
                      jobDescription
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
              label="Job Description"
              id="jobDescription"
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              size="small"
              variant="standard"
              disabled={disable}
            />
            <TextField
              label="Job Diva Id"
              id="jobDivaId"
              value={jobDivaId}
              onChange={(event) => setJobDivaId(event.target.value)}
              size="small"
              variant="standard"
              disabled={disable}
            />
            <TextField
              label="Job Title"
              id="jobTitle"
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
              size="small"
              variant="standard"
              disabled={disable}
            />
            <TextField
              label="Job Type"
              id="jobType"
              value={jobType}
              onChange={(event) => setJobType(event.target.value)}
              size="small"
              variant="standard"
              disabled={disable}
            />
            <TextField
              label="Line of business"
              id="lineOfBusiness"
              value={lineOfBusiness}
              onChange={(event) => setLineOfBusiness(event.target.value)}
              size="small"
              variant="standard"
              disabled={disable}
            />
            <TextField
              label="Request id"
              id="requestId"
              value={requestId}
              onChange={(event) => setRequestId(event.target.value)}
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

export default ShowJob;
