/* global React:false, shallow:false toJson:false */
import { SignUp } from '../signup/ConnectedSignUp';

describe('SignUp Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<SignUp dispatch={jest.fn()} />)
      .exists(<form className="form" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper =
    shallow(<SignUp dispatch={jest.fn()} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

