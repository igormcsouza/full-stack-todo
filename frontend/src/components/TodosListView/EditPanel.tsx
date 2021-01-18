import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";

import { Itask } from "./index";

interface IEditPanel {
  task: Itask;
  open: boolean;
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditPanel: React.FC<IEditPanel> = (props: IEditPanel) => {
  const [taskName, setTaskName] = useState(props.task.task);

  const handleSave = (task: Itask, closePanel: () => void) => {
    closePanel();
  };

  const handleTaskNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTaskName(e.target.value);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Edit this Task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            defaultValue={taskName}
            onChange={handleTaskNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSave(props.task, props.onClose);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPanel;
