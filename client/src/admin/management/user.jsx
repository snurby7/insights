import React from 'react'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return ( <div>
      Information Needed about a User
      <ol>
        <li>Name</li>
        <li>Salary</li>
        {/* More to come */}
      </ol>
      </div> );
  }
}

export default User;