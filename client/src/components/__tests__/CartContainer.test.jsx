/* global React:false, shallow:false */
/* eslint react/jsx-indent: off */

import { MemoryRouter } from 'react-router-dom';
import { CartContainer } from '../orderCart/CartContainer';

describe('Login Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<MemoryRouter><CartContainer /></MemoryRouter>)
      .exists(<table className="table" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}><CartContainer />
                            </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});

