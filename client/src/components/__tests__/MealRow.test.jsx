/* global React:false, shallow:false toJson:false */

import MealRow from '../orderCart/MealRow';

describe('MealRow Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<MealRow
      id="abc"
      title="abc"
      price={4}
      quantity={4}
      removeFromCart={jest.fn()}
      setQuantity={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

