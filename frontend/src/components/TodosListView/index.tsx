import React, { useState, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Checkbox,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

import EditPanel from "./EditPanel";
import { TodoContext, Todo } from "../../TodoContext";
import { update_todo, delete_todo } from "../../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      height: 250,
      backgroundColor: theme.palette.background.paper,
      flexWrap: "wrap",
      overflowY: "scroll",
      WebkitOverflowScrolling: "touch",
    },
    whenDone: {
      textDecoration: "line-through",
      textDecorationColor: "#8B8B8B",
      textDecorationThickness: "2px",
      color: "#8B8B8B",
    },
  })
);

const TodosListView: React.FC<{}> = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(TodoContext);

  const [currentTask, setCurrentTask] = useState<Todo>({
    _id: "",
    task: "",
    when: "",
    done: false,
    by: "",
  });
  const [toggleEditPanel, setToggleEditPanel] = useState(false);

  const handleCheckingTask = (value: Todo) => () => {
    value.done = !value.done;

    update_todo(value).then(() => {
      if (dispatch) dispatch({ type: "TRIGGER", payload: true });
    });
  };

  const handleEdit = (value: Todo) => () => {
    setCurrentTask(value);
    setToggleEditPanel(true);
  };

  const handleDelete = (value: Todo) => () => {
    delete_todo(value).then(() => {
      if (dispatch) dispatch({ type: "TRIGGER", payload: true });
    });
  };

  return (
    <List className={classes.root}>
      {state && state.todos ? (
        state.todos.map((value) => {
          const labelId = `checkbox-list-label-${value._id}`;

          return (
            <div key={value._id}>
              {/*Edit Panel Opens when Edit Button is clicked*/}
              <EditPanel
                task={currentTask}
                open={toggleEditPanel}
                onClose={() => {
                  setToggleEditPanel(false);
                }}
              />

              {/* Actual List Items */}
              <ListItem
                key={value._id}
                role={undefined}
                dense
                button
                onClick={handleCheckingTask(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value.done}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  className={value.done ? classes.whenDone : undefined}
                  id={labelId}
                  primary={value.task}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={handleEdit(value)}
                    edge="end"
                    aria-label="edit-task"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={handleDelete(value)}
                    edge="end"
                    aria-label="delete-task"
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </List>
  );
};

export default TodosListView;
