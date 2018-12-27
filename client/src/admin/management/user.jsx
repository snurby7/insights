import React from 'react'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.data
     }
  }
  render() {
    const userData = this.props.data;
    return ( <div>
      Information Needed about a User
        <ol>
          <li>{userData.user}</li>
          <li>${userData.salary}</li>
          <li>User Actions - Edit/Delete</li>
        </ol>
      </div> );
  }
}

export default User;