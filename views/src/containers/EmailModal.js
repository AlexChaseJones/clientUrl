import React, { Component } from 'react';

class EmailModal extends Component {
  state = {
    email: '',
    subject: 'Your Dashboard URL',
    body: ''
  }

  componentWillMount() {
    this.setState({
      body: `Your unique URL is ${this.props.url}`
    });
  }

  inputChange = (field, { target: { value } }) => {
    switch (field) {
      case 'email':
        this.setState({ email: value });
        break;
      case 'subject':
        this.setState({ subject: value });
        break;
      case 'body':
        this.setState({ body: value });
        break;
      default:
        return;
    }
  }

  openEmailClient = e => {
    e.preventDefault();
    window.location = `mailto:${this.state.email}?subject=${this.state.subject.replace(' ', '%20')}&body=${this.state.body.replace(' ', '%20')}`;
  }

  render() {
    return (
      <div id="full-screen-modal">
      <button
        type="button"
        className="button alert exit"
        onClick={() => this.props.closeModal()}
      > X </button>
        <form>
            <div className="row">
              <div className="medium-12 columns">
                <label htmlFor="email">Recipient
                  <input 
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={text => this.inputChange('email', text)}
                  />
                </label>
              </div>
            </div>
            <div className="row"> 
              <div className="medium-12 columns">
                <label htmlFor="subject">Subject
                  <input
                    type="text"
                    name="subject"
                    value={this.state.subject}
                    onChange={text => this.inputChange('subject', text)}
                  />
                </label>
              </div>
            </div>
            <div className="row"> 
              <div className="medium-12 columns">
                <label htmlFor="body">Body
                  <textarea
                    type="text"
                    name="body"
                    value={this.state.body}
                    onChange={text => this.inputChange('body', text)}
                  />
                </label>
              </div>
            </div>
            <div className="row">
              <div className="medium-12 columns">
                <div className="expanded button-group">
                  <button
                    type="button"
                    className="button success"
                    onClick={this.openEmailClient}
                  >
                  Email Url
                  </button>
                </div>
              </div>
            </div>
        </form>
      </div>
    );
  }
}

export default EmailModal;
