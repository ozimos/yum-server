import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mealActions from '../../redux/actions/mealActions';
import mealTypes from '../../redux/types/mealTypes';
import mealResponse from '../mocks/mealDataMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  connecting: false,
  mealError: null,
  meals: []
});
describe('async actions', () => {
  beforeEach(() => {
    // import and pass your custom axios instance to this method
    moxios.install();
  });

  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });

  it('dispatches MEALS_REQUEST and ALL_MEALS_SUCCESS on successful fetching of caterer meals', () => {

    moxios.stubRequest('api/v1/meals', {
      status: 200,
      response: mealResponse
    });
    const expectedActions = [
      { type: mealTypes.MEALS_REQUEST },
      { type: mealTypes.ALL_MEALS_SUCCESS, meals: mealResponse.data },
    ];
    return store.dispatch(mealActions.getAllMeals())
      .then(() => {
        const dispatchedActions = store.getActions();
        //   const actionTypes = dispatchedActions.map(action => action.type);
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
});