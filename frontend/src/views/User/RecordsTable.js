import React from 'react';
// material ui core components
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
// material ui icons
import WarningIcon from '@material-ui/icons/Warning';
import DoneIcon from '@material-ui/icons/Done';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
// app components
import Table from '../../components/Table';

const Paid = (props) => {
  const { paid, price } = props;
  const sign = (paid) ? <DoneIcon/>:<WarningIcon/>
  return(
    <React.Fragment>
      <div>
        {price}
      </div>
      {sign}
    </React.Fragment>
  )
};

const ArrivalsList = (props) => {
  const { id, openArrivalsList } = props;
  return(
    <IconButton name="record" id={id} onClick={openArrivalsList}>
      <ListIcon/>
    </IconButton>
  )
};

const Settings = (props) => {
  const { index, openRecordForm } = props;
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

  let data = [];
  records.forEach((record, index) => {
    data.push([
      record.service + ' (' + record.category + ')',
      record.started,
      record.ends,
      <ArrivalsList id={record.id} openArrivalsList={openArrivalsList}/>,
      <Paid paid={record.paid} price={record.price}/>,
      <Settings index={index} openRecordForm={openRecordForm}/>
    ])
  })
  console.log("RecordsTable")
  return(
    <Grid item xs={9}>
      <Table
        tableHead={[
          'Usluga', 
          'Započelo',
          'Ističe',
          'Dolasci',
          'Plaćeno',
          'Izmijeni',
        ]}
        tableData={data}
      />
    </Grid>
  ) 
};

export default RecordsTable;
