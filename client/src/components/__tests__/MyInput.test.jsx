/* global React:false, shallow:false toJson:false */

import { MyInput } from '../helpers/MyInput';

describe('MyInput Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<MyInput
      getValue={jest.fn()}
      getErrorMessage={jest.fn()}
      name="name"
      typeOfInput="text"
    />)
      .exists(<div
        style={{
          color: 'red', fontSize: '1rem'
        }}
      />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<MyInput
      getValue={jest.fn()}
      getErrorMessage={jest.fn()}
      name="name"
      typeOfInput="text"
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

