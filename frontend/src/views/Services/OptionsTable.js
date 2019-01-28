import React from 'react';
// prop types check
import PropTypes from "prop-types";
// material ui core
import { withStyles } from "@material-ui/core";
// styles
import { optionsTable } from "./servicesStyle";
// material ui core components
import IconButton from '@material-ui/core/IconButton';
import Table from '../../components/Table';
// material ui icons
import MoreVertIcon from '@material-ui/icons/MoreVert';

function OptionsTable(props){

  const {
    options, 
    openMenu,
  } = props;
  
  let data = [];
  options.forEach((option) => {
    data.push([
      option.price,
      option.arrivals,
      option.duration,
      <IconButton id={option.id} onClick={openMenu}
      >
        <MoreVertIcon />
      </IconButton>  
    ])
  })

  return(
    <React.Fragment>
      <Table 
        tableHead={[
          "Cijena",
          "Broj dolazaka",
          "Trajanje",
          "Uredi",
        ]}
        tableData={data}
      />
    </React.Fragment>
  )
};

OptionsTable.propTypes={
  options: PropTypes.array.isRequired,
}

export default withStyles(optionsTable)(OptionsTable);
