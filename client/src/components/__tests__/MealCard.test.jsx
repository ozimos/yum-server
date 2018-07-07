/* global React:false, shallow:false toJson:false */

import { MealCard } from '../mealCard/MealCard';
import { meal } from '../mocks/mealDataMock';

describe('MealCard Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<MealCard
      {...meal.data}
      dispatch={jest.fn()}
    />)
      .exists(<div className="card" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<MealCard
      {...meal.data}
      dispatch={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

