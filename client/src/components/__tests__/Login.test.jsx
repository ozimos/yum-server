/* global React:false, shallow:false toJson:false */

import { Login } from '../login/Login';

describe('Login Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<Login
      dispatch={jest.fn()}
    />)
      .exists(<form className="form" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<Login
      dispatch={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

