/* global React:false, shallow:false */
/* eslint react/jsx-indent: off */

import { MemoryRouter } from 'react-router-dom';
import MealRow from '../orderCart/MealRow';

describe('Login Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}><MealRow />
                            </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});

