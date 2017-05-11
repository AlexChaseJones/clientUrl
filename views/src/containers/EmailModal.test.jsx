import React from 'react';
import { mount } from 'enzyme';
import EmailModal from './EmailModal';

describe('EmailModal', () => {
  let props;
  let mountedEmailModal;
  const emailModal = () => {
    if (!mountedEmailModal) {
      mountedEmailModal = mount(
        <EmailModal {...props} />
      );
    }
    return mountedEmailModal;
  };
  
  beforeEach(() => {
    props = {
      closeModal: undefined,
      url: undefined
    };
    mountedEmailModal = undefined;
  });

  it('always renders a div', () => {
    const divs = emailModal().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });

  describe('the rendered div', () => {
    it('contains everything else that gets rendered', () => {
      const divs = emailModal().find('div');
      const wrappingDiv = divs.first();

      expect(wrappingDiv.children()).toEqual(emailModal().children());
    });
  });

  it('always renders a `form`', () => {
    expect(emailModal().find('form').length).toBe(1);
  });

  it('always renders a close button', () => {
    expect(emailModal().find('button').first().hasClass('exit')).toBe(true);
  });
});
