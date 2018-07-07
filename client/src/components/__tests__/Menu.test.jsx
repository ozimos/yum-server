/* global React:false, shallow:false toJson:false */

import { Menu } from '../menu/Menu';
import { allMeals } from '../mocks/mealDataMock';

describe('Menu Component', () => {
  const user = { isCaterer: true, firstName: 'user' };

  it('should render without throwing an error', () => {
    expect(shallow(<Menu
      dispatch={jest.fn()}
      meals={allMeals.data}
      user={user}
    />)
      .exists(<div className="title-element flexbox" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<Menu
      dispatch={jest.fn()}
      meals={allMeals.data}
      user={user}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

