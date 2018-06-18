/* global React:false, shallow:false */
/* eslint react/jsx-indent: off */

import { MemoryRouter } from 'react-router-dom';
import { Order } from '../orders/Order';

describe('Login Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<MemoryRouter><Order /></MemoryRouter>)
      .exists(<main className="col-12 col-md-8" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}><Order />
                            </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});

