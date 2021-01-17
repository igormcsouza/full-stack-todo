import React from "react";
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

interface Itask {
  id: number;
  task: string;
  checked: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      maxHeight: 250,
      backgroundColor: theme.palette.background.paper,
      flexWrap: "wrap",
      overflowY: "scroll",
      WebkitOverflowScrolling: "touch",
    },
    whenChecked: {
      textDecoration: "line-through",
      textDecorationColor: "#8B8B8B",
      textDecorationThickness: "2px",
      color: "#8B8B8B",
    },
  })
);

const TodosListView: React.FC<{}> = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState([
    { id: 0, task: "Do the Dishes", checked: false },
    { id: 1, task: "Do the Groceries", checked: false },
    { id: 2, task: "Do the I don't even know", checked: false },
    { id: 3, task: "Do the Net", checked: false },
    { id: 4, task: "Do the Job", checked: false },
  ]);

  const handleToggle = (value: Itask) => () => {
    const remnant = values.filter((v) => v.id !== value.id);
    value.checked = !value.checked;
    setValues([...remnant, value].sort((v, x) => v.id - x.id));
  };

  const openEditPanel = (value: Itask) => () => {
    console.log(value);
  };

  const handleDelete = (value: Itask) => () => {
    const remnant = values.filter((v) => v.id !== value.id);
    setValues(remnant.sort((v, x) => v.id - x.id));
  };

  return (
    <List className={classes.root}>
      {values.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        return (
          <ListItem
            key={value.id}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={value.checked}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText
              className={value.checked ? classes.whenChecked : undefined}
              id={labelId}
              primary={value.task}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={openEditPanel(value)}
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
        );
      })}
    </List>
  );
};

export default TodosListView;
