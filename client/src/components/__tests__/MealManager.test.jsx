/* global React:false, shallow:false toJson:false */
import { MealManager } from '../mealManager/ConnectedMealManager';
import { allMeals } from '../mocks/mealDataMock';

describe('MealManager Component', () => {
  const user = { isCaterer: true, firstName: 'user' };
  it('renders correctly', () => {
    const wrapper =
    shallow(<MealManager
      dispatch={jest.fn()}
      user={user}
      meals={allMeals.data}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
