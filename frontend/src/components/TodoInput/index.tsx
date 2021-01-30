import React, { useContext, useState } from "react";
import { TextField, Grid, IconButton } from "@material-ui/core";
import { SendRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { Todo, TodoContext } from "../../TodoContext";
import { insert_todo } from "../../utils";

const useStyles = makeStyles({
  root: {
    color: "White",
  },
});

const TodoInput: React.FC<{}> = () => {
  const classes = useStyles();
  const [task, setTask] = useState("");
  const { dispatch } = useContext(TodoContext);

  const handleClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const newTodo: Todo = {
      when: (+new Date()).toString(),
      task: task,
      done: false,
      by: "Igor Souza",
    };

    insert_todo(newTodo).then(() => {
      if (dispatch) dispatch({ type: "TRIGGER", payload: true });
    });

    setTask("");
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <TextField
            color="primary"
            label="Todo"
            variant="outlined"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </Grid>
        <Grid item>
          <IconButton
            color="primary"
            aria-label="registre todo"
            component="span"
            onClick={handleClick}
          >
            <SendRounded style={{ fontSize: "32px" }} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default TodoInput;
