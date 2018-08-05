/* global React:false, shallow:false toJson:false */

import OrderCard from '../mealCard/OrderCard';
import { meal } from '../mocks/mealDataMock';

describe('OrderCard Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<OrderCard
      {...meal.data}
      dispatch={jest.fn()}
      addToOrder={jest.fn()}
      removeFromOrder={jest.fn()}
    />)
      .exists(<div className="card" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<OrderCard
      {...meal.data}
      dispatch={jest.fn()}
      addToOrder={jest.fn()}
      removeFromOrder={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

