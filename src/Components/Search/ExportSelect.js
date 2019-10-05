import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: '0 0 2rem 0',
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ExportSelect(props) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [, setLabelWidth] = React.useState(0);
  if (inputLabel.current !== null) {
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
  }

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="exportFormat">Export Format</InputLabel>
        <Select
          value={'ris'}
          onChange={props.onChange}
          inputProps={{
            name: 'exportFormat',
            id: 'exportFormat',
          }}
        >
          <MenuItem value="ris">RIS</MenuItem>
          <MenuItem value="xml">XML</MenuItem>
          <MenuItem value="csv">CSV</MenuItem>
          <MenuItem value="txt">TXT</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}
