import React from 'react';
//app components
import FormDialog from '../../../components/FormDialog';
import EditRecord from '../components/EditRecord';
import AddRecord from '../components/AddRecord';
// app helper functions
import { isEmpty } from '../../../assets/js/functions';
import { dateFormat } from '../../../assets/js/functions.js';

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
          onHold: '',
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
    switch(e.target.name){
      case ('service'):
        for(let i=0; i<services.length; i++){
          if(services[i].service===e.target.value){
            this.setState({
              ...this.state,
              addRecord: {
                ...this.state.addRecord,
                service: services[i],
                categories: services[i].categories,
                category: {},
                options:[],
                option: {},
              }
            });
          }
        }
        break
      case ('category'):
        for(let i=0; i<this.state.addRecord.categories.length; i++){
          if(this.state.addRecord.categories[i].category===e.target.value){
            this.setState({
              ...this.state,
              addRecord: {
                ...this.state.addRecord,
                category: this.state.addRecord.categories[i],
                options: this.state.addRecord.categories[i].options,
                option: {},
              }
            });
          }
        }
        break
      case ('option'):
        for(let i=0; i<this.state.addRecord.options.length; i++){
          if(this.state.addRecord.options[i].id===parseInt(e.target.value, 10)){
            this.setState({
              ...this.state,
              addRecord: {
                ...this.state.addRecord,
                option: this.state.addRecord.options[i],
                price: this.state.addRecord.options[i].price,
                discount: 0,
                nett_price: this.state.addRecord.options[i].price,
              }             
            });
          }
        }
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
    if(e.target.name==="discount"){
      let value = parseInt(e.target.value, 10) 
      let percentage = (isNaN(value))?0:(value>100)?100:parseInt(e.target.value, 10);
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
    }else{
      this.setState({
        ...this.state,
        editRecord: {
          ...this.state.editRecord,
          [e.target.name]: e.target.value,
        }
        
      });
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
    let { started, ends, onHold, arrivals_left, nett_price, discount, active, paid } = this.state.editRecord;

    if(onHold){
      let add = new Date(ends.split("-").join("/"));
      let date = new Date(add.setTime(add.getTime()+onHold*86400000));
      ends = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
    };

    arrivals_left = parseInt(arrivals_left, 10);
    
    const lead = { started, ends, arrivals_left, discount, nett_price, active, paid }
  
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