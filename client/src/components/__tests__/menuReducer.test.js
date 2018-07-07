import menuReducer from '../../redux/reducers/menuReducer';
import { menuTypes } from '../../redux/types';
import { meal, allMeals } from '../mocks/mealDataMock';

describe('post menuReducer', () => {
  const initialState = {
    connecting: false,
    menuError: null,
    menu: []
  };
  it('should return the initial state', () => {
    expect(menuReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle MENU_REQUEST', () => {
    const newState = {
      connecting: true,
      menuError: null,
      menu: []
    };
    const action = { type: menuTypes.MENU_REQUEST };
    expect(menuReducer(undefined, action)).toEqual(newState);
  });

  it('should handle GET_MENU_SUCCESS', () => {
    const newState = {
      menu: allMeals.data
    };
    const action = { type: menuTypes.GET_MENU_SUCCESS, menu: allMeals.data };

    expect(menuReducer(undefined, action)).toEqual(newState);
  });

  it('should handle MENU_FAILURE', () => {
    const newState = {
      connecting: false,
      menuError: { message: 'error' },
      menu: []
    };
    const action = { type: menuTypes.MENU_FAILURE, error: { message: 'error' } };

    expect(menuReducer(undefined, action)).toEqual(newState);
  });

  it('should handle POST_MENU_SUCCESS', () => {
    const newState = {
      menu: [meal.data]
    };
    const action = { type: menuTypes.POST_MENU_SUCCESS, menu: [meal.data] };
    expect(menuReducer(undefined, action)).toEqual(newState);
  });
});
