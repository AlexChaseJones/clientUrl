import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class EnsureLoggedInContainer extends Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      browserHistory.replace('/login');
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = ({ user: { loggedIn } }) => ({
  loggedIn
});

export default connect(mapStateToProps)(EnsureLoggedInContainer);
