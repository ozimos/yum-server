/* global React:false, shallow:false toJson:false */

import { PlainMealCard2 } from '../mealCard/MealCard2';
import { meal } from '../mocks/mealDataMock';

describe('MealCard2 Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<PlainMealCard2
      {...meal.data}
      dispatch={jest.fn()}
      addToMenu={jest.fn()}
      removeFromMenu={jest.fn()}
    />)
      .exists(<div className="card" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<PlainMealCard2
      {...meal.data}
      dispatch={jest.fn()}
      addToMenu={jest.fn()}
      removeFromMenu={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

