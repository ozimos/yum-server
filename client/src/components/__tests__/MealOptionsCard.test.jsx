/* global React:false, shallow:false toJson:false */

import { MealOptionsCard } from '../mealCard/ConnectedMealOptionsCard';
import { meal } from '../mocks/mealDataMock';

describe('MealCard Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<MealOptionsCard
      {...meal.data}
      dispatch={jest.fn()}
    />)
      .exists(<div className="card" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<MealOptionsCard
      {...meal.data}
      dispatch={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

