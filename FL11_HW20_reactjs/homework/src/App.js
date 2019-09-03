import React, { Component } from 'react';

import Users from './components/users/Items';
import NavBar from './components/layout/Navbar';

import './App.css';
import Backet from './components/users/Backet';

export class App extends Component {
  state = {
    users: [],
    choice: []
  };
  async componentDidMount() {
    const res = await fetch('http://localhost:1337/emoji-shop');
    const data = await res.json();
    this.setState({
      users: data.emoji
    });
  }
  getData = (title, price) => {
    this.setState({
      choice: [...this.state.choice, { price, title }]
    });
  };
  removeItems = name => {
    this.setState(prevState => ({
      choice: prevState.choice.filter(el => el.title !== name).title,
      disabled: true
    }));
  };

  render() {
    return (
      <div className="App" style={{ display: 'flex' }}>
        <div>
          <NavBar users={this.state.users} />
          <Users
            users={this.state.users}
            handlerClick={this.getData}
            disabled={this.state.disabled}
          />
        </div>
        <Backet choice={this.state.choice} removeItems={this.removeItems} />
      </div>
    );
  }
}

export default App;
