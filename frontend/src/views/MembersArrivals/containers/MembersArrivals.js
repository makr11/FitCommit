import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

const mapStateToProps = state => {
    return {
        members: state.requestMembersRegistry.members,
    }
}

class MembersArrivals extends React.Component {
    state = {
        selectedOption: null,
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
      }

    render(){
        const { selectedOption } = this.state;
        const { members } = this.props;
        const options = [];
        for(let i=0; i<members.length; i++){
            options.push({value: members[i], label: members[i].first_name + " " + members[i].last_name})
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

export default connect(mapStateToProps, null)(MembersArrivals);