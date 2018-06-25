/* global React:false, shallow:false */
/* eslint react/jsx-indent: off */

import Greeting from '../greeting/Greeting';

describe('Login Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Greeting isCaterer firstName="alias" />);
    expect(wrapper).toMatchSnapshot();
  });
});

