import React from "react"
import Header from "./components/Header"
import Users from "./components/Users"
import AddUser from "./components/AddUser"
import axios from 'axios';

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        users : []
      }
    this.addUser = this.addUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.editUser = this.editUser.bind(this)
  }

  componentDidMount() {
    axios.post('http://localhost/%d0%94%d0%92%d0%92%d0%a1/insert.inc.php', {
        show : 0,
      }
    )
    .then(response => {
      console.log('Server response:', response.data);
      this.setState({ users: [...response.data] });
    })
    .catch(error => {
      console.error('Error submitting data:', error);
    });
  }

  render() {
    return (
      <div>
        <Header title="Блог"/>
        <main>
          <Users users={this.state.users} onEdit={this.editUser} onDelete={this.deleteUser}/>
        </main>
        <aside>
          <AddUser onAdd={this.addUser} />
        </aside>
      </div>
    )
  }

  deleteUser(id) {
    axios.post('http://localhost/%d0%94%d0%92%d0%92%d0%a1/delete.inc.php', {
        id : id,
      }
    )
    .then(response => {
      console.log('Server response:', response.data);
      this.setState({ users: [...response.data]});
  })
  .catch(error => {
      console.error('Error submitting data:', error);
  });
  }

  editUser(user) {
    console.log(user, user['id'])
    axios.post('http://localhost/%d0%94%d0%92%d0%92%d0%a1/update.inc.php', {
        id : user['id'],
        firstname : user['firstname'],
        lastname : user['lastname'],
        description : user['description'],
        age : user['age'],
        isHappy : user['isHappy'],
      }
    )
    .then(response => {
      console.log('Server response:', response.data);
      this.setState({ users: []}, () => { 
        this.setState({ users: [...response.data]})
      })
  } )
  .catch(error => {
      console.error('Error submitting data:', error);
  });

  }

  addUser(user) {
    axios.post('http://localhost/%d0%94%d0%92%d0%92%d0%a1/insert.inc.php', {
        firstname : user['firstname'],
        lastname : user['lastname'],
        description : user['description'],
        age : user['age'],
        isHappy : user['isHappy'],
        show : 1,
      }
    )
    .then(response => {
      console.log('Server response:', response.data);
      this.setState({ users: [...response.data]});
  })
  .catch(error => {
      console.error('Error submitting data:', error);
  });
  } 

}

export default App;
