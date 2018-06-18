/* global React:false, shallow:false */
/* eslint react/jsx-indent: off */
import { MemoryRouter } from 'react-router-dom';
import { MealManager } from '../mealManager/MealManager';

describe('MealManager Component', () => {
  it('renders correctly', () => {
    const wrapper =
    shallow(<MemoryRouter
      initialEntries={[{ pathname: '/', key: 'testKey' }]}
    >
      <MealManager />
            </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});