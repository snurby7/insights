import React from "react";
import User from "./user";
class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        Manage your users
        <User />
      </div>
    );
  }
}

export default UserManagement;
