/* global React:false, shallow:false toJson:false */

import { Dashboard } from '../dashboard/Dashboard';
import { allOrders } from '../mocks/orderDataMock';

describe('Dashboard Component', () => {
  const user = { isCaterer: true, firstName: 'user' };

  it('should render without throwing an error', () => {
    expect(shallow(<Dashboard
      dispatch={jest.fn()}
      user={user}
      orders={allOrders.data}
    />)
      .exists(<table className="table" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<Dashboard
      dispatch={jest.fn()}
      user={user}
      orders={allOrders.data}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

