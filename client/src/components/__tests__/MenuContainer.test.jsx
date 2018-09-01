/* global React:false, shallow:false toJson:false */

import { MenuContainer } from '../orderCart/ConnectedMenuContainer';
import menu from '../mocks/menuDataMock';

describe('MenuContainer Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<MenuContainer
      menu={menu.data.rows}
      clearMenu={jest.fn()}
      dispatch={jest.fn()}
      postMenu={jest.fn()}
    />)
      .exists(<table className="table" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<MenuContainer
      menu={menu.data.rows}
      clearMenu={jest.fn()}
      dispatch={jest.fn()}
      postMenu={jest.fn()}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

