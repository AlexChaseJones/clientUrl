import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmailModal from './EmailModal';
import * as actions from '../actions';

// exporting here as well for jest testing
export class GenerateUrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generatorReady: false,
      clientId: '',
      campaignId: '',
      showModal: false
    };
  }

  componentWillMount() {
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
    if (!this.props.clientFetching) {
      return this.props.clientData.map(client => (
          <option key={client.id} value={client.name} />
      ));
    }
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
    let disabled = true;
    if (this.props.noClientMatch) {
      placeholder = 'choose a client first';
    } else if (this.props.campaignFetching) {
      placeholder = 'Loading client campaigns...';
    } else if (this.props.campaignData.length < 1) {
      placeholder = 'There are no campaigns for the choosen client';
    } else {
      disabled = false;
    }

    return (
        <input
          type="text"
          name='campaign'
          ref='campaign'
          list="campaigns"
          placeholder={placeholder}
          disabled={disabled}
          value={this.props.campaignName}
          onChange={this.campaignChange}
        />
      );
  }

  showEmailModal() {
    if (this.state.showModal) {
      return (
        <EmailModal 
          closeModal={() => this.setState({ showModal: false })}
          url={this.props.url}
        />
      );
    }
  }

  render() {
    const { clientFetching, campaignFetching, clientName, url } = this.props;

    return (
      <div>
        <form>
          <div className="row">
            <div className="medium-12 columns">
              <label htmlFor='client'>Client Name
                <input 
                  type="text"
                  name='client'
                  ref='client'
                  disabled={clientFetching}
                  placeholder={clientFetching ? 'Fetching clients...' : ''}
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
              Campaign Name {campaignFetching ? <div className="loader" /> : ''}

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
                > Generate URL </button>
                <button
                  type="button"
                  className="button success"
                  data-toggle="animatedModal10"
                  disabled={!url || !this.state.generatorReady}
                  onClick={() => this.setState({ showModal: true })}
                > Email Url </button>
              </div>
            </div>
          </div>
        </form>

        {this.showEmailModal()}

      </div>
    );
  }
}

const mapStateToProps = ({ clientUrl }) => (
  clientUrl
);

export default connect(mapStateToProps, actions)(GenerateUrl);
