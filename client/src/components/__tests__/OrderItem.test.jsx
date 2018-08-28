/* global React:false, shallow:false toJson:false */

import OrderItem from '../orderCart/OrderItem';
import { order } from '../mocks/orderDataMock';

describe('OrderItem Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<OrderItem
      id={order.data.id}
      Meals={order.data.Meals}
      addOrder={jest.fn()}
    />)
      .exists(<div
        className="row"
        style={{ borderBottom: '1px solid' }}
      />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<OrderItem
      id={order.data.id}
      Meals={order.data.Meals}
      addOrder={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

