import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const mapStateToProps = state => {
    return {
        users: state.requestUsersReducer.users,
    }
}

class UserArrival extends React.Component {
    state = {
        selectedOption: null,
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
      }

    render(){
        const { selectedOption } = this.state;
        const { users } = this.props;
        const options = [];
        for(let i=0; i<users.length; i++){
            options.push({value: users[i], label: users[i].first_name + " " + users[i].last_name})
        }

        return(
            <div>
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(UserArrival);