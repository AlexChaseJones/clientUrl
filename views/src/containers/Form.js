import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmailModal from './EmailModal';
import * as actions from '../actions';

class Form extends Component {
  state = {
    generatorReady: false,
    clientId: '',
    campaignId: '',
    showModal: false
  }

  componentDidMount() {
    this.props.getClientData();
  }

  clientChange = ({ target: { value } }) => {
    const {
      clientNameChange,
      clientData,
      getCampaignData
    } = this.props;

    clientNameChange(value);

    for (let i = 0; i < clientData.length; i++) {
      if (value === clientData[i].name) {
        this.setState({ 
          clientId: clientData[i].id,
          campaignId: ''
        });
        getCampaignData(clientData[i].id);
        this.setState({ generatorReady: true });
        break;
      }

      // if we have gone through the full loop and no match
      if (i === clientData.length - 1) {
        this.setState({ 
          generatorReady: false,
          campaignId: ''
        });
      }
    }
  }

  campaignChange = ({ target: { value } }) => {
    const { campaignData, campaignNameChange } = this.props;
    campaignNameChange(value);

    if (value.length === 0) {
      this.setState({ 
        generatorReady: true,
        campaignId: ''
      });
      return;
    }
    for (let i = 0; i < campaignData.length; i++) {
      if (value === campaignData[i].name) {
        this.setState({
          generatorReady: true,
          campaignId: campaignData[i].id
        });
        return;
      }   
      this.setState({ generatorReady: false }); 
    }
  }

  generateClientsList() {
    return this.props.clientData.map(client => {
      return (
        <option key={client.id} value={client.name} />
      );
    });
  }

  generateCampaignsList() {
    if (this.props.campaignData.length > 0) {
      return this.props.campaignData.map(campaign => (
          <option key={campaign.id} value={campaign.name} />  
      ));
    }
  }

  handleGenerateUrl = e => {
    e.preventDefault();
    const { clientId, campaignId } = this.state;

    this.props.generateUrl(clientId, campaignId);
  }

  showCampaignList() {
    let placeholder = 'choose a campaign';
    let disabled = false;
    if (this.props.noClientMatch) {
      placeholder = 'choose a client first';
      disabled = true;
    } else if (this.props.campaignFetching) {
      placeholder = 'Loading client campaigns...';
      disabled = true;
    } else if (this.props.campaignData.length < 1) {
      placeholder = 'There are no campaigns for the choosen client';
      disabled = true;
    }

    return (
        <input
          type="text"
          name='campaign'
          list="campaigns"
          placeholder={placeholder}
          disabled={disabled}
          value={this.props.campaignName}
          onChange={this.campaignChange}
        />
      );
  }

  render() {
    const { clientFetching, clientName, url } = this.props;

    if (clientFetching) {
      // Render some type of loading indicator. usually only takes a quarter of a second.
      // return <h1>Please wait while we load the data</h1>
      return <div />;
    }
    return (
      <div>
        <form>
          <div className="row">
            <div className="medium-12 columns">
              <label htmlFor='client'>Client Name
                <input 
                  type="text"
                  name='client'
                  list={clientName.length > 2 ? 'clients' : ''}
                  value={clientName}
                  onChange={this.clientChange}
                />
              </label>
              <datalist id="clients">
                {this.generateClientsList()}
              </datalist>
            </div>
          </div>
          <div className="row"> 
            <div className="medium-12 columns">
              <label htmlFor='campaign'>
              Campaign Name {this.props.campaignFetching ? <div className="loader" /> : ''}
                {this.showCampaignList()}
                <datalist id="campaigns">
                  {this.generateCampaignsList()}
                </datalist>
              </label>
            </div>
          </div>
          <div className="row">
            <div style={{ minHeight: '45px' }} className="medium-12 columns">
              <span className={url ? 'label primary' : ''}>{url}</span>
            </div>
          </div>
          <div className="row">
            <div className="medium-12 columns">
              <div className="expanded button-group">
                <button
                  type="button"
                  className="button primary"
                  disabled={!this.state.generatorReady}
                  onClick={e => this.handleGenerateUrl(e)}
                >
                Generate URL
                </button>
                <button
                  type="button"
                  className="button success"
                  data-toggle="animatedModal10"
                  disabled={!url || !this.state.generatorReady}
                  onClick={() => this.setState({ showModal: true })}
                >
                Email Url
                </button>
              </div>
            </div>
          </div>
        </form>
        {this.state.showModal ?
          <EmailModal 
            closeModal={() => this.setState({ showModal: false })}
            url={url}
          /> : '' }
      </div>
    );
  }
}

const mapStateToProps = ({ clientUrl }) => {
  const { 
    clientName,
    campaignName,
    clientFetching,
    clientData,
    campaignFetching,
    campaignData,
    generateUrl,
    url,
    noClientMatch } = clientUrl;

  return {
    clientName,
    campaignName,
    clientFetching,
    clientData,
    campaignFetching,
    campaignData,
    generateUrl,
    url,
    noClientMatch 
  };
};

export default connect(mapStateToProps, actions)(Form);
