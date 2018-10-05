import React from 'react';

import { connect } from 'react-redux';
import Select from 'react-select';

import Button from '@material-ui/core/Button';

import { requestUserRecords, submitFormArrival, reset } from '../../../redux/actions';


const mapStateToProps = state => {
    return {
        users: state.usersReducer.users,
        userRecords: state.userRecordsReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectRecords: (id) => dispatch(requestUserRecords(id)),
        resetRecords: () => dispatch(reset('records')),
        handleSubmitForm: (lead) => dispatch(submitFormArrival(lead))
    }
}

class UserArrival extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedUser: undefined,
            selectedRecord: undefined,
            usersOpt: [],
            recordsOpt: [],
        }
    }

    componentDidMount(){
        let options = [];
        for(let i=0; i<this.props.users.length; i++){
            options.push({value: this.props.users[i], label: this.props.users[i].first_name + " " + this.props.users[i].last_name})
        };
        this.setState({usersOpt: options})  
    };

    componentDidUpdate(){
        function isEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
        if(!isEmpty(this.props.userRecords)){
            let records = [];
            let uRec = this.props.userRecords;
            for(let i=0; i<uRec.records.length; i++){
                records.push({value: uRec.records[i], label: uRec.records[i].service + " (" + uRec.records[i].category + ") (" + uRec.records[i].arrivals_left + ")"});
            };
            this.setState({recordsOpt: records});
            this.props.resetRecords();
        }
    }

    componentWillUnmount(){
        this.setState({
            selectedUser: undefined,
            selectedRecord: undefined,
            usersOpt: [],
            recordsOpt: [],
        });
        this.props.resetRecords();
    };

    selectUser = (selectedUser) => {
        this.setState({ 
            selectedUser: selectedUser,
            recordsOpt: [],
            },
        () => this.props.selectRecords(this.state.selectedUser.value.id)
        )
    };

    selectRecord = (selectedRecord) => {
        this.setState({
            selectedRecord: selectedRecord,
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        const user = this.state.selectedUser.value.id;
        const record = this.state.selectedRecord.value.id;
        const date = this.props.date;
        const lead = {user, record, date};
        this.props.handleSubmitForm(lead);
    }

    render(){
        const { selectedUser, selectedRecord, usersOpt, recordsOpt } = this.state;
        
        return(
            <form onSubmit={this.submitForm} noValidate autoComplete="off">
                <Select
                    value={selectedUser}
                    onChange={this.selectUser}
                    options={usersOpt}
                />
                <Select
                    value={selectedRecord}
                    onChange={this.selectRecord}
                    options={recordsOpt}
                />
                <Button
                variant="outlined" 
                color="primary" 
                type="submit"
                >
                    Izaberi
                </Button>
            </form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserArrival);