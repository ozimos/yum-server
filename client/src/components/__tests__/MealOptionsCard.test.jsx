/* global React:false, shallow:false toJson:false */

import { BaseMealOptionsCard } from '../mealCard/MealOptionsCard';
import { meal } from '../mocks/mealDataMock';

describe('MealCard Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<BaseMealOptionsCard
      {...meal.data}
      dispatch={jest.fn()}
    />)
      .exists(<div className="card" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<BaseMealOptionsCard
      {...meal.data}
      dispatch={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

