/* global React:false, shallow:false toJson:false */

import { Order } from '../orders/ConnectedOrder';
import { allOrders } from '../mocks/orderDataMock';
import { allMeals } from '../mocks/mealDataMock';

describe('Order Component', () => {
  const user = { isCaterer: true, firstName: 'user' };

  it('should render without throwing an error', () => {
    expect(shallow(<Order
      dispatch={jest.fn()}
      user={user}
      menu={allMeals.data}
      orders={allOrders.data}
    />)
      .exists(<main className="col-12 col-md-8" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<Order
      dispatch={jest.fn()}
      user={user}
      menu={allMeals.data}
      orders={allOrders.data}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

