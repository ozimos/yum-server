/* global React:false, shallow:false toJson:false */

import MealCard3 from '../mealCard/MealCard3';
import { meal } from '../mocks/mealDataMock';

describe('MealCard3 Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<MealCard3
      {...meal.data}
      dispatch={jest.fn()}
      addToOrder={jest.fn()}
      removeFromOrder={jest.fn()}
    />)
      .exists(<div className="card" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<MealCard3
      {...meal.data}
      dispatch={jest.fn()}
      addToOrder={jest.fn()}
      removeFromOrder={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

