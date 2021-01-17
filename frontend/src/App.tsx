import React from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import TodoInput from "./components/TodoInput";
import MainTitle from "./components/MainTitle";
import TodosListView from "./components/TodosListView";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #49008E 30%, #26004A 90%)",
    fontFamily: "Fira Code",
    position: "fixed",
    padding: 0,
    margin: 0,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "30px 0px",
    height: "600px",
    width: "400px",
    background: "white",
    borderRadius: 16,
  },
  divider: {
    width: 350,
    margin: 20,
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <MainTitle />
        <TodoInput />
        <Divider
          className={classes.divider}
          variant="middle"
          orientation="horizontal"
        />
        <TodosListView />
      </div>
    </div>
  );
}

export default App;
