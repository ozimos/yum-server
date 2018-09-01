/* global React:false, shallow:false toJson:false */

import DashboardTableContainer from '../mealCard/DashboardTableContainer';
import { allOrders } from '../mocks/orderDataMock';

describe('DashboardTableContainer Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<DashboardTableContainer
      order={allOrders.data.rows}
      getOrderMeals={jest.fn()}
      getOrderMealsTotals={jest.fn()}
      onFetchData={jest.fn()}
    />)
      .exists(<table className="table" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<DashboardTableContainer
      order={allOrders.data.rows}
      getOrderMeals={jest.fn()}
      getOrderMealsTotals={jest.fn()}
      onFetchData={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

