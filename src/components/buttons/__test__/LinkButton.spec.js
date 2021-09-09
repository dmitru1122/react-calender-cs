import React from 'react';
import { shallow, mount } from 'enzyme';
import LinkButton from '../LinkButton';

const setUp = (props) => shallow(<LinkButton {...props} />);

describe('LinkButton', () => {
  it('shold render button', () => {
    const component = setUp();
    expect(component.find('[data-testid="LinkButton"]')).toBeTruthy();
  });

  it('should get props', () => {
    const link = '/testLink';
    const label = 'TestLabel';
    const component = mount(<LinkButton link={link} label={label} />);

    expect(component.prop('link')).toBe(link);
    expect(component.prop('label')).toBe(label);
  });
});
