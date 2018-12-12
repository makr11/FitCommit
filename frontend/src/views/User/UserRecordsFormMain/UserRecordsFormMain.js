import React from 'react';
//app components
import FormDialog from '../../../components/FormDialog';
import EditRecord from '../EditRecord/EditRecord';
import AddRecord from '../AddRecord/AddRecord';
// app helper functions
import { isEmpty, date, dateDiff, addToDate, dateFormat } from '../../../assets/js/functions';

class UserRecordsFormMain extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      addRecord: {
        service: {},
        categories: [],
        category: {},
        options:[],
        option: {},
        price: '',
        discount: '',
        nett_price: '',
        paid: false,
      },
      editRecord: {}
    };
  };
  
  componentDidUpdate(prevProps){
    if(isEmpty(prevProps.record)&&!isEmpty(this.props.record)){
      const { record } = this.props;
      let started = dateFormat(record.started);
      let ends = dateFormat(record.ends);
      this.setState({
        ...this.state,
        editRecord: {
          started: started,
          ends: ends,
          freeze: (record.freeze_ended!==null)?true:false,
          freeze_started: (record.freeze_started)?record.freeze_started:date(),
          freezeDays: record.freeze_min,
          freeze_ended: (record.freeze_ended)?record.freeze_ended:addToDate(date(), record.freeze_min),
          arrivals_left: record.arrivals_left,
          discount: record.discount,
          nett_price: record.nett_price,
          active: record.active,
          paid: record.paid 
        }, 
      });
    }
  };

  handleSelectService = e => {
    const { services } = this.props;
    let name = e.target.name;
    let value = e.target.value;
    let addRecord = this.state.addRecord;

    switch(name){
      case ('service'):
        let service = services.filter(service => {
          return service.service === e.target.value
        })
        this.setState({
          ...this.state,
          addRecord: {
            ...addRecord,
            service: service[0],
            categories: service[0].categories,
            category: {},
            options:[],
            option: {},
            price: '',
            discount: '',
            nett_price: '',
            paid: false,
          }
        });
        break
      case ('category'):
        let category = addRecord.categories.filter(category => {
          return category.category === value
        })
        this.setState({
          ...this.state,
          addRecord: {
            ...addRecord,
            category: category[0],
            options: category[0].options,
            option: {},
            price: '',
            discount: '',
            nett_price: '',
            paid: false,
          }
        });
        break
      case ('option'):
        let option = addRecord.options.filter(option => {
          return option.id===parseInt(value, 10);
        })
        this.setState({
          ...this.state,
          addRecord: {
            ...addRecord,
            option: option[0],
            price: option[0].price,
            discount: 0,
            nett_price: option[0].price,
          }             
        });
        
        break
      default:
        break
    }
  };

  handleAddRecordInput = (e) => {
    let value = (e.target.name==="paid") ? e.target.checked : e.target.value;
    this.setState(
      {
        ...this.state,
        addRecord: {
          ...this.state.addRecord,
          [e.target.name]: value},
        },
      () => {
        
        const discount = 1 - (this.state.addRecord.discount / 100);
        this.setState(
          {
            ...this.state,
            addRecord: {
              ...this.state.addRecord,
              nett_price: this.state.addRecord.price * discount
            }
          })
      }
    );
  };

  handleCheckBox = (e) => {
    let name = e.target.id;
    let checked = e.target.checked;

    this.setState({
      ...this.state,
      editRecord: {
        ...this.state.editRecord,
        [name]: (checked)?true:false,
      }    
    })
  }

  handleEditRecordInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if(value.charAt(0)!=='-'){
      if(name==="discount"){
        value = parseInt(value, 10) 
        let percentage = (isNaN(value))?0:(value>100)?100:value;
        let discount = 1 - (percentage / 100);
        let nett_price = this.props.record.price * discount;
        
        this.setState({
          ...this.state,
          editRecord: {
            ...this.state.editRecord,
            discount: e.target.value,
            nett_price: nett_price,
          }, 
        });
      }else if(name==='freezeDays'){
        const { record } = this.props;
        value = parseInt(value, 10);
        this.setState({
          ...this.state,
          editRecord:{
            ...this.state.editRecord,
            freezeDays: e.target.value,
            freeze_ended: (record.freeze_min<=value)?addToDate(date(), value):addToDate(date(), record.freeze_min)
          }
        })
      }else if(name==='freeze_ended'){
        const { record } = this.props;
        let diffDays = dateDiff(value, this.state.editRecord.freeze_started)
        if(record.freeze_min <= diffDays && diffDays <= record.freeze_max){
          this.setState({
            ...this.state,
              editRecord:{
                ...this.state.editRecord,
                freezeDays: diffDays,
                freeze_ended: value
              }
          })
        }
      }else{
        this.setState({
          ...this.state,
          editRecord: {
            ...this.state.editRecord,
            [e.target.name]: e.target.value,
          }
          
        });
      }
    }
  };

  submitRecordToUser = (e) => {
    e.preventDefault();
    const { user } = this.props;
    const { price, discount, nett_price, paid } = this.state.addRecord;
    
    const service = this.state.addRecord.service.id;
    const category = this.state.addRecord.category.id;
    const option = this.state.addRecord.option.id;
    
    const lead = {user, service, category, option, price, discount, nett_price, paid};
    
    this.props.submitRecord(lead);
    this.props.closeFormDialog();
  }

  patchRecordToUser = (e) => {
    e.preventDefault();
    const { record } = this.props;
    let { started, ends, freeze, freezeDays, freeze_started, freeze_ended, arrivals_left, nett_price, discount, active, paid } = this.state.editRecord;

    arrivals_left = parseInt(arrivals_left, 10);
    
    let lead = { started, ends, arrivals_left, discount, nett_price, active, paid }
    
    if(freeze===true){
      ends = addToDate(dateFormat(record.started), freezeDays + record.duration)
      lead = { ...lead, freeze_started, freeze_ended, ends };
    }else if(record.freeze_started!==null){
      freezeDays = dateDiff(date(), freeze_started);
      ends = addToDate(dateFormat(record.started), freezeDays + record.duration);
      freeze_started = null;
      freeze_ended = null;
      lead = { ...lead, freeze_started, freeze_ended, ends };
    }
    
    this.props.updateRecord(record.id, lead);
    this.props.closeFormDialog();
  }

  render(){
    const { open, openSubmitForm, openEditForm, services, closeFormDialog } = this.props;

    return(
      <FormDialog
        open={open}
        submit={(openSubmitForm)?this.submitRecordToUser:this.patchRecordToUser}
        close={closeFormDialog}      
      >
        {(openSubmitForm)?
          <AddRecord 
            close={closeFormDialog}
            services={services}
            handleInput={this.handleAddRecordInput}
            submitRecordToUser={this.submitRecordToUser}
            handleSelectService={this.handleSelectService}
            {...this.state.addRecord}
          />:(openEditForm)?         
          <EditRecord
            handleInput={this.handleEditRecordInput}
            handleCheckBox={this.handleCheckBox}
            {...this.state.editRecord}
          />:undefined
        }   
      </FormDialog>
    )
  }
}

export default UserRecordsFormMain;