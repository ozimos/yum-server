/* global React:false, shallow:false */
/* eslint react/jsx-indent: off */

import { MemoryRouter } from 'react-router-dom';
import { OrderItem } from '../orderCart/OrderItem';

describe('Login Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<MemoryRouter><OrderItem /></MemoryRouter>)
      .exists(<div className="row" style={{ borderBottom: '1px solid' }} />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}><OrderItem />
                            </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});

