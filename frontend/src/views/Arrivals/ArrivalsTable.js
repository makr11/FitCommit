import React from 'react';
// material ui core
import { withStyles } from '@material-ui/core';
// styles
import { tableStyle } from './arrivalsStyle';
// material ui core components
import Paper from '@material-ui/core/Paper';
// material ui icons
import WarningIcon from '@material-ui/icons/Warning';
import DoneIcon from '@material-ui/icons/Done';
// app components
import Table from '../../components/Table';

function ArrivalsTable(props){
  const { classes, arrivals, handleDelete } = props;
  
  let data = [];
  arrivals.forEach((arrival, index, array) => {
    data.push([
      {'identifier': arrival.id},
      {
        'data': array.length-index,
        'padding': 'checkbox',
        'align': 'center'
      },
      {
        'data': arrival.user,
        'padding': 'dense',
        'align': 'left'
      },
      {
        'data': arrival.service + ' (' + arrival.category + ')',
        'padding': 'dense',
        'align': 'left'
      },
      {
        'data': new Date(arrival.arrival).toLocaleTimeString(),
        'padding': 'dense',
        'align': 'center'
      },
      {
        'data': (!arrival.paid)?<WarningIcon/>:<DoneIcon/>,
        'padding': 'checkbox',
        'align': 'center'
      }
    ])
  });

  return(
    <Paper className={classes.tableWrapper}>
      <Table 
        tableHead={[
          {
            'title': 'Br.',
            'padding': 'checkbox',
            'align': 'center'
          },
          {
            'title': 'Korisnik',
            'padding': 'dense',
            'align': 'left'
          },
          {
            'title': 'Usluga',
            'padding': 'dense',
            'align': 'left'
          },
          {
            'title': 'Dolazak',
            'padding': 'dense',
            'align': 'center'
          },
          {
            'title': 'Plaćeno',
            'padding': 'checkbox',
            'align': 'center'
          }
        ]}
        tableData={data}
        remove={handleDelete}
      />
    </Paper>
  )
}


export default withStyles(tableStyle)(ArrivalsTable);
