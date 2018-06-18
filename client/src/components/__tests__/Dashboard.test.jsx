/* global React:false, shallow:false */
/* eslint react/jsx-indent: off */

import { MemoryRouter } from 'react-router-dom';
import { Dashboard } from '../dashboard/Dashboard';

describe('Login Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<MemoryRouter><Dashboard /></MemoryRouter>)
      .exists(<table className="table" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}><Dashboard />
                            </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});

