import React from 'react';
import { mount } from 'enzyme';
import FormRequest from '../FormRequest';
import { rowData } from '../../../redux/mockData';

const setUp = (props) => mount(<FormRequest {...props} />);

const props = {
  title: 'Test title',
  initialData: { ...rowData[0] },
  action: () => {},
};

describe('FormRequest', () => {
  let component;
  beforeEach(() => {
    component = setUp(props);
  });

  it('shold render button', () => {
    expect(component).toBeTruthy();
  });
  it('should create shanapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should get props', () => {
    expect(component.prop('title')).toBe(props.title);
    expect(component.prop('initialData')).toBe(props.initialData);
    expect(component.prop('action')).toBe(props.action);
  });

  it('should render ReturnToListButton', () => {
    expect(component.find('[data-testid="form"]')).toBeTruthy();
  });

  describe('Field purpose', () => {
    it('should render without crashing', () => {
      expect(component.find('Field [name="purpose"]')).toBeTruthy();
    });

    it('should has props value', () => {
      expect(component.find('[name="purpose"]').find('select').prop('value')).toBe(props.initialData.purpose);
    });

    it('should handle input value', () => {
      const expectedValue = 'test purpose';
      const element = component.find('[name="purpose"]').find('select');
      element.simulate('change', { target: { name: 'purpose', value: expectedValue } });
      expect(component.find('[name="purpose"]').find('select').prop('value')).toBe(expectedValue);
    });
  });

  describe('Field firstName', () => {
    it('should render without crashing', () => {
      expect(component.find('Field [name="firstName"]')).toBeTruthy();
    });

    it('should has props value', () => {
      expect(component.find('[name="firstName"]').find('input').prop('value')).toBe(props.initialData.firstName);
    });

    it('should handle input value', () => {
      const expectedValue = 'test first name';
      const element = component.find('[name="firstName"]').find('input');
      element.simulate('change', { target: { name: 'firstName', value: expectedValue } });
      expect(component.find('[name="firstName"]').find('input').prop('value')).toBe(expectedValue);
    });

    describe('Field lastName', () => {
      it('should render without crashing', () => {
        expect(component.find('Field [name="lastName"]')).toBeTruthy();
      });

      it('should has props value', () => {
        expect(component.find('[name="lastName"]').find('input').prop('value')).toBe(props.initialData.lastName);
      });

      it('should handle input value', () => {
        const expectedValue = 'test last name';
        const element = component.find('[name="lastName"]').find('input');
        element.simulate('change', { target: { name: 'lastName', value: expectedValue } });
        expect(component.find('[name="lastName"]').find('input').prop('value')).toBe(expectedValue);
      });
    });

    describe('Field gender', () => {
      it('should render without crashing', () => {
        expect(component.find('Field [name="gender"]')).toBeTruthy();
      });

      it('should has props value', () => {
        expect(component.find('[name="gender"]').find('RadioButtonGroup').prop('value')).toBe(props.initialData.gender);
      });

      it('should handle input value', () => {
        const expectedActiveId = 'female';
        const element = component
          .find('[name="gender"]')
          .find('RadioButtonGroup')
          .find(`[id="${expectedActiveId}"]`)
          .find('input');
        element.simulate('change', { target: { checked: true } });
        expect(component.find('[name="gender"]').find('RadioButtonGroup').prop('value')).toBe(expectedActiveId);
      });
    });
  });
});
