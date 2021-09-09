import React from 'react';
import { mount } from 'enzyme';
import Modal from '../Modal';

const addPropType = {
  type: 'add',
  isShowModal: false,
  buttonLabel: 'button label',
  title: 'test title',
  description: 'test description',
  action: 'Continue',
  continueAction: () => {
    const i = 1;
    return i;
  },
  id: '0',
};

describe('Modal', () => {
  it('renders component without crashing', () => {
    mount(<Modal />);
  });

  describe('add type', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Modal {...addPropType} />);
    });
    it('contains isShow value', () => {
      expect(wrapper.props().type).toEqual(addPropType.type);
    });
    it('contains title value', () => {
      expect(wrapper.props().title).toEqual(addPropType.title);
    });
    it('contains description value', () => {
      expect(wrapper.props().description).toEqual(addPropType.description);
    });
    it('modal content', () => {
      expect(wrapper.find('.modal-content').length).toEqual(0);
      expect(wrapper.find('.modal-content').children()).toHaveLength(0);
    });
    // it('opens modal when button is clicked', () => {
    //   console.log(wrapper.debug());
    //   wrapper.find('button').simulate('click');
    //   expect(wrapper.find(Modal).prop('isOpen')).toBe(true);
    //   console.log(wrapper.debug());
    // });
    // describe('modal header', () => {
    //   it('exist', () => {
    //     expect(wrapper.find('.modal-header').length).toEqual(1);
    //     expect(wrapper.find('.modal-header').children()).toHaveLength(2);
    //   });
    //   it('contains correct title', () => {
    //     expect(wrapper.find('.modal-title').text()).toBe(prop.title);
    //   });
    // });
    // describe(' modal boby', () => {
    //   it('should render', () => {
    //     expect(wrapper.find('.modal-body').length).toEqual(1);
    //     expect(wrapper.find('.modal-body').children()).toHaveLength(1);
    //   });
    //   it('has correct description', () => {
    //     expect(wrapper.find('.modal-body').text()).toEqual(prop.description);
    //   });
    //   it('has empty description', () => {
    //     const component = mount(<Notice isShowModal={prop.isShowModal} title={prop.title} description={null} />);
    //     expect(component.find('.modal-body').text()).toEqual('');
    //   });
    // });
    // it('should render modal footer', () => {
    //   expect(wrapper.find('.modal-footer').length).toEqual(1);
    //   expect(wrapper.find('.modal-footer').children()).toHaveLength(1);
    // });
  });
  describe('Hasn"t props', () => {
    const wrapper = mount(<Modal />);
    it('dosn"t has modal content', () => {
      expect(wrapper.find('.modal-content').length).toEqual(0);
      expect(wrapper.find('.modal-content').children()).toHaveLength(0);
    });
  });
});
