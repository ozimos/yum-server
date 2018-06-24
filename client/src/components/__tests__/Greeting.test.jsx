/* global React:false, shallow:false */
/* eslint react/jsx-indent: off */

import { MemoryRouter } from 'react-router-dom';
import Greeting from '../greeting/Greeting';

describe('Login Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}><Greeting />
                            </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});

