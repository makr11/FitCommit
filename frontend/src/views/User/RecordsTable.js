import React from 'react';
// styles
import { withStyles } from '@material-ui/core/styles';
import { recordsTable } from './userStyle';
// material ui core components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// material ui icons
import WarningIcon from '@material-ui/icons/Warning';
import DoneIcon from '@material-ui/icons/Done';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import FreezeIcon from '@material-ui/icons/AcUnit';
// app components
import Table from '../../components/Table';
import SimpleTable from '../../components/SimpleTable';
import ViewElementsHeading from '../../components/ViewElementsHeading';
// helper functions
import { dateFormatView } from '../../assets/js/functions';

const Paid = (props) => {
  const { 
    paid, 
    price 
  } = props;
  const sign = (paid) ? <DoneIcon/>:<WarningIcon/>;
  const signTip = (paid) ? "Plaćeno":price;
  return(
    <Tooltip title={signTip} placement="right">
      <IconButton>
        {sign}
      </IconButton>
    </Tooltip>
  )
};

const Freeze = (props) => {
  const { freeze_ended } = props;
  const sign = (freeze_ended!==null) ? <FreezeIcon/>:<DoneIcon/>;
  const title = (freeze_ended!==null) ? dateFormatView(freeze_ended):"/";
  return(
    <Tooltip title={title} placement="right">
      <IconButton>
        {sign}
      </IconButton>
    </Tooltip>
  )
};

const ArrivalsList = (props) => {
  const { id, openArrivalsList, name } = props;
  return(
    <IconButton name={name} id={id} onClick={openArrivalsList}>
      <ListIcon/>
    </IconButton>
  )
};

const Settings = (props) => {
  const { 
    index, 
    openRecordForm 
  } = props;
  return(
    <IconButton name="record" id={index} onClick={openRecordForm}>
      <SettingsIcon/>
    </IconButton>
  )
}

function RecordsTable(props){
  const {
    records, 
    openRecordForm,
    openArrivalsList,
  } = props;

  let active = [];
  let notActive = [];
  records.forEach((record, index) => {
    let data = [
      {
        'data': record.service + ' (' + record.category + ')',
        'padding': 'dense',
        'align': 'left'
      },
      {
        'data': record.started,
        'padding': 'dense',
        'align': 'left'
      },
      {
        'data': record.ends,
        'padding': 'dense',
        'align': 'left'
      },
      {
        'data': <Paid paid={record.paid} price={record.nett_price}/>,
        'padding': 'checkbox',
        'align': 'center'
      },
      {
        'data': <Freeze freeze_ended={record.freeze_ended}/>,
        'padding': 'checkbox',
        'align': 'center'
      },
      {
        'data': <ArrivalsList id={record.id} name={index} openArrivalsList={openArrivalsList}/>, 
        'padding': 'checkbox',
        'align': 'center'
      },
      {
        'data': <Settings index={index} openRecordForm={openRecordForm}/>,
        'padding': 'checkbox',
        'align': 'center'
      }
    ]
    if(record.active){
      active.push(data)
    }else{
      notActive.push(data)
    }
  });
  
  return(
    <Grid item xs={9}>
      <ViewElementsHeading
      title="Aktivne usluge"
      style={{marginTop: "0px"}}
      />
      <SimpleTable
        tableHead={[
          {
            'title': 'Usluga',
            'padding': 'dense',
            'align': 'left'
          },
          {
            'title': 'Započelo',
            'padding': 'dense',
            'align': 'left'
          },
          {
            'title': 'Ističe',
            'padding': 'dense',
            'align': 'left'
          },
          {
            'title': 'Plaćeno',
            'padding': 'checkbox',
            'align': 'center'
          },
          {
            'title': 'Zamrznuto',
            'padding': 'checkbox',
            'align': 'center'
          },
          {
            'title': 'Dolasci', 
            'padding': 'checkbox',
            'align': 'center'
          },
          {
            'title': 'Izmijeni',
            'padding': 'checkbox',
            'align': 'center'
          }
        ]}
        tableData={active}
      />
      <ViewElementsHeading
      title="Isteknute usluge"
      />
      <Table
        tableHead={[
          {
            'title': 'Usluga',
            'padding': 'dense',
            'align': 'left'
          },
          {
            'title': 'Započelo',
            'padding': 'dense',
            'align': 'left'
          },
          {
            'title': 'Ističe',
            'padding': 'dense',
            'align': 'left'
          },
          {
            'title': 'Plaćeno',
            'padding': 'checkbox',
            'align': 'center'
          },
          {
            'title': 'Zamrznuto',
            'padding': 'checkbox',
            'align': 'center'
          },
          {
            'title': 'Dolasci', 
            'padding': 'checkbox',
            'align': 'center'
          },
          {
            'title': 'Izmijeni',
            'padding': 'checkbox',
            'align': 'center'
          }
        ]}
        tableData={notActive}
      />
    </Grid>
  ) 
};

export default withStyles(recordsTable)(RecordsTable);
