/* global React:false, shallow:false toJson:false */

import OrderTableContainer from '../mealCard/OrderTableContainer';
import { allOrders } from '../mocks/orderDataMock';

describe('OrderTableContainer Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<OrderTableContainer
      order={allOrders.data.rows}
      getOrderMeals={jest.fn()}
      getOrderMealsTotals={jest.fn()}
      onFetchData={jest.fn()}
      addOrderToCart={jest.fn()}
    />)
      .exists(<table className="table" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<OrderTableContainer
      order={allOrders.data.rows}
      getOrderMeals={jest.fn()}
      getOrderMealsTotals={jest.fn()}
      onFetchData={jest.fn()}
      addOrderToCart={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

