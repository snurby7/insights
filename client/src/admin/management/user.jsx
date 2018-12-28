import React from 'react'
import Button from '@material-ui/core/Button';
import UserAgent from '../../agents/user-agent';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.data
     }
  }

  async deleteUserById(userId) {
    const result = await UserAgent.deleteUser(userId);
    console.log(result);
    // TODO refresh users need to tell the user management component
  }

  render() {
    const userData = this.props.data;
    return ( <div>
      Information Needed about a User
        <ol>
          <li>{userData.user}</li>
          <li>${userData.salary}</li>
          <li><Button onClick={() => this.deleteUserById(userData._id)}>Delete User</Button></li>
          <li>User Actions - Edit/Delete</li>
        </ol>
      </div> );
  }
}

export default User;