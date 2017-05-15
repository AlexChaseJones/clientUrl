import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
	componentDidMount() {
		if (this.props.loggedIn) {
			browserHistory.replace('/generateUrl');
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.loggedIn) {
      browserHistory.replace('/generateUrl');
    }
	}

  inputChange = (field, { target: { value } }) => {
    switch (field) {
      case 'email':
        this.setState({ email: value });
        break;
      case 'password':
        this.setState({ password: value });
        break;
      default:
        return;
    }
  }

  loginWithEmailAndPassword = e => {
    e.preventDefault();
    this.props.loginWithEmailAndPassword(this.state.email, this.state.password);
  }

  render() {
    if (this.props.loggedIn === false) {
    return (
        <form>
          <div className="row">
            <div className="medium-12 columns">
              <h2>Log in</h2>
            </div>
          </div>
          <div className="row">
            <div className="medium-12 columns">
              <label htmlFor='email'>Email
                <input 
                  type="text"
                  name='email'
                  ref='email'
                  value={this.state.email}
                  onChange={text => this.inputChange('email', text)}
                />
              </label>
            </div>
          </div>
          <div className="row"> 
            <div className="medium-12 columns">
              <label htmlFor='password'>Password
                <input 
                  type="password"
                  name='password'
                  ref='password'
                  value={this.state.password}
                  onChange={text => this.inputChange('password', text)}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="medium-12 columns">
              <div className="expanded button-group">
                <button
                  type="button"
                  className="button primary"
                  onClick={e => this.loginWithEmailAndPassword(e)}
                > Log In </button>

              </div>
            </div>
          </div>
        </form>
      );
    } 
    
    return null;
  }
}

const mapStateToProps = ({ user: { loggedIn } }) => ({
	loggedIn 
});

export default connect(mapStateToProps, actions)(LoginForm);
