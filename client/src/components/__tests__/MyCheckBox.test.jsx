/* global React:false, shallow:false toJson:false */

import { MyCheckBox } from '../helpers/MyCheckBox';

describe('MyCheckBox Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<MyCheckBox getValue={jest.fn()} name="name" />)
      .exists(<input type="checkbox" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<MyCheckBox
      getValue={jest.fn()}
      name="name"
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

