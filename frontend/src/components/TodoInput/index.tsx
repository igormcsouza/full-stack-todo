import React from "react";
import { TextField, Grid, IconButton } from "@material-ui/core";
import { SendRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    color: "White",
  },
});

const TodoInput: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <TextField color="primary" label="Todo" variant="outlined" />
        </Grid>
        <Grid item>
          <IconButton
            color="primary"
            aria-label="registre todo"
            component="span"
          >
            <SendRounded style={{ fontSize: "32px" }} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default TodoInput;
