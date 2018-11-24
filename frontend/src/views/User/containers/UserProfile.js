import React from 'react';

function UserProfile(props){
  const { user } = props;
  return(
    <div>
      {user.first_name}
    </div>
  )
}

export default UserProfile;