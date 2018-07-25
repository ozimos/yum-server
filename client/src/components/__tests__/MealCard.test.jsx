/* global React:false, shallow:false toJson:false */

import { PlainMealCard } from '../mealCard/MealCard';
import { meal } from '../mocks/mealDataMock';

describe('MealCard Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<PlainMealCard
      {...meal.data}
      dispatch={jest.fn()}
    />)
      .exists(<div className="card" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<PlainMealCard
      {...meal.data}
      dispatch={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

