import React from 'react';
// prop types check
import PropTypes from "prop-types";
// material ui core
import { withStyles } from "@material-ui/core";
// styles
import { optionsTable } from "./servicesStyle";
// material ui core components
import IconButton from '@material-ui/core/IconButton';
import SimpleTable from '../../components/SimpleTable';
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
      {
        'data': option.price,
        'padding': 'checkbox',
        'align': 'center'
      },
      {
        'data': option.arrivals,
        'padding': 'checkbox',
        'align': 'center'
      },
      {
        'data': option.duration,
        'padding': 'checkbox',
        'align': 'center'
      },
      {
        'data': <IconButton id={option.id} onClick={openMenu}><MoreVertIcon /></IconButton>,
        'padding': 'checkbox',
        'align': 'center'
      }    
    ])
  })

  return(
    <React.Fragment>
      <SimpleTable 
        tableHead={[
          {
            'title': "Cijena",
            'padding': 'checkbox',
            'align': 'center'
          },
          {
            'title': "Broj dolazaka",
            'padding': 'checkbox',
            'align': 'center'
          },
          {
            'title': "Trajanje",
            'padding': 'checkbox',
            'align': 'center'
          },
          {
            'title': "Uredi",
            'padding': 'checkbox',
            'align': 'center'
          },
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
