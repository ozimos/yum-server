/* global React:false, shallow:false */
/* eslint react/jsx-indent: off */

import { MemoryRouter } from 'react-router-dom';
import { Menu } from '../menu/Menu';

describe('Login Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<MemoryRouter><Menu /></MemoryRouter>)
      .exists(<div className="title-element flexbox" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}><Menu />
                            </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});

