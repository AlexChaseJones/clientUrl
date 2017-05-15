import React from 'react';
import { mount } from 'enzyme';
import { GenerateUrl } from './GenerateUrl';
import EmailModal from './EmailModal';

describe('Form Component', () => {
  let props;
  let state;
  let mountedFormComponent;
  const formComponent = () => {
    if (!mountedFormComponent) {
      mountedFormComponent = mount(
        <GenerateUrl {...props} />
      );
    }
    return mountedFormComponent.setState({ ...state });
  };

  beforeEach(() => {
    props = { 
      clientName: '',
      campaignName: '',
      clientFetching: true,
      clientData: [],
      campaignFetching: false,
      campaignData: [],
      generateUrl: jest.fn(),
      url: '',
      noClientMatch: true,
      getClientData: jest.fn(),
      clientNameChange: jest.fn(),
      campaignNameChange: jest.fn()
    };
    state = {
      generatorReady: false,
      clientId: '',
      campaignId: '',
      showModal: false
    };
    mountedFormComponent = undefined;
  });

  describe('If clientFetching is false', () => {
    beforeEach(() => {
      props.clientFetching = false;
    });

    it('always renders a form', () => {
      expect(formComponent().find('form').length).toBe(1);
    });

    describe('If the generatorReady state prop is true', () => {
      beforeEach(() => {
        state.generatorReady = true;
      });
      it('generate URL button is not disabled', () => {
        const generateUrlButton = formComponent().find('button').filterWhere((item) => (
          item.props().className === 'button primary'
        ));

        expect(generateUrlButton.filterWhere((item) => (
          item.props().disabled === false
        )).length).toBe(1);
      });

      describe('If a URL has been generated and stored', () => {
        beforeEach(() => {
           props.url = 'https://sample.url/';
        });

        it('email button is not disabled', () => {
          const emailButton = formComponent().find('button').filterWhere((item) => (
            item.props().className === 'button success'
          ));

          expect(emailButton.filterWhere((item) => (
            item.props().disabled === false
          )).length).toBe(1);
        });

        describe('If the showModal state prop is true', () => {
          beforeEach(() => {
            state.showModal = true;
          });

          it('always renders the EmailModal Component', () => {
            expect(formComponent().find(EmailModal).length).toBe(1);
          });
        });
      });
    });

    describe('If the user changes the client name value in the form', () => {
      beforeEach(() => {
        formComponent().ref('client').simulate('change', '');
      });

      it('the clientNameChange function should be called', () => {
        expect(formComponent().props().clientNameChange).toBeCalled();
      });
    });

    describe('If the user changes the campaign name value in the form', () => {
      beforeEach(() => {
        formComponent().ref('campaign').simulate('change', '');
      });

      it('the campaignNameChange function should be called', () => {
        expect(formComponent().props().campaignNameChange).toBeCalled();
      });
    });
  });
});

