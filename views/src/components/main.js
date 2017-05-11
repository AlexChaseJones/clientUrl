import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../containers/Form';
import LoginForm from '../containers/LoginForm';

class Main extends Component {
  render() {
    return (
      <div className="main">
        {this.props.loggedIn ? <Form /> : <LoginForm />}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  loggedIn: user.loggedIn
});

export default connect(mapStateToProps)(Main);
