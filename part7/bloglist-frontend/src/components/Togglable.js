import React, { useState, useImperativeHandle } from "react";
import { makeStyles, Fab, Dialog, DialogContent } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Togglable = React.forwardRef(({ children, buttonText }, ref) => {
  const classes = useStyles();

  const _buttonText = buttonText ? buttonText : "Show";
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisiblity = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisiblity };
  });

  return (
    <div>
      <Fab
        id="btn-toggle"
        variant="extended"
        color="secondary"
        onClick={toggleVisiblity}
        aria-label="add"
        className={classes.fab}
      >
        <AddIcon />
        {isVisible ? "Hide" : _buttonText}
      </Fab>
      <Dialog open={isVisible} onClose={toggleVisiblity}>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
});

Togglable.displayName = "Toggleable";

export default Togglable;
