import React from 'react';
import { shallow } from 'enzyme';
import Buttons from '../Buttons';

const setUp = (props) => shallow(<Buttons {...props} />);

describe('Button', () => {
  it('shold render button', () => {
    const buttonLabel = 'hi';
    const component = setUp({ buttonLabel });
    expect(component.find('Button').text()).toContain('hi');
  });

  it('should render add button', () => {
    const type = 'add';
    const component = setUp({ type });
    expect(component.find('Button').prop('iconDescription')).toContain('Add new');
  });

  it('should render delete button', () => {
    const type = 'delete';
    const component = setUp({ type });
    expect(component.find('[iconDescription="Delete row"]').length).toBe(1);
  });

  it('should render edit button', () => {
    const type = 'edit';
    const component = setUp({ type });
    expect(component.find('[iconDescription="Edit row"]').length).toBe(1);
  });
});
