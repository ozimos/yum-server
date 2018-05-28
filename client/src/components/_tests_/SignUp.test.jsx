/* global React:false, shallow:false */
/* eslint react/jsx-indent: off */
import { MemoryRouter } from 'react-router-dom';
import { SignUp } from '../signup/SignUp';
// describe what we are testing
describe('SignUp Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<MemoryRouter><SignUp /></MemoryRouter>)
      .exists(<form className="form" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper =
    shallow(<MemoryRouter
      initialEntries={[{ pathname: '/', key: 'testKey' }]}
    >
      <SignUp />
            </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});

