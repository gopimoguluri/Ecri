import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import ExportSelect from '../ExportSelect';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class CustomizedDialogs extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Dialog
        onClose={this.props.closeDialog}
        aria-labelledby="customized-dialog-title"
        open={this.props.dialogIsOpen}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.props.closeDialog}
        >
          {this.props.exportAllEnabled ? 'Export All' : 'Export'}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Please select an export format for your brief. Multiple selections
            will be bundled into a single downloaded file.
          </Typography>
          <ExportSelect {...this.props.selectProps} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.actionButton} color="primary">
            Export
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CustomizedDialogs;
