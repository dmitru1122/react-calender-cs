import { shallow } from 'enzyme';
import TimeLine from './CustomTimeline';

it('should renders', () => {
  const shallowComp = shallow(<TimeLine />);
  //   const mountComp = mount(<TimeLine />);
  console.log(shallowComp.debug());
  //   console.log(mountComp.debug());
  expect(2).toEqual(3);
});
