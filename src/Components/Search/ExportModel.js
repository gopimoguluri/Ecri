import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ExportSelect from '../ExportSelect';
import styles from './exportModal.module.scss';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: 'none',
  },
}));

export default function ExportModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Modal
      aria-labelledby={props.ariaLabelledBy}
      aria-describedby={props.ariaDescribedBy}
      open={props.modalIsOpen}
      onClose={props.closeModal}
    >
      <div style={modalStyle} className={classes.paper}>
        <div className={styles.modalHeader}>
          <h2 id="modal-title">Export Brief</h2>
        </div>
        <div className={styles.modalBody}>
          <ExportSelect {...props.selectProps} />
        </div>
        <div className={styles.modalFooter}>
            
        </div>  
      </div>
    </Modal>
  );
}