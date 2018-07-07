/* global React:false, shallow:false toJson:false */

import PrivateRoute from '../container/PrivateRoute';


describe('PrivateRoute Component', () => {
  jest.mock('react-router-dom', () => (
    {
      Route: 'div',
      Redirect: 'div',

    }
  ));

  it('renders correctly', () => {
    const wrapper = shallow(<PrivateRoute
      component={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

