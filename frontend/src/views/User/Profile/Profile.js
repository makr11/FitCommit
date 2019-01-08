import React from 'react';

function Profile(props){
  const { user } = props;
  return(
    <div>
      {user.first_name}
    </div>
  )
}

export default Profile;