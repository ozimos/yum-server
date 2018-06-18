/* global React:false, shallow:false */
/* eslint react/jsx-indent: off */

import { MemoryRouter } from 'react-router-dom';
import { Nav } from '../nav/Nav';

describe('Login Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<MemoryRouter><Nav /></MemoryRouter>)
      .exists(<nav className="flexbox" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}><Nav />
                            </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});

